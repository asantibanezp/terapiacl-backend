(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02101622"],{"5ef1":function(t,a,i){"use strict";i.r(a);var n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("v-container",{staticClass:"noticia_container"},[i("title-ribbon",{attrs:{title:"Noticias Terapia"}}),t.render?i("div",{staticClass:"noticia_container__main"},[i("v-row",{staticClass:"noticia_row__titulo"},[i("v-col",{staticClass:"nrt_col"},[i("h1",[t._v(t._s(t.noticia.Titulo))])])],1),i("v-row",{staticClass:"noticia_row__cuerpo"},[i("v-col",{staticClass:"nrc_col"},[i("div",{staticClass:"nrc_col_main"},[i("v-img",{staticClass:"noticia-img",attrs:{src:"https://res.cloudinary.com/dkod5pdlc/image/upload/v"+t.noticia.VersionImagen+"/terapiacl/blog/"+t.noticia.Imagen}}),i("div",{staticClass:"float-splitter noticia-splitter"}),i("div",{staticClass:"noticias-datos-autor"},[i("p",{staticClass:"fecha"},[i("strong",[t._v("Fecha de Publicación: ")]),i("span",{domProps:{innerHTML:t._s(t.noticia.FechaFormat)}})]),i("p",{staticClass:"por"},[i("strong",[t._v("Por: ")]),i("span",{domProps:{innerHTML:t._s(t.noticia.Usuario)}})])]),i("p",{staticClass:"noticia-texto",domProps:{innerHTML:t._s(t.noticia.Texto)}})],1)])],1),i("splitter"),i("v-row",{staticClass:"noticia_row__nosotros"},[i("v-col",{staticClass:"nrn_col"},[i("div",{staticClass:"nrn_col_main"},[i("h2",[t._v("Nosotros")]),i("div",{staticClass:"float-splitter"}),i("p",[t._v(" Bienvenidos al Centro de Terapia del Comportamiento, un Centro de Salud Mental privado con más de 40 años al servicio de la comunidad y que reúne un equipo de Psicólogos, Psiquiatras, Neurólogos, Fonoaudiólogos, Psicopedagogos, Nutricionistas y Terapeutas Ocupacionales, donde cualquier persona puede acceder a servicios especializados de calidad a través de los distintos sistemas previsionales y por valores razonables al alcance de la mayoría. ")])])])],1),i("splitter"),i("v-row",{staticClass:"noticia_row__siguenos"},[i("v-col",{staticClass:"nrs_col"},[i("siguenos")],1)],1),i("splitter-volver")],1):i("div",[i("v-row",[i("v-col",{staticClass:"text-center"},[i("v-progress-circular",{attrs:{size:70,width:7,color:"success",indeterminate:""}})],1)],1)],1)],1)],1)},o=[],s=(i("d3b7"),i("3ca3"),i("ddb0"),i("ac1f"),i("5319"),i("2b0e")),e={name:"Noticia",components:{TitleRibbon:function(){return i.e("chunk-2ac98c3a").then(i.bind(null,"ec39"))},Splitter:function(){return i.e("chunk-fa4dce6c").then(i.bind(null,"893b"))},SplitterVolver:function(){return i.e("chunk-9a2a773c").then(i.bind(null,"6ec8"))},Siguenos:function(){return i.e("chunk-2d0aed64").then(i.bind(null,"0c83"))}},data:function(){return{noticia:"",render:!1}},created:function(){this.getNoticia()},methods:{getNoticia:function(){var t=this;s["a"].axios.get("/api/noticias/noticia/".concat(this.$route.params.id)).then((function(a){t.noticia=a.data.noticia[0],t.noticia.FechaFormat=t.noticia.Fecha.substring(0,t.noticia.Fecha.indexOf("T")),t.noticia.Texto=a.data.noticia[0].Texto.replace(/(\\r)*\\n/g,""),t.render=!0})).catch((function(t){console.log(t.response)}))}},metaInfo:function(){return{title:this.noticia.MetaTitle?"Noticias | ".concat(this.noticia.MetaTitle):" ... ",titleTemplate:"%s | Centro de Terapia del Comportamiento",htmlAttrs:{lang:"es",amp:!0},meta:this.noticia.MetaTags?this.noticia.MetaTags:[]}}},r=e,c=i("2877"),l=i("6544"),d=i.n(l),u=i("62ad"),p=i("a523"),v=i("adda"),f=i("490a"),m=i("0fd9"),g=Object(c["a"])(r,n,o,!1,null,null,null);a["default"]=g.exports;d()(g,{VCol:u["a"],VContainer:p["a"],VImg:v["a"],VProgressCircular:f["a"],VRow:m["a"]})},a523:function(t,a,i){"use strict";i("4de4"),i("b64b"),i("2ca0"),i("99af"),i("20f6"),i("4b85"),i("498a"),i("a15b");var n=i("2b0e");function o(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,i){var n=i.props,o=i.data,s=i.children;o.staticClass="".concat(t," ").concat(o.staticClass||"").trim();var e=o.attrs;if(e){o.attrs={};var r=Object.keys(e).filter((function(t){if("slot"===t)return!1;var a=e[t];return t.startsWith("data-")?(o.attrs[t]=a,!1):a||"string"===typeof a}));r.length&&(o.staticClass+=" ".concat(r.join(" ")))}return n.id&&(o.domProps=o.domProps||{},o.domProps.id=n.id),a(n.tag,o,s)}})}var s=i("d9f7");a["a"]=o("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var i,n=a.props,o=a.data,e=a.children,r=o.attrs;return r&&(o.attrs={},i=Object.keys(r).filter((function(t){if("slot"===t)return!1;var a=r[t];return t.startsWith("data-")?(o.attrs[t]=a,!1):a||"string"===typeof a}))),n.id&&(o.domProps=o.domProps||{},o.domProps.id=n.id),t(n.tag,Object(s["a"])(o,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(i||[])}),e)}})}}]);
//# sourceMappingURL=chunk-02101622.02e0fa52.js.map