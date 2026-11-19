import {it,expect,vi} from 'vitest';
const find=vi.hoisted(()=>vi.fn());
vi.mock('@/lib/db/prisma',()=>({prisma:{solution:{findMany:find}}}));
import {GET} from './route';
it('only exposes published listed pages to navigation and footer links',async()=>{
 find.mockResolvedValue([]);const response=await GET();expect(response.status).toBe(200);
 expect(find).toHaveBeenCalledWith(expect.objectContaining({where:{isListed:true,isDraft:false,contentMode:'HTML',publishedRevisionId:{not:null}}}));
});
