import {it,expect,vi} from 'vitest';
import {NextRequest} from 'next/server';
const m=vi.hoisted(()=>({solutions:vi.fn(),products:vi.fn()}));
vi.mock('@/lib/db/prisma',()=>({prisma:{solution:{findMany:m.solutions},product:{findMany:m.products},blogPost:{findMany:async()=>[]},portfolioProject:{findMany:async()=>[]}}}));
import {GET} from './route';
it('excludes published unlisted solutions and products from public search',async()=>{
 m.solutions.mockResolvedValue([]);m.products.mockResolvedValue([]);
 const response=await GET(new NextRequest('http://localhost/api/search?q=share'));
 expect(response.status).toBe(200);
 for(const find of [m.solutions,m.products])expect(find).toHaveBeenCalledWith(expect.objectContaining({where:expect.objectContaining({isDraft:false,isListed:true})}));
});
