'use client';
import {useEffect,useId,useRef,useState,type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import Link from 'next/link';
import BrochureDownloadButton from '@/components/shared/BrochureDownloadButton';
import ProductCard from './catalog/ProductCard';
import type {ImportMetadata} from '@/lib/solution-import/types';
import type {CatalogProduct,Taxonomy} from '@/lib/products/catalog';
import './catalog/catalog.css';
export default function ImportedProduct({metadata,children,related,categories}:{metadata:Pick<ImportMetadata,'title'|'brochureUrl'>;children:ReactNode;related:CatalogProduct[];categories:Taxonomy['categories']}){
 const root=useRef<HTMLDivElement>(null),eventName=`najhum-product-download-${useId()}`;
 const [slot,setSlot]=useState<Element|null>(null);
 useEffect(()=>{
  const host=root.current;if(!host)return;
  const selector='[data-najhum-action="download-datasheet"],[data-najhum-slot="related-products"]';
  let activeSlot:Element|null=null;
  const sync=()=>{
   const next=host.querySelector('[data-najhum-slot="related-products"]');
   if(next!==activeSlot){activeSlot=next;setSlot(next);}
   host.querySelectorAll<HTMLElement>('[data-najhum-action="download-datasheet"]').forEach(el=>{
    if(!metadata.brochureUrl){el.style.display='none';el.setAttribute('aria-hidden','true');}
   });
  };
  sync();
  // Imported scripts can add hooks later. Ignore routine chart/text animation mutations.
  const observer=new MutationObserver(records=>{
   const relevant=records.some(record=>Array.from(record.addedNodes).some(node=>node instanceof Element&&(node.matches(selector)||node.querySelector(selector)))||Array.from(record.removedNodes).some(node=>activeSlot&&(node===activeSlot||node.contains(activeSlot))));
   if(relevant)sync();
  });
  observer.observe(host,{subtree:true,childList:true});
  const click=(event:MouseEvent)=>{const trigger=event.target instanceof Element?event.target.closest('[data-najhum-action="download-datasheet"]'):null;if(trigger&&host.contains(trigger)){event.preventDefault();event.stopPropagation();if(metadata.brochureUrl)window.dispatchEvent(new Event(eventName));}};
  host.addEventListener('click',click,true);
  return()=>{observer.disconnect();host.removeEventListener('click',click,true);};
 },[metadata.brochureUrl,eventName]);

 const cards=related.length?<div className="njprod"><section className="wrap catalog-related" aria-label="Related products"><div className="related-heading"><h2 className="h2">Related products</h2><Link href="/products">All devices →</Link></div><div className="grid">{related.map(product=><ProductCard key={product.id} product={product} categories={categories}/>)}</div></section></div>:null;
 return <><div ref={root}>{children}</div>{slot?createPortal(cards,slot):cards}{metadata.brochureUrl&&<BrochureDownloadButton brochureUrl={metadata.brochureUrl} productName={metadata.title} externalTriggerEvent={eventName} hideTrigger/>}</>;
}
