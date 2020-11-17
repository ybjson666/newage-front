import request from '@/utils/request';
import {api} from '../utils/config';
/**
 * 获取心愿列表
 */
export const getWishList = (data) => {
  let url = `${api}/wish/admin/wishList`;
  return request.post(url, data);
};
/**
 * 获取心愿详情
 */
export const getWishDetail = (data) => {
  let url = `${api}/wish/admin/checkWish`;
  return request.post(url, data);
};
/**
 * 获取心愿审核
 */
export const setWishAudit = (data) => {
  let url = `${api}/wish/admin/wishAudit`;
  return request.post(url, data);
};
/**
 * 保存心愿详情
 */
export const saveWish = (data) => {
  let url = `${api}/wish/admin/wishAudit`;
  return request.post(url, data);
};
/**
 * 修改心愿
 */
export const updateWish = (data) => {
  let url = `${api}/wish/admin/updateWish`;
  return request.post(url, data);
};
/**
 * 全部删除心愿
 */
export const delWish = (data) => {
  let url = `${api}/wish/admin/delWish`;
  return request.post(url, data);
};
/**
 * 删除心愿前查看有无任务
 */
export const isConvertTask = (data) => {
  let url = `${api}/wish/admin/isConvertTask`;
  return request.post(url, data);
};
/**
 * 仅删除心愿
 */
export const onlyDelWish = (data) => {
  let url = `${api}/wish/admin/onlyDelWish`;
  return request.post(url, data);
};
