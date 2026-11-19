import {beforeEach,it,expect,vi} from 'vitest';
import {NextRequest} from 'next/server';
const m=vi.hoisted(()=>({find:vi.fn(),revision:vi.fn(),update:vi.fn(),refresh:vi.fn(),auth:vi.fn(),origin:vi.fn()}));
vi.mock('@/lib/auth/require-admin',()=>({requireAdmin:m.auth,requireSameOrigin:m.origin}));
vi.mock('@/lib/utils/revalidate-solutions',()=>({revalidateSolutions:m.refresh}));
vi.mock('@/lib/db/prisma',()=>({prisma:{$transaction:async(fn:CallableFunction)=>fn({solution:{findUnique:m.find,update:m.update},solutionRevision:{findFirst:m.revision}})}}));
import {POST} from './route';
const request=(visible:unknown)=>POST(new NextRequest('http://localhost/api/admin/solutions/s/visibility',{method:'POST',body:JSON.stringify({visible})}),{params:Promise.resolve({id:'s'})});
beforeEach(()=>{vi.resetAllMocks();m.find.mockResolvedValue({id:'s',slug:'share',isDraft:false,publishedRevisionId:'live'});m.revision.mockResolvedValue({id:'live'});m.update.mockImplementation(({data})=>Promise.resolve({slug:'share',isDraft:false,...data}));});
it.each([true,false])('changes listing to %s without changing publication',async visible=>{
 const result=await request(visible);expect(result.status).toBe(200);expect(await result.json()).toEqual({isListed:visible});
 expect(m.update).toHaveBeenCalledWith({where:{id:'s'},data:{isListed:visible}});expect(m.refresh).toHaveBeenCalledWith('share');expect(m.auth).toHaveBeenCalled();expect(m.origin).toHaveBeenCalled();
});
it('does not publish a draft when enabling listing',async()=>{m.find.mockResolvedValue({isDraft:true,publishedRevisionId:'old'});expect((await request(true)).status).toBe(400);expect(m.update).not.toHaveBeenCalled();});
it('rejects invalid listing values',async()=>{expect((await request('yes')).status).toBe(400);expect(m.update).not.toHaveBeenCalled();});
