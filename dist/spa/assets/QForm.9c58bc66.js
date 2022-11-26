import{n as j,s as le,i as Ve,y as H,z as we,A as Be,m as de,B as Ee,l as y,t as S,C as $e,r as I,D as ie,E as X,F as ze,G as Oe,H as Pe,I as K,J as Fe,K as Me,L as ve,M as Te,N as G,Q as ge,x as Ie,v as J,T as je,O as Ne,P as De,R as Ue}from"./index.739bfe03.js";import{u as Le,a as Ze}from"./use-dark.370d7de2.js";import{b as Ke}from"./format.ea608733.js";function He({validate:e,resetValidation:t,requiresQForm:a}){const i=Ve(we,!1);if(i!==!1){const{props:s,proxy:g}=H();Object.assign(g,{validate:e,resetValidation:t}),j(()=>s.disable,m=>{m===!0?(typeof t=="function"&&t(),i.unbindComponent(g)):i.bindComponent(g)}),s.disable!==!0&&i.bindComponent(g),le(()=>{s.disable!==!0&&i.unbindComponent(g)})}else a===!0&&console.error("Parent QForm not found on useFormChild()!")}const he=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,be=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,pe=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,ee=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,te=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,ye={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>he.test(e),hexaColor:e=>be.test(e),hexOrHexaColor:e=>pe.test(e),rgbColor:e=>ee.test(e),rgbaColor:e=>te.test(e),rgbOrRgbaColor:e=>ee.test(e)||te.test(e),hexOrRgbColor:e=>he.test(e)||ee.test(e),hexaOrRgbaColor:e=>be.test(e)||te.test(e),anyColor:e=>pe.test(e)||ee.test(e)||te.test(e)};"Boolean Number String Function Array Date RegExp Object".split(" ").forEach(e=>{e.toLowerCase()});const Qe={...Be,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,thickness:{type:Number,default:.2,validator:e=>e>=0&&e<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean},se=50,qe=2*se,Re=qe*Math.PI,We=Math.round(Re*1e3)/1e3;de({name:"QCircularProgress",props:{...Qe,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(e,{slots:t}){const{proxy:{$q:a}}=H(),i=Ee(e),s=y(()=>{const _=(a.lang.rtl===!0?-1:1)*e.angle;return{transform:e.reverse!==(a.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-_}deg)`:`rotate3d(0, 0, 1, ${_-90}deg)`}}),g=y(()=>e.instantFeedback!==!0&&e.indeterminate!==!0?{transition:`stroke-dashoffset ${e.animationSpeed}ms ease 0s, stroke ${e.animationSpeed}ms ease`}:""),m=y(()=>qe/(1-e.thickness/2)),M=y(()=>`${m.value/2} ${m.value/2} ${m.value} ${m.value}`),C=y(()=>Ke(e.value,e.min,e.max)),k=y(()=>Re*(1-(C.value-e.min)/(e.max-e.min))),E=y(()=>e.thickness/2*m.value);function R({thickness:_,offset:h,color:w,cls:P}){return S("circle",{class:"q-circular-progress__"+P+(w!==void 0?` text-${w}`:""),style:g.value,fill:"transparent",stroke:"currentColor","stroke-width":_,"stroke-dasharray":We,"stroke-dashoffset":h,cx:m.value,cy:m.value,r:se})}return()=>{const _=[];e.centerColor!==void 0&&e.centerColor!=="transparent"&&_.push(S("circle",{class:`q-circular-progress__center text-${e.centerColor}`,fill:"currentColor",r:se-E.value/2,cx:m.value,cy:m.value})),e.trackColor!==void 0&&e.trackColor!=="transparent"&&_.push(R({cls:"track",thickness:E.value,offset:0,color:e.trackColor})),_.push(R({cls:"circle",thickness:E.value,offset:k.value,color:e.color}));const h=[S("svg",{class:"q-circular-progress__svg",style:s.value,viewBox:M.value,"aria-hidden":"true"},_)];return e.showValue===!0&&h.push(S("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:e.fontSize}},t.default!==void 0?t.default():[S("div",C.value)])),S("div",{class:`q-circular-progress q-circular-progress--${e.indeterminate===!0?"in":""}determinate`,style:i.value,role:"progressbar","aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.indeterminate===!0?void 0:C.value},$e(t.internal,h))}}});function W(e,t,a,i){const s=[];return e.forEach(g=>{i(g)===!0?s.push(g):t.push({failedPropValidation:a,file:g})}),s}function ne(e){e&&e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),X(e)}const Ft={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},Je=["rejected"];function Mt({editable:e,dnd:t,getFileInput:a,addFilesToQueue:i}){const{props:s,emit:g,proxy:m}=H(),M=I(null),C=y(()=>s.accept!==void 0?s.accept.split(",").map(d=>(d=d.trim(),d==="*"?"*/":(d.endsWith("/*")&&(d=d.slice(0,d.length-1)),d.toUpperCase()))):null),k=y(()=>parseInt(s.maxFiles,10)),E=y(()=>parseInt(s.maxTotalSize,10));function R(d){if(e.value)if(d!==Object(d)&&(d={target:null}),d.target!==null&&d.target.matches('input[type="file"]')===!0)d.clientX===0&&d.clientY===0&&ie(d);else{const x=a();x&&x!==d.target&&x.click(d)}}function _(d){e.value&&d&&i(null,d)}function h(d,x,A,F){let n=Array.from(x||d.target.files);const o=[],f=()=>{o.length>0&&g("rejected",o)};if(s.accept!==void 0&&C.value.indexOf("*/")===-1&&(n=W(n,o,"accept",l=>C.value.some(c=>l.type.toUpperCase().startsWith(c)||l.name.toUpperCase().endsWith(c))),n.length===0))return f();if(s.maxFileSize!==void 0){const l=parseInt(s.maxFileSize,10);if(n=W(n,o,"max-file-size",c=>c.size<=l),n.length===0)return f()}s.multiple!==!0&&n.length>0&&(n=[n[0]]),n.forEach(l=>{l.__key=l.webkitRelativePath+l.lastModified+l.name+l.size});const v=A.map(l=>l.__key);if(n=W(n,o,"duplicate",l=>v.includes(l.__key)===!1),n.length===0)return f();if(s.maxTotalSize!==void 0){let l=F===!0?A.reduce((c,q)=>c+q.size,0):0;if(n=W(n,o,"max-total-size",c=>(l+=c.size,l<=E.value)),n.length===0)return f()}if(typeof s.filter=="function"){const l=s.filter(n);n=W(n,o,"filter",c=>l.includes(c))}if(s.maxFiles!==void 0){let l=F===!0?A.length:0;if(n=W(n,o,"max-files",()=>(l++,l<=k.value)),n.length===0)return f()}if(f(),n.length>0)return n}function w(d){ne(d),t.value!==!0&&(t.value=!0)}function P(d){X(d),d.relatedTarget!==M.value&&(t.value=!1)}function V(d){ne(d);const x=d.dataTransfer.files;x.length>0&&i(null,x),t.value=!1}function z(d){if(t.value===!0)return S("div",{ref:M,class:`q-${d}__dnd absolute-full`,onDragenter:ne,onDragover:ne,onDragleave:P,onDrop:V})}return Object.assign(m,{pickFiles:R,addFiles:_}),{pickFiles:R,addFiles:_,onDragover:w,processFiles:h,getDndNode:z,maxFilesNumber:k,maxTotalSizeNumber:E}}const Xe=[...Je,"start","finish","added","removed"],Ye=()=>!0;function Ge(e){const t={};return e.forEach(a=>{t[a]=Ye}),t}Ge(Xe);let ue,re=0;const T=new Array(256);for(let e=0;e<256;e++)T[e]=(e+256).toString(16).substring(1);const et=(()=>{const e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{const a=new Uint8Array(t);return e.getRandomValues(a),a}}return t=>{const a=[];for(let i=t;i>0;i--)a.push(Math.floor(Math.random()*256));return a}})(),xe=4096;function tt(){(ue===void 0||re+16>xe)&&(re=0,ue=et(xe));const e=Array.prototype.slice.call(ue,re,re+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,T[e[0]]+T[e[1]]+T[e[2]]+T[e[3]]+"-"+T[e[4]]+T[e[5]]+"-"+T[e[6]]+T[e[7]]+"-"+T[e[8]]+T[e[9]]+"-"+T[e[10]]+T[e[11]]+T[e[12]]+T[e[13]]+T[e[14]]+T[e[15]]}const nt=[!0,!1,"ondemand"],rt={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],validator:e=>nt.includes(e)}};function ot(e,t){const{props:a,proxy:i}=H(),s=I(!1),g=I(null),m=I(null);He({validate:w,resetValidation:h});let M=0,C;const k=y(()=>a.rules!==void 0&&a.rules!==null&&a.rules.length>0),E=y(()=>a.disable!==!0&&k.value===!0),R=y(()=>a.error===!0||s.value===!0),_=y(()=>typeof a.errorMessage=="string"&&a.errorMessage.length>0?a.errorMessage:g.value);j(()=>a.modelValue,()=>{P()}),j(()=>a.reactiveRules,z=>{z===!0?C===void 0&&(C=j(()=>a.rules,()=>{P(!0)})):C!==void 0&&(C(),C=void 0)},{immediate:!0}),j(e,z=>{z===!0?m.value===null&&(m.value=!1):m.value===!1&&(m.value=!0,E.value===!0&&a.lazyRules!=="ondemand"&&t.value===!1&&V())});function h(){M++,t.value=!1,m.value=null,s.value=!1,g.value=null,V.cancel()}function w(z=a.modelValue){if(E.value!==!0)return!0;const d=++M;t.value!==!0&&a.lazyRules!==!0&&(m.value=!0);const x=(F,n)=>{s.value!==F&&(s.value=F);const o=n||void 0;g.value!==o&&(g.value=o),t.value=!1},A=[];for(let F=0;F<a.rules.length;F++){const n=a.rules[F];let o;if(typeof n=="function"?o=n(z):typeof n=="string"&&ye[n]!==void 0&&(o=ye[n](z)),o===!1||typeof o=="string")return x(!0,o),!1;o!==!0&&o!==void 0&&A.push(o)}return A.length===0?(x(!1),!0):(t.value=!0,Promise.all(A).then(F=>{if(F===void 0||Array.isArray(F)===!1||F.length===0)return d===M&&x(!1),!0;const n=F.find(o=>o===!1||typeof o=="string");return d===M&&x(n!==void 0,n),n===void 0},F=>(d===M&&(console.error(F),x(!0)),!1)))}function P(z){E.value===!0&&a.lazyRules!=="ondemand"&&(m.value===!0||a.lazyRules!==!0&&z!==!0)&&V()}const V=ze(w,0);return le(()=>{C!==void 0&&C(),V.cancel()}),Object.assign(i,{resetValidation:h,validate:w}),Oe(i,"hasError",()=>R.value),{isDirtyModel:m,hasRules:k,hasError:R,errorMessage:_,validate:w,resetValidation:h}}const ke=/^on[A-Z]/;function lt(e,t){const a={listeners:I({}),attributes:I({})};function i(){const s={},g={};for(const m in e)m!=="class"&&m!=="style"&&ke.test(m)===!1&&(s[m]=e[m]);for(const m in t.props)ke.test(m)===!0&&(g[m]=t.props[m]);a.attributes.value=s,a.listeners.value=g}return Pe(i),i(),a}let Q=[],Y=[];function _e(e){Y=Y.filter(t=>t!==e)}function qt(e){_e(e),Y.push(e)}function Rt(e){_e(e),Y.length===0&&Q.length>0&&(Q[Q.length-1](),Q=[])}function me(e){Y.length===0?e():Q.push(e)}function at(e){Q=Q.filter(t=>t!==e)}function ce(e){return e===void 0?`f_${tt()}`:e}function fe(e){return e!=null&&(""+e).length>0}const ut={...Le,...rt,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String,maxlength:[Number,String]},it=["update:modelValue","clear","focus","blur","popup-show","popup-hide"];function st(){const{props:e,attrs:t,proxy:a,vnode:i}=H();return{isDark:Ze(e,a.$q),editable:y(()=>e.disable!==!0&&e.readonly!==!0),innerLoading:I(!1),focused:I(!1),hasPopupOpen:!1,splitAttrs:lt(t,i),targetUid:I(ce(e.for)),rootRef:I(null),targetRef:I(null),controlRef:I(null)}}function ct(e){const{props:t,emit:a,slots:i,attrs:s,proxy:g}=H(),{$q:m}=g;let M;e.hasValue===void 0&&(e.hasValue=y(()=>fe(t.modelValue))),e.emitValue===void 0&&(e.emitValue=r=>{a("update:modelValue",r)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:v,onFocusout:l}),Object.assign(e,{clearValue:c,onControlFocusin:v,onControlFocusout:l,focus:o}),e.computedCounter===void 0&&(e.computedCounter=y(()=>{if(t.counter!==!1){const r=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,b=t.maxlength!==void 0?t.maxlength:t.maxValues;return r+(b!==void 0?" / "+b:"")}}));const{isDirtyModel:C,hasRules:k,hasError:E,errorMessage:R,resetValidation:_}=ot(e.focused,e.innerLoading),h=e.floatingLabel!==void 0?y(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):y(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),w=y(()=>t.bottomSlots===!0||t.hint!==void 0||k.value===!0||t.counter===!0||t.error!==null),P=y(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),V=y(()=>`q-field row no-wrap items-start q-field--${P.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(h.value===!0?" q-field--float":"")+(d.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(E.value===!0?" q-field--error":"")+(E.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&w.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),z=y(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(E.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length>0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),d=y(()=>t.labelSlot===!0||t.label!==void 0),x=y(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&E.value!==!0?` text-${t.labelColor}`:"")),A=y(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:h.value,modelValue:t.modelValue,emitValue:e.emitValue})),F=y(()=>{const r={for:e.targetUid.value};return t.disable===!0?r["aria-disabled"]="true":t.readonly===!0&&(r["aria-readonly"]="true"),r});j(()=>t.for,r=>{e.targetUid.value=ce(r)});function n(){const r=document.activeElement;let b=e.targetRef!==void 0&&e.targetRef.value;b&&(r===null||r.id!==e.targetUid.value)&&(b.hasAttribute("tabindex")===!0||(b=b.querySelector("[tabindex]")),b&&b!==r&&b.focus({preventScroll:!0}))}function o(){me(n)}function f(){at(n);const r=document.activeElement;r!==null&&e.rootRef.value.contains(r)&&r.blur()}function v(r){clearTimeout(M),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,a("focus",r))}function l(r,b){clearTimeout(M),M=setTimeout(()=>{document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1)||(e.focused.value===!0&&(e.focused.value=!1,a("blur",r)),b!==void 0&&b())})}function c(r){X(r),m.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),a("update:modelValue",null),a("clear",t.modelValue),K(()=>{_(),m.platform.is.mobile!==!0&&(C.value=!1)})}function q(){const r=[];return i.prepend!==void 0&&r.push(S("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:G},i.prepend())),r.push(S("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},p())),E.value===!0&&t.noErrorIcon===!1&&r.push(N("error",[S(ge,{name:m.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?r.push(N("inner-loading-append",i.loading!==void 0?i.loading():[S(Ie,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&r.push(N("inner-clearable-append",[S(ge,{class:"q-field__focusable-action",tag:"button",name:t.clearIcon||m.iconSet.field.clear,tabindex:0,type:"button","aria-hidden":null,role:null,onClick:c})])),i.append!==void 0&&r.push(S("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:G},i.append())),e.getInnerAppend!==void 0&&r.push(N("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&r.push(e.getControlChild()),r}function p(){const r=[];return t.prefix!==void 0&&t.prefix!==null&&r.push(S("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&r.push(e.getShadowControl()),e.getControl!==void 0?r.push(e.getControl()):i.rawControl!==void 0?r.push(i.rawControl()):i.control!==void 0&&r.push(S("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},i.control(A.value))),d.value===!0&&r.push(S("div",{class:x.value},J(i.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&r.push(S("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),r.concat(J(i.default))}function $(){let r,b;E.value===!0?R.value!==null?(r=[S("div",{role:"alert"},R.value)],b=`q--slot-error-${R.value}`):(r=J(i.error),b="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(r=[S("div",t.hint)],b=`q--slot-hint-${t.hint}`):(r=J(i.hint),b="q--slot-hint"));const u=t.counter===!0||i.counter!==void 0;if(t.hideBottomSpace===!0&&u===!1&&r===void 0)return;const B=S("div",{key:b,class:"q-field__messages col"},r);return S("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale")},[t.hideBottomSpace===!0?B:S(je,{name:"q-transition--field-message"},()=>B),u===!0?S("div",{class:"q-field__counter"},i.counter!==void 0?i.counter():e.computedCounter.value):null])}function N(r,b){return b===null?null:S("div",{key:r,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},b)}Object.assign(g,{focus:o,blur:f});let U=!1;return Fe(()=>{U=!0}),Me(()=>{U===!0&&t.autofocus===!0&&g.focus()}),ve(()=>{Te.value===!0&&t.for===void 0&&(e.targetUid.value=ce()),t.autofocus===!0&&g.focus()}),le(()=>{clearTimeout(M)}),function(){const b=e.getControl===void 0&&i.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...F.value}:F.value;return S("label",{ref:e.rootRef,class:[V.value,s.class],style:s.style,...b},[i.before!==void 0?S("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:G},i.before()):null,S("div",{class:"q-field__inner relative-position col self-stretch"},[S("div",{ref:e.controlRef,class:z.value,tabindex:-1,...e.controlEvents},q()),w.value===!0?$():null]),i.after!==void 0?S("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:G},i.after()):null])}}const Ce={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},oe={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},Ae=Object.keys(oe);Ae.forEach(e=>{oe[e].regex=new RegExp(oe[e].pattern)});const ft=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+Ae.join("")+"])|(.)","g"),Se=/[.*+?^${}()|[\]\\]/g,O=String.fromCharCode(1),dt={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function vt(e,t,a,i){let s,g,m,M;const C=I(null),k=I(R());function E(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}j(()=>e.type+e.autogrow,h),j(()=>e.mask,n=>{if(n!==void 0)w(k.value,!0);else{const o=A(k.value);h(),e.modelValue!==o&&t("update:modelValue",o)}}),j(()=>e.fillMask+e.reverseFillMask,()=>{C.value===!0&&w(k.value,!0)}),j(()=>e.unmaskedValue,()=>{C.value===!0&&w(k.value)});function R(){if(h(),C.value===!0){const n=d(A(e.modelValue));return e.fillMask!==!1?F(n):n}return e.modelValue}function _(n){if(n<s.length)return s.slice(-n);let o="",f=s;const v=f.indexOf(O);if(v>-1){for(let l=n-f.length;l>0;l--)o+=O;f=f.slice(0,v)+o+f.slice(v)}return f}function h(){if(C.value=e.mask!==void 0&&e.mask.length>0&&E(),C.value===!1){M=void 0,s="",g="";return}const n=Ce[e.mask]===void 0?e.mask:Ce[e.mask],o=typeof e.fillMask=="string"&&e.fillMask.length>0?e.fillMask.slice(0,1):"_",f=o.replace(Se,"\\$&"),v=[],l=[],c=[];let q=e.reverseFillMask===!0,p="",$="";n.replace(ft,(b,u,B,L,Z)=>{if(L!==void 0){const D=oe[L];c.push(D),$=D.negate,q===!0&&(l.push("(?:"+$+"+)?("+D.pattern+"+)?(?:"+$+"+)?("+D.pattern+"+)?"),q=!1),l.push("(?:"+$+"+)?("+D.pattern+")?")}else if(B!==void 0)p="\\"+(B==="\\"?"":B),c.push(B),v.push("([^"+p+"]+)?"+p+"?");else{const D=u!==void 0?u:Z;p=D==="\\"?"\\\\\\\\":D.replace(Se,"\\\\$&"),c.push(D),v.push("([^"+p+"]+)?"+p+"?")}});const N=new RegExp("^"+v.join("")+"("+(p===""?".":"[^"+p+"]")+"+)?$"),U=l.length-1,r=l.map((b,u)=>u===0&&e.reverseFillMask===!0?new RegExp("^"+f+"*"+b):u===U?new RegExp("^"+b+"("+($===""?".":$)+"+)?"+(e.reverseFillMask===!0?"$":f+"*")):new RegExp("^"+b));m=c,M=b=>{const u=N.exec(b);u!==null&&(b=u.slice(1).join(""));const B=[],L=r.length;for(let Z=0,D=b;Z<L;Z++){const ae=r[Z].exec(D);if(ae===null)break;D=D.slice(ae.shift().length),B.push(...ae)}return B.length>0?B.join(""):b},s=c.map(b=>typeof b=="string"?b:O).join(""),g=s.split(O).join(o)}function w(n,o,f){const v=i.value,l=v.selectionEnd,c=v.value.length-l,q=A(n);o===!0&&h();const p=d(q),$=e.fillMask!==!1?F(p):p,N=k.value!==$;v.value!==$&&(v.value=$),N===!0&&(k.value=$),document.activeElement===v&&K(()=>{if($===g){const r=e.reverseFillMask===!0?g.length:0;v.setSelectionRange(r,r,"forward");return}if(f==="insertFromPaste"&&e.reverseFillMask!==!0){const r=l-1;V.right(v,r,r);return}if(["deleteContentBackward","deleteContentForward"].indexOf(f)>-1){const r=e.reverseFillMask===!0?l===0?$.length>p.length?1:0:Math.max(0,$.length-($===g?0:Math.min(p.length,c)+1))+1:l;v.setSelectionRange(r,r,"forward");return}if(e.reverseFillMask===!0)if(N===!0){const r=Math.max(0,$.length-($===g?0:Math.min(p.length,c+1)));r===1&&l===1?v.setSelectionRange(r,r,"forward"):V.rightReverse(v,r,r)}else{const r=$.length-c;v.setSelectionRange(r,r,"backward")}else if(N===!0){const r=Math.max(0,s.indexOf(O),Math.min(p.length,l)-1);V.right(v,r,r)}else{const r=l-1;V.right(v,r,r)}});const U=e.unmaskedValue===!0?A($):$;String(e.modelValue)!==U&&a(U,!0)}function P(n,o,f){const v=d(A(n.value));o=Math.max(0,s.indexOf(O),Math.min(v.length,o)),n.setSelectionRange(o,f,"forward")}const V={left(n,o,f,v){const l=s.slice(o-1).indexOf(O)===-1;let c=Math.max(0,o-1);for(;c>=0;c--)if(s[c]===O){o=c,l===!0&&o++;break}if(c<0&&s[o]!==void 0&&s[o]!==O)return V.right(n,0,0);o>=0&&n.setSelectionRange(o,v===!0?f:o,"backward")},right(n,o,f,v){const l=n.value.length;let c=Math.min(l,f+1);for(;c<=l;c++)if(s[c]===O){f=c;break}else s[c-1]===O&&(f=c);if(c>l&&s[f-1]!==void 0&&s[f-1]!==O)return V.left(n,l,l);n.setSelectionRange(v?o:f,f,"forward")},leftReverse(n,o,f,v){const l=_(n.value.length);let c=Math.max(0,o-1);for(;c>=0;c--)if(l[c-1]===O){o=c;break}else if(l[c]===O&&(o=c,c===0))break;if(c<0&&l[o]!==void 0&&l[o]!==O)return V.rightReverse(n,0,0);o>=0&&n.setSelectionRange(o,v===!0?f:o,"backward")},rightReverse(n,o,f,v){const l=n.value.length,c=_(l),q=c.slice(0,f+1).indexOf(O)===-1;let p=Math.min(l,f+1);for(;p<=l;p++)if(c[p-1]===O){f=p,f>0&&q===!0&&f--;break}if(p>l&&c[f-1]!==void 0&&c[f-1]!==O)return V.leftReverse(n,l,l);n.setSelectionRange(v===!0?o:f,f,"forward")}};function z(n){if(Ne(n)===!0)return;const o=i.value,f=o.selectionStart,v=o.selectionEnd;if(n.keyCode===37||n.keyCode===39){const l=V[(n.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];n.preventDefault(),l(o,f,v,n.shiftKey)}else n.keyCode===8&&e.reverseFillMask!==!0&&f===v?V.left(o,f,v,!0):n.keyCode===46&&e.reverseFillMask===!0&&f===v&&V.rightReverse(o,f,v,!0)}function d(n){if(n==null||n==="")return"";if(e.reverseFillMask===!0)return x(n);const o=m;let f=0,v="";for(let l=0;l<o.length;l++){const c=n[f],q=o[l];if(typeof q=="string")v+=q,c===q&&f++;else if(c!==void 0&&q.regex.test(c))v+=q.transform!==void 0?q.transform(c):c,f++;else return v}return v}function x(n){const o=m,f=s.indexOf(O);let v=n.length-1,l="";for(let c=o.length-1;c>=0&&v>-1;c--){const q=o[c];let p=n[v];if(typeof q=="string")l=q+l,p===q&&v--;else if(p!==void 0&&q.regex.test(p))do l=(q.transform!==void 0?q.transform(p):p)+l,v--,p=n[v];while(f===c&&p!==void 0&&q.regex.test(p));else return l}return l}function A(n){return typeof n!="string"||M===void 0?typeof n=="number"?M(""+n):n:M(n)}function F(n){return g.length-n.length<=0?n:e.reverseFillMask===!0&&n.length>0?g.slice(0,-n.length)+n:n+g.slice(n.length)}return{innerValue:k,hasMask:C,moveCursorForPaste:P,updateMaskValue:w,onMaskedKeydown:z}}const mt={name:String};function _t(e){return y(()=>({type:"hidden",name:e.name,value:e.modelValue}))}function At(e={}){return(t,a,i)=>{t[a](S("input",{class:"hidden"+(i||""),...e.value}))}}function gt(e){return y(()=>e.name||e.for)}function ht(e,t){function a(){const i=e.modelValue;try{const s="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(i)===i&&("length"in i?Array.from(i):[i]).forEach(g=>{s.items.add(g)}),{files:s.files}}catch{return{files:void 0}}}return t===!0?y(()=>{if(e.type==="file")return a()}):y(a)}const bt=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,pt=/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,yt=/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,xt=/[a-z0-9_ -]$/i;function kt(e){return function(a){if(a.type==="compositionend"||a.type==="change"){if(a.target.qComposing!==!0)return;a.target.qComposing=!1,e(a)}else a.type==="compositionupdate"&&a.target.qComposing!==!0&&typeof a.data=="string"&&(De.is.firefox===!0?xt.test(a.data)===!1:bt.test(a.data)===!0||pt.test(a.data)===!0||yt.test(a.data)===!0)===!0&&(a.target.qComposing=!0)}}var Vt=de({name:"QInput",inheritAttrs:!1,props:{...ut,...dt,...mt,modelValue:{required:!1},shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...it,"paste","change"],setup(e,{emit:t,attrs:a}){const i={};let s=NaN,g,m,M,C;const k=I(null),E=gt(e),{innerValue:R,hasMask:_,moveCursorForPaste:h,updateMaskValue:w,onMaskedKeydown:P}=vt(e,t,q,k),V=ht(e,!0),z=y(()=>fe(R.value)),d=kt(c),x=st(),A=y(()=>e.type==="textarea"||e.autogrow===!0),F=y(()=>A.value===!0||["text","search","url","tel","password"].includes(e.type)),n=y(()=>{const u={...x.splitAttrs.listeners.value,onInput:c,onPaste:l,onChange:$,onBlur:N,onFocus:ie};return u.onCompositionstart=u.onCompositionupdate=u.onCompositionend=d,_.value===!0&&(u.onKeydown=P),e.autogrow===!0&&(u.onAnimationend=p),u}),o=y(()=>{const u={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:E.value,...x.splitAttrs.attributes.value,id:x.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return A.value===!1&&(u.type=e.type),e.autogrow===!0&&(u.rows=1),u});j(()=>e.type,()=>{k.value&&(k.value.value=e.modelValue)}),j(()=>e.modelValue,u=>{if(_.value===!0){if(m===!0&&(m=!1,String(u)===s))return;w(u)}else R.value!==u&&(R.value=u,e.type==="number"&&i.hasOwnProperty("value")===!0&&(g===!0?g=!1:delete i.value));e.autogrow===!0&&K(p)}),j(()=>e.autogrow,u=>{u===!0?K(p):k.value!==null&&a.rows>0&&(k.value.style.height="auto")}),j(()=>e.dense,()=>{e.autogrow===!0&&K(p)});function f(){me(()=>{const u=document.activeElement;k.value!==null&&k.value!==u&&(u===null||u.id!==x.targetUid.value)&&k.value.focus({preventScroll:!0})})}function v(){k.value!==null&&k.value.select()}function l(u){if(_.value===!0&&e.reverseFillMask!==!0){const B=u.target;h(B,B.selectionStart,B.selectionEnd)}t("paste",u)}function c(u){if(!u||!u.target)return;if(e.type==="file"){t("update:modelValue",u.target.files);return}const B=u.target.value;if(u.target.qComposing===!0){i.value=B;return}if(_.value===!0)w(B,!1,u.inputType);else if(q(B),F.value===!0&&u.target===document.activeElement){const{selectionStart:L,selectionEnd:Z}=u.target;L!==void 0&&Z!==void 0&&K(()=>{u.target===document.activeElement&&B.indexOf(u.target.value)===0&&u.target.setSelectionRange(L,Z)})}e.autogrow===!0&&p()}function q(u,B){C=()=>{e.type!=="number"&&i.hasOwnProperty("value")===!0&&delete i.value,e.modelValue!==u&&s!==u&&(s=u,B===!0&&(m=!0),t("update:modelValue",u),K(()=>{s===u&&(s=NaN)})),C=void 0},e.type==="number"&&(g=!0,i.value=u),e.debounce!==void 0?(clearTimeout(M),i.value=u,M=setTimeout(C,e.debounce)):C()}function p(){const u=k.value;if(u!==null){const B=u.parentNode.style,{overflow:L}=u.style;B.marginBottom=u.scrollHeight-1+"px",u.style.height="1px",u.style.overflow="hidden",u.style.height=u.scrollHeight+"px",u.style.overflow=L,B.marginBottom=""}}function $(u){d(u),clearTimeout(M),C!==void 0&&C(),t("change",u.target.value)}function N(u){u!==void 0&&ie(u),clearTimeout(M),C!==void 0&&C(),g=!1,m=!1,delete i.value,e.type!=="file"&&setTimeout(()=>{k.value!==null&&(k.value.value=R.value!==void 0?R.value:"")})}function U(){return i.hasOwnProperty("value")===!0?i.value:R.value!==void 0?R.value:""}le(()=>{N()}),ve(()=>{e.autogrow===!0&&p()}),Object.assign(x,{innerValue:R,fieldClass:y(()=>`q-${A.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:y(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length>0),inputRef:k,emitValue:q,hasValue:z,floatingLabel:y(()=>z.value===!0||fe(e.displayValue)),getControl:()=>S(A.value===!0?"textarea":"input",{ref:k,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...o.value,...n.value,...e.type!=="file"?{value:U()}:V.value}),getShadowControl:()=>S("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(A.value===!0?"":" text-no-wrap")},[S("span",{class:"invisible"},U()),S("span",e.shadowText)])});const r=ct(x),b=H();return Object.assign(b.proxy,{focus:f,select:v,getNativeElement:()=>k.value}),r}}),Bt=de({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validation-success","validation-error"],setup(e,{slots:t,emit:a}){const i=H(),s=I(null);let g=0;const m=[];function M(h){const w=[],P=typeof h=="boolean"?h:e.noErrorFocus!==!0,V=++g,z=(d,x)=>{a("validation-"+(d===!0?"success":"error"),x)};for(let d=0;d<m.length;d++){const x=m[d],A=x.validate();if(typeof A.then=="function")w.push(A.then(F=>({valid:F,comp:x}),F=>({valid:!1,comp:x,err:F})));else if(A!==!0){if(e.greedy===!1)return z(!1,x),P===!0&&typeof x.focus=="function"&&x.focus(),Promise.resolve(!1);w.push({valid:!1,comp:x})}}return w.length===0?(z(!0),Promise.resolve(!0)):Promise.all(w).then(d=>{const x=d.filter(o=>o.valid!==!0);if(x.length===0)return V===g&&z(!0),!0;const{valid:A,comp:F,err:n}=x[0];return V===g&&(n!==void 0&&console.error(n),z(!1,F),P===!0&&A!==!0&&typeof F.focus=="function"&&F.focus()),!1})}function C(){g++,m.forEach(h=>{typeof h.resetValidation=="function"&&h.resetValidation()})}function k(h){h!==void 0&&X(h);const w=g+1;M().then(P=>{w===g&&P===!0&&(e.onSubmit!==void 0?a("submit",h):h!==void 0&&h.target!==void 0&&typeof h.target.submit=="function"&&h.target.submit())})}function E(h){h!==void 0&&X(h),a("reset"),K(()=>{C(),e.autofocus===!0&&e.noResetFocus!==!0&&R()})}function R(){me(()=>{if(s.value===null)return;const h=s.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(s.value.querySelectorAll("[tabindex]"),w=>w.tabIndex>-1);h!=null&&h.focus({preventScroll:!0})})}Ue(we,{bindComponent(h){m.push(h)},unbindComponent(h){const w=m.indexOf(h);w>-1&&m.splice(w,1)}});let _=!1;return Fe(()=>{_=!0}),Me(()=>{_===!0&&e.autofocus===!0&&R()}),ve(()=>{e.autofocus===!0&&R()}),Object.assign(i.proxy,{validate:M,resetValidation:C,submit:k,reset:E,focus:R,getValidationComponents:()=>m}),()=>S("form",{class:"q-form",ref:s,onSubmit:k,onReset:E},J(t.default))}});export{Bt as Q,Vt as a,qt as b,it as c,ct as d,st as e,me as f,mt as g,gt as h,fe as i,kt as j,At as k,_t as l,Ft as m,Je as n,Mt as o,ht as p,Rt as r,ut as u};
