// Explicit integration check. Uses isolated synthetic records and removes them.
import assert from 'node:assert/strict';
try{process.loadEnvFile('.env.local');}catch{}
if(!process.env.BLOB_READ_WRITE_TOKEN)throw Error('Configure the private Blob token before running this explicit integration check.');
process.env.STORAGE_BACKEND='blob';
const {read,write,remove}=await import('../api/store.mjs');
for(const size of [3000,100000,650000]){
 const key='diagnostics/'+crypto.randomUUID();
 try{
  await write(key,{revision:0,text:'Synthetic evidence '.repeat(Math.ceil(size/19))});
  const a=await read(key),stale=await read(key);assert.ok(a._etag&&!a._etag.startsWith('W/'),'The record must keep a strong version tag');
  a.revision=1;await write(key,a);assert.equal((await read(key)).revision,1);
  stale.revision=2;await assert.rejects(write(key,stale),error=>error.status===409&&error.code==='STORAGE_CONFLICT');
  console.log('PASS: '+size+' byte synthetic record saves and rejects a stale replacement.');
 }finally{await remove(key);}
}
