import axios from 'axios';
import Qs from 'qs';
import { message } from 'antd';
import getCookie from './cookie';
export const urlParam = function(url) {
  const useUrl = url.split('/#')[0];
  const search = useUrl.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
};
//头
const urlParams = urlParam(window.top.location.href);
//b:loginid login tid
// h :access_token
const cookieData=getCookie();
const stag = urlParams.stag;
let headerData = {};
if (stag === 'B') {
  headerData = {
    login_id:cookieData.login_chinamcloud_id,
    login_tid: cookieData.login_chinamcloud_tid,
    stag:"B"
  };
} else {
  headerData = {
    access_token: cookieData.access_token,
    stag: 'H'
  };
}

const request = axios.create({
  timeout: 10000,
});
request.interceptors.request.use(
  config => {
    return config;
  },
  err => Promise.reject(err)
);
request.interceptors.response.use(
  res => {
      return res.data;
  },
  err => {
    Promise.reject(err);
  }
);
export default request;
