(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3408979e"],{"2a7f":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n("71d9"),i=n("80d2"),r=Object(i["j"])("v-toolbar__title"),s=Object(i["j"])("v-toolbar__items");a["a"]},"4c72":function(t,e,n){},"5e23":function(t,e,n){},"71d9":function(t,e,n){"use strict";var a=n("3835"),i=n("5530"),r=(n("a9e3"),n("0481"),n("5e23"),n("8dd9")),s=n("adda"),o=n("80d2"),c=n("d9bd");e["a"]=r["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"},tile:{type:Boolean,default:!0}},data:function(){return{isExtended:!1}},computed:{computedHeight:function(){var t=this.computedContentHeight;if(!this.isExtended)return t;var e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight:function(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes:function(){return Object(i["a"])(Object(i["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent})},isCollapsed:function(){return this.collapse},isProminent:function(){return this.prominent},styles:function(){return Object(i["a"])(Object(i["a"])({},this.measurableStyles),{},{height:Object(o["g"])(this.computedHeight)})}},created:function(){var t=this,e=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];e.forEach((function(e){var n=Object(a["a"])(e,2),i=n[0],r=n[1];t.$attrs.hasOwnProperty(i)&&Object(c["a"])(i,r,t)}))},methods:{genBackground:function(){var t={height:Object(o["g"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(s["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(o["g"])(this.computedContentHeight)}},Object(o["s"])(this))},genExtension:function(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(o["g"])(this.extensionHeight)}},Object(o["s"])(this,"extension"))}},render:function(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;var e=[this.genContent()],n=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,n,e)}})},a523:function(t,e,n){"use strict";n("4de4"),n("b64b"),n("2ca0"),n("99af"),n("20f6"),n("4b85"),n("498a"),n("a15b");var a=n("2b0e");function i(t){return a["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,n){var a=n.props,i=n.data,r=n.children;i.staticClass="".concat(t," ").concat(i.staticClass||"").trim();var s=i.attrs;if(s){i.attrs={};var o=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}));o.length&&(i.staticClass+=" ".concat(o.join(" ")))}return a.id&&(i.domProps=i.domProps||{},i.domProps.id=a.id),e(a.tag,i,r)}})}var r=n("d9f7");e["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var n,a=e.props,i=e.data,s=e.children,o=i.attrs;return o&&(i.attrs={},n=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(i.domProps=i.domProps||{},i.domProps.id=a.id),t(a.tag,Object(r["a"])(i,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(n||[])}),s)}})},aff5:function(t,e,n){var a=n("23e7");a({target:"Number",stat:!0},{MAX_SAFE_INTEGER:9007199254740991})},c4b5:function(t,e,n){"use strict";n("dbb2")},d13b:function(t,e,n){},dbb2:function(t,e,n){},e89c:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{id:"calendar",fluid:"",tag:"section"}},[n("base-v-component",{attrs:{heading:"Calendar",link:"components/calendars"}}),n("v-row",[n("v-col",{staticClass:"mx-auto",attrs:{cols:"12",md:"10"}},[n("v-card",[n("v-toolbar",{attrs:{flat:""}},[n("v-toolbar-title",[t._v("August 2019")]),n("v-spacer"),t._l(t.types,(function(e,a){return n("calendar-btn",{key:a,on:{click:function(n){t.type=e}}},[t._v(" "+t._s(e)+" ")])})),n("v-spacer"),n("calendar-btn",{on:{click:function(e){return t.$refs.calendar.prev()}}},[n("v-icon",[t._v("mdi-chevron-left")])],1),n("calendar-btn",{on:{click:function(e){return t.$refs.calendar.next()}}},[n("v-icon",[t._v("mdi-chevron-right")])],1)],2),n("v-sheet",{staticClass:"mt-5",attrs:{height:"600",flat:""}},[n("v-calendar",{ref:"calendar",attrs:{events:t.events,type:t.type,"event-color":"primary",now:"2019-01-08"},model:{value:t.calendar,callback:function(e){t.calendar=e},expression:"calendar"}})],1)],1)],1)],1)],1)},i=[],r=n("5530"),s=(n("a9e3"),n("8336")),o={name:"DashboardCalendar",components:{CalendarBtn:{extends:s["a"],props:{color:{type:String,default:"secondary"},minWidth:{type:Number,default:0},rounded:{type:Boolean,default:!0}},computed:{classes:function(){return Object(r["a"])(Object(r["a"])({},s["a"].options.computed.classes.call(this)),{},{"mx-1":!0,"text-lowercase":!0})}}}},data:function(){return{calendar:"2019-01-08",disabled:!0,events:[{name:"Vacation",start:"2018-12-30",end:"2019-01-02"},{name:"Meeting",start:"2019-01-07"},{name:"30th Birthday",start:"2019-01-03"},{name:"New Year",start:"2019-01-01"},{name:"Conference",start:"2019-01-21"},{name:"Hackathon",start:"2019-01-30",end:"2019-02-01"}],focus:"",type:"month",types:["month","week","day"]}}},c=o,l=(n("c4b5"),n("2877")),d=n("6544"),u=n.n(d),h=(n("d81d"),n("99af"),n("159b"),n("4de4"),n("aff5"),n("d13b"),n("5607")),v=(n("fb6a"),n("58df")),f=n("a9ad"),p=n("dfda"),m=n("ade3"),y=n("2b0e"),g=y["a"].extend({name:"mouse",methods:{getDefaultMouseEventHandlers:function(t,e){var n;return this.getMouseEventHandlers((n={},Object(m["a"])(n,"click"+t,{event:"click"}),Object(m["a"])(n,"contextmenu"+t,{event:"contextmenu",prevent:!0,result:!1}),Object(m["a"])(n,"mousedown"+t,{event:"mousedown"}),Object(m["a"])(n,"mousemove"+t,{event:"mousemove"}),Object(m["a"])(n,"mouseup"+t,{event:"mouseup"}),Object(m["a"])(n,"mouseenter"+t,{event:"mouseenter"}),Object(m["a"])(n,"mouseleave"+t,{event:"mouseleave"}),Object(m["a"])(n,"touchstart"+t,{event:"touchstart"}),Object(m["a"])(n,"touchmove"+t,{event:"touchmove"}),Object(m["a"])(n,"touchend"+t,{event:"touchend"}),n),e)},getMouseEventHandlers:function(t,e){var n=this,a={},i=function(i){var r=t[i];if(!n.$listeners[i])return"continue";var s=r.passive?"&":(r.once?"~":"")+(r.capture?"!":""),o=s+r.event,c=function(t){var a=t;return(void 0===r.button||a.buttons>0&&a.button===r.button)&&(r.prevent&&t.preventDefault(),r.stop&&t.stopPropagation(),n.$emit(i,e(t))),r.result};o in a?Array.isArray(a[o])?a[o].push(c):a[o]=[a[o],c]:a[o]=c};for(var r in t)i(r);return a}}}),b=n("7560"),O=n("ea4a"),k=y["a"].extend({name:"times",props:{now:{type:String,validator:O["z"]}},data:function(){return{times:{now:Object(O["s"])("0000-00-00 00:00"),today:Object(O["s"])("0000-00-00")}}},computed:{parsedNow:function(){return this.now?Object(O["s"])(this.now):null}},watch:{parsedNow:"updateTimes"},created:function(){this.updateTimes(),this.setPresent()},methods:{setPresent:function(){this.times.now.present=this.times.today.present=!0,this.times.now.past=this.times.today.past=!1,this.times.now.future=this.times.today.future=!1},updateTimes:function(){var t=this.parsedNow||this.getNow();this.updateDay(t,this.times.now),this.updateTime(t,this.times.now),this.updateDay(t,this.times.today)},getNow:function(){return Object(O["q"])(new Date)},updateDay:function(t,e){t.date!==e.date&&(e.year=t.year,e.month=t.month,e.day=t.day,e.weekday=t.weekday,e.date=t.date)},updateTime:function(t,e){t.time!==e.time&&(e.hour=t.hour,e.minute=t.minute,e.time=t.time)}}}),E=n("dc22"),j={base:{start:{type:String,validate:O["z"],default:function(){return Object(O["q"])(new Date).date}},end:{type:String,validate:O["z"]},weekdays:{type:Array,default:function(){return[0,1,2,3,4,5,6]}},hideHeader:{type:Boolean,default:!1},shortWeekdays:{type:Boolean,default:!0},weekdayFormat:{type:Function,default:null},dayFormat:{type:Function,default:null}},intervals:{maxDays:{type:Number,default:7},shortIntervals:{type:Boolean,default:!0},intervalHeight:{type:[Number,String],default:40,validate:C},intervalMinutes:{type:[Number,String],default:60,validate:C},firstInterval:{type:[Number,String],default:0,validate:C},intervalCount:{type:[Number,String],default:24,validate:C},intervalFormat:{type:Function,default:null},intervalStyle:{type:Function,default:null},showIntervalLabel:{type:Function,default:null}},weeks:{minWeeks:{validate:C,default:1},shortMonths:{type:Boolean,default:!0},showMonthOnFirst:{type:Boolean,default:!0},monthFormat:{type:Function,default:null}},calendar:{type:{type:String,default:"month"},value:{type:String,validate:O["z"]}},events:{events:{type:Array,default:function(){return[]}},eventStart:{type:String,default:"start"},eventEnd:{type:String,default:"end"},eventHeight:{type:Number,default:20},eventColor:{type:[String,Function],default:"secondary"},eventTextColor:{type:[String,Function],default:"white"},eventName:{type:[String,Function],default:"name"},eventOverlapThreshold:{type:Number,default:60},eventMore:{type:Boolean,default:!0},eventMoreText:{type:String,default:"$vuetify.calendar.moreEvents"},eventRipple:{type:[Boolean,Object],default:null},eventMarginBottom:{type:Number,default:1}}};function C(t){return isFinite(parseInt(t))}var w=Object(v["a"])(f["a"],p["a"],g,b["a"],k).extend({name:"calendar-base",directives:{Resize:E["a"]},props:j.base,computed:{weekdaySkips:function(){return Object(O["o"])(this.weekdays)},weekdaySkipsReverse:function(){var t=this.weekdaySkips.slice();return t.reverse(),t},parsedStart:function(){return Object(O["s"])(this.start)},parsedEnd:function(){return this.end?Object(O["s"])(this.end):this.parsedStart},days:function(){return Object(O["e"])(this.parsedStart,this.parsedEnd,this.times.today,this.weekdaySkips)},dayFormatter:function(){if(this.dayFormat)return this.dayFormat;var t={timeZone:"UTC",day:"numeric"};return Object(O["g"])(this.currentLocale,(function(e,n){return t}))},weekdayFormatter:function(){if(this.weekdayFormat)return this.weekdayFormat;var t={timeZone:"UTC",weekday:"long"},e={timeZone:"UTC",weekday:"short"};return Object(O["g"])(this.currentLocale,(function(n,a){return a?e:t}))}},methods:{getRelativeClasses:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return{"v-present":t.present,"v-past":t.past,"v-future":t.future,"v-outside":e}},getStartOfWeek:function(t){return Object(O["m"])(t,this.weekdays,this.times.today)},getEndOfWeek:function(t){return Object(O["k"])(t,this.weekdays,this.times.today)},getFormatter:function(t){return Object(O["g"])(this.locale,(function(e,n){return t}))}}}),S=n("80d2");function x(t,e,n,a){if(!(n in t))throw new Error("The "+n+" property is required on all events to be a valid timestamp in the format YYYY-MM-DD or YYYY-MM-DD hh:mm");var i=Object(O["s"])(t[n]),r=t[a]?Object(O["s"])(t[a]):i,s=Object(O["i"])(i),o=Object(O["n"])(i),c=Object(O["i"])(r),l=Object(O["n"])(r),d=!i.hasTime;return{input:t,start:i,startIdentifier:s,startTimestampIdentifier:o,end:r,endIdentifier:c,endTimestampIdentifier:l,allDay:d,index:e}}function T(t,e){return e>=t.startIdentifier&&e<=t.endIdentifier}var $=w.extend({name:"calendar-with-events",directives:{ripple:h["a"]},props:j.events,computed:{noEvents:function(){return 0===this.events.length},parsedEvents:function(){var t=this;return this.events.map((function(e,n){return x(e,n,t.eventStart,t.eventEnd)}))},eventColorFunction:function(){var t=this;return"function"===typeof this.eventColor?this.eventColor:function(){return t.eventColor}},eventTextColorFunction:function(){var t=this;return"function"===typeof this.eventTextColor?this.eventTextColor:function(){return t.eventTextColor}},eventNameFunction:function(){var t=this;return"function"===typeof this.eventName?this.eventName:function(e,n){var a=Object(S["n"])(e.input[t.eventName]);if(e.start.hasTime){if(n){var i=e.start.hour<12&&e.end.hour>=12,r=t.formatTime(e.start,i),s=t.formatTime(e.end,!0);return"<strong>".concat(a,"</strong><br>").concat(r," - ").concat(s)}var o=t.formatTime(e.start,!0);return"<strong>".concat(o,"</strong> ").concat(a)}return a}}},methods:{formatTime:function(t,e){var n=e?t.hour<12?"a":"p":"",a=t.hour%12||12,i=t.minute;return i>0?i<10?"".concat(a,":0").concat(i).concat(n):"".concat(a,":").concat(i).concat(n):"".concat(a).concat(n)},updateEventVisibility:function(){if(!this.noEvents&&this.eventMore){var t=this.eventHeight,e=this.getEventsMap();for(var n in e){var a=e[n],i=a.parent,r=a.events,s=a.more;if(!s)break;for(var o=i.getBoundingClientRect(),c=r.length-1,l=!1,d=0,u=0;u<=c;u++){if(!l){var h=r[u].getBoundingClientRect();l=h.bottom+t>o.bottom&&u!==c||"none"===r[u].style.display}if(l){var v=r[u].getAttribute("data-event");this.hideEvents(v),d++}}l?(s.style.display="",s.innerHTML=this.$vuetify.lang.t(this.eventMoreText,d)):s.style.display="none"}}},hideEvents:function(t){var e=this.$refs.events;e.forEach((function(e){e.getAttribute("data-event")===t&&(e.style.display="none")}))},getEventsMap:function(){var t={},e=this.$refs.events;return e&&e.forEach?(e.forEach((function(e){var n=e.getAttribute("data-date");e.parentElement&&n&&(n in t||(t[n]={parent:e.parentElement,more:null,events:[]}),e.getAttribute("data-more")?t[n].more=e:(t[n].events.push(e),e.style.display=""))})),t):t},genDayEvent:function(t,e,n){var a=t.offset,i=t.event,r=this.eventHeight,s=this.eventMarginBottom,o=(a-e)*(r+s),c=Object(O["i"])(n),l=c===i.startIdentifier,d=c===i.endIdentifier,u={event:i.input,day:n,outside:n.outside,start:l,end:d,timed:!1};return this.genEvent(i,u,l||0===n.index,!1,{staticClass:"v-event",class:{"v-event-start":l,"v-event-end":d},style:{height:"".concat(r,"px"),top:"".concat(o,"px"),"margin-bottom":"".concat(s,"px")},attrs:{"data-date":n.date,"data-event":i.index},key:i.index,ref:"events",refInFor:!0})},genTimedEvent:function(t,e,n){var a=t.offset,i=t.event,r=t.columnCount,s=t.column,o=Object(O["i"])(n),c=i.startIdentifier>=o,l=i.endIdentifier>o,d=c?n.timeToY(i.start):0,u=l?n.timeToY(1440):n.timeToY(i.end),h=Math.max(this.eventHeight,u-d),v=-1===r?5*a:100*s/r,f=-1===r?0:Math.max(0,100*(r-s-2)/r+10),p={event:i.input,day:n,outside:n.outside,start:c,end:l,timed:!0};return this.genEvent(i,p,!0,!0,{staticClass:"v-event-timed",style:{top:"".concat(d,"px"),height:"".concat(h,"px"),left:"".concat(v,"%"),right:"".concat(f,"%")}})},genEvent:function(t,e,n,a,i){var s=this.$scopedSlots.event,o=this.eventTextColorFunction(t.input),c=this.eventColorFunction(t.input);return this.$createElement("div",this.setTextColor(o,this.setBackgroundColor(c,Object(r["a"])({on:this.getDefaultMouseEventHandlers(":event",(function(t){return Object(r["a"])(Object(r["a"])({},e),{},{nativeEvent:t})})),directives:[{name:"ripple",value:null==this.eventRipple||this.eventRipple}]},i))),s?s(e):n?[this.genName(t,a)]:void 0)},genName:function(t,e){return this.$createElement("div",{staticClass:"pl-1",domProps:{innerHTML:this.eventNameFunction(t,e)}})},genMore:function(t){var e=this;return this.$createElement("div",{staticClass:"v-event-more pl-1",attrs:{"data-date":t.date,"data-more":1},directives:[{name:"ripple",value:null==this.eventRipple||this.eventRipple}],on:{click:function(){return e.$emit("click:more",t)}},style:{display:"none"},ref:"events",refInFor:!0})},getEventsForDay:function(t){var e=Object(O["i"])(t);return this.parsedEvents.filter((function(t){return T(t,e)}))},getEventsForDayAll:function(t){var e=Object(O["i"])(t);return this.parsedEvents.filter((function(t){return t.allDay&&T(t,e)}))},getEventsForDayTimed:function(t){var e=Object(O["i"])(t);return this.parsedEvents.filter((function(t){return!t.allDay&&T(t,e)}))},isSameColumn:function(t,e){var n=Object(O["r"])(t.event.start),a=Object(O["r"])(e.event.start),i=n-a,r=i<0?-i:i;return r<this.eventOverlapThreshold},isOverlapping:function(t,e){var n=Object(O["r"])(t.event.start),a=Object(O["r"])(e.event.start);if(t.offset<e.offset&&a<n){var i=n+this.eventOverlapThreshold,r=Object(O["r"])(e.event.end);return!(n>=r||i<=a)}return!1},getScopedSlots:function(){var t=this;if(this.noEvents)return this.$scopedSlots;var e=this.parsedEvents,n=e.map((function(t){return-1})),a=this.weekdays[0],i=function(t){if(t.weekday===a)for(var e=0;e<n.length;e++)n[e]=-1},s=function(t,e){var a=n[t.event.index];if(-1===a){var i=Number.MAX_SAFE_INTEGER,r=-1;e.forEach((function(t){var e=n[t.event.index];-1!==e&&(i=Math.min(i,e),r=Math.max(r,e))})),a=i>0&&-1!==r?i-1:r+1,n[t.event.index]=a}return a},o=function(e,a){var i=e.map((function(t){return{event:t,offset:0,columnCount:-1,column:-1}}));return i.sort((function(t,e){return t.event.startTimestampIdentifier-e.event.startTimestampIdentifier})),a?(i.forEach((function(e){if(-1===e.columnCount){var n=[];i.forEach((function(a){-1===a.columnCount&&t.isSameColumn(e,a)&&n.push(a)})),n.length>1&&n.forEach((function(t,e){t.column=e,t.columnCount=n.length}))}})),i.forEach((function(t){-1===t.columnCount&&(i.forEach((function(e){var a=n[e.event.index];-1!==a&&e.event.endTimestampIdentifier<=t.event.startTimestampIdentifier&&(n[e.event.index]=-1)})),t.offset=s(t,i))})),i.forEach((function(e){if(-1===e.columnCount){var n=[e];i.forEach((function(a){a!==e&&-1===a.columnCount&&t.isOverlapping(e,a)&&n.push(a)})),n.length>1&&n.forEach((function(t,e){t.column=e,t.columnCount=n.length}))}}))):i.forEach((function(t){t.offset=s(t,i)})),i.sort((function(t,e){return t.offset-e.offset||t.column-e.column})),i},c=function(t,e,n,a){i(t);var r=e(t);return 0===r.length?void 0:o(r,a).map((function(e,a){return n(e,a,t)}))};return Object(r["a"])(Object(r["a"])({},this.$scopedSlots),{},{day:function(e){var n=c(e,t.getEventsForDay,t.genDayEvent,!1);return n&&n.length>0&&t.eventMore&&n.push(t.genMore(e)),n},"day-header":function(e){return c(e,t.getEventsForDayAll,t.genDayEvent,!1)},"day-body":function(e){return[t.$createElement("div",{staticClass:"v-event-timed-container"},c(e,t.getEventsForDayTimed,t.genTimedEvent,!0))]}})}}}),D=(n("4c72"),n("2909")),I=n("afdd"),H=w.extend({name:"v-calendar-weekly",props:j.weeks,computed:{staticClass:function(){return"v-calendar-weekly"},classes:function(){return this.themeClasses},parsedMinWeeks:function(){return parseInt(this.minWeeks)},days:function(){var t=this.parsedMinWeeks*this.weekdays.length,e=this.getStartOfWeek(this.parsedStart),n=this.getEndOfWeek(this.parsedEnd);return Object(O["e"])(e,n,this.times.today,this.weekdaySkips,Number.MAX_SAFE_INTEGER,t)},todayWeek:function(){var t=this.times.today,e=this.getStartOfWeek(t),n=this.getEndOfWeek(t);return Object(O["e"])(e,n,t,this.weekdaySkips,this.weekdays.length,this.weekdays.length)},monthFormatter:function(){if(this.monthFormat)return this.monthFormat;var t={timeZone:"UTC",month:"long"},e={timeZone:"UTC",month:"short"};return Object(O["g"])(this.currentLocale,(function(n,a){return a?e:t}))}},methods:{isOutside:function(t){var e=Object(O["i"])(t);return e<Object(O["i"])(this.parsedStart)||e>Object(O["i"])(this.parsedEnd)},genHead:function(){return this.$createElement("div",{staticClass:"v-calendar-weekly__head"},this.genHeadDays())},genHeadDays:function(){return this.todayWeek.map(this.genHeadDay)},genHeadDay:function(t,e){var n=this.isOutside(this.days[e]),a=t.present?this.color:void 0;return this.$createElement("div",this.setTextColor(a,{key:t.date,staticClass:"v-calendar-weekly__head-weekday",class:this.getRelativeClasses(t,n)}),this.weekdayFormatter(t,this.shortWeekdays))},genWeeks:function(){for(var t=this.days,e=this.weekdays.length,n=[],a=0;a<t.length;a+=e)n.push(this.genWeek(t.slice(a,a+e)));return n},genWeek:function(t){return this.$createElement("div",{key:t[0].date,staticClass:"v-calendar-weekly__week"},t.map(this.genDay))},genDay:function(t,e){var n=this.isOutside(t),a=this.$scopedSlots.day,i=Object(r["a"])({outside:n,index:e},t);return this.$createElement("div",{key:t.date,staticClass:"v-calendar-weekly__day",class:this.getRelativeClasses(t,n),on:this.getDefaultMouseEventHandlers(":day",(function(e){return t}))},[this.genDayLabel(t),a?a(i):""])},genDayLabel:function(t){var e=this.$scopedSlots["day-label"];return this.$createElement("div",{staticClass:"v-calendar-weekly__day-label"},[e?e(t):this.genDayLabelButton(t)])},genDayLabelButton:function(t){var e=t.present?this.color:"transparent",n=1===t.day&&this.showMonthOnFirst;return this.$createElement(I["a"],{props:{color:e,fab:!0,depressed:!0,small:!0},on:this.getMouseEventHandlers({"click:date":{event:"click",stop:!0},"contextmenu:date":{event:"contextmenu",stop:!0,prevent:!0,result:!1}},(function(e){return t}))},n?this.monthFormatter(t,this.shortMonths)+" "+this.dayFormatter(t,!1):this.dayFormatter(t,!1))},genDayMonth:function(t){var e=t.present?this.color:void 0,n=this.$scopedSlots["day-month"];return this.$createElement("div",this.setTextColor(e,{staticClass:"v-calendar-weekly__day-month"}),n?n(t):this.monthFormatter(t,this.shortMonths))}},render:function(t){return t("div",{staticClass:this.staticClass,class:this.classes,nativeOn:{dragstart:function(t){t.preventDefault()}}},[this.hideHeader?"":this.genHead()].concat(Object(D["a"])(this.genWeeks())))}}),_=H.extend({name:"v-calendar-monthly",computed:{staticClass:function(){return"v-calendar-monthly v-calendar-weekly"},parsedStart:function(){return Object(O["l"])(Object(O["s"])(this.start))},parsedEnd:function(){return Object(O["j"])(Object(O["s"])(this.end))}}}),F=(n("fcf4"),w.extend({name:"calendar-with-intervals",props:j.intervals,computed:{parsedFirstInterval:function(){return parseInt(this.firstInterval)},parsedIntervalMinutes:function(){return parseInt(this.intervalMinutes)},parsedIntervalCount:function(){return parseInt(this.intervalCount)},parsedIntervalHeight:function(){return parseFloat(this.intervalHeight)},firstMinute:function(){return this.parsedFirstInterval*this.parsedIntervalMinutes},bodyHeight:function(){return this.parsedIntervalCount*this.parsedIntervalHeight},days:function(){return Object(O["e"])(this.parsedStart,this.parsedEnd,this.times.today,this.weekdaySkips,this.maxDays)},intervals:function(){var t=this.days,e=this.parsedFirstInterval,n=this.parsedIntervalMinutes,a=this.parsedIntervalCount,i=this.times.now;return t.map((function(t){return Object(O["f"])(t,e,n,a,i)}))},intervalFormatter:function(){if(this.intervalFormat)return this.intervalFormat;var t={timeZone:"UTC",hour12:!0,hour:"2-digit",minute:"2-digit"},e={timeZone:"UTC",hour12:!0,hour:"numeric",minute:"2-digit"},n={timeZone:"UTC",hour12:!0,hour:"numeric"};return Object(O["g"])(this.currentLocale,(function(a,i){return i?0===a.minute?n:e:t}))}},methods:{showIntervalLabelDefault:function(t){var e=this.intervals[0][0],n=e.hour===t.hour&&e.minute===t.minute;return!n&&0===t.minute},intervalStyleDefault:function(t){},getTimestampAtEvent:function(t,e){var n=Object(O["d"])(e),a=t.currentTarget.getBoundingClientRect(),i=this.firstMinute,r=t,s=t,o=r.changedTouches||r.touches,c=o&&o[0]?o[0].clientY:s.clientY,l=(c-a.top)/this.parsedIntervalHeight,d=Math.floor(l*this.parsedIntervalMinutes),u=i+d;return Object(O["w"])(n,u,this.times.now)},getSlotScope:function(t){var e=Object(O["d"])(t);return e.timeToY=this.timeToY,e.minutesToPixels=this.minutesToPixels,e},scrollToTime:function(t){var e=this.timeToY(t),n=this.$refs.scrollArea;return!(!1===e||!n)&&(n.scrollTop=e,!0)},minutesToPixels:function(t){return t/this.parsedIntervalMinutes*this.parsedIntervalHeight},timeToY:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Object(O["r"])(t);if(!1===n)return!1;var a=this.firstMinute,i=this.parsedIntervalCount*this.parsedIntervalMinutes,r=(n-a)/i,s=r*this.bodyHeight;return e&&(s<0&&(s=0),s>this.bodyHeight&&(s=this.bodyHeight)),s}}})),M=F.extend({name:"v-calendar-daily",directives:{Resize:E["a"]},data:function(){return{scrollPush:0}},computed:{classes:function(){return Object(r["a"])({"v-calendar-daily":!0},this.themeClasses)}},mounted:function(){this.init()},methods:{init:function(){this.$nextTick(this.onResize)},onResize:function(){this.scrollPush=this.getScrollPush()},getScrollPush:function(){var t=this.$refs.scrollArea,e=this.$refs.pane;return t&&e?t.offsetWidth-e.offsetWidth:0},genHead:function(){return this.$createElement("div",{staticClass:"v-calendar-daily__head",style:{marginRight:this.scrollPush+"px"}},[this.genHeadIntervals()].concat(Object(D["a"])(this.genHeadDays())))},genHeadIntervals:function(){return this.$createElement("div",{staticClass:"v-calendar-daily__intervals-head"})},genHeadDays:function(){return this.days.map(this.genHeadDay)},genHeadDay:function(t,e){var n=this,a=this.$scopedSlots["day-header"];return this.$createElement("div",{key:t.date,staticClass:"v-calendar-daily_head-day",class:this.getRelativeClasses(t),on:this.getDefaultMouseEventHandlers(":day",(function(e){return n.getSlotScope(t)}))},[this.genHeadWeekday(t),this.genHeadDayLabel(t),a?a(Object(r["a"])(Object(r["a"])({},t),{},{index:e})):""])},genHeadWeekday:function(t){var e=t.present?this.color:void 0;return this.$createElement("div",this.setTextColor(e,{staticClass:"v-calendar-daily_head-weekday"}),this.weekdayFormatter(t,this.shortWeekdays))},genHeadDayLabel:function(t){return this.$createElement("div",{staticClass:"v-calendar-daily_head-day-label"},[this.genHeadDayButton(t)])},genHeadDayButton:function(t){var e=t.present?this.color:"transparent";return this.$createElement(I["a"],{props:{color:e,fab:!0,depressed:!0},on:this.getMouseEventHandlers({"click:date":{event:"click",stop:!0},"contextmenu:date":{event:"contextmenu",stop:!0,prevent:!0,result:!1}},(function(e){return t}))},this.dayFormatter(t,!1))},genBody:function(){return this.$createElement("div",{staticClass:"v-calendar-daily__body"},[this.genScrollArea()])},genScrollArea:function(){return this.$createElement("div",{ref:"scrollArea",staticClass:"v-calendar-daily__scroll-area"},[this.genPane()])},genPane:function(){return this.$createElement("div",{ref:"pane",staticClass:"v-calendar-daily__pane",style:{height:Object(S["g"])(this.bodyHeight)}},[this.genDayContainer()])},genDayContainer:function(){return this.$createElement("div",{staticClass:"v-calendar-daily__day-container"},[this.genBodyIntervals()].concat(Object(D["a"])(this.genDays())))},genDays:function(){return this.days.map(this.genDay)},genDay:function(t,e){var n=this,a=this.$scopedSlots["day-body"],i=this.getSlotScope(t);return this.$createElement("div",{key:t.date,staticClass:"v-calendar-daily__day",class:this.getRelativeClasses(t),on:this.getDefaultMouseEventHandlers(":time",(function(e){return n.getSlotScope(n.getTimestampAtEvent(e,t))}))},[].concat(Object(D["a"])(this.genDayIntervals(e)),[a?a(i):""]))},genDayIntervals:function(t){return this.intervals[t].map(this.genDayInterval)},genDayInterval:function(t){var e=Object(S["g"])(this.intervalHeight),n=this.intervalStyle||this.intervalStyleDefault,a=this.$scopedSlots.interval,i=this.getSlotScope(t),s={key:t.time,staticClass:"v-calendar-daily__day-interval",style:Object(r["a"])({height:e},n(t))},o=a?a(i):void 0;return this.$createElement("div",s,o)},genBodyIntervals:function(){var t=this,e={staticClass:"v-calendar-daily__intervals-body",on:this.getDefaultMouseEventHandlers(":interval",(function(e){return t.getTimestampAtEvent(e,t.parsedStart)}))};return this.$createElement("div",e,this.genIntervalLabels())},genIntervalLabels:function(){return this.intervals.length?this.intervals[0].map(this.genIntervalLabel):null},genIntervalLabel:function(t){var e=Object(S["g"])(this.intervalHeight),n=this.shortIntervals,a=this.showIntervalLabel||this.showIntervalLabelDefault,i=a(t),r=i?this.intervalFormatter(t,n):void 0;return this.$createElement("div",{key:t.time,staticClass:"v-calendar-daily__interval",style:{height:e}},[this.$createElement("div",{staticClass:"v-calendar-daily__interval-text"},r)])}},render:function(t){return t("div",{class:this.classes,nativeOn:{dragstart:function(t){t.preventDefault()}},directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}]},[this.hideHeader?"":this.genHead(),this.genBody()])}}),B=$.extend({name:"v-calendar",props:Object(r["a"])(Object(r["a"])(Object(r["a"])({},j.calendar),j.weeks),j.intervals),data:function(){return{lastStart:null,lastEnd:null}},computed:{parsedValue:function(){return Object(O["z"])(this.value)?Object(O["s"])(this.value):this.parsedStart||this.times.today},renderProps:function(){var t=this.parsedValue,e=null,n=this.maxDays,a=t,i=t;switch(this.type){case"month":e=_,a=Object(O["l"])(t),i=Object(O["j"])(t);break;case"week":e=M,a=this.getStartOfWeek(t),i=this.getEndOfWeek(t),n=7;break;case"day":e=M,n=1;break;case"4day":e=M,i=Object(O["u"])(Object(O["d"])(i),O["p"],4),Object(O["v"])(i),n=4;break;case"custom-weekly":e=H,a=this.parsedStart||t,i=this.parsedEnd;break;case"custom-daily":e=M,a=this.parsedStart||t,i=this.parsedEnd;break;default:throw new Error(this.type+" is not a valid Calendar type")}return{component:e,start:a,end:i,maxDays:n}}},watch:{renderProps:"checkChange"},mounted:function(){this.updateEventVisibility()},updated:function(){this.updateEventVisibility()},methods:{checkChange:function(){var t=this.renderProps,e=t.start,n=t.end;e===this.lastStart&&n===this.lastEnd||(this.lastStart=e,this.lastEnd=n,this.$emit("change",{start:e,end:n}))},move:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=Object(O["d"])(this.parsedValue),n=t>0,a=n?O["p"]:O["t"],i=n?O["a"]:O["c"],r=n?t:-t;while(--r>=0)switch(this.type){case"month":e.day=i,a(e);break;case"week":Object(O["u"])(e,a,O["b"]);break;case"day":var s=e.weekday,o=n?this.weekdaySkips[s]:this.weekdaySkipsReverse[s];Object(O["u"])(e,a,o);break;case"4day":Object(O["u"])(e,a,4);break}Object(O["y"])(e),Object(O["v"])(e),Object(O["x"])(e,this.times.now),this.$emit("input",e.date),this.$emit("moved",e)},next:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.move(t)},prev:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.move(-t)},timeToY:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.$children[0];return!(!n||!n.timeToY)&&n.timeToY(t,e)},minutesToPixels:function(t){var e=this.$children[0];return e&&e.minutesToPixels?e.minutesToPixels(t):-1},scrollToTime:function(t){var e=this.$children[0];return!(!e||!e.scrollToTime)&&e.scrollToTime(t)}},render:function(t){var e=this,n=this.renderProps,a=n.start,i=n.end,s=n.maxDays,o=n.component;return t(o,{staticClass:"v-calendar",class:{"v-calendar-events":!this.noEvents},props:Object(r["a"])(Object(r["a"])({},this.$props),{},{start:a.date,end:i.date,maxDays:s}),directives:[{modifiers:{quiet:!0},name:"resize",value:this.updateEventVisibility}],on:Object(r["a"])(Object(r["a"])({},this.$listeners),{},{"click:date":function(t){e.$listeners["input"]&&e.$emit("input",t.date),e.$listeners["click:date"]&&e.$emit("click:date",t)}}),scopedSlots:this.getScopedSlots()})}}),P=n("b0af"),N=n("62ad"),W=n("a523"),A=n("132d"),R=n("0fd9"),Y=n("8dd9"),L=n("2fa4"),V=n("71d9"),z=n("2a7f"),U=Object(l["a"])(c,a,i,!1,null,null,null);e["default"]=U.exports;u()(U,{VCalendar:B,VCard:P["a"],VCol:N["a"],VContainer:W["a"],VIcon:A["a"],VRow:R["a"],VSheet:Y["a"],VSpacer:L["a"],VToolbar:V["a"],VToolbarTitle:z["a"]})},fcf4:function(t,e,n){}}]);
//# sourceMappingURL=chunk-3408979e.5c6fe0b1.js.map