const assert=require('node:assert/strict');
(async()=>{
 const{applicationReview}=await import('../worker/academic-service.mjs');let calls=0;
 const env={AI_RATE_LIMITER:{limit:async()=>({success:true})},AI:{run:async()=>{calls++;throw Error('daily neurons quota exceeded')}}};
 const send=raw=>applicationReview(new Request('https://camino.example/api/application-review',{method:'POST',headers:{Origin:'https://camino.example','Content-Type':'application/json'},body:raw}),env);
 const base={consent:true,prompt:'Describe your project.',essay:'I built a sensor.',activities:''};
 for(const body of [{...base,essay:'学'.repeat(30000)},{...base,essay:'学'.repeat(30000),activities:'é'.repeat(15000),prompt:'问'.repeat(6000),requirements:'条'.repeat(4000),applicationContext:'文'.repeat(4000)},{...base,essay:'a'+'\u0000'.repeat(29999),activities:'\u0000'.repeat(15000),prompt:'q'+'\u0000'.repeat(5999),requirements:'\u0000'.repeat(4000),applicationContext:'\u0000'.repeat(4000),coursework:Array.from({length:40},()=>({code:'\u0000'.repeat(40),title:'\u0000'.repeat(100),grade:'\u0000'.repeat(10)}))}]){const raw=JSON.stringify(body);assert.ok(new TextEncoder().encode(raw).length>70000);const r=await send(raw);assert.equal(r.status,503);assert.equal((await r.json()).code,'AI_QUOTA_EXCEEDED')}
 assert.equal(calls,3);for(const raw of ['null','[]','{']){const r=await send(raw);assert.equal(r.status,400);assert.equal((await r.json()).code,'REVIEW_REQUEST_INVALID')}
 let r=await send(JSON.stringify({...base,essay:'a'.repeat(30001)}));assert.equal(r.status,400);
 r=await send(JSON.stringify({...base,padding:'x'.repeat(400001)}));assert.equal(r.status,413);assert.equal((await r.json()).code,'REVIEW_REQUEST_TOO_LARGE');assert.equal(calls,3);
 console.log('Supported Unicode/escaped maximum drafts reach inference; invalid JSON/shape, field limit and byte cap fail with400/413 without model calls.');
})().catch(e=>{console.error(e);process.exitCode=1});
