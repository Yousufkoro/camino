const assert=require('node:assert/strict'),C=require('../dist/program-catalog.js'),M=require('../dist/multi-degree-core.js');
assert.ok(C.programs.some(p=>p.institution==='UW Seattle'&&p.title==='Informatics'&&p.url.includes('/program/S/TheInformationSchool-')));
assert.equal(C.institutions.length,7);assert.equal(C.institutions.find(s=>s.name==='Bellevue College').coverage,'snapshot');
assert.ok(C.programs.every(p=>p.url.startsWith('https://')&&p.title.length>2));
const goals=[{id:'p',role:'primary'},{id:'b',role:'backup'}],a={institution:'Test',code:'A',units:'Quarter',credits:5},b={...a,code:'B'};
const result={courses:[{...a,term:0},{...b,term:1}],usage:[{key:M.key(a),assignments:[{goalId:'p'},{goalId:'b'}]},{key:M.key(b),assignments:[{goalId:'p'}]}]};
assert.deepEqual(M.checkpoint(result,goals),{term:1,backupPending:false});result.usage[1].assignments=[];assert.equal(M.checkpoint(result,goals),null);result.mixedUnits=true;assert.equal(M.checkpoint(result,goals),null);
console.log('Official Informatics listing, seven-school coverage disclosure, and conservative primary-only checkpoint passed.');

assert.ok(C.programs.some(p=>p.institution==='Bellevue College'&&/Associate in Arts and Sciences/i.test(p.title)));assert.ok(C.programs.some(p=>p.institution==='Washington State University'&&p.id.startsWith('wsu-catalog-')));assert.ok(C.programs.some(p=>p.institution==='Seattle Colleges'&&p.campus==='North Seattle College'));
