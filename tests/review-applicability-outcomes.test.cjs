const assert=require('node:assert/strict');
(async()=>{
 const {assessRequirementParts,enforceObservedOutcomeAdvice}=await import('../worker/academic-service.mjs');
 const essay='This is my first application to the program. In our robotics club I wrote a troubleshooting guide.',text='If you previously applied to this program, explain what changed.';
 const review=t=>({requirementChecks:[{requirementIndex:0,requirement:t}]}),body={essay,activities:'',prompt:text,requirements:text};
 const row=(applicability,applicabilityEvidence)=>({requirements:[{requirementIndex:0,applicability,applicabilityEvidence,parts:[{partIndex:0,status:'addressed',evidenceBasis:'direct',evidence:essay,feedback:'A response.'}]}]});
 const r=assessRequirementParts(review(text),row('not-applicable','This is my first application to the program.'),body)[0];
 assert.equal(r.status,'not-applicable');assert.equal(r.coveredParts,0);assert.equal(r.fullyChecked,true);assert.match(r.feedback,/no missing response/);
 for(const raw of [row('not-applicable','I have never applied before.'),row('not-applicable',''),row('unknown','')]){const x=assessRequirementParts(review(text),raw,body)[0];assert.equal(x.status,'needs-review');assert.equal(x.evidenceBasis,'uncertain');assert.match(x.feedback,/not a finding that content is missing/);}
 // An unconditional requirement cannot be waived by model-reported applicability.
 const direct='Describe your project.';assert.notEqual(assessRequirementParts(review(direct),row('not-applicable',essay),body)[0].status,'not-applicable');
 const original={improvements:[{feedback:'Describe the expected outcome.',action:'What will happen when the folder is used?',revisionQuestion:'What will happen when the folder is used?',revisionReason:'Explain the anticipated result.'}],promptCoverage:[]};
 const checked=enforceObservedOutcomeAdvice(structuredClone(original),{prompt:'Describe the observed outcome.',requirements:''});assert.match(checked.improvements[0].action,/another truthful example/);assert.match(checked.improvements[0].revisionQuestion,/actual observed result/);assert.doesNotMatch(checked.improvements[0].action,/what will happen/i);
 const unavailable={improvements:[{verification:'quote-matched',evidenceSource:'essay',evidence:'I do not have an observed result.',feedback:'The result is not available yet.',action:'What was the observed outcome after implementation?',revisionQuestion:'What was the observed outcome after implementation?',revisionReason:'It has not happened.'}],promptCoverage:[]};
 const fixed=enforceObservedOutcomeAdvice(unavailable,{prompt:'Describe an observed result.',requirements:''}).improvements[0];assert.match(fixed.feedback,/not available yet/);assert.match(fixed.action,/another truthful example/);assert.doesNotMatch(fixed.revisionQuestion,/after implementation/);
 assert.deepEqual(enforceObservedOutcomeAdvice(structuredClone(original),{prompt:'Describe your expected outcome.',requirements:''}),original);
 console.log('Conditional applicability requires a conditional prompt and matched essay quote; unknown is not missing. Observed-result advice cannot substitute predictions; future-goal prompts unchanged.');
})().catch(e=>{console.error(e);process.exitCode=1});
