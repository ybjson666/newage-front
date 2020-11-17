import request from '@/utils/request';
import { api } from '../utils/config';

/**
 * 获取资源类型列表
 */
export const getResourceTypeList = (data) => {
  let url = `${api}/activity/order/type/admin/list`;
  return request.post(url, data);
};
/**
 * 创建资源类型
 */
export const addResourceType = (data) => {
  let url = `${api}/activity/order/type/admin/add`;
  return request.post(url, data);
};
/**
 * 修改资源类型
 */
export const modifyResourceType = (data) => {
  let url = `${api}/activity/order/type/admin/modify`;
  return request.post(url, data);
};
/**
 * 删除资源类型
 */
export const delResourceType = (data) => {
  let url = `${api}/activity/order/type/admin/del`;
  return request.post(url, data);
};
/**
 * 启用，禁用资源类型
 */
export const enableResourceType = (data) => {
  let url = `${api}/activity/order/type/admin/enable`;
  return request.post(url, data);
};
