/* Original forest life. Each system uses elapsed seconds and freezes in reduced-motion mode. */
var ForestLife=(()=>{
 function bird(time,index,enabled=true){const t=enabled?time:0,phase=index*1.9,angle=t*.095+phase;return{x:Math.sin(angle)*19,y:6.5+index*.8+Math.sin(t*.38+phase)*.45,z:-23-index*5+Math.cos(t*.08+phase)*3,flap:Math.sin(t*5.4+phase)*.65,yaw:Math.atan2(-Math.cos(angle)*1.805,Math.sin(t*.08+phase)*.24)}}
 function firefly(time,index,base,enabled=true){const t=enabled?time:0;return{x:base[0]+Math.sin(t*.36+index)*.38,y:base[1]+Math.sin(t*.71+index*1.7)*.23,z:base[2]+Math.cos(t*.28+index*.8)*.3,brightness:enabled?.4+.6*(.5+.5*Math.sin(t*1.25+index*2.1)):.7}}
 function mist(time,index,enabled=true){const t=enabled?time:0;return{x:Math.sin(t*.075+index*2)*4.5,y:.8+index*.45+Math.sin(t*.12+index)*.13,opacity:.065+(.5+.5*Math.sin(t*.12+index))*.035}}
 function leaf(time,index,base,enabled=true){const t=enabled?time:0;return{x:base[0]+Math.sin(t*.42+index)*.75,y:((base[1]-t*.18)%14+14)%14,z:base[2]+Math.cos(t*.3+index)*.45,rx:t*.6+index,ry:t*.24+index*.7,rz:Math.sin(t*.52+index)*.65}}
 return{bird,firefly,mist,leaf};
})();if(typeof module!=='undefined')module.exports=ForestLife;
