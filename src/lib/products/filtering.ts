import type {CatalogProduct,Taxonomy} from './catalog';
export type CatalogFilter={query:string;category:string;selected:string[]};
export function matchesProduct(p:CatalogProduct,taxonomy:Taxonomy,state:CatalogFilter,skipGroup?:string,skipCategory=false){
 if(!skipCategory&&state.category&&!p.categoryIds.includes(state.category))return false;
 const haystack=[p.name,p.model,p.description,...p.highlights,...p.categoryIds.map(id=>taxonomy.categories.find(c=>c.id===id)?.name||'')].join(' ').toLowerCase();
 if(!state.query.trim().toLowerCase().split(/\s+/).every(word=>haystack.includes(word)))return false;
 return taxonomy.groups.every(g=>{if(g.id===skipGroup)return true;const chosen=g.options.filter(o=>state.selected.includes(o.id));return !chosen.length||chosen.some(o=>p.optionIds.includes(o.id));});
}
