(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04d32498"],{3408:function(t,e,a){},8212:function(t,e,a){"use strict";var s=a("5530"),i=(a("a9e3"),a("3408"),a("a9ad")),o=a("24b2"),n=a("a236"),r=a("80d2"),c=a("58df");e["a"]=Object(c["a"])(i["a"],o["a"],n["a"]).extend({name:"v-avatar",props:{left:Boolean,right:Boolean,size:{type:[Number,String],default:48}},computed:{classes:function(){return Object(s["a"])({"v-avatar--left":this.left,"v-avatar--right":this.right},this.roundedClasses)},styles:function(){return Object(s["a"])({height:Object(r["f"])(this.size),minWidth:Object(r["f"])(this.size),width:Object(r["f"])(this.size)},this.measurableStyles)}},render:function(t){var e={staticClass:"v-avatar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),this.$slots.default)}})},bb51:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",[s("v-img",{attrs:{src:a("dd08")}},[s("v-main",[s("v-container",[s("v-row",t._l(t.items,(function(e,a){return s("v-col",{key:a,attrs:{cols:"4"}},[s("v-container",{staticClass:"fill-height"},[s("v-row",{attrs:{"no-gutters":""}},[s("v-col",[s("v-img",{staticClass:"align-center text-center white elevation-6",staticStyle:{"border-radius":"10px"},attrs:{"aspect-ratio":"1"},on:{click:function(a){return t.pushRouter(e.to)}}},[e.icon?s("v-icon",{attrs:{size:"72",color:"blue"}},[t._v(t._s(e.icon))]):t._e(),e.customIcon?s("v-avatar",{attrs:{color:"black",size:"60"}},[s("span",{staticStyle:{color:"white","font-size":"40px"}},[t._v("棋")])]):t._e()],1)],1)],1),s("v-row",{attrs:{dense:""}},[s("v-col",[s("div",{staticClass:"text-center"},[s("span",{staticClass:"font-weight-bold",staticStyle:{color:"white"}},[t._v(t._s(e.name))])])])],1)],1)],1)})),1)],1)],1)],1)],1)},i=[],o={name:"Home",data:function(){return{items:[{name:"品牌列表",icon:"mdi-card-bulleted",to:"/web/brandList"},{name:"疫情现状",icon:"mdi-lungs",to:"/web/epidemic"},{name:"照片",icon:"mdi-google-photos",to:"/web/photo"},{name:"黑白棋",customIcon:!0,to:"/web/reversi"},{name:"云音乐",icon:"mdi-music-circle",to:"/music"},{name:"肯德基",icon:"mdi-food",to:"/web/elm"}]}},methods:{pushRouter:function(t){this.$router.push(t)}}},n=o,r=a("2877"),c=a("6544"),l=a.n(c),u=a("7496"),d=a("8212"),h=a("62ad"),v=a("a523"),m=a("132d"),f=a("adda"),p=a("f6c4"),b=a("0fd9"),w=Object(r["a"])(n,s,i,!1,null,"38b5e300",null);e["default"]=w.exports;l()(w,{VApp:u["a"],VAvatar:d["a"],VCol:h["a"],VContainer:v["a"],VIcon:m["a"],VImg:f["a"],VMain:p["a"],VRow:b["a"]})},dd08:function(t,e,a){t.exports=a.p+"static/img/star.16fa2f7a.jpg"}}]);
//# sourceMappingURL=chunk-04d32498.7d08db0c.js.map