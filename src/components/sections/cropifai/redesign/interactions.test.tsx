// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import ValveDemo from './ValveDemo';
import SensorHub from './SensorHub';
import WaterCalculator from './WaterCalculator';
import DashboardDemo from './DashboardDemo';
let host: HTMLDivElement, root: Root;
beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal('IntersectionObserver', class {
        observe() { }
        unobserve() { }
        disconnect() { }
    });
    host = document.createElement('div');
    document.body.append(host);
    root = createRoot(host);
});
afterEach(() => { act(() => root.unmount()); host.remove(); vi.unstubAllGlobals(); });
function click(selector: string) { act(() => { host.querySelector<HTMLElement>(selector)!.click(); }); }
function change(selector: string, value: string) { act(() => { const input = host.querySelector<HTMLInputElement>(selector)!; Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value); input.dispatchEvent(new Event('input', { bubbles: true })); input.dispatchEvent(new Event('change', { bubbles: true })); }); }
describe('cropifAI React controls', () => {
    it('updates valve position, flow and zone status together', () => {
        act(() => root.render(<ValveDemo />));
        change('[data-nq="in"]', '0');
        expect(host.querySelector('[data-nq="pos"]')?.textContent).toBe('0%');
        expect(host.querySelector('[data-nq="flow"]')?.textContent).toBe('0.0 m³/h');
        expect(host.querySelector('[data-nq="zone"]')?.textContent).toBe('Closed');
    });
    it('connects, disconnects and resets the optional farm systems', () => {
        act(() => root.render(<SensorHub />));
        click('[data-hub-i="0"]');
        expect(host.querySelector('[data-hub-n]')?.textContent).toBe('4');
        expect(host.querySelector('[data-hub-i="0"]')?.getAttribute('aria-pressed')).toBe('true');
        click('[data-hub-all]');
        expect(host.querySelector('[data-hub-n]')?.textContent).toBe('11');
        click('[data-hub-reset]');
        expect(host.querySelector('[data-hub-n]')?.textContent).toBe('3');
    });
    it('recalculates savings when the user changes their figures', () => {
        act(() => root.render(<WaterCalculator />));
        expect(host.querySelector('[data-r2="vy"]')?.textContent).toBe('1,440,000');
        change('[data-k="h"]', '240');
        expect(host.querySelector('[data-r2="vy"]')?.textContent).toBe('2,880,000');
        expect(host.querySelector('[data-o="h"]')?.textContent).toBe('240');
    });
    it('opens the system view and runs the backup action independently of WebGL', () => {
        act(() => root.render(<DashboardDemo />));
        host.querySelector('.db-main')!.scrollTo = vi.fn();
        click('[data-go="dv"]');
        expect(host.querySelector('.db')?.getAttribute('data-screen')).toBe('dv');
        click('[data-act="go"]');
        expect(host.querySelector<HTMLButtonElement>('[data-act="go"]')?.disabled).toBe(true);
        expect(host.querySelector('[data-v="dvchip"]')?.textContent).toBe('Acknowledged');
    });
    it('opens and dismisses the supplementary dashboard dialog', () => {
        act(() => root.render(<DashboardDemo />));
        click('[data-more="Farm"]');
        expect(host.querySelector<HTMLElement>('.db-modal')?.hidden).toBe(false);
        expect(host.querySelector('[data-v="mt"]')?.textContent).toContain('Farm');
        click('[data-close]');
        expect(host.querySelector<HTMLElement>('.db-modal')?.hidden).toBe(true);
    });
});
