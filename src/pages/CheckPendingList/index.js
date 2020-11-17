import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIdsObj } from '../../utils/getIdsObj';
import {
  Table,
  Tooltip,
  Spin,
  Button,
  Breadcrumb,
  Input,
  Select,
  Modal,
  Popconfirm,
  message,
} from 'antd';
import './index.less';
import * as volunteerListApi from '../../api/volunteerList';
import VolunteerDetail from './detail';
import { userState } from '../../utils/utils';
import getCookie from '../../utils/cookie';
import * as taskApi from '../../api/taskList';


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
      zzmm:JSON.parse(localStorage.getItem('zzmm'))||[],
      jxyl: JSON.parse(localStorage.getItem('jxyl'))||[],
      spiderData:JSON.parse(localStorage.getItem('spiderData'))||[],
      searchData:{},
      isLoad:false,
      checking:false
    };
    this.listData = {
      pageno: 1,
      pagesize: 10
    };
    this.searchData = {};
    //通过状态
    this.acState = 2;
    //不通过状态
    this.reState = 3;
    const urlParams = getIdsObj(window.location.search);
    
    if (urlParams.stag) {
      this.pageStag = urlParams.stag.replace('\/', '');
    } else {
      this.pageStag = 'B';
    }
    
  }

  componentDidMount() {
    // 在DidMount里去请求数据
    const { getList } = this.props;
    const { params } = this.state;

    const loginTid = getCookie().login_chinamcloud_tid;
    const login_tid=localStorage.getItem('login_tid');
    if(loginTid!==login_tid){
      localStorage.setItem('login_tid',loginTid)
      this.getDict();
      this.getSearviceType();
      this.getSearviceArea();
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
      useSelectedRowKeys.push(ele.id);
      // if (ele.state == 1) {
      //   useRows.push(ele);
      //   useSelectedRowKeys.push(ele.id);
      // } else {
      //   status = true;
      // }
    });
    // if (status) {
    //   message.error('当前选择项，审核过,不可选择！');
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
    // if (row.state != 1) {
    //   message.error('当前选择项，审核过,不可选择！');
    //   setTimeout(() => {
    //     message.destroy();
    //   }, 1000);
    //   return;
    // }
    selectedRowKeys.push(row.id);
    selectRows.push(row);
    this.setState({ selectedRowKeys, selectRows });
  };
// 获取列表
  getDataList = () => {
    const listData = {};
    listData.params = Object.assign(this.searchData, this.listData);
    this.setState({
      emptyTxt:'加载中',
      tableData:[],
      isLoad:true
    });
    volunteerListApi.getClist(listData).then(res => {
      const arrayData = res.data && res.data.data || [];
      const tableData = Array.isArray(arrayData) ? arrayData : [];
      tableData.map((ele, index) => {
        ele.id = ele.thridInfo && ele.thridInfo.userid;
      });
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

  //获取站所列表
  getSpidersList = () => {
    taskApi.getSpidersList({}).then(res => {
      if (!res || !res.success || !res.data) {
        return;
      }
      const spiderData = (res && res.data && res.data.pageRecords) || [];
      localStorage.setItem('spiderData',JSON.stringify(spiderData))
      this.setState({
        spiderData
      });
    });
  };

  //确认撤销
  confirm = (rows, state) => {
    let str = [];
    let status=false;
    rows.map(ele => {
      str.push(ele.customerid);
      if(ele.state!=1){
        status=true;
      }
    });
    if(status){
      message.error('所选项包含已审核内容，请重试!');
      return;
    }
    const data = {
      state: state,
      customerIds: str.join(',')
    };
    this.setState({
      checking:true
    })
    volunteerListApi.setAdminApply(data).then(res => {
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
      localStorage.setItem('jxyl',JSON.stringify(jxyl))
      this.setState({
        zzmm,
        jxyl
      });
    });
  };
  lookDetail = (user) => {
    if (!user.userid) {
      return;
    }
    const data = {
      uid: user.userid
    };
    volunteerListApi.getVolunteerDetail(data).then(res => {
      this.setState({
        currentDetail: res.data,
        pageType: false
      });
    });
  };
  // 返回按钮
  pageBack = () => {
    this.setState({
      pageType: true
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
      message.info('请选择审核项!');
      return;
    }
    confirm({
      title: '确认不通过',
      content: '此操作不可撤回,是否确认驳回所选志愿者申请?',
      onOk() {
        instance.confirm(instance.state.selectRows, instance.reState);
      }
    });
  };
  // 批量通过
  mulpAccept = () => {
    const instance = this;
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择审核项!');
      return;
    }
    confirm({
      title: '确认通过',
      content: '此操作不可撤回,是否确认通过所选志愿者申请?',
      onOk() {
        instance.confirm(instance.state.selectRows, instance.acState);
      }
    });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { listData } = this;
    const rowSelection = {
      columnWidth: 60,
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
        title: '申请人账号',
        dataIndex: 'thridInfo.mobile',
        align: 'left',
        width: 160,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '申请人账号名',
        dataIndex: 'thridInfo.nickname',
        align: 'left',
        width: 140,
        render: (tags, row) => (
          <Tooltip placement="topLeft" title={tags}>
            <span>{tags}</span>
          </Tooltip>
        )
      }, {
        title: '服务类型',
        dataIndex: 'servicetype',
        align: 'left',
        width: 80,
        render: (tags, row) => {
          let tag = '';
          this.state.serverType.map((ele) => {
            if (ele.dictionaryId == tags) {
              tag = ele.dictionaryValue;
            }
          });
          return (<span>{tag}</span>);
        }
      }, {
        title: '服务地区',
        dataIndex: 'servicearea',
        align: 'left',
        width: 80,
        render: (tags, row) => {
          let tag = '';
          this.state.serverArea.map((ele) => {
            if (ele.dictionaryId == tags) {
              tag = ele.dictionaryValue;
            }
          });
          return (<span>{tag}</span>);
        }
      }, {
        title: '申请时间',
        dataIndex: 'subdate',
        align: 'left',
        width: 150,
        render: (tags, row) => (
          <span>{tags}</span>
        )
      }, {
        title: '审核状态',
        dataIndex: 'state',
        align: 'left',
        width: 80,
        render: (tags, row) => (
          <span>{userState[tags]}</span>
        )
      }, {
        title: '操作',
        align: 'left',
        width: 160,
        render: (tags, row) => {
          return (
            <div role="button" tabIndex="-1" style={{ whiteSpace: 'nowrap' }} onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
            }}>
              <a role="button" tabIndex="0" className='tableOperateButton' onClick={(e) => {
                this.lookDetail(row && row.thridInfo || {});
              }}>查看</a>
              {row.state == 1 ? <Popconfirm placement="right" title={'此操作不可撤回,是否确认通过所选志愿者申请?'} okType={'primary'}
                                            onConfirm={() => this.confirm([row], this.acState)}
                                            okText="通过" cancelText="取消">
                <a role="button" className='tableOperateButton' type="link">通过</a>
              </Popconfirm> : ''}
              {row.state == 1 ? <Popconfirm placement="right" title={'此操作不可撤回,是否确认驳回所选志愿者申请?'} okType={'primary'}
                                            onConfirm={() => this.confirm([row], this.reState)}
                                            okText="不通过" cancelText="取消">
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
        <div className='eachPageBox'>
          <div style={{ height: '100%' }}>
            <div className="navTopBox">
              <div className='btnBox'>
                <Button type={'primary'} onClick={this.mulpAccept}>通过</Button>
                <Button type={'danger'} ghost onClick={this.mulpDelete}>不通过</Button>
              </div>
              <div className='searchFatherBox searchLeftPadding'>
                <div className='searchBox '>
                <span className='item-search-part'>
                    服务类型：<Select value={this.state.searchData.serverType} placeholder='全部' style={{ width: 120 }} onChange={(value) => {
                  this.listData.pageno = 1;
                  this.listData.pagesize = 10;
                  this.searchData.serverType = value;
                  this.setState({
                    searchData:this.searchData
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
                服务地区：<Select value={this.state.searchData.serverArea} placeholder='全部' style={{ width: 120 }} onChange={(value) => {
                    this.listData.pageno = 1;
                    this.listData.pagesize = 10;
                    this.searchData.serverArea = value;
                    this.setState({
                      searchData:this.searchData
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
                审核状态：<Select  value={this.state.searchData.state} placeholder='全部' style={{ width: 120 }} onChange={(value) => {
                    this.listData.pageno = 1;
                    this.listData.pagesize = 10;
                    this.searchData.state = value;
                    this.setState({
                      searchData:this.searchData
                    });
                    this.getDataList();
                  }}>
                     <Option value="">全部</Option>
                     {/*<Option value="1">待审核</Option>*/}
                     {/*<Option value="2">已通过</Option>*/}
                     {/*<Option value="3">不通过</Option>*/}
                    {Object.keys(userState).map((ele,index)=>{
                      return (
                        <Option key={index} value={ele}>{userState[ele]}</Option>
                      )
                    })}
              </Select>
              </span>
                  <Search
                    placeholder="请输入申请人账号名称"
                    enterButton="搜索"
                    value={this.state.searchData.key}
                    onChange={(e)=>{
                      this.searchData.key = e.target.value;
                      this.setState({
                        searchData:this.searchData
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
                  rowKey="id"
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
        spiderData={this.state.spiderData || []}
        onOk={this.onOk}
        pageStag={this.pageStag}
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
