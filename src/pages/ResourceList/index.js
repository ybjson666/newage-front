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
  message
} from 'antd';
import './index.less';
import * as volunteerListApi from '../../api/volunteerList';
import * as activityApi from '../../api/activity';
import * as resourceApi from '../../api/resourceList';
import * as resourceTypeApi from '../../api/resourceType';
import VolunteerDetail from './detail';
import { activityState,resourceState } from '../../utils/utils';
import moment from 'moment';
import * as taskApi from '../../api/taskList';
import { getIdsObj } from '../../utils/getIdsObj';
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
      emptyTxt:'加载中...',
      params: {
        pageSize: 10,
        page: 1
      },
      currentDetail: {},
      pageType: true,
      serverType: [],
      searchData: {},
      spiderData:JSON.parse(localStorage.getItem('spiderData'))||[],
      serverArea:JSON.parse(localStorage.getItem('serverArea'))||[],
      allServerTypeData:[],
      noEnableType:[],
      isLoad:false
    };
    this.listData = {
      pageNo: 1,
      pageSize: 10
    };
    this.searchData = {};
    const urlParams = getIdsObj(window.location.search);
    if (urlParams.stag) {
      this.pageStag = urlParams.stag.replace('\/', '');
    } else {
      this.pageStag = 'B';
    }
  }

  componentDidMount() {
    //资源类型
    this.getResourceType();

    const loginTid = getCookie().login_chinamcloud_tid;
    const login_tid=localStorage.getItem('login_tid');
    if(loginTid!==login_tid){
      localStorage.setItem('login_tid',loginTid)
      this.getSearviceArea();
      this.getSpidersList();
    }else{
      
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
    });
  }

  // 全选、多选事件
  onSelectChange = (selectedRowKeys, rows) => {
    const useSelectedRowKeys = [];
    const useRows = [];
    rows.map(ele => {
      useRows.push(ele);
      useSelectedRowKeys.push(ele.resourceid);
    });
    this.setState({ selectedRowKeys: useSelectedRowKeys, selectRows: useRows });
  };

  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    const selectRows = [];
    selectedRowKeys.push(row.resourceid);
    selectRows.push(row);
    this.setState({ selectedRowKeys, selectRows });
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
// 获取列表
  getDataList = () => {
    const listData =Object.assign(this.searchData, this.listData);
    this.setState({
      emptyTxt:'加载中',
      tableData:[],
      isLoad:true
    });
    resourceApi.getResourceList(listData).then(res => {
      if(!res||!res.success||!res.data){return;}
      const arrayData = (res && res.data.data) || [];
      const tableData = Array.isArray(arrayData) ? arrayData : [];
      this.setState({
        tableData: tableData,
        totalCount: res.data && res.data.totalCount || 0,
        isLoad:false
      },()=>{
        if(!this.state.tableData.length){
          this.setState({
            emptyTxt:'暂无数据'
          })
        }
      });
    });
  };
  // 分页
  onShowSizeChange = (page, pageSize) => {
    window.event.preventDefault();
    window.event.stopPropagation();
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
  // 获取资源类型
  getResourceType = () => {
    resourceTypeApi.getResourceTypeList({pageNo:1,pageSize:10000,enable:1}).then((res) => {
      const useData = res && Array.isArray(res.data.data) ? res.data.data : [];
      let useArryay=[];
      let showType = [];
      useData.map(ele=>{
        if(ele.isdelete==0){
          useArryay.push(ele);
        }
      });
      useData.map(ele=>{
        if(ele.isdelete==0 && ele.enable == 1){
          showType.push(ele);
        }
      });
      this.setState({
        serverType: useArryay,
        allServerTypeData:useData,
        noEnableType:showType
      });
    });
  };
  //获取站所列表
  getSpidersList = () => {
    taskApi.getSpidersList({}).then(res => {
      if(!res||!res.success||!res.data){return;}
      const spiderData = (res && res.data && res.data.pageRecords) || [];
      localStorage.setItem('spiderData',JSON.stringify(spiderData));
      this.setState({
        spiderData
      });
    });
  };


  //查看详情
  lookDetail = (row) => {
    if (!row.resourceid) {
      return;
    }
    const data = {
      resourceid: row.resourceid
    };
    resourceApi.resourceDetail(data).then(res => {
      if (res&&res.success) {
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
    console.log(this.state.selectRows);
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择需要删除的资源!');
      return;
    }
    const instance = this;
    confirm({
      title: '删除确认',
      content: '此操作不可撤回,是否确认删除所选实践资源?',
      onOk() {
        instance.deleteItem(instance.state.selectedRowKeys);
      }
    });
  };
  // 批量启用
  mulpAccept = () => {
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择需要启用的资源!');
      return;
    }
    let status=false;
    this.state.selectRows.map(ele=>{
      if(ele.enable==1){
        status=true
      }
    });
    if(status){
      message.error('当前所选项中包含已启用资源!');
      this.setState({
        selectRows: [],
        selectedRowKeys: []
      });
      return;
    }
    this.confirm(this.state.selectedRowKeys,0);
  };
  // 批量禁用
  mulpDelay = () => {
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择需要禁用的资源!');
      return;
    }
    let status=false;
    this.state.selectRows.map(ele=>{
      if(ele.enable==0){
        status=true
      }
    });
    if(status){
      message.error('当前所选项中包含已禁用的资源!');
      this.setState({
        selectRows: [],
        selectedRowKeys: []
      });
      return;
    }
    this.confirm(this.state.selectedRowKeys,1);
  };
  // 新建活动
  createActivity = () => {
    this.setState({ pageType: 'create' });
  };
// 删除资源
  deleteItem=(data)=>{
    const useData={
      resourceIds:data.join(',')
    };
    resourceApi.delResource(useData).then(res=>{
      if (!res||!res.success) return;
      message.info('删除成功');
      // this.closeModal();
      if(data.length==this.state.tableData.length){
        this.listData.pageNo = 1;
      }
      this.getDataList();
      this.setState({
        selectRows: [],
        selectedRowKeys: []
      });
    })
  };
  //确认启用,禁用
  confirm = (rowIds,enable) => {
    const data = {
      enable: enable==1?0:1,
      resourceIds: rowIds.join(',')
    };
    resourceApi.enableResource(data).then(res => {
      if (!res || !res.success) return;
      const msg= enable==1?'禁用成功':'启用成功';
      message.success(msg);
      this.getDataList();
      this.setState({
        selectRows: [],
        selectedRowKeys: []
      });
    });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const { listData } = this;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
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
    const resourceForm=this.pageStag=="B"?[{
        title: '资源来源',
        dataIndex: 'ownername',
        align: 'left',
        width: 100,
        render: (tags, row) => {
          if(row.ownertype===0){
            return (<Tooltip placement="topLeft" title={tags}>
            <span>实践中心</span>
          </Tooltip>);
          }else{
            return (<Tooltip placement="topLeft" title={tags}>
              <span>{tags}</span>
            </Tooltip>);
          }
          
        }
      }]:[];
    const columns = [
      {
        title: '资源名称',
        dataIndex: 'resourcename',
        align: 'left',
        width: 200,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '资源地址',
        dataIndex: 'address',
        align: 'left',
        width: 120,
        render: (tags, row) => {
          return (  <Tooltip placement="topLeft" title={tags}>
            <span>{tags}</span>
          </Tooltip>);
        }
      }, {
        title: '资源类型',
        dataIndex: 'resourcetype',
        align: 'left',
        width: 100,
        render: (tags, row) => {
          let tag = '';
          this.state.allServerTypeData.map((ele) => {
            if (ele.dictid == tags) {
              tag = ele.dictname;
            }
          });
          return ( <Tooltip placement="topLeft" title={tag}>
            <span>{tag}</span>
          </Tooltip>);
        }
      }, {
        title: '资源开放时间',
        dataIndex: 'opentime',
        align: 'left',
        width: 140,
        render: (tags, row) => {
          const startTime = tags && moment(tags).format('HH:mm:ss');
          const endTime = tags && moment(row.closetime).format('HH:mm:ss');
          return (<span>{startTime}-{endTime}</span>);
        }
      },
        ...resourceForm
      ,
      {
        title: '资源状态',
        dataIndex: 'enable',
        align: 'left',
        width: 80,
        render: (tags, row) => (
          <span>{resourceState[tags]}</span>
        )
      }
      , {
        title: '操作',
        align: 'left',
        width: 140,
        render: (tags, row) => {
          return (
            <div role="button" tabIndex="-1" style={{ whiteSpace: 'nowrap' }} onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
            }}>
              <a role="button" tabIndex="0" className='tableOperateButton' onClick={(e) => {
                this.lookDetail(row || {});
              }}>查看</a>
              <a role="button" tabIndex="0" className='tableOperateButton' onClick={(e) => {
                this.confirm([row.resourceid],row.enable);
              }}>{row.enable==1?'禁用':'启用'}</a>
              <Popconfirm placement="right" title={'此操作不可撤回,是否确认删除所选实践资源?'} okType={'danger'}
                          onConfirm={() => this.deleteItem([row.resourceid])}
                          okText="确认" cancelText="取消">
                <a role="button" className='tableOperateButton' type="link">删除</a>
              </Popconfirm>
            </div>
          );
        }
      }
    ];

    return (
      this.state.pageType == true ? <>
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
                <Button type={'primary'} onClick={this.createActivity}>新建资源</Button>
                <Button type={'primary'} ghost onClick={this.mulpAccept}>启用</Button>
                <Button type={'danger'} ghost onClick={this.mulpDelay}>禁用</Button>
                <Button type={'danger'} ghost onClick={this.mulpDelete}>删除</Button>
              </div>
              <div className='searchFatherBox searchLeftPadding'>
                <div className='searchBox '>
                 <span className='item-search-part'>
                    资源类型：<Select value={this.state.searchData.dictId} placeholder='全部' style={{ width: 120 }}
                                   onChange={(value) => {
                                     this.listData.pageNo = 1;
                                     this.listData.pageSize = 10;
                                     this.searchData.dictId = value;
                                     this.setState({
                                       searchData: this.searchData
                                     });
                                     this.getDataList();
                                   }}>
                  <Option value="">全部</Option>
                  {this.state.serverType.map((ele, index) => {
                    return (<Option key={index} value={ele.dictid}>{ele.dictname}</Option>);
                  })}
                </Select>
                </span>
                  {this.pageStag=="B"? <span className='item-search-part'>
                资源来源：<Select value={this.state.searchData.stationId} placeholder='全部' style={{ width: 120 }}
                             onChange={(value) => {
                               this.listData.pageNo = 1;
                               this.listData.pageSize = 10;
                               this.searchData.stationId = value;
                               this.setState({
                                 searchData: this.searchData
                               });
                               this.getDataList();
                             }}>
                      <Option value="">全部</Option>
                     <Option value="-1">实践中心</Option>
                    {this.state.spiderData.map((ele, index) => {
                      return (<Option key={index} value={ele.userId}>{ele.userName}</Option>);
                    })}
              </Select>
              </span>:''}
                  <Search
                    placeholder="请输入资源名称"
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
              <Table
                rowKey="resourceid"
                columns={columns}
                rowSelection={rowSelection}
                pagination={this.state.isLoad?false:pagination}
                dataSource={this.state.tableData}
                locale={{emptyText:this.state.emptyTxt}}
                onRow={(record, index) => ({
                  index,
                  onClick: this.onRowEvent.bind(this, record)
                })}
                scroll={{ x: '100%', y: 'calc(100vh - 291px)' }}
              />
            </div>
          </div>
        </div>
      </> : <VolunteerDetail
        type={this.state.pageType}
        serverType={this.state.serverType}
        detailData={this.state.currentDetail}
        spiderData={this.state.spiderData}
        serverArea={this.state.serverArea}
        allServerTypeData={this.state.allServerTypeData}
        noEnableType={this.state.noEnableType}
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
