import type {ProjectInput} from '@/lib/portfolio/schema';
export default function ClientIdentity({project,location='facts'}:{project:ProjectInput;location?:'facts'|'hero'|'overview'}){
 const {clientLogo,clientName,caseStudy:c}=project;
 const mode=c.clientDisplay;
 const showLogo=mode!=='name'&&!!clientLogo;
 const showName=mode!=='logo'||!clientLogo;
 if(!clientName&&!clientLogo)return null;
 return <span className={`pc-client-identity pc-logo-${c.logoSize} pc-identity-${location} pc-mobile-logo-${c.logoMobileSize} pc-logo-treatment-${c.logoTreatment}`}>
  {showLogo&&<span className="pc-logo-box"><img src={clientLogo} alt={showName?'':`${clientName||'Client'} logo`}/></span>}
  {showName&&clientName&&<span className="pc-client-name">{clientName}</span>}
 </span>;
}
