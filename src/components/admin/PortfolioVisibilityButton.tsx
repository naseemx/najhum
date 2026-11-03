'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Eye,EyeOff} from 'lucide-react';
export default function PortfolioVisibilityButton({id,kind,hidden}:{id:string;kind:'portfolio'|'products'|'solutions';hidden:boolean}){
 const router=useRouter();const [busy,setBusy]=useState(false);const [error,setError]=useState('');
 async function toggle(){
  setBusy(true);setError('');
  try{
   const solution=kind==='solutions';
   const response=await fetch(`/api/admin/${kind}/${id}${solution?(hidden?'/publish':'/unpublish'):''}`,solution?{method:'POST'}:{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({isDraft:!hidden})});
   if(!response.ok){const result=await response.json();throw new Error(result.error||'Could not update visibility.');}
   router.refresh();
  }catch(error){setError(error instanceof Error?error.message:'Could not update visibility.');}
  finally{setBusy(false);}
 }
 return <><button type="button" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 disabled:opacity-50" disabled={busy} onClick={()=>void toggle()}>{hidden?<Eye size={15}/>:<EyeOff size={15}/>} {busy?'Updating…':hidden?'Show on website':'Hide from website'}</button>{error&&<p role="alert" className="text-xs text-red-700">{error}</p>}</>;
}
