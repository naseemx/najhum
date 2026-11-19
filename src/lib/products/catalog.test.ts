import {it,expect,vi} from 'vitest';
const mocks=vi.hoisted(()=>({related:vi.fn(),products:vi.fn(),categories:vi.fn(),groups:vi.fn()}));
vi.mock('next/cache',()=>({unstable_cache:(fn:unknown)=>fn}));
vi.mock('@/lib/db/prisma',()=>({prisma:{relatedProduct:{findMany:mocks.related},product:{findMany:mocks.products},productCategory:{findMany:mocks.categories},productFilterGroup:{findMany:mocks.groups}}}));
import {getCatalogProducts,getRelatedCatalogProducts,getProductCardCategories} from './catalog';
it('loads only admin-selected visible related products in their saved order',async()=>{
 const product=(id:string)=>({id,slug:id,name:id,modelCode:'',description:'',imageUrl:null,platforms:[],brochureUrl:null,features:[],categoryAssignments:[{categoryId:'c'}],filterAssignments:[]});
 mocks.related.mockResolvedValue([{target:product('third')},{target:product('second')}]);
 expect((await getRelatedCatalogProducts('current')).map(p=>p.id)).toEqual(['third','second']);expect(mocks.products).not.toHaveBeenCalled();
 expect(mocks.related).toHaveBeenCalledWith(expect.objectContaining({where:{sourceId:'current',target:{isListed:true,isDraft:false,contentMode:'HTML',publishedRevisionId:{not:null}}},orderBy:{position:'asc'}}));
});
it('does not load filter groups for detail-page card labels',async()=>{
 mocks.categories.mockResolvedValue([]);await getProductCardCategories();expect(mocks.categories).toHaveBeenCalledOnce();expect(mocks.groups).not.toHaveBeenCalled();
});

it('excludes unlisted products from the catalogue',async()=>{
 mocks.products.mockResolvedValue([]);await getCatalogProducts();
 expect(mocks.products).toHaveBeenCalledWith(expect.objectContaining({where:expect.objectContaining({isListed:true,isDraft:false,publishedRevisionId:{not:null}})}));
});
