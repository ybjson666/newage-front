import React from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Main from '@/pages/Main/index';
import { sysconfigAll } from './api/basic';


// 配置moment
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
import { cmcSbumenu } from '@/utils/frame';
window.clearStorage=function(){
  localStorage.removeItem('spiderData');
  localStorage.removeItem('jxyl');
  localStorage.removeItem('jfgz');
  localStorage.removeItem('serverArea');
  localStorage.removeItem('serverType');
  localStorage.removeItem('zzmm');
  localStorage.removeItem('login_tid');
}

function App() {
  cmcSbumenu();
  
  sysconfigAll().then(res => {
    if (!res || !res.success) return;
    const data = res.data;
    sessionStorage.setItem('imgPrev',data)
    // data.map(ele => {
    //   if (ele.SysKey == 'IMAGE_URL') {
    //     sessionStorage.setItem('imgPrev',ele.SysValue)
    //   }
    // });
  });
  return (
    <ConfigProvider locale={zh_CN}>
      <Main/>
    </ConfigProvider>
  );
}

export default App;
