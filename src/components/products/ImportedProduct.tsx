'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import Link from 'next/link';
import HtmlSolution from '@/components/solutions/imported/HtmlSolution';
import BrochureDownloadButton from '@/components/shared/BrochureDownloadButton';
import ProductCard from './catalog/ProductCard';
import type {ImportedDocument} from '@/lib/solution-import/types';
import type {CatalogProduct,Taxonomy} from '@/lib/products/catalog';
import './catalog/catalog.css';
export default function ImportedProduct({document:page,related,categories}:{document:ImportedDocument;related:CatalogProduct[];categories:Taxonomy['categories']}){
 const root=useRef<HTMLDivElement>(null),eventName=`najhum-product-download-${useId()}`;
 const [slot,setSlot]=useState<Element|null>(null);
 useEffect(()=>{const host=root.current;if(!host)return;setSlot(host.querySelector('[data-najhum-slot="related-products"]'));const buttons=()=>host.querySelectorAll<HTMLElement>('[data-najhum-action="download-datasheet"]').forEach(el=>{if(!page.metadata.brochureUrl){el.style.display='none';el.setAttribute('aria-hidden','true');}});buttons();const observer=new MutationObserver(buttons);observer.observe(host,{subtree:true,childList:true});const click=(event:MouseEvent)=>{const trigger=event.target instanceof Element?event.target.closest('[data-najhum-action="download-datasheet"]'):null;if(trigger&&host.contains(trigger)){event.preventDefault();event.stopPropagation();if(page.metadata.brochureUrl)window.dispatchEvent(new Event(eventName));}};host.addEventListener('click',click,true);return()=>{observer.disconnect();host.removeEventListener('click',click,true);};},[page,eventName]);
 const cards=related.length?<div className="njprod"><section className="wrap catalog-related" aria-label="Related products"><div className="related-heading"><h2 className="h2">Related products</h2><Link href="/products">All devices →</Link></div><div className="grid">{related.map(product=><ProductCard key={product.id} product={product} categories={categories}/>)}</div></section></div>:null;
 return <><div ref={root}><HtmlSolution document={page}/></div>{slot?createPortal(cards,slot):cards}{page.metadata.brochureUrl&&<BrochureDownloadButton brochureUrl={page.metadata.brochureUrl} productName={page.metadata.title} externalTriggerEvent={eventName} hideTrigger/>}</>;
}
