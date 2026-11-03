// @vitest-environment jsdom
import {act,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import ProjectJourney from './ProjectJourney';
import CaseStudyFields from '@/components/admin/portfolio/CaseStudyFields';
import {caseStudySchema,MAX_JOURNEY_STEPS} from '@/lib/portfolio/schema';

let notify:()=>void;
let observed:Element[]=[];
let root:ReturnType<typeof createRoot>;
let host:HTMLDivElement;
let viewport=900;
function Editor(){const [value,setValue]=useState(caseStudySchema.parse({architectureSteps:[{title:'Measure',description:'Sensors'}]}));return <><CaseStudyFields value={value} onChange={setValue} group="journey"/><ProjectJourney title="Approach" steps={value.architectureSteps}/></>;}
beforeEach(()=>{
 (globalThis as Record<string,unknown>).IS_REACT_ACT_ENVIRONMENT=true;
 viewport=900;observed=[];
 vi.stubGlobal('ResizeObserver',class{constructor(callback:()=>void){notify=callback;}observe(e:Element){observed.push(e);}disconnect(){}});
 vi.spyOn(Element.prototype,'getBoundingClientRect').mockImplementation(function(this:Element){
  if(this.classList.contains('pc-journey-pin')){
   const cards=[...document.querySelectorAll('.pc-flow-step')];const index=cards.indexOf(this.parentElement!);
   const y=cards.slice(0,index).reduce((sum,card)=>sum+180+(card.textContent?.length||0),30);
   return {x:index%2?40:viewport-40,y,left:index%2?40:viewport-40,top:y,width:20,height:20,right:0,bottom:0,toJSON(){}};
  }
  return {x:0,y:0,left:0,top:0,width:viewport,height:1500,right:viewport,bottom:1500,toJSON(){}};
 });
 host=document.createElement('div');document.body.append(host);root=createRoot(host);
});
afterEach(()=>{act(()=>root.unmount());host.remove();vi.restoreAllMocks();vi.unstubAllGlobals();});
const click=(button:Element)=>act(()=>{button.dispatchEvent(new MouseEvent('click',{bubbles:true}));});
describe('editable project journey',()=>{
 it('adds more than eight cards from the admin and recalculates the connector after remove and reorder',()=>{
  act(()=>root.render(<Editor/>));
  const add=()=>[...host.querySelectorAll('button')].find(button=>button.textContent==='Add monitoring step')!;
  for(let i=1;i<10;i++)click(add());
  expect(host.querySelectorAll('.pc-flow-step')).toHaveLength(10);
  expect(host.querySelectorAll('.pc-journey-pin')).toHaveLength(10);
  expect(observed).toContain(host.querySelectorAll('.pc-flow-step')[9]);
  let path=host.querySelector('.pc-journey-route path')!;
  expect(path.getAttribute('d')?.match(/C /g)).toHaveLength(9);
  click(host.querySelector('[aria-label="Move Monitoring step 1 down"]')!);
  expect(host.querySelectorAll('.pc-flow-step')[1].textContent).toContain('Measure');
  click(host.querySelector('[aria-label="Remove Monitoring step 10"]')!);
  path=host.querySelector('.pc-journey-route path')!;
  expect(host.querySelectorAll('.pc-journey-pin')).toHaveLength(9);
  expect(path.getAttribute('d')?.match(/C /g)).toHaveLength(8);
 });
 it('updates anchor positions for longer content and responsive resizing without leaving a stale line',()=>{
  const steps=caseStudySchema.parse({architectureSteps:[{title:'Measure',description:'Sensors'},{title:'Connect',description:'Network'}]}).architectureSteps;
  act(()=>root.render(<ProjectJourney title="Approach" steps={steps}/>));
  const path=()=>host.querySelector('.pc-journey-route path')!.getAttribute('d');const initial=path();
  act(()=>root.render(<ProjectJourney title="Approach" steps={[{...steps[0],description:'Longer content '.repeat(40)},steps[1]]}/>));
  expect(path()).not.toBe(initial);
  const long=path();viewport=360;act(()=>notify());expect(path()).not.toBe(long);
  act(()=>root.render(<ProjectJourney title="Approach" steps={[steps[0]]}/>));
  expect(host.querySelectorAll('.pc-journey-pin')).toHaveLength(1);expect(host.querySelector('.pc-journey-route')).toBeNull();
  act(()=>root.render(<ProjectJourney title="Approach" steps={[]}/>));expect(host.textContent).toBe('');
 });
 it('uses the same step capacity in validation and the editor',()=>{
  expect(caseStudySchema.parse({architectureSteps:Array.from({length:MAX_JOURNEY_STEPS},(_,i)=>({title:`Step ${i}`}))}).architectureSteps).toHaveLength(20);
  expect(()=>caseStudySchema.parse({architectureSteps:Array.from({length:MAX_JOURNEY_STEPS+1},()=>({title:'Step'}))})).toThrow();
 });
});
