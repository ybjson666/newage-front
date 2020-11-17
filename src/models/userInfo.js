import { userInfoApi } from '@/api';
import { saveDataCommon } from '@/utils';

export default {
  state: {
    // 用户登陆数据
    groupUser: {
      group_info: {},
      user_info: {}
    },
    // 顶部 / 侧边栏 菜单
    nav: {
      categories: [],
      products: {}
    },
    // 二级菜单
    menu: {
      menu_data: []
    },
    // iframe使用
    iframe: {
      src: '',
      uuid: ''
    }
  },
  reducers: {
    saveData: saveDataCommon
  },
  effects: {
    // 获取登陆用户数据
    async loadUserLoginData() {
      try {
        const res = await userInfoApi.fetchUserLoginData();
        this.saveData({ groupUser: res });
        // 方便外面处理
        return res;
      } catch (error) {}
    },
    // 获取顶部 / 侧边栏菜单数据
    // async loadNavData() {
    //   try {
    //     const res = await fetchNavData();
    //     return res;
    //   } catch (error) {}
    // },
    // 获取二级菜单数据
    // async loadNavMenuData(serviceKey) {
    //   try {
    //     const res = await fetchNavMenuData(serviceKey);
    //     return res;
    //   } catch (error) {}
    // }
  }
};
