import 'dotenv/config';
import { mkdir,writeFile,readFile } from 'node:fs/promises';
import pg from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
let connectionString=process.env.DATABASE_URL;
if(connectionString?.startsWith('prisma+postgres://'))connectionString=JSON.parse(Buffer.from(new URL(connectionString).searchParams.get('api_key'),'base64').toString()).databaseUrl;
const pool=new pg.Pool({connectionString,connectionTimeoutMillis:10000});
const db=new PrismaClient({adapter:new PrismaPg(pool)});
try{
 const project=await db.portfolioProject.findUniqueOrThrow({where:{slug:'smart-fm-nokia-hq-dubai'}});
 const descriptions={
  '/images/blogs/smart-building/detail-1-v1.webp':['Pumps and pipework in a building plant room','Building services and maintenance'],
  '/images/blogs/smart-building/detail-2-v1.webp':['Environmental sensor in a corporate office','Indoor environmental monitoring'],
  '/images/portfolio/smart-fm-nokia-hq-dubai/cover-v1.webp':['Contemporary office building in Dubai','Corporate facilities']
 };
 const gallery=project.gallery.map(image=>descriptions[image.url]?{...image,alt:descriptions[image.url][0],caption:descriptions[image.url][1]}:image);
 for(const image of [
  {url:'/images/blogs/energy-monitoring/detail-1-v1.webp',alt:'Electrical monitoring equipment',caption:'Electrical monitoring and sub-metering'},
  {url:'/images/blogs/energy-monitoring/detail-2-v1.webp',alt:'Energy monitoring in a building services setting',caption:'Building energy monitoring'}
 ])if(!gallery.some(item=>item.url===image.url)){await readFile('public'+image.url);gallery.push({...image,section:'gallery'});}
 const c=project.caseStudy;
 const data={clientLogo:project.clientLogo||'/logo/client%20logos/nokia-com-wordmark.png',coverAlt:'Contemporary corporate office building in Dubai',gallery,galleryLayout:'grid',caseStudy:{...c,coverCaption:'',clientDisplay:c.clientDisplay==='name'?'both':c.clientDisplay||'both',logoMobileSize:'small',gallerySize:'medium',galleryFit:'contain',hiddenSections:(c.hiddenSections||[]).filter(s=>!['gallery','results','testimonial'].includes(s)),testimonialNote:'A client-approved testimonial is not currently available.',comparisonContext:[
  {label:'Energy',before:'Sub-metering baseline readings were not supplied.',after:'The scope includes electrical sub-metering to review monitored loads in greater detail.'},
  {label:'Indoor air quality',before:'Pre-project indoor air-quality readings were not supplied.',after:'The scope includes indoor air-quality monitoring for occupied spaces.'},
  {label:'Maintenance',before:'Maintenance response times and equipment condition baselines were not supplied.',after:'Predictive maintenance monitoring is intended to support investigation and planning.'}
 ]}};
 if(!process.argv.includes('--apply')){console.log({slug:project.slug,galleryImages:gallery.filter(i=>i.section==='gallery').length,comparisonRows:data.caseStudy.comparisonContext.length,hasApprovedQuote:!!project.testimonialQuote});}
 else{
  await mkdir('work/portfolio-import-backups',{recursive:true});
  await writeFile('work/portfolio-import-backups/nokia-before-completion-'+Date.now()+'.json',JSON.stringify(project,null,2));
  const changed=await db.portfolioProject.updateMany({where:{id:project.id,updatedAt:project.updatedAt},data});if(changed.count!==1)throw new Error('Project changed since reading; retry after review.');
  const file='database/content/portfolio-projects.json';const manifest=JSON.parse(await readFile(file,'utf8'));
  manifest.projects=manifest.projects.map(item=>item.slug===project.slug?{...item,...data}:item);
  await writeFile(file,JSON.stringify(manifest,null,2)+'\n');
  console.log({updated:changed.count,slug:project.slug});
 }
}finally{await db.$disconnect();await pool.end();}
