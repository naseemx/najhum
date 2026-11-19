import Link from 'next/link';
import BrochureDownloadButton from '@/components/shared/BrochureDownloadButton';
import {ArrowUpRight,Package} from 'lucide-react';
import type {CatalogProduct,Taxonomy} from '@/lib/products/catalog';
export default function ProductCard({product,categories}:{product:CatalogProduct;categories:Taxonomy['categories']}){
 const category=categories.find(c=>product.categoryIds.includes(c.id));
 return <article className="card"><Link href={`/products/${encodeURIComponent(product.slug)}`} className="media" aria-label={`View ${product.name}`}>{product.image?<img src={product.image} alt={product.name} width="600" height="600" loading="lazy"/>:<Package size={54} className="empty-image"/>}{product.model&&<span className="model">{product.model}</span>}</Link><div className="cbody"><span className="cat">{category?.name||'Connected device'}</span><h3><Link href={`/products/${encodeURIComponent(product.slug)}`}>{product.name}</Link></h3><p>{product.description}</p>{product.highlights.length>0&&<ul className="specs">{product.highlights.slice(0,3).map((text,i)=><li key={i}>{text}</li>)}</ul>}<div className="cfoot">{product.brochureUrl&&<BrochureDownloadButton brochureUrl={product.brochureUrl} productName={product.name} label="Datasheet" size="sm" className="dl"/>}<Link href={`/products/${encodeURIComponent(product.slug)}`} className="go" aria-label={`View ${product.name}`}><ArrowUpRight size={18}/></Link></div></div></article>;
}
