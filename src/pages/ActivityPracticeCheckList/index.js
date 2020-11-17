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
  Spin
} from 'antd';
import './index.less';
import * as volunteerListApi from '../../api/volunteerList';
import * as activityApi from '../../api/ActivityPractice';
import VolunteerDetail from './detail';
import { activityPraCheckState as activityCheckState } from '../../utils/utils';
import moment from 'moment';
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
      serverType:JSON.parse(localStorage.getItem('serverType'))||[],
      serverArea:JSON.parse(localStorage.getItem('serverArea'))||[],
      zzmm: [],
      jxyl: [],
      searchData: {},
      isLoad:false,
      checking:false
    };
    this.listData = {
      pageno: 1,
      pagesize: 10
    };
    this.searchData = {};
  }

  componentDidMount() {
    // 在DidMount里去请求数据
    const { getList } = this.props;
    const { params } = this.state;

    const loginTid = getCookie().login_chinamcloud_tid;
    const login_tid=localStorage.getItem('login_tid');
    if(loginTid!==login_tid){
      localStorage.setItem('login_tid',loginTid)
      this.getSearviceType();
      this.getSearviceArea();
   
    }else{
      if(!localStorage.getItem('serverType')){
        this.getSearviceType();
      }
      if(!localStorage.getItem('serverArea')){
        this.getSearviceArea();
      }
     
    }
    
    setTimeout(() => {
      this.getDataList();
    });
    // getList(params);
  }

  // 全选、多选事件
  onSelectChange = (selectedRowKeys, rows) => {
    const useSelectedRowKeys = [];
    const useRows = [];
    let status = false;
    rows.map(ele => {
      useRows.push(ele);
      useSelectedRowKeys.push(ele.activityenterid);
      // if (ele.state == 1) {
      //   useRows.push(ele);
      //   useSelectedRowKeys.push(ele.activityenterid);
      // } else {
      //   status = true;
      // }
    });
    // if (status) {
    //   message.error('当前选择项，审核过,不可选择！');
    //   setTimeout(()=>{
    //     message.destroy();
    //   },1000);
    // }
    this.setState({ selectedRowKeys: useSelectedRowKeys, selectRows: useRows });
  };

  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    const selectRows = [];
    // if (row.state != 1) {
    //   message.error('当前选择项，审核过,不可选择！');
    //   setTimeout(()=>{
    //     message.destroy();
    //   },1000);
    //   return;
    // }
    selectedRowKeys.push(row.activityenterid);
    selectRows.push(row);
    this.setState({ selectedRowKeys, selectRows });
  };
// 获取列表
  getDataList = () => {
    const listData = Object.assign(this.searchData, this.listData);
    this.setState({
      emptyTxt:'加载中',
      tableData:[],
      isLoad:true,
    });
    activityApi.activityQueryActivityEnter(listData).then(res => {
      if (!res.success) return;
      const arrayData = res && res.data.data || [];
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
  //确认撤销
  confirm = (rows, state) => {
    let str = [];
    rows.map(ele => {
      str.push(ele.activityenterid);
    });
    const data = {
      state: state,
      ids: str.join(',')
    };
    this.setState({
      checking:true
    })
    activityApi.activityAudit(data).then(res => {
      if (!res.success) return;
      message.info(res.message);
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
    activityApi.activityCheckActivityEnter(data).then(res => {
      if (!res||!res.success) return;
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
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择审核项!');
      return;
    }
    const instance = this;
    confirm({
      title: '确认不通过',
      content: '此操作不可撤回,是否确认驳回所选活动申请?',
      onOk() {
        instance.confirm(instance.state.selectRows, 3);
      }
    });
  };
  // 批量通过
  mulpAccept = () => {
    console.log(this.state.selectRows);
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择审核项!');
      return;
    }
    const instance = this;
    confirm({
      title: '确认通过',
      content: '此操作不可撤回,是否确认通过所选活动申请?',
      onOk() {
        instance.confirm(instance.state.selectRows, 2);
      }
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
        title: '活动名称',
        dataIndex: 'activityname',
        align: 'left',
        width: 160,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '活动地区',
        dataIndex: 'areaid',
        align: 'left',
        width: 90,
        render: (tags, row) => {
          let tag = '';
          this.state.serverArea.map((ele) => {
            if (ele.dictionaryId == tags) {
              tag = ele.dictionaryValue;
            }
          });
          return (<span>{tag}</span>);
        }
      },
      // {
      //   title: '活动类型',
      //   dataIndex: 'activitytype',
      //   align: 'left',
      //   width: 80,
      //   render: (tags, row) => {
      //     let tag = '';
      //     this.state.serverType.map((ele) => {
      //       if (ele.dictionaryId == tags) {
      //         tag = ele.dictionaryValue;
      //       }
      //     });
      //     return (<span>{tag}</span>);
      //   }
      // },
      {
        title: '申请人',
        dataIndex: 'customername',
        align: 'left',
        width: 100,
        render: (tags, row) => (
          <Tooltip placement="topLeft" title={tags}>
            <span>{tags}</span>
          </Tooltip>
        )
      }
      // ,{
      //   title: '服务类型',
      //   dataIndex: 'servicetype',
      //   align: 'left',
      //   width: 90,
      //   render: (tags, row) => {
      //     let tag = '';
      //     this.state.serverType.map((ele) => {
      //       if (ele.dictionaryId == tags) {
      //         tag = ele.dictionaryValue;
      //       }
      //     });
      //     return (<span>{tag}</span>);
      //   }
      // }
      
      , {
        title: '申请时间',
        dataIndex: 'subdate',
        align: 'left',
        width: 150,
        render: (tags, row) => {
          const date = tags && moment(tags).format('YYYY-MM-DD HH:mm:ss');
          return (
            <span>{date}</span>
          );
        }
      }, {
        title: '审核状态',
        dataIndex: 'state',
        align: 'left',
        width: 80,
        render: (tags, row) => (
          <span>{activityCheckState[tags]}</span>
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
                this.lookDetail(row && row.activityenterid || '');
              }}>查看</a>
              {row.state == 1 ? <Popconfirm placement="right" title={'此操作不可撤回,是否确认通过所选活动申请?'} okType={'danger'}
                                            onConfirm={() => this.confirm([row], 2)}
                                            okText="确认" cancelText="取消">
                <a role="button" className='tableOperateButton' type="link">通过</a>
              </Popconfirm> : ''}
              {row.state == 1 ? <Popconfirm placement="right" title={'此操作不可撤回,是否确认驳回所选活动申请?'} okType={'danger'}
                                            onConfirm={() => this.confirm([row], 3)}
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
                               this.listData.pageno = 1;
                               this.listData.pagesize = 10;
                               this.searchData.state = value;
                               this.setState({
                                 searchData: this.searchData
                               });
                               this.getDataList();
                             }}>
                     <Option value="">全部</Option>
                    {Object.keys(activityCheckState).map((res,index) => (
                      <Option value={res} key={index}>{activityCheckState[res]}</Option>
                    ))}

              </Select>
              </span>
                  <Search
                    placeholder="请输入申请人名/活动名"
                    enterButton="搜索"
                    value={this.state.searchData.keyName}
                    onChange={(e) => {
                      this.searchData.keyName = e.target.value;
                      this.setState({
                        searchData: this.searchData
                      });
                    }}
                    onSearch={value => {
                      this.searchData.keyName = value;
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
                  rowKey="activityenterid"
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
