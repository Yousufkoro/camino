const assert=require('node:assert/strict');
const T=require('../dist/transcripts.js'),E=require('../dist/engine.js');
// Synthetic fixture: no student names, identifiers, or uploaded documents in source.
const text=`UNIVERSITY OF WASHINGTON
UW Bothell
DETAIL OF TRANSFER CREDIT:
BELLEVUE COLLEGE, WA
ATTENDED 2023-2025
ART 1XX 0.0
CHEM 1XX 3.0 3.0
CHEM 1XX 1.0 3.3
CSE 100 R 0.0/R
CSE 100 R 5.0 3.8
MATH 1XX R 1.0/R
MATH 1XX R 5.0 3.4
POL S 202 INTRO POLITICS 5.0 CR
TOTAL CREDITS EARNED: 19.0 GPA: 3.4
AUTUMN 2025 B PRE 2
Bothell CAMPUS
B CORE 107 DISCOVERY CORE 5.0 3.7
B EDUC 210 EDUCATION AND SOCIETY 5.0 3.9
QTR ATTEMPTED: 10.0 EARNED: 10.0`;
const rows=T.parse(text,{schools:['Bellevue College','University of Washington Bothell']});
assert.equal(rows.length,10);
const r=T.review(rows);assert.equal(r.excluded.length,3);assert.equal(r.active.length,7);
assert.equal(r.active.filter(c=>c.creditType==='institutional').length,2);
assert.ok(r.active.every(c=>c.institution==='University of Washington Bothell'));
assert.ok(r.active.filter(c=>c.creditType==='transfer').every(c=>c.sourceInstitution==='Bellevue College'));
assert.equal(r.active.reduce((n,c)=>n+Number(c.credits),0),29);
const normalized=r.active.map(c=>({...c,credits:+c.credits,imported:true,prereqs:[]}));
assert.equal(E.consolidate(normalized).courses.length,7); // Distinct 1XX credit buckets survive.
assert.equal(T.merge(normalized,r.active).duplicates.length,7);
assert.ok(!rows.some(c=>c.code==='AUTUMN 2025'));
const basic=T.parse('Bellevue College\nFall 2025\nMATH& 151 Calculus I 5.0 F\nWinter 2026\nMATH& 151 Calculus I 5.0 3.8\nENGL& 101 Composition 5.0 W',{schools:['Bellevue College']});
assert.equal(T.review(basic).active.length,1);assert.equal(T.review(basic).excluded.length,2);
assert.equal(E.consolidate([{code:'A 101',title:'Test',credits:5,grade:'0.00',completed:false}]).courses.length,0);
assert.equal(E.consolidate([{code:'A 101',title:'Test',credits:5,grade:'1.3/R',completed:true}]).courses.length,0);
const positioned=[{str:'5.0 3.5',transform:[1,0,0,1,300,100]},{str:'B CORE 107 Course',transform:[1,0,0,1,20,100]},{str:'Bothell CAMPUS',transform:[1,0,0,1,20,120]}];
assert.equal(T.pdfText(positioned),'Bothell CAMPUS\nB CORE 107 Course 5.0 3.5');
console.log('Transcript regression tests passed.');
// Synthetic Bellevue/ctcLink rows: attempted units, earned units, grade points, letter grade.
const bc=T.parse(`FALL 2023
ENGL& 101 English Composition I 5.000 5.000 15.000 B
HIST& 146 US History I 5.000 5.000 16.500 B+
WINTER 2025
MATH& 141 Precalculus I 5.000 5.000 18.500 A-
POLS& 202 United States Government 5.000 5.000 15.000 B
CS 101 Technology & Computer Science 5.000 5.000 20.000 A
B E L L E V U E C O L L E G E`,{schools:['Bellevue College']});
assert.equal(bc.length,5);assert.ok(bc.every(c=>c.institution==='Bellevue College'&&c.credits==='5'));assert.equal(bc.reduce((n,c)=>n+Number(c.credits),0),25);assert.equal(bc[0].title,'English Composition I');assert.equal(bc[0].gradePoints,15);
const gradeBeforePoints=T.parse('Bellevue Community College\nFall 2024\nENGL& 101 Composition 5.000 5.000 B 15.000\nART 101 Art 5.000 0.000 F 0.000',{schools:['Bellevue College']});assert.equal(gradeBeforePoints[0].credits,'5');assert.equal(gradeBeforePoints[0].grade,'B');assert.equal(T.review(gradeBeforePoints).excluded.length,1);
assert.equal(T.detectInstitution('BELLEVUECOLLEGE'), 'Bellevue College');assert.equal(T.detectInstitution('https://www.bellevuecollege.edu/'), 'Bellevue College');assert.equal(T.detectInstitution('UNIVERSITY OF WASHINGTON\nUW Bothell\nTransfer Credit\nBellevue College'), 'University of Washington Bothell');assert.equal(T.detectInstitution('Unidentified transcript'), '');
const fallback=T.parse('Fall 2024\nENGL& 101 Composition 5.000 5.000 15.000 B',{institution:'Bellevue College'});assert.equal(fallback[0].institution,'Bellevue College');
console.log('Bellevue institution detection, document fallback, grade-point separation, and credit totals passed.');
for(const rest of [
 'Composition I 5.0005.00015.000 B',
 'Composition I 5.000 5.000 15.000B',
 'Composition I 5.000 5.000 B15.000',
 'Precalculus I 5.0005.00018.500 A-',
 'Calculus I 5.000 5.000 19.000 3.8',
 'Calculus I 5.000 5.000 3.8 19.000'
]){const r=T.parse('Bellevue College\nFall 2025\nMATH& 151 '+rest);assert.equal(r[0].credits,'5',rest);assert.ok(!r[0].title.includes('5.000'),rest);}
const old={title:'Precalculus I 5.000 5.000',credits:18.5,grade:'A-',imported:true,parserVersion:2};assert.equal(T.repairLegacyCourse(old).credits,5);assert.equal(T.repairLegacyCourse(old).title,'Precalculus I');assert.equal(T.repairLegacyCourse({...old,credits:19}).credits,19);assert.equal(T.repairLegacyCourse({...old,imported:false}).credits,18.5);
console.log('Joined numeric columns, numeric grade points, and conservative legacy-data repairs passed.');

assert.equal(T.detectHeaderInstitution('BELLEVVE COLLEGE'),'Bellevue College');assert.equal(T.detectHeaderInstitution('Bellevue Coilege'),'Bellevue College');assert.equal(T.detectHeaderInstitution('SSR_TSRPT Unofficial Transcript'),'');console.log('Header glyph variants recognized without guessing from report filenames.');
