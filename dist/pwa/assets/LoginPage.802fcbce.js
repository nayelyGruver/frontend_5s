import{Q as v}from"./format.31c77dbf.js";import{i as h,q as w,_ as y,u as I,r as o,c as Q,o as x,d as P,e as r,w as i,f as S,g as V,h as t,Q as _,j,p as q,k as A}from"./index.17364aa1.js";import{Q as O,a as f}from"./QForm.f2fb7d6b.js";import"./use-dark.814c0a61.js";function R(){return h(w)}var k="/assets/LogoGruver.d90a84ce.png";const B={setup(){const n=I(),{iniciarSesion:a}=n,c=o(""),e=o(""),l=o(""),u=o(""),s=o(!0),g=o(!1),d=o(null);R();const b=V(),m=Q({usuario:"",contrasena:""});return{usuarioObj:m,usuario:c,formulario:d,contrasena:e,usuarioRef:l,contrasenaRef:u,iniciarSesion:a,isPassword:s,dense:g,login:async()=>{try{await d.value.validate()&&(await a(m),b.push("/principal"))}catch(p){console.log(p)}},getFechaActual:()=>new Date().getFullYear()}}},F=n=>(q("data-v-4cce5afa"),n=n(),A(),n),D={class:"contenedor-login"},L=F(()=>t("h1",null,"Portal 5s",-1)),z={class:"q-pa-xl"},C={class:"contenedor-logo-gruver"},N={class:"q-mb-md"},U={class:"q-mb-md"},E={class:"btn-login"};function G(n,a,c,e,l,u){return x(),P("div",D,[L,r(O,{class:"bg-white contenedor formulario-login",onSubmit:S(e.login,["prevent","stop"]),ref:"formulario"},{default:i(()=>[t("div",z,[t("div",C,[r(v,{src:k,"spinner-color":"white",class:"q-mb-xl imagen-gruver"})]),t("div",N,[r(f,{ref:"usuarioRef",modelValue:e.usuarioObj.usuario,"onUpdate:modelValue":a[0]||(a[0]=s=>e.usuarioObj.usuario=s),label:"Ingresa el nombre de usuario",dense:e.dense,"lazy-rules":"",rules:[s=>s&&s.length>0||"Debes ingresar un nombre de usuario"]},{append:i(()=>[r(_,{name:"person"})]),_:1},8,["modelValue","dense","rules"])]),t("div",U,[r(f,{ref:"contrasenaRef",modelValue:e.usuarioObj.contrasena,"onUpdate:modelValue":a[2]||(a[2]=s=>e.usuarioObj.contrasena=s),filled:"",type:e.isPassword?"password":"text",label:"Ingresa la contrase\xF1a","lazy-rules":"",rules:[s=>s&&s.length>0||"Debes ingresar una contrase\xF1a"]},{append:i(()=>[r(_,{name:e.isPassword?"visibility_off":"visibility",class:"cursor-pointer",onClick:a[1]||(a[1]=s=>e.isPassword=!e.isPassword)},null,8,["name"])]),_:1},8,["modelValue","type","rules"])]),t("div",E,[r(j,{color:"primary",type:"submit",label:"Iniciar Sesi\xF3n"})])])]),_:1},8,["onSubmit"])])}var W=y(B,[["render",G],["__scopeId","data-v-4cce5afa"]]);export{W as default};
