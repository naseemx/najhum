import 'dotenv/config';
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import sanitizeHtml from 'sanitize-html';
import pg from 'pg';
import {PrismaClient} from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';
const input=JSON.parse(await readFile(new URL('../database/content/nokia-portfolio-content.json',import.meta.url),'utf8'));
assert.equal(input.slug,'smart-fm-nokia-hq-dubai');
for(const image of input.content.gallery)await access(new URL('../public'+image.url,import.meta.url));
for(const key of ['challenge','solution','results']){assert.ok(input.content[key].length>100);input.content[key]=sanitizeHtml(input.content[key],{allowedTags:['p','h2','h3','strong','ul','ol','li','blockquote'],allowedAttributes:{}});}
let connectionString=process.env.DATABASE_URL;if(connectionString?.startsWith('prisma+postgres://'))connectionString=JSON.parse(Buffer.from(new URL(connectionString).searchParams.get('api_key'),'base64').toString()).databaseUrl;
const pool=new pg.Pool({connectionString,connectionTimeoutMillis:10000});const db=new PrismaClient({adapter:new PrismaPg(pool)});
try{
 const current=await db.portfolioProject.findUniqueOrThrow({where:{slug:input.slug}});
 const solutionIds=await db.solution.findMany({where:{isDraft:false,slug:{in:['facilities-management','energy-monitoring']}},select:{id:true}});
 const data={...input.content,solutionIds:[...new Set([...current.solutionIds,...solutionIds.map(s=>s.id)])],gallery:[...input.content.gallery,...current.gallery.filter(image=>!input.content.gallery.some(newImage=>newImage.url===image.url))]};
 if(!process.argv.includes('--apply'))console.log(JSON.stringify({mode:'preview',slug:input.slug,fields:Object.keys(data),galleryImages:data.gallery.length,previousStoryLengths:[current.challenge.length,current.solution.length,current.results.length]},null,2));
 else{
  const dir=new URL('../work/portfolio-import-backups/',import.meta.url);await mkdir(dir,{recursive:true});await writeFile(new URL(`nokia-before-content-${Date.now()}.json`,dir),JSON.stringify(current,null,2));
  const change=await db.portfolioProject.updateMany({where:{id:current.id,updatedAt:current.updatedAt},data});assert.equal(change.count,1,'Concurrent edit detected; retry after reviewing the current record.');
  const result=await db.portfolioProject.findUniqueOrThrow({where:{id:current.id}});assert.equal(result.isDraft,current.isDraft);assert.equal(result.publishedAt?.getTime(),current.publishedAt?.getTime());
  const manifestUrl=new URL('../database/content/portfolio-projects.json',import.meta.url);const manifest=JSON.parse(await readFile(manifestUrl,'utf8'));manifest.projects=manifest.projects.map(project=>project.slug===input.slug?{...project,...data}:project);manifest.note='Source project titles and scopes imported from the reference listing. Nokia has expanded editorial content based on that scope; unverified outcomes and testimonials are omitted. Images are AI-generated illustrations.';await writeFile(manifestUrl,JSON.stringify(manifest,null,2)+'\n');
  console.log(JSON.stringify({status:'updated',slug:result.slug,isDraft:result.isDraft,publishedAt:result.publishedAt,storyLengths:[result.challenge.length,result.solution.length,result.results.length],galleryImages:result.gallery.length,technologyGroups:result.technology.length,relatedSolutions:result.solutionIds.length},null,2));
 }
}finally{await db.$disconnect();await pool.end();}
