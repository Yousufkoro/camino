/* Local transcript extraction. Document text is data, never executable instructions. */
const TranscriptImport=(()=>{
 const failed=new Set(['F','E','W','HW','AW','NW','NP','NC','NS','U','FAIL']);
 const unfinished=new Set(['','I','IP','N','X','RD']);
 const normalizeCode=s=>String(s||'').trim().toUpperCase().replace(/\s*&\s*/,'& ').replace(/\s+/g,' ');
 const generic=code=>/\d[Xx]{1,3}\b/.test(code);
 function status(row){const grade=String(row.grade||'').trim().toUpperCase();if(row.repeatExcluded||/\/R\b/i.test(grade+' '+(row.raw||'')+' '+(row.title||'')))return 'superseded';if(failed.has(grade)||(grade!==''&&Number.isFinite(+grade)&&+grade===0))return 'failed';if(row.noEarnedCredit)return 'no-credit';if(row.attemptStatus==='superseded')return 'superseded';if(unfinished.has(grade))return row.completed?'completed':'in-progress';return 'completed';}
 function schoolCompact(text){return String(text||'').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g,'').replace(/1/g,'l').replace(/0/g,'o')}
 function bellevuePosition(compact){return compact.search(/(?:bellevue|bellevve|belevue|beilevue|bellevuc|bellevne|believue|bellewe)(?:community)?(?:college|coliege|coilege|colleqe|colle6e|colle9e)/)}
 function detectInstitution(text,context={}){
  const compact=schoolCompact(text),bcPosition=bellevuePosition(compact),uwPosition=compact.search(/universityofwashington|uwbothell|uwseattle|uwtacoma/);
  // The issuer's heading comes before transfer-school references. A generic UW
  // header must not become Bellevue merely because its transfer table names Bellevue.
  if(uwPosition>=0&&(bcPosition<0||uwPosition<bcPosition)){
   if(/universityofwashingtonbothell|bothellcampus|uwbothell|premajorbothell/.test(compact)||/\(bothell\)/i.test(text))return 'University of Washington Bothell';
   if(/universityofwashingtontacoma|tacomacampus|uwtacoma|premajortacoma/.test(compact)||/\(tacoma\)/i.test(text))return 'University of Washington Tacoma';
   if(/universityofwashingtonseattle|seattlecampus|uwseattle/.test(compact))return 'University of Washington Seattle';
   return 'University of Washington';
  }
  if(bcPosition>=0)return 'Bellevue College';
  const matches=(context.schools||[]).filter(x=>x!=='Other Washington institution'&&compact.includes(schoolCompact(x)));
  return matches.length===1?matches[0]:'';
 }
 function detectHeaderInstitution(text,context={}){const compact=schoolCompact(text),transfer=compact.search(/transfer(?:red)?credit|credittransferred/),bc=bellevuePosition(compact),uw=compact.search(/universityofwashington|uwbothell|uwseattle|uwtacoma/);if(transfer>=0&&bc>transfer&&(uw<0||uw>transfer))return '';return detectInstitution(text,context)}
 function parse(text,context={}){
  const rows=[],lines=text.replace(/\r/g,'').split('\n');
  const detected=detectInstitution(text,context);
  let host=context.institution||detected,term='',sourceInstitution='',inTransfer=false,attended='',transferEnded=false;const uw=host.startsWith('University of Washington');

  const occurrence=new Map();
  for(let line of lines){line=line.replace(/[|\t]/g,' ').replace(/\s+/g,' ').trim();if(!line)continue;
   if(/^(?:(?:DETAILS?|SUMMARY)\s+OF\s+)?TRANSFER(?:RED)?\s+(?:CREDITS?|COURSES?|COURSEWORK)\b|^CREDITS?\s+(?:TRANSFERRED|ACCEPTED)\s+FROM\b/i.test(line)){inTransfer=true;transferEnded=false;const named=detectInstitution(line,context);sourceInstitution=named&&named!==host?named:'';attended='';term='Transfer credit (term not listed)';continue;}
   if(/^TOTAL\s+TRANSFER|^END\s+OF\s+TRANSFER/i.test(line)){transferEnded=true;continue;}
   if(/^(?:UNIVERSITY OF WASHINGTON(?: BOTHELL| SEATTLE| TACOMA)?|UW(?: BOTHELL| SEATTLE| TACOMA)?|UWB|BOTHELL)\s+(?:COURSEWORK|COURSES|ACADEMIC RECORD|CREDIT RECORD)|^(?:INSTITUTION(?:AL)?|RESIDENT)\s+(?:CREDIT|COURSE)|^ACADEMIC RECORD\b/i.test(line)){inTransfer=false;sourceInstitution='';continue;}
   if(/^TOTAL |^CUM(?:ULATIVE| )|^QTR |^UW (?:CREDITS|GRADED|GRADE)|^NUMBER OF |^END OF |^PAGE\b/i.test(line))continue;
   const heading=line.match(/^(?:(Fall|Autumn|Winter|Spring|Summer)\s+(20\d{2}|19\d{2})|(20\d{2}|19\d{2})\s+(Fall|Autumn|Winter|Spring|Summer))\b/i);
   if(heading){term=heading[0];const nativeProgram=/\b[ BST]\s+[A-Z]{2,8}\s+[1-6]\s*$/i.test(line.slice(heading[0].length));if(!inTransfer||transferEnded||nativeProgram){inTransfer=false;sourceInstitution='';}continue;}
   const campus=line.match(/^(Bothell|Seattle|Tacoma)\s*CAMPUS\b/i);if(campus&&uw){host='University of Washington '+campus[1][0].toUpperCase()+campus[1].slice(1).toLowerCase();inTransfer=false;sourceInstitution='';continue;}
   if(uw&&/^[BST]\s+[A-Z]{2,8}(?:\s+[A-Z]{2,8})?\s+[1-6]$/i.test(line)){inTransfer=false;sourceInstitution='';continue;}
   const school=detectHeaderInstitution(line,context);
   if(school&&inTransfer&&school!==host)sourceInstitution=school;
   else if(school&&!uw&&!inTransfer&&!context.institution)host=school;
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
 function key(c){if(generic(c.code)&&c.recordKey)return c.recordKey;return [c.code,c.institution,c.term||'',c.grade||'',c.credits,c.title,c.creditType||'institutional',c.sourceInstitution||''].map(v=>String(v).trim().toUpperCase()).join('|')}
 function merge(existing,rows){const known=new Set(existing.map(key)),added=[],duplicates=[];for(const row of rows){if(known.has(key(row))){duplicates.push(row);continue}known.add(key(row));added.push(row)}return{added,duplicates}}
 function review(rows){const excluded=[],candidates=[];for(const row of rows){const reason=status(row);if(['failed','superseded','no-credit'].includes(reason))excluded.push({...row,attemptStatus:reason,include:false});else candidates.push(row);}const chosen=[],superseded=[];
  for(const row of candidates){if(generic(row.code)){chosen.push(row);continue}const idx=chosen.findIndex(c=>normalizeCode(c.code)===normalizeCode(row.code)&&c.institution===row.institution&&(c.creditType||'institutional')===(row.creditType||'institutional')&&(c.sourceInstitution||'')===(row.sourceInstitution||''));if(idx<0){chosen.push(row);continue}const before=chosen[idx];const termValue=r=>{const y=String(r.term).match(/(?:19|20)\d{2}/);const t=String(r.term).toLowerCase();return +(y?.[0]||0)*10+(/autumn|fall/.test(t)?4:/summer/.test(t)?3:/spring/.test(t)?2:/winter/.test(t)?1:0)};const keep=before.completed&&!row.completed?before:row.completed&&!before.completed?row:termValue(row)>=termValue(before)?row:before;const other=keep===row?before:row;chosen[idx]=keep;superseded.push({...other,attemptStatus:'superseded',include:false});}
  return {active:chosen,excluded:[...excluded,...superseded]};
 }
 function pdfText(items){const rows=[];for(const item of items){if(!item.str?.trim())continue;const y=item.transform[5];let row=rows.find(r=>Math.abs(r.y-y)<=2);if(!row){row={y,items:[]};rows.push(row)}row.items.push(item);}return rows.sort((a,b)=>b.y-a.y).map(r=>r.items.sort((a,b)=>a.transform[4]-b.transform[4]).map(i=>i.str).join(' ')).join('\n');}
 return{parse,key,merge,status,review,pdfText,generic,detectInstitution,detectHeaderInstitution,repairLegacyCourse};
})();
if(typeof module!=='undefined')module.exports=TranscriptImport;
