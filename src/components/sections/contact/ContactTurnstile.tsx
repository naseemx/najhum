"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AlertCircle, RefreshCw, ShieldCheck } from "lucide-react";
import { Label } from "@/design-system/primitives/typography/Label";

export interface ContactTurnstileRef { reset: () => void }
interface ContactTurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
}
interface TurnstileOptions {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback"?: (error: unknown) => void;
  "expired-callback"?: () => void;
  "timeout-callback"?: () => void;
  "unsupported-callback"?: () => void;
  "before-interactive-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
  retry?: "auto" | "never";
  "retry-interval"?: number;
  "refresh-expired"?: "auto" | "manual" | "never";
  "refresh-timeout"?: "auto" | "manual" | "never";
}
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      isExpired?: (widgetId: string) => boolean;
    };
    onloadTurnstileCallback?: () => void;
  }
}
const TEST_SITE_KEY = "1x00000000000000000000AA";
const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
type Status = "loading" | "verifying" | "refreshing" | "verified" | "error";

const ContactTurnstile = forwardRef<ContactTurnstileRef, ContactTurnstileProps>(
  ({ onVerify, onExpire, onError, error, label = "Security Verification", required = true }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const callbacks = useRef({ onVerify, onExpire, onError });
    const restartRef = useRef<() => void>(() => {});
    const [status, setStatus] = useState<Status>("loading");
    const [message, setMessage] = useState("");
    const [slow, setSlow] = useState(false);
    const [attempt, setAttempt] = useState(0);
    const configuredKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY?.trim();
    const siteKey = configuredKey || (process.env.NODE_ENV !== "production" ? TEST_SITE_KEY : "");
    const invalidConfiguration = !siteKey || (process.env.NODE_ENV === "production" && /^[123]x0+/.test(siteKey));

    // Typing in the form must not recreate the widget or discard a valid token.
    useEffect(() => { callbacks.current = { onVerify, onExpire, onError }; }, [onVerify, onExpire, onError]);
    useImperativeHandle(ref, () => ({ reset: () => restartRef.current() }), []);

    useEffect(() => {
      if (invalidConfiguration) return;
      let disposed = false;
      let rendered = false;
      let currentStatus: Status = "loading";
      let scriptFailed = false;
      let poll: ReturnType<typeof setInterval> | undefined;
      let loadTimeout: ReturnType<typeof setTimeout> | undefined;
      let slowTimeout: ReturnType<typeof setTimeout> | undefined;
      let tokenExpiresAt = 0;
      let widgetSize: "compact" | "flexible" = "flexible";
      const transition = (next: Status) => { currentStatus = next; setStatus(next); };
      const watchProgress = () => {
        clearTimeout(slowTimeout);
        setSlow(false);
        // Offer recovery without interrupting a human completing an interactive check.
        slowTimeout = setTimeout(() => { if (!disposed) setSlow(true); }, 45000);
      };
      const pending = () => {
        tokenExpiresAt = 0;
        callbacks.current.onExpire?.();
        setMessage("");
        transition("refreshing");
        watchProgress();
      };
      const fail = (text: string) => {
        if (disposed) return;
        tokenExpiresAt = 0;
        clearInterval(poll);
        clearTimeout(loadTimeout);
        clearTimeout(slowTimeout);
        transition("error");
        setMessage(text);
        callbacks.current.onError?.(text);
      };
      const restart = () => {
        if (disposed) return;
        pending();
        if (widgetIdRef.current !== null && window.turnstile) {
          try { window.turnstile.reset(widgetIdRef.current); }
          catch { setAttempt(previous => previous + 1); }
        } else {
          if (scriptFailed) script?.remove();
          setAttempt(previous => previous + 1);
        }
      };
      restartRef.current = restart;
      const render = () => {
        if (disposed || rendered || !containerRef.current || !window.turnstile) return;
        rendered = true;
        clearInterval(poll);
        clearTimeout(loadTimeout);
        const width = containerRef.current.getBoundingClientRect().width;
        widgetSize = width > 0 && width < 300 ? "compact" : "flexible";
        try {
          transition("verifying");
          setMessage("");
          watchProgress();
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey, theme: "light",
            // Flexible widgets still have a 300px minimum; compact fits narrow phones.
            size: widgetSize,
            retry: "auto", "retry-interval": 8000,
            "refresh-expired": "auto", "refresh-timeout": "auto",
            callback: token => {
              if (disposed) return;
              clearTimeout(slowTimeout);
              tokenExpiresAt = Date.now() + 300000;
              setSlow(false); setMessage(""); transition("verified");
              callbacks.current.onVerify(token);
            },
            // Cloudflare handles renewal; do not reset again and interrupt its new challenge.
            "expired-callback": () => { if (!disposed) pending(); },
            "timeout-callback": () => { if (!disposed) pending(); },
            "before-interactive-callback": () => { if (!disposed) pending(); },
            "unsupported-callback": () => fail("This browser cannot complete the security check. Please update your browser or contact info@najhumgroup.com."),
            "error-callback": code => {
              const errorCode = String(code);
              fail(errorCode === "110200"
                ? "This hostname is not authorised for security verification. Please contact info@najhumgroup.com."
                : `Security verification could not complete (code ${errorCode}). Retry verification. If it continues, try another connection or contact info@najhumgroup.com.`);
            },
          });
        } catch { fail("Security verification could not start. Please retry verification."); }
      };
      let script = document.querySelector<HTMLScriptElement>('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
      const scriptError = () => {
        scriptFailed = true;
        fail("Cloudflare could not load. Check your connection, then retry verification. Your form entries will stay here.");
      };
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_URL; script.async = true; script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("error", scriptError);
      script.addEventListener("load", render);
      if (window.turnstile) render();
      else {
        poll = setInterval(render, 100);
        loadTimeout = setTimeout(() => {
          scriptFailed = true;
          fail("Security verification is taking too long to load. Check your connection, then retry verification.");
        }, 30000);
      }
      const resume = () => {
        if (document.visibilityState === "hidden" || widgetIdRef.current === null || !window.turnstile) return;
        const expired = tokenExpiresAt > 0 && Date.now() >= tokenExpiresAt;
        if (expired || window.turnstile.isExpired?.(widgetIdRef.current) || currentStatus === "error") restart();
      };
      const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
        const width = containerRef.current?.getBoundingClientRect().width || 0;
        if (!disposed && rendered && width > 0 && (width < 300 ? "compact" : "flexible") !== widgetSize) {
          pending();
          setAttempt(previous => previous + 1);
        }
      }) : undefined;
      if (containerRef.current) resize?.observe(containerRef.current);
      window.addEventListener("online", resume);
      document.addEventListener("visibilitychange", resume);
      return () => {
        disposed = true;
        restartRef.current = () => {};
        clearInterval(poll); clearTimeout(loadTimeout); clearTimeout(slowTimeout);
        resize?.disconnect();
        window.removeEventListener("online", resume);
        document.removeEventListener("visibilitychange", resume);
        script?.removeEventListener("error", scriptError);
        script?.removeEventListener("load", render);
        if (widgetIdRef.current !== null && window.turnstile) {
          try { window.turnstile.remove(widgetIdRef.current); } catch { /* Widget already removed. */ }
          widgetIdRef.current = null;
        }
      };
    }, [siteKey, invalidConfiguration, attempt]);

    const visibleError = invalidConfiguration
      ? "Security verification is not configured. Please contact info@najhumgroup.com."
      : error || (status === "error" ? message : "");
    return <div className="flex min-w-0 flex-col gap-2 w-full">
      {label && <Label variant={visibleError ? "error" : required ? "required" : "default"}>{label}</Label>}
      <div className="relative min-h-[82px] min-w-0 w-full rounded-sm bg-surface border border-border p-2">
        <div ref={containerRef} className="w-full min-w-0 flex justify-center [&>div]:max-w-full" />
        {!invalidConfiguration && status === "loading" && <div role="status" className="flex items-center gap-2.5 px-3 py-3 text-xs text-muted"><ShieldCheck className="w-4 h-4 shrink-0 text-primary animate-pulse" /><span>Loading security verification…</span></div>}
      </div>
      <div aria-live="polite" aria-atomic="true">
        {visibleError ? <p role="alert" className="text-xs text-danger font-medium flex items-start gap-1.5"><AlertCircle size={14} className="shrink-0 mt-0.5" />{visibleError}</p>
          : status === "refreshing" ? <p className="text-xs text-muted">Refreshing security verification… Your form entries are kept on this page.</p>
          : slow ? <p className="text-xs text-muted">Verification is taking longer than usual. Complete the check above or retry. If it stays stuck, try another connection.</p> : null}
      </div>
      {!invalidConfiguration && (visibleError || slow) && <button type="button" onClick={() => restartRef.current()} className="inline-flex self-start items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-primary"><RefreshCw size={15} />Retry verification</button>}
    </div>;
  }
);
ContactTurnstile.displayName = "ContactTurnstile";
export default ContactTurnstile;
