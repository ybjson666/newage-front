(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1150:function(e,t,a){"use strict";a.d(t,"p",(function(){return n})),a.d(t,"d",(function(){return r})),a.d(t,"k",(function(){return i})),a.d(t,"b",(function(){return c})),a.d(t,"c",(function(){return s})),a.d(t,"q",(function(){return l})),a.d(t,"o",(function(){return o})),a.d(t,"n",(function(){return u})),a.d(t,"i",(function(){return m})),a.d(t,"m",(function(){return d})),a.d(t,"l",(function(){return h})),a.d(t,"h",(function(){return p})),a.d(t,"f",(function(){return f})),a.d(t,"g",(function(){return g})),a.d(t,"j",(function(){return v})),a.d(t,"e",(function(){return y})),a.d(t,"a",(function(){return E}));var n={1:"\u5f85\u5ba1\u6838",2:"\u5df2\u901a\u8fc7",3:"\u4e0d\u901a\u8fc7",4:"\u64a4\u9500\u8d44\u683c"},r={1:"\u62db\u52df\u4e2d",2:"\u8fdb\u884c\u4e2d",3:"\u5f85\u62db\u52df",4:"\u5df2\u7ed3\u675f",5:"\u5f85\u5f00\u59cb"},i={3:"\u5f85\u62db\u52df",1:"\u62db\u52df\u4e2d",5:"\u5f85\u5f00\u59cb",2:"\u8fdb\u884c\u4e2d",4:"\u5df2\u7ed3\u675f"},c={1:"\u5f85\u5ba1\u6838",2:"\u901a\u8fc7",3:"\u672a\u901a\u8fc7",4:"\u53d6\u6d88\u7533\u8bf7"},s={1:"\u5f85\u5ba1\u6838",2:"\u901a\u8fc7",3:"\u672a\u901a\u8fc7",4:"\u53d6\u6d88\u7533\u8bf7"},l={1:"\u5f85\u5ba1\u6838",2:"\u8fdb\u884c\u4e2d",3:"\u672a\u901a\u8fc7",4:"\u53d6\u6d88\u7533\u8bf7",5:"\u5df2\u5b8c\u6210"},o={1:"\u7537",2:"\u5973","-1":"\u672a\u77e5"},u={0:"\u7981\u7528",1:"\u542f\u7528"},m={0:"\u7981\u7528",1:"\u542f\u7528"},d={0:"\u7981\u7528",1:"\u542f\u7528"},h={0:"\u5f85\u5ba1\u6838",1:"\u5ba1\u6838\u901a\u8fc7",2:"\u5ba1\u6838\u62d2\u7edd",3:"\u53d6\u6d88\u9884\u7ea6"},p={1:"\u5f85\u5ba1\u6838",2:"\u5ba1\u6838\u901a\u8fc7",3:"\u5ba1\u6838\u62d2\u7edd",4:"\u53d6\u6d88\u9884\u7ea6",5:"\u5df2\u5b8c\u6210","-99":"\u670d\u52a1\u5931\u6548"},f=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,g=/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,v=/^1(3|4|5|6|7|8|9)\d{9}$/,y="d02ce754ffe9c4a719a3ec20212d904c";function E(){this._keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}E.prototype.encode=function(e){var t,a,n,r,i,c,s,l="",o=0;for(e=this._utf8_encode(e);o<e.length;)r=(t=e.charCodeAt(o++))>>2,i=(3&t)<<4|(a=e.charCodeAt(o++))>>4,c=(15&a)<<2|(n=e.charCodeAt(o++))>>6,s=63&n,isNaN(a)?c=s=64:isNaN(n)&&(s=64),l=l+this._keyStr.charAt(r)+this._keyStr.charAt(i)+this._keyStr.charAt(c)+this._keyStr.charAt(s);return l},E.prototype.decode=function(e){var t,a,n,r,i,c,s="",l=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<e.length;)t=this._keyStr.indexOf(e.charAt(l++))<<2|(r=this._keyStr.indexOf(e.charAt(l++)))>>4,a=(15&r)<<4|(i=this._keyStr.indexOf(e.charAt(l++)))>>2,n=(3&i)<<6|(c=this._keyStr.indexOf(e.charAt(l++))),s+=String.fromCharCode(t),64!=i&&(s+=String.fromCharCode(a)),64!=c&&(s+=String.fromCharCode(n));return s=this._utf8_decode(s)},E.prototype._utf8_encode=function(e){e=e.replace(/\r\n/g,"\n");for(var t="",a=0;a<e.length;a++){var n=e.charCodeAt(a);n<128?t+=String.fromCharCode(n):n>127&&n<2048?(t+=String.fromCharCode(n>>6|192),t+=String.fromCharCode(63&n|128)):(t+=String.fromCharCode(n>>12|224),t+=String.fromCharCode(n>>6&63|128),t+=String.fromCharCode(63&n|128))}return t},E.prototype._utf8_decode=function(e){for(var t="",a=0,n=0,r=0,i=0;a<e.length;)(n=e.charCodeAt(a))<128?(t+=String.fromCharCode(n),a++):n>191&&n<224?(r=e.charCodeAt(a+1),t+=String.fromCharCode((31&n)<<6|63&r),a+=2):(r=e.charCodeAt(a+1),i=e.charCodeAt(a+2),t+=String.fromCharCode((15&n)<<12|(63&r)<<6|63&i),a+=3);return t}},1165:function(e,t,a){"use strict";a.d(t,"c",(function(){return i})),a.d(t,"b",(function(){return c})),a.d(t,"f",(function(){return s})),a.d(t,"g",(function(){return l})),a.d(t,"a",(function(){return o})),a.d(t,"d",(function(){return u})),a.d(t,"e",(function(){return m}));var n=a(116),r=a(320),i=function(e){var t="".concat(r.a,"/wish/admin/wishList");return n.a.post(t,e)},c=function(e){var t="".concat(r.a,"/wish/admin/checkWish");return n.a.post(t,e)},s=function(e){var t="".concat(r.a,"/wish/admin/wishAudit");return n.a.post(t,e)},l=function(e){var t="".concat(r.a,"/wish/admin/updateWish");return n.a.post(t,e)},o=function(e){var t="".concat(r.a,"/wish/admin/delWish");return n.a.post(t,e)},u=function(e){var t="".concat(r.a,"/wish/admin/isConvertTask");return n.a.post(t,e)},m=function(e){var t="".concat(r.a,"/wish/admin/onlyDelWish");return n.a.post(t,e)}},1171:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABIUlEQVQ4T2NkoAAw4tP7+bmGA6/kjQO41ODV/OWV5n4eseuOJGsG2crIzLT//99/jrhsx2kzyFYGBkYHBob/B3DZjqL5x2t19b8MLOr///3TYGBk7IQ5l5GBoZqBkeEN4z+mKz++fLsqpHzvI0gOrvnzS60GRkaGekKBz8jIOP3PD4Yaftmr71BsJmTA////m3nFr9chuQjVLlwG/P/P0Mgrfq0BWTVGgH1+qZXByMgwHcP5///H8YhfX4xX85eXWksYGBmiIYr+H4CEOIjJ0Mcjfq0Yr+avr7VO/P/H8JWBgbGLR/zqzm8vta3/M/4v+MfAIMErds0Wp+b/9xU4vnBz+/CKXV2D7uyPr7Q9Xn38uV9V9c5PnAFGKKrwOpsUzQAUF2gQ+D/L5wAAAABJRU5ErkJggg=="},1180:function(e,t,a){},1181:function(e,t,a){},1225:function(e,t,a){"use strict";a.r(t);a(1113);var n=a(1112),r=(a(146),a(41)),i=(a(1108),a(1109)),c=(a(326),a(183)),s=(a(495),a(137)),l=(a(1114),a(1115)),o=(a(325),a(85)),u=(a(321),a(117)),m=a(174),d=a(175),h=a(177),p=a(176),f=a(179),g=a(178),v=(a(324),a(84)),y=(a(241),a(180)),E=(a(1110),a(1111)),b=a(0),w=a.n(b),D=a(147),A=(a(1180),a(489)),C=a(1165),k=(a(322),a(181)),S=(a(493),a(9)),I=(a(492),a(60)),O=(a(491),a(118)),N=(a(1116),a(1117)),x=(a(1123),a(1122)),T=a(1147),j=(a(1181),a(1150)),L=a(20),z=a.n(L),R=a(1171),B=a.n(R),V=(y.a.Search,v.a.Option,E.a.confirm),_=(x.a.RangePicker,function(e){function t(){var e;return Object(m.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).getTags=function(e,t){var a="\u6682\u672a\u8bbe\u7f6e";return e.map((function(e){e.dictionaryId===t&&(a=e.dictionaryValue)})),a},e.confirm=function(t){var a={state:t,ids:e.currentId};C.f(a).then((function(t){t.success&&(u.a.success("\u5ba1\u6838\u6210\u529f\uff01"),e.props.onOk())}))},e.mulpDelete=function(){console.log(e.state.selectRows);var t=Object(f.a)(e);V({title:"\u786e\u8ba4\u4e0d\u901a\u8fc7",content:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u9a73\u56de\u6240\u9009\u5fc3\u613f\u7533\u8bf7?",onOk:function(){t.confirm(3)}})},e.mulpAccept=function(){var t=Object(f.a)(e);V({title:"\u786e\u8ba4\u901a\u8fc7",content:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u901a\u8fc7\u6240\u9009\u5fc3\u613f\u7533\u8bf7?",onOk:function(){t.confirm(2)}})},e.saveInfo=function(){e.props.form.validateFieldsAndScroll((function(t,a){t||(a.wishid=e.currentId,a.stime&&(a.stime=z()(a.stime).valueOf()),C.g(a).then((function(t){u.a.info("\u4fdd\u5b58\u6210\u529f"),e.props.back(!0)})))}))},e.state={selectedRowKeys:[],tableData:[],totalCount:0,loading:!1},e.imgPrev=sessionStorage.getItem("imgPrev"),e}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.props.getList,this.state.params}},{key:"render",value:function(){var e=this.props,t=e.detailData,a=void 0===t?{}:t,n=e.serverArea,c=void 0===n?[]:n,s=e.serverType,l=void 0===s?[]:s,o=(e.zzmm,e.jyxl,a.ActivityEnter,a.ActivityRecruit,a.customerInfo),u=void 0===o?{}:o,m=a.wish,d=void 0===m?{}:m,h=a.activity,p=void 0===h?[]:h;this.showActivity=p[0]||"",this.currentId||(this.currentId=d.wishid);var f=d.state;this.cancleEdit=1!=f;var g=this.props.form.getFieldDecorator,E={labelCol:{xs:{span:12},sm:{span:4}},wrapperCol:{xs:{span:12},sm:{span:18}}};return w.a.createElement(w.a.Fragment,null,w.a.createElement(i.a,{className:"breadcrumbBox"},w.a.createElement(i.a.Item,null,w.a.createElement(T.a,{onClick:this.props.onOk,to:"/WishList"},this.props.navTitle)),w.a.createElement(i.a.Item,null,w.a.createElement(T.a,{to:"/WishList",className:"active"},"\u5fc3\u613f\u8be6\u60c5"))),w.a.createElement("div",{className:"eachPageBox wishList-detail-part"},w.a.createElement(k.a,{tip:"\u5ba1\u6838\u4e2d...",spinning:this.state.loading},w.a.createElement("div",{className:"part-content"},w.a.createElement("div",{className:"detail-panel-part"},w.a.createElement("div",{className:"panel-part-title"},"\u5fc3\u613f\u4fe1\u606f"),w.a.createElement("div",{className:"content-part-other"},w.a.createElement(N.a,Object.assign({className:"form-part"},{labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},{onSubmit:this.handleSubmit}),w.a.createElement(O.a,null,w.a.createElement(N.a.Item,Object.assign({label:"\u5fc3\u613f\u6807\u9898:"},E),g("title",{initialValue:d.title,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5fc3\u613f\u6807\u9898\uff01"}]})(w.a.createElement(y.a,{disabled:this.cancleEdit,maxLength:30,style:{width:"70%"}})))),w.a.createElement(O.a,null,w.a.createElement(N.a.Item,Object.assign({label:"\u5fc3\u613f\u8be6\u60c5:"},E),g("description",{initialValue:d.description,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5fc3\u613f\u8be6\u60c5\uff01"}]})(w.a.createElement(y.a.TextArea,{disabled:this.cancleEdit,maxLength:500,rows:10})))),w.a.createElement(O.a,null,w.a.createElement(I.a,{span:11},w.a.createElement(N.a.Item,{label:"\u670d\u52a1\u7c7b\u578b"},g("wishtype",{initialValue:d.wishtype?d.wishtype+"":"",rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u670d\u52a1\u7c7b\u578b\uff01"}]})(w.a.createElement(v.a,{disabled:this.cancleEdit,style:{width:"80%"}},l.map((function(e,t){return w.a.createElement(v.a.Option,{key:t,value:e.dictionaryId},e.dictionaryValue)})))))),w.a.createElement(I.a,{span:13},w.a.createElement(N.a.Item,{label:"\u670d\u52a1\u5730\u533a"},g("areaid",{initialValue:d.areaid?d.areaid+"":"",rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u670d\u52a1\u5730\u533a!"}]})(w.a.createElement(v.a,{disabled:this.cancleEdit,style:{width:"80%"}},c.map((function(e,t){return w.a.createElement(v.a.Option,{key:t,value:e.dictionaryId},e.dictionaryValue)}))))))),w.a.createElement(O.a,null,w.a.createElement(N.a.Item,Object.assign({label:"\u670d\u52a1\u65f6\u95f4:"},E),g("stime",{initialValue:d.starttime?d.starttime&&z()(d.starttime)||"":void 0,rules:[{required:!1}]})(w.a.createElement(x.a,{disabled:this.cancleEdit,format:"YYYY-MM-DD HH:mm:ss",placeholder:"\u5f00\u59cb\u65f6\u95f4",showTime:{defaultValue:z()("00:00:00","HH:mm:ss")}})))),w.a.createElement(O.a,null,w.a.createElement(I.a,{span:11},w.a.createElement(N.a.Item,{label:"\u8054\u7cfb\u4eba"},g("contacter",{initialValue:d.contacter,rules:[{required:!0,message:"\u8bf7\u586b\u5199\u8054\u7cfb\u4eba"}]})(w.a.createElement(y.a,{disabled:this.cancleEdit,style:{width:"75%"}})))),w.a.createElement(I.a,{span:13},w.a.createElement(N.a.Item,{label:"\u8054\u7cfb\u7535\u8bdd"},g("phone",{initialValue:d.phone,rules:[{required:!0,message:"\u8bf7\u586b\u5199\u8054\u7cfb\u7535\u8bdd"}]})(w.a.createElement(y.a,{disabled:this.cancleEdit,style:{width:"75%"}}))))),w.a.createElement(O.a,null,this.showActivity?w.a.createElement(N.a.Item,Object.assign({label:"\u76f8\u5173\u6d3b\u52a8:"},E),w.a.createElement("div",{className:"activity-show-part"},w.a.createElement("div",{className:"left-img"},w.a.createElement("img",{src:this.imgPrev+this.showActivity.cover,alt:""})),w.a.createElement("div",{className:"right-text"},w.a.createElement("div",{className:"title"},this.showActivity.activityname),w.a.createElement("div",{className:"time"},w.a.createElement(S.a,{type:"clock-circle"}),this.showActivity.activitystarttime),w.a.createElement("div",{className:"num"},w.a.createElement(S.a,{type:"team"}),this.showActivity.hascount,"/",0==this.showActivity.recruitcount?"\u65e0\u9650\u5236":this.showActivity.recruitcount),w.a.createElement("div",{className:"address"},w.a.createElement(S.a,{type:"environment"}),w.a.createElement("span",{className:"address-part"},this.showActivity.address))))):""),w.a.createElement(O.a,null,w.a.createElement(N.a.Item,Object.assign({label:"\u8bc4\u5206:"},E),w.a.createElement("div",{className:"star-part"},new Array(d.starlevel).fill("").map((function(e,t){return w.a.createElement("img",{key:t,src:B.a,alt:""})})))))))),w.a.createElement("div",{className:"detail-panel-part"},w.a.createElement("div",{className:"panel-part-title"},"\u7533\u8bf7\u4eba\u4fe1\u606f"),w.a.createElement("div",{className:"panel-img panel-img-right"},w.a.createElement("div",{className:"img-inner img-right"},w.a.createElement("img",{src:u.thridInfo&&u.thridInfo.avatar?u.thridInfo&&u.thridInfo.avatar:"",alt:""}))),w.a.createElement("div",{className:"content-part"},w.a.createElement("div",{className:"content-line"},"\u7533\u8bf7\u4eba\u8d26\u53f7\uff1a",u.thridInfo&&u.thridInfo.mobile),w.a.createElement("div",{className:"content-line"},"\u7533\u8bf7\u4eba\u8d26\u53f7\u540d\uff1a",u.thridInfo&&u.thridInfo.nickname),w.a.createElement("div",{className:"content-line"},"\u6027\u522b\uff1a",j.o[u.thridInfo&&u.thridInfo.sex]),w.a.createElement("div",{className:"content-line"},"\u8d26\u6237\u7c7b\u578b\uff1a",1==u.isvolunteer?"\u5fd7\u613f\u8005\u8d26\u6237":"\u666e\u901a\u8d26\u6237"),w.a.createElement("div",{className:"content-line"},"\u7533\u8bf7\u65f6\u95f4\uff1a",d.subdate)))),w.a.createElement("div",{className:"button-part"},w.a.createElement(r.a,{onClick:this.props.back},"\u8fd4\u56de"),1==f?w.a.createElement(r.a,{onClick:this.saveInfo,type:"primary",htmlType:"submit"},"\u4fdd\u5b58"):"",1==f?w.a.createElement(r.a,{onClick:this.mulpAccept,type:"primary",htmlType:"submit"},"\u901a\u8fc7"):"",1==f?w.a.createElement(r.a,{onClick:this.mulpDelete,type:"danger",htmlType:"submit",ghost:!0},"\u4e0d\u901a\u8fc7"):""))))}}]),t}(b.Component)),q=N.a.create({name:"detailForm"})(_),P=Object(D.c)((function(e){var t=e.message,a=e.navTitle;return{listData:t.listData,listLoading:t.listLoading,navTitle:a.navTitle}}),(function(e){return{getList:e.message.getList}}))(q),K=a(323),W=E.a.confirm,Y=y.a.Search,M=v.a.Option,H=function(e){function t(){var e;return Object(m.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).onSelectChange=function(t,a){var n=[],r=[];a.map((function(e){r.push(e),n.push(e.wishid)})),e.setState({selectedRowKeys:n,selectRows:r})},e.onRowEvent=function(t){var a=[],n=[];a.push(t.wishid),n.push(t),e.setState({selectedRowKeys:a,selectRows:n})},e.getDataList=function(){var t=Object.assign(e.searchData,e.listData);e.setState({emptyTxt:"\u52a0\u8f7d\u4e2d",tableData:[],isLoad:!0}),C.c(t).then((function(t){if(t&&t.success){var a=t&&t.data.data||[],n=Array.isArray(a)?a:[];e.setState({tableData:n,totalCount:t.data&&t.data.totalCount||0,isLoad:!1},(function(){e.state.tableData.length||e.setState({emptyTxt:"\u6682\u65e0\u6570\u636e"})}))}}))},e.onShowSizeChange=function(t,a){e.listData.pageno=t,e.listData.pagesize=a,e.getDataList()},e.pageBack=function(t){1==t&&e.getDataList(),e.setState({pageType:!0})},e.getSearviceType=function(){A.h().then((function(t){var a=t&&Array.isArray(t.data)?t.data:[];localStorage.setItem("serverType",JSON.stringify(a)),e.setState({serverType:a})}))},e.getSearviceArea=function(){A.g().then((function(t){var a=t&&Array.isArray(t.data)?t.data:[];localStorage.setItem("serverArea",JSON.stringify(a)),e.setState({serverArea:a})}))},e.confirm=function(t,a){var n=[];t.map((function(e){n.push(e.wishid)}));var r={state:a,ids:n.join(",")};C.f(r).then((function(t){t&&t.success&&(u.a.success("\u5ba1\u6838\u6210\u529f\uff01"),e.getDataList(),e.setState({selectRows:[],selectedRowKeys:[]}))}))},e.lookDetail=function(t){if(t){var a={id:t};C.b(a).then((function(t){t.success&&e.setState({currentDetail:t.data,pageType:!1})}))}},e.onOk=function(){e.getDataList(),e.setState({pageType:!0})},e.mulpDelete=function(){console.log(e.state.selectRows);var t=Object(f.a)(e);if(!e.state.selectRows||e.state.selectRows.length<1)u.a.info("\u8bf7\u9009\u62e9\u9700\u8981\u5ba1\u6838\u7684\u5fc3\u613f!");else{var a=!1;e.state.selectRows.map((function(e){1!=e.state&&(a=!0)})),a?u.a.error("\u6240\u9009\u9879\u5305\u542b\u5df2\u5ba1\u6838\u5185\u5bb9,\u8bf7\u91cd\u8bd5!"):W({title:"\u786e\u8ba4\u4e0d\u901a\u8fc7",content:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u9a73\u56de\u6240\u9009\u5fc3\u613f\u7533\u8bf7?",onOk:function(){t.confirm(t.state.selectRows,3)}})}},e.mulpAccept=function(){console.log(e.state.selectRows);var t=Object(f.a)(e);if(!e.state.selectRows||e.state.selectRows.length<1)u.a.info("\u8bf7\u9009\u62e9\u9700\u8981\u5ba1\u6838\u7684\u5fc3\u613f!");else{var a=!1;e.state.selectRows.map((function(e){1!=e.state&&(a=!0)})),a?u.a.error("\u6240\u9009\u9879\u5305\u542b\u5df2\u5ba1\u6838\u5185\u5bb9,\u8bf7\u91cd\u8bd5!"):W({title:"\u786e\u8ba4\u901a\u8fc7",content:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u901a\u8fc7\u6240\u9009\u5fc3\u613f\u7533\u8bf7?",onOk:function(){t.confirm(t.state.selectRows,2)}})}},e.cancelDelete=function(){e.setState({deleteVisible:!1,currentDeleteWish:null,currentDeleteData:null})},e.handleVisibleChange=function(t,a){var n=Object(f.a)(e),r={wishId:t.join(",")};C.d(r).then((function(r){0===r.data?W({title:"\u5220\u9664\u786e\u8ba4",content:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u5220\u9664\u6240\u9009\u5fc3\u613f\u7533\u8bf7?",onOk:function(){n.deleteItems(t)}}):e.setState({deleteVisible:!0,currentDeleteWish:t,currentDeleteData:a})}))},e.deleteWishOnly=function(t){var a={wishId:t.join(",")};C.e(a).then((function(a){200==a.state&&u.a.success("\u5220\u9664\u6210\u529f\uff01"),t.length==e.state.tableData.length&&(e.listData.pageno=1),e.getDataList(),e.cancelDelete(),e.setState({selectRows:[],selectedRowKeys:[]})}))},e.deleteItems=function(t){var a={wishId:t.join(",")};C.a(a).then((function(a){200==a.state&&u.a.success("\u5220\u9664\u6210\u529f\uff01"),t.length==e.state.tableData.length&&(e.listData.pageno=1),e.getDataList(),e.cancelDelete(),e.setState({selectRows:[],selectedRowKeys:[]})}))},e.state={selectedRowKeys:[],tableData:[],totalCount:0,emptyTxt:"\u52a0\u8f7d\u4e2d...",params:{pageSize:10,page:1},currentDetail:{},pageType:!0,serverType:JSON.parse(localStorage.getItem("serverType"))||[],serverArea:JSON.parse(localStorage.getItem("serverArea"))||[],zzmm:[],jxyl:[],searchData:{},visibleArray:{},deleteVisible:!1,isLoad:!1},e.listData={pageno:1,pagesize:10},e.searchData={},e}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=(this.props.getList,this.state.params,Object(K.a)().login_chinamcloud_tid);t!==localStorage.getItem("login_tid")?(localStorage.setItem("login_tid",t),this.getSearviceType(),this.getSearviceArea()):(localStorage.getItem("serverType")||this.getSearviceType(),localStorage.getItem("serverArea")||this.getSearviceArea()),setTimeout((function(){e.getDataList()}))}},{key:"render",value:function(){var e=this,t=this.state.selectedRowKeys,a=this.listData,u={selectedRowKeys:t,onChange:this.onSelectChange},m={pageSize:a.pagesize,total:this.state.totalCount,current:a.pageno,showTotal:function(e){return"\u5171 ".concat(e," \u6761\u6570\u636e")},showSizeChanger:!0,onShowSizeChange:this.onShowSizeChange,onChange:this.onShowSizeChange},d=[{title:"\u6807\u9898",dataIndex:"title",align:"left",width:80,render:function(e,t){return w.a.createElement(o.a,{placement:"topLeft",title:e},w.a.createElement("span",null,e))}},{title:"\u670d\u52a1\u5730\u533a",dataIndex:"areaid",align:"left",width:70,render:function(t,a){var n="";return e.state.serverArea.map((function(e){e.dictionaryId==t&&(n=e.dictionaryValue)})),w.a.createElement(o.a,{placement:"topLeft",title:n},w.a.createElement("span",null,n))}},{title:"\u670d\u52a1\u7c7b\u578b",dataIndex:"wishtype",align:"left",width:70,render:function(t,a){var n="";return e.state.serverType.map((function(e){e.dictionaryId==t&&(n=e.dictionaryValue)})),w.a.createElement("span",null,n)}},{title:"\u670d\u52a1\u65f6\u95f4",dataIndex:"starttime",align:"left",width:120,render:function(e,t){var a=e&&z()(e).format("YYYY-MM-DD HH:mm:ss");return w.a.createElement(o.a,{placement:"topLeft",title:e},w.a.createElement("span",null,a))}},{title:"\u7533\u8bf7\u4eba",dataIndex:"customername",align:"left",width:60,render:function(e,t){return w.a.createElement(o.a,{placement:"topLeft",title:e},w.a.createElement("span",null,e))}},{title:"\u8054\u7cfb\u4eba",dataIndex:"contracter",align:"left",width:80,render:function(e,t){return w.a.createElement(o.a,{placement:"topLeft",title:e},w.a.createElement("span",null,e))}},{title:"\u8054\u7cfb\u7535\u8bdd",dataIndex:"phone",align:"left",width:120,render:function(e,t){return w.a.createElement(o.a,{placement:"topLeft",title:e},w.a.createElement("span",null,e))}},{title:"\u5904\u7406\u72b6\u6001",dataIndex:"state",align:"left",width:70,render:function(e,t){return w.a.createElement("span",null,j.q[e])}},{title:"\u8bc4\u5206",dataIndex:"starlevel",align:"left",width:90,render:function(e,t){return w.a.createElement("span",null,new Array(e||0).fill("").map((function(e,t){return w.a.createElement("img",{key:t,src:B.a,alt:""})})))}},{title:"\u64cd\u4f5c",align:"left",width:120,render:function(t,a){var n=w.a.createElement(w.a.Fragment,null);return 1==a.state&&(n=w.a.createElement(s.a,null,w.a.createElement(s.a.Item,{key:"0"},w.a.createElement(l.a,{placement:"right",title:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u901a\u8fc7\u6240\u9009\u5fc3\u613f\u7533\u8bf7?",okType:"danger",onConfirm:function(){return e.confirm([a],2)},okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88"},w.a.createElement("a",{role:"button",className:"tableOperateButton",type:"link"},"\u901a\u8fc7"))),w.a.createElement(s.a.Item,{key:"1"},w.a.createElement(l.a,{placement:"right",title:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u9a73\u56de\u6240\u9009\u5fc3\u613f\u7533\u8bf7?",okType:"danger",onConfirm:function(){return e.confirm([a],3)},okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88"},w.a.createElement("a",{role:"button",className:"tableOperateButton",type:"link"},"\u4e0d\u901a\u8fc7"))))),w.a.createElement("div",{role:"button",tabIndex:"-1",style:{whiteSpace:"nowrap"},onClick:function(e){e&&e.preventDefault(),e&&e.stopPropagation()}},w.a.createElement("a",{role:"button",tabIndex:"0",className:"tableOperateButton",onClick:function(t){e.lookDetail(a&&a.wishid||"")}},"\u67e5\u770b"),w.a.createElement("a",{role:"button",onClick:function(){return e.handleVisibleChange([a&&a.wishid||""],a)},className:"tableOperateButton",type:"link",style:{marginRight:10}},"\u5220\u9664"),1==a.state?w.a.createElement(c.a,{overlay:n},w.a.createElement("a",{className:"ant-dropdown-link",role:"button"},"\u66f4\u591a")):"")}}];return this.state.pageType?w.a.createElement(w.a.Fragment,null,w.a.createElement(i.a,{className:"breadcrumbBox"},w.a.createElement("span",{className:"title-active"},this.props.navTitle)),w.a.createElement("div",{className:"eachPageBox ActivityCheckList-page"},w.a.createElement("div",{style:{height:"100%"}},w.a.createElement("div",{className:"navTopBox"},w.a.createElement("div",{className:"btnBox"},w.a.createElement(r.a,{type:"primary",onClick:this.mulpAccept},"\u901a\u8fc7"),w.a.createElement(r.a,{type:"danger",ghost:!0,onClick:this.mulpDelete},"\u4e0d\u901a\u8fc7")),w.a.createElement("div",{className:"searchFatherBox searchLeftPadding"},w.a.createElement("div",{className:"searchBox "},w.a.createElement("span",{className:"item-search-part"},"\u670d\u52a1\u7c7b\u578b\uff1a",w.a.createElement(v.a,{placeholder:"\u5168\u90e8",value:this.state.searchData.wishType,style:{width:120},onChange:function(t){e.listData.pageno=1,e.listData.pagesize=10,e.searchData.wishType=t,e.setState({searchData:e.searchData}),e.getDataList()}},w.a.createElement(M,{value:""},"\u5168\u90e8"),this.state.serverType.map((function(e,t){return w.a.createElement(M,{key:t,value:e.dictionaryId},e.dictionaryValue)})))),w.a.createElement("span",{className:"item-search-part"},"\u670d\u52a1\u5730\u533a\uff1a",w.a.createElement(v.a,{value:this.state.searchData.areaId,placeholder:"\u5168\u90e8",style:{width:120},onChange:function(t){e.listData.pageno=1,e.listData.pagesize=10,e.searchData.areaId=t,e.setState({searchData:e.searchData}),e.getDataList()}},w.a.createElement(M,{value:""},"\u5168\u90e8"),this.state.serverArea.map((function(e,t){return w.a.createElement(M,{key:t,value:e.dictionaryId},e.dictionaryValue)})))),w.a.createElement("span",{className:"item-search-part"},"\u5904\u7406\u72b6\u6001\uff1a",w.a.createElement(v.a,{value:this.state.searchData.state,placeholder:"\u5168\u90e8",style:{width:120},onChange:function(t){e.listData.pageno=1,e.listData.pagesize=10,e.searchData.state=t,e.setState({searchData:e.searchData}),e.getDataList()}},w.a.createElement(M,{value:""},"\u5168\u90e8"),Object.keys(j.q).map((function(e){return w.a.createElement(M,{key:e,value:e},j.q[e])})))),w.a.createElement(Y,{placeholder:"\u8bf7\u8f93\u5165\u5fc3\u613f\u6807\u9898/\u7533\u8bf7\u4eba\u8d26\u53f7\u540d",enterButton:"\u641c\u7d22",value:this.state.searchData.searchContent,onChange:function(t){e.searchData.searchContent=t.target.value,e.setState({searchData:e.searchData})},onSearch:function(t){e.searchData.searchContent=t,e.getDataList()},style:{width:280}})))),w.a.createElement("div",{className:"tableCont mainContentBox",style:{height:"calc(100% - 121px)"}},w.a.createElement(n.a,{rowKey:"wishid",columns:d,rowSelection:u,pagination:!this.state.isLoad&&m,dataSource:this.state.tableData,locale:{emptyText:this.state.emptyTxt},onRow:function(t,a){return{index:a,onClick:e.onRowEvent.bind(e,t)}},scroll:{x:"100%",y:"calc(100vh - 291px)"}}))),w.a.createElement(E.a,{visible:this.state.deleteVisible,footer:null,className:"ant-modal-confirm ant-modal-confirm-confirm",width:416,onCancel:this.cancelDelete},w.a.createElement("div",{className:"ant-modal-confirm-body-wrapper"},w.a.createElement("div",{className:"ant-modal-confirm-body"},w.a.createElement("i",{"aria-label":"icon: question-circle",className:"anticon anticon-question-circle"},w.a.createElement("svg",{viewBox:"64 64 896 896",focusable:"false",className:"","data-icon":"question-circle",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},w.a.createElement("path",{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}),w.a.createElement("path",{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"}))),w.a.createElement("span",{className:"ant-modal-confirm-title"},"\u5220\u9664\u786e\u8ba4"),w.a.createElement("div",{className:"ant-modal-confirm-content"},"\u8be5\u5fc3\u613f\u5df2\u751f\u6210\u5bf9\u5e94\u7684\u4efb\u52a1\u3001\u6d3b\u52a8\uff0c\u662f\u5426\u5168\u90e8\u5220\u9664?")),w.a.createElement("div",{className:"ant-modal-confirm-btns"},w.a.createElement("button",{type:"button",onClick:this.cancelDelete,className:"ant-btn"},w.a.createElement("span",null,"\u53d6 \u6d88")),w.a.createElement("button",{type:"button",onClick:function(){return e.deleteWishOnly(e.state.currentDeleteWish)},className:"ant-btn ant-btn-primary"},w.a.createElement("span",null,"\u5220\u9664\u5fc3\u613f")),w.a.createElement("button",{onClick:function(){return e.deleteItems(e.state.currentDeleteWish)},type:"button",className:"ant-btn ant-btn-primary"},w.a.createElement("span",null,"\u5168\u90e8\u5220\u9664"))))))):w.a.createElement(P,{serverArea:this.state.serverArea,serverType:this.state.serverType,detailData:this.state.currentDetail,zzmm:this.state.zzmm||[],jyxl:this.state.jxyl||[],onOk:this.onOk,back:this.pageBack})}}]),t}(b.Component);t.default=Object(D.c)((function(e){var t=e.message,a=e.navTitle;return{listData:t.listData,listLoading:t.listLoading,navTitle:a.navTitle}}),(function(e){return{getList:e.message.getList}}))(H)},489:function(e,t,a){"use strict";a.d(t,"d",(function(){return u})),a.d(t,"j",(function(){return m})),a.d(t,"i",(function(){return d})),a.d(t,"h",(function(){return h})),a.d(t,"g",(function(){return p})),a.d(t,"o",(function(){return f})),a.d(t,"n",(function(){return g})),a.d(t,"b",(function(){return v})),a.d(t,"e",(function(){return y})),a.d(t,"m",(function(){return E})),a.d(t,"l",(function(){return b})),a.d(t,"c",(function(){return w})),a.d(t,"k",(function(){return D})),a.d(t,"f",(function(){return A})),a.d(t,"a",(function(){return C}));var n=a(116),r=a(320),i=a(182),c=a(323),s=Object(i.a)(window.location.search).stag;s&&(s=s.replace("/",""));var l=Object(c.a)(),o={};o="H"===s?{access_token:l.access_token,stag:"H"}:{login_id:l.login_chinamcloud_id,login_tid:l.login_chinamcloud_tid,stag:"B"};var u=function(e){var t="".concat(r.a,"/customer/admin/clist");return n.a.post(t,e.params)},m=function(e){var t=r.a+"/customer/admin/list";return n.a.post(t,e.params)},d=function(e){var t=r.a+"/customer/admin/show";return n.a.post(t,e)},h=function(e){var t=r.a+"/other/admin/servertype";return n.a.post(t,{})},p=function(e){var t=r.a+"/other/admin/serverarea";return n.a.post(t,{})},f=function(e){var t=r.a+"/customer/admin/uploadFace";return n.a.post(t,e)},g=function(e){var t=r.a+"/picture/admin/upload";return n.a.post(t,e)},v=function(e){var t=r.a+"/customer/admin/modify";return n.a.post(t,e)},y=function(e){var t="",a=Object.keys(o).length;Object.keys(o).map((function(e,n){t+="".concat(e,"=").concat(o[e]).concat(n+1==a?"":"&")}));var i=r.a+"/dict/admin/all?".concat(t);return n.a.get(i)},E=function(e){var t=r.a+"/customer/admin/apply";return n.a.post(t,e)},b=function(e){var t=r.a+"/customer/admin/addScore";return n.a.post(t,e)},w=function(e){var t=r.a+"/customer/admin/times";return n.a.post(t,e)},D=function(e){var t=r.a+"/customer/admin/utime";return n.a.post(t,e)},A=function(e){var t=r.a+"/customer/admin/invite/list";return n.a.post(t,e)},C=function(e){var t=r.a+"/customer/admin/invite";return n.a.post(t,e)}}}]);