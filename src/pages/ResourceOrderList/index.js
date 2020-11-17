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
  DatePicker,
  Spin
} from 'antd';
import './index.less';
import * as volunteerListApi from '../../api/volunteerList';
import * as wishApi from '../../api/wish';
import * as resourceOrderApi from '../../api/resourceOrderList';
import VolunteerDetail from './detail';
import { resourceOrderState } from '../../utils/utils';
import moment from 'moment';
import * as resourceTypeApi from '../../api/resourceType';
import * as taskApi from '../../api/taskList';
import getCookie from '../../utils/cookie';

const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

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
      spiderData:JSON.parse(localStorage.getItem('spiderData'))||[],
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
  }

  componentDidMount() {
    //资源类型
    this.getResourceType();

    // 获取站所

    const loginTid = getCookie().login_chinamcloud_tid;
    const login_tid=localStorage.getItem('login_tid');
    if(loginTid!==login_tid){
      localStorage.setItem('login_tid',loginTid)
      this.getSpidersList();
    }else{
      // 获取站所
      if(!localStorage.getItem('spiderData')){
        this.getSpidersList();
      }
    }

    
    setTimeout(() => {
      this.getDataList();
    });
  }

  // 获取资源类型
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
      localStorage.setItem('spiderData',JSON.stringify(spiderData));
      this.setState({
        spiderData
      });
    });
  };
  // 全选、多选事件
  onSelectChange = (selectedRowKeys, rows) => {
    const useSelectedRowKeys = [];
    const useRows = [];
    rows.map(ele => {
      useRows.push(ele);
      useSelectedRowKeys.push(ele.ResourceBookID);
    });
    this.setState({ selectedRowKeys: useSelectedRowKeys, selectRows: useRows });
  };

  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    const selectRows = [];
    selectedRowKeys.push(row.ResourceBookID);
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
    resourceOrderApi.getResourceBookList(listData).then(res => {
      if (!res || !res.success) return;
      const arrayData = res && res.data.data || [];
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
  // 判断时间是否冲突
  onSingleEvent = (ids, state) => {
    const useData = {
      ids: ids.join(','),
      state
    };
    const instance = this;
    resourceOrderApi.getAudit(useData).then(res => {
      if (!res || !res.success) return;
      let text = '此操作不可撤回,是否确认通过所选资源预约申请';
      if (res.data==0) {
        text = '所选申请与已审核通过的申请存在时间冲突，是否依然将其审核为通过?';
      }
      confirm({
        title: '确认通过',
        content: text,
        onOk() {
          instance.confirm(ids,state);
        }
      });
    });
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
    console.log(this.state.selectRows);
    const instance = this;
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择需要不通过的预约!');
      return;
    }
    let status=false;
    this.state.selectRows.map(ele=>{
      if(ele.State!=0){
        status=true
      }
    });
    if(status){
      message.info('当前所选项中包含已审核预约!');
      return;
    }
    confirm({
      title: '确认不通过',
      content: '此操作不可撤回,是否确认驳回所选资源预约申请?',
      onOk() {
        instance.confirm(instance.state.selectedRowKeys, 2);
      }
    });
  };
  // 批量通过
  mulpAccept = () => {
    console.log(this.state.selectRows);
    const instance = this;
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择需要通过的预约!');
      return;
    }
    let status=false;
    this.state.selectRows.map(ele=>{
      if(ele.State!=0){
        status=true
      }
    });
    if(status){
      message.info('当前所选项中包含已审核预约!');
      return;
    }
    this.onSingleEvent(this.state.selectedRowKeys,1);
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
        title: '资源名称',
        dataIndex: 'ResourceName',
        align: 'left',
        width: 160,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '资源类型',
        dataIndex: 'ResourceType',
        align: 'left',
        width: 80,
        render: (tags, row) => {
          let tag = '';
          this.state.serverType.map((ele) => {
            if (ele.dictid == tags) {
              tag = ele.dictname;
            }
          });
          return (<span>{tag}</span>);
        }
      }, {
        title: '资源申请人',
        dataIndex: 'ContactName',
        align: 'left',
        width: 80,
        render: (tags, row) => {
          return (<span>{tags}</span>);
        }
      }, {
        title: '开始使用时间',
        dataIndex: 'StartTime',
        align: 'left',
        width: 140,
        render: (tags, row) => {
          return (
            <span>{tags}</span>
          );
        }
      }, {
        title: '结束使用时间',
        dataIndex: 'EndTime',
        align: 'left',
        width: 140,
        render: (tags, row) => {
          return (
            <span>{tags}</span>
          );
        }
      }, {
        title: '审核状态',
        dataIndex: 'State',
        align: 'left',
        width: 80,
        render: (tags, row) => (
            <span>{resourceOrderState[tags]}</span>
        )
      }, {
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
                this.lookDetail(row && row.ResourceBookID || '');
              }}>查看</a>
              {/*<Popconfirm placement="right" title={'此操作不可撤回,是否确认通过所选心愿申请?'} okType={'danger'}*/}
              {/*                              onConfirm={() => this.confirm([row], 2)}*/}
              {/*                              okText="确认" cancelText="取消">*/}
              {row.State == 0 ?
                <a tabIndex={0} role="button" onClick={() => this.onSingleEvent([row.ResourceBookID], 1)}
                   className='tableOperateButton' type="link">通过</a> : ''}
              {/*</Popconfirm> */}
              {row.State == 0 ? <Popconfirm placement="right" title={'此操作不可撤回,是否确认驳回所选资源预约申请?'} okType={'danger'}
                                            onConfirm={() => this.confirm([row.ResourceBookID], 2)}
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
                     资源类型：<Select value={this.state.searchData.resourceType} placeholder='全部' style={{ width: 120 }}
                                  onChange={(value) => {
                                    this.listData.pageNo = 1;
                                    this.listData.pageSize = 10;
                                    this.searchData.resourceType = value;
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
                    {Object.keys(resourceOrderState).map(res => (
                      <Option key={res} value={res}>{resourceOrderState[res]}</Option>
                    ))}

              </Select>
              </span>
                  <span className='item-search-part' id="item-search-part">
                预约时间：<DatePicker 
                            className="search-time"
                            placeholder='选择时间' 
                            format={'YY-MM-DD'}
                            style={{ width: '200px'}} onChange={(value) => {
                              this.listData.pageNo = 1;
                              this.listData.pageSize = 10;
                              this.searchData.startTime = value ? moment(value).format('YYYY-MM-DD') : "";
                              if(this.searchData.startTime){
                                this.searchData.startTime= this.searchData.startTime.replace(/-/g,'/');
                                this.searchData.startTime=new Date(this.searchData.startTime).getTime();
                              }
                              
                              // this.searchData.endTime = value[1] ? moment(value[1]).valueOf() : undefined;
                              this.setState({
                                searchData: this.searchData
                              });
                              this.getDataList();
                  }}/>
              </span>
                  <Search
                    placeholder="请输入资源名称"
                    enterButton="搜索"
                    value={this.state.searchData.resourceName}
                    onChange={(e) => {
                      this.searchData.resourceName = e.target.value;
                      this.setState({
                        searchData: this.searchData
                      });
                    }}
                    onSearch={value => {
                      this.searchData.resourceName = value;
                      this.getDataList();
                    }}
                    style={{ width: 200 }}
                  />
                </div>
              </div>

            </div>
            <div className='tableCont mainContentBox' style={{ height: 'calc(100% - 121px)' }}>
              <Spin tip="审核中..." spinning={this.state.checking}>
                <Table
                  rowKey="ResourceBookID"
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
        zzmm={this.state.zzmm || []}
        jyxl={this.state.jxyl || []}
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
