import request from '@/utils/request';
import {api} from '../utils/config';
/**
 * 获取活动者列表
 */
export const getActivityList = (data) => {
  let url = `${api}/activityRecruit/admin/query`;
  return request.post(url, data.params);
};
/**
 * 活动删除
 */
export const activityDel = (data) => {
  let url = `${api}/activityRecruit/admin/del`;
  return request.post(url, data);
};
/**
 * 添加活动
 */
export const activityAdd = (data) => {
  let url = `${api}/activityRecruit/admin/add`;
  return request.post(url, data);
};
/**
 * 查看活动
 */
export const activityDetail = (data) => {
  let url = `${api}/activityRecruit/admin/checkActivityRecruit`;
  return request.post(url, data);
};
/**
 * 修改活动
 */
export const activityUpdate = (data) => {
  let url = `${api}/activityRecruit/admin/update`;
  return request.post(url, data);
};
/**
 * 修改活动
 */
export const activityQueryActivityEnter = (data) => {
  let url = `${api}/activityEnter/admin/queryActivityEnter`;
  return request.post(url, data);
};
/**
 * 活动报名审核
 */
export const activityAudit = (data) => {
  let url = `${api}/activityEnter/admin/audit`;
  return request.post(url, data);
};/**
 * 活动报名查看
 */
export const activityCheckActivityEnter = (data) => {
  let url = `${api}/activityEnter/admin/checkActivityEnter`;
  return request.post(url, data);
};
/**
 * 活动启用/禁用
 */
export const activityEnable = (data) => {
  let url = `${api}/activityRecruit/admin/enable`;
  return request.post(url, data);
};
//获取文编编辑框参数
export const getParams=(data)=>{
  let url = `${api}/other/admin/cms/params`;
  return request.post(url, data);
}
//获取总结记录
export const getSumRecords=(data)=>{
  let url = `${api}/other/admin/cms/lists`;
  return request.post(url, data);
}
//获取发布文稿编辑框前缀
export const getConfig=(data)=>{
  let url = `${api}/other/api/getCmsWebEditorUrl`;
  return request.post(url, data);
}
//获取租户ID
export const getTenantId=(data)=>{
  let url = `${api}/other/admin/getTenantid`;
  return request.post(url, data);
}