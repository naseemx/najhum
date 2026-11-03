import { beforeEach,describe,it,expect,vi } from 'vitest';
import { NextRequest } from 'next/server';
const mocks=vi.hoisted(()=>({auth:vi.fn(),create:vi.fn(),find:vi.fn(),update:vi.fn(),remove:vi.fn(),tx:vi.fn(),refresh:vi.fn()}));
vi.mock('@/lib/auth/require-admin',()=>({requireAdmin:mocks.auth,requireSameOrigin:vi.fn()}));
vi.mock('@/lib/db/prisma',()=>({prisma:{portfolioProject:{create:mocks.create,delete:mocks.remove},$transaction:mocks.tx}}));
vi.mock('next/cache',()=>({revalidatePath:mocks.refresh}));
import { POST } from './route';
import { PUT,DELETE } from './[id]/route';
import { ApiError } from '@/lib/utils/api-error';
const input={title:'Connected campus',slug:'connected-campus',summary:'A project story',clientName:'Approved client',industry:'Facilities',platforms:['iotrics'],coverImage:'/cover.jpg',coverAlt:'Campus building',solution:'<p>Connected monitoring.</p>',gallery:[{url:'/detail.jpg',alt:'Installed sensor',caption:'On site',section:'solution'}],isDraft:true};
function request(method:string,data:unknown=input){return new NextRequest('https://example.test/api/admin/portfolio',{method,body:method==='DELETE'?undefined:JSON.stringify(data),headers:{'Content-Type':'application/json'}});}
const context={params:Promise.resolve({id:'project-1'})};
beforeEach(()=>{vi.resetAllMocks();mocks.auth.mockResolvedValue({sub:'admin'});mocks.create.mockResolvedValue({id:'project-1',slug:input.slug});mocks.tx.mockImplementation(async callback=>callback({portfolioProject:{findUniqueOrThrow:mocks.find,update:mocks.update}}));});
describe('portfolio publishing',()=>{
 it('blocks writes without admin authentication',async()=>{mocks.auth.mockRejectedValue(new ApiError('Unauthorized',401));expect((await POST(request('POST'))).status).toBe(401);expect(mocks.create).not.toHaveBeenCalled();});
 it('creates drafts privately and strips unsafe story markup',async()=>{expect((await POST(request('POST',{...input,solution:'<p>Safe story</p><script>alert(1)</script>'}))).status).toBe(201);expect(mocks.create).toHaveBeenCalledWith({data:expect.objectContaining({isDraft:true,publishedAt:null,solution:'<p>Safe story</p>'})});});
 it('rejects publishing without required project facts and image descriptions',async()=>{expect((await POST(request('POST',{...input,isDraft:false,coverAlt:''}))).status).toBe(400);expect(mocks.create).not.toHaveBeenCalled();expect((await POST(request('POST',{...input,isDraft:false,gallery:[{...input.gallery[0],alt:''}]}))).status).toBe(400);});
 it('preserves image order, caption and placement when publishing',async()=>{const gallery=[...input.gallery,{url:'/second.jpg',alt:'Meter',caption:'Second image',section:'gallery'}];expect((await POST(request('POST',{...input,isDraft:false,gallery}))).status).toBe(201);expect(mocks.create).toHaveBeenCalledWith({data:expect.objectContaining({gallery,isDraft:false,publishedAt:expect.any(Date)})});});
 it('saves structured design fields and additional image placements through the authenticated publishing API',async()=>{
 const caseStudy={heroTitle:'One campus',heroAccent:'Connected',components:[{title:'Sensors',description:'Installed monitoring',icon:'sensor'}],architectureSteps:[{title:'Cloud',description:'Data platform',icon:'cloud'}],comparisonRows:[{label:'Before',value:100},{label:'After',value:85}]};
 expect((await POST(request('POST',{...input,isDraft:false,caseStudy,galleryLayout:'mixed',gallery:[{url:'/dashboard.webp',alt:'Interface screenshot',section:'dashboard'}]}))).status).toBe(201);
 expect(mocks.create).toHaveBeenCalledWith({data:expect.objectContaining({caseStudy:expect.objectContaining(caseStudy),galleryLayout:'mixed',gallery:[expect.objectContaining({section:'dashboard'})]})});
 });
 it('rejects incomplete published cards and invalid comparison data',async()=>{
 expect((await POST(request('POST',{...input,isDraft:false,caseStudy:{components:[{title:'Missing description'}]}}))).status).toBe(400);
 expect((await POST(request('POST',{...input,caseStudy:{comparisonRows:[{label:'Bad value',value:-10}]}}))).status).toBe(400);
 expect(mocks.create).not.toHaveBeenCalled();
 });
 it('persists visibility options and preserves unfinished content in hidden sections',async()=>{
 const caseStudy={hiddenSections:['solution','challenge'],showFacts:false,showSectionNav:false,painPoints:[{title:'Saved for later',description:'',icon:'sensor'}]};
 expect((await POST(request('POST',{...input,isDraft:false,solution:'',caseStudy}))).status).toBe(201);
 expect(mocks.create).toHaveBeenCalledWith({data:expect.objectContaining({caseStudy:expect.objectContaining(caseStudy),solution:''})});
 });
 it('publishes a structured solution without requiring a duplicate rich-text story',async()=>{
 expect((await POST(request('POST',{...input,isDraft:false,solution:'',gallery:[],caseStudy:{components:[{title:'Sensors',description:'Asset monitoring'}]}}))).status).toBe(201);
 });
 it('retains the first publication date and invalidates old project URLs',async()=>{const date=new Date('2026-01-01');mocks.find.mockResolvedValue({slug:'old-project',publishedAt:date});mocks.update.mockResolvedValue({slug:input.slug});expect((await PUT(request('PUT',{...input,isDraft:false}),context)).status).toBe(200);expect(mocks.update).toHaveBeenCalledWith({where:{id:'project-1'},data:expect.objectContaining({publishedAt:date})});expect(mocks.refresh).toHaveBeenCalledWith('/portfolio/old-project');});
 it('unpublishes without deleting the project story',async()=>{mocks.find.mockResolvedValue({slug:input.slug,publishedAt:new Date()});mocks.update.mockResolvedValue({slug:input.slug});expect((await PUT(request('PUT'),context)).status).toBe(200);expect(mocks.update).toHaveBeenCalledWith({where:{id:'project-1'},data:expect.objectContaining({isDraft:true,solution:input.solution})});});
 it('deletes only the project record and refreshes its public URL',async()=>{mocks.remove.mockResolvedValue({slug:input.slug});expect((await DELETE(request('DELETE'),context)).status).toBe(204);expect(mocks.refresh).toHaveBeenCalledWith('/portfolio/connected-campus');});
});
