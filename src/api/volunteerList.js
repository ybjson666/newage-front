import request from '@/utils/request';
import { api } from '../utils/config';
import { getIdsObj } from '../utils/getIdsObj';
import getCookie from '../utils/cookie';
//头
const urlParams = getIdsObj(window.location.search);
let stag = urlParams.stag;
if (stag) {
  stag = stag.replace('\/', '');
}
const cookieData = getCookie();
let headerData = {};
if (stag === 'H') {
  headerData = {
    access_token: cookieData.access_token,
    stag: 'H'
  };
} else {
  headerData = {
    login_id: cookieData.login_chinamcloud_id,
    login_tid: cookieData.login_chinamcloud_tid,
    stag: 'B'
  };
  // headerData = {
  //   login_id: cookieData.login_cmc_id,
  //   login_tid: cookieData.login_cmc_tid,
  //   stag: 'B'
  // };
}
/**
 * 获取志愿者列表
 */
export const getClist = (data) => {
  let url = `${api}/customer/admin/clist`;
  return request.post(url, data.params);
};
export const getVolunteerList = (data) => {
  let url = api + `/customer/admin/list`;
  return request.post(url, data.params);
};
export const getVolunteerDetail = (data) => {
  let url = api + `/customer/admin/show`;
  return request.post(url, data);
};
// 服务类型
export const getServertype = (data) => {
  let url = api + `/other/admin/servertype`;
  return request.post(url, {});
};
// 服务地区
export const getServerarea = (data) => {
  let url = api + `/other/admin/serverarea`;
  return request.post(url, {});
};
// 上传图片
export const uploadImg = (data) => {
  let url = api + `/customer/admin/uploadFace`;
  return request.post(url, data);
};
// 上传自定义图片
export const uploadCustomImg = (data) => {
  let url = api + `/picture/admin/upload`;
  return request.post(url, data);
};
// 修改
export const customModify = (data) => {
  let url = api + `/customer/admin/modify`;
  return request.post(url, data);
};
// 获取学历，政治面貌
export const getDictAll = (data) => {
  let str = '';
  const len = Object.keys(headerData).length;
  Object.keys(headerData).map((key, index) => {
    str += `${key}=${headerData[key]}${index + 1 == len ? '' : '&'}`;
  });
  let url = api + `/dict/admin/all?${str}`;
  return request.get(url);
};
// 审核不通过
export const setAdminApply = (data) => {
  let url = api + `/customer/admin/apply`;
  return request.post(url, data);
};
//添加积分
export const setAddScore = (data) => {
  let url = api + `/customer/admin/addScore`;
  return request.post(url, data);
};
//获取活动数据
export const getActvData=(data)=>{
  let url = api + `/customer/admin/times`;
  return request.post(url, data);
}
//修改活动时长
export const modifyTimes=(data)=>{
  let url = api + `/customer/admin/utime`;
  return request.post(url, data);
}
//邀请志愿者列表
export const getInviteVoluns=(data)=>{
  let url = api + `/customer/admin/invite/list`;
  return request.post(url, data);
}
//确认邀请志愿者参加
export const addInvite=(data)=>{
  let url = api + `/customer/admin/invite`;
  return request.post(url, data);
}

