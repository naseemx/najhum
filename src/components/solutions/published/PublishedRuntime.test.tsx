// @vitest-environment jsdom
import {act,StrictMode} from 'react';
import {createRoot,type Root} from 'react-dom/client';
import {beforeEach,afterEach,it,expect,vi} from 'vitest';
import PublishedRuntime from './PublishedRuntime';
let container:HTMLDivElement,root:Root;
const fetchMock=vi.fn();
beforeEach(()=>{vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT',true);vi.stubGlobal('fetch',fetchMock);fetchMock.mockReset();vi.stubGlobal('IntersectionObserver',class{observe(){}disconnect(){}});vi.stubGlobal('ResizeObserver',class{});container=document.createElement('div');document.body.append(container);root=createRoot(container);});
afterEach(()=>{act(()=>root.unmount());container.remove();vi.unstubAllGlobals();vi.restoreAllMocks();});
it('preserves the rendered HTML node, executes original scripts in order and cleans their resources',async()=>{
 fetchMock.mockImplementation(async(url:string)=>new Response(url.includes('0.js')?'document.querySelector("#site").dataset.order="first";':'var el=document.querySelector("#site");el.dataset.order+="-second";window.addEventListener("scroll",function(){el.dataset.scrolled="yes"});var badge=document.createElement("b");badge.id="generated";el.appendChild(badge);'));
 act(()=>root.render(<PublishedRuntime scripts={['/script-0.js','/script-1.js']}><div id="site">Original HTML</div></PublishedRuntime>));
 const original=container.querySelector('#site')!;
 await act(async()=>{await new Promise(resolve=>setTimeout(resolve,0));});
 expect(container.querySelector('#site')).toBe(original);expect(original.getAttribute('data-order')).toBe('first-second');
 act(()=>root.render(null));window.dispatchEvent(new Event('scroll'));expect(original.getAttribute('data-scrolled')).toBeNull();expect(original.querySelector('#generated')).toBeNull();
});
it('does not initialize twice under React Strict Mode',async()=>{
 fetchMock.mockResolvedValue(new Response('var el=document.querySelector("#site");el.dataset.runs=String(Number(el.dataset.runs||0)+1);'));
 // Each fetch must have its own response body.
 fetchMock.mockImplementation(async()=>new Response('var el=document.querySelector("#site");el.dataset.runs=String(Number(el.dataset.runs||0)+1);'));
 await act(async()=>root.render(<StrictMode><PublishedRuntime scripts={['/script-0.js']}><div id="site"/></PublishedRuntime></StrictMode>));
 expect(container.querySelector('#site')?.getAttribute('data-runs')).toBe('1');
});
it('keeps page content visible and supports recovery if a script download fails',async()=>{
 fetchMock.mockRejectedValueOnce(new Error('offline'));vi.spyOn(console,'error').mockImplementation(()=>{});
 await act(async()=>root.render(<PublishedRuntime scripts={['/script-0.js']}><div id="site" className="rv">Content</div></PublishedRuntime>));
 expect(container.textContent).toContain('Content');expect(container.querySelector('#site')?.classList.contains('in')).toBe(true);expect(container.textContent).toContain('Retry');
 fetchMock.mockResolvedValueOnce(new Response('document.querySelector("#site").dataset.ready="yes";'));
 await act(async()=>container.querySelector('button')!.click());expect(container.querySelector('#site')?.getAttribute('data-ready')).toBe('yes');
});
