(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bac0f"],{"390c":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"text-center"},[s("v-dialog",{attrs:{"max-width":"1100",persistent:""},model:{value:t.show,callback:function(a){t.show=a},expression:"show"}},[s("v-card",[s("v-container",{staticClass:"minicv-dialog__container",attrs:{fluid:""}},[s("v-row",[s("v-col",{staticClass:"minicv-main"},[s("v-col",{staticClass:"col-12 minicv-dialog-col__toolbar pr-0 pt-0 pl-0 pb-0"},[s("v-btn",{attrs:{icon:""},on:{click:function(a){return a.stopPropagation(),t.cerrar()}}},[s("v-icon",{attrs:{large:"",small:t.$vuetify.breakpoint.xs}},[t._v(" mdi-close ")])],1)],1),s("v-col",{staticClass:"col-12 minicv-dialog-col__header"},[s("div",{staticClass:"photo"},[s("div",{staticClass:"photo-main"},[s("v-img",{attrs:{"lazy-src":"https://res.cloudinary.com/dkod5pdlc/image/upload/f_auto,q_auto,c_scale/fotos/default.png",src:"https://res.cloudinary.com/dkod5pdlc/image/upload/f_auto,q_auto,c_scale/fotos/"+t.value.terapeuta.Rut+".png","max-width":"400"}})],1)]),s("div",{staticClass:"description"},[s("h2",[t._v(t._s(t.value.terapeuta.Nombres))]),s("div",{staticClass:"info"},[s("div",{staticClass:"cell__titulo-profesional"},[s("div",{staticClass:"cell-title"},[s("h4",[t._v("Título Profesional:")])]),s("div",{staticClass:"cell-text"},[s("span",[t._v(t._s(""+t.value.terapeuta.TituloProfesional))])])]),s("div",{staticClass:"cell__especializacion"},[s("div",{staticClass:"cell-title"},[s("h4",[t._v("Especializacion:")])]),s("div",{staticClass:"cell-text"},[s("span",[t._v(t._s(""+t.value.terapeuta.Especializacion))])])])])])]),s("v-col",{staticClass:"col-12 minicv-dialog-col__desempeno"},[s("p",[s("strong",[t._v("Desempeño Profesional: ")]),s("span",{domProps:{innerHTML:t._s(t.value.terapeuta.AreasDeInteres)}})])]),s("v-col",{staticClass:"col-12 minicv-dialog-col__separator"},[s("div")]),s("v-col",{staticClass:"col-12 minicv-dialog-col__problemas"},[s("div",{staticClass:"problemas-title"},[s("strong",[t._v("Problemas a tratar: ")])]),s("div",{staticClass:"problemas-breakdown"},[s("ul",t._l(t.value.terapeuta.Problemas,(function(a,e){return s("li",{key:e},[t._v(" "+t._s(a.NombreProblema)+" ")])})),0)])]),s("v-col",{staticClass:"col-12 minicv-dialog-col__separator"},[s("div")]),s("v-col",{staticClass:"col-12 minicv-dialog-col__etario"},[s("div",{staticClass:"etario-title"},[s("p",[s("strong",[t._v("Grupo Etario que Atiende: ")]),t._v(" "+t._s(t.value.terapeuta.RangosEtarios)+" ")])])]),s("v-col",{staticClass:"col-12 minicv-dialog-col__footer"},[s("v-row",[s("v-col",{staticClass:"col-12 col-sm-6 text-center text-sm-left"},[s("v-btn",{attrs:{href:"https://www.centrodeterapia.cl/horas_online",target:"_blank",color:"success mr-0 btn-reserva",small:t.$vuetify.breakpoint.xs}},[t._v(" Reservar Hora ")])],1),s("v-col",{staticClass:"col-12 col-sm-6 text-center text-sm-right"},[s("v-btn",{staticClass:"warning mr-0 btn-cerrar",attrs:{small:t.$vuetify.breakpoint.xs},on:{click:function(a){return a.stopPropagation(),t.cerrar()}}},[t._v(" Cerrar ")])],1)],1)],1)],1)],1)],1)],1)],1)],1)},l=[],i=(s("a9e3"),{name:"MiniCvDialog",props:{value:{active:{type:Boolean,default:!1},terapeuta:{type:Object,default:null},sucursal:{type:Number,default:null},default:null,type:Object}},computed:{show:{get:function(){return this.value.active},set:function(t){this.$emit("input",t.active)}}},methods:{cerrar:function(){this.value.active=!1}}}),o=i,c=s("2877"),r=s("6544"),n=s.n(r),v=s("8336"),u=s("b0af"),d=s("62ad"),p=s("a523"),_=s("169a"),m=s("132d"),f=s("adda"),C=s("0fd9"),b=Object(c["a"])(o,e,l,!1,null,null,null);a["default"]=b.exports;n()(b,{VBtn:v["a"],VCard:u["a"],VCol:d["a"],VContainer:p["a"],VDialog:_["a"],VIcon:m["a"],VImg:f["a"],VRow:C["a"]})}}]);
//# sourceMappingURL=chunk-2d0bac0f.16a0e54e.js.map