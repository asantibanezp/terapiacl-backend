(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3eb9efbe"],{1715:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{id:"dashboard",fluid:"",tag:"section"}},[n("show-dialog-slider-bienvenidos",e._b({on:{procesar:function(t){return e.procesar(t)},cerrar:function(t){return e.cerrar()}}},"show-dialog-slider-bienvenidos",{value:e.value},!1)),n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("base-material-card",{staticClass:"px-5 py-3 mb-5",attrs:{color:"success",icon:"mdi-view-carousel",inline:"",title:"Slider Bienvenidos"}},[n("v-row",[n("v-col",{staticClass:"pa-0 ma-0 text-right"},[n("v-btn",{staticClass:"ma-0",attrs:{color:"success"},on:{click:function(t){return e.abrirCrear()}}},[e._v(" Nuevo Slider ")])],1)],1),n("v-simple-table",[n("thead",[n("tr",[n("th",[e._v("Imagen")]),n("th",[e._v("Imagen Mobile")]),n("th",{staticClass:"text-right"},[e._v(" Fecha Cre. ")]),n("th",{staticClass:"text-right"},[e._v(" Fecha Mod. ")]),n("th",{staticClass:"text-right"},[e._v(" Orden ")]),n("th",[e._v("Acciones")])])]),n("tbody",e._l(e.sliders,(function(t,a){return n("tr",{key:a},[n("td",[e._v(e._s(t.Imagen))]),n("td",[e._v(e._s(t.ImagenMobile))]),n("td",{staticClass:"text-right"},[e._v(" "+e._s(e.getDateByDateTime(t.FechaHoraCreacion))+" ")]),n("td",{staticClass:"text-right"},[e._v(" "+e._s(e.getDateByDateTime(t.FechaHoraModificacion))+" ")]),n("td",[e._v(e._s(t.Orden))]),n("td",{staticClass:"text-right"},[n("v-btn",{staticClass:"px-2 ml-1",attrs:{color:"warning","min-width":"0",small:""},on:{click:function(n){return e.abrirEditar(t.Id)}}},[n("v-icon",{attrs:{small:""},domProps:{textContent:e._s("mdi-pencil")}})],1),n("v-btn",{staticClass:"px-2 ml-1",attrs:{color:"error","min-width":"0",small:""},on:{click:function(n){return e.eliminar(t.Id)}}},[n("v-icon",{attrs:{small:""},domProps:{textContent:e._s("mdi-trash-can")}})],1)],1)])})),0)])],1)],1)],1)],1)},i=[],r=n("5530"),s=(n("d3b7"),n("3ca3"),n("ddb0"),n("c740"),n("a9e3"),n("a434"),n("2b0e")),o=n("2f62"),c=n("9c9e"),l={name:"SlidersBienvenidos",components:{ShowDialogSliderBienvenidos:function(){return Promise.resolve().then(n.bind(null,"b800"))}},mixins:[c["a"]],data:function(){return{sliders:"",value:{slider:{Id:!1,Imagen:"",ImagenMobile:"",HrefLink:"",ToLink:"",Orden:""},imagen:null,imagenMobile:null,nombreImagen:"",nombreImagenMobile:"",chkImagen:!1,chkImagenMobile:!1,loader:!1,active:!1}}},computed:Object(r["a"])({},Object(o["e"])(["token"])),created:function(){this.getSlidersBienvenidos()},methods:{getSlidersBienvenidos:function(){var e=this;s["a"].axios.get("/api/sliders-bienvenidos").then((function(t){e.sliders=t.data.result})).catch((function(e){console.log(e)}))},getSliderBienvenidos:function(e){var t=this;s["a"].axios.get("/api/sliders-bienvenidos/".concat(e)).then((function(e){t.value.slider=e.data.result[0]})).catch((function(e){console.log(e)}))},abrirCrear:function(){this.value.active=!0,this.value.chkImagen=!0,this.value.chkImagenMobile=!0},abrirEditar:function(e){this.getSliderBienvenidos(e),this.value.active=!0,this.value.chkImagen=!1,this.value.chkImagenMobile=!1},cerrar:function(){this.value={slider:{Id:!1,Imagen:"",ImagenMobile:"",HrefLink:"",ToLink:"",Orden:"",VersionImagen:""},imagen:null,imagenMobile:null,nombreImagen:"",nombreImagenMobile:"",chkImagen:!1,chkImagenMobile:!1,loader:!1,active:!1}},procesar:function(e){this.value.loader=!0;var t={"x-token":this.token};console.log(e.slider);var n=new FormData;n.append("id",e.slider.Id),n.append("hrefLink",e.slider.HrefLink),n.append("toLink",e.slider.ToLink),n.append("orden",e.slider.Orden),n.append("imagen",e.imagen),n.append("imagenMobile",e.imagenMobile),n.append("nombreImagen",e.nombreImagen),n.append("nombreImagenMobile",e.nombreImagenMobile),e.slider.Id?this.update(n,t):this.create(n,t)},create:function(e,t){var n=this;s["a"].axios.post("/api/sliders-bienvenidos",e,{headers:t}).then((function(e){n.sliders.unshift(e.data.Slider[0]),n.cerrar(),s["a"].swal("Slider creado","","success")})).catch((function(e){n.swalAlertError(e),n.cerrar()}))},update:function(e,t){var n=this;s["a"].axios.put("/api/sliders-bienvenidos",e,{headers:t}).then((function(e){var t=n.sliders.findIndex((function(t){return t.Id===Number(e.data.Slider[0].Id)}));n.sliders[t]=e.data.Slider[0],n.cerrar(),s["a"].swal("Slider actualizado","","success")})).catch((function(e){n.swalAlertError(e),n.cerrar()}))},eliminar:function(e){var t=this;s["a"].swal({title:"Estás seguro(a) que deseas borrar este slider?",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Eliminar",cancelButtonText:"Cancelar",confirmButtonColor:"#ff5252",cancelButtonColor:"#a1a1a1"}).then((function(n){n.isConfirmed&&s["a"].axios.delete("/api/sliders-bienvenidos/".concat(e),{headers:{"x-token":t.token}}).then((function(e){var n=t.sliders.findIndex((function(t){return t.Id===Number(e.data.id)}));t.sliders.splice(n,1),s["a"].swal("Slider Eliminado","","success")})).catch((function(e){t.swalAlertError(e),t.cerrar()}))}))}}},d=l,u=n("2877"),m=n("6544"),f=n.n(m),v=n("8336"),h=n("62ad"),b=n("a523"),p=n("132d"),g=n("0fd9"),I=n("1f4f"),k=Object(u["a"])(d,a,i,!1,null,null,null);t["default"]=k.exports;f()(k,{VBtn:v["a"],VCol:h["a"],VContainer:b["a"],VIcon:p["a"],VRow:g["a"],VSimpleTable:I["a"]})},"9c9e":function(e,t,n){"use strict";var a=n("5530"),i=(n("ac1f"),n("5319"),n("d3b7"),n("25f0"),n("1276"),n("a15b"),n("2b0e")),r=n("2f62");t["a"]={methods:Object(a["a"])(Object(a["a"])({},Object(r["d"])(["cerrarSesion"])),{},{formatNumberBySeparator:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".";return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,t)},swalAlertError:function(e){i["a"].swal({title:e.response.data.title,text:e.response.data.text,icon:"error"}),!e.response.data.code||"token-timed-out"!==e.response.data.code&&"no-token"!==e.response.data.code&&"invalid-user"!==e.response.data.code||this.cerrarSesion()},getDateByDateTime:function(e){var t=e.substring(0,e.indexOf("T")),n=t.split("-"),a=n.reverse();return a.join("-")},getTimeByDateTime:function(e){var t=e.substring(e.indexOf("T")+1),n=t.split(":");return n[0]+":"+n[1]},debounce:function(e,t){var n=null;return function(){clearTimeout(n);var a=arguments,i=this;n=setTimeout((function(){e.apply(i,a)}),t)}}})}},a523:function(e,t,n){"use strict";n("4de4"),n("b64b"),n("2ca0"),n("99af"),n("20f6"),n("4b85"),n("498a"),n("a15b");var a=n("2b0e");function i(e){return a["a"].extend({name:"v-".concat(e),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(t,n){var a=n.props,i=n.data,r=n.children;i.staticClass="".concat(e," ").concat(i.staticClass||"").trim();var s=i.attrs;if(s){i.attrs={};var o=Object.keys(s).filter((function(e){if("slot"===e)return!1;var t=s[e];return e.startsWith("data-")?(i.attrs[e]=t,!1):t||"string"===typeof t}));o.length&&(i.staticClass+=" ".concat(o.join(" ")))}return a.id&&(i.domProps=i.domProps||{},i.domProps.id=a.id),t(a.tag,i,r)}})}var r=n("d9f7");t["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(e,t){var n,a=t.props,i=t.data,s=t.children,o=i.attrs;return o&&(i.attrs={},n=Object.keys(o).filter((function(e){if("slot"===e)return!1;var t=o[e];return e.startsWith("data-")?(i.attrs[e]=t,!1):t||"string"===typeof t}))),a.id&&(i.domProps=i.domProps||{},i.domProps.id=a.id),e(a.tag,Object(r["a"])(i,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(n||[])}),s)}})}}]);
//# sourceMappingURL=chunk-3eb9efbe.d0593e5a.js.map