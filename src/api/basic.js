import request from '@/utils/request';
import {api} from '../utils/config';
/**
 * 获取基础配置
 */
// export const sysconfigAll = (data) => {
//   let url = `${api}/sysconfig/admin/all`;
//   return request.get(url, data);
// };
export const sysconfigAll = (data) => {
  let url = `${api}/other/admin/getPicPrefix`;
  return request.get(url, data);
};
