if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let r={};const f=e=>a(e,d),n={module:{uri:d},exports:r,require:f};s[d]=Promise.all(c.map((e=>n[e]||f(e)))).then((e=>(i(...e),r)))}}define(["./workbox-6393944f"],(function(e){"use strict";e.setCacheNameDetails({prefix:"portal5s"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/axios.5d95e64c.js",revision:"c1e6c01d6822fd6b3aa5a2a70fde7c41"},{url:"assets/axios.7b244dec.js",revision:"8e9d3116a28d26cb7d8fd9e49ba9c239"},{url:"assets/banner.d5a33f52.jpg",revision:"d2f108b30dc98a6e3cc0175f625c8684"},{url:"assets/DashBoard.0c3f026a.css",revision:"421d50ee980b2222299fa474aa318859"},{url:"assets/DashBoard.1267ddcb.js",revision:"2e2fd64e5212a631bfceee09574c7f71"},{url:"assets/DashBoard.d1dd7d06.js",revision:"b8e486174189017916ebeb31e81e4f3f"},{url:"assets/empresas.b5d30aef.js",revision:"d637025e9608a35aa23c996cf4912250"},{url:"assets/empresas.bee600a6.js",revision:"4aae41df988a1673db78d38e0bbf3f53"},{url:"assets/ErrorNotFound.503606b1.js",revision:"62fe0de379ee9413360d1e1add62a855"},{url:"assets/ErrorNotFound.b5ad9308.js",revision:"88b4a34160b8c48399ef51dedf01cff4"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.1659ac2b.woff",revision:"e7ee6642f9771137444ed489b12f99cc"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.115bdc62.woff2",revision:"4525df77e6f46e1ed85e150ea763d185"},{url:"assets/format.5519fc23.js",revision:"145f1b9fa69a4c635068d84a5379e9be"},{url:"assets/format.fbd21053.js",revision:"634bad9ae3e8e2e248568b2182ba2dee"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/index.2579692f.css",revision:"295d2b3166e2a615d12619b279d04e2d"},{url:"assets/index.34108dd5.js",revision:"d9e6602e8bbc9cdb87e1902a8a3a9c04"},{url:"assets/index.98b8006b.css",revision:"f0a43f09dd45bc19941861bc55f6b1e9"},{url:"assets/index.cdb06e63.js",revision:"cd640c73a8db317c8e56abe4168b7278"},{url:"assets/index.es.3fb8130d.js",revision:"751c510b1c6bc375a9eedb48810b4caa"},{url:"assets/index.es.e148a0a3.js",revision:"12ae1da7661cc53aa15e47461c06c288"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LoginPage.584c3094.js",revision:"8e77713172511dad0b85879ec95157b7"},{url:"assets/LoginPage.e7a3810c.css",revision:"b49190421ce8ec4fc9cd22f2f1ed94e2"},{url:"assets/LoginPage.f5e1d04d.js",revision:"465eac7b9f661fc8edcc683f1d415d7c"},{url:"assets/logog.f87bca27.png",revision:"d26490ab014db0e9228acb4829ad07f4"},{url:"assets/logoGruver.d90a84ce.png",revision:"0d796e1fc6954d018e07accc620dbaa1"},{url:"assets/MainLayout.2228ee4a.css",revision:"9ad19ae3e86470879de3ad0c64914add"},{url:"assets/MainLayout.31ad1254.js",revision:"19de902d79622cc7a74f06d18ccecd83"},{url:"assets/MainLayout.8b821646.js",revision:"2ec260ed5da3a376c787c93119cdf6b9"},{url:"assets/metricas.6d3ba65e.js",revision:"3107dc1ef5d516d7d749592c19a51471"},{url:"assets/metricas.73613bbc.js",revision:"c26a9e55be254e30c724d43a6b4c08dd"},{url:"assets/purify.es.b862aa1a.js",revision:"22578f86a6ddab15a185a462337727ba"},{url:"assets/QCard.01a3ba6a.js",revision:"7a152f747eac66acb87e73ef4ab0803f"},{url:"assets/QCard.822f20b1.js",revision:"63abf75492cd42f34c979e83c8282f62"},{url:"assets/QForm.181dfefc.js",revision:"e74f908ab9dcbcf841b26214ebd23095"},{url:"assets/QForm.81bfdca6.js",revision:"aecd4ee6ec7676f6800d1684ff5157fb"},{url:"assets/QList.34d94f3b.js",revision:"6aa98ae23cae8425862c93a5e71d70ab"},{url:"assets/QList.70cce7bd.js",revision:"c74450043d40d759afe37010ee4b26f9"},{url:"assets/ReportesModule.303732e6.js",revision:"735ebbdf1797cb9ebe5900481d71d992"},{url:"assets/ReportesModule.403c0138.js",revision:"77fb04189eff30ac2d2eec694ad63c95"},{url:"assets/use-dark.4042d94a.js",revision:"53bb7217e628fbd696174a82051cb8e8"},{url:"assets/use-dark.4b387e57.js",revision:"5e1a4aceefbaf153e2645863c6575df8"},{url:"favicon.ico",revision:"f4facfeaed834544d622544acfbb7722"},{url:"icons/apple-icon-120x120.png",revision:"d082235f6e6d2109e84e397f66fa868d"},{url:"icons/apple-icon-152x152.png",revision:"3c728ce3e709b7395be487becf76283a"},{url:"icons/apple-icon-167x167.png",revision:"3fec89672a18e4b402ede58646917c2d"},{url:"icons/apple-icon-180x180.png",revision:"aa47843bd47f34b7ca4b99f65dd25955"},{url:"icons/favicon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"icons/favicon-16x16.png",revision:"e4b046d41e08e6fa06626d6410ab381d"},{url:"icons/favicon-32x32.png",revision:"410858b01fa6d3d66b7bf21447c5f1fc"},{url:"icons/favicon-96x96.png",revision:"db2bde7f824fb4057ffd1c42f6ed756e"},{url:"icons/icon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"icons/icon-192x192.png",revision:"7659f0d3e9602e71811f8b7cf2ce0e8e"},{url:"icons/icon-256x256.png",revision:"cf5ad3498fb6fda43bdafd3c6ce9b824"},{url:"icons/icon-384x384.png",revision:"fdfc1b3612b6833a27a7b260c9990247"},{url:"icons/icon-512x512.png",revision:"2c2dc987945806196bd18cb6028d8bf4"},{url:"icons/logog.png",revision:"d26490ab014db0e9228acb4829ad07f4"},{url:"icons/ms-icon-144x144.png",revision:"8de1b0e67a62b881cd22d935f102a0e6"},{url:"icons/safari-pinned-tab.svg",revision:"3e4c3730b00c89591de9505efb73afd3"},{url:"index.html",revision:"27a6f7a5182b342618b65d7ad5a93c58"},{url:"manifest.json",revision:"6a6cf36d4a100a38b57fd78309c34eed"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
