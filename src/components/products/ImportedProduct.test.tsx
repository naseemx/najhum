// @vitest-environment jsdom
import {act,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {it,expect,vi} from 'vitest';
const opened=vi.hoisted(()=>vi.fn());
vi.mock('@/components/shared/BrochureDownloadButton',()=>({default:function MockBrochure({externalTriggerEvent}:{externalTriggerEvent?:string}){
 useEffect(()=>{if(!externalTriggerEvent)return;window.addEventListener(externalTriggerEvent,opened);return()=>window.removeEventListener(externalTriggerEvent,opened);},[externalTriggerEvent]);return null;
}}));
vi.mock('./catalog/ProductCard',()=>({default:({product}:{product:{name:string}})=><article>{product.name}</article>}));
import ImportedProduct from './ImportedProduct';
it('keeps the datasheet hook and admin-selected related slot working with server-rendered children',async()=>{
 vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT',true);const container=document.createElement('div');document.body.append(container);const root=createRoot(container);
 const related=[{id:'selected',name:'Selected sensor'}] as Parameters<typeof ImportedProduct>[0]['related'];
 await act(async()=>root.render(<ImportedProduct metadata={{title:'Meter',brochureUrl:'https://media.test/meter.pdf'}} related={related} categories={[]}><section><button data-najhum-action="download-datasheet">Download</button><div data-najhum-slot="related-products"/></section></ImportedProduct>));
 expect(container.querySelector('[data-najhum-slot] article')?.textContent).toBe('Selected sensor');expect(container.querySelectorAll('article')).toHaveLength(1);
 act(()=>container.querySelector<HTMLButtonElement>('[data-najhum-action]')!.click());expect(opened).toHaveBeenCalledOnce();
 act(()=>root.unmount());container.remove();vi.unstubAllGlobals();
});
