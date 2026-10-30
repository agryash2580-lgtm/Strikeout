import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {pipeline} from 'node:stream/promises';
import {Readable} from 'node:stream';

const [keyFile,destination='restored-original-workspace',manifestFile='handoff/manifest.json']=process.argv.slice(2);
if(!keyFile)throw Error('Usage: node scripts/restore-workspace.mjs <private-key-file> [new-output-directory]');
const directory=path.dirname(path.resolve(manifestFile)),manifest=JSON.parse(await fsp.readFile(path.resolve(manifestFile),'utf8'));
manifest.parts ||= [{path:manifest.file,bytes:manifest.bytes,sha256:manifest.sha256}];
const key=Buffer.from((await fsp.readFile(keyFile,'utf8')).trim(),'base64');
if(key.length!==32)throw Error('The restore key must contain the original 32-byte base64 key.');
await fsp.mkdir(destination,{recursive:true});
const encrypted=path.resolve(destination,'full-workspace.tar.gz.enc'),archive=path.resolve(destination,manifest.outputName||'full-workspace.tar.gz');
async function* parts(){for(const part of manifest.parts){const file=path.join(directory,path.basename(part.path)),h=crypto.createHash('sha256');let size=0;for await(const bytes of fs.createReadStream(file)){h.update(bytes);size+=bytes.length;}if(size!==part.bytes||h.digest('hex')!==part.sha256)throw Error('Missing or damaged backup part: '+part.path);yield* fs.createReadStream(file);}}
await pipeline(Readable.from(parts()),fs.createWriteStream(encrypted,{flags:'wx'}));
const digest=crypto.createHash('sha256');await pipeline(fs.createReadStream(encrypted),digest);
if(digest.digest('hex')!==manifest.sha256)throw Error('Combined archive hash did not match.');
const file=await fsp.open(encrypted,'r'),header=Buffer.alloc(23),tag=Buffer.alloc(16),size=(await file.stat()).size;
await file.read(header,0,23,0);await file.read(tag,0,16,size-16);await file.close();
if(header.subarray(0,11).toString()!=='STRIKEOUT1\n')throw Error('Unexpected backup format.');
const decipher=crypto.createDecipheriv('aes-256-gcm',key,header.subarray(11));decipher.setAuthTag(tag);
const temporary=archive+'.partial';
try{await pipeline(fs.createReadStream(encrypted,{start:23,end:size-17}),decipher,fs.createWriteStream(temporary,{flags:'wx'}));await fsp.rename(temporary,archive);}catch(error){await fsp.unlink(temporary).catch(()=>{});throw error;}
console.log('Verified and decrypted:',archive);
console.log('Extract into the new directory with tar -xzf, or use 7-Zip. Do not overwrite current work.');
