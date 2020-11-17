// //详细信息阅览组件
// import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import styles from './style.less';
// import {Button,Row,Col,Icon,message,Input,Badge,Menu} from 'antd';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   HashRouter
// } from 'react-router-dom';
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// // import actionCreators from '../../reducers/';
// import * as nav from '../../actions/nav.action'
// import './style.less'
// // import {GetRequest,secToTime} from '../../until/index'
// // import classnames from 'classnames'
// // import {getCookie} from "../../until";
// // import LiveManage from "../../containers/live";
// // import InterAction from "../../containers/interAction";
// // import InterStatistics from "../../containers/interStatistics";
// // import generalSituation from "../../containers/generalSituation";
// const SubMenu = Menu.SubMenu;
// //根节点数据
// let rootSubmenuKeys = ['distribute', 'material','interactive','set','opinionManage','bigData'];
// class SensitiveWords extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
//         this.state = {
//           data:{},
//           openKeys: ['home','distribute','material','account','interactive','opinionManage','bigData','live','activity'],
//           selectedKeys: ['home'],
//           loading:false,
//         }
//       this.onOpenChange = this.onOpenChange.bind(this);
//       this.menuOnclick = this.menuOnclick.bind(this);
//       this.updateNav = this.updateNav.bind(this);
//     }

//     componentWillReceiveProps(nextProps) {

//     }

//     onOpenChange = (openKeys) => {
//       const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
//       if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//         this.setState({ openKeys });
//       } else {
//         this.setState({
//           openKeys: latestOpenKey ? [latestOpenKey] : [],
//         });
//       }
//     }

//     menuOnclick(e){
//       console.log(this.props);
//       this.setState({
//           selectedKeys:[e.key]
//       })
//        let path = '/' + e.keyPath.reverse().toString().replace(',','/');
//        location.hash = path;
//        $(window).scrollTop(0);
//     }

//     render() {
//       let _this = this;
//       let obj = window.editorData.authority;
//         let menu1 = (function () {
//             //if(obj&&obj.homePage){
//                 return <Menu.Item key="home"><Icon type="home"/>首页</Menu.Item>
//             // }else {
//             //     return ''
//             // };
//         })()
//         let menu2 = (function () {
//             if(obj&&obj.contentManage){
//                 let writeArticle = (function () {
//                     if(obj&&obj.writeArticle){
//                         if(obj.ordinaryArticle){
//                             return <Menu.Item key="manuscript/graphic">内容创作</Menu.Item>
//                         }else {
//                             if(obj.imagesArticle){
//                                 return <Menu.Item key="manuscript/atlas">内容创作</Menu.Item>
//                             }else {
//                                 if(obj.videoArticle){
//                                     return <Menu.Item key="manuscript/video">内容创作</Menu.Item>
//                                 }else {
//                                     return <Menu.Item key="manuscript/link">内容创作</Menu.Item>
//                                 }
//                             }
//                         }

//                     }else {
//                         return ''
//                     }
//                 })()
//                 console.log(writeArticle)
//                 let workManagement = (function () {
//                     if(obj&&obj.articleManage){
//                         return <Menu.Item key="workManagement">作品管理</Menu.Item>
//                     }else {
//                         return ''
//                     }
//                 })()
//                 let weChatGroup = (function () {
//                     if(obj&&obj.wechatPub){
//                         return <Menu.Item key="weChatGroup">微信群发</Menu.Item>
//                     }else {
//                         return ''
//                     }
//                 })()
//                 let materialManagement = (function () {
//                     if(obj&&obj.materialManage){
//                         return <Menu.Item key="materialManagement">素材管理</Menu.Item>
//                     }else {
//                         return ''
//                     }
//                 })()
//                 let ContentSynchronization = (function () {
//                     if(obj&&obj.wechatContent){
//                         return <Menu.Item key="ContentSynchronization">内容同步</Menu.Item>
//                     }else {
//                         return ''
//                     }
//                 })()
//                         let commentManage = (function () {
//                             if(obj&&obj.commentlist){
//                                 return <Menu.Item key="commentManage">评论列表</Menu.Item>
//                             }else {
//                                 return ''
//                             }
//                         })()
//                         let commentAdult = (function () {
//                             if (obj && obj.commentAudit) {
//                                 return <Menu.Item key="commentAdult">评论审核</Menu.Item>
//                             } else {
//                                 return ''
//                             }
//                         })()
//                 return(
//                     <SubMenu key="distribute" title={<span><i className="iconfont icon-tianxie"></i><span>内容发布</span></span>}>
//                         {writeArticle}{weChatGroup}{ContentSynchronization}{workManagement}{materialManagement}{commentManage}{commentAdult}
//                         {/*<Menu.Item key="articleImport">文章导入</Menu.Item>*/}
//                     </SubMenu>
//                 )
//             }else {
//                 return ''
//             }
//         })()
//         let menu3 = (function () {
//             if(obj&&obj.opinionManage){
//                 let relate = (function () {
//                     if(obj&&obj.relatedArticle){
//                         return <Menu.Item key="relate">相关新闻</Menu.Item>
//                     }else{
//                         return ''
//                     }
//                 })()
//                 return(
//                     <SubMenu key="opinionManage" title={<span> <i className="iconfont icon-gaojing"></i><span>融媒舆情库</span></span>}>
//                         {relate}
//                         {/*<Menu.Item key="8">互动信息</Menu.Item>*/}
//                     </SubMenu>
//                 )
//             }else {
//                 return ''
//             }
//         })()
//         let menu4 = (function () {
//             if(obj&&obj.bigData){
//                 let articleStatistics = (function () {
//                     if(obj){
//                         console.log(obj.dataStatistic)
//                     }
//                     if (obj && obj.articleStatistics) {
//                         return <Menu.Item key="articleStatistics">文章统计</Menu.Item>
//                     } else {
//                         return ''
//                     }
//                 })()
//                 let politicsStatistics = (function () {
//                     if(obj &&obj.politicsStatistics){
//                         return <Menu.Item key="interStatistics">问政统计</Menu.Item>
//                     }else {
//                         return''
//                     }
//                 })()
//                 return(
//                     <SubMenu key="bigData" title={<span> <i className="iconfont icon-tubiao-zhuzhuangtu"></i><span>融媒大数据</span></span>}>
//                         <Menu.Item key="generalSituation">总体概况</Menu.Item>
//                         {articleStatistics}
//                         {politicsStatistics}
//                         {/*<Menu.Item key="8">互动信息</Menu.Item>*/}
//                     </SubMenu>
//                 )
//             }else {
//                 return ''
//             }
//         })()
//         // let menu5 = (function () {
//         //     if(obj&&obj.comment){
//         //         let commentManage = (function () {
//         //             if(obj&&obj.commentManage){
//         //                 return <Menu.Item key="commentManage">评论管理</Menu.Item>
//         //             }else {
//         //                 return ''
//         //             }
//         //         })()
//         //         let commentAdult = (function () {
//         //             if (obj && obj.commentAudit) {
//         //                 return <Menu.Item key="commentAdult">评论审核</Menu.Item>
//         //             } else {
//         //                 return ''
//         //             }
//         //         })()
//         //         return(
//         //             <SubMenu key="interactive" title={<span> <Icon type="message" /><span>评论</span></span>}>
//         //                 {commentManage}{commentAdult}
//         //
//         //                 {/*<Menu.Item key="8">互动信息</Menu.Item>*/}
//         //             </SubMenu>
//         //         )
//         //     }else {
//         //         return ''
//         //     }
//         // })()
//         let menu6 = (function () {
//             if(obj&&obj.setting){
//                 let detail = (function () {
//                     if(obj&&obj.accountDetail){
//                         return <Menu.Item key="detail">账号详情</Menu.Item>
//                     }else {
//                         return ''
//                     }
//                 })()
//                 let channelSetting = (function () {
//                     if(obj&&obj.channelSetting){
//                         return <Menu.Item key="channelSetting">渠道设置</Menu.Item>
//                     }else {
//                         return ''
//                     }
//                 })()
//                 let roleManager = (function () {
//                     if(obj&&obj.roleManagement){
//                         return <Menu.Item key="roleManager">角色管理</Menu.Item>
//                     }else {
//                         return ''
//                     }
//                 })()
//                 let manager = (function () {
//                     if(obj&&obj.membersManagement){
//                         return <Menu.Item key="manager">成员管理</Menu.Item>
//                     }else {
//                         return ''
//                     }
//                 })()

//                 let menu = (function () {
//                     if(obj&&obj.customMenu){
//                         return <Menu.Item key="defineMenu">自定义菜单</Menu.Item>
//                     }else {
//                         return ''
//                     }
//                 })()
//                 let type = (function () {
//                     if(obj&&obj.customClassification){
//                         return <Menu.Item key="defineType">自定义分类</Menu.Item>
//                     }else {
//                         return ''
//                     }
//                 })()
//                 return(
//                     <SubMenu key="account" title={<span><i className="iconfont icon-icon_shezhi"></i><span>设置</span></span>}>
//                         {/*<Menu.Item key="adult">账号审核</Menu.Item>*/}
//                         {detail}{channelSetting}{roleManager}{manager}{menu}{type}
//                         {/*<Menu.Item key="defineActivity">自定义互动</Menu.Item>*/}
//                         {/*<Menu.Item key="WordsComment">留言板</Menu.Item>*/}
//                     </SubMenu>
//                 )
//             }else {
//                 return ''
//             }
//         })()
//       if(window.editorData.noNav.indexOf(location.hash.slice(1)) != -1 ){
//           return ( <div></div> )
//       }
//         let menu7 = (function () {
//             if(obj&&obj.livePart){
//                 let liveManage = (function () {
//                     if(obj&&obj.liveManage){
//                         return(
//                             <Menu.Item key="LiveManage">直播管理</Menu.Item>
//                         )
//                     }else {
//                         return ''
//                     }
//                 })()
//                 return(
//                     <SubMenu key="live" title={<span> <Icon type="video-camera" /><span>直播</span></span>}>
//                         {liveManage}
//                     </SubMenu>
//                 )
//             }else {
//                 return ''
//             }
//         })()
//         let activity = (function () {
//            if(obj&&obj.interactionPart){
//                 let politicsManage = (function () {
//                     if(obj&&obj.politicsManage){
//                         return(
//                             <Menu.Item key="interAction">问政</Menu.Item>
//                         )
//                     }else {
//                         return ''
//                     }
//                 })()
//                return(
//                    <SubMenu key="activity" title={<span><i className="iconfont icon-onlineinteraction"></i><span>互动</span></span>}>
//                        {politicsManage}
//                    </SubMenu>
//                )
//            }else {
//                return ''
//            }
//         })()
//         return (

//          <div id="leftNav" style={{Height:727}}>
//             <Menu
//                 mode="inline"
//                 openKeys={this.state.openKeys}
//                 //onOpenChange={this.onOpenChange}
//                 selectedKeys={this.state.selectedKeys}
//                 style={{ width:210,}}
//                 onClick = {this.menuOnclick}
//               >
//                 {/*{menu1}*/}

//                 {menu2}{menu7}{activity}


//                 {menu3}{menu4}
//                 {menu6}
//           </Menu>
//         </div>
//       )
//     }
//     componentDidUpdate(prevProps, prevState) {

//     } 
//     updateNav(){
//         let hash = location.hash.slice(2).split('/');
//         let len = hash.length;
//         if( len == 1){
//             this.setState({
//               //openKeys: [hash[0]],
//               selectedKeys: [hash[0]],
//             })
//         }else if(len >= 2){
//             let obj = window.editorData.authority;
//             let hashHref='graphic';
//             if(obj&&obj.ordinaryArticle){
//                 hashHref='graphic';
//             }else if(obj&&obj.imagesArticle){
//                 hashHref='atlas';
//             }else if(obj&&obj.videoArticle){
//                 hashHref='video';
//             }
//             this.setState({
//                 //openKeys: [hash[0]],
//                 selectedKeys: [ hash[1] == 'manuscript' ? 'manuscript/'+hashHref : hash[1] ],
//             })
//         }
//     }

//     componentDidMount(){
//       let _this = this; 
//       this.updateNav();
//       window.editorData.updateNav = this.updateNav;
//     }

// }


// const mapStateMapProps = state => ({
//     height : state.editConstant.height,
//     noToolbarheight : state.editConstant.noToolbarheight,
// });

// export default connect(mapStateMapProps)(SensitiveWords);