import request from '@/utils/request';

/**
 * 获取用户登陆信息
 */
export const fetchUserLoginData = () => {
  return request.get('/v2/user/group-user');
}
