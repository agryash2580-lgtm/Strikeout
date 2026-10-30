import {useEffect,useRef,useState} from 'react';
import {api} from './inspection';
import {equal,workspace,mergeWorkspace,resolveWorkspaceConflicts} from '../shared/workspace.mjs';
const key=(owner:string)=>'strikeout.pending.'+owner;
const pause=(ms:number)=>new Promise(resolve=>setTimeout(resolve,ms));
type State={phase:string;message:string;detail?:string;conflicts?:any[]};

export function useWorkspaceSave(owner:string|null,ready:boolean,data:any,setData:any){
 const [state,setState]=useState<State>({phase:'idle',message:''});
 const latest=useRef(data),active=useRef(owner),base=useRef<any>(null),running=useRef<Promise<boolean>|null>(null),runningOwner=useRef<string|null>(null),conflict=useRef<any>(null),transferred=useRef<string|null>(null);
 latest.current=data;active.current=owner;
 const sameOwner=(id:string)=>active.current===id&&base.current?.owner===id;
 function backup(id:string){try{sessionStorage.setItem(key(id),JSON.stringify({format:2,base:base.current?.value,local:workspace(latest.current),conflicts:conflict.current||undefined}));}catch{setState({phase:'error',message:'Save needs retry',detail:'This browser cannot keep another recovery copy. Download your pending changes before closing this tab.'});}}
 function adopt(value:any){latest.current=value;setData(value);}
 function hydrate(id:string,remote:any,transfer?:any){
  base.current={owner:id,value:workspace(remote),version:remote.dataVersion||0};conflict.current=null;
  let recovered=workspace(remote);
  try{const raw=sessionStorage.getItem(key(id));if(raw||transfer){const pending=transfer||JSON.parse(raw!),local=pending.format===2?pending.local:workspace(pending),before=pending.format===2?pending.base:{cases:[],identifiers:[]};const result=mergeWorkspace(before,local,remote);recovered=result.merged;const unresolved=[...new Map([...(pending.conflicts||[]),...result.conflicts].map(item=>[item.path,item])).values()];if(transfer){transferred.current=transfer.fromOwner;sessionStorage.setItem(key(id),JSON.stringify({...pending,base:workspace(remote),local:recovered,conflicts:unresolved}));}if(unresolved.length){conflict.current=unresolved;setState({phase:'conflict',message:'Review pending edits',conflicts:unresolved});}else setState({phase:'idle',message:equal(recovered,workspace(remote))?'All changes saved':'Recovered pending changes'});}else setState({phase:'idle',message:'All changes saved'});}catch{setState({phase:'error',message:'Recovery copy needs review',detail:'The saved recovery copy could not be read. It has been retained in this tab.'});}
  return recovered;
 }
 async function perform(id:string):Promise<boolean>{
  if(!sameOwner(id)||conflict.current)return false;
  let failures=0,rebases=0;
  while(sameOwner(id)){
   const snapshot=workspace(latest.current);
   if(equal(snapshot,base.current.value)){clearBackup(id);setState({phase:'saved',message:'All changes saved'});return true;}
   if(!navigator.onLine){setState({phase:'offline',message:'Offline · draft kept in this tab',detail:'Saving resumes when your connection returns.'});return false;}
   backup(id);setState({phase:'saving',message:'Saving changes…'});
   try{
    const result=await api('/api/data','PUT',{...snapshot,dataVersion:base.current.version});
    if(!sameOwner(id))return false;
    base.current={owner:id,value:snapshot,version:result.dataVersion};failures=0;
    if(equal(workspace(latest.current),snapshot)){clearBackup(id);setState({phase:'saved',message:'Saved '+new Date(result.savedAt).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})});return true;}
   }catch(error:any){
    if(!sameOwner(id))return false;
    if(error.status===409&&rebases++<4){
     try{const remote=await api('/api/data');if(!sameOwner(id))return false;const result=mergeWorkspace(base.current.value,workspace(latest.current),remote);base.current={owner:id,value:workspace(remote),version:remote.dataVersion||0};adopt(result.merged);if(result.conflicts.length){conflict.current=result.conflicts;backup(id);setState({phase:'conflict',message:'Review pending edits',conflicts:result.conflicts});return false;}continue;}catch(reloadError){error=reloadError;}
    }
    const retryable=!error.status||error.status>=500||error.status===429;
    if(retryable&&failures<3){const delay=Math.min(Math.max((error.retryAfter||0)*1000,700*2**failures),15000);failures++;setState({phase:'retrying',message:'Reconnecting · retry '+failures+' of 3',detail:'Your pending changes are kept in this tab.'});await pause(delay);continue;}
    backup(id);setState({phase:error.status===401?'auth':'error',message:error.status===401?'Sign in to finish saving':'Save needs retry',detail:error.message||'The connection failed. Your pending changes are kept in this tab.'});return false;
   }
  }return false;
 }
 function flush():Promise<boolean>{
  if(running.current&&runningOwner.current===active.current)return running.current;
  const id=active.current;if(!id||!sameOwner(id))return Promise.resolve(false);
  const task=perform(id).finally(()=>{if(running.current===task)running.current=null;});runningOwner.current=id;running.current=task;return task;
 }
 function clearBackup(id:string){sessionStorage.removeItem(key(id));if(transferred.current){sessionStorage.removeItem(key(transferred.current));transferred.current=null;}}
 function resolve(side:'local'|'remote'){
  if(!conflict.current)return;const next=resolveWorkspaceConflicts(workspace(latest.current),conflict.current,side);conflict.current=null;adopt(next);if(equal(next,base.current?.value)){if(owner)clearBackup(owner);setState({phase:'saved',message:'All changes saved'});}else{if(owner)backup(owner);setState({phase:'idle',message:'Saving reviewed edits…'});}
 }
 useEffect(()=>{
  if(!owner||!ready||!sameOwner(owner))return;
  if(equal(workspace(data),base.current.value)&&!conflict.current)return;
  backup(owner);if(conflict.current)return;
  setState({phase:'saving',message:'Saving changes…'});const timer=setTimeout(()=>void flush(),650);return()=>clearTimeout(timer);
 },[owner,ready,data]);
 useEffect(()=>{
  const reconnect=()=>void flush();const beforeClose=(event:BeforeUnloadEvent)=>{if(owner&&sameOwner(owner)&&!equal(workspace(latest.current),base.current.value)){backup(owner);event.preventDefault();event.returnValue='';}};
  window.addEventListener('online',reconnect);window.addEventListener('beforeunload',beforeClose);
  return()=>{window.removeEventListener('online',reconnect);window.removeEventListener('beforeunload',beforeClose);};
 },[owner]);
 return {state,hydrate,flush,resolve,retry:flush,capture:()=>({format:2,fromOwner:active.current,base:base.current?.value||{cases:[],identifiers:[]},local:workspace(latest.current),conflicts:conflict.current||[]}),exportDraft:()=>JSON.stringify({pending:workspace(latest.current),saved:base.current?.value,conflicts:conflict.current||[]},null,2)};
}
