import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  Tooltip,
  Button,
  Breadcrumb,
  Input,
  Select,
  Modal,
  Popconfirm,
  message,
  Row,
  Menu,
  Dropdown,
  Spin,
  Timeline
} from 'antd';
import './index.less';
import * as volunteerListApi from '../../api/volunteerList';
import * as taskApi from '../../api/taskList';
import VolunteerDetail from './detail';
import moment from 'moment';
import { getIdsObj } from '../../utils/getIdsObj';
import LaunchDetail from './launchActivity';
import getCookie from '../../utils/cookie';



const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;
//stag B= 不动 确认按钮
// stagH  没得新建任务 没得指派  有确认按钮 发起招募活动
// 一个简单的table列表demo
class TableList extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      tableData: [],
      totalCount: 0,
      visible: false,
      emptyTxt: '加载中...',
      params: {
        pageSize: 10,
        page: 1
      },
      currentDetail: {},
      pageType: true,
      serverType:JSON.parse(localStorage.getItem('serverType'))||[],
      serverArea:JSON.parse(localStorage.getItem('serverArea'))||[],
      spiderData: JSON.parse(localStorage.getItem('spiderData'))||[],
      launchData: {},
      searchData: {},
      backDes: '',
      showRedeploy:false,
      redeployList:[],
      redeploy:undefined,
      redeployDesc:"",
      stationType:"",
      taskId:"",
      isTop:"",
      stationName:undefined,
      showRecoedModale:false,
      isLoadRecord:false,
      curRecords:[],
      zzmm:JSON.parse(localStorage.getItem('zzmm'))||[],
      jxyl: JSON.parse(localStorage.getItem('jxyl'))||[],
      isLoad:false
    };
    this.maxLength=100
    this.listData = {
      pageno: 1,
      pagesize: 10
    };
    this.searchData = {};
    const urlParams = getIdsObj(window.location.search);

    if (urlParams.stag) {
      this.pageStag = urlParams.stag.replace('\/', '');
    } else {
      this.pageStag = 'B';
    }

    this.pageStag='H'
  }


  componentDidMount() {
    // 在DidMount里去请求数据
    const { getList } = this.props;
    const { params } = this.state;
    // this.getDict();


    const loginTid = getCookie().login_chinamcloud_tid;
    const login_tid=localStorage.getItem('login_tid');
    if(loginTid!==login_tid){
      localStorage.setItem('login_tid',loginTid)
      this.getDict();
      this.getSearviceType();
      this.getSearviceArea();
      this.getSpidersList();
    }else{
      if(!localStorage.getItem('zzmm')){
        this.getDict();
      }
      if(!localStorage.getItem('serverType')){
        this.getSearviceType();
      }
      if(!localStorage.getItem('serverArea')){
        this.getSearviceArea();
      }
      // 获取站所
      if(!localStorage.getItem('spiderData')){
        this.getSpidersList();
      }
    }

    setTimeout(() => {
      this.getDataList();
      this.fetchRedeploys();
    });
    // getList(params);
  }

  // 全选、多选事件
  onSelectChange = (selectedRowKeys, rows) => {
    const useSelectedRowKeys = [];
    const useRows = [];
    let status = false;
    rows.map(ele => {
      // if (this.pageStag == 'B' && (ele.state&& ele.state > 1)) {
      //   status = true;
      //   return;
      // }
      // if (this.pageStag == 'H' && (!ele.state || ele.state != 1)) {
      //   status = true;
      //   return;
      // }
      useRows.push(ele);
      useSelectedRowKeys.push(ele.taskid);
    });
    // if (this.pageStag == 'B' && status) {
    //   message.error('当前选择任务，已确认,不可指派！');
    //   setTimeout(() => {
    //     message.destroy();
    //   }, 1000);
    // }
    // if (this.pageStag == 'H' && status) {
    //   message.error('当前选择任务，已确认,不可选择！');
    //   setTimeout(() => {
    //     message.destroy();
    //   }, 1000);
    // }
    this.setState({ selectedRowKeys: useSelectedRowKeys, selectRows: useRows });
  };

  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    const selectRows = [];
    // if (this.pageStag == 'B' && (row.state&& row.state > 1)) {
    //   message.error('当前选择任务，已确认,不可指派！');
    //   setTimeout(() => {
    //     message.destroy();
    //   }, 1000);
    //   return;
    // }
    // if (this.pageStag == 'H' && (!row.state || row.state != 1)) {
    //   message.error('当前选择任务，已确认,不可选择！');
    //   setTimeout(() => {
    //     message.destroy();
    //   }, 1000);
    //   return;
    // }
    selectedRowKeys.push(row.taskid);
    selectRows.push(row);
    this.setState({ selectedRowKeys, selectRows });
  };
// 获取列表
  getDataList = () => {
    const listData = Object.assign(this.searchData, this.listData);
    this.setState({
      emptyTxt: '加载中',
      tableData: [],
      isLoad:true
    });
    taskApi.getTaskList(listData).then(res => {
      const arrayData = (res && res.data.data) || [];
      const tableData = Array.isArray(arrayData) ? arrayData : [];
      this.setState({
        tableData: tableData,
        totalCount: res.data && res.data.totalCount || 0,
        isLoad:false
      }, () => {
        if (!this.state.tableData.length) {
          this.setState({
            emptyTxt: '暂无数据'
          });
        }
      });
    });
  };
  //获取学历
  getDict = () => {
    volunteerListApi.getDictAll().then(res => {
      const allData = res && Array.isArray(res.data) ? res.data : [];
      const zzmm = [];
      const jxyl = [];
      allData.map(ele => {
        if (ele.DictType === 'ZZMM') {
          zzmm.push(ele);
        }
        if (ele.DictType === 'JYXL') {
          jxyl.push(ele);
        }
      });
      localStorage.setItem('zzmm',JSON.stringify(zzmm));
      localStorage.setItem('jxyl',JSON.stringify(jxyl));
      this.setState({
        zzmm,
        jxyl
      });
    });
  };
  // 分页
  onShowSizeChange = (page, pageSize) => {
    this.listData.pageno = page;
    this.listData.pagesize = pageSize;
    this.getDataList();
  };
  // 返回按钮
  pageBack = () => {
    this.setState({
      pageType: true
    });
  };
  // 获取服务类型
  getSearviceType = () => {
    volunteerListApi.getServertype().then((res) => {
      const useData = res && Array.isArray(res.data) ? res.data : [];
      localStorage.setItem('serverType',JSON.stringify(useData))
      this.setState({
        serverType: useData
      });
    });
  };
  // 获取服务地区
  getSearviceArea = () => {
    volunteerListApi.getServerarea().then((res) => {
      const useData = res && Array.isArray(res.data) ? res.data : [];
      localStorage.setItem('serverArea',JSON.stringify(useData))
      this.setState({
        serverArea: useData
      });
    });
  };
  //获取转派对象
  fetchRedeploys=()=>{
      taskApi.getRedeploys({}).then(res=>{
        if(res.state===200){
           let arrs =res.data[0]&&res.data[0].childStructureUserList&&res.data[0].childStructureUserList.length?res.data[0].childStructureUserList:[];
           let farther=res.data[0]&&res.data[0].fatherStructureUser||{};
           let obj={};
          let redeployList=this.getChildList([],arrs);
          if(farther.userId){
            obj.userName=farther.userName;
            obj.userId=farther.userId;
            obj.isTop=1;
            obj.typeCode=farther.typeCode
            redeployList.push(obj);
          }else{
            if(farther.structureName){
              obj.userName=farther.structureName;
              obj.userId="";
              obj.isTop=1;
              obj.typeCode=farther.typeCode
              redeployList.push(obj);
            }
            
          }
          redeployList=redeployList.map(item=>{
            if(item.typeCode==2||item.typeCode==3){
              item.stationType=1//站所
            }else if(item.typeCode==1){
              item.stationType=2
            }else{
              item.stationType=0;//中心
            }
            return item;
          })
          this.setState({
            redeployList
          })
        }else{
          message.error(res.message)
        }
      })
  }
  getChildList=(arr,arrays)=>{//组装下级数据
    let obj={
      userName:"",
      userId:"",
      isTop:0,
      typeCode:""
    }
    arrays.forEach(item=>{
      obj.userName=item.userName,
      obj.userId=item.userId
      obj.typeCode=item.typeCode;
      arr.push(obj);
      obj={
        userName:"",
        userId:"",
        isTop:0,
        typeCode:""
      }
      if(item.childStructureUserList&&item.childStructureUserList.length){
        this.getChildList(arr,item.childStructureUserList)
      }
    })
    return arr;
  }
  tranStamp=(dateStr)=>{//将日期字符串转为时间戳
    let dateTmp = dateStr.replace(/-/g,'/')   //为了兼容IOS，需先将字符串转换为'2018/9/11 9:11:23'
    return Date.parse(dateTmp)                 //返回'2018-9-12 9:11:23'的时间戳
  }
  //确认删除
  // confirm = (rows) => {
  //   let str = [];
  //   rows.map(ele => {
  //     str.push(ele.activityrecruitid);
  //   });
  //   const data = {
  //     ids: str.join(',')
  //   };
  //   activityApi.activityDel(data).then(res => {
  //     if (res.state == 200) {
  //       message.success('删除成功！');
  //       this.getDataList();
  //       this.setState({
  //         selectRows: [],
  //         selectedRowKeys: []
  //       });
  //     }
  //   });
  // };
  //查看详情
  lookDetail = (row) => {
    if (!row.taskid) {
      return;
    }

    const data = {
      taskId: row.taskid,
      tag:row.tag,
      assignedTime:row.orderDate?this.tranStamp(row.orderDate):""
    };
    taskApi.getCheckTask(data).then(res => {
      if (res && res.success) {
        this.setState({
          currentDetail: res.data,
          pageType: 'edit'
        });
      }
    });
  };

  // 保存成功回调
  onOk = () => {
    this.getDataList();
    this.setState({ pageType: true });
  };
  // 批量删除
  mulpDelete = () => {
    const str = [];
    this.state.selectRows.map(ele => {
      str.push(ele.taskid);
    });
    this.setState({ visible: true, taskId: str.join(), toManData: {}, toMan: '' });
  };
  // 新建活动
  createActivity = () => {
    this.setState({ pageType: 'create' });
  };
  //获取站所列表
  getSpidersList = () => {
    taskApi.getSpidersList({ pageSize: 10000 }).then(res => {
      const spiderData = (res && res.data && res.data.pageRecords) || [];
      localStorage.setItem('spiderData',JSON.stringify(spiderData));
      this.setState({
        spiderData
      });
    });
  };

  //指派弹框确认事件
  handleOk = () => {
    if (!this.state.toMan) {
      message.error('请选择任务完成人!');
      return;
    }
    // console.log(this.state.toMan);
    const data = {
      taskId: this.state.taskId,
      stationId: this.state.toMan
    };
    taskApi.assignedTask(data).then(res => {
      if (!res.success) return;
      message.info('指派成功');
      this.modalCancel();
      this.getDataList();
    });
  };
  // 单个指派事件
  taskToMan = (row) => {
    this.setState({ visible: true, taskId: row.taskid, toManData: row, toMan: row.stationid });
  };
  // 关闭指派弹框
  modalCancel = () => {
    this.setState({ visible: false, toManData: {}, toMan: '' });
  };
  // 活动类型选择
  modalTypeCancel = () => {
    this.setState({
      typeVisible: false
    });
  };
  // 任务完成
  finishTask = (row, state) => {
    const data = {
      taskId: row.taskid,
      stationId: row.stationid,
      state: 3
    };
    taskApi.modifyTaskState(data).then(res => {
      if (!res || res.state == 400) return;
      message.info('任务已成功完成！');
      this.getDataList();
    });
  };
  //任务人完成
  finishTaskOwner = (row, state) => {
    const data = {
      taskId: row.taskid,
      stationId: row.stationid,
      state: 3
    };
    taskApi.modifyFinishTC(data).then(res => {
      if (!res || res.state == 400) return;
      message.info('任务已成功完成！');
      this.getDataList();
    });
  };
  // 打开类型弹框
  launchChooseActivity = (row) => {
    this.setState({
      typeVisible: true,
      typeCurrentData: row,
      chooseType: undefined
    });
  };
  // 确认类型
  handleTypeOk = () => {
    if(!this.state.chooseType)return;
    this.setState({ typeVisible: false });
    this.launchActivity(this.state.typeCurrentData);
  };
  //发起活动
  launchActivity = (row) => {
    if (!row.taskid) {
      return;
    }
    const data = {
      taskId: row.taskid,
      tag:row.tag
    };
    taskApi.getCheckTask(data).then(res => {
      if (res && res.success) {
        this.setState({
          launchData: res.data,
          pageType: this.state.chooseType
        });
      }
    });
  };
  //批量确认
  sinConfirm = (row) => {
    const data = {
      taskIds: row.taskid,
      stationId: row.stationid,
      state: 2
    };
    taskApi.modifyUpdateTCstate(data).then(res => {
      if (!res || res.state == 400) return;
      message.info('任务已成功确认！');
      this.getDataList();
    });
  };
  // 批量确认接口
  allConfirm = () => {
    let stationid = this.state.selectRows[0] && this.state.selectRows[0].stationid;
    const data = {
      taskIds: this.state.selectedRowKeys.join(','),
      stationId: stationid,
      state: 2
    };
    taskApi.modifyUpdateTCstate(data).then(res => {
      if (!res || res.state == 400) return;
      message.info('任务已成功确认！');
      this.getDataList();
      this.setState({
        selectRows: [],
        selectedRowKeys: []
      });
    });
  };
  // 批量确认弹框
  mulConfirm = () => {
    const instance = this;
    if (!instance.state.selectRows) {
      message.info('请选择需要确认的任务!');
      return;
    }
    let status = false;
    instance.state.selectedRowKeys.map(ele => {
      if (ele.state != 1) {
        status = true;
      }
    });
    if (status) {
      message.error('所选项包含已确认内容，请重试!');
      return;
    }
    confirm({
      title: '删除确认',
      content: '此操作不可撤回,是否确认所选任务?',
      onOk() {
        instance.allConfirm(instance.state.selectRows);
      }
    });

  };
  // 任务退回事件
  backToCenter = (row) => {
    this.setState({ backVisible: true, backData: row });
  };
  // 任务退回弹窗关闭
  modalBackCancel = () => {
    this.setState({ backVisible: false, backData: '', backDes: '' });
  };
  // 任务退回确认事件
  handleBackOk = () => {
    const useData = {
      remark: this.state.backDes,
      taskId: this.state.backData.taskid,
      assignedTime:this.state.backData.orderDate?this.tranStamp(this.state.backData.orderDate):""
    };
    taskApi.taskBack(useData).then(res => {
      if (!res || !res.success) return;
      this.getDataList();
      this.modalBackCancel();
    });
  };
  // 关闭删除弹框
  cancelDelete = () => {
    this.setState({ deleteVisible: false,currentDeleteWish: null, currentDeleteData: null });
  };
  // 判断心愿任务
  handleVisibleChange = (rows, row) => {
    const instance = this;
    const data = {
      taskId: rows.join(',')
    };
    taskApi.isConvertTask(data).then(res => {
      if (res.data === 0) {
        confirm({
          title: '删除确认',
          content: '此操作不可撤回,是否确认删除所选任务？',
          onOk() {
            instance.deleteItems(rows);
          }
        });
      } else if(res.data===1) {
        this.setState({ deleteVisible: true, currentDeleteWish: rows, currentDeleteData: row });
      }
    });
  };
  // 仅删除心愿
  deleteWishOnly = (rows) => {
    const data = {
      taskId: rows.join(',')
    };
    taskApi.onlyDelWish(data).then(res => {
      if (res.state == 200) {
        message.success('删除成功！');
      }
      if (rows.length == this.state.tableData.length) {
        this.listData.pageno = 1;
      }
      this.getDataList();
      this.cancelDelete();
      this.setState({
        selectRows: [],
        selectedRowKeys: []
      });
    });
  };
//全部删除心愿
  deleteItems = (rows) => {
    const data = {
      taskId: rows.join(',')
    };

    taskApi.delWish(data).then(res => {
      if (res.state == 200) {
        message.success('删除成功！');
      }
      if (rows.length == this.state.tableData.length) {
        this.listData.pageno = 1;
      }
      this.getDataList();
      this.cancelDelete();
      this.setState({
        selectRows: [],
        selectedRowKeys: []
      });
    });
  };

  /*转派任务框显示*/
  redeploy=(rows)=>{
    this.setState({
      showRedeploy:true,
      taskId:rows.taskid
    })
  }
  /**确认转派 */
  handleRedeployOk=()=>{
      const { redeployDesc,redeploy,taskId,isTop,stationName,stationType }=this.state;
      if(!stationName){
        message.error("请选择转派对象");
        return;
      }
      taskApi.assignedTask({taskId,stationId:redeploy,remark:redeployDesc,isTop,stationName,stationType}).then(res=>{
          if(res.state===200){
            message.success("转派成功");
            this.setState({stationId:"",stationName:""})
            this.modalRedeployCancel();
            this.getDataList();
          }else{
            message.error(res.message);
          }
      })

  }
  /**取消转派 */
  modalRedeployCancel=()=>{
    this.setState({
      showRedeploy:false,
      taskId:"",
      redeployDesc:"",
      redeploy:undefined,
      stationName:""
    })
  }
  /**选择指派对象 */
  setRedeployId=(name)=>{
    const { redeployList }=this.state;
    let isTop="";
    let userId="";
    let stationType="";
    redeployList.map(item=>{
      if(item.userName===name){
        isTop=item.isTop;
        userId=item.userId||"";
        stationType=item.stationType
      }
    })
    this.setState({
      redeploy:userId,
      isTop,
      stationName:name,
      stationType
    })
  }
  //查看操作记录
  seekOperRecords=(row)=>{
    this.setState({
      showRecoedModale:true,
      isLoadRecord:true
    },()=>{
      taskApi.getRecord({taskId:row.taskid}).then(data=>{
        if(data.state==200){
          this.setState({
            curRecords:data.data,
            isLoadRecord:false
          })
        }
      })
    })

  }
  //关闭操作记录弹框
  closeRecordModale=()=>{
    this.setState({
      showRecoedModale:false,
      curRecords:[]
    })
  }
  //跳到发布任务
  publishTask=(row)=>{
    if (!row.taskid) {
      return;
    }
    const data = {
      taskId: row.taskid,
      tag:row.tag,
      assignedTime:row.orderDate?this.tranStamp(row.orderDate):""
    };
    taskApi.getCheckTask(data).then(res => {
      if (res && res.success) {
        this.setState({
          currentDetail: res.data,
          pageType: 'publish'
        });
      }
    });
  }
  //取消发布
  cancelPublish=(row)=>{
    taskApi.cancelpubTask({taskId:row.taskid}).then(data=>{
        if(data.state===200){
          message.success('取消发布成功');
          this.getDataList();
        }else{
          message.error(data.messge)
        }
    })
  }


  render() {
    const { selectedRowKeys,redeployList } = this.state;
    const { listData } = this;
    /**根据平台动态判断，不用utils里面的 */
    let taskState = {};
    /*3待接收改为待确认*/
    taskState = {
      1: '待完成',
      2: '待确认',
      4: '已确认',
      6: '已完成',
      7: '已发布',
      8: '已认领'
    };
    let taskState2 = {
      1: '待完成',
      2: '待确认',
      3: '待确认',
      4: '已确认',
      5: '已确认',
      6: '已完成',
      7: '已发布',
      8: '已认领'
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const pagination = {
      'pageSize': listData.pagesize,
      'total': this.state.totalCount,
      'current': listData.pageno,
      'showTotal': total => `共 ${total} 条数据`,
      'showSizeChanger': true,
      'onShowSizeChange': this.onShowSizeChange,
      'onChange': this.onShowSizeChange
    };
    const columns = [
      {
        title: '任务名称',
        dataIndex: 'title',
        align: 'left',
        width: 130,
        key: 'title',
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '服务地区',
        dataIndex: 'areaid',
        align: 'left',
        width: 100,
        key: 'areaid',
        render: (tags, row) => {
          let tag = '';
          this.state.serverArea.map((ele) => {
            if (ele.dictionaryId == tags) {
              tag = ele.dictionaryValue;
            }
          });
          if(tag){
            return (<span>{tag}</span>);
          }else{
            return (<span>无限制</span>);
          }

        }
      }, {
        title: '服务类型',
        dataIndex: 'tasktype',
        align: 'left',
        width: 100,
        key: 'tasktype',
        render: (tags, row) => {
          let tag = '';
          this.state.serverType.map((ele) => {
            if (ele.dictionaryId == tags) {
              tag = ele.dictionaryValue;
            }
          });
          if(tag){
            return (<span>{tag}</span>);
          }else{
            return (<span>无限制</span>);
          }
        }
      }, {
        title: '任务日期',
        dataIndex: 'starttime',
        align: 'left',
        width: 120,
        key: 'starttime',
        render: (tags, row) => {
          const date = tags && moment(tags).format('YYYY-MM-DD HH:mm:ss');
          if(date){
            return (<Tooltip placement="topLeft" title={date}>
            <span>{date}</span>
          </Tooltip>);
          }else{
            return (<span>无限制</span>);
          }

        }
      }, {
        title: '任务来源',
        dataIndex: 'wishid',
        align: 'left',
        width: 100,
        key: 'wishid',
        render: (tags, row) => {
          const str = row.wishid == 0 ? '自建任务' : '心愿任务';
          return <span>{str}</span>;
        }
      }, {
        title: '任务状态',
        dataIndex: 'state',
        align: 'left',
        width: 90,
        key: 'state',
        render: (tags, row) => {
          if(row.isPublish=='2'){
              if(tags == 6){
                return <span>{taskState2[tags]}</span>
              }else{
                if(row.claimCustomerId){
                  return <span>已认领</span>
                }else{
                  return <span>已发布</span>
                }
              }
          }else{
            return <span>{taskState2[tags]}</span>
          }
        }
      }, {
        title: '操作',
        align: 'left',
        width: 200,
        key: 'operator',
        render: (tags, row) => {
            let childHtml="";
            let moreMenu="";
            if(row.isPublish=='2'){//已发布
                if(row.claimCustomerId){//已认领
                  if(row.isMine==0){
                    moreMenu = <Menu>
                    <Menu.Item key='0'>
                      <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                    </Menu.Item>
                  </Menu>
                  childHtml=<div className="btn-groups">
                      <a role="button" tabIndex="0" className='aButton' onClick={() => this.publishTask(row)} >查看</a>
                      <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                      <Dropdown overlay={moreMenu}>
                          <a className="ant-dropdown-link" role="button">更多</a>
                      </Dropdown>
                    </div>
                  }else{
                    childHtml=<div className="btn-groups">
                    <a role="button" tabIndex="0" className='aButton' onClick={() => this.publishTask(row)} >查看</a>
                    <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                  </div>
                  }
                }else{//未认领
                    if(row.isExecuter==0){//发布人和当前登录人是否是同一个人，0是1否
                      if(row.isMine==0){
                        moreMenu = <Menu>
                        <Menu.Item key='0'>
                          <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                        </Menu.Item>
                        <Menu.Item key='1'>
                          <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.cancelPublish(row)}>取消发布</a>
                        </Menu.Item>
                      </Menu>
                      childHtml=<div className="btn-groups">
                        <a role="button" tabIndex="0" className='aButton' onClick={() => this.publishTask(row)}>查看</a>
                        <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                        <Dropdown overlay={moreMenu}>
                            <a className="ant-dropdown-link" role="button">更多</a>
                        </Dropdown>
                      </div>
                      }else{
                        moreMenu = <Menu>
                        <Menu.Item key='0'>
                          <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.cancelPublish(row)}>取消发布</a>
                        </Menu.Item>
                    </Menu>
                    childHtml=<div className="btn-groups">
                      <a role="button" tabIndex="0" className='aButton' onClick={() => this.publishTask(row)}>查看</a>
                      <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                      <Dropdown overlay={moreMenu}>
                          <a className="ant-dropdown-link" role="button">更多</a>
                      </Dropdown>
                    </div>
                      }
                      
                    }else{
                      if(row.isMine==0){
                          moreMenu = <Menu>
                          <Menu.Item key='0'>
                            <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                          </Menu.Item>
                        </Menu>
                        childHtml=<div className="btn-groups">
                          <a role="button" tabIndex="0" className='aButton' onClick={() => this.publishTask(row)}>查看</a>
                          <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                          <Dropdown overlay={moreMenu}>
                              <a className="ant-dropdown-link" role="button">更多</a>
                          </Dropdown>
                        </div>
                      }else{
                        childHtml=<div className="btn-groups">
                          <a role="button" tabIndex="0" className='aButton' onClick={() => this.publishTask(row)}>查看</a>
                          <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                        </div>
                      } 
                  }
                }
            }else{//未发布
              if(row.state==2){//待确认
                if(row.isMine==0){//自己创建的
                  if(row.isTaskTarget==0){//转派目标人是否为自己
                    moreMenu = <Menu>
                    <Menu.Item key='0'>
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.redeploy(row || {})}}>重新转派</a>
                    </Menu.Item>
                    <Menu.Item key='1'>
                      <Popconfirm placement="right" title={'此操作不可撤回,是否确认任务?'} okType={'primary'}
                              onConfirm={() => this.sinConfirm(row, 4)}
                              okText="确认" cancelText="取消">
                        <a role="button" className='aButton' type="link">确认</a>
                      </Popconfirm>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.publishTask(row)}>发布任务</a>
                    </Menu.Item>
                  </Menu>
                      childHtml=<div className="btn-groups">
                        <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}} >查看</a>
                        <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                        <Dropdown overlay={moreMenu}>
                            <a className="ant-dropdown-link" role="button">更多</a>
                        </Dropdown>
                      </div>
                  }else{
                    moreMenu = <Menu>
                    <Menu.Item key='0'>
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.redeploy(row || {})}}>重新转派</a>
                    </Menu.Item>
                    <Menu.Item key='1'>
                        <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                    </Menu.Item>
                    {/* <Menu.Item key='2'>
                        <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.publishTask(row)}>发布任务</a>
                    </Menu.Item> */}
                  </Menu>
                      childHtml=<div className="btn-groups">
                        <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}} >查看</a>
                        <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                        <Dropdown overlay={moreMenu}>
                            <a className="ant-dropdown-link" role="button">更多</a>
                        </Dropdown>
                      </div>
                  }
                }else{
                  if(row.isTaskTarget==0){
                    moreMenu = <Menu>
                    <Menu.Item key='0'>
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.redeploy(row || {})}}>转派</a>
                    </Menu.Item>
                    <Menu.Item key='1'>
                      <Popconfirm placement="right" title={'此操作不可撤回,是否确认任务?'} okType={'primary'}
                              onConfirm={() => this.sinConfirm(row, 3)}
                              okText="确认" cancelText="取消">
                        <a role="button" className='aButton' type="link">确认</a>
                      </Popconfirm>
                    </Menu.Item>
                  </Menu>
                  childHtml=<div className="btn-groups">
                    <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                    <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                    <Dropdown overlay={moreMenu}>
                          <a className="ant-dropdown-link" role="button">更多</a>
                    </Dropdown>
                  </div>
                  }else{
                    moreMenu = <Menu>
                    <Menu.Item key='0'>
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.redeploy(row || {})}}>转派</a>
                    </Menu.Item>
                    </Menu>
                    childHtml=<div className="btn-groups">
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                      <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                      <Dropdown overlay={moreMenu}>
                            <a className="ant-dropdown-link" role="button">更多</a>
                      </Dropdown>
                    </div>
                  }
                }
              }else if(row.state==4){//已确认
                if(row.isMine==0){
                  if(row.isTaskTarget==0){
                      moreMenu = <Menu>
                      <Menu.Item key='0'>
                        <Popconfirm placement="right" title={'此操作不可撤回,是否确认已完成任务?'} okType={'primary'}
                                  onConfirm={() => this.finishTaskOwner(row, 3)}
                                  okText="确认" cancelText="取消">
                            <a role="button" className='aButton' type="link">完成</a>
                        </Popconfirm>
                      </Menu.Item>
                      <Menu.Item key='1'>
                        <a role="button" tabIndex={0} className='aButton' type="link" onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                      </Menu.Item>
                      <Menu.Item key='2'>
                        <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.publishTask(row)}>发布任务</a>
                      </Menu.Item>
                      <Menu.Item key='3'>
                        <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.launchChooseActivity(row || {})}}>发起活动</a>
                      </Menu.Item>
                    </Menu>
                    childHtml=<div className="btn-groups">
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                      <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                      <Dropdown overlay={moreMenu}>
                            <a className="ant-dropdown-link" role="button">更多</a>
                      </Dropdown>
                    </div>
                  }else{
                    moreMenu = <Menu>
                    {/* <Menu.Item key='0'>
                      <Popconfirm placement="right" title={'此操作不可撤回,是否确认已完成任务?'} okType={'primary'}
                                onConfirm={() => this.finishTaskOwner(row, 3)}
                                okText="确认" cancelText="取消">
                          <a role="button" className='aButton' type="link">完成</a>
                      </Popconfirm>
                    </Menu.Item> */}
                    <Menu.Item key='0'>
                      <a role="button" tabIndex={0} className='aButton' type="link" onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                    </Menu.Item>
                    {/* <Menu.Item key='2'>
                      <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.publishTask(row)}>发布任务</a>
                    </Menu.Item> */}
                  </Menu>
                  childHtml=<div className="btn-groups">
                    <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                    <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                    <Dropdown overlay={moreMenu}>
                          <a className="ant-dropdown-link" role="button">更多</a>
                    </Dropdown>
                  </div>
                  }
                }else{
                    moreMenu = <Menu>
                    <Menu.Item key='0'>
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.launchChooseActivity(row || {})}}>发起活动</a>
                    </Menu.Item>
                    <Menu.Item key='1'>
                      <Popconfirm placement="right" title={'此操作不可撤回,是否确认已完成任务?'} okType={'primary'}
                                onConfirm={() => this.finishTaskOwner(row, 3)}
                                okText="确认" cancelText="取消">
                          <a role="button" className='aButton' type="link">完成</a>
                      </Popconfirm>
                    </Menu.Item>
                    <Menu.Item key='2'>
                      <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.publishTask(row)}>发布任务</a>
                    </Menu.Item>
                  </Menu>

                  childHtml=<div className="btn-groups">
                    <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                    <a role="button" tabIndex="0" className='aButton'  onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                    <Dropdown overlay={moreMenu}>
                          <a className="ant-dropdown-link" role="button">更多</a>
                    </Dropdown>
                  </div>
                }
              }else if(row.state==5){//已接收
                if(row.isMine==0){
                  if(row.isTaskTarget==0){
                      moreMenu = <Menu>
                        <Menu.Item key='0'>
                          <Popconfirm placement="right" title={'此操作不可撤回,是否确认已完成任务?'} okType={'primary'}
                                    onConfirm={() => this.finishTaskOwner(row, 3)}
                                    okText="确认" cancelText="取消">
                              <a role="button" className='aButton' type="link">完成</a>
                          </Popconfirm>
                        </Menu.Item>
                        <Menu.Item key='1'>
                          <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                        </Menu.Item>
                        <Menu.Item key='2'>
                        <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.launchChooseActivity(row || {})}}>发起活动</a>
                      </Menu.Item>
                      <Menu.Item key='3'>
                          <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.publishTask(row)}>发布任务</a>
                      </Menu.Item>
                    </Menu>
                    childHtml=<div className="btn-groups">
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                      <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                      <Dropdown overlay={moreMenu}>
                            <a className="ant-dropdown-link" role="button">更多</a>
                      </Dropdown>
                    </div>
                  }else{
                    moreMenu = <Menu>
                    {/* <Menu.Item key='0'>
                      <Popconfirm placement="right" title={'此操作不可撤回,是否确认已完成任务?'} okType={'primary'}
                                onConfirm={() => this.finishTaskOwner(row, 3)}
                                okText="确认" cancelText="取消">
                          <a role="button" className='aButton' type="link">完成</a>
                      </Popconfirm>
                    </Menu.Item> */}
                    <Menu.Item key='0'>
                      <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                    </Menu.Item>
                  </Menu>
                  childHtml=<div className="btn-groups">
                    <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                    <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                    <Dropdown overlay={moreMenu}>
                          <a className="ant-dropdown-link" role="button">更多</a>
                    </Dropdown>
                  </div>
                  }       
                }else{
                  moreMenu = <Menu>
                    <Menu.Item key='0'>
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.launchChooseActivity(row || {})}}>发起活动</a>
                    </Menu.Item>
                    <Menu.Item key='1'>
                      <Popconfirm placement="right" title={'此操作不可撤回,是否确认已完成任务?'} okType={'primary'}
                                onConfirm={() => this.finishTaskOwner(row, 3)}
                                okText="确认" cancelText="取消">
                          <a role="button" className='aButton' type="link">完成</a>
                      </Popconfirm>
                    </Menu.Item>
                    <Menu.Item key='2'>
                      <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.publishTask(row)}>发布任务</a>
                    </Menu.Item>
                  </Menu>

                  childHtml=<div className="btn-groups">
                    <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                    <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                    <Dropdown overlay={moreMenu}>
                          <a className="ant-dropdown-link" role="button">更多</a>
                    </Dropdown>
                  </div>
                }
              }else if(row.state==1){//待完成
                moreMenu = <Menu>
                <Menu.Item key='0'>
                    <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.launchChooseActivity(row || {})}}>发起活动</a>
                </Menu.Item>
                <Menu.Item key='1'>
                    <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.redeploy(row || {})}}>转派</a>
                </Menu.Item>
                <Menu.Item key='2'>
                    <Popconfirm placement="right" title={'此操作不可撤回,是否确认已完成任务?'} okType={'primary'}
                                onConfirm={() => this.finishTaskOwner(row, 3)}
                                okText="确认" cancelText="取消">
                      <a role="button" className='aButton' type="link">完成</a>
                    </Popconfirm>
                </Menu.Item>
                <Menu.Item key='3'>
                    <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                </Menu.Item>
                <Menu.Item key='4'>
                  <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.publishTask(row)}>发布任务</a>
                </Menu.Item>
              </Menu>

                childHtml=<div className="btn-groups">
                  <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}} >查看</a>
                  <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                  <Dropdown overlay={moreMenu}>
                    <a className="ant-dropdown-link" role="button">更多</a>
                  </Dropdown>
                </div>
              }else if(row.state==3){//待接收
                  if(row.isMine==0){//自己创建的
                    if(row.isTaskTarget==0){
                      moreMenu = <Menu>
                        <Menu.Item key='0'>
                          <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.redeploy(row || {})}}>重新转派</a>
                        </Menu.Item>
                        <Menu.Item key='1'>
                          <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                        </Menu.Item>
                        <Menu.Item key='2'>
                          <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.publishTask(row)}>发布任务</a>
                        </Menu.Item>
                        <Menu.Item key='3'>
                        <Popconfirm placement="right" title={'此操作不可撤回,是否确认任务?'} okType={'primary'}
                                onConfirm={() => this.sinConfirm(row, 3)}
                                okText="确认" cancelText="取消">
                          <a role="button" className='aButton' type="link">确认</a>
                        </Popconfirm>
                      </Menu.Item>
                      </Menu>
  
                      childHtml=<div className="btn-groups">
                        <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                        <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                        <Dropdown overlay={moreMenu}>
                          <a className="ant-dropdown-link" role="button">更多</a>
                        </Dropdown>
                      </div>
                    }else{
                      moreMenu = <Menu>
                    <Menu.Item key='0'>
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.redeploy(row || {})}}>重新转派</a>
                    </Menu.Item>
                    <Menu.Item key='1'>
                      <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                    </Menu.Item>
                    {/* <Menu.Item key='2'>
                      <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.publishTask(row)}>发布任务</a>
                    </Menu.Item> */}
                  </Menu>

                    childHtml=<div className="btn-groups">
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                      <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                      <Dropdown overlay={moreMenu}>
                        <a className="ant-dropdown-link" role="button">更多</a>
                      </Dropdown>
                    </div>
                    }
                    
                }else{
                  if(row.isTaskTarget==0){
                    moreMenu = <Menu>
                    <Menu.Item key='0'>
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.redeploy(row || {})}}>转派</a>
                    </Menu.Item>
                    <Menu.Item key='1'>
                      <Popconfirm placement="right" title={'此操作不可撤回,是否确认任务?'} okType={'primary'}
                              onConfirm={() => this.sinConfirm(row, 3)}
                              okText="确认" cancelText="取消">
                        <a role="button" className='aButton' type="link">确认</a>
                      </Popconfirm>
                    </Menu.Item>
                  </Menu>
                  childHtml=<div className="btn-groups">
                    <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                    <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                    <Dropdown overlay={moreMenu}>
                      <a className="ant-dropdown-link" role="button">更多</a>
                    </Dropdown>
                  </div>
                  }else{
                    moreMenu = <Menu>
                    <Menu.Item key='0'>
                      <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.redeploy(row || {})}}>转派</a>
                    </Menu.Item>
                  </Menu>

                  childHtml=<div className="btn-groups">
                    <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                    <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                    <Dropdown overlay={moreMenu}>
                      <a className="ant-dropdown-link" role="button">更多</a>
                    </Dropdown>
                  </div>
                  }
                }
              }
            }

            if(row.state==6){//已完成单独判断
              if(row.isMine==0){
                moreMenu = <Menu>
                <Menu.Item key='0'>
                  <a role="button" tabIndex={0} className='aButton' type="link"onClick={() => this.handleVisibleChange([row && row.taskid || ''], row)}>删除</a>
                </Menu.Item>
              </Menu>

              childHtml=<div className="btn-groups">
                <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
                <Dropdown overlay={moreMenu}>
                  <a className="ant-dropdown-link" role="button">更多</a>
                </Dropdown>
              </div>
              }else{
              childHtml=<div className="btn-groups">
                <a role="button" tabIndex="0" className='aButton' onClick={(e) => {this.lookDetail(row || {})}}>查看</a>
                <a role="button" tabIndex="0" className='aButton' onClick={()=>{this.seekOperRecords(row)}}>操作记录</a>
              </div>
              }
            }

          return (
            <div role="button" tabIndex="-1" style={{ whiteSpace: 'nowrap' }} onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
            }}>
              {childHtml}
            </div>
          );
        }
      }];

    const taskCloum = {
      title: '任务人',
      dataIndex: 'stationName',
      align: 'left',
      width: 50,
      key: 'stationName',
      render: (tags, row) => {
        return <Tooltip placement="topLeft" title={tags}>
          <span>{tags}</span>
        </Tooltip>;
      }
    };

    if (this.pageStag != 'H') {
      columns.splice(5, 0, taskCloum);
    }
    // 活动发起类型
    const detailType = ['launch', 'practice'];

    let timeList=[];
    timeList=this.state.curRecords.filter(item=>{//过滤掉操作记录完成任务状态下不存在操作人的记录
      if((item.operationtype==4&&!item.operationusername)||(item.operationtype==7&&!item.operationusername)){
        return null;
      }else{
        return item;
      }
    })
   
    return (
      <div style={{ height: '100%' }}>
        {this.state.pageType == true ?
          <>
            <Breadcrumb className="breadcrumbBox">
              <Breadcrumb.Item>
            <span className={'title-active'}>
              {this.props.navTitle}
            </span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className='eachPageBox'>
              <div style={{ height: '100%' }}>
                <div className="navTopBox">
                  <div className='btnBox'>
                     <Button type={'primary'} onClick={this.createActivity}>新建任务</Button>
                    {/* {this.pageStag == 'H' ? <Button type={'primary'} onClick={this.mulConfirm}>确认</Button> : ''} */}
                    {/*<Button type={'primary'} ghost onClick={this.mulpDelete}>指派</Button>*/}
                  </div>
                  <div className='searchFatherBox searchLeftPadding'>
                    <div className='searchBox '>
                <span className='item-search-part'>
                    服务类型：<Select value={this.state.searchData.taskType} placeholder='全部' style={{ width: 120 }}
                                 onChange={(value) => {
                                   this.listData.pageno = 1;
                                   this.listData.pagesize = 10;
                                   this.searchData.taskType = value;
                                   this.setState({
                                     searchData: this.searchData
                                   });
                                   this.getDataList();
                                 }}>
                  <Option value="">全部</Option>
                  {this.state.serverType.map((ele, index) => {
                    return (<Option key={index} value={ele.dictionaryId}>{ele.dictionaryValue}</Option>);
                  })}
                </Select>
                </span>
                      <span className='item-search-part'>
                服务地区：<Select value={this.state.searchData.areaId} placeholder='全部' style={{ width: 120 }}
                             onChange={(value) => {
                               this.listData.pageno = 1;
                               this.listData.pagesize = 10;
                               this.searchData.areaId = value;
                               this.setState({
                                 searchData: this.searchData
                               });
                               this.getDataList();
                             }}>
                     <Option value="">全部</Option>
                        {this.state.serverArea.map((ele, index) => {
                          return (<Option key={index} value={ele.dictionaryId}>{ele.dictionaryValue}</Option>);
                        })}
              </Select>
              </span>
              <span className='item-search-part'>
                任务状态：<Select value={this.state.searchData.state} placeholder='全部' style={{ width: 120 }}
                             onChange={(value) => {
                               this.listData.pageno = 1;
                               this.listData.pagesize = 10;
                               this.searchData.state = value;
                               this.setState({
                                 searchData: this.searchData
                               });
                               this.getDataList();
                             }}>
                     <Option value="">全部</Option>
                        {Object.keys(taskState).map((res, index) => {
                          return <Option key={index} value={res}>{taskState[res]}</Option>;
                        })}
              </Select>
              </span>
                      <Search
                        placeholder={this.pageStag == 'B' ? '请输入任务名称/任务人' : '请输入任务名称'}
                        enterButton="搜索"
                        value={this.state.searchData.searchContent}
                        onChange={(e) => {
                          this.searchData.searchContent = e.target.value;
                          this.setState({
                            searchData: this.searchData
                          });
                        }}
                        onSearch={value => {
                          this.searchData.searchContent = value;
                          this.getDataList();
                        }}
                        style={{ width: 240 }}
                      />
                    </div>
                  </div>

                </div>
                <div className='tableCont mainContentBox' style={{ height: 'calc(100% - 121px)' }}>
                  <Table
                    rowKey="taskid"
                    columns={columns}
                    rowSelection={rowSelection}
                    // pagination={pagination}
                    pagination={this.state.isLoad?false:pagination}
                    dataSource={this.state.tableData}
                    locale={{ emptyText: this.state.emptyTxt }}
                    onRow={(record, index) => ({
                      index,
                      onClick: this.onRowEvent.bind(this, record)
                    })}
                    scroll={{ x: '100%', y: 'calc(100vh - 291px)' }}
                  />
                </div>
                <Modal
                  visible={this.state.deleteVisible}
                  footer={null}
                  className={'ant-modal-confirm ant-modal-confirm-confirm'}
                  width={416}
                  onCancel={this.cancelDelete}
                >
                  <div className="ant-modal-confirm-body-wrapper">
                    <div className="ant-modal-confirm-body"><i aria-label="icon: question-circle"
                                                               className="anticon anticon-question-circle">
                      <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="question-circle" width="1em"
                           height="1em" fill="currentColor" aria-hidden="true">
                        <path
                          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path
                          d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"></path>
                      </svg>
                    </i><span className="ant-modal-confirm-title">删除确认</span>
                      <div className="ant-modal-confirm-content">该任务已发起对应的活动,是否全部删除?</div>
                    </div>
                    <div className="ant-modal-confirm-btns">
                      <button type="button" onClick={this.cancelDelete} className="ant-btn"><span>取 消</span></button>
                      <button type="button" onClick={() => this.deleteWishOnly(this.state.currentDeleteWish)}
                              className="ant-btn ant-btn-primary"><span>删除任务</span></button>
                      <button onClick={() => this.deleteItems(this.state.currentDeleteWish)} type="button"
                              className="ant-btn ant-btn-primary"><span>全部删除</span></button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </> :
          ''}
        {this.state.pageType != true && !detailType.includes(this.state.pageType) ? <VolunteerDetail
          type={this.state.pageType}
          serverArea={this.state.serverArea}
          serverType={this.state.serverType}
          detailData={this.state.currentDetail}
          spiderData={redeployList}
          zzmm={this.state.zzmm || []}
          jyxl={this.state.jxyl || []}
          stag={this.pageStag}
          onOk={this.onOk}
          back={this.pageBack}/> : ''}
        {detailType.includes(this.state.pageType) ?
          <LaunchDetail
            type={this.state.pageType}
            serverArea={this.state.serverArea}
            serverType={this.state.serverType}
            detailData={this.state.launchData}
            onOk={this.onOk}
            back={this.pageBack}/>
          : ''}
        <Modal
          title="任务指派"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.modalCancel}
        >
          <div style={{ 'textAlign': 'center' }}>
            任务人：<Select placeholder='请选择任务完成人' value={this.state.toMan} style={{ width: 200, marginRight: 20 }}
                        onChange={(toMan) => {
                          this.setState({ toMan });
                        }}>
            {this.state.spiderData.map((ele, index) => {
              return (<Option key={index} value={ele.userId + ''}>{ele.userNickName}</Option>);
            })}
          </Select>
          </div>
        </Modal>
        <Modal
          title="任务退回"
          visible={this.state.backVisible}
          onOk={this.handleBackOk}
          className={'taskList-back-modal'}
          onCancel={this.modalBackCancel}
          okText={'确认退回'}
        >
          <div className='back-content' style={{ 'textAlign': 'center' }}>
            <div className='back-tips'>此任务退回操作不可撤回,是否确认将其退回实践中心?</div>
            退回说明：<TextArea maxLength={100} placeholder='请在此处填写任务退回说明' className='tips-textArea'
                           value={this.state.backDes} style={{}}
                           rows={5}
                           onChange={(backDes) => {
                             this.setState({ backDes: backDes.target.value });
                           }}/>
            <div className='tips-num'>{this.state.backDes.length}/100</div>
          </div>
        </Modal>
        <Modal
          title="活动类型"
          visible={this.state.typeVisible}
          onOk={this.handleTypeOk}
          onCancel={this.modalTypeCancel}
        >
          <div style={{ 'textAlign': 'center' }}>
            活动类型：<Select placeholder='请选择活动类型' value={this.state.chooseType} style={{ width: 200, marginRight: 20 }}
                         onChange={(chooseType) => {
                           this.setState({ chooseType });
                         }}>
            <Option value={'launch'}>招募活动</Option>
            <Option value={'practice'}>实践活动</Option>
          </Select>
          </div>
        </Modal>
        <Modal
          title="任务转派"
          visible={this.state.showRedeploy}
          onOk={this.handleRedeployOk}
          onCancel={this.modalRedeployCancel}
          okText="确认转派"
        >
          <div className="redeploy-box">
              <Row className="redeploy-rows">
                  <span className="redeploy-label">转派对象</span>
                  <Select placeholder="请选择指派对象"
                    className="redeploy-select"
                    showSearch
                    dropdownMenuStyle={{maxHeight:'200px'}}
                    filterOption={(input, option)=>{
                      if (option.props.value == '') {
                        return true;
                      } else {
                        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                      }
                    }}
                    value={this.state.stationName}
                    onChange={(value)=>{this.setRedeployId(value)}}
                  >
                    {
                      this.state.redeployList.map((item,index)=>(
                        <Option key={index} value={item.userName}>{item.userName}</Option>
                      ))
                    }
                  </Select>
              </Row>
              <Row className="redeploy-rows last-rows">
                <span className="redeploy-label">转派说明</span>
                <div className="redeploy-wraps">
                <TextArea maxLength={this.maxLength}
                      placeholder='请填写转派说明'
                      className='redeploy-textArea'
                      value={this.state.redeployDesc}
                      onChange={(e) => {
                        this.setState({ redeployDesc: e.target.value });
                      }}
                />
                <p className="limit-box">
                  <span style={{color:this.state.redeployDesc.length>=this.maxLength?'red':'#d9d9d9'}}>{this.state.redeployDesc.length}</span> / <span>{this.maxLength}</span>
                </p>
                </div>
              </Row>
          </div>
        </Modal>
        {
          this.state.showRecoedModale?
          <Modal
            title="操作记录"
            visible={this.state.showRecoedModale}
            onCancel={this.closeRecordModale}
            footer={null}
            width={800}
          >
            <Spin spinning={this.state.isLoadRecord}>
                <div className="records-wraps">
                  {
                    timeList.length?<Timeline>
                    {
                      timeList.map((item,index)=>{
                        let recordHtml="";
                        if(item.operationtype==4){
                          recordHtml=<div className="record-title-wraps">
                            <h2 className="record-title">完成任务</h2>
                            <p>
                              <span className="record-name">{item.operationusername}</span>
                              <span>{item.createtime}</span>
                            </p>
                            </div>
                        }else if(item.operationtype==3){
                          recordHtml=<div className="record-title-wraps">
                              <h2 className="record-title">确认任务</h2>
                              <p>
                                <span className="record-name">{item.operationusername}</span>
                                <span>{item.createtime}</span>
                              </p>
                            </div>
                        }else if(item.operationtype==2){
                          recordHtml=<div className="record-title-wraps">
                              <h2 className="record-title">任务转派给<span>{item.spriderusername}</span></h2>
                              <p>
                                <span className="record-name">{item.operationusername}</span>
                                <span>{item.createtime}</span>
                              </p>
                              <p className="remark">{item.remark}</p>
                            </div>
                        }else if(item.operationtype==1){
                          recordHtml=<div className="record-title-wraps">
                            <h2 className="record-title">创建任务</h2>
                            <p>
                              <span className="record-name">{item.operationusername}</span>
                              <span>{item.createtime}</span>
                            </p>
                            </div>
                        }else if(item.operationtype==5){
                          recordHtml=<div className="record-title-wraps">
                            <h2 className="record-title">发布任务</h2>
                            <p>
                              <span className="record-name">{item.operationusername}</span>
                              <span>{item.createtime}</span>
                            </p>
                            </div>
                        }else if(item.operationtype==6){
                          recordHtml=<div className="record-title-wraps">
                            <h2 className="record-title">认领任务</h2>
                            <p>
                              <span className="record-name">{item.operationusername}</span>
                              <span>{item.createtime}</span>
                            </p>
                            </div>
                        }else if(item.operationtype==7){
                          recordHtml=<div className="record-title-wraps">
                            <h2 className="record-title">完成任务</h2>
                            <p>
                              <span className="record-name">{item.operationusername}</span>
                              <span>{item.createtime}</span>
                            </p>
                            </div>
                        }else if(item.operationtype==8){
                          recordHtml=<div className="record-title-wraps">
                            <h2 className="record-title">任务取消发布</h2>
                            <p>
                              <span className="record-name">{item.operationusername}</span>
                              <span>{item.createtime}</span>
                            </p>
                            </div>
                        }else if(item.operationtype==9){
                          recordHtml=<div className="record-title-wraps">
                            <h2 className="record-title">任务超时退回</h2>
                            <p>
                              <span className="record-name">{item.spriderusername}</span>
                              <span>{item.createtime}</span>
                            </p>
                            </div>
                        }
                        return <Timeline.Item key={index} className="record-rows">
                            {recordHtml}
                        </Timeline.Item>
                      })
                    }
                    </Timeline>:<p className="none-record">{this.state.isLoadRecord?"":"暂无记录"}</p>
                  }
                </div>
            </Spin>
          </Modal>:null
        }
      </div>
    );
  }
}

const mapState = ({ message, navTitle }) => ({
  listData: message.listData,
  listLoading: message.listLoading,
  navTitle: navTitle.navTitle
});

const mapDispatch = ({ message }) => ({
  getList: message.getList
});

export default connect(mapState, mapDispatch)(TableList);
