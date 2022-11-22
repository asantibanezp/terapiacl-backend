(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f5b73722"],{"7c76":function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return u})),a.d(e,"c",(function(){return p}));
/*!
 * vue2-transitions v0.3.0
 * (c) 2019-present cristij <joracristi@gmail.com>
 * Released under the MIT License.
 */
var n={inheritAttrs:!1,props:{duration:{type:[Number,Object],default:300},delay:{type:[Number,Object],default:0},group:Boolean,tag:{type:String,default:"span"},origin:{type:String,default:""},styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"ease-out"}}}},computed:{componentType:function(){return this.group?"transition-group":"transition"},hooks:function(){return Object.assign({beforeEnter:this.beforeEnter,afterEnter:this.cleanUpStyles,beforeLeave:this.beforeLeave,leave:this.leave,afterLeave:this.cleanUpStyles},this.$listeners)}},methods:{beforeEnter:function(t){var e=this.duration.enter?this.duration.enter:this.duration;t.style.animationDuration=e+"ms";var a=this.delay.enter?this.delay.enter:this.delay;t.style.animationDelay=a+"ms",this.setStyles(t)},cleanUpStyles:function(t){var e=this;Object.keys(this.styles).forEach((function(a){var n=e.styles[a];n&&(t.style[a]="")})),t.style.animationDuration="",t.style.animationDelay=""},beforeLeave:function(t){var e=this.duration.leave?this.duration.leave:this.duration;t.style.animationDuration=e+"ms";var a=this.delay.leave?this.delay.leave:this.delay;t.style.animationDelay=a+"ms",this.setStyles(t)},leave:function(t){this.setAbsolutePosition(t)},setStyles:function(t){var e=this;this.setTransformOrigin(t),Object.keys(this.styles).forEach((function(a){var n=e.styles[a];n&&(t.style[a]=n)}))},setAbsolutePosition:function(t){return this.group&&(t.style.position="absolute"),this},setTransformOrigin:function(t){return this.origin&&(t.style.transformOrigin=this.origin),this}}};(function(){if("undefined"!==typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=" @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .fadeIn { animation-name: fadeIn; } @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } } .fadeOut { animation-name: fadeOut; } .fade-move { transition: transform .3s ease-out; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}})();var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,"enter-active-class":"fadeIn","move-class":"fade-move","leave-active-class":"fadeOut"}},"component",t.$attrs,!1),t.hooks),[t._t("default")],2)},staticRenderFns:[],name:"fade-transition",mixins:[n]};(function(){if("undefined"!==typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=".zoom-move { transition: transform .3s ease-out; } @keyframes zoomIn { from { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); } 50% { opacity: 1; } } .zoomIn { animation-name: zoomIn; } @keyframes zoomOut { from { opacity: 1; } 50% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); } to { opacity: 0; } } .zoomOut { animation-name: zoomOut; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}})();var o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,"enter-active-class":"zoomIn","move-class":"zoom-move","leave-active-class":"zoomOut"}},"component",t.$attrs,!1),t.hooks),[t._t("default")],2)},staticRenderFns:[],name:"zoom-center-transition",mixins:[n]};(function(){if("undefined"!==typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=".zoom-move { transition: transform .3s ease-out; } @keyframes zoomInX { from { opacity: 0; transform: scaleX(0); } 50% { opacity: 1; } } .zoomInX { animation-name: zoomInX; } @keyframes zoomOutX { from { opacity: 1; } 50% { opacity: 0; transform: scaleX(0); } to { opacity: 0; } } .zoomOutX { animation-name: zoomOutX; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}})();var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,"enter-active-class":"zoomInX","move-class":"zoom-move","leave-active-class":"zoomOutX"}},"component",t.$attrs,!1),t.hooks),[t._t("default")],2)},staticRenderFns:[],name:"zoom-x-transition",props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.55,0,.1,1)"}}}},mixins:[n]};(function(){if("undefined"!==typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=".zoom-move { transition: transform .3s ease-out; } @keyframes zoomInY { from { opacity: 0; transform: scaleY(0); } 50% { opacity: 1; tranform: scaleY(1); } } .zoomInY { animation-name: zoomInY; } @keyframes zoomOutY { from { opacity: 1; } 50% { opacity: 0; transform: scaleY(0); } to { opacity: 0; } } .zoomOutY { animation-name: zoomOutY; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}})();var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,"enter-active-class":"zoomInY","move-class":"zoom-move","leave-active-class":"zoomOutY"}},"component",t.$attrs,!1),t.hooks),[t._t("default")],2)},staticRenderFns:[],name:"zoom-y-transition",mixins:[n],props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.55,0,.1,1)"}}}}};(function(){if("undefined"!==typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=" .collapse-move { transition: transform .3s ease-in-out; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}})();var l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,"move-class":"collapse-move"},on:{"before-enter":t.beforeEnter,"after-enter":t.afterEnter,enter:t.enter,"before-leave":t.beforeLeave,leave:t.leave,"after-leave":t.afterLeave}},"component",t.$attrs,!1),t.$listeners),[t._t("default")],2)},staticRenderFns:[],name:"collapse-transition",mixins:[n],methods:{transitionStyle:function(t){void 0===t&&(t=300);var e=t/1e3,a=e+"s height ease-in-out, "+e+"s padding-top ease-in-out, "+e+"s padding-bottom ease-in-out";return a},beforeEnter:function(t){var e=this.duration.enter?this.duration.enter:this.duration;t.style.transition=this.transitionStyle(e),t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.height="0",t.style.paddingTop=0,t.style.paddingBottom=0,this.setStyles(t)},enter:function(t){t.dataset.oldOverflow=t.style.overflow,0!==t.scrollHeight?(t.style.height=t.scrollHeight+"px",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom):(t.style.height="",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom),t.style.overflow="hidden"},afterEnter:function(t){t.style.transition="",t.style.height="",t.style.overflow=t.dataset.oldOverflow},beforeLeave:function(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.height=t.scrollHeight+"px",t.style.overflow="hidden",this.setStyles(t)},leave:function(t){var e=this.duration.leave?this.duration.leave:this.duration;0!==t.scrollHeight&&(t.style.transition=this.transitionStyle(e),t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0),this.setAbsolutePosition(t)},afterLeave:function(t){t.style.transition="",t.style.height="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom}}};(function(){if("undefined"!==typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=" @keyframes scaleIn { from { opacity: 0; transform: scale(0) } to { opacity: 1; } } .scaleIn { animation-name: scaleIn; } @keyframes scaleOut { from { opacity: 1; } to { opacity: 0; transform: scale(0); } } .scaleOut { animation-name: scaleOut; } .scale-move { transition: transform .3s cubic-bezier(.25, .8, .50, 1); } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}})();var c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,"enter-active-class":"scaleIn","move-class":"scale-move","leave-active-class":"scaleOut"}},"component",t.$attrs,!1),t.hooks),[t._t("default")],2)},staticRenderFns:[],name:"scale-transition",mixins:[n],props:{origin:{type:String,default:"top left"},styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.25,.8,.50,1)"}}}}};(function(){if("undefined"!==typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=".slide-move { transition: transform .3s; } @keyframes slideYIn { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; } } .slideYIn { animation-name: slideYIn; } @keyframes slideYOut { from { opacity: 1; } to { opacity: 0; transform: translateY(-15px); } } .slideYOut { animation-name: slideYOut; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}})();var d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,type:"animation","enter-active-class":"slideYIn","move-class":"slide-move","leave-active-class":"slideYOut"}},"component",t.$attrs,!1),t.hooks),[t._t("default")],2)},staticRenderFns:[],name:"slide-y-up-transition",mixins:[n],props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.25,.8,.50,1)"}}}}};(function(){if("undefined"!==typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=".slide-move { transition: transform .3s; } @keyframes slideYDownIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; } } .slideYDownIn { animation-name: slideYDownIn; } @keyframes slideYDownOut { from { opacity: 1; } to { opacity: 0; transform: translateY(15px); } } .slideYDownOut { animation-name: slideYDownOut; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}})();var m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,"enter-active-class":"slideYDownIn","leave-active-class":"slideYDownOut"}},"component",t.$attrs,!1),t.hooks),[t._t("default")],2)},staticRenderFns:[],name:"slide-y-down-transition",mixins:[n],props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.25,.8,.50,1)"}}}}};(function(){if("undefined"!==typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=".slide-move { transition: transform .3s; } @keyframes slideXLeftIn { from { opacity: 0; transform: translateX(-15px); } to { opacity: 1; } } .slideXLeftIn { animation-name: slideXLeftIn; } @keyframes slideXLeftOut { from { opacity: 1; } to { opacity: 0; transform: translateX(-15px); } } .slideXLeftOut { animation-name: slideXLeftOut; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}})();var u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,"enter-active-class":"slideXLeftIn","move-class":"slide-move","leave-active-class":"slideXLeftOut"}},"component",t.$attrs,!1),t.hooks),[t._t("default")],2)},staticRenderFns:[],name:"slide-x-left-transition",mixins:[n],props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.25,.8,.50,1)"}}}}};(function(){if("undefined"!==typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=".slide-move { transition: transform .3s; } @keyframes slideXRightIn { from { opacity: 0; transform: translateX(15px); } to { opacity: 1; } } .slideXRightIn { animation-name: slideXRightIn; } @keyframes slideXRightOut { from { opacity: 1; } to { opacity: 0; transform: translateX(15px); } } .slideXRightOut { animation-name: slideXRightOut; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}})();var p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,"enter-active-class":"slideXRightIn","move-class":"slide-move","leave-active-class":"slideXRightOut"}},"component",t.$attrs,!1),t.hooks),[t._t("default")],2)},staticRenderFns:[],name:"slide-x-right-transition",mixins:[n],props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.25,.8,.50,1)"}}}}},f={};function y(t,e){e&&e.components?e.components.forEach((function(e){return t.component(e.name,f[e.name])})):Object.keys(f).forEach((function(e){t.component(e,f[e])}))}f[s.name]=s,f[o.name]=o,f[i.name]=i,f[r.name]=r,f[l.name]=l,f[c.name]=c,f[d.name]=d,f[m.name]=m,f[u.name]=u,f[p.name]=p,"undefined"!==typeof window&&window.Vue&&window.Vue.use({install:y})},"9c9e":function(t,e,a){"use strict";var n=a("5530"),s=(a("ac1f"),a("5319"),a("d3b7"),a("25f0"),a("1276"),a("a15b"),a("2b0e")),o=a("2f62");e["a"]={methods:Object(n["a"])(Object(n["a"])({},Object(o["d"])(["cerrarSesion"])),{},{formatNumberBySeparator:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".";return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,e)},swalAlertError:function(t){s["a"].swal({title:t.response.data.title,text:t.response.data.text,icon:"error"}),!t.response.data.code||"token-timed-out"!==t.response.data.code&&"no-token"!==t.response.data.code&&"invalid-user"!==t.response.data.code||this.cerrarSesion()},getDateByDateTime:function(t){var e=t.substring(0,t.indexOf("T")),a=e.split("-"),n=a.reverse();return n.join("-")},getTimeByDateTime:function(t){var e=t.substring(t.indexOf("T")+1),a=e.split(":");return a[0]+":"+a[1]},debounce:function(t,e){var a=null;return function(){clearTimeout(a);var n=arguments,s=this;a=setTimeout((function(){t.apply(s,n)}),e)}}})}},a523:function(t,e,a){"use strict";a("4de4"),a("b64b"),a("2ca0"),a("99af"),a("20f6"),a("4b85"),a("498a"),a("a15b");var n=a("2b0e");function s(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var n=a.props,s=a.data,o=a.children;s.staticClass="".concat(t," ").concat(s.staticClass||"").trim();var i=s.attrs;if(i){s.attrs={};var r=Object.keys(i).filter((function(t){if("slot"===t)return!1;var e=i[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}));r.length&&(s.staticClass+=" ".concat(r.join(" ")))}return n.id&&(s.domProps=s.domProps||{},s.domProps.id=n.id),e(n.tag,s,o)}})}var o=a("d9f7");e["a"]=s("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,n=e.props,s=e.data,i=e.children,r=s.attrs;return r&&(s.attrs={},a=Object.keys(r).filter((function(t){if("slot"===t)return!1;var e=r[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(s.domProps=s.domProps||{},s.domProps.id=n.id),t(n.tag,Object(o["a"])(s,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(a||[])}),i)}})},f965:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-container",{staticClass:"aranceles__container"},[a("v-row",[a("v-col",[a("v-row",{staticClass:"aranceles_row_sucursal flex-column-reverse flex-md-row"},[a("v-col",{staticClass:"aranceles_row_sucursal__select col-12 col-md-4"},[a("div",{staticClass:"ars_select__main"},[a("v-select",{attrs:{items:t.sucursales,"item-text":"Nombre","item-value":"CodSucursal",label:"Sucursal",filled:"",dense:"","hide-details":"","background-color":"warning",color:"warning","item-color":"warning",dark:""},model:{value:t.sucursal,callback:function(e){t.sucursal=e},expression:"sucursal"}})],1)]),a("v-col",{staticClass:"aranceles_row_sucursal__title col-12 col-md-8"},[a("div",{staticClass:"ars_title__main"},[a("slide-x-right-transition",[t.titleStatus?a("h1",[t._v(" "+t._s(t.setCompleteTitle)+" ")]):t._e()])],1)])],1),a("v-row",{staticClass:"aranceles_row_up"},[a("v-col",{staticClass:"aranceles_row_up__left col-12 col-md-5"},[a("div",{staticClass:"aru_left_1"},[a("span",[t._v("ARANCELES PARA AFILIADOS A FONASA")])]),a("div",{staticClass:"aru_left_2"},[a("span",[t._v("Aranceles al alcance de la mayoría. Para los pacientes afiliados a Fonasa, tenemos valores especiales, como por ejemplo, "),a("b",[t._v("la sesión de psicología a $"+t._s(t.arancelFonasa.ValorPrimera))]),t._v(".")])]),a("div",{staticClass:"aru_left_3"},[a("v-simple-table",{staticClass:"tabla_aranceles",attrs:{dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v(" ESPECIALIDAD ")]),a("th",{staticClass:"text-left"},[t._v(" GRUPO ETARIO ")]),a("th",{staticClass:"text-left"},[t._v(" ARANCEL ")])])]),a("tbody",t._l(t.aranceles,(function(e,n){return a("tr",{key:n,on:{click:function(a){return t.$router.push("/especialidad/"+e.CodSiat)}}},[a("td",{staticClass:"td_especialidad",style:e.TdBorderTop},[t._v(" "+t._s(e.NombreEspecialidad)+" ")]),a("td",{style:e.TdBorderTop},[t._v(" "+t._s(e.NombreRangoEtario)+" ")]),a("td",{style:e.TdBorderTop},[t._v(" $"+t._s(t.formatNumberBySeparator(e.ValorPrimera,"."))+" ")])])})),0)]},proxy:!0}])})],1)]),a("v-col",{staticClass:"aranceles_row_up__right col-lg-7"},[a("div",{staticClass:"aru_right_1"},[a("span",[a("strong",[t._v("PAT:")]),t._v(" VALORES CON DESCUENTO")])]),a("div",{staticClass:"aru_right_2"},[a("span",[t._v("El Programa de Atención Terapéutica (PAT) es una modalidad de pago en donde se puede adquirir varias sesiones de una determinada especialidad a un valor más económico:")])]),a("div",{staticClass:"aru_right_3"},[a("v-simple-table",{staticClass:"tabla_packs",attrs:{dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v(" ESPECIALIDAD ")]),a("th",{staticClass:"text-left"},[t._v(" SESIONES ")]),a("th",{staticClass:"text-left"},[a("span",{domProps:{innerHTML:t._s(t.$vuetify.breakpoint.xs?"% DESC*":"% DESCUENTO*")}})]),a("th",{staticClass:"text-left",attrs:{colspan:"2"}},[t._v(" ARANCEL ")])])]),a("tbody",t._l(t.packs,(function(e,n){return a("tr",{key:n,on:{click:function(a){return t.$router.push("/especialidad/"+e.CodSiat)}}},[a("td",{staticClass:"td_especialidad",style:e.TdBorderTop},[t._v(" "+t._s(e.NombreEspecialidad)+" ")]),a("td",{style:e.TdBorderTop},[t._v(" "+t._s(e.CantidadSesiones)+" Sesiones ")]),a("td",{style:e.TdBorderTop},[t._v(" "+t._s(e.PorcentajeDescuento)+"% ")]),t.$vuetify.breakpoint.xs?t._e():a("td",{staticStyle:{width:"70px"},style:e.TdBorderTop},[a("strike",[t._v(" $"+t._s(e.PrecioInicial.toLocaleString("es-CL"))+" ")])],1),a("td",{style:e.TdBorderTop},[t.$vuetify.breakpoint.xs?a("strike",[t._v(" $"+t._s(e.PrecioInicial.toLocaleString("es-CL"))+" ")]):t._e(),t._v(" $"+t._s(e.PrecioFinal.toLocaleString("es-CL"))+" ")],1)])})),0)]},proxy:!0}])}),a("span",[t._v(" * El descuento se aplica sobre el Arancel Especial Fonasa respectivo. ")])],1)])],1),a("v-row",{staticClass:"aranceles_row_bottom"},[a("v-col",{staticClass:"aranceles_row_bottom__left col-lg-5"},[a("div",{staticClass:"arb_left_1"},[a("span",[t._v("ARANCELES POR ISAPRES")])]),a("div",{staticClass:"arb_left_2"},[a("v-img",{staticClass:"img-tarjetas",attrs:{"max-height":"229","max-width":"516",src:"https://res.cloudinary.com/dkod5pdlc/image/upload/f_auto/terapiacl/general/convenio-isapre-psicologia"}})],1),a("div",{staticClass:"arb_left_3 text-justify"},[a("p",[a("span",[t._v(" Se debe consultar el arancel en la misma institución, ya que son ellos quienes disponen de esta información de acuerdo al plan de salud del afiliado ")])]),a("p",[a("span",[t._v(" Las isapres en convenio son: Banmédica, Colmena, Consalud, Cruz Blanca, Nueva MasVida y Vida Tres, y más información puede encontrar "),a("router-link",{attrs:{to:"/convenios-isapres-atencion-psicologica"}},[t._v("aquí")])],1)])])]),a("v-col",{staticClass:"aranceles_row_bottom__right col-lg-7"},[a("div",{staticClass:"arb_right_1"},[a("div",{staticClass:"arb_right_1__title"},[a("span",[t._v("ARANCELES TERAPIA ONLINE")])]),a("div",{staticClass:"arb_right_1__box"},[a("div",{staticClass:"arb_right_1__box_1"},[a("span",[t._v("Para información sobre nuestros aranceles de Terapia Online, se debe hacer click "),a("a",{attrs:{href:"https://terapiaonline.cl/online/home/aranceles"}},[t._v("aquí")])])]),a("div",{staticClass:"arb_right_1__box_2"},[a("v-img",{staticClass:"img-tarjetas",attrs:{"max-height":"150","max-width":"150",src:"https://res.cloudinary.com/dkod5pdlc/image/upload/f_auto/terapiacl/general/aranceles-psicologia-online"}})],1)])]),a("div",{staticClass:"arb_right_2"},[a("div",{staticClass:"arb_right_2_title"},[a("span",[t._v("FORMAS DE PAGO")])]),a("div",{staticClass:"arb_right_2__box"},[a("div",{staticClass:"arb_right_2__box_1"},[a("span",[t._v(" Las formas de pago disponibles son las siguientes: ")]),a("div",[a("ul",[a("li",[a("v-icon",{attrs:{small:""}},[t._v(" mdi-check ")]),t._v(" Efectivo ")],1),a("li",[a("v-icon",{attrs:{small:""}},[t._v(" mdi-check ")]),t._v(" Transferencia Bancaria ")],1),a("li",[a("v-icon",{attrs:{small:""}},[t._v(" mdi-check ")]),t._v(" Tarjeta de Dédito ")],1),a("li",[a("v-icon",{attrs:{small:""}},[t._v(" mdi-check ")]),t._v(" Tarjeta de Crédito ")],1)])])]),a("div",{staticClass:"arb_right_2__box_2"},[a("v-img",{staticClass:"img-tarjetas",attrs:{"max-width":"300",src:"https://res.cloudinary.com/dkod5pdlc/image/upload/f_auto/terapiacl/general/aranceles-psicologo"}})],1)])])])],1),a("v-row")],1)],1)],1)],1)},s=[],o=a("5530"),i=(a("7db0"),a("fb6a"),a("2b0e")),r=a("2f62"),l=a("7c76"),c=a("9c9e"),d={name:"Aranceles",components:{SlideXRightTransition:l["c"]},mixins:[c["a"]],data:function(){return{sucursal:1,title:"Aranceles",aranceles:"",packs:"",titleStatus:!0,arancelFonasa:""}},computed:Object(o["a"])(Object(o["a"])({},Object(r["e"])("web",["sucursales"])),{},{setCompleteTitle:function(){var t="";switch(this.sucursal){case 1:t="".concat(this.title," Sucursal Providencia");break;case 2:t="".concat(this.title," Sucursal Viña del Mar");break;case 3:t="".concat(this.title," Sucursal Santiago Centro");break;default:t=this.title;break}return this.getAranceles(this.sucursal),this.getPacks(this.sucursal),t}}),methods:{getAranceles:function(t){var e=this;this.titleStatus=!1,i["a"].axios.get("/api/aranceles/".concat(t)).then((function(t){e.sortItems(t.data.result,1),e.titleStatus=!0})).catch((function(t){console.log(t)}))},getPacks:function(t){var e=this;i["a"].axios.get("/api/packs/".concat(t)).then((function(t){e.sortItems(t.data.result,2)})).catch((function(t){console.log(t)}))},sortItems:function(t,e){for(var a=[],n=function(e){var n=t[e];n.TdBorderTop="",t.slice(0,e).find((function(t){return t.CodSiat===n.CodSiat}))?n.NombreEspecialidad="":n.TdBorderTop="border-top: 1px solid #a7d9c3 !important",a.push(n)},s=0;s<t.length;s++)n(s);1===e?(this.aranceles=a,this.arancelFonasa=t.find((function(t){return 8===t.CodSiat}))):this.packs=a}},metaInfo:{title:"Aranceles",titleTemplate:"%s - Centro de Terapia del Comportamiento",htmlAttrs:{lang:"es",amp:!0}}},m=d,u=a("2877"),p=a("6544"),f=a.n(p),y=a("62ad"),v=a("a523"),h=a("132d"),_=a("adda"),g=a("0fd9"),b=a("b974"),T=a("1f4f"),C=Object(u["a"])(m,n,s,!1,null,null,null);e["default"]=C.exports;f()(C,{VCol:y["a"],VContainer:v["a"],VIcon:h["a"],VImg:_["a"],VRow:g["a"],VSelect:b["a"],VSimpleTable:T["a"]})}}]);
//# sourceMappingURL=chunk-f5b73722.a2c4ab78.js.map