/* Working writing/checklist fields stay in RAM; explicit Save controls disk persistence. */
var ReviewSession=(()=>{
 const fields=['essay','activities','prompt','limit','applicationContext','requirements'];
 let working=null,checks=null,ui=null,skipCapture=false;
 const form=()=>document.querySelector('#essay-review');
 function capture(){
  ui=null;if(skipCapture){skipCapture=false;return}
  const node=form(),list=document.querySelector('#application-review-checklist');
  if(node)working=Object.fromEntries(fields.map(k=>[k,String(node.elements.namedItem(k)?.value||'')]));
  if(list)checks=[...list.querySelectorAll('[data-application-check]')].map((box,i)=>({done:box.checked,note:String(document.querySelector('#application-note-'+i)?.value||'')}));
  const active=document.activeElement;let target;
  if(node?.contains(active)&&fields.includes(active.name))target={kind:'field',name:active.name};
  else if(list?.contains(active)){const note=active.id?.match(/^application-note-(\d+)$/);if(note)target={kind:'note',index:+note[1]};else if(active.matches('[data-application-check]'))target={kind:'check',index:[...list.querySelectorAll('[data-application-check]')].indexOf(active)}}
  if(target&&location.hash==='#application-review')ui={target,start:active.selectionStart,end:active.selectionEnd,direction:active.selectionDirection,top:active.scrollTop,left:active.scrollLeft,x:window.scrollX,y:window.scrollY};
 }
 function restore(){
  const node=form();if(!node)return false;
  if(working){for(const[k,v]of Object.entries(working))if(node.elements.namedItem(k))node.elements.namedItem(k).value=v;node.dispatchEvent(new Event('input',{bubbles:true}));node.dispatchEvent(new CustomEvent('camino:writing-restored'))}
  const list=document.querySelector('#application-review-checklist');
  if(list&&checks){[...list.querySelectorAll('[data-application-check]')].forEach((box,i)=>{if(!checks[i])return;box.checked=checks[i].done;const note=document.querySelector('#application-note-'+i);if(note)note.value=checks[i].note});list.dispatchEvent(new Event('change',{bubbles:true}))}
  if(!node.dataset.reviewSessionBound){node.dataset.reviewSessionBound='true';document.querySelector('#clear-application-draft')?.addEventListener('click',()=>{working=null;skipCapture=false})}
  if(!ui||location.hash!=='#application-review')return false;
  const t=ui.target,active=t.kind==='field'?node.elements.namedItem(t.name):t.kind==='note'?document.querySelector('#application-note-'+t.index):list?.querySelectorAll('[data-application-check]')[t.index];
  if(!active)return false;active.focus({preventScroll:true});if(typeof ui.start==='number'&&typeof active.setSelectionRange==='function')active.setSelectionRange(ui.start,ui.end,ui.direction||'none');active.scrollTop=ui.top;active.scrollLeft=ui.left;window.scrollTo(ui.x,ui.y);return true;
 }
 function clear(){working=null;checks=null;ui=null;skipCapture=true;const node=form();if(node)for(const k of fields)if(node.elements.namedItem(k))node.elements.namedItem(k).value=''}
 return{capture,restore,clear};
})();
