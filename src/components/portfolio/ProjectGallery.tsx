 'use client';
import { useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { GalleryImage } from '@/lib/portfolio/schema';
export default function ProjectGallery({images,layout='grid'}:{images:GalleryImage[];layout?:string}) {
 const [active,setActive]=useState(0);const dialog=useRef<HTMLDialogElement>(null);
 const usable=images.filter(image=>image.url);if(!usable.length)return null;
 return <><div className={`pf-gallery ${layout==='full'?'pf-gallery-full':layout==='mixed'?'pf-gallery-mixed':''}`}>{usable.map((image,index)=><figure key={`${image.url}-${index}`}><button type="button" onClick={()=>{setActive(index);dialog.current?.showModal();}} aria-label={`Enlarge image: ${image.alt}`}><img src={image.url} alt={image.alt} loading="lazy"/><Maximize2 size={18}/></button>{image.caption&&<figcaption>{image.caption}</figcaption>}</figure>)}</div><dialog ref={dialog} className="pf-lightbox" aria-label="Project image viewer" onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}} onKeyDown={event=>{if(event.key==='ArrowRight')setActive((active+1)%usable.length);if(event.key==='ArrowLeft')setActive((active-1+usable.length)%usable.length);}}><button type="button" className="pf-lightbox-close" aria-label="Close image viewer" onClick={()=>dialog.current?.close()}><X/></button><img src={usable[active]?.url} alt={usable[active]?.alt}/><p>{usable[active]?.caption}</p>{usable.length>1&&<div><button aria-label="Previous image" onClick={()=>setActive((active-1+usable.length)%usable.length)}><ChevronLeft/></button><span>{active+1} / {usable.length}</span><button aria-label="Next image" onClick={()=>setActive((active+1)%usable.length)}><ChevronRight/></button></div>}</dialog></>;
}
