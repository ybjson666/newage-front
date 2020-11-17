import request from '@/utils/request';
import {api} from '../utils/config';
/**
 * 获取心愿列表
 */
export const getTaskList = (data) => {
  let url = `${api}/task/admin/taskList`;
  return request.post(url, data);
};
/**
 * 获取站所列表
 */
export const getSpidersList = (data) => {
  let url = `${api}/other/admin/spiders`;
  return request.post(url, data);
};
/**
 * 获取任务详情
 */
export const getCheckTask = (data) => {
  let url = `${api}/task/admin/checkTask`;
  return request.post(url, data);
};
/**
 * 新建任务
 */
export const addTask = (data) => {
  let url = `${api}/task/admin/add`;
  return request.post(url, data);
};
/**
 * 新建任务
 */
export const updateTask = (data) => {
  let url = `${api}/task/admin/updateTask`;
  return request.post(url, data);
};
/**
 * 任务指派
 */
export const assignedTask = (data) => {
  let url = `${api}/task/admin/assignedTask`;
  return request.post(url, data);
};
/**
 * 任务完成
 */
export const modifyTaskState = (data) => {
  let url = `${api}/task/admin/modifyTaskState`;
  return request.post(url, data);
};
/**
 * 站所任务完成
 */
export const modifyFinishTC = (data) => {
  let url = `${api}/task/admin/finishTC`;
  return request.post(url, data);
};
/**
 * 站所确认完成
 */
export const modifyUpdateTCstate = (data) => {
  let url = `${api}/task/admin/updateTCstate`;
  return request.post(url, data);
};
/**
 * 任务退回
 */
export const taskBack = (data) => {
  let url = `${api}/task/admin/taskBack`;
  return request.post(url, data);
};
/**
 * 全部删除心愿
 */
export const delWish = (data) => {
  let url = `${api}/task/admin/delTask`;
  return request.post(url, data);
};
/**
 * 删除心愿前查看有无活动
 */
export const isConvertTask = (data) => {
  let url = `${api}/task/admin/isConvertActivity`;
  return request.post(url, data);
};
/**
 * 仅删除任务
 */
export const onlyDelWish = (data) => {
  let url = `${api}/task/admin/delete`;
  return request.post(url, data);
};

/**获取转派对象 */
export const getRedeploys=(data)=>{
  let url = `${api}/customer/admin/tree`;
  return request.post(url,data);
}
/**发布任务**/
export const pubTask=(data)=>{
  let url = `${api}/task/admin/publishTask`;
  return request.post(url,data);
}
/**取消发布任务**/
export const cancelpubTask=(data)=>{
  let url = `${api}/task/admin/cancelPublishTask`;
  return request.post(url,data);
}
/**获取操作记录**/
export const getRecord=(data)=>{
  let url = `${api}/task/admin/operationRecord`;
  return request.post(url,data);
}