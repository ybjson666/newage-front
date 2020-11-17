import axios from 'axios';
import Qs from 'qs';
import { message } from 'antd';
import { codeMessage } from '@/constants/config';
import { getIdsObj } from './getIdsObj.js';
import getCookie from './cookie';

// 导出静态方法
const all = axios.all;
const spread = axios.spread;
//头
const urlParams = getIdsObj(window.location.search);
const cookieData = getCookie();
if(!localStorage.getItem('login_tid')){
  localStorage.setItem('login_tid',cookieData.login_chinamcloud_tid)
}
let stag = urlParams.stag;
if (stag) {
  stag = stag.replace('\/', '');
}

//stag='H'

let headerData = {};
if (stag === 'H') {
  headerData = {
    access_token: cookieData.access_token,
    stag: 'H'
  };
} else {
  headerData = {
    login_id: cookieData.login_cmc_id?cookieData.login_cmc_id:cookieData.login_chinamcloud_id,
    login_tid: cookieData.login_cmc_tid?cookieData.login_cmc_tid:cookieData.login_chinamcloud_tid,
    stag: 'B'
  };
  // headerData = {
  //   login_id: cookieData.login_cmc_id?cookieData.login_cmc_id:"",
  //   login_tid: cookieData.login_cmc_tid?cookieData.login_cmc_tid:"",
  //   stag: 'B'
  // };
}
const request = axios.create({
  timeout: 60000
});
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截
request.interceptors.request.use(
  config => {
    if (config.data) {
      config.data = Object.assign(config.data, headerData);
    }
    if (config.method == 'post') {
      config.data = Qs.stringify(config.data);
    }
    return config;
  },
  err => Promise.reject(err)
);

// 响应拦截
request.interceptors.response.use(
  res => {
    if(res.data.state===700004){
      localStorage.removeItem('spiderData');
      localStorage.removeItem('jxyl');
      localStorage.removeItem('jfgz');
      localStorage.removeItem('serverArea');
      localStorage.removeItem('serverType');
      localStorage.removeItem('zzmm');
      localStorage.removeItem('login_tid');
    }
    if (res.data && res.data.state == 200 || res.data.state == true) {
      return res.data;
    }
    if (res.data && res.data.code === 10000) {
      return res.data;
    }
    if (res.data && res.data.state != 200 && res.data.state != true) {
      message.error(res.data.message);
      return res.data;
    }
    // http异常
    if (res.status !== 200) {
      let msgNode = document.querySelectorAll('.ant-message');
      if (!msgNode.length) {
        message.error(codeMessage[res.status]);
      }
      return;
    }
  },
  err => {
    if (err.response && err.response.status >= 400 && codeMessage[err.response.status]) {
      let msgNode = document.querySelectorAll('.ant-message');
      if (!msgNode.length) {
        message.error(codeMessage[err.response.status]);
      }
    }
    Promise.reject(err);
  }
);

export { all, spread };
export default request;
