'use client';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { advanceFarmStory, initialFarmStory, storyText, type FarmStory } from './demo-state';
import { useVisible } from './useVisible';
export function useHardwareRail() {
    const track = useRef<HTMLUListElement>(null);
    const [rail, setRail] = useState({ start: true, end: false, label: '1–3 of 6', progress: 50 });
    const updateRail = useCallback(() => {
        const node = track.current, card = node?.firstElementChild as HTMLElement | null;
        if (!node || !card)
            return;
        const gap = Number.parseFloat(getComputedStyle(node).gap) || 0, step = card.offsetWidth + gap;
        const first = Math.round(node.scrollLeft / step), count = Math.max(1, Math.round((node.clientWidth + gap) / step)), total = node.children.length;
        const end = node.scrollLeft >= node.scrollWidth - node.clientWidth - 3;
        setRail({ start: node.scrollLeft < 3, end, label: `${first + 1}–${Math.min(total, first + count)} of ${total}`, progress: node.scrollWidth <= node.clientWidth ? 100 : (node.scrollLeft + node.clientWidth) / node.scrollWidth * 100 });
    }, []);
    useEffect(() => { const node = track.current; if (!node)
        return; const observer = new ResizeObserver(updateRail); observer.observe(node); return () => observer.disconnect(); }, [updateRail]);
    const scrollRail = (direction: number) => { const node = track.current; if (node)
        node.scrollBy({ left: direction * node.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); };
    const onRailKey = (event: KeyboardEvent<HTMLUListElement>) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollRail(event.key === 'ArrowRight' ? 1 : -1);
    } };
    return { track, rail, updateRail, scrollRail, onRailKey };
}
type DashboardNode = HTMLDivElement & {
    _st?: FarmStory;
};
export function useDashboardDemo() {
    const dashboard = useRef<DashboardNode>(null), dialog = useRef<HTMLDivElement>(null);
    const [story, setStory] = useState(initialFarmStory), [screen, setScreen] = useState<'ov' | 'dv'>('ov'), [modal, setModal] = useState(''), [more, setMore] = useState(false);
    const visible = useVisible(dashboard);
    // The renderer reads a snapshot only; React remains the owner of demo state.
    useEffect(() => { if (dashboard.current)
        dashboard.current._st = story; }, [story]);
    useEffect(() => {
        if (!visible)
            return;
        let timer: ReturnType<typeof setInterval> | undefined;
        const start = () => { clearInterval(timer); if (!document.hidden)
            timer = setInterval(() => setStory(advanceFarmStory), 1200); };
        start();
        document.addEventListener('visibilitychange', start);
        return () => { clearInterval(timer); document.removeEventListener('visibilitychange', start); };
    }, [visible]);
    const go = useCallback((next: 'ov' | 'dv') => { setScreen(next); setMore(false); dashboard.current?.querySelector('.db-main')?.scrollTo({ top: 0 }); }, []);
    useEffect(() => { dashboard.current?.dispatchEvent(new CustomEvent('dbscreen')); }, [screen]);
    useEffect(() => { const node = dashboard.current; if (!node)
        return; const change = (event: Event) => { const next = (event as CustomEvent).detail; if (next === 'dv' || next === 'ov')
        go(next); }; node.addEventListener('dbgo', change); return () => node.removeEventListener('dbgo', change); }, [go]);
    useEffect(() => {
        if (!modal)
            return;
        const box = dialog.current, previous = document.activeElement as HTMLElement | null;
        if (!box)
            return;
        const focusable = () => Array.from(box.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex="0"]'));
        focusable()[0]?.focus();
        const onKey = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') {
            setModal('');
            return;
        } if (event.key === 'Tab') {
            const nodes = focusable(), first = nodes[0], last = nodes.at(-1);
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        } };
        document.addEventListener('keydown', onKey);
        return () => { document.removeEventListener('keydown', onKey); previous?.focus(); };
    }, [modal]);
    useEffect(() => { if (!more)
        return; const dismiss = (event: PointerEvent) => { const target = event.target as Element; if (!target.closest('.db-pop,.db-morebtn'))
        setMore(false); }; const key = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape')
        setMore(false); }; document.addEventListener('pointerdown', dismiss); document.addEventListener('keydown', key); return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', key); }; }, [more]);
    const openModal = (name: string) => { setMore(false); setModal(name); };
    const text: Record<string, string> = storyText(story, screen, modal);
    return { dashboard, dialog, story, setStory, screen, go, modal, setModal, openModal, more, setMore, text };
}
