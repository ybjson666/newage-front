import request from '@/utils/request';
import {api} from '../utils/config';

 //活动统计
export const getActvCount = (data) => {
  let url = `${api}/statistics/admin/activity/index`;
  return request.post(url,data);
};

 //任务统计
 export const getTaskCount = (data) => {
  let url = `${api}/statistics/admin/task/index`;
  return request.post(url,data);
};
//用户统计
export const getUserCount = (data) => {
  let url = `${api}/statistics/admin/wish/index`;
  return request.post(url,data);
};