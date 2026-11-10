/* Local transcript extraction. Document text is data, never executable instructions. */
const TranscriptImport=(()=>{
 const failed=new Set(['F','E','W','HW','AW','NW','NP','NC','NS','U','FAIL']);
 const unfinished=new Set(['','I','IP','N','X','RD']);
 const normalizeCode=s=>String(s||'').trim().toUpperCase().replace(/\s*&\s*/,'& ').replace(/\s+/g,' ');
 const generic=code=>/\d[Xx]{1,3}\b/.test(code);
 function status(row){const grade=String(row.grade||'').trim().toUpperCase();if(row.repeatExcluded||/\/R\b/i.test(grade+' '+(row.raw||'')+' '+(row.title||'')))return 'superseded';if(failed.has(grade)||(grade!==''&&Number.isFinite(+grade)&&+grade===0))return 'failed';if(row.noEarnedCredit)return 'no-credit';if(row.attemptStatus==='superseded')return 'superseded';if(unfinished.has(grade))return row.completed?'completed':'in-progress';return 'completed';}
 function schoolCompact(text){return String(text||'').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g,'').replace(/1/g,'l').replace(/0/g,'o')}
 function bellevuePosition(compact){return compact.search(/(?:bellevue|bellevve|belevue|beilevue|bellevuc|bellevne|believue|bellewe)(?:community)?(?:college|coliege|coilege|colleqe|colle6e|colle9e)/)}
 const schoolAliases=[['Seattle Central College',['seattlecentralcollege','seattlecentralcommunitycollege','seattlecentralcommcoll','seattlecentralcc']],['North Seattle College',['northseattlecollege','northseattlecommunitycollege','northseattlecc']],['South Seattle College',['southseattlecollege','southseattlecommunitycollege','southseattlecc']],['Bellevue College',['bellevuecollege','bellevuecommunitycollege','bellevuecc']]];
 function aliasInstitution(text){const compact=schoolCompact(text);return schoolAliases.find(([,aliases])=>aliases.some(alias=>compact.includes(alias)))?.[0]||''}
 function knownInstitution(name,context={}){return ['Bellevue College','University of Washington','University of Washington Seattle','University of Washington Bothell','University of Washington Tacoma',...schoolAliases.map(x=>x[0]),...(context.schools||[])].includes(name)}
 function coursePrefix(line){return /^([A-Z]{1,8}(?:\s+[A-Z]{1,8}){0,2}\s*&?)\s*(\d{2,4}[A-Z]?|\d[X]{1,3})(?:\s|$)/i.test(line)&&! /^(?:FALL|AUTUMN|WINTER|SPRING|SUMMER|ATTENDED|TOTAL|PAGE|GPA)\b/i.test(line)}
 function preparedLines(text){const lines=String(text||'').replace(/\r/g,'').split('\n').map(x=>x.trim()),out=[];for(let i=0;i<lines.length;i++){let line=lines[i];if(coursePrefix(line)){for(let n=0;n<3&&i+1<lines.length;n++){const next=lines[i+1];if(!next){i++;continue}if(coursePrefix(next)||/^(?:FALL|AUTUMN|WINTER|SPRING|SUMMER|TOTAL|CUM|TRANSFER|DETAIL|ATTENDED|UNIVERSITY|PAGE|INSTITUTION|COLUMN BREAK)\b/i.test(next)||detectHeaderInstitution(next))break;const ends=/\s(?:[0-4]\.\d+|[A-F][+-]?|CR|P|S|W|IP|I|NC|NS|NP|\d+\.\d{1,3})$/i.test(line);if(ends&&line.split(/\s+/).length>3)break;line+=' '+next;i++}}out.push(line)}return out}
 function numericTail(rest,header){const m=rest.match(/^(.*?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)$/);if(!m)return null;const [a,b,c]=m.slice(2).map(Number);if(a<=0||a>30)return null;if(b<=4&&Math.abs(a*b-c)<.06)return{title:m[1],credits:a,grade:m[3],gradePoints:c,method:'credit-grade-points arithmetic'};if(c<=4&&Math.abs(a*c-b)<.06)return{title:m[1],credits:a,grade:m[4],gradePoints:b,method:'credit-points-grade arithmetic'};if(/attempt|taken|earned|passed/i.test(header)&&b<=a&&c<=4)return{title:m[1],credits:b,grade:m[4],method:'attempted/earned/grade header'};return null}
 function detectInstitution(text,context={}){
  const compact=schoolCompact(text),bcPosition=bellevuePosition(compact),uwPosition=compact.search(/universityofwashington|uwbothell|uwseattle|uwtacoma/);
  // The issuer's heading comes before transfer-school references. A generic UW
  // header must not become Bellevue merely because its transfer table names Bellevue.
  if(uwPosition>=0&&(bcPosition<0||uwPosition<bcPosition)){
   if(/universityofwashingtonbothell|bothellcampus|uwbothell|premajorbothell/.test(compact)||/\(bothell\)/i.test(text))return 'University of Washington Bothell';
   if(/universityofwashingtontacoma|tacomacampus|uwtacoma|premajortacoma/.test(compact)||/\(tacoma\)/i.test(text))return 'University of Washington Tacoma';
   if(/universityofwashingtonseattle|seattlecampus|uwseattle/.test(compact)||/Seattle[,\s]+(?:WA|Washington)\s+98195/i.test(text))return 'University of Washington Seattle';
   return 'University of Washington';
  }
  if(bcPosition>=0)return 'Bellevue College';
  const alias=aliasInstitution(text);if(alias)return alias;
  const matches=(context.schools||[]).filter(x=>x!=='Other Washington institution'&&compact.includes(schoolCompact(x)));
  if(matches.length===1)return matches[0];const candidate=String(text||'').split(/\r?\n/).slice(0,12).map(x=>x.trim()).find(x=>x.length>=8&&x.length<=100&&!/\d|transcript|course|grade|credit|student|admission/i.test(x)&&(/^(?:University|College|Institute) of [A-Za-z .’'&-]+$/.test(x)||/^[A-Za-z .’'&-]+ (?:University|College|Institute of Technology)$/.test(x)));return candidate||'';
 }
 function detectHeaderInstitution(text,context={}){const compact=schoolCompact(text),transfer=compact.search(/transfer(?:red)?credit|credittransferred/),bc=bellevuePosition(compact),uw=compact.search(/universityofwashington|uwbothell|uwseattle|uwtacoma/);if(transfer>=0&&bc>transfer&&(uw<0||uw>transfer))return '';return detectInstitution(text,context)}
 function parse(text,context={}){
  const rows=[],lines=preparedLines(text);let creditHeader='';
  const detected=detectInstitution(text,context);
  let host=context.institution||detected,term='',sourceInstitution='',inTransfer=false,attended='',transferEnded=false;const uw=host.startsWith('University of Washington');

  const occurrence=new Map();
  for(let line of lines){line=line.replace(/[|\t]/g,' ').replace(/\s+/g,' ').trim();if(!line)continue;if(/^COLUMN BREAK$/.test(line)){term='';sourceInstitution='';inTransfer=false;creditHeader='';continue}if(/(?:credits?|units?|hours?).*(?:grade|earned|points)|(?:grade|earned).*(?:credits?|units?|hours?)/i.test(line)&&!coursePrefix(line)){creditHeader=line;continue}
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
   let earnedCredits,gradePoints,attemptedCredits;
   const numericColumns=rest.match(/^(.*?)\s+(\d+\.\d{1,3})\s+(\d+\.\d{1,3})\s+(\d+\.\d{1,3})\s+(\d+\.\d{1,3})$/);
   const numericLast=numericColumns&&+numericColumns[5]<=4&&Math.abs(+numericColumns[3]*+numericColumns[5]-+numericColumns[4])<.06;
   const numericBefore=numericColumns&&+numericColumns[4]<=4&&Math.abs(+numericColumns[3]*+numericColumns[4]-+numericColumns[5])<.06;

   const tail=numericTail(rest,creditHeader);
   if(tail&&!(numericColumns&&(numericLast||numericBefore))){title=tail.title.trim();credits=String(tail.credits);earnedCredits=+credits;grade=tail.grade;gradePoints=tail.gradePoints;}
   else if(numericColumns&&(numericLast||numericBefore)){title=numericColumns[1].trim();credits=String(+numericColumns[3]);earnedCredits=+credits;attemptedCredits=+numericColumns[2];grade=numericLast?numericColumns[5]:numericColumns[4];gradePoints=+(numericLast?numericColumns[4]:numericColumns[5]);if(+credits>20)credits='';}
   else if(pointsBefore||pointsAfter||earnedAndGrade){const m=pointsBefore||pointsAfter||earnedAndGrade;title=m[1].trim();const attempted=+m[2],earned=+m[3];attemptedCredits=attempted;grade=(pointsBefore?m[5]:m[4]).toUpperCase();earnedCredits=earned;gradePoints=pointsBefore?+m[4]:pointsAfter?+m[5]:undefined;credits=earned===0&&unfinished.has(grade)?String(attempted):String(earned);if(+credits>20)credits='';}
   else if(pair&&/grade.*(?:credit|unit|hour)/i.test(creditHeader)&&Number(pair[2])<=4&&Number(pair[3])>0){title=pair[1].trim();grade=pair[2];credits=pair[3];}
   else if(pair){title=pair[1].trim();credits=+pair[2]<=20?String(+pair[2]):'';grade=pair[3].toUpperCase();}
   else if(gradeFirst){title=gradeFirst[1].trim();grade=gradeFirst[2].toUpperCase();credits=+gradeFirst[3]<=20?String(+gradeFirst[3]):'';}
   else {const single=rest.match(new RegExp('^(.*?)(?:^|\\s)('+gradePattern+')$','i'));if(single){title=single[1].trim();grade=single[2].toUpperCase();}else title=rest;}
   // UW's failed/replaced transfer rows omit earned credits, leaving only the grade.
   const noEarnedCredit=(earnedCredits===0&&!unfinished.has(grade))||credits===''&&(repeatExcluded||failed.has(grade)||(grade!==''&&+grade===0));if(noEarnedCredit)credits='0';
   if(!title||title==='R')title=generic(code)?'Transfer elective credit':'Course title not listed';
   const institution=host||context.institution||'';
   const base={code,title,credits,grade,term,institution,sourceInstitution:inTransfer?sourceInstitution:'',attemptedCredits,creditType:inTransfer?'transfer':'institutional',earnedCredits,gradePoints,repeatExcluded,noEarnedCredit,source:context.file||'',raw:line};
   base.attemptStatus=status(base);base.completed=base.attemptStatus==='completed';base.include=!['failed','superseded','no-credit'].includes(base.attemptStatus);
   const fingerprint=[institution,base.sourceInstitution,code,title,credits,grade,term].join('|').toUpperCase();const n=(occurrence.get(fingerprint)||0)+1;occurrence.set(fingerprint,n);base.recordKey=fingerprint+'|'+n;
   rows.push(base);
  }
  return rows;
 }
 function diagnostics(text,rows,context={}){const raw=String(text||''),units=/\bsemester(?:[ -]+(?:credit|hour|unit))?\b/i.test(raw)?'Semester':/\bquarter(?:[ -]+(?:credit|hour|unit))?\b/i.test(raw)||/University of Washington|Bellevue|Seattle Central|Cascadia|Shoreline/i.test(context.institution||detectInstitution(raw,context))?'Quarter':'Unknown';const candidates=preparedLines(raw).filter(coursePrefix),warnings=[];if(candidates.length>rows.length)warnings.push((candidates.length-rows.length)+' course-like line(s) were not imported. Review the extracted text.');if(raw.split(/\r?\n/).some(l=>coursePrefix(l)&&(l.match(/\b[A-Z]{2,8}\s*&?\s*\d{2,4}\b/g)||[]).length>1))warnings.push('Multiple course codes share an extracted line. Check column separation and the extracted text for missed courses.');const missing=rows.filter(r=>!r.credits||!Number.isFinite(Number(r.credits))).length;if(missing)warnings.push(missing+' row(s) have unresolved credit columns. Enter credits from the original document.');if(units==='Semester')warnings.push('Semester credits detected. The quarter-based planner must not treat them as quarter credits.');if(units==='Unknown')warnings.push('Credit system not identified. Confirm quarter credits before saving.');if(!context.institution&&!detectInstitution(raw,context))warnings.push('Issuing school not identified. Enter its name.');const printedTotals=raw.split(/\r?\n/).filter(l=>/total|cumulative/i.test(l)&&/earned|credit|unit|hour/i.test(l)).slice(0,16);const earned=printedTotals.map(l=>l.match(/total\s+(?:credits?\s+earned|earned\s+(?:credits?|units?|hours?))\s*[:=]?\s*(\d+(?:\.\d+)?)/i)).filter(Boolean);if(earned.length===1&&!/transfer/i.test(raw)){const parsed=rows.filter(r=>r.completed).reduce((n,r)=>n+(Number(r.credits)||0),0);if(Math.abs(Number(earned[0][1])-parsed)>.01)warnings.push('Printed earned total ('+earned[0][1]+') differs from extracted completed credits ('+parsed.toFixed(2)+'). Review missing rows, exclusions and the total’s scope.');}return{units,courseLikeLines:candidates.length,parsedRows:rows.length,missingCredits:missing,parsedCredits:rows.reduce((n,r)=>n+(Number(r.credits)||0),0),warnings,printedTotals}}
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
 function pdfText(items){const rows=[];for(const item of items){if(!item.str?.trim())continue;const y=item.transform[5];let row=rows.find(r=>Math.abs(r.y-y)<=2);if(!row){row={y,items:[]};rows.push(row)}row.items.push(item)}rows.sort((a,b)=>b.y-a.y);for(const r of rows)r.items.sort((a,b)=>a.transform[4]-b.transform[4]);const doubles=rows.map(r=>{const candidates=r.items.filter((item,i)=>coursePrefix(r.items.slice(i,i+3).map(x=>x.str).join(' '))),anchors=[];for(const item of candidates)if(!anchors.length||item.transform[4]-anchors.at(-1).transform[4]>180)anchors.push(item);return{r,anchors}}).filter(x=>x.anchors.length>=2&&x.anchors[1].transform[4]-x.anchors[0].transform[4]>180);if(doubles.length>=2&&Math.max(...doubles.map(x=>x.anchors[1].transform[4]))-Math.min(...doubles.map(x=>x.anchors[1].transform[4]))<35){const split=doubles.map(x=>x.anchors[1].transform[4]).sort((a,b)=>a-b)[Math.floor(doubles.length/2)]-8,top=Math.max(...doubles.map(x=>x.r.y))+50,head=[],left=[],right=[];for(const r of rows){if(r.y>top){head.push(r.items.map(i=>i.str).join(' '));continue}const a=r.items.filter(i=>i.transform[4]<split).map(i=>i.str).join(' '),b=r.items.filter(i=>i.transform[4]>=split).map(i=>i.str).join(' ');if(a)left.push(a);if(b)right.push(b)}return[...head,...left,'COLUMN BREAK',...right].join('\n')}return rows.map(r=>r.items.map(i=>i.str).join(' ')).join('\n')}

 return{parse,key,merge,status,review,pdfText,generic,detectInstitution,detectHeaderInstitution,repairLegacyCourse,diagnostics,preparedLines,knownInstitution};
})();
if(typeof module!=='undefined')module.exports=TranscriptImport;
