/* Local transcript extraction. Document text is data, never executable instructions. */
const TranscriptImport=(()=>{
 const failed=new Set(['F','E','W','HW','AW','NW','NP','NC','NS','U','FAIL']);
 const unfinished=new Set(['','I','IP','N','X','RD']);
 const normalizeCode=s=>String(s||'').trim().toUpperCase().replace(/\s*&\s*/,'& ').replace(/\s+/g,' ');
 const generic=code=>/\d[Xx]{1,3}\b/.test(code);
 function status(row){const grade=String(row.grade||'').trim().toUpperCase();if(row.repeatExcluded||/\/R\b/i.test(grade+' '+(row.raw||'')+' '+(row.title||'')))return 'superseded';if(failed.has(grade)||(grade!==''&&Number.isFinite(+grade)&&+grade===0))return 'failed';if(row.noEarnedCredit)return 'no-credit';if(row.attemptStatus==='superseded')return 'superseded';if(unfinished.has(grade))return row.completed?'completed':'in-progress';return 'completed';}
 function detectInstitution(text,context={}){
  const compact=String(text||'').toLowerCase().replace(/[^a-z0-9]/g,'');
  const hasUW=/universityofwashington|uwbothell|uwseattle|uwtacoma/.test(compact);
  const bcPosition=compact.search(/bellevue(?:community)?college/),uwPosition=compact.search(/universityofwashington|uwbothell|uwseattle|uwtacoma/);if(bcPosition>=0&&(uwPosition<0||bcPosition<uwPosition))return 'Bellevue College';
  // UW's own heading/campus takes precedence over the transfer-college section.
  if(hasUW){if(/bothellcampus|uwbothell|premajorbothell/.test(compact))return 'University of Washington Bothell';if(/tacomacampus|uwtacoma|premajortacoma/.test(compact))return 'University of Washington Tacoma';if(/seattlecampus|uwseattle/.test(compact))return 'University of Washington Seattle';}
  if(/bellevue(?:community)?college|bellevuecollegeedu/.test(compact))return 'Bellevue College';
  const matches=(context.schools||[]).filter(x=>x!=='Other Washington institution'&&compact.includes(x.toLowerCase().replace(/[^a-z0-9]/g,'')));
  if(matches.length===1)return matches[0];
  return hasUW?'University of Washington':'';
 }
 function detectHeaderInstitution(text,context={}){
  const direct=detectInstitution(text,context);if(direct&&direct!=='University of Washington')return direct;
  // Restrict known OCR glyph corrections to a short header, never course titles or addresses.
  const compact=String(text||'').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g,'');
  if(/(?:bellevue|bellevve|belevue|beilevue|bellevuc)(?:community)?(?:college|coliege|coilege|colleqe|colle6e|colle9e)/.test(compact))return 'Bellevue College';
  return direct;
 }
 function parse(text,context={}){
  const rows=[],lines=text.replace(/\r/g,'').split('\n');
  const detected=detectInstitution(text,context);const uw=detected.startsWith('University of Washington');
  let host=context.institution||detected,term='',sourceInstitution='',inTransfer=false,attended='';
  if(uw&&!context.institution){if(/Bothell CAMPUS|\bUW Bothell\b|\(BOTHELL\)/i.test(text))host='University of Washington Bothell';else if(/Tacoma CAMPUS|\bUW Tacoma\b|\(TACOMA\)/i.test(text))host='University of Washington Tacoma';else if(/Seattle CAMPUS|\bUW Seattle\b/i.test(text))host='University of Washington Seattle';else host='University of Washington';}
  const occurrence=new Map();
  for(let line of lines){line=line.replace(/[|\t]/g,' ').replace(/\s+/g,' ').trim();if(!line)continue;
   if(/^(?:DETAIL OF |DETAILS OF )?TRANSFER CREDIT\s*:|^DETAIL OF TRANSFER CREDIT/i.test(line)){inTransfer=true;sourceInstitution='';attended='';term='Transfer credit (term not listed)';continue;}
   if(/^SUMMARY OF TRANSFER|^TOTAL |^CUM(?:ULATIVE| )|^QTR |^UW (?:CREDITS|GRADED|GRADE)|^NUMBER OF |^END OF |^PAGE\b/i.test(line))continue;
   const heading=line.match(/^(?:(Fall|Autumn|Winter|Spring|Summer)\s+(20\d{2}|19\d{2})|(20\d{2}|19\d{2})\s+(Fall|Autumn|Winter|Spring|Summer))\b/i);
   if(heading){term=heading[0];inTransfer=false;sourceInstitution='';continue;}
   const campus=line.match(/^(Bothell|Seattle|Tacoma)\s+CAMPUS\b/i);if(campus){host='University of Washington '+campus[1][0].toUpperCase()+campus[1].slice(1).toLowerCase();inTransfer=false;continue;}
   const school=context.schools?.filter(s=>s!=='Other Washington institution').sort((a,b)=>b.length-a.length).find(s=>line.toLowerCase().includes(s.toLowerCase()));
   if(school){if(inTransfer)sourceInstitution=school;else if(!uw)host=school;}
   const attendance=line.match(/^ATTENDED\s+((?:19|20)\d{2}(?:\s*[-–]\s*(?:19|20)\d{2})?)/i);if(inTransfer&&attendance){attended=attendance[1];term='Transfer credit · '+attended;continue;}
   // Multi-part UW subjects (B CORE, B EDUC, POL S), common course numbering, and 1XX elective buckets.
   const match=line.match(/^([A-Z]{1,8}(?:\s+[A-Z]{1,8}){0,2}\s*&?)\s*(\d{2,4}[A-Z]?|\d[X]{1,3})\s+(.+)$/i);if(!match)continue;
   const subject=match[1].trim().toUpperCase();if(/^(?:AUTUMN|WINTER|SPRING|SUMMER|FALL|ATTENDED|GPA|TOTAL|PAGE)$/.test(subject))continue;
   const code=normalizeCode(subject+' '+match[2]);let rest=match[3].trim(),repeatExcluded=/\/R\b/i.test(rest);rest=rest.replace(/\/R\b/ig,'').trim().replace(/(\d+\.\d{3})(?=\d+\.\d)/g,'$1 ').replace(/(\d+\.\d{3})(?=[ABCDEF](?:[+-])?(?:\s|$))/g,'$1 ').replace(/([ABCDEF][+-]?)(?=\d+\.\d{3}(?:\s|$))/g,'$1 ');
   const gradePattern='(?:[0-4]\\.\\d{1,3}|[ABCDEF][+-]?|CR|NC|TR|NP|NS|IP|RD|HW|AW|NW|P|S|U|W|I|N|X|T)';
   let title='',credits='',grade='';
   const pair=rest.match(new RegExp('^(.*?)\\s*(\\d{1,2}(?:\\.\\d{1,3})?)\\s+('+gradePattern+')$','i'));
   const gradeFirst=rest.match(new RegExp('^(.*?)\\s+('+gradePattern+')\\s+(\\d{1,2}(?:\\.\\d{1,3})?)$','i'));
   const num='(\\d{1,3}(?:\\.\\d{1,3})?)',letters='([ABCDEF][+-]?|CR|NC|TR|NP|NS|IP|RD|HW|AW|NW|P|S|U|W|I|N|X|T)';
   const pointsBefore=rest.match(new RegExp('^(.*?)\\s+'+num+'\\s+'+num+'\\s+'+num+'\\s+'+letters+'$','i'));
   const pointsAfter=rest.match(new RegExp('^(.*?)\\s+'+num+'\\s+'+num+'\\s+'+letters+'\\s+'+num+'$','i'));
   const earnedAndGrade=rest.match(new RegExp('^(.*?)\\s+'+num+'\\s+'+num+'\\s+'+letters+'$','i'));
   let earnedCredits,gradePoints;
   const numericColumns=rest.match(/^(.*?)\s+(\d+\.\d{1,3})\s+(\d+\.\d{1,3})\s+(\d+\.\d{1,3})\s+(\d+\.\d{1,3})$/);
   const numericLast=numericColumns&&+numericColumns[5]<=4&&Math.abs(+numericColumns[3]*+numericColumns[5]-+numericColumns[4])<.06;
   const numericBefore=numericColumns&&+numericColumns[4]<=4&&Math.abs(+numericColumns[3]*+numericColumns[4]-+numericColumns[5])<.06;

   if(numericColumns&&(numericLast||numericBefore)){title=numericColumns[1].trim();credits=String(+numericColumns[3]);earnedCredits=+credits;grade=numericLast?numericColumns[5]:numericColumns[4];gradePoints=+(numericLast?numericColumns[4]:numericColumns[5]);if(+credits>20)credits='';}
   else if(pointsBefore||pointsAfter||earnedAndGrade){const m=pointsBefore||pointsAfter||earnedAndGrade;title=m[1].trim();const attempted=+m[2],earned=+m[3];grade=(pointsBefore?m[5]:m[4]).toUpperCase();earnedCredits=earned;gradePoints=pointsBefore?+m[4]:pointsAfter?+m[5]:undefined;credits=earned===0&&unfinished.has(grade)?String(attempted):String(earned);if(+credits>20)credits='';}
   else if(pair){title=pair[1].trim();credits=+pair[2]<=20?String(+pair[2]):'';grade=pair[3].toUpperCase();}
   else if(gradeFirst){title=gradeFirst[1].trim();grade=gradeFirst[2].toUpperCase();credits=+gradeFirst[3]<=20?String(+gradeFirst[3]):'';}
   else {const single=rest.match(new RegExp('^(.*?)(?:^|\\s)('+gradePattern+')$','i'));if(single){title=single[1].trim();grade=single[2].toUpperCase();}else title=rest;}
   // UW's failed/replaced transfer rows omit earned credits, leaving only the grade.
   const noEarnedCredit=(earnedCredits===0&&!unfinished.has(grade))||credits===''&&(repeatExcluded||failed.has(grade)||(grade!==''&&+grade===0));if(noEarnedCredit)credits='0';
   if(!title||title==='R')title=generic(code)?'Transfer elective credit':'Course title not listed';
   const institution=host||context.institution||'';
   const base={code,title,credits,grade,term,institution,sourceInstitution:inTransfer?sourceInstitution:'',creditType:inTransfer?'transfer':'institutional',earnedCredits,gradePoints,repeatExcluded,noEarnedCredit,source:context.file||'',raw:line};
   base.attemptStatus=status(base);base.completed=base.attemptStatus==='completed';base.include=!['failed','superseded','no-credit'].includes(base.attemptStatus);
   const fingerprint=[institution,base.sourceInstitution,code,title,credits,grade,term].join('|').toUpperCase();const n=(occurrence.get(fingerprint)||0)+1;occurrence.set(fingerprint,n);base.recordKey=fingerprint+'|'+n;
   rows.push(base);
  }
  return rows;
 }
 function repairLegacyCourse(row){
  if(!row.imported||row.parserVersion>=4)return row;
  // Older builds left attempted/earned units in the title and put grade points in credits.
  // Repair only when the recorded columns and grade-point arithmetic agree.
  const normalized=String(row.title||'').replace(/(\d+\.\d{3})(?=\d+\.\d)/g,'$1 ');
  const match=normalized.match(/^(.*?)\s*(\d+\.\d{3})\s+(\d+\.\d{3})\s*$/);if(!match)return row;
  const scale={'A+':4,'A':4,'A-':3.7,'B+':3.3,'B':3,'B-':2.7,'C+':2.3,'C':2,'C-':1.7,'D+':1.3,'D':1,'D-':.7,'F':0};
  const g=String(row.grade||'').toUpperCase(),value=g in scale?scale[g]:Number(g),earned=+match[3];
  if(!Number.isFinite(value)||earned<=0||earned>20||earned>+match[2]||Math.abs(earned*value-Number(row.credits))>.06)return row;
  return {...row,title:match[1].trim(),credits:earned,gradePoints:Number(row.credits),parserVersion:4,creditCorrection:'Recovered earned-credit column from original extracted title'};
 }
 function key(c){if(generic(c.code)&&c.recordKey)return c.recordKey;return [c.code,c.institution,c.term||'',c.grade||'',c.credits,c.title].map(v=>String(v).trim().toUpperCase()).join('|')}
 function merge(existing,rows){const known=new Set(existing.map(key)),added=[],duplicates=[];for(const row of rows){if(known.has(key(row))){duplicates.push(row);continue}known.add(key(row));added.push(row)}return{added,duplicates}}
 function review(rows){const excluded=[],candidates=[];for(const row of rows){const reason=status(row);if(['failed','superseded','no-credit'].includes(reason))excluded.push({...row,attemptStatus:reason,include:false});else candidates.push(row);}const chosen=[],superseded=[];
  for(const row of candidates){if(generic(row.code)){chosen.push(row);continue}const idx=chosen.findIndex(c=>normalizeCode(c.code)===normalizeCode(row.code)&&c.institution===row.institution);if(idx<0){chosen.push(row);continue}const before=chosen[idx];const termValue=r=>{const y=String(r.term).match(/(?:19|20)\d{2}/);const t=String(r.term).toLowerCase();return +(y?.[0]||0)*10+(/autumn|fall/.test(t)?4:/summer/.test(t)?3:/spring/.test(t)?2:/winter/.test(t)?1:0)};const keep=before.completed&&!row.completed?before:row.completed&&!before.completed?row:termValue(row)>=termValue(before)?row:before;const other=keep===row?before:row;chosen[idx]=keep;superseded.push({...other,attemptStatus:'superseded',include:false});}
  return {active:chosen,excluded:[...excluded,...superseded]};
 }
 function pdfText(items){const rows=[];for(const item of items){if(!item.str?.trim())continue;const y=item.transform[5];let row=rows.find(r=>Math.abs(r.y-y)<=2);if(!row){row={y,items:[]};rows.push(row)}row.items.push(item);}return rows.sort((a,b)=>b.y-a.y).map(r=>r.items.sort((a,b)=>a.transform[4]-b.transform[4]).map(i=>i.str).join(' ')).join('\n');}
 return{parse,key,merge,status,review,pdfText,generic,detectInstitution,detectHeaderInstitution,repairLegacyCourse};
})();
if(typeof module!=='undefined')module.exports=TranscriptImport;
