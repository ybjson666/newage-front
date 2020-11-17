import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
  BrowserHistory,
} from 'react-router-dom';
import defaultRoutes from '@/routes';
import connect from 'react-redux/es/connect/connect';
import './index.less';
import { browserHistory } from 'react-router';
import { message} from 'antd';

class Main extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      initialDone: true, // 如果有动态渲染的菜单默认为false,在接口的成功回调里改为true
    };
  }
  componentDidMount() {
    window.top.postMessage('getNavTitle','*');
    window.addEventListener(
      'message',
      e => {
        // console.log(e);
        if((typeof e.data == 'object')&&e.data.key == "getNavTitle"){
          if(e.data.value){
            const titlePrev=e.data.value;
            this.props.getNavTitle(titlePrev);
            // this.setState({titlePrev});
          }
        }
      }
    );
    // 监听hash的变化
    message.config({
      // top: 100,
      // duration: 2,
      maxCount: 1,
    });
    window.addEventListener('hashchange', function() {
      // 通过location.hash获取相应的hash值，然后处理不同的业务逻辑，切换不同的页面模块
      $(window).scrollTop(0);
    });

  }

  render() {
    //路由的声明.
    let RoutesDOM = (
      <Switch>
        { defaultRoutes }
      </Switch>
    );

    return (
      <div id="main">
        <div
          className='box'
          style={{ width: '100%', margin: '0px auto 0 auto', paddingTop: window.hasV2?'':'0',display: '-webkit-flex',justifyContent:'center',minHeight:'100vh' }}
        >
          <div style={{ width:'100%',background: '#f3f3f3', minHeight: '100%',flex:1,padding:'10px 15px'}}>
            <div className='tabCon' style={{ width: '100%', padding: '0', margin: '0' }}>
              {this.state.initialDone ? RoutesDOM : <div className='spinner' />}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapState = ({ channel, message }) => ({
  // ChannelsInfo:state.channel.ChannelsInfo,
  // listLoading: state.message.listLoading,
});

const mapDispatch = ({ navTitle }) => ({
  getNavTitle: navTitle.getNavTitle,
})

export default connect(mapState,mapDispatch)(Main);

