import type {ImportedDocument} from '@/lib/solution-import/types';
import {publishedAssetBase,type PublishedKind} from '@/lib/published-content/constants';
import PublishedRuntime from './PublishedRuntime';

/** Only HTML crosses the server-component boundary; CSS and JS use versioned public URLs. */
export default function PublishedHtml({kind,slug,revisionId,document:page}:{kind:PublishedKind;slug:string;revisionId:string;document:ImportedDocument}){
 const base=publishedAssetBase(kind,slug,revisionId);
 return <>
  {page.css&&<link rel="stylesheet" href={`${base}/page.css`} precedence="imported-page"/>}
  <PublishedRuntime key={revisionId} scripts={page.scripts.map((_,index)=>`${base}/script-${index}.js`)}>
   <div dangerouslySetInnerHTML={{__html:page.html}}/>
  </PublishedRuntime>
 </>;
}
