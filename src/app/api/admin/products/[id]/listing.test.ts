import {beforeEach,it,expect,vi} from 'vitest';
import {NextRequest} from 'next/server';
const m=vi.hoisted(()=>({find:vi.fn(),revision:vi.fn(),update:vi.fn(),refresh:vi.fn()}));
vi.mock('@/lib/auth/require-admin',()=>({requireAdmin:vi.fn(),requireSameOrigin:vi.fn()}));
vi.mock('@/lib/products/server',()=>({refreshProducts:m.refresh}));
vi.mock('@/lib/solution-import/storage-cleanup',()=>({cleanUnusedImportAssets:vi.fn()}));
vi.mock('@/lib/db/prisma',()=>({prisma:{$transaction:async(fn:CallableFunction)=>fn({product:{findUnique:m.find,update:m.update},productRevision:{findFirst:m.revision}})}}));
import {PATCH} from './route';
const request=(body:unknown)=>PATCH(new NextRequest('http://localhost/api/admin/products/p',{method:'PATCH',body:JSON.stringify(body)}),{params:Promise.resolve({id:'p'})});
beforeEach(()=>{vi.resetAllMocks();m.find.mockResolvedValue({id:'p',slug:'meter',isDraft:false,publishedRevisionId:'live'});m.revision.mockResolvedValue({id:'live'});m.update.mockImplementation(({data})=>Promise.resolve({id:'p',slug:'meter',isDraft:false,...data}));});
it.each([true,false])('changes listing to %s without changing publication',async isListed=>{
 const result=await request({isListed});expect(result.status).toBe(200);expect(m.update).toHaveBeenCalledWith({where:{id:'p'},data:{isListed}});expect(m.refresh).toHaveBeenCalledWith('meter');
});
it('requires publication before listing',async()=>{m.find.mockResolvedValue({isDraft:true});expect((await request({isListed:true})).status).toBe(400);expect(m.update).not.toHaveBeenCalled();});
it('does not treat the old publication field as a listing toggle',async()=>{expect((await request({isDraft:false})).status).toBe(400);expect(m.update).not.toHaveBeenCalled();});
