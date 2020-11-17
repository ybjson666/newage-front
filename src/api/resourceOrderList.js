import request from '@/utils/request';
import { api } from '../utils/config';

/**
 * 获取资源预约列表
 */
export const getResourceBookList = (data) => {
  let url = `${api}/resource/book/admin/resourceBookList`;
  return request.post(url, data);
};
/**
 * 资源预约审核
 */
export const getAuditAll = (data) => {
  let url = `${api}/resource/book/admin/auditAll`;
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
  let url = `${api}/resource/book/admin/check`;
  return request.post(url, data);
};

