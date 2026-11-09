const assert=require('node:assert/strict'),T=require('../dist/transcripts');
for(const name of ['B E L L E V U E C O L L E G E','BE11EVUE C0LLEGE','BELLEVUE COLIEGE','BELLEVVE COLLEGE'])assert.equal(T.detectInstitution(name),'Bellevue College',name);
assert.equal(T.detectInstitution('UNIVERSITY OF WASHINGTON BOTHELL\nTRANSFER CREDIT FROM BELLEVUE COLLEGE'),'University of Washington Bothell');
assert.equal(T.detectInstitution('UNIVERSITY OF WASHINGTON\nTRANSFER CREDIT\nBELLEVUE COLLEGE'),'University of Washington');
assert.equal(T.detectHeaderInstitution('TRANSFER CREDIT FROM BELLEVUE COLLEGE'),'');
assert.equal(T.detectInstitution('An address in Bellevue, WA'),'');
const mixed=T.parse(`UNIVERSITY OF WASHINGTON BOTHELL
TRANSFER CREDIT FROM BELLEVUE COLLEGE
FALL 2024
MATH 124 Calculus I 5.0 3.8
WINTER 2025
MATH 125 Calculus II 5.0 3.7
UW BOTHELL COURSEWORK
AUTUMN 2026
B CORE 107 Discovery Core 5.0 3.9
B EDUC 210 Education 5.0 3.6`);
assert.equal(mixed.length,4);assert.ok(mixed.every(r=>r.institution==='University of Washington Bothell'));assert.ok(mixed.slice(0,2).every(r=>r.creditType==='transfer'&&r.sourceInstitution==='Bellevue College'));assert.ok(mixed.slice(2).every(r=>r.creditType==='institutional'&&!r.sourceInstitution));
const section=T.parse(`University of Washington Bothell
DETAILS OF TRANSFER CREDITS
Be11evue C0llege
ATTENDED 2023-2025
ENGL 131 Composition 5.0 3.8
AUTUMN 2026 B PRE 2
B CORE 107 Discovery 5.0 3.7`);assert.equal(section[0].sourceInstitution,'Bellevue College');assert.equal(section[1].creditType,'institutional');assert.equal(section[1].sourceInstitution,'');
const a={...mixed[0],term:'Autumn 2026'},b={...a,creditType:'institutional',sourceInstitution:''};assert.equal(T.review([a,b]).active.length,2,'Origin must survive before degree-credit reconciliation');assert.notEqual(T.key(a),T.key(b));
console.log('Bellevue OCR name variants, generic UW issuer protection, colon-free transfer sections, source-term boundaries and transfer/native provenance passed.');
