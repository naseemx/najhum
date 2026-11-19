'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import './cropifai-design.css';
export default function CropifaiFrame({ children }: {
    children: ReactNode;
}) {
    const root = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const host = root.current;
        if (!host)
            return;
        let cancelled = false, dispose: (() => void) | undefined;
        host.classList.add('js');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) {
            entry.target.classList.add('in');
            reveal.unobserve(entry.target);
        } }), { rootMargin: '0px 0px -5% 0px' });
        host.querySelectorAll('.rv').forEach(node => { if (reduced)
            node.classList.add('in');
        else
            reveal.observe(node); });
        const header = document.querySelector('header');
        const update = () => host.style.setProperty('--solution-header-height', `${header?.getBoundingClientRect().height || 80}px`);
        update();
        const resize = new ResizeObserver(update);
        if (header)
            resize.observe(header);
        const start = new IntersectionObserver(entries => { if (!entries.some(entry => entry.isIntersecting))
            return; start.disconnect(); void import('./farm-scenes').then(module => { if (!cancelled)
            dispose = module.mountFarmScenes(host); }).catch(error => console.warn('cropifAI scenes unavailable', error)); }, { rootMargin: '180px' });
        const target = host.querySelector('.bx-map');
        if (target)
            start.observe(target);
        return () => { cancelled = true; host.classList.remove('js'); reveal.disconnect(); resize.disconnect(); start.disconnect(); dispose?.(); };
    }, []);
    return <div ref={root} className="njcr cropifai-react">{children}</div>;
}
