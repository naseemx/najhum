import 'dotenv/config';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import pg from 'pg';
import {PrismaClient} from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';
let connectionString=process.env.DATABASE_URL;
if(connectionString?.startsWith('prisma+postgres://'))connectionString=JSON.parse(Buffer.from(new URL(connectionString).searchParams.get('api_key'),'base64').toString()).databaseUrl;
const pool=new pg.Pool({connectionString,connectionTimeoutMillis:10000});
const db=new PrismaClient({adapter:new PrismaPg(pool)});
const nokia='smart-fm-nokia-hq-dubai',space='campus-facilities-intelligence-space-42',mall='smart-building-energy-monitoring-dubai-mall';
const keep=[nokia,space,mall];
const facts={
 [space]:{
  hero:'Campus facilities.',accent:'Connected intelligence.',coverAlt:'Contemporary corporate campus at dusk',logo:'/logo/client%20logos/space42.png',
  overview:'The Space 42 case study covers corporate campus operations. The supplied scope brings HVAC, energy, access and environmental monitoring together under IoTRICs.',
  challenge:'A campus facilities team needs to interpret signals from different building services and occupied spaces. The project focuses on making that information easier to review together.',
  solution:'IoTRICs brings HVAC, energy, access and environmental monitoring into one campus facilities scope. Review readings by asset or space and use the context to guide investigation.',
  areas:[['HVAC','Review monitored HVAC equipment and operating trends.','settings'],['Energy','Review energy readings in the context of monitored loads.','energy'],['Access','Include access monitoring alongside other facilities signals.','building'],['Environment','Review environmental conditions in occupied areas.','air']],
  solutions:['facilities-management','energy-monitoring']
 },
 [mall]:{
  hero:'Retail facilities.',accent:'Connected monitoring.',coverAlt:'Shopping centre atrium and storefronts',logo:'',
  overview:'The Dubai Mall case study covers smart building and energy monitoring across more than 500 retail units, as described in the supplied brief. The scope includes sub-metering, indoor air quality and waste management.',
  challenge:'A large retail site needs a practical way to review energy consumption, indoor conditions and waste operations across many units. The project focuses on making those signals useful to facilities teams.',
  solution:'The IoTRICs scope combines electrical sub-metering, indoor air-quality monitoring and waste management intelligence across the retail environment.',
  areas:[['Energy sub-metering','Review monitored electrical consumption by unit or load.','energy'],['Indoor air quality','Review indoor conditions alongside day-to-day facilities activity.','air'],['Waste management','Use waste monitoring information to support operational planning.','settings']],
  solutions:['facilities-management','energy-monitoring']
 }
};
const gallery=[
 {url:'/images/blogs/smart-building/detail-1-v1.webp',alt:'Pumps and pipework in a plant room',caption:'Building services and maintenance',section:'challenge'},
 {url:'/images/blogs/smart-building/detail-2-v1.webp',alt:'Environmental sensor in an office',caption:'Indoor environmental monitoring',section:'solution'},
 {url:'/images/blogs/energy-monitoring/detail-1-v1.webp',alt:'Electrical monitoring equipment',caption:'Electrical monitoring',section:'gallery'},
 {url:'/images/blogs/energy-monitoring/detail-2-v1.webp',alt:'Building energy monitoring equipment',caption:'Energy monitoring context',section:'gallery'}
];
try{
 const records=await db.portfolioProject.findMany();
 if(keep.some(slug=>!records.some(p=>p.slug===slug)))throw new Error('A requested project is missing.');
 const solutions=await db.solution.findMany({where:{isDraft:false},select:{id:true,slug:true}});
 const changes=records.map(p=>{
  const f=facts[p.slug];const c=p.caseStudy||{};
  if(!f)return {p,data:keep.includes(p.slug)?{isDraft:false,publishedAt:p.publishedAt||new Date(),caseStudy:{...c,testimonialNote:'The project scope brings energy, indoor air quality and equipment monitoring into one facilities workflow. A client-approved testimonial has not been supplied.'}}:{isDraft:true}};
  const cards=f.areas.map(([title,description,icon])=>({title,description,icon}));
  return {p,data:{
   isDraft:false,publishedAt:p.publishedAt||new Date(),clientLogo:p.clientLogo||f.logo,coverAlt:f.coverAlt,clientOverview:f.overview,
   challenge:`<p>${f.challenge}</p>`,solution:`<p>${f.solution}</p>`,results:'<p>The objectives below describe the intended operational benefits. Verified post-deployment measurements were not supplied.</p>',
   technology:[{label:'Platform',items:'IoTRICs'},...cards.map(x=>({label:x.title,items:x.description}))],
   gallery:[...p.gallery,...gallery.filter(image=>!p.gallery.some(existing=>existing.url===image.url))],galleryLayout:'grid',
   solutionIds:[...new Set([...p.solutionIds,...solutions.filter(s=>f.solutions.includes(s.slug)).map(s=>s.id)])],
   caseStudy:{...c,hiddenSections:[],heroTitle:f.hero,heroAccent:f.accent,coverCaption:'',clientDisplay:'both',overviewHeading:`About [${p.clientName}].`,challengeHeading:'Make building signals [easier to review].',challengeIntro:f.challenge,painPoints:cards,
    solutionHeading:'Connected facilities [monitoring].',solutionCallout:f.solution,components:cards,technologyHeading:'Technology [in scope].',technologyIntro:'The platform and monitoring areas described in the project brief.',architectureTitle:'Monitoring approach',architectureSteps:[
     {title:'Measure',description:'Collect readings from the monitoring areas in scope.',icon:'sensor'},
     {title:'Connect',description:'Bring the readings into the IoTRICs monitoring scope.',icon:'network'},
     {title:'Understand',description:'Review signals in the context of the monitored asset or space.',icon:'cloud'},
     {title:'Review',description:'Use that context to guide facilities investigations.',icon:'settings'}],
    outcomeMode:'objectives',resultsHeading:'What the project [aims to enable].',keyWins:cards,
    comparisonContext:cards.map(card=>({label:card.title,before:'A verified pre-project baseline was not supplied.',after:card.description})),
    galleryHeading:'Facilities monitoring [in pictures].',galleryIntro:'Examples of the building services and monitoring areas covered by this case study.',galleryFit:'contain',gallerySize:'medium',
    testimonialHeading:'Client perspective',testimonialNote:'A client-approved testimonial has not been supplied.',ctaHeading:'Plan your next [facilities project].',ctaText:'Tell us which assets, spaces and operating priorities you want to monitor.'}
  }};
 });
 if(!process.argv.includes('--apply'))console.log(changes.map(({p,data})=>({slug:p.slug,hidden:data.isDraft,expanded:!!data.caseStudy})));
 else{
  await mkdir('work/portfolio-import-backups',{recursive:true});
  await writeFile('work/portfolio-import-backups/before-featured-portfolio-'+Date.now()+'.json',JSON.stringify(records,null,2));
  await db.$transaction(async tx=>{for(const {p,data} of changes){const result=await tx.portfolioProject.updateMany({where:{id:p.id,updatedAt:p.updatedAt},data});if(result.count!==1)throw new Error('Concurrent edit: '+p.slug);}});
  const file='database/content/portfolio-projects.json';const manifest=JSON.parse(await readFile(file,'utf8'));
  manifest.projects=manifest.projects.map(p=>{const change=changes.find(x=>x.p.slug===p.slug);return change?{...p,...change.data}:p;});
  await writeFile(file,JSON.stringify(manifest,null,2)+'\n');
  console.log('Visible projects:',keep);
 }
}finally{await db.$disconnect();await pool.end();}
