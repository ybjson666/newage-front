import request from '@/utils/request';
import { api } from '../utils/config';

/**
 * 获取配置列表
 */
export const getConfigList = (data) => {
  let url = `${api}/config/admin/list`;
  return request.post(url, data);
};
/**
 * 修改配置
 */
export const configUpdate = (data) => {
  let url = `${api}/config/admin/update`;
  return request.post(url, data);
};
/**
 * 配置新增
 */
export const configAdd = (data) => {
  let url = `${api}/config/admin/add`;
  return request.post(url, data);
};
