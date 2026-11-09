const assert=require('node:assert/strict');
(async()=>{
 const {handleAPI}=await import('../worker/index.mjs');const objects=new Map();const bucket={async get(k){return objects.get(k)||null},async head(k){return objects.has(k)?{etag:objects.get(k).etag}:null},async put(k,v,opts){const old=objects.get(k);if(opts.onlyIf.etagMatches&&old?.etag!==opts.onlyIf.etagMatches)return null;if(opts.onlyIf.etagDoesNotMatch&&old)return null;const etag='v'+(objects.size+1)+'-'+v.length;objects.set(k,{etag,json:async()=>JSON.parse(v)});return{etag}},async delete(k){objects.delete(k)}};
 const req=(user,method='GET',body,etag='new',origin='https://camino.example')=>new Request('https://camino.example/api/workspace',{method,headers:{...(user?{'oai-authenticated-user-id':user}:{}),'origin':origin,'x-camino-request':'workspace','if-match':etag,'content-type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
 assert.equal((await handleAPI(req(null),{BUCKET:bucket})).status,401);
 assert.equal((await handleAPI(req('alice','PUT',{courses:[]},'new','https://evil.example'),{BUCKET:bucket})).status,403);
 const put=await handleAPI(req('alice','PUT',{courses:[],profile:{name:'Private'}}),{BUCKET:bucket});assert.equal(put.status,200);
 const own=await (await handleAPI(req('alice'),{BUCKET:bucket})).json();assert.equal(own.state.profile.name,'Private');
 const other=await (await handleAPI(req('bob'),{BUCKET:bucket})).json();assert.equal(other.state,null);
 assert.equal((await handleAPI(req('alice','PUT',{courses:[]}),{BUCKET:bucket})).status,409);
 assert.equal((await handleAPI(req('alice','PUT',{courses:'bad'},own.etag),{BUCKET:bucket})).status,400);
 assert.equal((await handleAPI(req('alice','DELETE',null,own.etag),{BUCKET:bucket})).status,200);
 const {default:standalone}=await import('../worker/standalone.mjs');
 const response=await standalone.fetch(new Request('https://camino.example/',{headers:{'oai-authenticated-user-id':'fake'}}),{ASSETS:{fetch:async()=>new Response('ok')}});assert.equal(response.status,200);assert.ok(response.headers.get('Content-Security-Policy').includes("object-src 'none'"));assert.equal((await standalone.fetch(new Request('https://camino.example/api/workspace'),{})).status,404);assert.equal((await standalone.fetch(new Request('https://camino.example/',{method:'POST'}),{})).status,405);assert.equal((await standalone.fetch(new Request('https://camino.example/'),{ASSETS:{fetch:async()=>{throw Error('down')}}})).status,503);
 console.log('Account auth rejection, owner isolation, CSRF, concurrency, validation, deletion, standalone headers and network failure passed.');
})().catch(e=>{console.error(e);process.exitCode=1});
