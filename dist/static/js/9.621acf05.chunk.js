(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1150:function(t,e,a){"use strict";a.d(e,"p",(function(){return n})),a.d(e,"d",(function(){return r})),a.d(e,"k",(function(){return i})),a.d(e,"b",(function(){return c})),a.d(e,"c",(function(){return o})),a.d(e,"q",(function(){return s})),a.d(e,"o",(function(){return u})),a.d(e,"n",(function(){return l})),a.d(e,"i",(function(){return d})),a.d(e,"m",(function(){return m})),a.d(e,"l",(function(){return f})),a.d(e,"h",(function(){return p})),a.d(e,"f",(function(){return v})),a.d(e,"g",(function(){return h})),a.d(e,"j",(function(){return g})),a.d(e,"e",(function(){return y})),a.d(e,"a",(function(){return k}));var n={1:"\u5f85\u5ba1\u6838",2:"\u5df2\u901a\u8fc7",3:"\u4e0d\u901a\u8fc7",4:"\u64a4\u9500\u8d44\u683c"},r={1:"\u62db\u52df\u4e2d",2:"\u8fdb\u884c\u4e2d",3:"\u5f85\u62db\u52df",4:"\u5df2\u7ed3\u675f",5:"\u5f85\u5f00\u59cb"},i={3:"\u5f85\u62db\u52df",1:"\u62db\u52df\u4e2d",5:"\u5f85\u5f00\u59cb",2:"\u8fdb\u884c\u4e2d",4:"\u5df2\u7ed3\u675f"},c={1:"\u5f85\u5ba1\u6838",2:"\u901a\u8fc7",3:"\u672a\u901a\u8fc7",4:"\u53d6\u6d88\u7533\u8bf7"},o={1:"\u5f85\u5ba1\u6838",2:"\u901a\u8fc7",3:"\u672a\u901a\u8fc7",4:"\u53d6\u6d88\u7533\u8bf7"},s={1:"\u5f85\u5ba1\u6838",2:"\u8fdb\u884c\u4e2d",3:"\u672a\u901a\u8fc7",4:"\u53d6\u6d88\u7533\u8bf7",5:"\u5df2\u5b8c\u6210"},u={1:"\u7537",2:"\u5973","-1":"\u672a\u77e5"},l={0:"\u7981\u7528",1:"\u542f\u7528"},d={0:"\u7981\u7528",1:"\u542f\u7528"},m={0:"\u7981\u7528",1:"\u542f\u7528"},f={0:"\u5f85\u5ba1\u6838",1:"\u5ba1\u6838\u901a\u8fc7",2:"\u5ba1\u6838\u62d2\u7edd",3:"\u53d6\u6d88\u9884\u7ea6"},p={1:"\u5f85\u5ba1\u6838",2:"\u5ba1\u6838\u901a\u8fc7",3:"\u5ba1\u6838\u62d2\u7edd",4:"\u53d6\u6d88\u9884\u7ea6",5:"\u5df2\u5b8c\u6210","-99":"\u670d\u52a1\u5931\u6548"},v=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,h=/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,g=/^1(3|4|5|6|7|8|9)\d{9}$/,y="d02ce754ffe9c4a719a3ec20212d904c";function k(){this._keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}k.prototype.encode=function(t){var e,a,n,r,i,c,o,s="",u=0;for(t=this._utf8_encode(t);u<t.length;)r=(e=t.charCodeAt(u++))>>2,i=(3&e)<<4|(a=t.charCodeAt(u++))>>4,c=(15&a)<<2|(n=t.charCodeAt(u++))>>6,o=63&n,isNaN(a)?c=o=64:isNaN(n)&&(o=64),s=s+this._keyStr.charAt(r)+this._keyStr.charAt(i)+this._keyStr.charAt(c)+this._keyStr.charAt(o);return s},k.prototype.decode=function(t){var e,a,n,r,i,c,o="",s=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");s<t.length;)e=this._keyStr.indexOf(t.charAt(s++))<<2|(r=this._keyStr.indexOf(t.charAt(s++)))>>4,a=(15&r)<<4|(i=this._keyStr.indexOf(t.charAt(s++)))>>2,n=(3&i)<<6|(c=this._keyStr.indexOf(t.charAt(s++))),o+=String.fromCharCode(e),64!=i&&(o+=String.fromCharCode(a)),64!=c&&(o+=String.fromCharCode(n));return o=this._utf8_decode(o)},k.prototype._utf8_encode=function(t){t=t.replace(/\r\n/g,"\n");for(var e="",a=0;a<t.length;a++){var n=t.charCodeAt(a);n<128?e+=String.fromCharCode(n):n>127&&n<2048?(e+=String.fromCharCode(n>>6|192),e+=String.fromCharCode(63&n|128)):(e+=String.fromCharCode(n>>12|224),e+=String.fromCharCode(n>>6&63|128),e+=String.fromCharCode(63&n|128))}return e},k.prototype._utf8_decode=function(t){for(var e="",a=0,n=0,r=0,i=0;a<t.length;)(n=t.charCodeAt(a))<128?(e+=String.fromCharCode(n),a++):n>191&&n<224?(r=t.charCodeAt(a+1),e+=String.fromCharCode((31&n)<<6|63&r),a+=2):(r=t.charCodeAt(a+1),i=t.charCodeAt(a+2),e+=String.fromCharCode((15&n)<<12|(63&r)<<6|63&i),a+=3);return e}},1151:function(t,e,a){"use strict";a.d(e,"i",(function(){return i})),a.d(e,"h",(function(){return c})),a.d(e,"e",(function(){return o})),a.d(e,"a",(function(){return s})),a.d(e,"q",(function(){return u})),a.d(e,"b",(function(){return l})),a.d(e,"l",(function(){return d})),a.d(e,"k",(function(){return m})),a.d(e,"m",(function(){return f})),a.d(e,"p",(function(){return p})),a.d(e,"d",(function(){return v})),a.d(e,"j",(function(){return h})),a.d(e,"n",(function(){return g})),a.d(e,"g",(function(){return y})),a.d(e,"o",(function(){return k})),a.d(e,"c",(function(){return E})),a.d(e,"f",(function(){return S}));var n=a(116),r=a(320),i=function(t){var e="".concat(r.a,"/task/admin/taskList");return n.a.post(e,t)},c=function(t){var e="".concat(r.a,"/other/admin/spiders");return n.a.post(e,t)},o=function(t){var e="".concat(r.a,"/task/admin/checkTask");return n.a.post(e,t)},s=function(t){var e="".concat(r.a,"/task/admin/add");return n.a.post(e,t)},u=function(t){var e="".concat(r.a,"/task/admin/updateTask");return n.a.post(e,t)},l=function(t){var e="".concat(r.a,"/task/admin/assignedTask");return n.a.post(e,t)},d=function(t){var e="".concat(r.a,"/task/admin/modifyTaskState");return n.a.post(e,t)},m=function(t){var e="".concat(r.a,"/task/admin/finishTC");return n.a.post(e,t)},f=function(t){var e="".concat(r.a,"/task/admin/updateTCstate");return n.a.post(e,t)},p=function(t){var e="".concat(r.a,"/task/admin/taskBack");return n.a.post(e,t)},v=function(t){var e="".concat(r.a,"/task/admin/delTask");return n.a.post(e,t)},h=function(t){var e="".concat(r.a,"/task/admin/isConvertActivity");return n.a.post(e,t)},g=function(t){var e="".concat(r.a,"/task/admin/delete");return n.a.post(e,t)},y=function(t){var e="".concat(r.a,"/customer/admin/tree");return n.a.post(e,t)},k=function(t){var e="".concat(r.a,"/task/admin/publishTask");return n.a.post(e,t)},E=function(t){var e="".concat(r.a,"/task/admin/cancelPublishTask");return n.a.post(e,t)},S=function(t){var e="".concat(r.a,"/task/admin/operationRecord");return n.a.post(e,t)}},1152:function(t,e,a){"use strict";a.d(e,"i",(function(){return i})),a.d(e,"d",(function(){return c})),a.d(e,"a",(function(){return o})),a.d(e,"e",(function(){return s})),a.d(e,"h",(function(){return u})),a.d(e,"g",(function(){return l})),a.d(e,"b",(function(){return d})),a.d(e,"c",(function(){return m})),a.d(e,"f",(function(){return f})),a.d(e,"k",(function(){return p})),a.d(e,"l",(function(){return v})),a.d(e,"j",(function(){return h})),a.d(e,"m",(function(){return g}));var n=a(116),r=a(320),i=function(t){var e="".concat(r.a,"/activityRecruit/admin/query");return n.a.post(e,t.params)},c=function(t){var e="".concat(r.a,"/activityRecruit/admin/del");return n.a.post(e,t)},o=function(t){var e="".concat(r.a,"/activityRecruit/admin/add");return n.a.post(e,t)},s=function(t){var e="".concat(r.a,"/activityRecruit/admin/checkActivityRecruit");return n.a.post(e,t)},u=function(t){var e="".concat(r.a,"/activityRecruit/admin/update");return n.a.post(e,t)},l=function(t){var e="".concat(r.a,"/activityEnter/admin/queryActivityEnter");return n.a.post(e,t)},d=function(t){var e="".concat(r.a,"/activityEnter/admin/audit");return n.a.post(e,t)},m=function(t){var e="".concat(r.a,"/activityEnter/admin/checkActivityEnter");return n.a.post(e,t)},f=function(t){var e="".concat(r.a,"/activityRecruit/admin/enable");return n.a.post(e,t)},p=function(t){var e="".concat(r.a,"/other/admin/cms/params");return n.a.post(e,t)},v=function(t){var e="".concat(r.a,"/other/admin/cms/lists");return n.a.post(e,t)},h=function(t){var e="".concat(r.a,"/other/api/getCmsWebEditorUrl");return n.a.post(e,t)},g=function(t){var e="".concat(r.a,"/other/admin/getTenantid");return n.a.post(e,t)}},1178:function(t,e,a){},1179:function(t,e,a){},1224:function(t,e,a){"use strict";a.r(e);a(322);var n=a(181),r=(a(1113),a(1112)),i=(a(146),a(41)),c=(a(1108),a(1109)),o=(a(1114),a(1115)),s=(a(325),a(85)),u=(a(321),a(117)),l=a(174),d=a(175),m=a(177),f=a(176),p=a(179),v=a(178),h=(a(324),a(84)),g=(a(241),a(180)),y=(a(1110),a(1111)),k=a(0),E=a.n(k),S=a(147),C=a(1151),b=(a(1178),a(489)),D=a(1152),N=(a(1116),a(1117)),T=a(1147),A=(a(1179),g.a.Search,h.a.Option,y.a.confirm),w=function(t){function e(){var t;return Object(l.a)(this,e),(t=Object(m.a)(this,Object(f.a)(e).call(this))).getTags=function(t,e){var a="\u6682\u672a\u8bbe\u7f6e";return t.map((function(t){t.dictionaryId===e&&(a=t.dictionaryValue)})),a},t.confirm=function(e){var a={state:e,ids:t.currentId};D.b(a).then((function(e){e.success&&(u.a.success("\u5ba1\u6838\u6210\u529f\uff01"),t.props.onOk())}))},t.mulpDelete=function(){var e=Object(p.a)(t);A({title:"\u786e\u8ba4\u4e0d\u901a\u8fc7",content:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u9a73\u56de\u6240\u9009\u6d3b\u52a8\u7533\u8bf7?",onOk:function(){e.confirm(3)}})},t.mulpAccept=function(){var e=Object(p.a)(t);A({title:"\u786e\u8ba4\u901a\u8fc7",content:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u901a\u8fc7\u6240\u9009\u6d3b\u52a8\u7533\u8bf7?",onOk:function(){e.confirm(2)}})},t.state={selectedRowKeys:[],tableData:[],totalCount:0,loading:!1},t.imgPrev=sessionStorage.getItem("imgPrev"),t}return Object(v.a)(e,t),Object(d.a)(e,[{key:"componentDidMount",value:function(){this.props.getList,this.state.params}},{key:"render",value:function(){var t=this.props,e=t.detailData,a=void 0===e?{}:e,r=t.serverArea,o=void 0===r?[]:r,s=t.serverType,u=void 0===s?[]:s,l=(t.zzmm,t.jyxl,t.spiderData),d=void 0===l?[]:l,m=a.ActivityEnter,f=void 0===m?{}:m,p=a.ActivityRecruit,v=void 0===p?{}:p,h=a.CustomerInfo,g=void 0===h?{}:h;this.currentId||(this.currentId=f.activityenterid);var y=f.state;return E.a.createElement(E.a.Fragment,null,E.a.createElement(c.a,{className:"breadcrumbBox"},E.a.createElement(c.a.Item,null,E.a.createElement(T.a,{onClick:this.props.onOk,to:"/ActivityCheckList"},this.props.navTitle)),E.a.createElement(c.a.Item,null,E.a.createElement(T.a,{to:"/ActivityCheckList",className:"active"},"\u62db\u52df\u6d3b\u52a8\u62a5\u540d\u7533\u8bf7\u8be6\u60c5"))),E.a.createElement("div",{className:"eachPageBox ActivityCheckList-detail-part"},E.a.createElement(n.a,{tip:"\u5ba1\u6838\u4e2d...",spinning:this.state.loading},E.a.createElement("div",{className:"part-content"},E.a.createElement("div",{className:"detail-panel-part"},E.a.createElement("div",{className:"panel-part-title"},"\u6d3b\u52a8\u4fe1\u606f"),E.a.createElement("div",{className:"panel-img"},E.a.createElement("div",{className:"img-inner"},E.a.createElement("img",{src:v.cover?this.imgPrev+v.cover:"",alt:""}))),E.a.createElement("div",{className:"content-part"},E.a.createElement("div",{className:"content-line"},"\u6d3b\u52a8\u540d\u79f0\uff1a",v.activityname),E.a.createElement("div",{className:"content-line"},"\u6d3b\u52a8\u5730\u70b9\uff1a",v.address),E.a.createElement("div",{className:"content-line"},"\u6d3b\u52a8\u5730\u533a\uff1a",this.getTags(o,v.areaid)),E.a.createElement("div",{className:"content-line"},"\u670d\u52a1\u7c7b\u578b\uff1a",this.getTags(u,v.activitytype)),E.a.createElement("div",{className:"content-line"},"\u62a5\u540d\u65f6\u95f4\uff1a",v.recruitstarttime," ~ ",v.recruitendtime),E.a.createElement("div",{className:"content-line"},"\u6d3b\u52a8\u65f6\u95f4\uff1a",v.activitystarttime," ~ ",v.activityendtime),E.a.createElement("div",{className:"content-line"},"\u62db\u52df\u4eba\u6570\uff1a",v.hascount,"/",0==v.recruitcount?"\u65e0\u9650\u5236":v.recruitcount),E.a.createElement("div",{className:"content-line"},"\u6d3b\u52a8\u63cf\u8ff0\uff1a",E.a.createElement("div",{className:"textarea-part",dangerouslySetInnerHTML:{__html:v.activitydesc}})))),E.a.createElement("div",{className:"detail-panel-part"},E.a.createElement("div",{className:"panel-part-title"},"\u7533\u8bf7\u4eba\u4fe1\u606f"),E.a.createElement("div",{className:"panel-img panel-img-right"},E.a.createElement("div",{className:"img-inner img-right"},E.a.createElement("img",{src:g.thridInfo&&g.thridInfo.avatar?g.thridInfo&&g.thridInfo.avatar:"",alt:""}))),E.a.createElement("div",{className:"content-part"},E.a.createElement("div",{className:"content-line"},"\u7533\u8bf7\u4eba\u8d26\u53f7\u540d\uff1a",g.customername),E.a.createElement("div",{className:"content-line"},"\u7533\u8bf7\u4eba\u59d3\u540d\uff1a",g.realname),E.a.createElement("div",{className:"content-line"},"\u7533\u8bf7\u4eba\u8054\u7cfb\u7535\u8bdd\uff1a",g.contactphone),E.a.createElement("div",{className:"content-line"},"\u7533\u8bf7\u4eba\u6240\u5c5e\u7ec4\u7ec7\uff1a",function(t){var e="\u6682\u672a\u8bbe\u7f6e";return d.map((function(a){a.userId==t&&(e=a.userName)})),e}(g.spiderid)),E.a.createElement("div",{className:"content-line"},"\u670d\u52a1\u5730\u533a\uff1a",this.getTags(o,g.servicearea)),E.a.createElement("div",{className:"content-line"},"\u670d\u52a1\u7c7b\u578b\uff1a",this.getTags(u,g.servicetype)),E.a.createElement("div",{className:"content-line"},"\u7533\u8bf7\u65f6\u95f4\uff1a",f.subdate),E.a.createElement("div",{className:"content-line"},"\u7533\u8bf7\u63cf\u8ff0\uff1a",f.remark)))),E.a.createElement("div",{className:"button-part"},E.a.createElement(i.a,{onClick:this.props.back},"\u8fd4\u56de"),1==y?E.a.createElement(i.a,{onClick:this.mulpAccept,type:"primary",htmlType:"submit"},"\u901a\u8fc7"):"",1==y?E.a.createElement(i.a,{onClick:this.mulpDelete,type:"danger",htmlType:"submit",ghost:!0},"\u4e0d\u901a\u8fc7"):""))))}}]),e}(k.Component),O=N.a.create({name:"detailForm"})(w),x=Object(S.c)((function(t){var e=t.message,a=t.navTitle;return{listData:e.listData,listLoading:e.listLoading,navTitle:a.navTitle}}),(function(t){return{getList:t.message.getList}}))(O),I=a(1150),L=a(20),_=a.n(L),j=a(323),R=y.a.confirm,z=g.a.Search,B=h.a.Option,J=function(t){function e(){var t;return Object(l.a)(this,e),(t=Object(m.a)(this,Object(f.a)(e).call(this))).onSelectChange=function(e,a){var n=[],r=[];a.map((function(t){r.push(t),n.push(t.activityenterid)})),t.setState({selectedRowKeys:n,selectRows:r})},t.getSpidersList=function(){C.h({pageSize:1e4}).then((function(e){var a=e&&e.data&&e.data.pageRecords||[];localStorage.setItem("spiderData",JSON.stringify(a)),t.setState({spiderData:a})}))},t.onRowEvent=function(e){var a=[],n=[];a.push(e.activityenterid),n.push(e),t.setState({selectedRowKeys:a,selectRows:n})},t.getDataList=function(){var e=Object.assign(t.searchData,t.listData);t.setState({emptyTxt:"\u52a0\u8f7d\u4e2d",tableData:[],isLoad:!0}),D.g(e).then((function(e){if(e.success){var a=e&&e.data.data||[],n=Array.isArray(a)?a:[];t.setState({tableData:n,totalCount:e.data&&e.data.totalCount||0,isLoad:!1},(function(){t.state.tableData.length||t.setState({emptyTxt:"\u6682\u65e0\u6570\u636e"})}))}}))},t.onShowSizeChange=function(e,a){t.listData.pageno=e,t.listData.pagesize=a,t.getDataList()},t.pageBack=function(){t.setState({pageType:!0})},t.getSearviceType=function(){b.h().then((function(e){var a=e&&Array.isArray(e.data)?e.data:[];localStorage.setItem("serverType",JSON.stringify(a)),t.setState({serverType:a})}))},t.getSearviceArea=function(){b.g().then((function(e){var a=e&&Array.isArray(e.data)?e.data:[];localStorage.setItem("serverArea",JSON.stringify(a)),t.setState({serverArea:a})}))},t.confirm=function(e,a){var n=[];e.map((function(t){n.push(t.activityenterid)}));var r={state:a,ids:n.join(",")};t.setState({checking:!0}),D.b(r).then((function(e){e.success&&(u.a.info(e.message),t.getDataList(),t.setState({selectRows:[],selectedRowKeys:[],checking:!1}))}))},t.lookDetail=function(e){if(e){var a={id:e};D.c(a).then((function(e){e.success&&t.setState({currentDetail:e.data,pageType:!1})}))}},t.onOk=function(){t.getDataList(),t.setState({pageType:!0})},t.mulpDelete=function(){if(console.log(t.state.selectRows),!t.state.selectRows||t.state.selectRows.length<1)u.a.info("\u8bf7\u9009\u62e9\u5ba1\u6838\u9879!");else{var e=Object(p.a)(t);R({title:"\u786e\u8ba4\u4e0d\u901a\u8fc7",content:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u9a73\u56de\u6240\u9009\u6d3b\u52a8\u7533\u8bf7?",onOk:function(){e.confirm(e.state.selectRows,3)}})}},t.mulpAccept=function(){if(console.log(t.state.selectRows),!t.state.selectRows||t.state.selectRows.length<1)u.a.info("\u8bf7\u9009\u62e9\u5ba1\u6838\u9879!");else{var e=Object(p.a)(t);R({title:"\u786e\u8ba4\u901a\u8fc7",content:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u901a\u8fc7\u6240\u9009\u6d3b\u52a8\u7533\u8bf7?",onOk:function(){e.confirm(e.state.selectRows,2)}})}},t.state={selectedRowKeys:[],tableData:[],totalCount:0,emptyTxt:"\u52a0\u8f7d\u4e2d...",params:{pageSize:10,page:1},currentDetail:{},pageType:!0,serverType:JSON.parse(localStorage.getItem("serverType"))||[],serverArea:JSON.parse(localStorage.getItem("serverArea"))||[],zzmm:[],jxyl:[],searchData:{},isLoad:!1,checking:!1,spiderData:JSON.parse(localStorage.getItem("spiderData"))||[]},t.listData={pageno:1,pagesize:10},t.searchData={},t}return Object(v.a)(e,t),Object(d.a)(e,[{key:"componentDidMount",value:function(){var t=this,e=(this.props.getList,this.state.params,Object(j.a)().login_chinamcloud_tid);e!==localStorage.getItem("login_tid")?(localStorage.setItem("login_tid",e),this.getSearviceType(),this.getSearviceArea(),this.getSpidersList()):(localStorage.getItem("serverType")||this.getSearviceType(),localStorage.getItem("serverArea")||this.getSearviceArea(),localStorage.getItem("spiderData")||this.getSpidersList()),setTimeout((function(){t.getDataList()}))}},{key:"render",value:function(){var t=this,e=this.state,a=e.selectedRowKeys,u=e.spiderData,l=this.listData,d={selectedRowKeys:a,onChange:this.onSelectChange},m={pageSize:l.pagesize,total:this.state.totalCount,current:l.pageno,showTotal:function(t){return"\u5171 ".concat(t," \u6761\u6570\u636e")},showSizeChanger:!0,onShowSizeChange:this.onShowSizeChange,onChange:this.onShowSizeChange},f=[{title:"\u6d3b\u52a8\u540d\u79f0",dataIndex:"activityname",align:"left",width:160,render:function(t,e){return E.a.createElement(s.a,{placement:"topLeft",title:t},E.a.createElement("span",null,t))}},{title:"\u6d3b\u52a8\u5730\u533a",dataIndex:"areaid",align:"left",width:90,render:function(e,a){var n="";return t.state.serverArea.map((function(t){t.dictionaryId==e&&(n=t.dictionaryValue)})),E.a.createElement("span",null,n)}},{title:"\u6d3b\u52a8\u7c7b\u578b",dataIndex:"activitytype",align:"left",width:80,render:function(e,a){var n="";return t.state.serverType.map((function(t){t.dictionaryId==e&&(n=t.dictionaryValue)})),E.a.createElement("span",null,n)}},{title:"\u7533\u8bf7\u4eba",dataIndex:"customername",align:"left",width:90,render:function(t,e){return E.a.createElement(s.a,{placement:"topLeft",title:t},E.a.createElement("span",null,t))}},{title:"\u670d\u52a1\u7c7b\u578b",dataIndex:"servicetype",align:"left",width:90,render:function(e,a){var n="";return t.state.serverType.map((function(t){t.dictionaryId==e&&(n=t.dictionaryValue)})),E.a.createElement("span",null,n)}},{title:"\u7533\u8bf7\u65f6\u95f4",dataIndex:"subdate",align:"left",width:150,render:function(t,e){var a=t&&_()(t).format("YYYY-MM-DD HH:mm:ss");return E.a.createElement("span",null,a)}},{title:"\u5ba1\u6838\u72b6\u6001",dataIndex:"state",align:"left",width:80,render:function(t,e){return E.a.createElement("span",null,I.b[t])}},{title:"\u64cd\u4f5c",align:"left",width:140,render:function(e,a){return E.a.createElement("div",{role:"button",tabIndex:"-1",style:{whiteSpace:"nowrap"},onClick:function(t){t&&t.preventDefault(),t&&t.stopPropagation()}},E.a.createElement("a",{role:"button",tabIndex:"0",className:"tableOperateButton",onClick:function(e){t.lookDetail(a&&a.activityenterid||"")}},"\u67e5\u770b"),1==a.state?E.a.createElement(o.a,{placement:"right",title:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u901a\u8fc7\u6240\u9009\u6d3b\u52a8\u7533\u8bf7?",okType:"danger",onConfirm:function(){return t.confirm([a],2)},okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88"},E.a.createElement("a",{role:"button",className:"tableOperateButton",type:"link"},"\u901a\u8fc7")):"",1==a.state?E.a.createElement(o.a,{placement:"right",title:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u9a73\u56de\u6240\u9009\u6d3b\u52a8\u7533\u8bf7?",okType:"danger",onConfirm:function(){return t.confirm([a],3)},okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88"},E.a.createElement("a",{role:"button",className:"tableOperateButton",type:"link"},"\u4e0d\u901a\u8fc7")):"")}}];return this.state.pageType?E.a.createElement(E.a.Fragment,null,E.a.createElement(c.a,{className:"breadcrumbBox"},E.a.createElement(c.a.Item,null,E.a.createElement("span",{className:"title-active"},this.props.navTitle))),E.a.createElement("div",{className:"eachPageBox ActivityCheckList-page"},E.a.createElement("div",{style:{height:"100%"}},E.a.createElement("div",{className:"navTopBox"},E.a.createElement("div",{className:"btnBox"},E.a.createElement(i.a,{type:"primary",onClick:this.mulpAccept},"\u901a\u8fc7"),E.a.createElement(i.a,{type:"danger",ghost:!0,onClick:this.mulpDelete},"\u4e0d\u901a\u8fc7")),E.a.createElement("div",{className:"searchFatherBox searchLeftPadding"},E.a.createElement("div",{className:"searchBox "},E.a.createElement("span",{className:"item-search-part"},"\u5ba1\u6838\u72b6\u6001\uff1a",E.a.createElement(h.a,{value:this.state.searchData.state,placeholder:"\u5168\u90e8",style:{width:120},onChange:function(e){t.listData.pageno=1,t.listData.pagesize=10,t.searchData.state=e,t.setState({searchData:t.searchData}),t.getDataList()}},E.a.createElement(B,{value:""},"\u5168\u90e8"),Object.keys(I.b).map((function(t,e){return E.a.createElement(B,{value:t,key:e},I.b[t])})))),E.a.createElement(z,{placeholder:"\u8bf7\u8f93\u5165\u7533\u8bf7\u4eba\u540d/\u6d3b\u52a8\u540d",enterButton:"\u641c\u7d22",value:this.state.searchData.keyName,onChange:function(e){t.searchData.keyName=e.target.value,t.setState({searchData:t.searchData})},onSearch:function(e){t.searchData.keyName=e,t.getDataList()},style:{width:240}})))),E.a.createElement("div",{className:"tableCont mainContentBox",style:{height:"calc(100% - 121px)"}},E.a.createElement(n.a,{tip:"\u5ba1\u6838\u4e2d...",spinning:this.state.checking},E.a.createElement(r.a,{rowKey:"activityenterid",columns:f,rowSelection:d,pagination:!this.state.isLoad&&m,dataSource:this.state.tableData,locale:{emptyText:this.state.emptyTxt},onRow:function(e,a){return{index:a,onClick:t.onRowEvent.bind(t,e)}},scroll:{x:"100%",y:"calc(100vh - 291px)"}})))))):E.a.createElement(x,{serverArea:this.state.serverArea,serverType:this.state.serverType,detailData:this.state.currentDetail,spiderData:u,zzmm:this.state.zzmm||[],jyxl:this.state.jxyl||[],onOk:this.onOk,back:this.pageBack})}}]),e}(k.Component);e.default=Object(S.c)((function(t){var e=t.message,a=t.navTitle;return{listData:e.listData,listLoading:e.listLoading,navTitle:a.navTitle}}),(function(t){return{getList:t.message.getList}}))(J)},489:function(t,e,a){"use strict";a.d(e,"d",(function(){return l})),a.d(e,"j",(function(){return d})),a.d(e,"i",(function(){return m})),a.d(e,"h",(function(){return f})),a.d(e,"g",(function(){return p})),a.d(e,"o",(function(){return v})),a.d(e,"n",(function(){return h})),a.d(e,"b",(function(){return g})),a.d(e,"e",(function(){return y})),a.d(e,"m",(function(){return k})),a.d(e,"l",(function(){return E})),a.d(e,"c",(function(){return S})),a.d(e,"k",(function(){return C})),a.d(e,"f",(function(){return b})),a.d(e,"a",(function(){return D}));var n=a(116),r=a(320),i=a(182),c=a(323),o=Object(i.a)(window.location.search).stag;o&&(o=o.replace("/",""));var s=Object(c.a)(),u={};u="H"===o?{access_token:s.access_token,stag:"H"}:{login_id:s.login_chinamcloud_id,login_tid:s.login_chinamcloud_tid,stag:"B"};var l=function(t){var e="".concat(r.a,"/customer/admin/clist");return n.a.post(e,t.params)},d=function(t){var e=r.a+"/customer/admin/list";return n.a.post(e,t.params)},m=function(t){var e=r.a+"/customer/admin/show";return n.a.post(e,t)},f=function(t){var e=r.a+"/other/admin/servertype";return n.a.post(e,{})},p=function(t){var e=r.a+"/other/admin/serverarea";return n.a.post(e,{})},v=function(t){var e=r.a+"/customer/admin/uploadFace";return n.a.post(e,t)},h=function(t){var e=r.a+"/picture/admin/upload";return n.a.post(e,t)},g=function(t){var e=r.a+"/customer/admin/modify";return n.a.post(e,t)},y=function(t){var e="",a=Object.keys(u).length;Object.keys(u).map((function(t,n){e+="".concat(t,"=").concat(u[t]).concat(n+1==a?"":"&")}));var i=r.a+"/dict/admin/all?".concat(e);return n.a.get(i)},k=function(t){var e=r.a+"/customer/admin/apply";return n.a.post(e,t)},E=function(t){var e=r.a+"/customer/admin/addScore";return n.a.post(e,t)},S=function(t){var e=r.a+"/customer/admin/times";return n.a.post(e,t)},C=function(t){var e=r.a+"/customer/admin/utime";return n.a.post(e,t)},b=function(t){var e=r.a+"/customer/admin/invite/list";return n.a.post(e,t)},D=function(t){var e=r.a+"/customer/admin/invite";return n.a.post(e,t)}}}]);