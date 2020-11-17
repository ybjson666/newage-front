import { messageApi } from '@/api';
import { saveDataCommon } from '@/utils';

export default {
  state: {
    // 列表数据
    listData: {  // 这里没有请求接口，先用mock数据
      list: [{
        id: 1,
        title: '标题1',
        content: '内容1',
        author: '作者1',
        time: '时间1',
        number:1
      },{
        id: 2,
        title: '标题2',
        content: '内容2',
        author: '作者2',
        time: '时间2',
        number:1
      },{
        id: 3,
        title: '标题3',
        content: '内容3',
        author: '作者3',
        time: '时间3',
        number:1
      },{
        id: 4,
        title: '标题4',
        content: '内容4',
        author: '作者4',
        time: '时间4',
        number:1
      },{
        id: 5,
        title: '标题5',
        content: '内容5',
        author: '作者5',
        time: '时间5',
        number:1
      }],
      pageSize:10,
      currentPage: 1,
      totalRecords: 0
    },
    listLoading: false
  },
  reducers: {
    saveData: saveDataCommon
  },
  effects: {
    // 获取全部消息列表
    async getList(data) {
      try {
        this.saveData({
          listLoading: true
        });
        const res = await messageApi.getList(data);
        if (res) {
          this.saveData({
            listLoading: false
          });
        }
        this.saveData({ listData: res.data });

        // 方便外面处理
        return res;
      } catch (error) {}
    },
  }
};
