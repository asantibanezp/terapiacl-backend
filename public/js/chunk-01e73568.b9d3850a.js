(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01e73568"],{a523:function(t,e,a){"use strict";a("4de4"),a("b64b"),a("2ca0"),a("99af"),a("20f6"),a("4b85"),a("498a"),a("a15b");var n=a("2b0e");function i(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var n=a.props,i=a.data,s=a.children;i.staticClass="".concat(t," ").concat(i.staticClass||"").trim();var r=i.attrs;if(r){i.attrs={};var o=Object.keys(r).filter((function(t){if("slot"===t)return!1;var e=r[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}));o.length&&(i.staticClass+=" ".concat(o.join(" ")))}return n.id&&(i.domProps=i.domProps||{},i.domProps.id=n.id),e(n.tag,i,s)}})}var s=a("d9f7");e["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,n=e.props,i=e.data,r=e.children,o=i.attrs;return o&&(i.attrs={},a=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(i.domProps=i.domProps||{},i.domProps.id=n.id),t(n.tag,Object(s["a"])(i,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(a||[])}),r)}})},bda7:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height justify-center",attrs:{id:"pricing",tag:"section"}},[a("v-row",{staticClass:"text-center",attrs:{align:"center",justify:"center"}},[a("v-col",{staticClass:"mb-10",attrs:{cols:"12"}},[a("pages-heading",{staticClass:"mb-12"},[t._v(" Pick the best plan for you ")]),a("div",{staticClass:"display-1 font-weight-light grey--text text--lighten-2"},[t._v(" You have Free Unlimited Updates and Premium Support on "),a("br",{staticClass:"hidden-sm-and-down"}),t._v("each package. ")])],1),t._l(t.plans,(function(e,n){return[a("v-col",{key:n,staticClass:"d-flex",attrs:{cols:"12",sm:"6",md:"3"}},[a("pages-plan-card",{attrs:{plan:e}})],1),1===n&&t.$vuetify.breakpoint.smAndDown&&n+1!==t.plans.length?a("v-col",{key:"divider-"+n,staticClass:"pa-6",attrs:{cols:"12"}},[a("v-divider")],1):t._e()]}))],2)],1)},i=[],s=(a("d3b7"),a("3ca3"),a("ddb0"),{name:"PagesPricing",components:{PagesHeading:function(){return a.e("chunk-2d0b2927").then(a.bind(null,"254b"))},PagesPlanCard:function(){return a.e("chunk-446ee19c").then(a.bind(null,"5d13"))}},data:function(){return{plans:[{heading:"Freelancer",icon:"mdi-sofa",title:"Free",text:"This is good if your company size is between 2 and 10 Persons."},{best:!0,heading:"Small Company",icon:"mdi-home",title:"29$",text:"This is good if your company size is between 2 and 10 Persons."},{heading:"Medium Company",icon:"mdi-domain",title:"69$",text:"This is good if your company size is between 11 and 99 Persons."},{heading:"Extra Pack",icon:"mdi-bank",title:"159$",text:"This is good if your company size is 99+ or greater Persons."}]}}}),r=s,o=a("2877"),c=a("6544"),d=a.n(c),l=a("62ad"),u=a("a523"),p=a("ce7e"),f=a("0fd9"),g=Object(o["a"])(r,n,i,!1,null,null,null);e["default"]=g.exports;d()(g,{VCol:l["a"],VContainer:u["a"],VDivider:p["a"],VRow:f["a"]})}}]);
//# sourceMappingURL=chunk-01e73568.b9d3850a.js.map