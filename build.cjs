const fs=require('node:fs');const path=require('node:path');
const copies={
  "pdf-lib/dist/pdf-lib.min.js": "vendor/pdf-lib.min.js",
  "jszip/dist/jszip.min.js": "vendor/jszip.min.js",
  "xlsx/dist/xlsx.full.min.js": "vendor/xlsx.full.min.js",
  "pdfjs-dist/build/pdf.min.js": "vendor/pdf.min.js",
  "pdfjs-dist/build/pdf.worker.min.js": "vendor/pdf.worker.min.js",
  "tesseract.js/dist/tesseract.min.js": "vendor/ocr/tesseract.min.js",
  "tesseract.js/dist/worker.min.js": "vendor/ocr/worker.min.js",
  "tesseract.js-core/tesseract-core-lstm.wasm.js": "vendor/ocr/core/tesseract-core-lstm.wasm.js",
  "tesseract.js-core/tesseract-core-lstm.wasm": "vendor/ocr/core/tesseract-core-lstm.wasm",
  "tesseract.js-core/tesseract-core-simd-lstm.wasm.js": "vendor/ocr/core/tesseract-core-simd-lstm.wasm.js",
  "tesseract.js-core/tesseract-core-simd-lstm.wasm": "vendor/ocr/core/tesseract-core-simd-lstm.wasm",
  "@tesseract.js-data/spa/4.0.0/spa.traineddata.gz": "vendor/ocr/lang/spa.traineddata.gz",
  "pdf-lib/LICENSE.md": "vendor/licenses/pdf-lib.txt",
  "jszip/LICENSE.markdown": "vendor/licenses/jszip.txt",
  "xlsx/LICENSE": "vendor/licenses/xlsx.txt",
  "pdfjs-dist/LICENSE": "vendor/licenses/pdfjs.txt",
  "tesseract.js/LICENSE.md": "vendor/licenses/tesseract-js.txt",
  "tesseract.js-core/LICENSE": "vendor/licenses/tesseract-core.txt"
};
for(const [source,destination] of Object.entries(copies)){const file=path.join(__dirname,'dist',destination);fs.mkdirSync(path.dirname(file),{recursive:true});fs.copyFileSync(require.resolve(source),file);}
fs.writeFileSync(path.join(__dirname,'dist','.nojekyll'),'');
console.log('Aplicación completa y OCR generados en dist/.');
