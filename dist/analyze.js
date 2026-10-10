(function(root){
'use strict';
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\n ]/g,' ').replace(/[ \t]+/g,' ').trim();
const rules=[
 {kind:'resolucion',title:/^(?:resolucion|resolucion\s+(?:numero|no|n))\b/m,words:['resolucion'],aliases:['reconocimiento','sustitucion','reliquidacion','reajuste']},
 {kind:'consulta',title:/^(?:consulta\b|solicitud de (?:aceptacion|consulta)|proyecto de (?:resolucion|cuota))/m,words:['consulta'],aliases:[]},
 {kind:'aceptacion',title:/^(?:aceptacion\b|respuesta a (?:la )?consulta|aceptacion de cuota)/m,words:['aceptacion'],aliases:[]},
 {kind:'objecion',title:/^(?:objecion\b|objeciones\b)/m,words:['objecion','objeciones'],aliases:[]},
 {kind:'certificacion',title:/^(?:certificacion\b|certificado\b|constancia\b)/m,words:['certificacion','certificado','constancia'],aliases:['tiempo','servicio','laboral','pago']},
 {kind:'cuenta',title:/^(?:cuenta de cobro\b|cobro de cuotas? partes?)/m,words:['cuenta','cobro'],aliases:[]},
 {kind:'liquidacion',title:/^liquidacion\b/m,words:['liquidacion'],aliases:[]},
 {kind:'titulo',title:/^(?:titulo ejecutivo\b|titulo de cobro\b)/m,words:['titulo'],aliases:[]},
 {kind:'notificacion',title:/^(?:notificacion\b|aviso de notificacion|citacion para notificacion)/m,words:['notificacion','citacion'],aliases:[]},
 {kind:'historia',title:/^(?:historia laboral\b|historial de aportes\b)/m,words:['historia','historial'],aliases:['laboral','aportes']}
];
function collect(pattern,text,map=x=>x){const result=[];for(const m of String(text||'').matchAll(pattern)){const value=map(m[1]);if(value&&!result.includes(value))result.push(value);}return result;}
function identity(text){const citizens=collect(/(?:c[eé]dula(?:\s+de\s+ciudadan[ií]a)?|\bcc\b|\bc\.\s*c\.)\s*(?:n[úu]mero|n[º°o.]|no\.?|:|#)?\s*([0-9][0-9. ]{3,18}[0-9])/gi,text,s=>s.replace(/\D/g,'' )).filter(s=>s.length>=5&&s.length<=12);const entities=collect(/(?:entidad\s+(?:concurrente|cuotapartista|deudora)|cuotapartista)\s*[:\-]\s*([^\n;]{3,100})/gi,text,s=>s.trim().replace(/[. ]+$/,''));return{citizens:[...new Set(citizens)],entities};}
function heading(page){const top=normalize(page.top||String(page.text||'').split('\n').slice(0,12).join('\n'));const text=normalize(page.text);const continuation=/(?:pagina|pag)\s+[2-9][0-9]*\s+(?:de|\/)\s*\d+|^continuacion\b|^articulo\s+\d+/m.test(top);let detected=rules.find(r=>r.title.test(top));let evidence='';if(detected)evidence=(page.top||page.text).split('\n').find(l=>detected.title.test(normalize(l)))||detected.kind;
 if(!detected){const subject=(top.match(/^asunto\s+(.+)$/m)||[])[1];if(subject){detected=rules.find(r=>r.words.some(w=>new RegExp('\\b'+w+'\\b').test(subject)));if(detected)evidence='Asunto: '+subject;}}
 let docId='';if(detected?.kind==='resolucion'){const m=top.match(/resolucion\s+(?:numero\s+|no\s+|n\s+)?(\d{1,10})(?:\s+(?:de\s+)?(\d{4}))?/);if(m)docId=m[1]+(m[2]?'/'+m[2]:'');}
 else{const m=top.match(/(?:radicado|oficio|cuenta de cobro)\s+(?:numero\s+|no\s+)?(\d{4,25})/);if(m)docId=m[1];}
 return{kind:detected?.kind||'',rule:detected,docId,evidence:evidence.slice(0,180),continuation,annex:/^anexo\b/m.test(top),normalized:text};}
function rankTypes(text,head,types){if(!head.rule)return[];const title=normalize(head.evidence),body=normalize(text);return types.map(type=>{const n=normalize(type),tokens=n.split(/\s+/).filter(w=>w.length>3&&!['documento','documental','cuotas','partes','pensionales','pension','copia','para'].includes(w));let score=0;if(n&&title.includes(n))score+=12;if(head.rule.words.some(w=>new RegExp('\\b'+w+'\\b').test(n)))score+=5;else return{type,score:0};for(const t of tokens){if(new RegExp('\\b'+t+'\\b').test(title))score+=2;else if(new RegExp('\\b'+t+'\\b').test(body))score+=0.4;else score-=1;}return{type,score};}).filter(x=>x.score>=4).sort((a,b)=>b.score-a.score);}
function propose(pages,types,defaultKey=''){if(!pages.length)throw Error('No hay páginas leídas.');const groups=[];let current=null;
 for(let i=0;i<pages.length;i++){const page=pages[i];if(page.number!==i+1)throw Error('Faltan páginas o están fuera de orden.');const h=heading(page);let cut=!current;let reason='Inicio del expediente';
 if(current&&h.kind&&!h.continuation&&!h.annex){const previous=current.head;if(!previous.kind){cut=true;reason='Nuevo encabezado reconocible';}else if(h.kind!==previous.kind){cut=true;reason='Cambio de encabezado: '+h.kind;}else if(h.docId&&previous.docId&&h.docId!==previous.docId){cut=true;reason='Número de actuación diferente';}}
 if(cut){current={from:page.number,to:page.number,head:h,pages:[],reason};groups.push(current);}current.to=page.number;current.pages.push(page);
 }
 const all=identity(pages.map(p=>p.text).join('\n'));const seqs=new Map();return groups.map(g=>{const text=g.pages.map(p=>p.text).join('\n'),id=identity(text),ranked=rankTypes(text,g.head,types);const type=ranked.length&&(!ranked[1]||ranked[0].score-ranked[1].score>=2)?ranked[0].type:'';const warnings=[];
 if(!type)warnings.push(ranked.length?'Varios tipos posibles: '+ranked.slice(0,3).map(r=>r.type).join(' / '):'Tipo no identificado en el catálogo');
 if(!g.head.kind)warnings.push('Sin encabezado reconocible: revisar si hay varios documentos');
 if(g.pages.some(p=>!String(p.text||'').trim()))warnings.push('Páginas sin texto legible');
 if(g.pages.slice(1).some(p=>{const h=heading(p);return h.kind===g.head.kind&&!h.continuation&&!h.annex&&!h.docId;}))warnings.push('Encabezados similares sin número: comprobar si requieren otro corte');
 if(id.citizens.length>1||id.entities.length>1)warnings.push('El documento contiene varias personas o entidades: comprobar a quién corresponde');
 if(g.pages.some(p=>p.source==='ocr'))warnings.push('Texto obtenido por OCR: comprobar cifras y nombres');
 let citizens=id.citizens,entities=id.entities,scope='documento';if(!citizens.length&&all.citizens.length===1){citizens=all.citizens;scope='expediente';}if(!entities.length&&all.entities.length===1){entities=all.entities;scope='expediente';}
 let key=String(defaultKey||'').trim();if(key)warnings.push('Llave indicada por ti: verificar que aplica al documento');else if(citizens.length===1&&entities.length===1){key=citizens[0]+'_'+entities[0].normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9 ]/g,' ').trim().replace(/\s+/g,'_').slice(0,85);warnings.push('Llave propuesta a partir de datos del '+scope+': confirmar formato y entidad');}else{warnings.push('Llave pendiente: '+(citizens.length>1||entities.length>1?'identidades o entidades múltiples':'faltan datos inequívocos'));}
 const slot=key+'|'+type;const n=(seqs.get(slot)||0)+1;seqs.set(slot,n);const evidence=g.head.evidence||'Sin título reconocido';return{from:g.from,to:g.to,type,key,seq:String(n).padStart(3,'0'),approved:false,generated:true,reason:g.reason,evidence,evidencePage:g.from,candidates:ranked.slice(0,3).map(r=>r.type),citizens,entities,warnings,note:[g.reason,'Página '+g.from+': '+evidence,...warnings].join(' · ')};
 });}
const api={normalize,identity,heading,rankTypes,propose};root.FoncepAnalyze=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
