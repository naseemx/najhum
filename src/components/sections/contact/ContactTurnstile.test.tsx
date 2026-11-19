// @vitest-environment jsdom
import { act, createRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import ContactTurnstile, { type ContactTurnstileRef } from "./ContactTurnstile";

type Options = Parameters<NonNullable<Window["turnstile"]>["render"]>[1];
let host: HTMLDivElement, root: Root, options: Options;
let callbacks: { onVerify: ReturnType<typeof vi.fn>; onExpire: ReturnType<typeof vi.fn>; onError: ReturnType<typeof vi.fn> };
let api: NonNullable<Window["turnstile"]>;
const ref = createRef<ContactTurnstileRef>();
beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  vi.useFakeTimers();
  vi.stubEnv("NODE_ENV", "development");
  vi.stubEnv("NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY", "test-site-key");
  callbacks = { onVerify: vi.fn(), onExpire: vi.fn(), onError: vi.fn() };
  api = { render: vi.fn((_container, configuration) => { options = configuration; return "widget-1"; }), reset: vi.fn(), remove: vi.fn(), isExpired: vi.fn(() => false) };
  window.turnstile = api;
  document.head.querySelectorAll('script[src*="challenges.cloudflare.com"]').forEach(node => node.remove());
  host = document.createElement("div"); document.body.append(host); root = createRoot(host);
});
afterEach(() => { act(() => root.unmount()); host.remove(); delete window.turnstile; vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllEnvs(); });
function mount() { act(() => root.render(<ContactTurnstile ref={ref} {...callbacks} />)); }
function retry() { act(() => { const button = Array.from(host.querySelectorAll("button")).find(node => node.textContent === "Retry verification"); expect(button).toBeDefined(); button!.click(); }); }
it("uses compact mode when the available phone width is below Cloudflare's 300px minimum", () => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ width: 280 } as DOMRect);
  mount(); expect(options.size).toBe("compact");
  expect(options).toMatchObject({ retry: "auto", "refresh-expired": "auto", "refresh-timeout": "auto" });
});
it("uses flexible mode for wider screens", () => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ width: 420 } as DOMRect);
  mount(); expect(options.size).toBe("flexible");
});
it("invalidates expired tokens while Cloudflare refreshes without resetting its new challenge", () => {
  mount(); act(() => options.callback("valid-token")); expect(callbacks.onVerify).toHaveBeenCalledWith("valid-token");
  act(() => options["expired-callback"]!()); expect(callbacks.onExpire).toHaveBeenCalledOnce(); expect(api.reset).not.toHaveBeenCalled();
  expect(host.textContent).toContain("Refreshing security verification"); expect(host.querySelector('[role="alert"]')).toBeNull();
  act(() => options.callback("new-token")); expect(host.textContent).not.toContain("Refreshing security verification");
});
it("handles interaction timeouts as an automatic renewal", () => {
  mount(); act(() => options["timeout-callback"]!()); expect(callbacks.onExpire).toHaveBeenCalledOnce(); expect(api.reset).not.toHaveBeenCalled();
});
it("does not recreate the widget when form callbacks change during typing", () => {
  mount(); const nextVerify = vi.fn(); act(() => root.render(<ContactTurnstile {...callbacks} onVerify={nextVerify} />));
  act(() => options.callback("token")); expect(api.render).toHaveBeenCalledOnce(); expect(nextVerify).toHaveBeenCalledWith("token"); expect(callbacks.onVerify).not.toHaveBeenCalled();
});
it("offers a retry that preserves form entries and resets only the widget", () => {
  const input = document.createElement("input"); input.value = "Customer enquiry"; document.body.append(input);
  mount(); act(() => options["error-callback"]!("200500")); expect(host.textContent).toContain("200500"); retry();
  expect(api.reset).toHaveBeenCalledWith("widget-1"); expect(input.value).toBe("Customer enquiry"); expect(host.textContent).not.toContain("200500"); input.remove();
});
it("offers recovery for a long-running challenge without interrupting it automatically", () => {
  mount(); act(() => vi.advanceTimersByTime(45000)); expect(host.textContent).toContain("taking longer than usual"); expect(api.reset).not.toHaveBeenCalled(); retry(); expect(api.reset).toHaveBeenCalledOnce();
});
it("refreshes a stale token when Safari returns from the background", () => {
  mount(); act(() => options.callback("token")); act(() => document.dispatchEvent(new Event("visibilitychange"))); expect(api.reset).not.toHaveBeenCalled();
  act(() => { vi.advanceTimersByTime(300001); document.dispatchEvent(new Event("visibilitychange")); }); expect(api.reset).toHaveBeenCalledOnce(); expect(callbacks.onExpire).toHaveBeenCalledOnce();
});
it("recovers after a connection failure when the device goes online", () => {
  mount(); act(() => options["error-callback"]!("200500")); act(() => window.dispatchEvent(new Event("online"))); expect(api.reset).toHaveBeenCalledOnce();
});
it("reloads a failed Cloudflare script without reloading the page", () => {
  delete window.turnstile; mount(); const failed = document.head.querySelector<HTMLScriptElement>('script[src*="challenges.cloudflare.com"]')!;
  act(() => failed.dispatchEvent(new Event("error"))); retry(); const replacement = document.head.querySelector<HTMLScriptElement>('script[src*="challenges.cloudflare.com"]')!;
  expect(replacement).not.toBe(failed); window.turnstile = api; act(() => replacement.dispatchEvent(new Event("load"))); expect(api.render).toHaveBeenCalledOnce();
});
it("manual reset invalidates the form's previous token", () => {
  mount(); act(() => options.callback("token")); act(() => ref.current!.reset()); expect(callbacks.onExpire).toHaveBeenCalledOnce(); expect(api.reset).toHaveBeenCalledOnce();
});
it("removes widgets and ignores late callbacks after unmount", () => {
  mount(); act(() => root.render(null)); expect(api.remove).toHaveBeenCalledWith("widget-1"); act(() => options.callback("late-token")); expect(callbacks.onVerify).not.toHaveBeenCalled();
});
