const assert=require('node:assert/strict'),H=require('../dist/atelier-3d.js');
assert.equal(H.mode(null),'path');assert.equal(H.mode('compass'),'compass');
assert.equal(H.direction({profile:{major:'Physics'}}),null);
const s={answers:Array(12).fill('a'),results:[{}],profile:{major:'Physics',primaryProgramId:'uw-physics'}};
const d=H.direction(s);assert.equal(d.angle,H.direction(s).angle);assert.ok(d.angle>=0&&d.angle<Math.PI*2);assert.equal(H.direction({...s,profile:{}}),null);
let angle=0,velocity=0;for(let i=0;i<2000;i++)({angle,velocity}=H.step(angle,velocity,d.angle,i/60,1/60));assert.ok(Math.abs(Math.atan2(Math.sin(angle-d.angle),Math.cos(angle-d.angle)))<.001);
let search=0;for(let i=0;i<3600;i++)search=H.step(search,.1,null,i/60,1/60).angle;assert.ok(search>6);console.log('Hero mode, saved-state gate, deterministic direction and motion tests passed.');
