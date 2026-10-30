import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'msedge'});
try{
 const page=await browser.newPage();await page.goto(process.env.TEST_URL||'https://strikeout-wheat.vercel.app/home');
 const outcome=await page.evaluate(async()=>{
  const request=async(path,method='GET',body)=>{const r=await fetch(path,{method,headers:body?{'content-type':'application/json'}:{},body:body?JSON.stringify(body):undefined});return {status:r.status,data:await r.json()};};
  const guest=await request('/api/demo/start','POST',{});if(guest.status!==200)throw Error('Synthetic guest could not start: '+guest.status);
  try{
   const current=await request('/api/data');const body={...current.data,cases:[{id:crypto.randomUUID(),title:'Synthetic large-record save check',summary:'F'.repeat(100000),createdAt:new Date().toISOString()}]};const statuses=[];
   for(const size of [100000,650000,650001]){body.cases[0].summary='F'.repeat(size);const result=await request('/api/data','PUT',body);statuses.push(result.status);if(result.status!==200)throw Error('Large save returned '+result.status);body.dataVersion=result.data.dataVersion;}
   const saved=await request('/api/data');return {statuses,storedCharacters:saved.data.cases[0].summary.length,dataVersion:saved.data.dataVersion};
  }finally{await request('/api/account','DELETE');}
 });assert.deepEqual(outcome.statuses,[200,200,200]);assert.equal(outcome.storedCharacters,650001);assert.equal(outcome.dataVersion,3);console.log('Hosted large-record save check:',JSON.stringify(outcome));
}finally{await browser.close();}
