import 'dotenv/config';
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {PrismaClient} from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';
import pg from 'pg';
const manifest=JSON.parse(await readFile(new URL('../database/content/portfolio-projects.json',import.meta.url),'utf8'));
assert.equal(manifest.projects.length,5);
assert.equal(new Set(manifest.projects.map(p=>p.slug)).size,5);
for(const project of manifest.projects){
 assert.match(project.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
 for(const key of ['title','summary','clientName','industry','coverImage','coverAlt','solution'])assert.ok(project[key],`${project.slug}: missing ${key}`);
 assert.equal(project.isDraft,false);assert.ok(project.platforms.every(p=>['iotrics','evoltics','cropifai'].includes(p)));
 assert.ok(!/\[(Client Name|Project Title|XX|Year)\]/.test(JSON.stringify(project)),'Template content must not be imported');
 await access(new URL('../public'+project.coverImage,import.meta.url));
}
let connectionString=process.env.DATABASE_URL;
if(connectionString?.startsWith('prisma+postgres://'))connectionString=JSON.parse(Buffer.from(new URL(connectionString).searchParams.get('api_key'),'base64').toString()).databaseUrl;
const pool=new pg.Pool({connectionString,connectionTimeoutMillis:10000});
const db=new PrismaClient({adapter:new PrismaPg(pool)});
try{
 const existing=await db.portfolioProject.findMany();
 if(!process.argv.includes('--apply'))console.log(JSON.stringify({mode:'preview',source:manifest.source,projects:manifest.projects.map(p=>({slug:p.slug,title:p.title,action:existing.some(e=>e.slug===p.slug)?'preserve existing':'create published'}))},null,2));
 else{
  const backup=new URL('../work/portfolio-import-backups/',import.meta.url);await mkdir(backup,{recursive:true});await writeFile(new URL(`before-import-${Date.now()}.json`,backup),JSON.stringify(existing,null,2));
  const result=await db.$transaction(async tx=>{const result=[];for(const project of manifest.projects){const current=await tx.portfolioProject.findUnique({where:{slug:project.slug}});if(current){result.push({slug:project.slug,status:'existing record preserved',isDraft:current.isDraft});continue;}const row=await tx.portfolioProject.create({data:{...project,publishedAt:new Date()}});result.push({slug:row.slug,status:'published',isDraft:row.isDraft});}return result;});
  console.log(JSON.stringify(result,null,2));
 }
 console.log(JSON.stringify({published:await db.portfolioProject.findMany({where:{slug:{in:manifest.projects.map(p=>p.slug)}},select:{slug:true,title:true,isDraft:true,publishedAt:true,coverImage:true,platforms:true}})},null,2));
}finally{await db.$disconnect();await pool.end();}
