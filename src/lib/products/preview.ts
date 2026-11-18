import {parseDocument} from 'htmlparser2';
import {findAll,getOuterHTML,removeElement,appendChild} from 'domutils';
import type {Element} from 'domhandler';
import type {ImportedDocument} from '@/lib/solution-import/types';
import {getCatalogProducts} from './catalog';
const escape=(value:string)=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
/** Preview uses the saved draft's selections, without publishing catalogue relationships. */
export async function prepareProductPreview(page:ImportedDocument,run:string){
 const copy=structuredClone(page),dom=parseDocument(copy.html);
 const slots=findAll(node=>node.type==='tag'&&(node as Element).attribs?.['data-najhum-slot']==='related-products',dom.children) as Element[];
 const selected=copy.metadata.relatedProductIds||[];
 if(selected.length){const products=await getCatalogProducts();const related=selected.map(id=>products.find(p=>p.id===id)).filter((p):p is typeof products[number]=>!!p);if(related.length){const cards='<section style="padding:36px 20px;max-width:1200px;margin:auto"><h2 style="font-size:26px;margin-bottom:20px">Related products</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px">'+related.map(p=>`<a href="/products/${encodeURIComponent(p.slug)}" style="display:flex;flex-direction:column;gap:12px;padding:20px;border:1px solid #e2e8f0;border-radius:18px;background:#fff;color:#0f172a;text-decoration:none"><img src="${escape(p.image)}" alt="${escape(p.name)}" style="width:100%;height:180px;object-fit:contain"><small>${escape(p.model)}</small><strong>${escape(p.name)}</strong><p>${escape(p.description)}</p></a>`).join('')+'</div></section>';const target=slots[0]||dom;for(const child of [...target.children])if(slots[0])removeElement(child);for(const node of [...parseDocument(cards).children])appendChild(target,node);}}
 if(!copy.metadata.brochureUrl){for(const node of findAll(node=>node.type==='tag'&&(node as Element).attribs?.['data-najhum-action']==='download-datasheet',dom.children))removeElement(node);}
 copy.html=getOuterHTML(dom);
 copy.scripts.push(`document.addEventListener('click',function(event){var element=event.target.closest&&event.target.closest('[data-najhum-action="download-datasheet"]');if(element){event.preventDefault();parent.postMessage({type:'product-preview-download',run:${JSON.stringify(run)}},'*');}},true);`);
 return copy;
}
