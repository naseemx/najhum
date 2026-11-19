import type {PublishedKind} from './constants';
/** Inline SVG filters/masks must still resolve against the page after CSS moves to its own URL. */
export function preparePublishedCss(css:string,kind:PublishedKind,slug:string){
 const path=`/${kind}/${encodeURIComponent(slug)}`;
 return css.replace(/url\(\s*(['"]?)(#[^\s)'";]+)\1\s*\)/gi,(_match,_quote,fragment:string)=>`url("${path}${fragment}")`);
}
