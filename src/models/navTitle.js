import { userInfoApi } from '@/api';
import { saveDataCommon } from '@/utils';

export default {
  state: {
    // 用户登陆数据
    navTitle:'新时代文明实践'
  },
  reducers: {
    saveData: saveDataCommon
  },
  effects: {
    // 获取登陆用户数据
    async getNavTitle(title) {
      try {
        this.saveData({ navTitle: title });
        // 方便外面处理
        return title;
      } catch (error) {}
    },
  }
};
