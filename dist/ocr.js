(function(root){
'use strict';
function cancelledError(){const e=new Error('Reconocimiento cancelado.');e.name='AbortError';return e;}
function controller(factory){let running=false,worker=null,cancelled=false,rejectCancel=null;
return {
 get busy(){return running;},
 cancel(){if(!running)return;cancelled=true;if(worker&&rejectCancel)rejectCancel(cancelledError());},
 async run(image,logger){if(running)throw Error('Ya hay una página en reconocimiento.');running=true;cancelled=false;let reject;
 const cancellation=new Promise((_,r)=>{reject=r;});cancellation.catch(()=>{});rejectCancel=reject;
 try{worker=await factory(m=>{if(!cancelled&&logger)logger(m);});if(cancelled)throw cancelledError();
 const result=await Promise.race([worker.recognize(image),cancellation]);if(cancelled)throw cancelledError();return result.data;
 }finally{rejectCancel=null;const active=worker;worker=null;if(active){try{await active.terminate();}catch{}}running=false;}
 }
};}
function suggestions(text,types){const normalized=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ');const hay=normalized(text);return types.filter(t=>{const terms=normalized(t).split(/\s+/).filter(w=>w.length>3&&!['para','parte','documento','documental','pensiones','pensionales'].includes(w));return terms.length>0&&terms.every(w=>new RegExp('\\b'+w+'\\b').test(hay));}).slice(0,5);}
const api={controller,suggestions};root.FoncepOCR=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
