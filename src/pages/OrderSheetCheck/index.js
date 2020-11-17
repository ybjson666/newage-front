import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  Spin
} from 'antd';
import './index.less';
import * as volunteerListApi from '../../api/volunteerList';
import * as wishApi from '../../api/wish';
import * as resourceOrderApi from '../../api/orderSheetList';
import VolunteerDetail from './detail';
import { orderSheetState } from '../../utils/utils';
import moment from 'moment';
import * as resourceTypeApi from '../../api/orderSheetType';
import * as taskApi from '../../api/taskList';
import getCookie from '../../utils/cookie';


const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;


// 一个简单的table列表demo
class TableList extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      tableData: [],
      totalCount: 0,
      emptyTxt: '加载中...',
      params: {
        pageSize: 10,
        page: 1
      },
      currentDetail: {},
      pageType: true,
      serverType: [],
      serverArea: [],
      zzmm: [],
      jxyl: [],
      searchData: {},
      isLoad:false,
      checking:false
    };
    this.listData = {
      pageNo: 1,
      pageSize: 10
    };
    this.searchData = {};
    this.actvidArr={};
    this.isLast=false;
  }

  componentDidMount() {
    //点单类型
    this.getResourceType();

    // 获取站所
    const loginTid = getCookie().login_chinamcloud_tid;
    const login_tid=localStorage.getItem('login_tid');
    if(loginTid!==login_tid){
      localStorage.setItem('login_tid',loginTid)
      this.getSpidersList();
    }else{
      if(!localStorage.getItem('spiderData')){
        this.getSpidersList();
      }
    }
  
    setTimeout(() => {
      this.getDataList();
    });
  }

  // 获取点单类型
  getResourceType = () => {
    resourceTypeApi.getResourceTypeList({ pageNo: 1, pageSize: 10000 }).then((res) => {
      const useData = res && Array.isArray(res.data.data) ? res.data.data : [];
      this.setState({
        serverType: useData
      });
    });
  };
  //获取站所列表
  getSpidersList = () => {
    taskApi.getSpidersList({}).then(res => {
      if (!res || !res.success || !res.data) {
        return;
      }
      const spiderData = (res && res.data && res.data.pageRecords) || [];
      this.setState({
        spiderData
      });
    });
  };
  // 全选、多选事件
  onSelectChange = (selectedRowKeys, rows) => {
    if(rows.length<=1){
      this.isLast=false;
    }else{
      this.isLast=true;
    }
    let actvidArr={}; 
    const useSelectedRowKeys = [];
    const useRows = [];
    rows.map(ele => {
      useRows.push(ele);
      useSelectedRowKeys.push(ele.activityorderenterid);
    });
    
    for(var i = 0 ; i < rows.length ; i++){
      var odata = {};
      if(actvidArr[rows[i].activityid]){
        odata = actvidArr[rows[i].activityid];
      }
      if(!odata['count']){
        odata['count'] = 0;
      }
      odata['count'] = odata['count'] + 1;
      odata['title']=rows[i].activityOrder.title
      odata['servercount'] = rows[i].activityOrder.servicecount;
      odata['hascount'] = rows[i].activityOrder.hascount;
      actvidArr[rows[i].activityid] = odata;
    }
    this.actvidArr=actvidArr;

    this.setState({ selectedRowKeys: useSelectedRowKeys, selectRows: useRows });
  };

  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    const selectRows = [];
    selectedRowKeys.push(row.activityorderenterid);
    selectRows.push(row);
    this.setState({ selectedRowKeys, selectRows });
  };
// 获取列表
  getDataList = () => {
    const listData = Object.assign(this.searchData, this.listData);
    this.setState({
      emptyTxt:'加载中',
      tableData:[],
      isLoad:true
    });
    resourceOrderApi.resourceShowHistory(listData).then(res => {
      if (!res || !res.success) return;
      const arrayData = res && res.data.data&&res.data.data.data || [];
      const tableData = Array.isArray(arrayData) ? arrayData : [];
      this.setState({
        tableData: tableData,
        totalCount: res.data && res.data.data&&res.data.data.totalCount || 0,
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
  // 判断时间是否冲突
  onSingleEvent = (ids, state,rows,status) => {
    
    let { actvidArr }=this;
    const useData = {
      ids: ids.join(','),
      state
    };
    if(status===false){
      this.isLast=false;
    }
    const outStatus=rows.every((item,index)=>{
      if(item.activityOrder.begintime&&item.activityOrder.endtime){
        const statusBefore=moment(item.bookdate).isAfter(item.activityOrder.begintime);
        const statusAfter=moment(item.bookdate).isBefore(item.activityOrder.endtime);
        return statusBefore&&statusAfter;
      }else{
        return true;
      }
    });
    // const serviceStatus=rows.every((item,index)=>{
    //   return item.activityOrder.servicecount==0||item.activityOrder.hascount<item.activityOrder.servicecount;
    // });
    const timeStatus=rows.every((item,index)=>{
      if(item.activityOrder.endtime){
        return moment().isBefore(item.activityOrder.endtime);
      }else{
        return  true;
      }
    });
   
    let text = '此操作不可撤回,是否确认通过所选点单预约申请？';
    if(!outStatus){
      text = status?'所选项包含该申请与预设点单申请信息不符，是否确认通过所选点单预约申请？':'该申请与预设点单申请信息不符，是否确认通过所选点单预约申请？';
    }
    if(!timeStatus){
      text=status?'所选项包含有服务已过期的点单，是否继续审核通过？':'当前服务已过期，是否继续审核通过？';
    }
    
    let isEnough="";
    for(var i=0;i<rows.length;i++){
      if(rows[i].activityOrder.servicecount>0){
          if(rows[i].activityOrder.hascount==rows[i].activityOrder.servicecount){
            isEnough='无剩余';
            break;
          }else if(rows[i].activityOrder.hascount>rows[i].activityOrder.servicecount){
            isEnough='不足';
            break;
          }else{
            isEnough='充足';
          }
      }else{
          isEnough='无限制';
      }
    }
  
    if(status){
      if(isEnough==='无剩余'){
        text="所选项包含无剩余场次的点单，是否确认通过所选点单预约申请？"
      }else if(isEnough==='不足'){
        text="所选项包含剩余场次不足的点单，是否确认通过所选点单预约申请？"
      }else{
        text = '此操作不可撤回,是否确认通过所选点单预约申请？'
      }
    }else{
      if(isEnough==='无剩余'){
        text="该点单无剩余场次，是否确认通过所选点单预约申请？"
      }else if(isEnough==='不足'){
        text="该点单剩余场次不足，是否确认通过所选点单预约申请？"
      }else{
        text = '此操作不可撤回,是否确认通过所选点单预约申请？'
      }
    }
    // if(!serviceStatus){
    //   text = status?'所选项包含点单剩余场次不足，是否确认通过所选点单预约申请？':'该点单剩余场次不足，是否确认通过所选点单预约申请？';
    // }
   
    if(this.isLast){
      for(var o in actvidArr){
        var d = actvidArr[o];
        if(parseInt(d['hascount'])<parseInt(d['servercount']) && parseInt(d['count'])>(parseInt(d['servercount'])-parseInt(d['hascount']))){
          text="所选项包含点单剩余场次不足，是否确认通过所选点单预约申请？";
          break;
        }else if(parseInt(d['hascount']) == parseInt(d['servercount'])){
          text="所选项包含点单已无剩余场次，是否确认通过所选点单预约申请？";
          break;
        }
      }
    }
    
    const instance = this;
    confirm({
      title: '确认通过',
      content: text,
      onOk() {
        instance.confirm(ids,state);
      }
    });
    // const instance = this;
    // resourceOrderApi.getAudit(useData).then(res => {
    //   if (!res || !res.success) return;

    //   let text = '此操作不可撤回,是否确认通过所点单预约申请';
    //   if (res.data==0) {
    //     text = '所选申请与已审核通过的申请存在时间冲突，是否依然将其审核为通过?';
    //   }
    //   confirm({
    //     title: '确认通过',
    //     content: text,
    //     onOk() {
    //       instance.confirm(ids,state);
    //     }
    //   });
    // });
  };
  // 分页
  onShowSizeChange = (page, pageSize) => {
    this.listData.pageNo = page;
    this.listData.pageSize = pageSize;
    this.getDataList();
  };
  // 返回按钮
  pageBack = () => {
    this.setState({
      pageType: true
    });
  };

  //确认撤销
  confirm = (rows, state) => {
    const data = {
      state: state,
      ids: rows.join(',')
    };
    this.setState({
      checking:true
    })
    resourceOrderApi.getAuditAll(data).then(res => {
      if (!res || !res.success) return;
      message.success('审核成功！');
      this.getDataList();
      this.setState({
        selectRows: [],
        selectedRowKeys: [],
        checking:false
      });
    });
  };
  lookDetail = (activityId) => {
    if (!activityId) {
      return;
    }
    const data = {
      id: activityId
    };
    resourceOrderApi.getCheck(data).then(res => {
      if (!res.success) return;
      this.setState({
        currentDetail: res.data,
        pageType: false
      });
    });
  };

  // 保存成功回调
  onOk = () => {
    this.getDataList();
    this.setState({ pageType: true });
  };
  // 批量不通过
  mulpDelete = () => {
    
    const instance = this;
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择需要不通过的点单预约申请!');
      return;
    }
    let status=false;
    this.state.selectRows.map(ele=>{
      if(ele.state!=1){
        status=true
      }
    });
    if(status){
      message.info('当前所选项中包含已审核内容,请重试!');
      return;
    }
    confirm({
      title: '确认不通过',
      content: '此操作不可撤回,是否确认驳回所选点单预约申请?',
      onOk() {
        instance.confirm(instance.state.selectedRowKeys, 3);
      }
    });
  };
  // 批量通过
  mulpAccept = () => {
   let { actvidArr }=this;
    const instance = this;
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择需要通过的点单预约申请!');
      return;
    }
    let status=false;
    let isMany=true;
    
    if(this.state.selectRows.length==1){
      isMany=false;
      this.isLast=false;
    }else{
      this.isLast=true;
    }
    this.state.selectRows.map(ele=>{
      if(ele.state!=1){
        status=true
      }
    });
    if(status){
      message.info('当前所选项中包含已审核内容,请重试!');
      return;
    }
    this.onSingleEvent(this.state.selectedRowKeys,2,this.state.selectRows,isMany);
    // confirm({
    //   title: '确认通过',
    //   content: '此操作不可撤回,是否确认通过所选心愿申请?',
    //   onOk() {
    //     instance.confirm(instance.state.selectRows, 2);
    //   }
    // });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { listData } = this;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
      // // 不可审核置灰
      // getCheckboxProps: record => ({
      //   disabled: record.state!=1, // Column configuration not to be checked
      //   name: record.name,
      // }),
    };
    const pagination = {
      'pageSize': listData.pageSize,
      'total': this.state.totalCount,
      'current': listData.pageNo,
      'showTotal': total => `共 ${total} 条数据`,
      'showSizeChanger': true,
      'onShowSizeChange': this.onShowSizeChange,
      'onChange': this.onShowSizeChange
    };
   
    const columns = [
      {
        title: '点单名称',
        dataIndex: 'activityOrder.title',
        align: 'left',
        width: 160,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '服务地址',
        dataIndex: 'address',
        align: 'left',
        width: 80,
        render: (tags, row) => {
          return (  <Tooltip placement="topLeft" title={tags}>
            <span>{tags}</span>
          </Tooltip>);
        }
      }, {
        title: '服务时间',
        dataIndex: 'bookdate',
        align: 'left',
        width: 150,
        render: (tags, row) => {
          return (<span>
            <div>{tags}</div>
         </span>);
        }
      }, {
        title: '预约账号名',
        dataIndex: 'customer.customername',
        align: 'left',
        width: 140,
        render: (tags, row) => {
          return (
            <span>{tags}</span>
          );
        }
      }, {
        title: '审核状态',
        dataIndex: 'state',
        align: 'left',
        width: 80,
        render: (tags, row) => (
            <span>{row.activityOrder&&row.activityOrder.isdelete==1?'服务失效':orderSheetState[tags]}</span>
        )
      }, {
        title: '操作',
        align: 'left',
        width: 140,
        render: (tags, row) => {
          // isdelete==1不审核
          // isdelete==1显示为服务失效
          return (
            <div role="button" tabIndex="-1" style={{ whiteSpace: 'nowrap' }} onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
            }}>
              <a role="button" tabIndex="0" className='tableOperateButton' onClick={(e) => {
                this.lookDetail(row && row.activityorderenterid || '');
              }}>查看</a>
              {/*<Popconfirm placement="right" title={'此操作不可撤回,是否确认通过所选心愿申请?'} okType={'danger'}*/}
              {/*                              onConfirm={() => this.confirm([row], 2)}*/}
              {/*                              okText="确认" cancelText="取消">*/}
              {row.state == 1&&row.activityOrder&&row.activityOrder.isdelete!=1 ?
                <a tabIndex={0} role="button" onClick={() => this.onSingleEvent([row.activityorderenterid], 2,[row],false)}
                   className='tableOperateButton' type="link">通过</a> : ''}
              {/*</Popconfirm> */}
              {row.state == 1 &&row.activityOrder&&row.activityOrder.isdelete!=1? <Popconfirm placement="right" title={'此操作不可撤回,是否确认驳回所选点单预约申请?'} okType={'danger'}
                                            onConfirm={() => this.confirm([row.activityorderenterid], 3)}
                                            okText="确认" cancelText="取消">
                <a role="button" className='tableOperateButton' type="link">不通过</a>
              </Popconfirm> : ''}
            </div>
          );
        }
      }];

    return (
      this.state.pageType ? <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <span className={'title-active'}>
              {this.props.navTitle}
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox ActivityCheckList-page'>
          <div style={{ height: '100%' }}>
            <div className="navTopBox">
              <div className='btnBox'>
                <Button type={'primary'} onClick={this.mulpAccept}>通过</Button>
                <Button type={'danger'} ghost onClick={this.mulpDelete}>不通过</Button>
              </div>
              <div className='searchFatherBox searchLeftPadding'>
                <div className='searchBox '>
                  <span className='item-search-part'>
                审核状态：<Select value={this.state.searchData.state} placeholder='全部' style={{ width: 120 }}
                             onChange={(value) => {
                               this.listData.pageNo = 1;
                               this.listData.pageSize = 10;
                               this.searchData.state = value;
                               this.setState({
                                 searchData: this.searchData
                               });
                               this.getDataList();
                             }}>
                     <Option value="">全部</Option>
                    {Object.keys(orderSheetState).map(res => (
                      <Option key={res} value={res}>{orderSheetState[res]}</Option>
                    ))}

              </Select>
              </span>
                  <Search
                    placeholder="请输入点单人/点单名称"
                    enterButton="搜索"
                    value={this.state.searchData.key}
                    onChange={(e) => {
                      this.searchData.key = e.target.value;
                      this.setState({
                        searchData: this.searchData
                      });
                    }}
                    onSearch={value => {
                      this.searchData.key = value;
                      this.getDataList();
                    }}
                    style={{ width: 240 }}
                  />
                </div>
              </div>

            </div>
            <div className='tableCont mainContentBox' style={{ height: 'calc(100% - 121px)' }}>
              <Spin tip="审核中..." spinning={this.state.checking}>
                <Table
                  rowKey="activityorderenterid"
                  columns={columns}
                  rowSelection={rowSelection}
                  pagination={this.state.isLoad?false:pagination}
                  dataSource={this.state.tableData}
                  locale={{ emptyText: this.state.emptyTxt }}
                  onRow={(record, index) => ({
                    index,
                    onClick: this.onRowEvent.bind(this, record)
                  })}
                  scroll={{ x: '100%', y: 'calc(100vh - 291px)' }}
                />
              </Spin>
            </div>
          </div>
        </div>
      </> : <VolunteerDetail
        serverArea={this.state.serverArea}
        serverType={this.state.serverType}
        detailData={this.state.currentDetail}
        onOk={this.onOk}
        back={this.pageBack}/>
    );
  }
}

const mapState = ({ message,navTitle }) => ({
  listData: message.listData,
  listLoading: message.listLoading,
  navTitle:navTitle.navTitle
});

const mapDispatch = ({ message }) => ({
  getList: message.getList
});

export default connect(mapState, mapDispatch)(TableList);
