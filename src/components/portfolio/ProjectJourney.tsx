'use client';
import {useLayoutEffect,useRef,useState} from 'react';
import {Building2,Zap,Wind,BellRing,Settings2,Activity,Cloud,Network,Smartphone,BarChart3} from 'lucide-react';
import type {CaseStudy} from '@/lib/portfolio/schema';
const icons={building:Building2,energy:Zap,air:Wind,alert:BellRing,settings:Settings2,sensor:Activity,cloud:Cloud,network:Network,mobile:Smartphone,chart:BarChart3};
export default function ProjectJourney({title,steps}:{title:string;steps:CaseStudy['architectureSteps']}){
 const board=useRef<HTMLDivElement>(null);
 const [route,setRoute]=useState('');
 const followMotion=useRef<()=>void>(()=>{});
 useLayoutEffect(()=>{
  const element=board.current;if(!element)return;
  const update=()=>{
   const bounds=element.getBoundingClientRect();
   const pins=[...element.querySelectorAll('.pc-journey-pin')].map(pin=>{const rect=pin.getBoundingClientRect();return{x:rect.left-bounds.left+rect.width/2,y:rect.top-bounds.top+rect.height/2};});
   setRoute(pins.map((pin,i)=>{if(!i)return `M ${pin.x} ${pin.y}`;const prev=pins[i-1];const mid=(prev.y+pin.y)/2;return `C ${prev.x} ${mid}, ${pin.x} ${mid}, ${pin.x} ${pin.y}`;}).join(' '));
  };
  let frame=0;
  followMotion.current=()=>{
   if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
   cancelAnimationFrame(frame);const start=performance.now();
   const tick=()=>{update();if(performance.now()-start<450)frame=requestAnimationFrame(tick);};
   frame=requestAnimationFrame(tick);
  };
  update();const observer=new ResizeObserver(update);
  observer.observe(element);
  element.querySelectorAll('.pc-flow-step').forEach(card=>observer.observe(card));
  let active=true;
  document.fonts?.ready.then(()=>{if(active)update();});
  return()=>{active=false;observer.disconnect();cancelAnimationFrame(frame);followMotion.current=()=>{};};
 },[steps]);
 if(!steps.length)return null;
 return <section className="pc-journey" aria-label={title||'Project approach'}><header><p className="pc-kicker">The connected approach</p><h3 className="pc-section-title">{title&&title!=='Monitoring approach'?title:<>Monitoring <span className="pc-title-accent">approach</span></>}</h3></header><div className="pc-journey-board" ref={board}>{steps.length>1&&<svg className="pc-journey-route" aria-hidden="true"><path d={route} fill="none" stroke="currentColor"/></svg>}<ol className="pc-journey-cards">{steps.map((step,i)=>{const Icon=icons[step.icon];return <li className="pc-flow-step" key={i} style={{gridRow:i+1}} onPointerEnter={event=>{if(event.pointerType==='mouse')followMotion.current();}} onPointerLeave={event=>{if(event.pointerType==='mouse')followMotion.current();}}><span className="pc-journey-pin" aria-hidden="true"/><article><header><span>{String(i+1).padStart(2,'0')}</span><Icon size={24}/></header><h4>{step.title}</h4>{step.description&&<p>{step.description}</p>}</article></li>;})}</ol></div></section>;
}
