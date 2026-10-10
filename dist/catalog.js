(function(root){
'use strict';
const entries=[
  {
    "code": "ACPP",
    "description": "ACEPTACIÓN CPP O CONSTANCIA DE SILENCIO ADMIN POSITIVO"
  },
  {
    "code": "CCCA",
    "description": "CC CAUSANTE"
  },
  {
    "code": "CCOB",
    "description": "CUENTA DE COBRO"
  },
  {
    "code": "CCSU",
    "description": "CC SUSTITUTO"
  },
  {
    "code": "CEDE",
    "description": "CERTIFICACION DE LA DEUDA"
  },
  {
    "code": "CERP",
    "description": "CERTIFICADO PENSIONAL"
  },
  {
    "code": "CTSS",
    "description": "CERTIFICACION DE TIEMPOS DE SERVICIO Y SALARIOS (CERTIFICADO LABORAL)"
  },
  {
    "code": "LIDE",
    "description": "LIQUIDACION DE LA DEUDA"
  },
  {
    "code": "NORE",
    "description": "NOTIFICACION EFECTIVA DE LA RESOLUCION A LA ENTIDAD CONCURRENTE"
  },
  {
    "code": "OCQP",
    "description": "OFICIO DE CONSULTA DE CUOTA PARTE"
  },
  {
    "code": "PRES",
    "description": "PROYECTO DE RESOLUCION"
  },
  {
    "code": "RCNA",
    "description": "REGISTRO CIVIL DE NACIMIENTO (FECHA DE NACIMIENTO)"
  },
  {
    "code": "RCSU",
    "description": "REGISTRO CIVIL SUSTITUTO"
  },
  {
    "code": "RDEF",
    "description": "REGISTRO DE DEFUNCION"
  },
  {
    "code": "RREC",
    "description": "RESOLUCION DE RECONOCIMIENTO"
  },
  {
    "code": "RREL",
    "description": "RESOLUCIÓN DE RELIQUIDACIÓN"
  },
  {
    "code": "RRRP",
    "description": "RESOLUCION QUE RESUELVA RECURSOS DE REPOSICION"
  },
  {
    "code": "RSPN",
    "description": "RESOLUCION DE SUSTITUCION PENSIONAL"
  },
  {
    "code": "SENJ",
    "description": "SENTENCIAS JUDICIALES"
  }
];
const api=Object.freeze({source:'Tipos_Documentales_Cuotas_Partes_Escalamiento.xlsx',sourceSHA256:'0B3FCBAC896D6CF6290FAD65D799378D05AE881446F2C53E45B5B43190F29DEF',sourceModified:'2026-10-09',entries:Object.freeze(entries.map(Object.freeze))});
root.FoncepCatalog=api;
if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
