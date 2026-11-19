import {beforeEach,it,expect,vi} from 'vitest';
const get=vi.hoisted(()=>vi.fn());
vi.mock('@/lib/published-content/queries',()=>({getPublishedPage:get}));
import {GET} from './route';
const request=(file:string,revision='live',kind='products')=>GET(new Request('https://example.test/asset'),{params:Promise.resolve({kind,slug:'meter',revision,file})});
beforeEach(()=>{get.mockReset();get.mockResolvedValue({revisionId:'live',document:{css:'.meter{color:blue}',scripts:['window.example=1;','window.example+=1;']}});});
it('serves original CSS and JavaScript independently with versioned cacheable URLs',async()=>{
 const css=await request('page.css');expect(await css.text()).toBe('.meter{color:blue}');expect(css.headers.get('Content-Type')).toContain('text/css');expect(css.headers.get('Cache-Control')).toContain('s-maxage=300');
 const js=await request('script-1.js');expect(await js.text()).toBe('window.example+=1;');expect(js.headers.get('Content-Type')).toContain('application/javascript');expect(js.headers.get('X-Content-Type-Options')).toBe('nosniff');
});
it('refuses draft, unpublished or deleted documents',async()=>{
 get.mockResolvedValue(null);const result=await request('script-0.js');expect(result.status).toBe(404);expect(result.headers.get('Cache-Control')).toBe('no-store');
});
it('refuses old revision IDs after a new publication',async()=>{expect((await request('page.css','old')).status).toBe(404);});
it.each(['index.html','metadata.json','script--1.js','script-01.js','script-99.js'])('does not expose arbitrary document fields: %s',async file=>{expect((await request(file)).status).toBe(404);});
it('does not provide private preview or portfolio content through this endpoint',async()=>{expect((await request('page.css','live','preview')).status).toBe(404);expect(get).not.toHaveBeenCalled();});

it('serves assets for a published unlisted page',async()=>{
 get.mockResolvedValue({isListed:false,revisionId:'live',document:{css:'body{}',scripts:[]}});
 expect((await request('page.css')).status).toBe(200);
});
