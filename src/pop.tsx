import React,{useEffect,useRef,useState} from 'react';
import {useSpringPosition} from './motion';
import {PixelWorld} from './World';
export function Pop({state='idle',size=100}:any){return <span className={'pop pop-'+state} style={{width:size,height:size}} role="img" aria-label={'Pop the pixel cat, '+state}><img src="/art/pop.png" alt="" draggable="false"/></span>}
let sound:any;let melody:any;
export function toggleMusic(on:boolean){if(!on){if(melody)clearInterval(melody);melody=null;sound?.suspend();return;}const C=(window as any).AudioContext||(window as any).webkitAudioContext;if(!C)return;sound??=new C();sound.resume();let beat=0;const notes=[261.63,329.63,392,329.63,293.66,349.23,440,392];const play=()=>{const osc=sound.createOscillator(),gain=sound.createGain();osc.type='triangle';osc.frequency.value=notes[beat++%notes.length];gain.gain.setValueAtTime(.025,sound.currentTime);gain.gain.exponentialRampToValueAtTime(.001,sound.currentTime+.28);osc.connect(gain);gain.connect(sound.destination);osc.start();osc.stop(sound.currentTime+.3);};play();melody=setInterval(play,380);}
export function Landscape({stage,inspected,fed=false}:any){
 const scene=useRef<HTMLDivElement>(null),cat=useRef<HTMLDivElement>(null);
 const [bounds,setBounds]=useState({width:820,height:360}),[walking,setWalking]=useState(false);
 useEffect(()=>{const node=scene.current!;const observer=new ResizeObserver(([entry])=>setBounds({width:entry.contentRect.width,height:entry.contentRect.height}));observer.observe(node);return()=>observer.disconnect();},[]);
 const size=bounds.width<560?126:stage===0?150:165;
 const x=stage===0?bounds.width-size-18:stage===1?bounds.width*.4:stage===2?Math.min(bounds.width-size-12,bounds.width*.6):bounds.width-size-35;
 const y=bounds.height-size-(stage===0?13:stage===2&&fed?46:28);
 useEffect(()=>setWalking(true),[stage,inspected,fed]);
 useSpringPosition(cat,{x,y,rotation:stage===0?-11:stage===1?inspected?-7:4:stage===2?fed?-5:6:0},()=>setWalking(false));
 function look(event:React.PointerEvent<HTMLDivElement>){if(event.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const box=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--look-x',`${((event.clientX-box.left)/box.width-.5)*10}px`);event.currentTarget.style.setProperty('--look-y',`${((event.clientY-box.top)/box.height-.5)*6}px`);}
 return <div ref={scene} className={'landscape stage-'+stage+(inspected?' link-inspected':'')+(fed?' pop-fed':'')} onPointerMove={look} onPointerLeave={event=>{event.currentTarget.style.setProperty('--look-x','0px');event.currentTarget.style.setProperty('--look-y','0px');}} aria-hidden="true">
  <PixelWorld/>
  <div className="browser-scene"><div className="browser-bar"><i/><i/><i/><span>somewhere on the internet</span></div><div className="browser-content"><span className="tiny-label">ONE VERY QUESTIONABLE MESSAGE</span><div className="prize-seal">!</div><p>Congratulations!<br/>Claim your extremely<br/><em>legitimate</em> prize.</p><div className="fake-link">prizes.example</div>{inspected&&<div className="destination"><span>Actually goes to:</span><strong>totally-a-prize.invalid</strong></div>}</div></div>
  <div className="scene-caption">{stage===0?'RUSTLE, RUSTLE…':stage===1?inspected?'LABEL ≠ DESTINATION':'LET’S TAKE A CLOSER LOOK':stage===2?fed?'SNACK: ACCEPTED':'A LITTLE SNACK?':'PARTY OF TWO.'}</div>
  {stage===2&&<div className={'pixel-snack '+(fed?'snack-offered':'')}><i/><i/><i/></div>}
  <div className="scene-pop" ref={cat} data-motion-state={walking?'moving':'settled'}><Pop size={size} state={walking?'walking':stage===0?'curious':stage===1?'inspecting':stage===2&&fed||stage===3?'celebrating':'idle'}/><span className="pop-ground-shadow"/></div>
  {stage===3&&<div className="party-stamp">POP JOINED YOUR PARTY</div>}
 </div>;
}
