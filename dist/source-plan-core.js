/* A bounded course subset, never a full degree/eligibility model. */
var SourcePlanBridge=(()=>{
 const norm=s=>String(s||'').toUpperCase().replace(/\s+/g,''),canonical=s=>({'UW Seattle':'University of Washington Seattle','UW Bothell':'University of Washington Bothell','UW Tacoma':'University of Washington Tacoma'}[s]||String(s||'')).trim().toLowerCase();
 const supported=r=>['courses-all','choose-courses'].includes(r.type)&&Array.isArray(r.codes)&&r.codes.length&&r.codes.every(c=>typeof c==='string'&&c.trim()&&c.length<=80)&&!r.condition&&!r.conditions;
 const eligible=(r,o)=>r.phase===o.phase&&(!r.applicantRoutes?.length||r.applicantRoutes.includes(o.route));
 function groups(model,options){const groups=new Map();for(const r of model.rules||[])if(eligible(r,options)&&supported(r)&&r.alternativeGroup){if(!groups.has(r.alternativeGroup))groups.set(r.alternativeGroup,[]);groups.get(r.alternativeGroup).push({id:r.id,codes:r.codes,count:r.count||r.codes.length,type:r.type})}return[...groups].map(([id,choices])=>({id,choices}))}
 function build(model,options={}){
  if(!model||typeof model.id!=='string'||typeof model.title!=='string'||typeof model.institution!=='string'||!['Quarter','Semester'].includes(model.units)||!/^https:\/\//.test(model.source||''))throw Error('The source model needs an identity, institution, explicit credit units and a public source link.');
  if(!['admission','degree'].includes(options.phase))throw Error('Choose admission preparation or a degree-course subset.');
  const selected=new Map();for(const group of groups(model,options)){const id=options.alternatives?.[group.id];if(!group.choices.some(r=>r.id===id))throw Error('Select one complete alternative sequence for every listed group.');selected.set(group.id,id)}
  const display=new Map(),parent=new Map(),root=k=>{if(!parent.has(k))parent.set(k,k);if(parent.get(k)!==k)parent.set(k,root(parent.get(k)));return parent.get(k)};
  for(const r of model.rules||[])for(const aliases of r.crossListedGroups||[]){const first=norm(aliases[0]);for(const code of aliases){const k=norm(code);display.set(k,code);parent.set(root(k),root(first))}}
  const sets=new Map();for(const k of parent.keys()){const id=root(k);if(!sets.has(id))sets.set(id,[]);sets.get(id).push(k)}const preferred=new Map();for(const [id,codes]of sets){const earned=(options.completed||[]).find(c=>c.completed===true&&c.units===model.units&&canonical(c.institution)===canonical(model.institution)&&codes.includes(norm(c.code)));preferred.set(id,earned?.code||display.get(codes[0]))}const rewrite=code=>parent.has(norm(code))?preferred.get(root(norm(code))):code;
  const rows=[],allCourses=new Map();let serial=0;const add=(text,data={})=>{const raw=String(text||'');rows.push({id:'source-plan-'+serial++,text:raw.slice(0,8000),textTruncated:raw.length>8000,kind:'review',count:0,codes:[],phase:options.phase,confirmed:false,...data})},review=(r,note='')=>add((note?note+'\n':'')+(r.sourceText||r.reason||'No substantive source text available.'),{phase:r.phase||'policy'});
  for(const r of model.rules||[]){
   if(!eligible(r,options)){review(r,'Outside this course-planning scope or applicant route; check the source before deciding applicability.');continue}
   if(r.alternativeGroup&&selected.has(r.alternativeGroup)&&selected.get(r.alternativeGroup)!==r.id)continue;
   if(!supported(r)){review(r,'Source condition remains outside this course-only draft.');continue}
   const codes=[...new Set(r.codes.map(rewrite))];
   if(r.type==='courses-all'){review(r,'Source context for the course entries below. Any numeric/policy conditions still need review.');for(const code of codes){const k=norm(code),old=allCourses.get(k);if(old){if(r.minGrade!=null)old.minGrade=Math.max(old.minGrade||0,r.minGrade);old.text='Required course: '+old.codes[0]+(old.minGrade!=null?' · minimum grade '+old.minGrade:'');continue}const row={kind:'all',count:1,codes:[code],phase:r.phase,minGrade:r.minGrade??null};add('Required course: '+code+(r.minGrade!=null?' · minimum grade '+r.minGrade:''),row);allCourses.set(k,rows.at(-1))}}
   else{if(!Number.isInteger(r.count)||r.count<1||r.count>8||r.count>codes.length){review(r,'This course-choice count needs manual interpretation.');continue}add(r.sourceText,{kind:'choose',count:r.count,codes,phase:r.phase,minGrade:r.minGrade??null,selectedCodes:[]})}
   if(r.minTotalCredits!=null||r.minCourseCredits!=null||r.minCredits!=null||r.crossListedGroups?.length)review(r,'Review before registration: credit floors, exact credit awards and cross-list/repeat applicability are not certified by the course-selection draft.');
  }
  if(!rows.some(r=>r.kind!=='review'))throw Error('No unconditional course clauses are modeled for this scope/route. Use the retained source; no course requirements were invented.');
  if(rows.length>500)throw Error('This source subset exceeds the draft review limit. Choose a smaller scope.');
  return{programId:model.id,sourceRecordId:model.id,title:model.title+' · '+(options.phase==='admission'?'Admission course subset':'Degree course subset'),institution:({'UW Seattle':'University of Washington Seattle','UW Bothell':'University of Washington Bothell','UW Tacoma':'University of Washington Tacoma'}[model.institution]||model.institution),units:model.units,source:model.source,checked:model.checked,planningPhase:options.phase,applicantRoute:options.route||'unknown',rows,approvals:{},creditSelections:{},warning:'Course-only subset. Review choices and published prerequisites; retained GPA, credits, residency, alternatives and policy clauses remain outside automatic planning.'};
 }
 return{groups,build,available:(model,options)=>!!model?.rules?.some(r=>eligible(r,options)&&supported(r))};
})();if(typeof module!=='undefined')module.exports=SourcePlanBridge;
