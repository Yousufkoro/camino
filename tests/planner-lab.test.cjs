const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');const c={console};vm.createContext(c);for(const f of ['engine','academic-pathway'])vm.runInContext(fs.readFileSync('dist/'+f+'.js','utf8'),c);
for(const mode of ['Flexible','Balanced','Accelerated'])for(const summer of [true,false]){
 const p=vm.runInContext(`AcademicPathway.plan({courses:[],profile:{target:AcademicPathway.UWB,major:'Electrical Engineering',summer:${summer}}},'${mode}')`,c);
 assert.equal(p.blocked.length,0);for(const codes of [['CSS 142','CSS 143'],['B PHYS 121','B PHYS 122','B PHYS 123']]){const seq=codes.map(code=>p.courses.find(c=>c.code===code));seq.forEach(x=>assert.equal(x.institution,'Bellevue College'));seq.slice(1).forEach((x,i)=>assert.equal(x.term,seq[i].term+1));}for(const x of p.courses)assert.ok(x.explanation.includes('credit cap'));
}
// Standalone API never accepts identity headers or exposes stored student data.
(async()=>{const {default:worker}=await import('../worker/standalone.mjs');const req=new Request('https://camino.example/api/me',{headers:{'oai-authenticated-user-id':'forged'}});const me=await (await worker.fetch(req,{})).json();assert.equal(me.standalone,true);assert.equal(me.user,null);assert.equal((await worker.fetch(new Request('https://camino.example/api/workspace'),{})).status,404);console.log('Sequences consecutive across all workloads/summer options; explanations and standalone identity isolation passed.');})();
// Each class keeps its own school selection, including a visibly unverified mixed CS route.
const independent=vm.runInContext(`AcademicPathway.plan({courses:[],courseProviders:{'CSS 142':AcademicPathway.UWB,'CSS 143':AcademicPathway.BC,'B PHYS 122':AcademicPathway.UWB},profile:{target:AcademicPathway.UWB,major:'Electrical Engineering'}},'Balanced')`,c);
assert.equal(independent.courses.find(x=>x.code==='CSS 142').institution,'University of Washington Bothell');
assert.equal(independent.courses.find(x=>x.code==='CSS 143').institution,'Bellevue College');
assert.equal(independent.courses.find(x=>x.code==='B PHYS 122').institution,'University of Washington Bothell');
assert.ok(independent.warnings.some(x=>x.includes('mixed-school')));
const picker={dataset:{provider:'CSS 142'},value:'University of Washington Bothell'};
const ui={state:{courseProviders:{'CSS 143':'Bellevue College'}},document:{querySelector:()=>null,querySelectorAll:s=>s==='[data-provider]'?[picker]:[]},window:{scrollY:0,scrollTo(){}},save(){},render(){},toast(){},bindPlannerLab(){}};
vm.createContext(ui);vm.runInContext(fs.readFileSync('dist/plan-flow.js','utf8'),ui);vm.runInContext('bindPlanFlow()',ui);picker.onchange();assert.equal(ui.state.courseProviders['CSS 143'],'Bellevue College');assert.equal(ui.state.courseProviders['CSS 142'],'University of Washington Bothell');
console.log('Independent school overrides persist; UI does not silently swap another programming class.');
