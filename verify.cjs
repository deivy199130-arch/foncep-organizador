const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
for(const name of ['app.js','core.js','ocr.js','analyze.js']) {const text=fs.readFileSync('dist/'+name,'utf8');assert(text.length>500,name+' incompleto');new vm.Script(text,{filename:name});assert(!/<html/i.test(text),name+' contiene HTML');}
const html=fs.readFileSync('dist/index.html','utf8');assert(/FONCEP/i.test(html));assert(/app\.js/.test(html));
for(const file of ['vendor/ocr/lang/spa.traineddata.gz','vendor/ocr/core/tesseract-core-lstm.wasm','vendor/pdf-lib.min.js','vendor/pdf.worker.min.js'])assert(fs.statSync('dist/'+file).size>1000,file);
console.log('Fuentes JavaScript, página y recursos OCR verificados.');
