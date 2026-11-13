/* Published UWB pathways and transcript-backed credit reconciliation. No name-only matching. */
const AcademicPathway=(()=>{
 const BC='Bellevue College',UWB='University of Washington Bothell';
 const sources={stem:'https://www.uwb.edu/stem/undergraduate/resources/stem-transfer-courses',registrar:'https://www.uwb.edu/registrar/policies/community-college-course-equivalency-guide/bellevue-college',general:'https://admit.washington.edu/apply/transfer/equivalency-guide/bellevue/',curriculum:'https://www.uwb.edu/stem/undergraduate/majors/electrical/curriculum',admissions:'https://www.uwb.edu/stem/undergraduate/majors/electrical/admissions',math:'https://www.washington.edu/students/crscatb/stmath.html',physics:'https://www.washington.edu/students/crscatb/bphys.html',ee:'https://www.washington.edu/students/crscatb/bee.html',css:'https://www.washington.edu/students/crscatb/css.html',labs:'https://www.washington.edu/students/crscatb/cssskl.html',capstone:'https://www.washington.edu/students/crscatb/bengr.html'};
 const checked='2026-11-08',norm=s=>String(s||'').toUpperCase().replace(/\s+/g,'');
 const groups=[
 ['calc1',['MATH& 151'],['STMATH 124','MATH 124'],['MATH 124'],'stem'],
 ['calc2',['MATH& 152'],['STMATH 125','MATH 125'],['MATH 125'],'stem'],
 ['calc3',[],['STMATH 126','MATH 126'],['MATH 126'],'math'],
 ['diff',['MATH 238'],['STMATH 207','MATH 207'],['MATH 207'],'stem'],
 ['linear',['MATH 208'],['STMATH 208','MATH 208'],['MATH 208'],'stem'],
 ['multi',['MATH 255'],['STMATH 224','MATH 224'],['MATH 224'],'stem'],
 ['phys1',['PHYS 121'],['B PHYS 121','PHYS 121'],['PHYS 121'],'general'],
 ['phys2',['PHYS 122'],['B PHYS 122','PHYS 122'],['PHYS 122'],'general'],
 ['phys3',['PHYS 123'],['B PHYS 123','PHYS 123'],['PHYS 123'],'general'],
 ['comp1',['ENGL& 101'],['B WRIT 134','ENGL 131','ENGL 111','ENGL 121'],['ENGL 131'],'stem'],
 ['comp2',['ENGL 201','ENGL 235','ENGL 271','ENGL 272'],['B WRIT 135','ENGL 141'],['ENGL 141'],'stem'],
 ['precalc1',['MATH& 141'],['B MATH 122'],['MATH 1XX'],'registrar'],
 ['precalc2',['MATH& 142'],['B MATH 123','MATH 120'],['MATH 120'],'general'],
 ['introcs',['CS 101'],['CSE 100'],['CSE 100'],'general'],
 ['environment',['ENVS& 100'],['ESRM 100'],['ESRM 100'],'general'],
 ['politics',['POLS& 202'],['POL S 202'],['POL S 202'],'general'],
 ['hist146',['HIST& 146'],[],['HSTAA 1XX'],'general'],
 ['hist147',['HIST& 147'],[],['HSTAA 1XX'],'general'],
 ['hist148',['HIST& 148'],[],['HSTAA 1XX'],'general']
 ].map(([id,bc,uw,transfer,source])=>({id,bc,uw,transfer,source:sources[source]}));
 const gradeValue=row=>{const value=String(row.grade||'').trim().toUpperCase();const scale={'A+':4,A:4,'A-':3.7,'B+':3.3,B:3,'B-':2.7,'C+':2.3,C:2,'C-':1.7,'D+':1.3,D:1,'D-':.7,F:0};return value in scale?scale[value]:value!==''&&Number.isFinite(+value)?+value:null};
 const generic=row=>/\dX{1,3}\b/i.test(row.code);
 function baseGroup(row){const institution=String(row.institution||'').trim();return groups.find(g=>(institution===BC?g.bc:institution===UWB||institution==='University of Washington Seattle'?g.uw:[]).some(code=>norm(code)===norm(row.code)));}
 function identity(row){return [row.institution,norm(row.code),row.term||'',String(row.grade||'').toUpperCase(),row.transcriptCredits??row.credits,generic(row)?row.recordKey||row.title:''].join('|')}
 function original(row){if(typeof TranscriptImport!=='undefined')row=TranscriptImport.repairLegacyCourse(row);const out={...row,credits:Number(row.transcriptCredits??row.credits)};delete out.creditOrigins;delete out.transcriptCredits;delete out.equivalenceEvidence;delete out.transferCovered;return out;}
 function windowOf(row){const years=String(row.term||'').match(/(?:19|20)\d{2}/g);return row.creditType==='transfer'&&years?.length>=2?[+years[0],+years[years.length-1]]:null;}
 function within(row,range){const year=String(row.term||'').match(/(?:19|20)\d{2}/);return !!year&&+year[0]>=range[0]&&+year[0]<=range[1];}
 function reconcile(courses,ledger=[]){
  const raw=[],seen=new Set();for(const course of [...courses,...ledger]){for(const row of [original(course),...(course.creditOrigins||[]).map(original)]){const key=identity(row);if(seen.has(key))continue;seen.add(key);raw.push(row);}}
  const initial=CaminoEngine.consolidate(raw),clean=initial.courses.flatMap(row=>[original(row),...(row.creditOrigins||[]).filter(origin=>origin.institution!==row.institution).map(original)]),aliases=new Map();
  // A generic transfer bucket is matched only to a unique source course supported by the published guide and matching grade/credit evidence.
  for(const row of clean.filter(r=>r.creditType==='transfer'&&r.sourceInstitution===BC&&generic(r))){const range=windowOf(row);const candidates=clean.filter(c=>c.institution===BC&&CaminoEngine.passing(c)&&(!range||within(c,range))&&baseGroup(c)?.transfer.some(code=>norm(code)===norm(row.code))&&Number(c.credits)===Number(row.credits)&&gradeValue(c)!==null&&gradeValue(c)===gradeValue(row));if(candidates.length===1)aliases.set(identity(row),baseGroup(candidates[0]));}
  const sourceKey=row=>row.institution+'|'+norm(row.code)+(generic(row)?'|'+identity(row):'');
  const directTargets={'ENGL&101':['ENGL131','BWRIT134'],'ENGL201':['ENGL141','BWRIT135'],'ENGL235':['BWRIT135'],'ENGL271':['BWRIT135'],'ENGL272':['BWRIT135'],'MATH&141':['BMATH122','MATH1XX'],'MATH&142':['MATH120']};
  const buckets=new Map();for(const row of clean){let key=sourceKey(row);if(CaminoEngine.passing(row)&&row.institution===UWB&&row.creditType==='transfer'&&row.sourceInstitution===BC){const range=windowOf(row);const candidates=clean.filter(c=>{if(c.institution!==BC||!CaminoEngine.passing(c)||range&&!within(c,range))return false;const group=baseGroup(c);if(!group)return false;const targets=directTargets[norm(c.code)]||[...group.uw,...group.transfer].map(norm);return targets.includes(norm(row.code))&&gradeValue(c)!==null&&gradeValue(c)===gradeValue(row);});if(candidates.length===1)key=sourceKey(candidates[0]);else if(!generic(row)){const direct=new Set(['calc1','calc2','diff','linear','multi','phys1','phys2','phys3','introcs','environment','politics','precalc1','precalc2']);const exact=clean.filter(c=>{const group=baseGroup(c);return c.institution===BC&&CaminoEngine.passing(c)&&group&&(direct.has(group.id)||(norm(c.code)==='ENGL&101'&&norm(row.code)==='ENGL131')||(norm(c.code)==='ENGL201'&&norm(row.code)==='ENGL141'))&&group.transfer.some(code=>norm(code)===norm(row.code));});if(exact.length===1)key=sourceKey(exact[0]);}}if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(row);}
  const combined=[],merged=[...initial.merged],rawGroups=[];
  for(const list of buckets.values()){
   const ordered=[...list].sort((a,b)=>(b.institution===UWB)-(a.institution===UWB)||Number(b.completed)-Number(a.completed));const winner=ordered[0],others=ordered.slice(1),group=aliases.get(identity(winner))||baseGroup(others.find(c=>c.institution===BC)||{})||baseGroup(winner);
   const row={...winner,transcriptCredits:winner.credits,credits:Math.max(...list.map(c=>Number(c.credits)||0)),creditOrigins:others.map(original)};
   if(others.length){row.equivalenceEvidence={url:group?.source||sources.general,checked,kind:'Published course mapping with transcript evidence'};for(const other of others)merged.push({kept:original(winner),removed:original(other),verified:!!group});}
   combined.push(row);rawGroups.push({row,list});
  }
  const sourceNames=[...new Set(clean.filter(c=>c.creditType==='transfer'&&c.sourceInstitution).map(c=>c.sourceInstitution))],hidden=[],coverage=[];
  for(const school of sourceNames){const transfers=clean.filter(c=>c.creditType==='transfer'&&c.sourceInstitution===school&&CaminoEngine.passing(c)),ranges=transfers.map(windowOf).filter(Boolean);if(!ranges.length)continue;const range=[Math.min(...ranges.map(r=>r[0])),Math.max(...ranges.map(r=>r[1]))];const source=clean.filter(c=>c.institution===school&&CaminoEngine.passing(c)&&within(c,range));if(!source.length)continue;
   const sourceCredits=source.reduce((n,c)=>n+Number(c.credits),0),transferCredits=transfers.reduce((n,c)=>n+Number(c.credits),0);let explicitOverlap=0,unpaired=0;
   for(const bucket of rawGroups){const target=bucket.list.filter(c=>transfers.includes(c));if(!target.length)continue;const native=bucket.list.filter(c=>source.includes(c));if(native.length)explicitOverlap+=Math.min(native.reduce((n,c)=>n+Number(c.credits),0),target.reduce((n,c)=>n+Number(c.credits),0));else if(!bucket.list.some(c=>c.institution===school&&c.creditType!=='transfer')){unpaired+=target.reduce((n,c)=>n+Number(c.credits),0);if(bucket.row.creditType==='transfer'){hidden.push(bucket.row);bucket.row.transferCovered=true;}}}
   const additionalOverlap=Math.max(0,Math.min(sourceCredits,transferCredits)-explicitOverlap),uncovered=Math.max(0,unpaired-additionalOverlap);coverage.push({institution:school,sourceCredits,transferCredits,explicitOverlap,uncovered,range});
  }
  const active=combined.filter(c=>!c.transferCovered),creditTotal=active.filter(CaminoEngine.passing).reduce((n,c)=>n+Number(c.credits),0)+coverage.reduce((n,c)=>n+c.uncovered,0);
  return{courses:active,ledger:hidden.map(c=>{const r={...c};delete r.transferCovered;return r}),coverage,creditTotal,merged,excluded:initial.excluded};
 }
 function records(state){return [...(state.courses||[]),...(state.creditLedger||[])].flatMap(c=>[c,...(c.creditOrigins||[])]);}
 function normalizeState(state){const r=reconcile(state.courses||[],state.creditLedger||[]);state.courses=r.courses;state.creditLedger=r.ledger;state.academicSchema=1;if(r.excluded.length)state.excludedAttempts=[...new Map([...(state.excludedAttempts||[]),...r.excluded].map(c=>[identity(c),c])).values()];state.creditSummary={total:r.creditTotal,coverage:r.coverage,combined:r.merged.length};return r;}
 const course=(code,title,credits,prereqs=[],extra={})=>({code,title,credits,prereqs,institution:UWB,minGrade:2,source:sources.curriculum,checked,...extra});
 const requirements=[
 course('STMATH 124','Calculus I',5,[],{group:'calc1',readiness:[{code:'MATH 120',min:2.5},{code:'B MATH 123',min:2.5}],admissionMin:2.3}),
 course('STMATH 125','Calculus II',5,['STMATH 124'],{group:'calc2',admissionMin:2.3}),
 course('STMATH 126','Calculus III',5,['STMATH 125'],{group:'calc3'}),
 course('STMATH 207','Differential Equations',5,['STMATH 125'],{group:'diff'}),
 course('STMATH 208','Matrix Algebra',5,['STMATH 125'],{group:'linear'}),
 course('STMATH 224','Multivariable Calculus',5,['STMATH 126'],{group:'multi'}),
 course('STMATH 390','Probability and Statistics in Engineering',5,['STMATH 224']),
 course('B PHYS 121','Mechanics with lab',5,[],{group:'phys1',bcCredits:6,coreqs:['STMATH 124'],admissionMin:2.3}),
 course('B PHYS 122','Electromagnetism and Oscillatory Motion',5,['B PHYS 121'],{group:'phys2',bcCredits:6,coreqs:['STMATH 125']}),
 course('B PHYS 123','Waves with lab',5,['B PHYS 122'],{group:'phys3',bcCredits:6}),
 course('CHEM 142','General Chemistry I with lab',6,[],{alternatives:['CHEM 142'],defaultDisplay:'B CHEM 143 + B CHEM 144',review:'Chemistry lecture/lab combinations require a record-specific review if CHEM 142 is not already awarded.'}),
 course('CSS 142','Computer Programming I + CSSSKL 142',6,[],{alternatives:['CSS 132','CSS 142'],lab:'CSSSKL 142',bc:'CS 210',bcCredits:5,series:true}),
 course('CSS 143','Computer Programming II + CSSSKL 143',6,['CSS 142'],{alternatives:['CSS 133','CSS 143'],prereqMin:{'CSS 142':2.7},lab:'CSSSKL 143',bc:'CS 211',bcCredits:5,series:true}),
 course('B WRIT 134','English Composition',5,[],{group:'comp1',admissionMin:2}),
 course('B WRIT 135','Research Writing',5,['B WRIT 134'],{group:'comp2'}),
 course('CSS 301','Technical Writing for Computing Professionals',5,['B WRIT 135']),
 course('B EE 215','Fundamentals of Electrical Engineering',4,['STMATH 125']),
 course('B EE 200','Electric Circuits Lab',2,['B EE 215'],{coreqs:['B EE 233']}),
 course('B EE 233','Circuit Theory',4,['B EE 215'],{coreqs:['B EE 200']}),
 course('B EE 235','Continuous Time Linear Systems',5,['B EE 215','B PHYS 122','STMATH 207'],{coreqs:['CSS 142']}),
 course('B EE 271','Digital Circuits and Systems',5,['CSS 142']),
 course('B EE 331','Devices and Circuits I',5,['B EE 200','B EE 233'],{coreqs:['B EE 271']}),
 course('B EE 332','Devices and Circuits II',5,['B EE 331']),
 course('B EE 341','Discrete Time Linear Systems',5,['B EE 200','B EE 233','B EE 235','STMATH 126']),
 course('B EE 361','Applied Electromagnetics',5,['B EE 200','B EE 233','B EE 235','STMATH 224','B PHYS 122']),
 course('B EE 425','Microprocessor System Design',5,['B EE 271','B EE 331']),
 course('B ENGR 494','Engineering Design and Innovation',3,[],{coreqs:['B EE 332','B EE 425']}),
 course('B ENGR 495','Capstone Project I',3,['B ENGR 494','B EE 332','B EE 425'],{seasons:['Winter','Spring']}),
 course('B ENGR 496','Capstone Project II',4,['B ENGR 495'],{seasons:['Spring','Summer']})
 ];
 const electives=[course('B EE 427','Digital System Design with HDL',5,['B EE 271']),course('B EE 442','Digital Signal Processing',5,['B EE 341']),course('B EE 447','Introduction to Control Systems',5,['B EE 200','B EE 233','B EE 235']),course('B EE 450','Introduction to Power Electronics',5,['B EE 331']),course('B EE 417','Digital Communication',5,['B EE 341'],{coreqs:['STMATH 390']}),course('B EE 433','Electronic Circuit Design',5,['B EE 332'])];
 function equivalentRecords(req,list){const aliases=[req.code,...(req.alternatives||[])],group=groups.find(g=>g.id===req.group);return list.filter(r=>CaminoEngine.passing(r)&&((r.institution===UWB||r.institution==='University of Washington Seattle')&&aliases.some(c=>norm(c)===norm(r.code))||group&&(baseGroup(r)?.id===group.id||group.transfer.some(c=>norm(c)===norm(r.code))&&r.institution===UWB&&r.creditType==='transfer')));}
 function completion(req,list){if(req.code==='CHEM 142'){const lecture=list.find(c=>c.institution===UWB&&norm(c.code)==='BCHEM143'&&CaminoEngine.passing(c)&&gradeValue(c)>=2);const lab=list.find(c=>c.institution===UWB&&norm(c.code)==='BCHEM144'&&CaminoEngine.passing(c)&&gradeValue(c)>=2);if(lecture&&lab)return lecture;}let rows=equivalentRecords(req,list);if(req.bc&&['CSS 142','CSS 143'].includes(req.code)){const series=['CS 210','CS 211'].every(code=>list.some(r=>r.institution===BC&&norm(r.code)===norm(code)&&CaminoEngine.passing(r)&&gradeValue(r)>=2));if(series)rows.push(...list.filter(r=>r.institution===BC&&norm(r.code)===norm(req.bc)));}return rows.filter(row=>gradeValue(row)!==null&&gradeValue(row)>=(req.minGrade||2)).sort((a,b)=>gradeValue(b)-gradeValue(a))[0]||null;}
 function plan(state,mode){
  const supported=state.profile?.target===UWB&&state.profile?.major==='Electrical Engineering'&&state.profile?.calendar!=='Semester';if(!supported)return{supported:false,courses:[],blocked:[],done:[],remaining:[],method:'Institutional rules not enabled for this selection'};
  const all=records(state),done=new Map(),remaining=[],warnings=[];
  const chosenElectives=electives.filter(c=>(state.selectedElectives||[]).includes(c.code)).slice(0,3);for(const req of [...requirements,...chosenElectives]){const record=completion(req,all);if(record)done.set(req.code,record);else remaining.push({...req});}
  // STEM table permits the full Bellevue Java series; don't infer a one-course mixed-series equivalency.
  const defaultProvider=state.profile?.preferCommunity?BC:UWB;const cpp=norm(done.get('CSS 142')?.code)==='CSS132';
  for(const req of remaining){if(req.code==='CSS 143'&&cpp){req.defaultDisplay='CSS 133 + CSSSKL 133';req.lab='CSSSKL 133';req.prereqMin={'CSS 142':2};}const group=groups.find(g=>g.id===req.group),bc=req.bc||group?.bc[0];req.options=[{institution:UWB,code:req.defaultDisplay||req.code,credits:req.credits}];if(bc&&!(req.code==='CSS 143'&&done.has('CSS 142')&&done.get('CSS 142').institution!==BC))req.options.push({institution:BC,code:bc,credits:req.bcCredits||req.credits,source:group?.source||sources.stem});const selected=state.courseProviders?.[req.code]||((req.group?.startsWith('phys')||req.series)&&state.profile?.bellevueScience!==false?BC:defaultProvider);const option=req.options.find(o=>o.institution===selected)||req.options[0];req.institution=option.institution;req.displayCode=option.code;req.credits=option.credits;if(req.code==='B PHYS 122'&&req.institution===BC){req.prereqs=[...new Set([...req.prereqs,'STMATH 125'])];req.coreqs=(req.coreqs||[]).filter(c=>c!=='STMATH 125');req.planningNote='Camino preparation preference: finish Calculus II in an earlier term before Bellevue Physics II. Confirm Bellevue enrollment rules with the college.';}}
  const physicsStart=remaining.find(c=>c.code==='B PHYS 121'),physicsNext=remaining.find(c=>c.code==='B PHYS 122');if(physicsStart&&physicsNext?.institution===BC){physicsStart.coreqs=[...new Set([...(physicsStart.coreqs||[]),'STMATH 125'])];physicsStart.planningNote='Camino sequence preference: align Mechanics with or after Calculus II so Physics II can follow in the next quarter; this adds preparation time beyond the published UWB minimum.';}
  const programming=remaining.filter(c=>c.series);if(programming.length===2&&programming[0].institution!==programming[1].institution)warnings.push('Your programming classes use different schools. Bellevue’s published equivalency requires the full CS 210/211 series; this mixed-school combination needs advisor confirmation before registration.');
  const firstBC=all.find(c=>c.institution===BC&&norm(c.code)==='CS210'&&CaminoEngine.passing(c)&&gradeValue(c)>=2);if(firstBC){const i=remaining.findIndex(c=>c.code==='CSS 142'&&c.institution===BC);if(i>=0){done.set('CSS 142',firstBC);remaining.splice(i,1);warnings.push('Bellevue CS 210 is already complete. Its UWB programming equivalency remains conditional on completing the CS 210/211 series.');}}
  const completedReady=remaining.find(r=>r.readiness&&!r.readiness.some(p=>all.some(c=>CaminoEngine.passing(c)&&norm(c.code)===norm(p.code)&&gradeValue(c)>=p.min)));
  const readiness=completedReady?'Calculus I requires a qualifying precalculus grade or placement. Confirm placement before registering; your draft assumes that readiness is confirmed.':'';
  const maxCourses=Number(state.profile?.maxCourses)||99;
  const limit={Accelerated:20,Balanced:15,Flexible:10}[mode]||15,summer=!!state.profile?.summer,baseSeasons=summer?['Fall','Winter','Spring','Summer']:['Fall','Winter','Spring'],start=Math.max(0,baseSeasons.indexOf(state.profile?.startTerm||'Winter')),seasons=[...baseSeasons.slice(start),...baseSeasons.slice(0,start)].map(s=>s==='Fall'?'Autumn':s);
  const sequences=[['B PHYS 121','B PHYS 122','B PHYS 123'],['CSS 142','CSS 143'],['STMATH 124','STMATH 125','STMATH 126'],['B EE 331','B EE 332'],['B ENGR 494','B ENGR 495','B ENGR 496']];
  const previous=code=>sequences.flatMap(seq=>seq.slice(1).map((c,i)=>[c,seq[i]])).find(pair=>pair[0]===code)?.[1];
  const depthCache=new Map();
  const depth=(code,seen=new Set())=>{if(depthCache.has(code))return depthCache.get(code);if(seen.has(code))return 0;const next=new Set(seen).add(code);const value=1+Math.max(0,...remaining.filter(c=>c.prereqs.includes(code)).map(c=>depth(c.code,next)));depthCache.set(code,value);return value;};
  function run(order,padded){const doneSet=new Set(done.keys()),left=new Map(remaining.map(c=>[c.code,c])),out=[];let term=0;
   const cost=c=>padded?Math.max(...c.options.map(o=>o.credits)):c.credits;
   while(left.size&&term<48){const season=seasons[term%seasons.length],ready=[...left.values()].filter(c=>c.prereqs.every(p=>doneSet.has(p)&&(!done.has(p)||gradeValue(done.get(p))==null||gradeValue(done.get(p))>=(c.prereqMin?.[p]||2)))&&(!c.seasons||c.seasons.includes(season))).sort((a,b)=>{const urgency=c=>{const prior=out.find(x=>x.code===previous(c.code));return prior?1000+term-prior.term:done.has(previous(c.code))?1000+term+1:0};return urgency(b)-urgency(a)||(order===0?depth(b.code)-depth(a.code)||cost(b)-cost(a):order===1?depth(b.code)-depth(a.code)||cost(a)-cost(b):order===2?cost(b)-cost(a)||depth(b.code)-depth(a.code):cost(a)-cost(b)||depth(b.code)-depth(a.code))});let selected=[],credits=0;
    function bundle(req,visited=new Set()){if(visited.has(req.code)||doneSet.has(req.code)||selected.some(c=>c.code===req.code))return[];const visitedNext=new Set(visited).add(req.code);if(!ready.includes(req))return null;let result=[req];for(const code of req.coreqs||[]){if(doneSet.has(code)||selected.some(c=>c.code===code))continue;const other=left.get(code);if(!other)return null;const addition=bundle(other,visitedNext);if(addition===null)return null;result.push(...addition);}return [...new Map(result.map(c=>[c.code,c])).values()];}
    for(const req of ready){if(selected.includes(req))continue;const group=bundle(req);if(!group)continue;const sum=group.reduce((n,c)=>n+cost(c),0);if(credits+sum<=limit&&selected.length+group.length<=maxCourses){selected.push(...group);credits+=sum;}}
    if(selected.length){for(const c of selected){out.push({...c,term});left.delete(c.code);}selected.forEach(c=>doneSet.add(c.code));}term++;
   }
   const gaps=out.reduce((n,c)=>{const prior=out.find(x=>x.code===previous(c.code));return n+(prior?Math.max(0,c.term-prior.term-1):done.has(previous(c.code))?c.term:0)},0);return{courses:out,gaps,blocked:[...left.keys()],last:Math.max(-1,...out.map(c=>c.term))};
  }
  const candidates=[];for(let strategy=0;strategy<4;strategy++)for(const padded of [false,true])candidates.push(run(strategy,padded));candidates.sort((a,b)=>a.blocked.length-b.blocked.length||a.gaps-b.gaps||a.last-b.last);const best=candidates[0],out=best.courses,blocked=best.blocked;
  for(const req of remaining)for(const pre of req.prereqs){const earned=done.get(pre),min=req.prereqMin?.[pre]||2;if(earned&&gradeValue(earned)!==null&&gradeValue(earned)<min)warnings.push(`${req.code} needs ${pre} at ${min.toFixed(1)} or higher; your recorded grade needs advisor review.`);}
  for(const c of out){const prior=out.find(x=>x.code===previous(c.code));c.explanation=[c.planningNote||'',c.prereqs.length?'Placed after '+c.prereqs.join(', ')+'.':'No earlier prerequisite in the supported roadmap.',prior?(c.term===prior.term+1?'Continues '+(prior.displayCode||prior.code)+' in the next planned quarter.':'Sequence gap in this draft: review workload, co-requisites and seasonal restrictions.'):done.has(previous(c.code))?(c.term===0?'Prioritized continuation of completed '+previous(c.code)+' in the first planned quarter.':'Continuation of completed '+previous(c.code)+' is later in this draft; review prerequisites, workload, co-requisites and seasonal restrictions.'):'',c.coreqs?.length?'Paired with required co-requisites: '+c.coreqs.join(', ')+'.':'',c.institution===BC?'Bellevue selected from published equivalents; confirm local enrollment prerequisites.':'',c.seasons?'Restricted to '+c.seasons.join(' / ')+'.':'','Fits the '+limit+'-credit cap. Future offerings are unconfirmed.'].filter(Boolean).join(' ');}
  const admission=['STMATH 124','STMATH 125','B PHYS 121'].map(code=>({code,minimum:2.3,record:done.get(code)||null}));
  return {supported:true,courses:out,blocked,done:[...done.keys()],remaining,admission,warnings,readiness,method:'Sequence continuity first · eight prerequisite/co-requisite strategies',sources,checked};
 }
 return{BC,UWB,sources,checked,groups,electives,reconcile,normalizeState,records,gradeValue,plan,requirements,completion};
})();
if(typeof module!=='undefined')module.exports=AcademicPathway;
