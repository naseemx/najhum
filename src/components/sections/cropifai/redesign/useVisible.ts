'use client';
import { useEffect, useState, type RefObject } from 'react';
export function useVisible(ref: RefObject<HTMLElement | null>) { const [visible, setVisible] = useState(false); useEffect(() => { const node = ref.current; if (!node)
    return; const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: .05 }); observer.observe(node); return () => observer.disconnect(); }, [ref]); return visible; }
