try { process.loadEnvFile('.env.local'); } catch {}
const model='gemini-3.1-flash-lite';
try {
 const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{
  method:'POST',headers:{'content-type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},
  body:JSON.stringify({contents:[{parts:[{text:'Reply with exactly: Pop is ready.'}]}],generationConfig:{maxOutputTokens:40}}),
  signal:AbortSignal.timeout(20000)
 });
 const result=await response.json();
 const detail=result.error?.message?.split('\n')[0]||result.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('')||'Empty response';
 console.log({model,http:response.status,status:result.error?.status||'OK',detail:detail.replaceAll(process.env.GEMINI_API_KEY||'__no_key__','REDACTED').slice(0,220)});
} catch(error) {console.log('Provider request failed:',error.name);}
