import {useEffect,useRef} from 'react';
export type SpringTarget={x:number;y:number;rotation:number};
// Position and velocity persist between targets; controls never wait on animation.
export function useSpringPosition(ref:any,target:SpringTarget,onSettled?:()=>void){
 const position=useRef<SpringTarget|null>(null),velocity=useRef<SpringTarget>({x:0,y:0,rotation:0});
 const settled=useRef(onSettled);settled.current=onSettled;
 useEffect(()=>{
  const node=ref.current;if(!node)return;
  let frame=0,previous=performance.now();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(!position.current)position.current={...target,x:target.x+36,y:target.y+12};
  function draw(){const p=position.current!;node.style.setProperty('--pop-x',`${p.x}px`);node.style.setProperty('--pop-y',`${p.y}px`);node.style.setProperty('--pop-rotation',`${p.rotation}deg`);}
  function snap(){position.current={...target};velocity.current={x:0,y:0,rotation:0};draw();cancelAnimationFrame(frame);settled.current?.();}
  function step(now:number){
   if(reduced.matches){snap();return;}
   const dt=Math.min((now-previous)/1000,.032);previous=now;let energy=0;
   for(const axis of ['x','y','rotation'] as const){const delta=position.current![axis]-target[axis];velocity.current[axis]+=(-155*delta-19*velocity.current[axis])*dt;position.current![axis]+=velocity.current[axis]*dt;energy+=Math.abs(delta)+Math.abs(velocity.current[axis]);}
   draw();if(energy<.35){snap();return;}frame=requestAnimationFrame(step);
  }
  const changed=()=>{if(reduced.matches)snap();};reduced.addEventListener('change',changed);
  if(reduced.matches)snap();else frame=requestAnimationFrame(step);
  return()=>{cancelAnimationFrame(frame);reduced.removeEventListener('change',changed);};
 },[target.x,target.y,target.rotation]);
}
