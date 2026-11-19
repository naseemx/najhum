'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Eye,EyeOff} from 'lucide-react';
export default function WebsiteListingControl({id,kind,isListed,onChange}:{id:string;kind:'products'|'solutions';isListed:boolean;onChange?:(listed:boolean)=>void}){
 const router=useRouter(),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function toggle(){
  setBusy(true);setError('');
  try{
   const solution=kind==='solutions';
   const response=await fetch(`/api/admin/${kind}/${id}${solution?'/visibility':''}`,{method:solution?'POST':'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(solution?{visible:!isListed}:{isListed:!isListed})});
   const data=await response.json();if(!response.ok)throw new Error(data.error||'Could not update website listing.');
   onChange?.(solution?data.isListed:data.product.isListed);router.refresh();
  }catch(e){setError(e instanceof Error?e.message:'Could not update website listing.');}finally{setBusy(false);}
 }
 return <div><button type="button" disabled={busy} onClick={()=>void toggle()} className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 disabled:opacity-50">{isListed?<EyeOff size={15}/>:<Eye size={15}/>} {busy?'Updating…':isListed?'Hide on Website':'View on Website'}</button>{error&&<p role="alert" className="text-xs text-red-700">{error}</p>}</div>;
}
