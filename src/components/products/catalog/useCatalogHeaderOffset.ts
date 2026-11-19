'use client';

import {useEffect, type RefObject} from 'react';

/** The desktop navbar shrinks on scroll; the floating mobile navbar also has a top inset. */
export function useCatalogHeaderOffset(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const headers = Array.from(document.querySelectorAll<HTMLElement>('[data-site-header]'));
    const update = () => {
      const header = headers.find(node => node.getBoundingClientRect().height > 0);
      if (header) host.style.setProperty('--top', `${header.getBoundingClientRect().bottom}px`);
    };
    update();
    const observer = new ResizeObserver(update);
    // Navbar shrink changes padding, so observe the full border box.
    headers.forEach(header => observer.observe(header, {box: 'border-box'}));
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      host.style.removeProperty('--top');
    };
  }, [root]);
}
