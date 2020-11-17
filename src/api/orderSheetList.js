import request from '@/utils/request';
import { api } from '../utils/config';

/**
 * 获取资源列表
 */
export const getResourceList = (data) => {
  let url = `${api}/activity/order/admin/list`;
  return request.post(url, data);
};
/**
 * 创建点单
 */
export const addResource = (data) => {
  let url = `${api}/activity/order/admin/add`;
  return request.post(url, data);
};
/**
 * 资源详情
 */
export const resourceDetail = (data) => {
  let url = `${api}/activity/order/admin/show`;
  return request.post(url, data);
};
/**
 * 资源预约历史
 */
export const resourceShowHistory = (data) => {
  let url = `${api}/activity/order/admin/book/history`;
  return request.post(url, data);
};
/**
 * 修改资源
 */
export const modifyResource = (data) => {
  let url = `${api}/activity/order/admin/modify`;
  return request.post(url, data);
};
/**
 * 删除资源
 */
export const delResource = (data) => {
  let url = `${api}/activity/order/admin/del`;
  return request.post(url, data);
};
/**
 * 启用/禁用
 */
export const enableResource = (data) => {
  let url = `${api}/activity/order/admin/enable`;
  return request.post(url, data);
};
/**
 * 审核点单
 */
export const applyOrder = (data) => {
  let url = `${api}/activity/order/admin/apply`;
  return request.post(url, data);
};
/**********************************************点单预约审核************************/
/**
 * 获取资源列表
 */
export const getResourceBookList = (data) => {
  let url = `${api}/activity/order/admin/history/list`;
  return request.post(url, data);
};
/**
 * 审核点单
 */
export const getAuditAll = (data) => {
  let url = `${api}/activity/order/admin/apply`;
  return request.post(url, data);
};
/**
 * 资源预约冲突
 */
export const getAudit = (data) => {
  let url = `${api}/resource/book/admin/audit`;
  return request.post(url, data);
};
/**
 * 资源预约查看
 */
export const getCheck = (data) => {
  let url = `${api}/activity/order/admin/history/show`;
  return request.post(url, data);
};
