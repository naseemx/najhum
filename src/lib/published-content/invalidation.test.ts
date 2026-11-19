import {beforeEach,it,expect,vi} from 'vitest';
const mocks=vi.hoisted(()=>({path:vi.fn(),tag:vi.fn()}));
vi.mock('next/cache',()=>({revalidatePath:mocks.path,revalidateTag:mocks.tag,unstable_cache:(fn:unknown)=>fn}));
vi.mock('@/lib/db/prisma',()=>({prisma:{}}));
vi.mock('@/lib/db/queries/solutions',()=>({getSolutionById:vi.fn()}));
import {refreshProducts} from '@/lib/products/server';
import {revalidateSolutions} from '@/lib/utils/revalidate-solutions';
beforeEach(()=>vi.clearAllMocks());
it('expires product data immediately and invalidates every detail page containing related cards',()=>{
 refreshProducts('old-slug','new-slug');expect(mocks.tag).toHaveBeenCalledWith('published-products-v1',{expire:0});
 expect(mocks.path).toHaveBeenCalledWith('/products/[slug]','page');expect(mocks.path).toHaveBeenCalledWith('/products/old-slug');expect(mocks.path).toHaveBeenCalledWith('/products/new-slug');
});
it('expires solution data immediately for publication, visibility and deletion changes',()=>{
 revalidateSolutions('cold-storage');expect(mocks.tag).toHaveBeenCalledWith('published-solutions-v1',{expire:0});expect(mocks.path).toHaveBeenCalledWith('/solutions/[slug]','page');expect(mocks.path).toHaveBeenCalledWith('/solutions/cold-storage');
});
