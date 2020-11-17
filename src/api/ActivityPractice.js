import request from '@/utils/request';
import {api} from '../utils/config';
/**
 * 获取活动者列表
 */
export const getActivityList = (data) => {
  let url = `${api}/activityPractice/admin/query`;
  return request.post(url, data.params);
};
/**
 * 活动删除
 */
export const activityDel = (data) => {
  let url = `${api}/activityPractice/admin/del`;
  return request.post(url, data);
};
/**
 * 添加活动
 */
export const activityAdd = (data) => {
  let url = `${api}/activityPractice/admin/add`;
  return request.post(url, data);
};
/**
 * 查看活动
 */
export const activityDetail = (data) => {
  let url = `${api}/activityPractice/admin/checkActivityRecruit`;
  return request.post(url, data);
};
/**
 * 修改活动
 */
export const activityUpdate = (data) => {
  let url = `${api}/activityPractice/admin/update`;
  return request.post(url, data);
};


/**
 * 实践活动参与者移除
 */
export const activityDeletePracticeEnter = (data) => {
    let url = `${api}/activityPractice/admin/deletePracticeEnter`;
    return request.post(url, data);
  };
/**
 * 实践活动参与者查看
 */
export const activityCheckActivityPracticeEnter = (data) => {
    let url = `${api}/activityPractice/admin/checkActivityPracticeEnter`;
    return request.post(url, data);
  };
/************** 实践活动报名审核********************************************/
/**
 * 活动报名审核
 */
export const activityAudit = (data) => {
  let url = `${api}/activityPracticeEnter/admin/audit`;
  return request.post(url, data);
};/**
 * 实践活动审核报名查看
 */
export const activityCheckActivityEnter = (data) => {
    let url = `${api}/activityPracticeEnter/admin/checkActivityEnter`;
    return request.post(url, data);
  };
/**
 * 实践活动报名审核列表
 */
export const activityQueryActivityEnter = (data) => {
  let url = `${api}/activityPracticeEnter/admin/queryActivityEnter`;
  return request.post(url, data);
};
/**
 * 实践活动启用/禁用
 */
export const activityEnable = (data) => {
  let url = `${api}/activityPractice/admin/enable`;
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
