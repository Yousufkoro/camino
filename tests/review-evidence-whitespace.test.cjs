const assert=require('node:assert/strict');
(async()=>{
 const{createReviewEvidence,assessRequirements,applyRevisionChecks,applicationReview}=await import('../worker/academic-service.mjs');
 const body={essay:'🧭\n\nI built a\nsensor\tand tested it.\n\nI learned to compare\u00a0measurements.',activities:'I scheduled\nweekly sessions.',prompt:'Describe your contribution.',requirements:'Describe your contribution.',consent:true};
 const m=createReviewEvidence(body),quote='I built a sensor and tested it.',hit=m.locate('essay',quote);
 assert.equal(hit.matchType,'whitespace-normalized');assert.equal(hit.evidence,'I built a\nsensor\tand tested it.');assert.equal(body.essay.slice(hit.start,hit.end),hit.evidence);assert.equal(hit.start,body.essay.indexOf('I built'));
 assert.equal(m.locate('essay','I built a\nsensor\tand tested it.').matchType,'exact');assert.equal(m.locate('essay','i built a sensor and tested it.'),null);assert.equal(m.locate('essay','I designed a sensor and tested it.'),null);assert.equal(m.locate('essay',''),null);assert.equal(m.locate('activities','I scheduled weekly sessions.').matchType,'whitespace-normalized');
 const raw={requirementIndex:0,status:'addressed',evidenceBasis:'direct',evidence:quote,feedback:'A contribution is described.'};
 const r=assessRequirements({requirementChecks:[raw]},body).requirementChecks[0];assert.equal(r.status,'addressed');assert.equal(r.evidence,hit.evidence);assert.equal(r.evidenceMatch,'whitespace-normalized');
 const review={summary:'A draft.',strengths:[],promptCoverage:[],requirementChecks:[],improvements:[{verification:'quote-matched',evidence:'I built',feedback:'Needs a lesson.',action:'Add a lesson.',priority:'high'}]};
 const dropped=applyRevisionChecks(review,{checks:[{revisionIndex:0,decision:'drop',alreadyCoveredQuote:'I learned to compare measurements.',unansweredQuestion:'',reason:'The lesson is already present.'}]},body);assert.equal(dropped.improvements.length,0);
 let calls=0;
 const env={
  AI_RATE_LIMITER:{limit:async()=>({success:true})},
  AI:{run:async()=>{
   calls++;
   if(calls===1)return{response:{summary:'An action is present.',strengths:[{evidence:quote,feedback:'A concrete action.',action:'Keep it.',priority:'low'}],improvements:[],promptCoverage:[{evidence:quote,feedback:'The contribution is described.',action:'Check the exact prompt.',priority:'low'}],requirementChecks:[raw]}};
   return{choices:[{message:{content:JSON.stringify({checks:[],requirements:[{requirementIndex:0,parts:[{partIndex:0,...raw}]}]})}}]};
  }}
 };
 const make=()=>new Request('https://camino.example/api/application-review',{method:'POST',headers:{Origin:'https://camino.example','Content-Type':'application/json'},body:JSON.stringify(body)});
 const res=await applicationReview(make(),env);assert.equal(res.status,200,await res.clone().text());const result=(await res.json()).review;
 assert.equal(result.strengths[0].verification,'quote-matched');assert.equal(result.strengths[0].evidenceMatch,'whitespace-normalized');assert.ok(body.essay.includes(result.strengths[0].evidence));assert.equal(result.requirementChecks[0].parts[0].evidenceMatch,'whitespace-normalized');
 const quota=await applicationReview(make(),{...env,AI:{run:async()=>{throw Error('Daily neurons quota exceeded')}}});const error=await quota.json();assert.equal(quota.status,503);assert.equal(error.code,'AI_QUOTA_EXCEEDED');assert.ok(error.error.includes('quota has been reached'));
 console.log('PDF whitespace/NBSP evidence maps to literal source spans; no case/word changes, existing-answer removal, full review pipeline and explicit quota response passed.');
})().catch(e=>{console.error(e);process.exitCode=1});
