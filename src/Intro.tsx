import React,{useEffect,useRef,useState} from 'react';
import {Landscape,toggleMusic} from './pop';
const steps=['Meet','Inspect','Team up','Choose'];
function Action({children,secondary=false,...props}:any){return <button className={secondary?'button secondary':'button'} {...props}>{children}</button>}
export function Intro({go,finish}:any){
 const [stage,setStage]=useState(0),[sound,setSound]=useState(false),[inspected,setInspected]=useState(false),[fed,setFed]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null),initial=useRef(true);
 useEffect(()=>()=>toggleMusic(false),[]);
 useEffect(()=>{if(initial.current){initial.current=false;return;}heading.current?.focus({preventScroll:true});},[stage,inspected,fed]);
 const end=(destination:string)=>{toggleMusic(false);finish();go(destination);};
 const titles=['A wild Pop appeared.','A second pair of eyes.','Small cat. Good company.','Pop joined your party.'];
 return <main className="intro" data-intro-stage={stage}>
  <header className="intro-top"><a className="wordmark" href="/home" onClick={event=>{event.preventDefault();end('/home');}}>STRIKEOUT<span>↗</span></a><div className="intro-controls"><button className="sound" aria-pressed={sound} onClick={()=>{setSound(!sound);toggleMusic(!sound);}}>{sound?'Sound on':'Sound off'}</button><button className="skip" onClick={()=>end('/incident')}>Skip demo → Log an incident</button></div></header>
  <div className="intro-grid">
   <section className="intro-copy" key={'copy-'+stage}>
    <div className="eyebrow light">MEET YOUR INTERNET COMPANION / {String(stage+1).padStart(2,'0')}—04</div>
    <h1>{stage===0?<>The internet<br/>is a <em>lot.</em></>:stage===1?<>Pause.<br/>Look a little<br/><em>closer.</em></>:stage===2?<>You don’t<br/>have to go<br/><em>solo.</em></>:<>Good to<br/>have you<br/><em>here.</em></>}</h1>
    <p>{stage===0?'A small cat. A sharp eye. Meet Pop in a few clicks.':stage===1?'Read the label. Check the destination. You make the call.':stage===2?'A second pair of eyes for the internet. You stay in charge.':'Pick your next step. Pop will be around when you need a hand.'}</p>
    <ol className="intro-step-list" aria-label="Introduction steps">{steps.map((name,index)=><li key={name} aria-current={index===stage?'step':undefined} className={index===stage?'current':index<stage?'complete':''}><span>{String(index+1).padStart(2,'0')}</span>{name}</li>)}</ol>
    <div className="intro-bottom"><span className="pixel-tag">SIMULATED DEMO</span><p>No extension installed.<br/>No browsing protection activated.</p></div>
   </section>
   <section className="encounter" aria-label="Interactive Pop introduction">
    <Landscape stage={stage} inspected={inspected} fed={fed}/>
    <div className="dialogue"><div className="dialogue-label"><span>POP / YOUR INTERNET COMPANION</span><span>{stage+1}/4 · YOUR PACE</span></div>
     <div className="dialogue-content" key={stage+':'+inspected+':'+fed}>
      <h2 ref={heading} tabIndex={-1}>{titles[stage]}</h2>
      {stage===0&&<><p>Something rustled behind that browser window. It has opinions about this very suspicious prize.</p><Action onClick={()=>setStage(1)}>Meet Pop <span>→</span></Action><p className="intro-action-hint">A short, interactive introduction. Advance whenever you’re ready.</p></>}
      {stage===1&&<><p aria-live="polite">{inspected?'“That domain is wearing a fake moustache.”':'Pop is heading over for a closer look. What does that link actually point to?'}</p>{inspected?<><div className="link-reveal"><strong>Label: prizes.example</strong><span>Destination: totally-a-prize.invalid</span><small>The label and destination differ. That’s an observable warning sign, not a verdict about a real website.</small></div><p className="small">Pop helps you pause, inspect, and decide.</p><Action onClick={()=>setStage(2)}>Continue with Pop →</Action></>:<Action onClick={()=>setInspected(true)}>Inspect link →</Action>}</>}
      {stage===2&&<><p aria-live="polite">{fed?'The snack has been enthusiastically accepted. A promising start.':'Offer a little pixel snack. Or skip the snacks and team up.'}</p><div className="recruit-actions"><Action secondary onClick={()=>setFed(true)} disabled={fed}>{fed?'Snack accepted':'Offer Pop a pixel snack'}</Action><Action onClick={()=>setStage(3)}>Team up with Pop →</Action></div></>}
      {stage===3&&<><p>A second pair of eyes for the internet. The decisions are still yours.</p><div className="intro-choices"><Action onClick={()=>end('/incident')}>Log an incident →</Action><Action secondary onClick={()=>end('/sample')}>Explore a sample case</Action><button className="text-button" onClick={()=>end('/extension')}>Get the Pop extension ↗</button><button className="text-button" onClick={()=>end('/home')}>Go to home →</button></div></>}
     </div>{stage>0&&<button className="intro-back" onClick={()=>setStage(stage-1)}>← Back</button>}
    </div>
   </section>
  </div><footer className="intro-footer"><span>YOUR NEXT STEP SHOULD FEEL SMALLER.</span><span>Simulated encounter · No timers · Optional sound</span></footer>
 </main>;
}
