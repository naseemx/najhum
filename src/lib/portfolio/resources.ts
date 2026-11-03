export type PortfolioResource={id:string;kind:'Product'|'Solution';title:string;href:string;image?:string|null};
export function selectedResources(items:PortfolioResource[],project:{productIds:string[];solutionIds:string[]}){
 return items.filter(item=>(item.kind==='Product'?project.productIds:project.solutionIds).includes(item.id));
}
