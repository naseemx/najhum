import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
const db = vi.hoisted(() => ({ solutions: vi.fn(), products: vi.fn(), blogs: vi.fn(), projects:vi.fn() }));
vi.mock('@/lib/db/prisma', () => ({ prisma: { solution: { findMany: db.solutions }, product: { findMany: db.products }, blogPost: { findMany: db.blogs }, portfolioProject:{findMany:db.projects} } }));
import { GET } from './route';
beforeEach(() => { vi.resetAllMocks(); db.solutions.mockResolvedValue([]); db.products.mockResolvedValue([]); db.blogs.mockResolvedValue([]); db.projects.mockResolvedValue([]); });
describe('universal blog search', () => {
 it('does not expose blog entries when the blogs section is not public', async () => {
  db.blogs.mockResolvedValue([{ title:'Connected infrastructure', slug:'connected-infrastructure', excerpt:'A practical guide.', category:'Operations', author:'Editorial team', tags:['vibration'], content:'<h2>Commissioning</h2><p>Sensor maintenance workflows.</p>' }]);
  const response = await GET(new NextRequest('https://example.test/api/search?q=commissioning%20vibration&category=Blogs'));
  const result = await response.json();
  expect(db.blogs).toHaveBeenCalledWith(expect.objectContaining({ where: { isDraft:false, publishedAt:{not:null} } }));
  expect(result.results).toEqual([]);
  expect(result.partial).toBe(false);
 });
 it('marks partial true when the blog database is unavailable', async () => {
  db.blogs.mockRejectedValue(new Error('Database unavailable'));
  const response = await GET(new NextRequest('https://example.test/api/search?q=blogs'));
  const result = await response.json();
  expect(result.partial).toBe(true);
 });
 it('excludes draft and undated records at the database boundary', async () => {
  await GET(new NextRequest('https://example.test/api/search?q=irrigation'));
  expect(db.blogs.mock.calls[0][0].where).toEqual({isDraft:false,publishedAt:{not:null}});
 });
});

it('does not expose portfolio entries when the portfolio section is not public',async()=>{
 db.projects.mockResolvedValue([{title:'Connected campus',slug:'connected-campus',summary:'A project story',clientName:'Approved client',industry:'Facilities',platforms:['iotrics'],challenge:'Water leak response',solution:'Connected sensors',results:'Earlier investigation'}]);
 const response=await GET(new NextRequest('https://example.test/api/search?q=water%20client&category=Portfolio'));
 expect((await response.json()).results).toEqual([]);
 expect(db.projects).toHaveBeenCalledWith(expect.objectContaining({where:{isDraft:false,publishedAt:{not:null}}}));
});
