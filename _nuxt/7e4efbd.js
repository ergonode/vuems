(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{237:function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},243:function(e,t,r){r(14),r(9),r(13),r(19),r(20),r(27),r(11),r(15),r(29),r(25),r(26);var n=r(286),o=r(237),c=r(289);function l(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0,n=function(){};return{s:n,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw o}}}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function m(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){o(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}r(48),r(112),r(30),r(65);var x={workboxURL:"https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/workbox-sw.js",importScripts:[],config:{debug:!1},cacheOptions:{cacheId:"vuems-prod",directoryIndex:"/",revision:"sTu2cftoEC7o"},clientsClaim:!0,skipWaiting:!0,cleanupOutdatedCaches:!0,offlineAnalytics:!1,preCaching:[{revision:"sTu2cftoEC7o",url:"/?standalone=true"}],runtimeCaching:[{urlPattern:"/_nuxt/",handler:"CacheFirst",method:"GET",strategyPlugins:[]},{urlPattern:"/",handler:"NetworkFirst",method:"GET",strategyPlugins:[]}],offlinePage:null,pagesURLPattern:"/",offlineStrategy:"NetworkFirst"};importScripts.apply(void 0,[x.workboxURL].concat(c(x.importScripts))),function(e,t){t.config&&e.setConfig(t.config);t.cacheNames&&e.core.setCacheNameDetails(t.cacheNames);t.clientsClaim&&e.core.clientsClaim();t.skipWaiting&&e.core.skipWaiting();t.cleanupOutdatedCaches&&e.precaching.cleanupOutdatedCaches();t.offlineAnalytics&&e.googleAnalytics.initialize()}(workbox,x),workbox,function(e,t){t.preCaching.length&&e.precaching.precacheAndRoute(t.preCaching,t.cacheOptions)}(workbox,x),workbox,function(e,t){var r,o={requestWillFetch:function(e){var t=e.request;return"only-if-cached"===t.cache&&"no-cors"===t.mode?new Request(t.url,m(m({},t),{},{cache:"default",mode:"no-cors"})):t},fetchDidFail:function(e){e.error.message="[workbox] Network request for "+e.request.url+" threw an error: "+e.error.message,console.error(e.error,"Details:",e)},handlerDidError:function(e){return e.error.message="[workbox] Network handler threw an error: "+e.error.message,console.error(e.error,"Details:",e),null}},f=l(t.runtimeCaching);try{for(f.s();!(r=f.n()).done;){var d=r.value,x=new RegExp(d.urlPattern),y=d.method||"GET",h=(d.strategyPlugins||[]).map((function(p){return n((t=e,p.use.split(".").reduce((function(p,e){return p[e]}),t)),c(p.config));var t}));h.unshift(o);var w=m(m({},d.strategyOptions),{},{plugins:h}),v=new e.strategies[d.handler](w);e.routing.registerRoute(x,v,y)}}catch(e){f.e(e)}finally{f.f()}}(workbox,x),function(e,t){t.offlinePage&&e.routing.registerRoute(new RegExp(t.pagesURLPattern),(function(r){var n=r.request,o=r.event;return(new e.strategies[t.offlineStrategy]).handle({request:n,event:o}).catch((function(){return caches.match(t.offlinePage)}))}))}(workbox,x),workbox},244:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r},e.exports.default=e.exports,e.exports.__esModule=!0},262:function(e,t,r){var map={"./CNAME":263,"./demo/image/demo-about-module.png":264,"./demo/image/demo-clean-structure.png":265,"./demo/image/demo-core-module.png":266,"./demo/image/demo-module-scopes.png":267,"./demo/image/demo-modules-structure.png":268,"./demo/image/demo-start.png":269,"./demo/image/demo-structure-init.png":270,"./examples/extend-vuex.png":271,"./examples/global-middleware.png":272,"./examples/i18n-translations.png":273,"./examples/module-content.png":274,"./examples/module-router.png":275,"./examples/module-structure.png":276,"./examples/new_module_structure-desc.png":277,"./examples/new_module_structure.png":278,"./icon.png":279,"./logo-bg.png":280,"./logo-long-dark.svg":281,"./logo-long-light.svg":282,"./logo.svg":283,"./preview.png":284,"./preview2.png":285,"./sw":243,"./sw.js":243};function n(e){var t=o(e);return r(t)}function o(e){if(!r.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}n.keys=function(){return Object.keys(map)},n.resolve=o,e.exports=n,n.id=262},263:function(e,t){vuems.ergonode.com},264:function(e,t,r){e.exports=r.p+"img/demo-about-module.2762790.png"},265:function(e,t,r){e.exports=r.p+"img/demo-clean-structure.a5a24f5.png"},266:function(e,t,r){e.exports=r.p+"img/demo-core-module.79386fe.png"},267:function(e,t,r){e.exports=r.p+"img/demo-module-scopes.6a6cf84.png"},268:function(e,t,r){e.exports=r.p+"img/demo-modules-structure.67f780c.png"},269:function(e,t,r){e.exports=r.p+"img/demo-start.014f8cb.png"},270:function(e,t,r){e.exports=r.p+"img/demo-structure-init.63869f8.png"},271:function(e,t,r){e.exports=r.p+"img/extend-vuex.e16c106.png"},272:function(e,t,r){e.exports=r.p+"img/global-middleware.ee30237.png"},273:function(e,t,r){e.exports=r.p+"img/i18n-translations.38ea05a.png"},274:function(e,t,r){e.exports=r.p+"img/module-content.a4cad61.png"},275:function(e,t,r){e.exports=r.p+"img/module-router.0d4ab3e.png"},276:function(e,t,r){e.exports=r.p+"img/module-structure.167ba73.png"},277:function(e,t,r){e.exports=r.p+"img/new_module_structure-desc.99db361.png"},278:function(e,t,r){e.exports=r.p+"img/new_module_structure.d29aded.png"},279:function(e,t,r){e.exports=r.p+"img/icon.5b25ff4.png"},280:function(e,t,r){e.exports=r.p+"img/logo-bg.5e83f3a.png"},281:function(e,t,r){e.exports=r.p+"img/logo-long-dark.198065a.svg"},282:function(e,t,r){e.exports=r.p+"img/logo-long-light.7dccb57.svg"},283:function(e,t,r){e.exports=r.p+"img/logo.36417ac.svg"},284:function(e,t,r){e.exports=r.p+"img/preview.6d2b7fa.png"},285:function(e,t,r){e.exports=r.p+"img/preview2.5e7fce0.png"},286:function(e,t,r){var n=r(287),o=r(288);function c(t,r,l){return o()?(e.exports=c=Reflect.construct,e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=c=function(e,t,r){var a=[null];a.push.apply(a,t);var o=new(Function.bind.apply(e,a));return r&&n(o,r.prototype),o},e.exports.default=e.exports,e.exports.__esModule=!0),c.apply(null,arguments)}e.exports=c,e.exports.default=e.exports,e.exports.__esModule=!0},287:function(e,t){function r(t,p){return e.exports=r=Object.setPrototypeOf||function(e,p){return e.__proto__=p,e},e.exports.default=e.exports,e.exports.__esModule=!0,r(t,p)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},288:function(e,t){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.default=e.exports,e.exports.__esModule=!0},289:function(e,t,r){var n=r(290),o=r(291),c=r(292),l=r(293);e.exports=function(e){return n(e)||o(e)||c(e)||l()},e.exports.default=e.exports,e.exports.__esModule=!0},290:function(e,t,r){var n=r(244);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},291:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},292:function(e,t,r){var n=r(244);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},293:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},319:function(e,t,r){"use strict";r.r(t);var n={props:{src:{type:String,required:!0},alt:{type:String,required:!0}},computed:{imgSrc:function(){try{return r(262)("./".concat(this.src))}catch(e){return null}}}},o=r(2),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("img",{staticClass:"article-image",attrs:{src:e.imgSrc,alt:e.alt}})}),[],!1,null,null,null);t.default=component.exports}}]);