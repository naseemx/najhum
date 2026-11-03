'use client';
import {useEffect,useState} from 'react';
export default function AccentHeading({id,label,value,onChange}:{id:string;label:string;value:string;onChange:(value:string)=>void}){
 const plain=value.replace(/\[([^\]]+)\]/g,'$1');const selected=value.match(/\[([^\]]+)\]/)?.[1]||'';
 const [phrase,setPhrase]=useState(selected);const [error,setError]=useState('');
 useEffect(()=>setPhrase(selected),[selected]);
 return <div className="blog-field pf-heading-control"><label htmlFor={id}>{label}</label><input id={id} value={plain} onChange={event=>{const text=event.target.value;onChange(selected&&text.includes(selected)?text.replace(selected,`[${selected}]`):text);}}/>
 <label className="pf-sub-label" htmlFor={`${id}-accent`}>Words to highlight in blue <span>Optional</span></label><input id={`${id}-accent`} value={phrase} placeholder="For example: connected infrastructure" onChange={e=>{setPhrase(e.target.value);setError('');}} onBlur={()=>{const text=phrase.trim();if(text&&!plain.includes(text)){setError('Use words that appear in the heading above.');return;}onChange(text?plain.replace(text,`[${text}]`):plain);}}/>
 {error?<small role="alert">{error}</small>:<small>Enter a phrase from the heading. The preview shows its brand colour automatically.</small>}
 </div>;
}
