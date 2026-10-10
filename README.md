# Organizador documental FONCEP

Aplicación web independiente, con OCR en español dentro del navegador. No requiere cuenta ni servicios de ChatGPT. Los documentos se procesan en el dispositivo del usuario.

## Uso

1. Usar el catálogo incluido de 19 tipos documentales de Cuotas Partes. Solo cargar un Excel/CSV si se necesita reemplazarlo.
2. Cargar los PDF de los expedientes.
3. Analizar el texto y utilizar OCR para las páginas escaneadas.
4. Revisar cada propuesta: llave, tipo documental y páginas. Aprobar las que sean correctas.
5. Descargar el ZIP con carpetas por llave, documentos renombrados e informes de trazabilidad.

La clasificación automática genera propuestas que requieren revisión. Los archivos originales no se modifican. Los PDF derivados no conservan la validez de firmas digitales del original.

## Publicación

En Settings → Pages seleccionar **GitHub Actions**. El flujo Publicar FONCEP genera y publica la aplicación con las bibliotecas y el modelo OCR incluidos. No hay dependencias de ChatGPT durante el uso ni en las publicaciones posteriores a la migración inicial.

Dirección prevista: https://deivy199130-arch.github.io/foncep-organizador/

## Desarrollo

Node.js 22. Ejecutar `npm ci --ignore-scripts`, `npm run build` y `npm test`. Servir la carpeta dist mediante HTTP. No subir expedientes ni datos personales a este repositorio público.

Las verificaciones de distribución comprueban la sintaxis y los recursos necesarios. La versión original contó con pruebas sintéticas de organización y análisis; falta validar la clasificación con expedientes reales y comprobarla en el celular del usuario.

## Catálogo incluido

Fuente: Tipos_Documentales_Cuotas_Partes_Escalamiento.xlsx, versión del 9 de octubre de 2026. `dist/catalog.js` conserva sus 19 códigos y descripciones. Se activa al abrir y puede restaurarse desde la interfaz. Los nombres de salida usan la descripción; los códigos se muestran en la lista y en CatalogoUsado.csv. Solo se publica esta lista; no el Excel original ni expedientes.
