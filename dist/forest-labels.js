/* Map native, readable answer text onto the exact projected 3D board quadrilateral. */
var ForestLabels=(()=>{
 function matrix(points,width,height){const[[x0,y0],[x1,y1],[x2,y2],[x3,y3]]=points,dx1=x1-x2,dx2=x3-x2,sx=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,sy=y0-y1+y2-y3,det=dx1*dy2-dx2*dy1;if(!Number.isFinite(det)||Math.abs(det)<1e-8||width<=0||height<=0)return null;const g=(sx*dy2-dx2*sy)/det,h=(dx1*sy-sx*dy1)/det,a=x1-x0+g*x1,b=x3-x0+h*x3,d=y1-y0+g*y1,e=y3-y0+h*y3;return[a/width,d/width,0,g/width,b/height,e/height,0,h/height,0,0,1,0,x0,y0,0,1]}
 function transform(m,x,y){const w=m[3]*x+m[7]*y+m[15];return[(m[0]*x+m[4]*y+m[12])/w,(m[1]*x+m[5]*y+m[13])/w]}
 function style(element,points,width,height){const m=matrix(points,width,height);if(!m){element.style.visibility='hidden';return}element.style.left='0px';element.style.top='0px';element.style.width=width+'px';element.style.height=height+'px';element.style.transformOrigin='0 0';element.style.transform='matrix3d('+m.join(',')+')';element.style.visibility='visible';element.style.setProperty('--board-height',height+'px')}
 return{matrix,transform,style};
})();if(typeof module!=='undefined')module.exports=ForestLabels;
