(this["webpackJsonpgithub-actions-demo"]=this["webpackJsonpgithub-actions-demo"]||[]).push([[0],{106:function(e,a,t){},107:function(e,a,t){},112:function(e,a,t){},183:function(e,a,t){"use strict";t.r(a);var n=t(1),c=t.n(n),l=t(33),s=t.n(l),i=(t(106),t(107),t(73)),r=t(95),o=t(193),j=t(191),d=t(192),b=t(194),h=(t(112),t(13)),u=function(e,a,t,n){for(var c=[],l=0,s=+new Date(2022,7,1),i=0;;){var r=0;if(l>=t&&l%t===0){var o=Math.floor(l/t);r=Math.min(n,o)*t*e*(100-a)*.01/n}var j=e*(.01*a)+r;if(c.push([s+24*l*3600*1e3,Math.round(i+j)]),i>35e6)break;i+=j,l++}return c},m=function(){var e=Object(n.useRef)(),a=o.a.useForm(),t=Object(i.a)(a,1)[0],c=Object(n.useState)(u(5e4,5,3,60)),l=Object(i.a)(c,2),s=l[0],m=l[1];return Object(n.useEffect)((function(){var a=r.a(e.current),t={color:["#80FFA5","#00DDFF","#37A2FF","#FF0087","#FFBF00"],title:{text:"\u6bcf\u65e5\u6700\u5927\u6d41\u901a\u91cf",left:"center",textStyle:{color:"#FFFFFF"}},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},grid:{show:!1,left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"time",boundaryGap:!1,splitLine:{show:!1}}],yAxis:[{type:"value",splitLine:{show:!1}}],series:[{name:"\u89e3\u9501\u91cf",type:"line",smooth:!0,emphasis:{focus:"series"},data:s}]};a.setOption(t)}),[s]),Object(h.jsxs)("div",{className:"chart-wrap",children:[Object(h.jsx)("div",{className:"chart-header",children:Object(h.jsxs)(o.a,{form:t,layout:"inline",initialValues:{amount:"50000",ratio:"5",interval:"3",times:"60"},onValuesChange:function(){console.log(t.getFieldsValue());var e=t.getFieldsValue(),a=e.amount,n=e.ratio,c=e.interval,l=e.times;+a&&+n&&+c&&+l&&m(u(+a,+n,+c,+l))},children:[Object(h.jsx)(o.a.Item,{name:"amount",label:"\u6bcf\u65e5\u4ea7\u51fa",className:"chart-header-label",children:Object(h.jsx)(j.a,{children:Object(h.jsx)(d.a,{span:18,children:Object(h.jsx)(b.a,{size:"small",placeholder:"daily lock number",defaultValue:5e4})})})}),Object(h.jsx)(o.a.Item,{name:"ratio",label:"\u9996\u6b21\u89e3\u9501",className:"chart-header-label",children:Object(h.jsx)(j.a,{children:Object(h.jsx)(d.a,{span:12,children:Object(h.jsx)(b.a,{size:"small",placeholder:"First unlock ratio",defaultValue:5,addonAfter:"%"})})})}),Object(h.jsx)(o.a.Item,{name:"interval",label:"\u89e3\u9501\u95f4\u9694",className:"chart-header-label",children:Object(h.jsx)(j.a,{children:Object(h.jsx)(d.a,{span:12,children:Object(h.jsx)(b.a,{size:"small",placeholder:"unlock interval",defaultValue:3,addonAfter:"\u5929"})})})}),Object(h.jsx)(o.a.Item,{name:"times",label:"\u89e3\u9501\u6b21\u6570",className:"chart-header-label",children:Object(h.jsx)(j.a,{children:Object(h.jsx)(d.a,{span:12,children:Object(h.jsx)(b.a,{size:"small",placeholder:"unlock times",defaultValue:60,addonAfter:"\u5929"})})})})]})}),Object(h.jsx)("div",{ref:e,className:"chart-container"})]})};var x=function(){return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)("div",{className:"line-container",children:Object(h.jsx)(m,{})}),Object(h.jsx)("div",{className:"line-container",children:Object(h.jsx)(m,{})}),Object(h.jsx)("div",{className:"line-container",children:Object(h.jsx)(m,{})}),Object(h.jsx)("div",{className:"line-container",children:Object(h.jsx)(m,{})})]})},O=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,195)).then((function(a){var t=a.getCLS,n=a.getFID,c=a.getFCP,l=a.getLCP,s=a.getTTFB;t(e),n(e),c(e),l(e),s(e)}))};s.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(x,{})}),document.getElementById("root")),O()}},[[183,1,2]]]);
//# sourceMappingURL=main.6bfb3bf5.chunk.js.map