import {buildMetadata,pageSchema} from '@/lib/seo';
import {pageSeo} from '@/content/page-seo';
import {pageSections} from '@/content/page-sections';
import StructuredData from '@/components/seo/StructuredData';
import CropifaiFrame from '@/components/sections/cropifai/redesign/CropifaiFrame';
import Hero from '@/components/sections/cropifai/redesign/Hero';
import FarmTour from '@/components/sections/cropifai/redesign/FarmTour';
import TrustedSites from '@/components/sections/cropifai/redesign/TrustedSites';
import Impact from '@/components/sections/cropifai/redesign/Impact';
import Workflow from '@/components/sections/cropifai/redesign/Workflow';
import HardwareRail from '@/components/sections/cropifai/redesign/HardwareRail';
import ValveDemo from '@/components/sections/cropifai/redesign/ValveDemo';
import SensorHub from '@/components/sections/cropifai/redesign/SensorHub';
import DashboardDemo from '@/components/sections/cropifai/redesign/DashboardDemo';
import Intelligence from '@/components/sections/cropifai/redesign/Intelligence';
import Connectivity from '@/components/sections/cropifai/redesign/Connectivity';
import CropExplorer from '@/components/sections/cropifai/redesign/CropExplorer';
import WaterCalculator from '@/components/sections/cropifai/redesign/WaterCalculator';
import Rollout from '@/components/sections/cropifai/redesign/Rollout';
import Questions from '@/components/sections/cropifai/redesign/Questions';
import Contact from '@/components/sections/cropifai/redesign/Contact';

export const metadata=buildMetadata(pageSeo.cropifai);
export default function CropifaiPage(){
 return <>
  <StructuredData data={pageSchema(pageSeo.cropifai,pageSections.cropifai,{'@type':'SoftwareApplication',name:'cropifAI',applicationCategory:'BusinessApplication',operatingSystem:'Web',url:pageSeo.cropifai.path,provider:{'@type':'Organization',name:'Najhum Technologies LLC'}})} />
  <CropifaiFrame>
   <Hero /><FarmTour /><TrustedSites /><Impact /><Workflow /><HardwareRail /><ValveDemo /><SensorHub />
   <DashboardDemo /><Intelligence /><Connectivity /><CropExplorer /><WaterCalculator /><Rollout /><Questions /><Contact />
  </CropifaiFrame>
 </>;
}
