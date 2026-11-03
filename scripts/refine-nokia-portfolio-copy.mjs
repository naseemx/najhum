import 'dotenv/config';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import pg from 'pg';
import {PrismaClient} from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';
import assert from 'node:assert/strict';
let connectionString=process.env.DATABASE_URL;
if(connectionString?.startsWith('prisma+postgres://'))connectionString=JSON.parse(Buffer.from(new URL(connectionString).searchParams.get('api_key'),'base64').toString()).databaseUrl;
const pool=new pg.Pool({connectionString,connectionTimeoutMillis:10000});const db=new PrismaClient({adapter:new PrismaPg(pool)});
try{
 const project=await db.portfolioProject.findUniqueOrThrow({where:{slug:'smart-fm-nokia-hq-dubai'}});
 const c=project.caseStudy;
 const data={
  summary:'Energy, air quality, and equipment monitoring for Nokia HQ Dubai—connected through IoTRICs and LoRaWAN.',
  clientOverview:'The Nokia HQ Dubai project brings energy sub-metering, indoor air-quality monitoring, and predictive maintenance into a connected facilities-management scope. IoTRICs and LoRaWAN link these monitoring areas to the everyday priorities of the facilities team.',
  challenge:'<p>Managing corporate facilities means balancing energy use, occupant comfort, and equipment reliability. This project focuses on making those signals useful for day-to-day facilities decisions.</p>',
  solution:'<p>The project connects energy sub-metering, air-quality monitoring, and predictive maintenance through IoTRICs, using LoRaWAN connectivity.</p><h3>A practical workflow</h3><ol><li>Review readings in the context of the monitored asset or space.</li><li>Investigate exceptions and decide on the appropriate response.</li><li>Record the response and continue reviewing the trend.</li></ol>',
  results:'<p>The project focuses on more detailed energy visibility, indoor environmental awareness, and maintenance planning.</p>',
  technology:[{label:'Platform',items:'IoTRICs'},{label:'Energy',items:'Electrical sub-metering'},{label:'Indoor environment',items:'Indoor air-quality monitoring'},{label:'Maintenance',items:'Predictive maintenance'},{label:'Connectivity',items:'LoRaWAN®'}],
  caseStudy:{...c,outcomeMode:'objectives',overviewHeading:'Smart facilities at [Nokia HQ Dubai].',challengeHeading:'A clearer view of [building performance].',challengeCallout:'Connect each reading to a space, an asset, and a decision.',solutionHeading:'Connected monitoring for [everyday operations].',solutionCallout:'Energy, indoor air quality, and maintenance in one connected scope.',technologyHeading:'From field readings to [operational insight].',technologyIntro:'The platform, monitoring areas, and connectivity in this project.',resultsHeading:'What the project [aims to enable].',ctaHeading:'Bring your facilities [into focus].',components:[{title:'Energy sub-metering',description:'Review monitored electrical loads and consumption patterns to identify operating periods or changes that warrant investigation.',icon:'energy'},{title:'Indoor air quality',description:'Consider air-quality readings alongside building operation to understand when an occupied space needs closer attention.',icon:'air'},{title:'Predictive maintenance',description:'Use equipment information to inform inspections and maintenance planning for monitored assets.',icon:'settings'},{title:'LoRaWAN connectivity',description:'Connect field measurements to IoTRICs using the wireless-connectivity approach identified for this project.',icon:'network'}],keyWins:[{title:'Understand energy use',description:'Review monitored loads in context to help prioritise further investigation.',icon:'sensor'},{title:'Keep indoor conditions visible',description:'Include environmental information in everyday facilities reviews.',icon:'sensor'},{title:'Inform maintenance planning',description:'Use monitoring trends to guide inspection priorities.',icon:'sensor'}]}
 };
 if(!process.argv.includes('--apply'))console.log(JSON.stringify({mode:'preview',slug:project.slug,fields:Object.keys(data),outcomeMode:data.caseStudy.outcomeMode}));
 else{
  await mkdir('work/portfolio-import-backups',{recursive:true});await writeFile(`work/portfolio-import-backups/nokia-before-copy-audit-${Date.now()}.json`,JSON.stringify(project,null,2));
  const change=await db.portfolioProject.updateMany({where:{id:project.id,updatedAt:project.updatedAt},data});assert.equal(change.count,1,'Concurrent edit detected. Review before retrying.');
  const file='database/content/portfolio-projects.json';const manifest=JSON.parse(await readFile(file,'utf8'));manifest.projects=manifest.projects.map(item=>item.slug===project.slug?{...item,...data}:item);await writeFile(file,JSON.stringify(manifest,null,2)+'\n');
  console.log(JSON.stringify({updated:change.count,slug:project.slug,publishedStatePreserved:true}));
 }
}finally{await db.$disconnect();await pool.end();}
