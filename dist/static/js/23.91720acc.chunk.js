(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1193:function(e,t,a){},1228:function(e,t,a){"use strict";a.r(t);a(322);var n=a(181),i=(a(492),a(60)),r=(a(1118),a(1119)),c=(a(491),a(118)),o=(a(1116),a(1117)),s=(a(1113),a(1112)),l=(a(146),a(41)),u=(a(1108),a(1109)),d=(a(1114),a(1115)),m=(a(325),a(85)),p=(a(321),a(117)),f=a(174),g=a(175),h=a(177),v=a(176),b=a(178),y=(a(324),a(84)),S=(a(241),a(180)),D=(a(1110),a(1111)),w=a(0),E=a.n(w),C=a(147),x=(a(1193),a(489)),T=a(116),k=a(320),O=a(20),R=a.n(O),j=a(323),I=(D.a.confirm,S.a.Search,y.a.Option,function(e){function t(){var e;return Object(f.a)(this,t),(e=Object(h.a)(this,Object(v.a)(t).call(this))).onSelectChange=function(t,a){var n=[],i=[];a.map((function(e){i.push(e),n.push(e.activityenterid)})),e.setState({selectedRowKeys:n,selectRows:i})},e.onRowEvent=function(t){var a=[],n=[];a.push(t.activityenterid),n.push(t),e.setState({selectedRowKeys:a,selectRows:n})},e.getDataList=function(){var t=Object.assign(e.searchData,e.listData);e.setState({emptyTxt:"\u52a0\u8f7d\u4e2d",tableData:[]}),function(e){var t="".concat(k.a,"/scoreRule/admin/list");return T.a.post(t,e)}(t).then((function(t){if(t.success){var a=t&&t.data.data||[],n=Array.isArray(a)?a:[];e.setState({tableData:n,totalCount:t.data&&t.data.totalCount||0},(function(){e.state.tableData.length||e.setState({emptyTxt:"\u6682\u65e0\u6570\u636e"})}))}}))},e.onShowSizeChange=function(t,a){e.listData.pageNo=t,e.listData.pageSize=a,e.getDataList()},e.pageBack=function(){e.setState({pageType:!0})},e.getSearviceType=function(){x.h().then((function(t){var a=t&&Array.isArray(t.data)?t.data:[];e.setState({serverType:a})}))},e.getSearviceArea=function(){x.g().then((function(t){var a=t&&Array.isArray(t.data)?t.data:[];e.setState({serverArea:a})}))},e.deleteItem=function(t){var a=[];t.map((function(e){a.push(e.scoreruleid)})),function(e){var t="".concat(k.a,"/scoreRule/admin/delete");return T.a.post(t,e)}({ruleIds:a.join(",")}).then((function(t){t.success&&(p.a.info(t.message),e.getDataList(),e.setState({selectRows:[],selectedRowKeys:[]}))}))},e.lookDetail=function(t){t&&function(e){var t="".concat(k.a,"/scoreRule/admin/show");return T.a.post(t,e)}({ruleId:t}).then((function(t){t.success&&e.setState({currentDetail:t.data,visible:!0,pageType:"edit"})}))},e.onOk=function(){e.getDataList(),e.setState({pageType:!0})},e.createRule=function(){e.setState({visible:!0})},e.getDict=function(){x.e().then((function(t){if(t&&t.success){var a=t&&Array.isArray(t.data)?t.data:[],n=[];a.map((function(e){"SCORERULE"===e.DictType&&n.push(e)})),localStorage.setItem("jfgz",JSON.stringify(n)),e.setState({jfgz:n})}}))},e.handleOk=function(){e.props.form.validateFieldsAndScroll((function(t,a){t||("edit"===e.state.pageType?(a.RuleID=e.state.currentDetail.scoreruleid,e.onUpdate(a)):e.onSubmit(a))}))},e.handleCancel=function(){e.state.loading||(e.setState({visible:!1,pageType:"",currentDetail:{}}),e.props.form.resetFields())},e.onSubmit=function(t){e.setState({loading:!0}),function(e){var t="".concat(k.a,"/scoreRule/admin/add");return T.a.post(t,e)}(t).then((function(t){t.success&&(p.a.success("\u4fdd\u5b58\u6210\u529f"),e.getDataList(),setTimeout((function(){e.handleCancel()}),0))})).catch((function(e){p.a.error("\u4fdd\u5b58\u5931\u8d25")})).finally((function(t){e.setState({loading:!1})}))},e.onUpdate=function(t){e.setState({loading:!0}),function(e){var t="".concat(k.a,"/scoreRule/admin/modify");return T.a.post(t,e)}(t).then((function(t){t.success&&(p.a.success("\u4fdd\u5b58\u6210\u529f"),e.getDataList(),setTimeout((function(){e.handleCancel()}),0))})).catch((function(e){p.a.error("\u4fdd\u5b58\u5931\u8d25")})).finally((function(t){e.setState({loading:!1})}))},e.confirm=function(t,a){(function(e){var t="".concat(k.a,"/scoreRule/admin/enable");return T.a.post(t,e)})({enable:1==a?0:1,ruleIds:t.join(",")}).then((function(t){if(t&&t.success){var n=1==a?"\u7981\u7528\u6210\u529f":"\u542f\u7528\u6210\u529f";p.a.success(n),e.getDataList(),e.setState({selectRows:[],selectedRowKeys:[]})}}))},e.state={selectedRowKeys:[],tableData:[],totalCount:0,emptyTxt:"\u52a0\u8f7d\u4e2d...",currentDetail:{},pageType:!0,serverType:[],serverArea:[],jfgz:JSON.parse(localStorage.getItem("jfgz"))||[],searchData:{},visible:!1,loading:!1},e.listData={pageNo:1,pageSize:10},e.searchData={},e}return Object(b.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=Object(j.a)().login_chinamcloud_tid;t!==localStorage.getItem("login_tid")?(localStorage.setItem("login_tid",t),this.getDict()):localStorage.getItem("jfgz")||this.getDict(),setTimeout((function(){e.getDataList()}))}},{key:"render",value:function(){var e=this,t=this.state.selectedRowKeys,a=this.listData,p={selectedRowKeys:t,onChange:this.onSelectChange},f={labelCol:{xs:{span:12},sm:{span:6}},wrapperCol:{xs:{span:12},sm:{span:18}}},g={pageSize:a.pageSize,total:this.state.totalCount,current:a.pageNo,showTotal:function(e){return"\u5171 ".concat(e," \u6761\u6570\u636e")},showSizeChanger:!0,onShowSizeChange:this.onShowSizeChange,onChange:this.onShowSizeChange},h=[{title:"\u79ef\u5206\u89c4\u5219\u540d\u79f0",dataIndex:"rulename",align:"left",width:180,render:function(e,t){return E.a.createElement(m.a,{placement:"topLeft",title:e},E.a.createElement("span",null,e))}},{title:"\u8fbe\u6210\u6761\u4ef6",dataIndex:"ruleconditionid",align:"left",width:90,render:function(t,a){var n="";return e.state.jfgz.map((function(e){e.DictID==t&&(n=e.DictName)})),E.a.createElement("span",null,n)}},{title:"\u5bf9\u5e94\u79ef\u5206\u6570",dataIndex:"scorevalue",align:"left",width:80,render:function(e,t){return E.a.createElement("span",null,e)}},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"subdate",align:"left",width:150,render:function(e,t){var a=e&&R()(e).format("YYYY-MM-DD HH:mm:ss");return E.a.createElement("span",null,a)}},{title:"\u72b6\u6001",dataIndex:"enable",align:"left",width:80,render:function(e,t){return E.a.createElement("span",null,1==e?"\u542f\u7528":"\u7981\u7528")}},{title:"\u64cd\u4f5c",align:"left",width:140,render:function(t,a){return E.a.createElement("div",{role:"button",tabIndex:"-1",style:{whiteSpace:"nowrap"},onClick:function(e){e&&e.preventDefault(),e&&e.stopPropagation()}},E.a.createElement("a",{role:"button",tabIndex:"0",className:"tableOperateButton",onClick:function(t){e.lookDetail(a&&a.scoreruleid||"")}},"\u67e5\u770b"),E.a.createElement("a",{role:"button",tabIndex:"0",onClick:function(){return e.confirm([a.scoreruleid],a.enable)},className:"tableOperateButton",type:"link"},1==a.enable?"\u7981\u7528":"\u542f\u7528"),E.a.createElement(d.a,{placement:"right",title:"\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u56de,\u662f\u5426\u786e\u8ba4\u5220\u9664\u6240\u9009\u79ef\u5206\u89c4\u5219?",okType:"danger",onConfirm:function(){return e.deleteItem([a])},okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88"},E.a.createElement("a",{role:"button",className:"tableOperateButton",type:"link"},"\u5220\u9664")))}}],v=this.props.form.getFieldDecorator;return E.a.createElement(E.a.Fragment,null,E.a.createElement(u.a,{className:"breadcrumbBox"},E.a.createElement(u.a.Item,null,E.a.createElement("span",{className:"title-active"},this.props.navTitle))),E.a.createElement("div",{className:"eachPageBox ActivityCheckList-page"},E.a.createElement("div",{style:{height:"100%"}},E.a.createElement("div",{className:"navTopBox"},E.a.createElement("div",{className:"btnBox"},E.a.createElement(l.a,{type:"primary",onClick:this.createRule},"\u65b0\u5efa\u79ef\u5206\u89c4\u5219"))),E.a.createElement("div",{className:"tableCont mainContentBox",style:{height:"calc(100% - 121px)"}},E.a.createElement(s.a,{rowKey:"scoreruleid",columns:h,rowSelection:p,pagination:g,dataSource:this.state.tableData,locale:{emptyText:this.state.emptyTxt},onRow:function(t,a){return{index:a,onClick:e.onRowEvent.bind(e,t)}},scroll:{x:"100%",y:"calc(100vh - 291px)"}}))),E.a.createElement(D.a,{title:"edit"==this.state.pageType?"\u67e5\u770b\u79ef\u5206\u89c4\u5219":"\u65b0\u5efa\u79ef\u5206\u89c4\u5219",visible:this.state.visible,className:"rule-modal",onCancel:this.handleCancel,onOk:this.handleOk,okText:"\u4fdd\u5b58",confirmLoading:this.state.loading,maskClosable:!1},E.a.createElement(n.a,{tip:"\u4fdd\u5b58\u4e2d...",spinning:this.state.loading},E.a.createElement(o.a,Object.assign({className:"form-part"},{labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},{onSubmit:this.handleSubmit}),E.a.createElement("div",{className:"detail-panel-part-activity"},E.a.createElement(c.a,null,E.a.createElement(o.a.Item,Object.assign({label:"\u79ef\u5206\u89c4\u5219\u540d\u79f0"},f),v("RuleName",{initialValue:this.state.currentDetail.rulename,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u79ef\u5206\u89c4\u5219\u540d\u79f0"}]})(E.a.createElement(S.a,{maxLength:20,style:{width:"200px"},placeholder:"\u8bf7\u8f93\u5165\u79ef\u5206\u89c4\u5219\u540d\u79f0"})))),E.a.createElement(c.a,null,E.a.createElement(o.a.Item,Object.assign({label:"\u8fbe\u6210\u6761\u4ef6"},f),v("RuleConditionID",{initialValue:this.state.currentDetail.ruleconditionid?this.state.currentDetail.ruleconditionid+"":void 0,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8fbe\u6210\u6761\u4ef6"}]})(E.a.createElement(y.a,{disabled:this.cancleEdit,style:{width:"200px"},placeholder:"\u8bf7\u9009\u62e9\u8fbe\u6210\u6761\u4ef6"},this.state.jfgz.map((function(e,t){return E.a.createElement(y.a.Option,{key:t,value:e.DictID+""},e.DictName)})))))),E.a.createElement(c.a,null,E.a.createElement(o.a.Item,Object.assign({label:"\u5956\u52b1\u79ef\u5206\u6570"},f),v("ScoreValue",{initialValue:this.state.currentDetail.scorevalue,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5956\u52b1\u79ef\u5206\u6570"},{pattern:/^[1-9]\d*$/,message:"\u8bf7\u586b\u5199\u6b63\u6574\u6570"}]})(E.a.createElement(r.a,{min:0,maxLength:3}))," ",E.a.createElement("span",{className:"text-margin"}," \u79ef\u5206"))),"edit"===this.state.pageType?E.a.createElement(c.a,null,E.a.createElement(i.a,{span:12},"\u521b\u5efa\u65f6\u95f4 : ",this.state.currentDetail.subdate)):""))))))}}]),t}(w.Component)),N=o.a.create({name:"detailForm"})(I);t.default=Object(C.c)((function(e){var t=e.message,a=e.navTitle;return{listData:t.listData,listLoading:t.listLoading,navTitle:a.navTitle}}),(function(e){return{getList:e.message.getList}}))(N)},489:function(e,t,a){"use strict";a.d(t,"d",(function(){return u})),a.d(t,"j",(function(){return d})),a.d(t,"i",(function(){return m})),a.d(t,"h",(function(){return p})),a.d(t,"g",(function(){return f})),a.d(t,"o",(function(){return g})),a.d(t,"n",(function(){return h})),a.d(t,"b",(function(){return v})),a.d(t,"e",(function(){return b})),a.d(t,"m",(function(){return y})),a.d(t,"l",(function(){return S})),a.d(t,"c",(function(){return D})),a.d(t,"k",(function(){return w})),a.d(t,"f",(function(){return E})),a.d(t,"a",(function(){return C}));var n=a(116),i=a(320),r=a(182),c=a(323),o=Object(r.a)(window.location.search).stag;o&&(o=o.replace("/",""));var s=Object(c.a)(),l={};l="H"===o?{access_token:s.access_token,stag:"H"}:{login_id:s.login_chinamcloud_id,login_tid:s.login_chinamcloud_tid,stag:"B"};var u=function(e){var t="".concat(i.a,"/customer/admin/clist");return n.a.post(t,e.params)},d=function(e){var t=i.a+"/customer/admin/list";return n.a.post(t,e.params)},m=function(e){var t=i.a+"/customer/admin/show";return n.a.post(t,e)},p=function(e){var t=i.a+"/other/admin/servertype";return n.a.post(t,{})},f=function(e){var t=i.a+"/other/admin/serverarea";return n.a.post(t,{})},g=function(e){var t=i.a+"/customer/admin/uploadFace";return n.a.post(t,e)},h=function(e){var t=i.a+"/picture/admin/upload";return n.a.post(t,e)},v=function(e){var t=i.a+"/customer/admin/modify";return n.a.post(t,e)},b=function(e){var t="",a=Object.keys(l).length;Object.keys(l).map((function(e,n){t+="".concat(e,"=").concat(l[e]).concat(n+1==a?"":"&")}));var r=i.a+"/dict/admin/all?".concat(t);return n.a.get(r)},y=function(e){var t=i.a+"/customer/admin/apply";return n.a.post(t,e)},S=function(e){var t=i.a+"/customer/admin/addScore";return n.a.post(t,e)},D=function(e){var t=i.a+"/customer/admin/times";return n.a.post(t,e)},w=function(e){var t=i.a+"/customer/admin/utime";return n.a.post(t,e)},E=function(e){var t=i.a+"/customer/admin/invite/list";return n.a.post(t,e)},C=function(e){var t=i.a+"/customer/admin/invite";return n.a.post(t,e)}}}]);