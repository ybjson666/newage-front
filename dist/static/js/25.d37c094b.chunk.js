(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{1199:function(e,t,a){},1231:function(e,t,a){"use strict";a.r(t);a(1110);var n=a(1111),i=(a(322),a(181)),s=(a(1118),a(1119)),l=(a(491),a(118)),r=(a(1116),a(1117)),c=(a(241),a(180)),u=(a(1113),a(1112)),o=(a(1140),a(1141)),m=(a(146),a(41)),p=(a(1108),a(1109)),d=(a(321),a(117)),h=a(174),y=a(175),f=a(177),g=a(176),b=a(178),E=a(0),v=a.n(E),x=a(147),T=(a(1199),a(116)),k=a(320),D=function(e){var t="".concat(k.a,"/config/admin/add");return T.a.post(t,e)},C=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(f.a)(this,Object(g.a)(t).call(this))).getDataList=function(){e.setState({emptyTxt:"\u52a0\u8f7d\u4e2d",tableData:[]}),function(e){var t="".concat(k.a,"/config/admin/list");return T.a.post(t,e)}({}).then((function(t){if(t.success){var a=t&&t.data||[],n="",i="",s=Array.isArray(a)?a:[];s.map((function(e,t){e.index=t+1})),s.forEach((function(e){"WishGroup"===e.syskey?n=e.sysvalue:"WishAutoCheck"===e.syskey&&(i=e.sysvalue)})),e.setState({tableData:s,isOpen:n,isOpenWish:i,totalCount:t.data&&t.data.totalCount||0},(function(){e.state.tableData.length||e.setState({emptyTxt:"\u6682\u65e0\u6570\u636e"})}))}}))},e.lookDetail=function(t,a){t&&("TaskExpressTime"===a.syskey?e.setState({currentDetail:a,visible:!0,pageType:"editTask",editValue:a.sysvalue}):e.setState({currentDetail:a,visible:!0,pageType:"edit",editValue:a.sysvalue}))},e.createRule=function(t){var a="";switch(t){case"public":a="\u521d\u59cb\u5316\u516c\u4f17\u53f7";break;case"mini":a="\u521d\u59cb\u5316\u5c0f\u7a0b\u5e8f";break;case"task":a="\u8bbe\u7f6e\u4efb\u52a1\u8d85\u65f6\u65f6\u95f4"}e.setState({visible:!0,addType:t,title:a,pageType:"add"})},e.handleOk=function(){e.props.form.validateFieldsAndScroll((function(t,a){t||("edit"===e.state.pageType?(a.id=e.state.currentDetail.sysconfigid,e.onUpdate(a)):e.onSubmit(a))}))},e.handleCancel=function(){e.state.loading||(e.setState({visible:!1,addType:"",pageType:"",currentDetail:{},editValue:""}),e.props.form.resetFields())},e.onSubmit=function(t){e.setState({loading:!0}),D(t).then((function(t){t.success&&(d.a.success("\u4fdd\u5b58\u6210\u529f"),e.getDataList(),setTimeout((function(){e.handleCancel()}),0))})).catch((function(e){d.a.error("\u4fdd\u5b58\u5931\u8d25")})).finally((function(t){e.setState({loading:!1})}))},e.onUpdate=function(t){e.setState({loading:!0}),function(e){var t="".concat(k.a,"/config/admin/update");return T.a.post(t,e)}(t).then((function(t){t.success&&(d.a.success("\u4fdd\u5b58\u6210\u529f"),e.getDataList(),setTimeout((function(){e.handleCancel()}),0))})).catch((function(e){d.a.error("\u4fdd\u5b58\u5931\u8d25")})).finally((function(t){e.setState({loading:!1})}))},e.switchControl=function(t,a){e.setState({isOpen:t?"1":"0"},(function(){D({wishGroup:t?"1":"0"}).then((function(t){200==t.state&&(d.a.success("\u4fee\u6539\u6210\u529f"),e.getDataList())}))}))},e.switchWishControl=function(t,a){e.setState({isOpenWish:t?"1":"0"},(function(){D({wishCheck:t?"1":"0"}).then((function(t){200==t.state&&(d.a.success("\u4fee\u6539\u6210\u529f"),e.getDataList())}))}))},e.state={emptyTxt:"\u52a0\u8f7d\u4e2d...",currentDetail:{},pageType:!0,visible:!1,loading:!1,isOpen:"",isOpenWish:""},e}return Object(b.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){e.getDataList()}))}},{key:"render",value:function(){var e=this,t={labelCol:{xs:{span:12},sm:{span:6}},wrapperCol:{xs:{span:12},sm:{span:18}}},a=[{title:"\u5e8f\u53f7",dataIndex:"index",align:"left",width:60,render:function(e,t){return v.a.createElement("span",null,e)}},{title:"\u914d\u7f6e\u4ee3\u7801",dataIndex:"syskey",align:"left",render:function(e,t){return v.a.createElement("span",null,e)}},{title:"\u914d\u7f6e\u503c",dataIndex:"sysvalue",align:"left",render:function(e,t){return v.a.createElement("span",null,e)}},{title:"\u914d\u7f6e\u63cf\u8ff0",dataIndex:"name",align:"left",render:function(e,t){return v.a.createElement("span",null,e)}},{title:"\u64cd\u4f5c",align:"left",width:60,render:function(t,a){return v.a.createElement("div",{role:"button",tabIndex:"-1",style:{whiteSpace:"nowrap"},onClick:function(e){e&&e.preventDefault(),e&&e.stopPropagation()}},v.a.createElement("a",{role:"button",tabIndex:"0",className:"tableOperateButton",onClick:function(t){e.lookDetail(a&&a.sysconfigid||"",a)}},"\u4fee\u6539"))}}],d=this.props.form.getFieldDecorator,h=function(e){return e.replace(/^(0+)|[^\d]+/g,"")};return v.a.createElement(v.a.Fragment,null,v.a.createElement(p.a,{className:"breadcrumbBox"},v.a.createElement(p.a.Item,null,v.a.createElement("span",{className:"title-active"},this.props.navTitle))),v.a.createElement("div",{className:"eachPageBox ActivityCheckList-page"},v.a.createElement("div",{style:{height:"100%"}},v.a.createElement("div",{className:"navTopBox"},v.a.createElement("div",{className:"btnBox"},v.a.createElement(m.a,{type:"primary",onClick:function(){return e.createRule("public")}},"\u521d\u59cb\u5316\u516c\u4f17\u53f7"),v.a.createElement(m.a,{type:"primary",onClick:function(){return e.createRule("mini")}},"\u521d\u59cb\u5316\u5c0f\u7a0b\u5e8f"),v.a.createElement(m.a,{type:"primary",onClick:function(){return e.createRule("task")}},"\u8bbe\u7f6e\u4efb\u52a1\u8d85\u65f6\u65f6\u95f4"),v.a.createElement("div",{className:"switch-btn-wraps",style:{marginRight:20}},v.a.createElement("span",{style:{marginRight:10}},"\u662f\u5426\u53d1\u5e03\u5fc3\u613f\u5230\u7ad9\u6240"),v.a.createElement(o.a,{checkedChildren:"\u662f",unCheckedChildren:"\u5426",checked:"1"==this.state.isOpen,onClick:function(t,a){e.switchControl(t,a)}})))),v.a.createElement("div",{className:"tableCont mainContentBox",style:{height:"calc(100% - 121px)"}},v.a.createElement(u.a,{rowKey:"sysconfigid",columns:a,pagination:!1,dataSource:this.state.tableData,locale:{emptyText:this.state.emptyTxt},scroll:{x:"100%",y:"calc(100vh - 291px)"}}))),v.a.createElement(n.a,{title:"edit"===this.state.pageType||"editTask"===this.state.pageType?"\u4fee\u6539\u914d\u7f6e\u503c":this.state.title,visible:this.state.visible,className:"rule-modal",onCancel:this.handleCancel,onOk:this.handleOk,okText:"\u786e \u8ba4",confirmLoading:this.state.loading,maskClosable:!1},v.a.createElement(i.a,{tip:"\u4fdd\u5b58\u4e2d...",spinning:this.state.loading},v.a.createElement(r.a,Object.assign({className:"form-part"},{labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},{onSubmit:this.handleSubmit}),v.a.createElement("div",{className:"detail-panel-part-activity"},"public"===this.state.addType&&"add"===this.state.pageType?v.a.createElement("div",null,v.a.createElement(l.a,null,v.a.createElement(r.a.Item,Object.assign({label:"APP_ID"},t),d("subAppId",{initialValue:this.state.currentDetail.subAppId,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u516c\u4f17\u53f7APP_ID"}]})(v.a.createElement(c.a,{style:{width:"300px"},placeholder:"\u8bf7\u8f93\u5165\u516c\u4f17\u53f7APP_ID"})))),v.a.createElement(l.a,null,v.a.createElement(r.a.Item,Object.assign({label:"SecurityKey"},t),d("subAppSec",{initialValue:this.state.currentDetail.subAppSec,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u516c\u4f17\u53f7SecurityKey"}]})(v.a.createElement(c.a,{style:{width:"300px"},placeholder:"\u8bf7\u8f93\u5165\u516c\u4f17\u53f7SecurityKey"}))))):"","mini"===this.state.addType&&"add"===this.state.pageType?v.a.createElement("div",null,v.a.createElement(l.a,null,v.a.createElement(r.a.Item,Object.assign({label:"APP_ID"},t),d("miniProId",{initialValue:this.state.currentDetail.miniProId,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5c0f\u7a0b\u5e8fAPP_ID"}]})(v.a.createElement(c.a,{style:{width:"300px"},placeholder:"\u8bf7\u8f93\u5165\u5c0f\u7a0b\u5e8fAPP_ID"})))),v.a.createElement(l.a,null,v.a.createElement(r.a.Item,Object.assign({label:"SecurityKey"},t),d("miniProSec",{initialValue:this.state.currentDetail.miniProSec,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5c0f\u7a0b\u5e8fSecurityKey"}]})(v.a.createElement(c.a,{style:{width:"300px"},placeholder:"\u8bf7\u8f93\u5165\u5c0f\u7a0b\u5e8fSecurityKey"}))))):"","task"===this.state.addType?v.a.createElement("div",null,v.a.createElement(l.a,null,v.a.createElement(r.a.Item,Object.assign({label:"\u914d\u7f6e\u503c"},t),d("expressTime",{initialValue:this.state.currentDetail.TaskExpressTime,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u914d\u7f6e\u503c"}]})(v.a.createElement(s.a,{max:9999,min:0,style:{width:"300px"},placeholder:"\u8bf7\u8f93\u5165\u914d\u7f6e\u503c",formatter:h,parser:h})),v.a.createElement("span",{style:{marginLeft:"5px"}},"\u5c0f\u65f6")))):"","edit"===this.state.pageType?v.a.createElement("div",null,v.a.createElement(l.a,null,v.a.createElement(r.a.Item,Object.assign({label:"\u914d\u7f6e\u503c"},t),d("value",{initialValue:this.state.editValue,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u914d\u7f6e\u503c"}]})(v.a.createElement(c.a,{style:{width:"300px"},placeholder:"\u8bf7\u8f93\u5165\u914d\u7f6e\u503c"}))))):"","editTask"===this.state.pageType?v.a.createElement("div",null,v.a.createElement(l.a,null,v.a.createElement(r.a.Item,Object.assign({label:"\u914d\u7f6e\u503c"},t),d("expressTime",{initialValue:this.state.editValue,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u914d\u7f6e\u503c"}]})(v.a.createElement(s.a,{max:9999,min:0,style:{width:"300px"},placeholder:"\u8bf7\u8f93\u5165\u914d\u7f6e\u503c",formatter:h,parser:h})),v.a.createElement("span",{style:{marginLeft:"5px"}},"\u5c0f\u65f6")))):""))))))}}]),t}(E.Component),S=r.a.create({name:"detailForm"})(C);t.default=Object(x.c)((function(e){var t=e.message,a=e.navTitle;return{listData:t.listData,listLoading:t.listLoading,navTitle:a.navTitle}}),(function(e){return{getList:e.message.getList}}))(S)}}]);