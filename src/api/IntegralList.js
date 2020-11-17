import request from '@/utils/request';
import {api} from '../utils/config';
/**
 * 获取积分列表
 */
export const getScoreRuleList = (data) => {
  let url = `${api}/scoreRule/admin/list`;
  return request.post(url, data);
};
/**
 * 添加积分规则
 */
export const addRuleList = (data) => {
  let url = `${api}/scoreRule/admin/add`;
  return request.post(url, data);
};/**
 * 积分规则删除
 */
export const ruleListDelete = (data) => {
  let url = `${api}/scoreRule/admin/delete`;
  return request.post(url, data);
};
/**
 * 积分规则启用/禁用
 */
export const ruleListEnable = (data) => {
  let url = `${api}/scoreRule/admin/enable`;
  return request.post(url, data);
};
/**
 * 积分规则查看
 */
export const ruleListShow = (data) => {
  let url = `${api}/scoreRule/admin/show`;
  return request.post(url, data);
};
/**
 * 积分规则修改
 */
export const ruleListModify = (data) => {
  let url = `${api}/scoreRule/admin/modify`;
  return request.post(url, data);
};
