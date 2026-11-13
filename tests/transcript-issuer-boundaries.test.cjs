const assert=require('node:assert/strict'),T=require('../dist/transcripts');
const cases=[['SEATTLE CENTRAL COLLEGE','Bellevue College','Seattle Central College'],['BELLEVUE COLLEGE','University of Washington Bothell','Bellevue College'],['UNIVERSITY OF WASHINGTON SEATTLE','University of Washington Bothell','University of Washington Seattle'],['UNIVERSITY OF WASHINGTON BOTHELL','University of Washington Seattle','University of Washington Bothell']];
for(const[issuer,source,expected]of cases){const text=issuer+'\nTRANSFER CREDIT FROM '+source+'\nAUTUMN 2025\nOCEAN 101 Oceanography 5.0 3.8';assert.equal(T.detectInstitution(text),expected);const rows=T.parse(text);assert.equal(rows.length,1);assert.equal(rows[0].institution,expected);assert.equal(rows[0].sourceInstitution,source);assert.equal(rows[0].creditType,'transfer');assert.equal(+rows[0].credits,5)}
for(const campus of ['Bothell','Seattle','Tacoma'])assert.equal(T.detectInstitution('UNIVERSITY OF WASHINGTON\n'+campus+' CAMPUS\nTRANSFER CREDIT FROM BELLEVUE COLLEGE'),'University of Washington '+campus);
assert.equal(T.detectInstitution('UNIVERSITY OF WASHINGTON\nSeattle, WA 98195\nTRANSFER CREDIT FROM BELLEVUE COLLEGE'),'University of Washington Seattle');
assert.equal(T.detectInstitution('UNIVERSITY OF WASHINGTON\nUW Bothell\nTRANSFER CREDIT FROM BELLEVUE COLLEGE'),'University of Washington Bothell');
assert.equal(T.detectInstitution('TRANSFER CREDIT\nBELLEVUE COLLEGE\nOCEAN 101 Oceanography 5.0 3.8'),'');
assert.equal(T.detectInstitution('TRANSFER CREDIT FROM BELLEVUE COLLEGE'),'Bellevue College');
console.log('Document issuer precedes transfer references across Seattle Central/Bellevue/UW campuses; split UW headings and single-line source recognition preserved.');
