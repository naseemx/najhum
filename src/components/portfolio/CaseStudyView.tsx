import {selectedResources,type PortfolioResource} from '@/lib/portfolio/resources';
import Link from 'next/link';
import {ArrowDown,ArrowRight,ArrowUpRight,Building2,Radio,BellRing,Settings2,Cloud,Network,Smartphone,Quote,ChevronRight,Activity,Zap,Wind,BarChart3,MapPin,CalendarDays,Clock3,Layers3,BriefcaseBusiness,FileDown} from 'lucide-react';
import {platformLabels,type ProjectInput,type GalleryImage} from '@/lib/portfolio/schema';
import {sanitizeBlogContent,articleText} from '@/lib/blog/content';
import ProjectGallery from './ProjectGallery';
import CaseStudyNav from './CaseStudyNav';
import ProjectJourney from './ProjectJourney';
import ClientIdentity from './ClientIdentity';
import './portfolio.css';
import './case-study.css';
import './case-study-corporate.css';
const icons={building:Building2,energy:Zap,air:Wind,alert:BellRing,settings:Settings2,sensor:Activity,cloud:Cloud,network:Network,mobile:Smartphone,chart:BarChart3};
type Project=ProjectInput&{id?:string};
type Props={project:Project;related?:Project[];resources?:PortfolioResource[];preview?:boolean};
const present=(value:string)=>Boolean(value.trim());
const hasRichText=(value:string)=>Boolean(articleText(value).replace(/&(?:nbsp|#160);/g,' ').trim()||/<img\b[^>]*\bsrc\s*=/i.test(value));
const cleanTitle=(value:string)=>value.replace(/\[([^\]]+)\]/g,'$1');
function AccentTitle({value}:{value:string}){
 const parts=value.split(/(\[[^\]]+\])/g);
 if(parts.some(part=>part.startsWith('[')))return <>{parts.map((part,i)=>part.startsWith('[')?<span className="pc-title-accent" key={i}>{part.slice(1,-1)}</span>:part)}</>;
 return <>{value}</>;
}
function story(value:string,heading:string,fallback:string){const html=sanitizeBlogContent(value);const first=html.match(/^\s*<h2>([\s\S]*?)<\/h2>/i);return {heading:heading||(first?articleText(first[1]):fallback),html:first?html.slice(first[0].length):html};}
function RichText({html}:{html:string}){return hasRichText(html)?<div className="pc-prose" dangerouslySetInnerHTML={{__html:html}}/>:null;}
function Heading({number,label,title,text}:{number:string;label:string;title:string;text?:string}){return <header className="pc-heading"><p className="pc-kicker"><span>{number}</span>{label}</p><h2 aria-label={cleanTitle(title)}><AccentTitle value={title}/></h2>{text&&<p className="pc-intro">{text}</p>}</header>;}
function Images({images,layout='mixed'}:{images:GalleryImage[];layout?:string}){return images.length?<div className="pc-gallery"><ProjectGallery images={images} layout={layout}/></div>:null;}
export default function CaseStudyView({project:p,related=[],resources=[],preview=false}:Props){
 const c=p.caseStudy;const enabled=(key:typeof c.hiddenSections[number])=>!c.hiddenSections.includes(key);
 const usedImages=new Set([p.coverImage,...p.gallery.filter(i=>i.section!=='gallery').map(i=>i.url)].filter(Boolean));
 const images=(section:GalleryImage['section'])=>{const seen=new Set<string>();return p.gallery.filter(i=>{if(i.section!==section||!present(i.url)||seen.has(i.url)||(section==='gallery'&&usedImages.has(i.url)))return false;seen.add(i.url);return true;});};
 const cards=(items:typeof c.components)=>items.filter(i=>present(i.title)||present(i.description));
 const painPoints=cards(c.painPoints),components=cards(c.components),steps=cards(c.architectureSteps),wins=cards(c.keyWins);
 const heroValues=c.showFacts?new Set([p.clientName,p.industry,p.location,p.year,p.duration,p.deliveryModel,...p.platforms.map(key=>platformLabels[key])].map(v=>v.trim().toLowerCase()).filter(Boolean)):new Set<string>();
 const clientFacts=c.clientFacts.filter(f=>present(f.label)&&present(f.value)&&!heroValues.has(f.value.trim().toLowerCase()));
 const technology=p.technology.filter(g=>present(g.label)&&present(g.items));
 const verifiedResults=c.outcomeMode==='results';
 const outcomes=(verifiedResults?p.outcomes:[]).filter(o=>present(o.value)&&present(o.label));
 const comparison=c.comparisonContext.filter(row=>present(row.label)&&present(row.before)&&present(row.after));
 const rows=(verifiedResults?c.comparisonRows:[]).filter(row=>present(row.label));
 const challenge=story(p.challenge,c.challengeHeading,'The challenge');const solution=story(p.solution,c.solutionHeading,'Our solution');const results=story(p.results,c.resultsHeading,verifiedResults?'Results & outcomes':'Project objectives');
 const hasOverview=enabled('overview')&&!!(present(p.clientOverview)||clientFacts.length);
 const challengeCopy=hasRichText(challenge.html)||present(c.challengeCallout);
 const solutionCopy=hasRichText(solution.html)||present(c.solutionCallout);
 const hasChallenge=enabled('challenge')&&!!(challengeCopy||present(c.challengeIntro)||painPoints.length||images('challenge').length);
 const hasSolution=enabled('solution')&&!!(solutionCopy||present(c.solutionIntro)||components.length||images('solution').length||images('dashboard').length||images('mobile').length);
 const hasTech=enabled('technology')&&!!(technology.length||steps.length||images('technology').length);
 const hasResults=enabled('results')&&!!(hasRichText(results.html)||outcomes.length||present(c.resultsIntro)||wins.length||rows.length||comparison.length||images('results').length);
 const hasGallery=enabled('gallery')&&images('gallery').length>0;
 const links=enabled('resources')?selectedResources(resources,p):[];
 const hasRelated=enabled('related')&&related.length>0;
 const nav=[{id:'overview',title:'Overview',show:hasOverview},{id:'project-challenge',title:'Challenge',show:hasChallenge},{id:'project-solution',title:'Solution',show:hasSolution},{id:'technology',title:'Technology',show:hasTech},{id:'project-results',title:verifiedResults?'Results':'Objectives',show:hasResults},{id:'project-gallery',title:'Gallery',show:hasGallery}].filter(i=>i.show);
 const number=(id:string)=>String(nav.findIndex(item=>item.id===id)+1).padStart(2,'0');
 const maxComparison=Math.max(1,...rows.map(row=>row.value));
 const detailedResults=rows.length>0||articleText(results.html).split(/\s+/).filter(Boolean).length>=60;
 const facts=[{term:'Client',value:p.clientName,Icon:Building2},{term:'Industry',value:p.industry,Icon:BriefcaseBusiness},{term:'Location',value:p.location,Icon:MapPin},{term:'Platform',value:p.platforms.map(key=>platformLabels[key]).join(', '),Icon:Layers3},{term:'Year',value:p.year,Icon:CalendarDays},{term:'Duration',value:p.duration,Icon:Clock3},{term:'Delivery',value:p.deliveryModel,Icon:Settings2}].filter(f=>present(f.value));
 return <div className={`pc-page pc-refined pc-corporate ${preview?'pc-preview':''}`}>
  <div className="pc-breadcrumb pc-wrap"><Link href="/">Home</Link><ChevronRight size={12}/><Link href="/portfolio">Portfolio</Link><ChevronRight size={12}/><span>{p.title}</span></div>
  <header className={`pc-hero pc-wrap ${!p.coverImage?'pc-no-cover':''}`}>
   <div className="pc-hero-copy"><p className="pc-kicker">{p.platforms.map(key=>platformLabels[key]).join(' / ')||'Portfolio'}{p.industry&&` / ${p.industry}`}</p>{(c.heroTitle||c.heroAccent)&&<p className="pc-project-name">{p.title}</p>}<h1>{c.heroAccent?<>{c.heroTitle||p.title}<br/><span className="pc-title-accent">{c.heroAccent}</span></>:<AccentTitle value={c.heroTitle||p.title||'Your project title'}/>}</h1>{p.summary&&<p>{p.summary}</p>}{nav.length>0&&<a href={`#${nav[0].id}`}>Explore the case study<ArrowDown size={16}/></a>}</div>
   {p.coverImage&&<figure className="pc-hero-image"><img src={p.coverImage} alt={p.coverAlt} fetchPriority="high"/>{c.coverCaption&&<figcaption>{c.coverCaption}</figcaption>}</figure>}
   {c.showFacts&&facts.length>0&&<dl className="pc-facts">{facts.map(({term,value,Icon})=><div key={term}><dt><Icon size={15}/>{term}</dt><dd>{term==='Client'?<ClientIdentity project={p}/>:value}</dd></div>)}</dl>}
  </header>
  {c.showSectionNav&&nav.length>1&&<CaseStudyNav items={nav} preview={preview}/>}
  {hasOverview&&<section id="overview" className="pc-section pc-wrap"><Heading number={number('overview')} label="Client overview" title={c.overviewHeading||`About [${p.clientName||'the client'}]`}/><div className="pc-client">
   {(present(p.clientOverview)||clientFacts.length>0)&&<div className="pc-client-copy">{present(p.clientOverview)&&<p className="pc-preserve-lines">{p.clientOverview}</p>}{!!clientFacts.length&&<dl className="pc-client-facts">{clientFacts.map((f,i)=><div key={i}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>}</div>}
  </div></section>}
  {hasChallenge&&<section id="project-challenge" className="pc-band"><div className="pc-wrap pc-section"><Heading number={number('project-challenge')} label="The challenge" title={challenge.heading} text={c.challengeIntro}/>
   {(challengeCopy||images('challenge').length>0)&&<div className={challengeCopy&&images('challenge').length?'pc-challenge-grid':''}>{challengeCopy&&<div>{c.challengeCallout&&<aside className="pc-callout"><Activity size={22}/><p>{c.challengeCallout}</p></aside>}<RichText html={challenge.html}/></div>}<Images images={images('challenge')} layout="full"/></div>}
   {!!painPoints.length&&<div className="pc-pain-grid">{painPoints.map((item,i)=>{const Icon=icons[item.icon];return <article key={i}><header><span>{String(i+1).padStart(2,'0')}</span><Icon size={22}/></header><h3>{item.title}</h3>{item.description&&<p>{item.description}</p>}</article>;})}</div>}
  </div></section>}
  {hasSolution&&<section id="project-solution" className="pc-wrap pc-section"><Heading number={number('project-solution')} label="Our solution" title={solution.heading} text={c.solutionIntro}/>
   {(solutionCopy||components.length>0||images('solution').length>0)&&<div className={(solutionCopy||images('solution').length)&&components.length?'pc-solution-grid':''}>{(solutionCopy||images('solution').length>0)&&<div className="pc-solution-story">{c.solutionCallout&&<aside className="pc-callout"><Zap size={22}/><p>{c.solutionCallout}</p></aside>}<RichText html={solution.html}/><Images images={images('solution')} layout="full"/></div>}{!!components.length&&<div className="pc-components">{components.map((item,i)=>{const Icon=icons[item.icon];return <article key={i}><span className="pc-component-icon"><Icon size={22}/></span><div><h3>{item.title}</h3>{item.description&&<p>{item.description}</p>}</div></article>;})}</div>}</div>}
   {!!images('dashboard').length&&<div className="pc-dashboard-frame"><p className="pc-kicker">The operational view</p><Images images={images('dashboard')} layout="full"/></div>}<Images images={images('mobile')}/>
  </section>}
  {hasTech&&<section id="technology" className="pc-band pc-tech-band"><div className="pc-wrap pc-section"><Heading number={number('technology')} label="Technology stack" title={c.technologyHeading||'Platform, hardware & [connectivity].'} text={c.technologyIntro}/>
   {!!technology.length&&<div className={`pc-technology-cards ${technology.length>3&&technology.length%2===1?'pc-technology-expanded':''}`}>{technology.map((group,i)=>{const Icon=/energy|power/i.test(group.label)?Zap:/air|environment/i.test(group.label)?Wind:/connect|network/i.test(group.label)?Network:/maint|hardware/i.test(group.label)?Settings2:Layers3;return <article key={i} className={`pc-technology-card ${i===0?'pc-technology-featured':''}`}><header><span>{String(i+1).padStart(2,'0')}</span><Icon size={22}/></header><div className="pc-technology-content"><h3>{group.label}</h3><ul>{group.items.split(/\n|,/).map(item=>item.trim()).filter(Boolean).map((item,j)=><li key={j}>{item}</li>)}</ul></div><Icon className="pc-technology-art" aria-hidden="true" strokeWidth={.8}/></article>;})}</div>}
   <ProjectJourney title={c.architectureTitle} steps={steps}/><Images images={images('technology')}/>
  </div></section>}
  {hasResults&&<section id="project-results" className="pc-wrap pc-section"><Heading number={number('project-results')} label={verifiedResults?'Results & outcomes':'Project objectives'} title={results.heading} text={c.resultsIntro}/>
   {!!outcomes.length&&<div className="pc-metrics">{outcomes.map((item,i)=><article key={i}><strong>{item.value}</strong><h3>{item.label}</h3>{item.context&&<p>{item.context}</p>}</article>)}</div>}
   {(hasRichText(results.html)||wins.length>0||rows.length>0)&&<div className={(hasRichText(results.html)||rows.length)&&wins.length?(detailedResults?'pc-results-grid':'pc-results-compact'):''}>{(hasRichText(results.html)||rows.length>0)&&<div><RichText html={results.html}/>{!!rows.length&&<div className="pc-comparison"><p className="pc-kicker">Measured impact</p><h3>{c.comparisonTitle||'Before & after'}</h3>{c.comparisonNote&&<p>{c.comparisonNote}</p>}{rows.map((row,i)=><div className={`pc-bar-row ${i?'pc-bar-after':''}`} key={i}><span>{row.label}</span><div aria-hidden="true"><i style={{width:`${row.value/maxComparison*100}%`}}/></div><strong>{row.value}{c.comparisonUnit}</strong></div>)}</div>}</div>}{!!wins.length&&<div className="pc-wins">{wins.map((item,i)=><article key={i}><span className="pc-win-index" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><div><h3>{item.title}</h3>{item.description&&<p>{item.description}</p>}</div></article>)}</div>}</div>}{!!comparison.length&&<section className="pc-comparison pc-context-comparison"><h3 className="pc-section-title">Before &amp; after: <span className="pc-title-accent">monitoring scope</span></h3><p>This compares documented baseline information with the project scope.</p><dl>{comparison.map((row,i)=><div key={i}><dt>{row.label}</dt><dd><strong>Before</strong>{row.before}</dd><dd><strong>Project approach</strong>{row.after}</dd></div>)}</dl></section>}<Images images={images('results')}/>
  </section>}
  {hasGallery&&<section id="project-gallery" className={`pc-band pc-gallery-band pc-gallery-size-${c.gallerySize} pc-gallery-fit-${c.galleryFit}`}><div className="pc-wrap pc-section"><Heading number={number('project-gallery')} label="Project gallery" title={c.galleryHeading==='The facilities-management context.'?'The [facilities-management context].':c.galleryHeading||'Deployment [in pictures].'} text={c.galleryIntro}/><Images images={images('gallery')} layout={images('gallery').length>1?'grid':'full'}/></div></section>}
  {enabled('testimonial')&&(present(p.testimonialQuote)||present(c.testimonialNote))&&<section className="pc-wrap pc-section pc-quote-section">
   {present(p.testimonialQuote)?<figure className={`pc-quote pc-quote-${p.testimonialQuote.trim().split(/\s+/).length>55?'long':'short'}`}>
    <div className="pc-quote-mark" aria-hidden="true"><Quote size={22}/></div>
    <div><p className="pc-kicker">{c.testimonialHeading||'Client perspective'}</p><blockquote>“{p.testimonialQuote.trim()}”</blockquote>
     {(present(p.testimonialName)||present(p.testimonialRole))&&<figcaption className="pc-quote-credit">{present(p.testimonialName)&&<strong>{p.testimonialName}</strong>}{present(p.testimonialRole)&&<span>{p.testimonialRole}</span>}</figcaption>}
    </div>
   </figure>:<div className="pc-quote pc-quote-status"><div className="pc-quote-mark" aria-hidden="true"><Quote size={22}/></div><div><p className="pc-kicker">{c.testimonialHeading||'Client perspective'}</p><p>{c.testimonialNote}</p></div></div>}
  </section>}
  {!!links.length&&<section className="pc-wrap pc-section pc-linked-resources" id="project-resources"><Heading number={String(nav.length+1).padStart(2,'0')} label="Related technology" title="Products &amp; [solutions]"/><div className="pc-resource-cards">{links.map(item=><Link key={item.kind+item.id} href={item.href}><span className="pc-resource-media">{item.image&&<img src={item.image} alt="" loading="lazy"/>}<span className="pc-resource-icon">{item.kind==='Product'?<Layers3 size={19}/>:<BriefcaseBusiness size={19}/>}</span></span><span className="pc-resource-copy"><small>{item.kind}</small><strong>{item.title}</strong></span><ArrowUpRight size={17}/></Link>)}</div></section>}
  {hasRelated&&<section className="pc-wrap pc-section pc-more"><Heading number={String(nav.length+1+Number(links.length>0)).padStart(2,'0')} label="More projects" title="Different environments. [Connected thinking.]"/><div className="pc-related-grid">{related.map(item=><Link key={item.slug} href={`/portfolio/${item.slug}`} className="pc-related-card">{item.coverImage&&<img src={item.coverImage} alt={item.coverAlt} loading="lazy"/>}<div><p className="pc-kicker">{item.clientName} / {item.industry}</p><h3>{item.title}</h3><span>Explore project<ArrowUpRight size={17}/></span></div></Link>)}</div></section>}
  <section className="pc-wrap pc-final"><div><p className="pc-kicker">Your next project</p><h2 aria-label={cleanTitle(c.ctaHeading||'Connect your [infrastructure].')}><AccentTitle value={c.ctaHeading||'Connect your [infrastructure].'}/></h2><p>{c.ctaText||'Tell us about your assets, your team, and the outcome you want to achieve.'}</p></div><div><Link className="pc-primary" href={`/contact?project=${encodeURIComponent(p.slug)}#contact-form`}>Discuss your project<ArrowUpRight size={18}/></Link>{p.documentUrl&&<a className="pc-secondary" href={p.documentUrl} target="_blank" rel="noopener noreferrer">Download case study<FileDown size={17}/></a>}<Link className="pc-secondary" href="/portfolio">View all projects<ArrowRight size={17}/></Link></div></section>
 </div>;
}
