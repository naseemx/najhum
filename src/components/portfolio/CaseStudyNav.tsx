'use client';
import {useEffect,useState} from 'react';
import {ChevronDown,List} from 'lucide-react';
import '../blog/contents-panel.css';
export default function CaseStudyNav({items,preview=false}:{items:{id:string;title:string}[];preview?:boolean}){
 const [active,setActive]=useState(items[0]?.id||'');
 useEffect(()=>{
  if(preview||!('IntersectionObserver' in window))return;
  const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(visible[0])setActive(visible[0].target.id);},{rootMargin:'-100px 0px -55% 0px',threshold:0});
  for(const item of items){const element=document.getElementById(item.id);if(element)observer.observe(element);}
  return()=>observer.disconnect();
 },[items,preview]);
 return (
  <nav className="journal-toc pc-wrap pc-contents" aria-label="Case study sections">
   <details open>
    <summary>
     <span><List size={18} aria-hidden="true"/>In this project</span>
     <ChevronDown size={17} aria-hidden="true"/>
    </summary>
    <ol>
     {items.map(item=>(
      <li key={item.id}>
       <a href={`#${item.id}`} onClick={()=>setActive(item.id)} aria-current={active===item.id?'location':undefined}>
        {item.title}
       </a>
      </li>
     ))}
    </ol>
   </details>
  </nav>
 );
}
