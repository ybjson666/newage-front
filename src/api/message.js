import request from '@/utils/request';

/**
* 获取全部消息列表
*/
export const getList = (data) => {
 return request.post(`/v1/message/inmail-list`, data.params);
}

