'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';
import {startImportedScripts} from '@/lib/solution-import/browser-runtime';

export default function PublishedRuntime({scripts,children}:{scripts:string[];children:ReactNode}){
 const root=useRef<HTMLDivElement>(null);
 const [attempt,setAttempt]=useState(0),[error,setError]=useState(false);
 useEffect(()=>{
  const host=root.current;if(!host)return;
  const controller=new AbortController();let disposed=false,cleanup:(()=>void)|undefined;
  const timeout=setTimeout(()=>controller.abort(),30000);
  Promise.all(scripts.map(async url=>{
   const response=await fetch(url,{signal:controller.signal});
   if(!response.ok)throw new Error('Published script unavailable');
   return `${await response.text()}\n//# sourceURL=${url}`;
  })).then(sources=>{clearTimeout(timeout);if(!disposed){cleanup=startImportedScripts(host,sources);host.dataset.importStatus='ready';}})
   .catch(error=>{clearTimeout(timeout);if(!disposed){console.error('[PUBLISHED_CONTENT_LOAD]',error);host.dataset.importStatus='error';host.querySelectorAll('.rv').forEach(el=>el.classList.add('in'));setError(true);}});
  return()=>{disposed=true;clearTimeout(timeout);controller.abort();cleanup?.();};
 },[scripts,attempt]);
 return <><div ref={root} data-published-content>{children}</div>{error&&<div role="status" className="mx-auto max-w-6xl px-6 py-4 text-sm text-slate-600">Some interactive features could not load. <button type="button" className="underline" onClick={()=>{setError(false);setAttempt(value=>value+1);}}>Retry</button></div>}</>;
}
