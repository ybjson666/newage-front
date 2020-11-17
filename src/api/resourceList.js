import request from '@/utils/request';
import { api } from '../utils/config';

/**
 * 获取资源列表
 */
export const getResourceList = (data) => {
  let url = `${api}/resource/admin/list`;
  return request.post(url, data);
};
/**
 * 创建资源类型
 *
 */
export const addResource = (data) => {
  let url = `${api}/resource/admin/add`;
  return request.post(url, data);
};
/**
 * 资源详情
 */
export const resourceDetail = (data) => {
  let url = `${api}/resource/admin/showRes`;
  return request.post(url, data);
};
/**
 * 资源预约历史
 */
export const resourceShowHistory = (data) => {
  let url = `${api}/resource/admin/showHistory`;
  return request.post(url, data);
};
/**
 * 修改资源
 */
export const modifyResource = (data) => {
  let url = `${api}/resource/admin/modify`;
  return request.post(url, data);
};
/**
 * 删除资源
 */
export const delResource = (data) => {
  let url = `${api}/resource/admin/del`;
  return request.post(url, data);
};
/**
 * 删除资源
 */
export const enableResource = (data) => {
  let url = `${api}/resource/admin/enable`;
  return request.post(url, data);
};
