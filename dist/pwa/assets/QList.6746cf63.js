import{ad as ge,ae as J,r as L,M as se,L as V,m as x,I as Q,s as B,W as ae,t as b,y as E,af as T,ag as Z,n as _,ah as we,P as k,E as ue,ai as be,aj as ye,l as p,v as Y,i as Te,R as ce,U as de,ak as Le,c as M,al as Se,a3 as qe,am as xe,an as Ee,ao as ze,S as Pe}from"./index.17364aa1.js";import{u as fe,a as ve}from"./use-dark.814c0a61.js";const Ce=[null,document,document.body,document.scrollingElement,document.documentElement];function ke(e,t){let o=ge(t);if(o===void 0){if(e==null)return window;o=e.closest(".scroll,.scroll-y,.overflow-auto")}return Ce.includes(o)?window:o}function K(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function I(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}function me(e,t,o=0){const i=arguments[3]===void 0?performance.now():arguments[3],l=K(e);if(o<=0){l!==t&&U(e,t);return}requestAnimationFrame(s=>{const r=s-i,d=l+(t-l)/Math.max(r,o)*r;U(e,d),d!==t&&me(e,t,o-r,s)})}function he(e,t,o=0){const i=arguments[3]===void 0?performance.now():arguments[3],l=I(e);if(o<=0){l!==t&&X(e,t);return}requestAnimationFrame(s=>{const r=s-i,d=l+(t-l)/Math.max(r,o)*r;X(e,d),d!==t&&he(e,t,o-r,s)})}function U(e,t){if(e===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,t);return}e.scrollTop=t}function X(e,t){if(e===window){window.scrollTo(t,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}e.scrollLeft=t}function _e(e,t,o){if(o){me(e,t,o);return}U(e,t)}function Ae(e,t,o){if(o){he(e,t,o);return}X(e,t)}let W;function F(){if(W!==void 0)return W;const e=document.createElement("p"),t=document.createElement("div");J(e,{width:"100%",height:"200px"}),J(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const o=e.offsetWidth;t.style.overflow="scroll";let i=e.offsetWidth;return o===i&&(i=t.clientWidth),t.remove(),W=o-i,W}function Re(e,t=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:t?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}function $e(){const e=L(!se.value);return e.value===!1&&V(()=>{e.value=!0}),e}const pe=typeof ResizeObserver!="undefined",ee=pe===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var te=x({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:t}){let o=null,i,l={width:-1,height:-1};function s(u){u===!0||e.debounce===0||e.debounce==="0"?r():o===null&&(o=setTimeout(r,e.debounce))}function r(){if(clearTimeout(o),o=null,i){const{offsetWidth:u,offsetHeight:c}=i;(u!==l.width||c!==l.height)&&(l={width:u,height:c},t("resize",l))}}const d=E();if(Object.assign(d.proxy,{trigger:s}),pe===!0){let u;return V(()=>{Q(()=>{i=d.proxy.$el.parentNode,i&&(u=new ResizeObserver(s),u.observe(i),r())})}),B(()=>{clearTimeout(o),u!==void 0&&(u.disconnect!==void 0?u.disconnect():i&&u.unobserve(i))}),ae}else{let v=function(){clearTimeout(o),c!==void 0&&(c.removeEventListener!==void 0&&c.removeEventListener("resize",s,T.passive),c=void 0)},h=function(){v(),i&&i.contentDocument&&(c=i.contentDocument.defaultView,c.addEventListener("resize",s,T.passive),r())};const u=$e();let c;return V(()=>{Q(()=>{i=d.proxy.$el,i&&h()})}),B(v),()=>{if(u.value===!0)return b("object",{style:ee.style,tabindex:-1,type:"text/html",data:ee.url,"aria-hidden":"true",onLoad:h})}}}});function Fe(e,t,o){let i;function l(){i!==void 0&&(Z.remove(i),i=void 0)}return B(()=>{e.value===!0&&l()}),{removeFromHistory:l,addToHistory(){i={condition:()=>o.value===!0,handler:t},Z.add(i)}}}const je={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},De=["before-show","show","before-hide","hide"];function Ne({showing:e,canShow:t,hideOnRouteChange:o,handleShow:i,handleHide:l,processOnMount:s}){const r=E(),{props:d,emit:u,proxy:c}=r;let v;function h(a){e.value===!0?w(a):g(a)}function g(a){if(d.disable===!0||a!==void 0&&a.qAnchorHandled===!0||t!==void 0&&t(a)!==!0)return;const y=d["onUpdate:modelValue"]!==void 0;y===!0&&(u("update:modelValue",!0),v=a,Q(()=>{v===a&&(v=void 0)})),(d.modelValue===null||y===!1)&&m(a)}function m(a){e.value!==!0&&(e.value=!0,u("before-show",a),i!==void 0?i(a):u("show",a))}function w(a){if(d.disable===!0)return;const y=d["onUpdate:modelValue"]!==void 0;y===!0&&(u("update:modelValue",!1),v=a,Q(()=>{v===a&&(v=void 0)})),(d.modelValue===null||y===!1)&&z(a)}function z(a){e.value!==!1&&(e.value=!1,u("before-hide",a),l!==void 0?l(a):u("hide",a))}function P(a){d.disable===!0&&a===!0?d["onUpdate:modelValue"]!==void 0&&u("update:modelValue",!1):a===!0!==e.value&&(a===!0?m:z)(v)}_(()=>d.modelValue,P),o!==void 0&&we(r)===!0&&_(()=>c.$route.fullPath,()=>{o.value===!0&&e.value===!0&&w()}),s===!0&&V(()=>{P(d.modelValue)});const S={show:g,hide:w,toggle:h};return Object.assign(c,S),S}let $=0,j,D,H,N=!1,oe,ie,C;function He(e){Ve(e)&&ue(e)}function Ve(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=be(e),o=e.shiftKey&&!e.deltaX,i=!o&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),l=o||i?e.deltaY:e.deltaX;for(let s=0;s<t.length;s++){const r=t[s];if(Re(r,i))return i?l<0&&r.scrollTop===0?!0:l>0&&r.scrollTop+r.clientHeight===r.scrollHeight:l<0&&r.scrollLeft===0?!0:l>0&&r.scrollLeft+r.clientWidth===r.scrollWidth}return!0}function ne(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function O(e){N!==!0&&(N=!0,requestAnimationFrame(()=>{N=!1;const{height:t}=e.target,{clientHeight:o,scrollTop:i}=document.scrollingElement;(H===void 0||t!==window.innerHeight)&&(H=o-t,document.scrollingElement.scrollTop=i),i>H&&(document.scrollingElement.scrollTop-=Math.ceil((i-H)/8))}))}function le(e){const t=document.body,o=window.visualViewport!==void 0;if(e==="add"){const{overflowY:i,overflowX:l}=window.getComputedStyle(t);j=I(window),D=K(window),oe=t.style.left,ie=t.style.top,t.style.left=`-${j}px`,t.style.top=`-${D}px`,l!=="hidden"&&(l==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),i!=="hidden"&&(i==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,k.is.ios===!0&&(o===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",O,T.passiveCapture),window.visualViewport.addEventListener("scroll",O,T.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",ne,T.passiveCapture))}k.is.desktop===!0&&k.is.mac===!0&&window[`${e}EventListener`]("wheel",He,T.notPassive),e==="remove"&&(k.is.ios===!0&&(o===!0?(window.visualViewport.removeEventListener("resize",O,T.passiveCapture),window.visualViewport.removeEventListener("scroll",O,T.passiveCapture)):window.removeEventListener("scroll",ne,T.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=oe,t.style.top=ie,window.scrollTo(j,D),H=void 0)}function Be(e){let t="add";if(e===!0){if($++,C!==void 0){clearTimeout(C),C=void 0;return}if($>1)return}else{if($===0||($--,$>0))return;if(t="remove",k.is.ios===!0&&k.is.nativeMobile===!0){clearTimeout(C),C=setTimeout(()=>{le(t),C=void 0},100);return}}le(t)}function Ue(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,Be(t))}}}function Xe(){let e;return B(()=>{clearTimeout(e)}),{registerTimeout(t,o){clearTimeout(e),e=setTimeout(t,o)},removeTimeout(){clearTimeout(e)}}}function Ye(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),ye.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}var Ke=x({name:"QPageContainer",setup(e,{slots:t}){const{proxy:{$q:o}}=E(),i=Te(de,()=>{console.error("QPageContainer needs to be child of QLayout")});ce(Le,!0);const l=p(()=>{const s={};return i.header.space===!0&&(s.paddingTop=`${i.header.size}px`),i.right.space===!0&&(s[`padding${o.lang.rtl===!0?"Left":"Right"}`]=`${i.right.size}px`),i.footer.space===!0&&(s.paddingBottom=`${i.footer.size}px`),i.left.space===!0&&(s[`padding${o.lang.rtl===!0?"Right":"Left"}`]=`${i.left.size}px`),s});return()=>b("div",{class:"q-page-container",style:l.value},Y(t.default))}});const{passive:re}=T,Me=["both","horizontal","vertical"];var We=x({name:"QScrollObserver",props:{axis:{type:String,validator:e=>Me.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:t}){const o={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let i=null,l,s;_(()=>e.scrollTarget,()=>{u(),d()});function r(){i!==null&&i();const h=Math.max(0,K(l)),g=I(l),m={top:h-o.position.top,left:g-o.position.left};if(e.axis==="vertical"&&m.top===0||e.axis==="horizontal"&&m.left===0)return;const w=Math.abs(m.top)>=Math.abs(m.left)?m.top<0?"up":"down":m.left<0?"left":"right";o.position={top:h,left:g},o.directionChanged=o.direction!==w,o.delta=m,o.directionChanged===!0&&(o.direction=w,o.inflectionPoint=o.position),t("scroll",{...o})}function d(){l=ke(s,e.scrollTarget),l.addEventListener("scroll",c,re),c(!0)}function u(){l!==void 0&&(l.removeEventListener("scroll",c,re),l=void 0)}function c(h){if(h===!0||e.debounce===0||e.debounce==="0")r();else if(i===null){const[g,m]=e.debounce?[setTimeout(r,e.debounce),clearTimeout]:[requestAnimationFrame(r),cancelAnimationFrame];i=()=>{m(g),i=null}}}const v=E();return V(()=>{s=v.proxy.$el.parentNode,d()}),B(()=>{i!==null&&i(),u()}),Object.assign(v.proxy,{trigger:c,getPosition:()=>o}),ae}}),Ie=x({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:t,emit:o}){const{proxy:{$q:i}}=E(),l=L(null),s=L(i.screen.height),r=L(e.container===!0?0:i.screen.width),d=L({position:0,direction:"down",inflectionPoint:0}),u=L(0),c=L(se.value===!0?0:F()),v=p(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),h=p(()=>e.container===!1?{minHeight:i.screen.height+"px"}:null),g=p(()=>c.value!==0?{[i.lang.rtl===!0?"left":"right"]:`${c.value}px`}:null),m=p(()=>c.value!==0?{[i.lang.rtl===!0?"right":"left"]:0,[i.lang.rtl===!0?"left":"right"]:`-${c.value}px`,width:`calc(100% + ${c.value}px)`}:null);function w(n){if(e.container===!0||document.qScrollPrevented!==!0){const f={position:n.position.top,direction:n.direction,directionChanged:n.directionChanged,inflectionPoint:n.inflectionPoint.top,delta:n.delta.top};d.value=f,e.onScroll!==void 0&&o("scroll",f)}}function z(n){const{height:f,width:q}=n;let R=!1;s.value!==f&&(R=!0,s.value=f,e.onScrollHeight!==void 0&&o("scroll-height",f),S()),r.value!==q&&(R=!0,r.value=q),R===!0&&e.onResize!==void 0&&o("resize",n)}function P({height:n}){u.value!==n&&(u.value=n,S())}function S(){if(e.container===!0){const n=s.value>u.value?F():0;c.value!==n&&(c.value=n)}}let a;const y={instances:{},view:p(()=>e.view),isContainer:p(()=>e.container),rootRef:l,height:s,containerHeight:u,scrollbarWidth:c,totalWidth:p(()=>r.value+c.value),rows:p(()=>{const n=e.view.toLowerCase().split(" ");return{top:n[0].split(""),middle:n[1].split(""),bottom:n[2].split("")}}),header:M({size:0,offset:0,space:!1}),right:M({size:300,offset:0,space:!1}),footer:M({size:0,offset:0,space:!1}),left:M({size:300,offset:0,space:!1}),scroll:d,animate(){a!==void 0?clearTimeout(a):document.body.classList.add("q-body--layout-animate"),a=setTimeout(()=>{document.body.classList.remove("q-body--layout-animate"),a=void 0},155)},update(n,f,q){y[n][f]=q}};if(ce(de,y),F()>0){let q=function(){n=null,f.classList.remove("hide-scrollbar")},R=function(){if(n===null){if(f.scrollHeight>i.screen.height)return;f.classList.add("hide-scrollbar")}else clearTimeout(n);n=setTimeout(q,300)},A=function(G){n!==null&&G==="remove"&&(clearTimeout(n),q()),window[`${G}EventListener`]("resize",R)},n=null;const f=document.body;_(()=>e.container!==!0?"add":"remove",A),e.container!==!0&&A("add"),Se(()=>{A("remove")})}return()=>{const n=qe(t.default,[b(We,{onScroll:w}),b(te,{onResize:z})]),f=b("div",{class:v.value,style:h.value,ref:e.container===!0?void 0:l,tabindex:-1},n);return e.container===!0?b("div",{class:"q-layout-container overflow-hidden",ref:l},[b(te,{onResize:P}),b("div",{class:"absolute-full",style:g.value},[b("div",{class:"scroll",style:m.value},[f])])]):f}}}),Ge=x({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:t}){const o=p(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>b("div",{class:o.value},Y(t.default))}}),Je=x({name:"QItem",props:{...fe,...xe,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:t,emit:o}){const{proxy:{$q:i}}=E(),l=ve(e,i),{hasRouterLink:s,hasLink:r,linkProps:d,linkClass:u,linkTag:c,navigateToRouterLink:v}=Ee(),h=L(null),g=L(null),m=p(()=>e.clickable===!0||r.value===!0||e.tag==="label"),w=p(()=>e.disable!==!0&&m.value===!0),z=p(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(l.value===!0?" q-item--dark":"")+(r.value===!0&&e.active===null?u.value:e.active===!0?`${e.activeClass!==void 0?` ${e.activeClass}`:""} q-item--active`:"")+(e.disable===!0?" disabled":"")+(w.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),P=p(()=>{if(e.insetLevel===void 0)return null;const n=i.lang.rtl===!0?"Right":"Left";return{["padding"+n]:16+e.insetLevel*56+"px"}});function S(n){w.value===!0&&(g.value!==null&&(n.qKeyEvent!==!0&&document.activeElement===h.value?g.value.focus():document.activeElement===g.value&&h.value.focus()),s.value===!0&&v(n),o("click",n))}function a(n){if(w.value===!0&&ze(n,13)===!0){ue(n),n.qKeyEvent=!0;const f=new MouseEvent("click",n);f.qKeyEvent=!0,h.value.dispatchEvent(f)}o("keyup",n)}function y(){const n=Pe(t.default,[]);return w.value===!0&&n.unshift(b("div",{class:"q-focus-helper",tabindex:-1,ref:g})),n}return()=>{const n={ref:h,class:z.value,style:P.value,onClick:S,onKeyup:a};return w.value===!0?(n.tabindex=e.tabindex||"0",Object.assign(n,d.value)):m.value===!0&&(n["aria-disabled"]="true"),b(c.value,n,y())}}}),Ze=x({name:"QList",props:{...fe,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean},setup(e,{slots:t}){const o=E(),i=ve(e,o.proxy.$q),l=p(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(i.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>b("div",{class:l.value},Y(t.default))}});export{te as Q,De as a,Xe as b,Ye as c,Ne as d,Fe as e,Ue as f,We as g,Ae as h,Ze as i,Je as j,Ge as k,Ie as l,Ke as m,F as n,ke as o,_e as s,je as u};