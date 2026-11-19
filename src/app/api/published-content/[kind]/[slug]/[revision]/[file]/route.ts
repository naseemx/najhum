import {preparePublishedCss} from '@/lib/published-content/assets';
import {getPublishedPage} from '@/lib/published-content/queries';
import type {PublishedKind} from '@/lib/published-content/constants';

type Context={params:Promise<{kind:string;slug:string;revision:string;file:string}>};
/** Generated, versioned assets for published documents only; draft previews never use this route. */
export async function GET(_request:Request,{params}:Context){
 const {kind,slug,revision,file}=await params;
 const script=/^script-(0|[1-9]\d*)\.js$/.exec(file);
 if(!['products','solutions'].includes(kind)||(file!=='page.css'&&!script))return missing();
 const page=await getPublishedPage(kind as PublishedKind,slug);
 if(!page||page.revisionId!==revision)return missing();
 const source=file==='page.css'?preparePublishedCss(page.document.css,kind as PublishedKind,page.slug||slug):page.document.scripts[Number(script![1])];
 if(typeof source!=='string')return missing();
 return new Response(source,{headers:{'Content-Type':file==='page.css'?'text/css; charset=utf-8':'application/javascript; charset=utf-8','Cache-Control':'public, max-age=300, s-maxage=300','X-Content-Type-Options':'nosniff'}});
}
function missing(){return new Response('Not found',{status:404,headers:{'Cache-Control':'no-store'}});}
