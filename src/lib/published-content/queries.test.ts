import {beforeEach,it,expect,vi} from 'vitest';
const mocks=vi.hoisted(()=>({product:vi.fn(),solution:vi.fn(),productRevision:vi.fn(),solutionRevision:vi.fn(),wrappers:[] as {key:string[];tags:string[]}[]}));
vi.mock('@/lib/db/prisma',()=>({prisma:{product:{findFirst:mocks.product},solution:{findFirst:mocks.solution},productRevision:{findFirst:mocks.productRevision},solutionRevision:{findFirst:mocks.solutionRevision}}}));
vi.mock('next/cache',()=>({unstable_cache:(fn:unknown,key:string[],options:{tags:string[]})=>{mocks.wrappers.push({key,tags:options.tags});return fn;}}));
import {getPublishedPage} from './queries';
beforeEach(()=>vi.clearAllMocks());
it('uses separate invalidation tags for public products and solutions',()=>{
 expect(mocks.wrappers).toEqual(expect.arrayContaining([expect.objectContaining({tags:['published-products-v1']}),expect.objectContaining({tags:['published-solutions-v1']})]));
});
it('only reads the published product revision and excludes private columns from the pointer query',async()=>{
 mocks.product.mockResolvedValue({id:'p',slug:'meter',publishedRevisionId:'live'});mocks.productRevision.mockResolvedValue({document:{html:'published'}});
 expect(await getPublishedPage('products','meter')).toMatchObject({revisionId:'live',document:{html:'published'}});
 expect(mocks.product).toHaveBeenCalledWith(expect.objectContaining({where:expect.objectContaining({isDraft:false,contentMode:'HTML',publishedRevisionId:{not:null}}),select:{id:true,slug:true,publishedRevisionId:true}}));
 expect(mocks.productRevision).toHaveBeenCalledWith({where:{id:'live',productId:'p'},select:{document:true}});
});
it('does not look up any revision for a hidden, draft or deleted page',async()=>{
 mocks.solution.mockResolvedValue(null);expect(await getPublishedPage('solutions','private')).toBeNull();expect(mocks.solutionRevision).not.toHaveBeenCalled();
});
it('does not expose an orphaned revision',async()=>{
 mocks.solution.mockResolvedValue({id:'s',slug:'cold',publishedRevisionId:'deleted'});mocks.solutionRevision.mockResolvedValue(null);expect(await getPublishedPage('solutions','cold')).toBeNull();
});
