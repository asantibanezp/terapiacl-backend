(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3eb88aca"],{"1ea1":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{id:"dashboard",fluid:"",tag:"section"}},[a("show-dialog-slider-principal",e._b({on:{procesar:function(t){return e.procesar(t)},cerrar:function(t){return e.cerrar()}}},"show-dialog-slider-principal",{value:e.value},!1)),a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("base-material-card",{staticClass:"px-5 py-3 mb-5",attrs:{color:"success",icon:"mdi-view-carousel",inline:"",title:"Slider Principal"}},[a("v-row",[a("v-col",{staticClass:"pa-0 ma-0 text-right"},[a("v-btn",{staticClass:"ma-0",attrs:{color:"success"},on:{click:function(t){return e.abrirCrear()}}},[e._v(" Nuevo Slider ")])],1)],1),a("v-simple-table",[a("thead",[a("tr",[a("th",[e._v("Texto a mostrar")]),a("th",[e._v("Imagen")]),a("th",[e._v("Imagen Mobile")]),a("th",{staticClass:"text-right"},[e._v(" Fecha Cre. ")]),a("th",{staticClass:"text-right"},[e._v(" Fecha Mod. ")]),a("th",{staticClass:"text-right"},[e._v(" Orden ")]),a("th",[e._v("Acciones")])])]),a("tbody",e._l(e.sliders,(function(t,r){return a("tr",{key:r},[a("td",[e._v(e._s(t.Texto))]),a("td",[e._v(e._s(t.Imagen))]),a("td",[e._v(e._s(t.ImagenMobile))]),a("td",{staticClass:"text-right"},[e._v(" "+e._s(e.getDateByDateTime(t.FechaHoraCreacion))+" ")]),a("td",{staticClass:"text-right"},[e._v(" "+e._s(e.getDateByDateTime(t.FechaHoraModificacion))+" ")]),a("td",[e._v(e._s(t.Orden))]),a("td",{staticClass:"text-right"},[a("v-btn",{staticClass:"px-2 ml-1",attrs:{color:"warning","min-width":"0",small:""},on:{click:function(a){return e.abrirEditar(t.Id)}}},[a("v-icon",{attrs:{small:""},domProps:{textContent:e._s("mdi-pencil")}})],1),a("v-btn",{staticClass:"px-2 ml-1",attrs:{color:"error","min-width":"0",small:""},on:{click:function(a){return e.eliminar(t.Id)}}},[a("v-icon",{attrs:{small:""},domProps:{textContent:e._s("mdi-trash-can")}})],1)],1)])})),0)])],1)],1)],1)],1)},n=[],i=a("5530"),s=(a("d3b7"),a("3ca3"),a("ddb0"),a("c740"),a("a9e3"),a("a434"),a("2b0e")),o=a("2f62"),c=a("9c9e"),l={name:"SlidersPrincipal",components:{ShowDialogSliderPrincipal:function(){return Promise.resolve().then(a.bind(null,"9518"))}},mixins:[c["a"]],data:function(){return{sliders:"",value:{slider:{Id:!1,Texto:"",Imagen:"",ImagenMobile:"",HrefLink:"",ToLink:"",Orden:""},imagen:null,imagenMobile:null,nombreImagen:"",nombreImagenMobile:"",chkImagen:!1,chkImagenMobile:!1,loader:!1,active:!1}}},computed:Object(i["a"])({},Object(o["e"])(["token"])),created:function(){this.getSlidersPrincipal()},methods:{getSlidersPrincipal:function(){var e=this;s["a"].axios.get("/api/sliders-principal").then((function(t){e.sliders=t.data.result})).catch((function(e){console.log(e)}))},getSliderPrincipal:function(e){var t=this;s["a"].axios.get("/api/sliders-principal/".concat(e)).then((function(e){t.value.slider=e.data.result[0]})).catch((function(e){console.log(e)}))},abrirCrear:function(){this.value.active=!0,this.value.chkImagen=!0,this.value.chkImagenMobile=!0},abrirEditar:function(e){this.getSliderPrincipal(e),this.value.active=!0,this.value.chkImagen=!1,this.value.chkImagenMobile=!1},cerrar:function(){this.value={slider:{Id:!1,Texto:"",Imagen:"",ImagenMobile:"",HrefLink:"",ToLink:"",Orden:"",VersionImagen:""},imagen:null,imagenMobile:null,nombreImagen:"",nombreImagenMobile:"",chkImagen:!1,chkImagenMobile:!1,loader:!1,active:!1}},procesar:function(e){this.value.loader=!0;var t={"x-token":this.token},a=new FormData;a.append("id",e.slider.Id),a.append("texto",e.slider.Texto),a.append("hrefLink",e.slider.HrefLink),a.append("toLink",e.slider.ToLink),a.append("orden",e.slider.Orden),a.append("imagen",e.imagen),a.append("imagenMobile",e.imagenMobile),a.append("nombreImagen",e.nombreImagen),a.append("nombreImagenMobile",e.nombreImagenMobile),e.slider.Id?this.update(a,t):this.create(a,t)},create:function(e,t){var a=this;s["a"].axios.post("/api/sliders-principal",e,{headers:t}).then((function(e){a.sliders.unshift(e.data.Slider[0]),a.cerrar(),s["a"].swal("Slider creado","","success")})).catch((function(e){a.swalAlertError(e),a.cerrar()}))},update:function(e,t){var a=this;s["a"].axios.put("/api/sliders-principal",e,{headers:t}).then((function(e){var t=a.sliders.findIndex((function(t){return t.Id===Number(e.data.Slider[0].Id)}));a.sliders[t]=e.data.Slider[0],a.cerrar(),s["a"].swal("Slider actualizado","","success")})).catch((function(e){a.swalAlertError(e),a.cerrar()}))},eliminar:function(e){var t=this;s["a"].swal({title:"Estás seguro(a) que deseas borrar este slider?",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Eliminar",cancelButtonText:"Cancelar",confirmButtonColor:"#ff5252",cancelButtonColor:"#a1a1a1"}).then((function(a){a.isConfirmed&&s["a"].axios.delete("/api/sliders-principal/".concat(e),{headers:{"x-token":t.token}}).then((function(e){var a=t.sliders.findIndex((function(t){return t.Id===Number(e.data.id)}));t.sliders.splice(a,1),s["a"].swal("Slider Eliminado","","success")})).catch((function(e){t.swalAlertError(e),t.cerrar()}))}))}}},d=l,u=a("2877"),p=a("6544"),m=a.n(p),f=a("8336"),h=a("62ad"),v=a("a523"),g=a("132d"),b=a("0fd9"),x=a("1f4f"),I=Object(u["a"])(d,r,n,!1,null,null,null);t["default"]=I.exports;m()(I,{VBtn:f["a"],VCol:h["a"],VContainer:v["a"],VIcon:g["a"],VRow:b["a"],VSimpleTable:x["a"]})},"9c9e":function(e,t,a){"use strict";var r=a("5530"),n=(a("ac1f"),a("5319"),a("d3b7"),a("25f0"),a("1276"),a("a15b"),a("2b0e")),i=a("2f62");t["a"]={methods:Object(r["a"])(Object(r["a"])({},Object(i["d"])(["cerrarSesion"])),{},{formatNumberBySeparator:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".";return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,t)},swalAlertError:function(e){n["a"].swal({title:e.response.data.title,text:e.response.data.text,icon:"error"}),!e.response.data.code||"token-timed-out"!==e.response.data.code&&"no-token"!==e.response.data.code&&"invalid-user"!==e.response.data.code||this.cerrarSesion()},getDateByDateTime:function(e){var t=e.substring(0,e.indexOf("T")),a=t.split("-"),r=a.reverse();return r.join("-")},getTimeByDateTime:function(e){var t=e.substring(e.indexOf("T")+1),a=t.split(":");return a[0]+":"+a[1]},debounce:function(e,t){var a=null;return function(){clearTimeout(a);var r=arguments,n=this;a=setTimeout((function(){e.apply(n,r)}),t)}}})}},a523:function(e,t,a){"use strict";a("4de4"),a("b64b"),a("2ca0"),a("99af"),a("20f6"),a("4b85"),a("498a"),a("a15b");var r=a("2b0e");function n(e){return r["a"].extend({name:"v-".concat(e),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(t,a){var r=a.props,n=a.data,i=a.children;n.staticClass="".concat(e," ").concat(n.staticClass||"").trim();var s=n.attrs;if(s){n.attrs={};var o=Object.keys(s).filter((function(e){if("slot"===e)return!1;var t=s[e];return e.startsWith("data-")?(n.attrs[e]=t,!1):t||"string"===typeof t}));o.length&&(n.staticClass+=" ".concat(o.join(" ")))}return r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),t(r.tag,n,i)}})}var i=a("d9f7");t["a"]=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(e,t){var a,r=t.props,n=t.data,s=t.children,o=n.attrs;return o&&(n.attrs={},a=Object.keys(o).filter((function(e){if("slot"===e)return!1;var t=o[e];return e.startsWith("data-")?(n.attrs[e]=t,!1):t||"string"===typeof t}))),r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),e(r.tag,Object(i["a"])(n,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(a||[])}),s)}})}}]);
//# sourceMappingURL=chunk-3eb88aca.600211a3.js.map