// @vitest-environment jsdom
import {act,useRef} from 'react';
import {createRoot,type Root} from 'react-dom/client';
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {useCatalogHeaderOffset} from './useCatalogHeaderOffset';

let root:Root,host:HTMLDivElement,desktop:HTMLElement,mobile:HTMLElement;
let desktopRect:{height:number;bottom:number},mobileRect:{height:number;bottom:number};
let resize:()=>void;
const disconnect=vi.fn();
function Catalogue(){const ref=useRef<HTMLDivElement>(null);useCatalogHeaderOffset(ref);return <div ref={ref} className="njprod"/>;}
beforeEach(()=>{
 globalThis.IS_REACT_ACT_ENVIRONMENT=true;
 desktopRect={height:80,bottom:80};mobileRect={height:0,bottom:0};disconnect.mockClear();
 vi.stubGlobal('ResizeObserver',class{constructor(callback:()=>void){resize=callback;}observe(){}disconnect=disconnect;});
 desktop=document.createElement('header');mobile=document.createElement('header');
 for(const header of [desktop,mobile])header.setAttribute('data-site-header','');
 desktop.getBoundingClientRect=()=>desktopRect as DOMRect;mobile.getBoundingClientRect=()=>mobileRect as DOMRect;
 document.body.append(desktop,mobile);host=document.createElement('div');document.body.append(host);root=createRoot(host);
});
afterEach(()=>{act(()=>root.unmount());host.remove();desktop.remove();mobile.remove();vi.unstubAllGlobals();});
const offset=()=>host.querySelector<HTMLElement>('.njprod')!.style.getPropertyValue('--top');
it('follows the desktop navbar as it shrinks instead of retaining an 80px gap',()=>{
 act(()=>root.render(<Catalogue/>));expect(offset()).toBe('80px');desktopRect={height:64,bottom:64};act(()=>resize());expect(offset()).toBe('64px');
});
it('includes the floating mobile navbar top inset and ignores the hidden desktop header',()=>{
 desktopRect={height:0,bottom:0};mobileRect={height:64,bottom:78};act(()=>root.render(<Catalogue/>));expect(offset()).toBe('78px');
 mobileRect={height:64,bottom:80};act(()=>window.dispatchEvent(new Event('resize')));expect(offset()).toBe('80px');
});
it('switches between the visible headers at responsive breakpoints and releases its observer',()=>{
 act(()=>root.render(<Catalogue/>));desktopRect={height:0,bottom:0};mobileRect={height:64,bottom:78};act(()=>resize());expect(offset()).toBe('78px');
 act(()=>root.render(null));expect(disconnect).toHaveBeenCalledOnce();
});
