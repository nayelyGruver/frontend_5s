import{api as o}from"./axios.f636257d.js";import{aq as n,r as e}from"./index.e3305bd4.js";const f=n("metricas",()=>{const i=e([""]),a=e([""]);return{obtenerCalificacionMes:async()=>{try{const{data:c}=await o.get("/metricas/calificacion/mes");i.value=[c[0].calificacionMes]}catch(c){console.log(c)}},obtenerCalificacionAnio:async()=>{try{const{data:c}=await o.get("/metricas/calificacion/anio");a.value=[c[0].calificacionAnio]}catch(c){console.log(c)}},calificacionMes:i,calificacionAnio:a}});export{f as u};