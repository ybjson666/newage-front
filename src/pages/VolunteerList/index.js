import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  Tooltip,
  Icon,
  Button,
  Breadcrumb,
  Input,
  Select,
  Modal,
  Popconfirm,
  message,
  InputNumber
} from 'antd';
import './index.less';
import * as volunteerListApi from '../../api/volunteerList';
import VolunteerDetail from './detail';
import * as taskApi from '../../api/taskList';
import getCookie from '../../utils/cookie';
import { getIdsObj } from '../../utils/getIdsObj';

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
      serverType:JSON.parse(localStorage.getItem('serverType'))||[],
      serverArea:JSON.parse(localStorage.getItem('serverArea'))||[],
      zzmm:JSON.parse(localStorage.getItem('zzmm'))||[],
      jxyl: JSON.parse(localStorage.getItem('jxyl'))||[],
      searchData: {},
      spiderData:JSON.parse(localStorage.getItem('spiderData'))||[],
      customerId:"",
      isLoad:false
    };
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
    });
    // getList(params);
  }

  // 全选、多选事件
  onSelectChange = (selectedRowKeys, rows) => {
    this.setState({ selectedRowKeys, selectRows: rows });
  };
  //添加积分
  addNum = () => {
    const row = this.state.addRow;
    const data = {
      uid: row && row.thridInfo && row.thridInfo.userid,
      score: this.score
    };
    if (this.score) {
      volunteerListApi.setAddScore(data).then(res => {
        message.success('积分添加成功!');
        this.getDataList();
        this.handleCancel();
      });
    } else {
      message.info('请填写积分！');
    }
  };
  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    const selectRows = [];
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
    volunteerListApi.getVolunteerList(listData).then(res => {
      if (!res || !res.success) return;
      const arrayData = res.data && res.data.data || [];
      const tableData = Array.isArray(arrayData) ? arrayData : [];
      tableData.map((ele, index) => {
        ele.id = ele.thridInfo && ele.thridInfo.userid;
      });
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
  confirm = (rows) => {
    let str = [];
    rows.map(ele => {
      str.push(ele.customerid);
    });
    const data = {
      state: 4,
      customerIds: str.join(',')
    };
    volunteerListApi.setAdminApply(data).then(res => {
      message.success('已成功撤销！');
      this.getDataList();
      this.setState({
        selectRows: [],
        selectedRowKeys: []
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
  lookDetail = (user,customerId) => {
    if (!user.userid) {
      return;
    }
    const data = {
      uid: user.userid
    };
    volunteerListApi.getVolunteerDetail(data).then(res => {
      this.setState({
        currentDetail: res.data,
        pageType: false,
        customerId
      });
    });
  };

  // 保存成功回调
  onOk = () => {
    this.getDataList();
    this.setState({ pageType: true });
  };
  // 批量撤销
  mulpDelete = () => {
    // console.log(this.state.selectRows);
    const instance = this;
    if (!instance.state.selectRows || instance.state.selectRows.length < 1) {
      message.info('请先选择需要撤销的志愿者!');
      return;
    }
    confirm({
      title: '确认撤销?',
      content: '此操作不可撤回,是否确认撤销所愿志愿者资格?',
      onOk() {
        instance.confirm(instance.state.selectRows);
      }
    });
  };
  // 显示积分弹框
  addPanelShow = (row) => {
    this.setState({ panelShow: true, addRow: row });
  };
  handleCancel = () => {
    this.score = '';
    this.setState({ panelShow: false, addRow: {} });
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
        title: '志愿者账号',
        dataIndex: 'thridInfo.mobile',
        align: 'left',
        width: 120,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '志愿者账号名',
        dataIndex: 'thridInfo.nickname',
        align: 'left',
        width: 130,
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
      },{
        title: '积分',
        dataIndex: 'thridInfo.redites',
        align: 'left',
        width: 80,
        render: (tags, row) => (
          <span>{tags}</span>
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
                this.lookDetail(row && row.thridInfo || {},row.customerid);
              }}>查看</a>

              <a tabIndex="0" onClick={() => this.addPanelShow(row)} role="button" className='tableOperateButton'
                 type="link">添加积分</a>

              {row.isvolunteer === 0 ? '' :
                <Popconfirm placement="right" title={'此操作不可撤回,是否确认撤销所愿志愿者资格?'} okType={'danger'}
                            onConfirm={() => this.confirm([row])}
                            okText="确认撤销" cancelText="取消">
                  <a role="button" className='tableOperateButton' type="link">撤销资格</a>
                </Popconfirm>}
            </div>
          );
        }
      }];

    const tissueColums={
        title: '所属组织',
        dataIndex: 'spiderid',
        align: 'left',
        width: 120,
        render: (tags, row) => {
          let tag = '';
          this.state.spiderData.map((ele) => { 
            if (ele.userId == tags) {
              tag = ele.userName;
            }
          });
          return ( <Tooltip placement="topLeft" title={tag}>
                  <span>{tag}</span>
                </Tooltip>);
        }
      }

      if(this.pageStag!=='H'){
        columns.splice(4,0,tissueColums);
      }

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
                <Button type={'danger'} ghost onClick={this.mulpDelete}>撤销资格</Button>
              </div>
              <div className='searchFatherBox searchLeftPadding'>
                <div className='searchBox '>
                <span className='item-search-part'>
                    服务类型：<Select value={this.state.searchData.serverType} placeholder='全部' style={{ width: 120 }}
                                 onChange={(value) => {
                                   this.listData.pageno = 1;
                                   this.listData.pagesize = 10;
                                   this.searchData.serverType = value;
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
                    服务地区：<Select value={this.state.searchData.serverArea} placeholder='全部' style={{ width: 120 }}
                                onChange={(value) => {
                                  this.listData.pageno = 1;
                                  this.listData.pagesize = 10;
                                  this.searchData.serverArea = value;
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
                {
                  this.pageStag==='B'?<span className='item-search-part'>
                      所属组织：<Select
                      showSearch
                      dropdownMenuStyle={{maxHeight:'200px'}}
                      // showArrow={false}
                      filterOption={(input, option) => {
                        if (option.props.value == '') {
                          return true;
                        } else {
                          return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }
                      }}
                      value={this.state.searchData.stationId} placeholder='全部' style={{ width: 180 }}
                      onChange={(value) => {
                        this.listData.pageno = 1;
                        this.listData.pagesize = 10;
                        this.searchData.stationId = value;
                        this.setState({
                          searchData: this.searchData
                        });
                        this.getDataList();
                      }}>
                      <Option value="">全部</Option>
                      {this.state.spiderData.map((ele, index) => {
                        return (<Option key={index} value={ele.userId}>{ele.userName}</Option>);
                      })}
                    </Select>
                  </span>:""
                }
                  <Search
                    placeholder="请输入志愿者账号名称"
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
                rowKey="id"
                columns={columns}
                rowSelection={rowSelection}
                pagination={this.state.isLoad?false:pagination}
                locale={{ emptyText: this.state.emptyTxt }}
                dataSource={this.state.tableData}
                onRow={(record, index) => ({
                  index,
                  onClick: this.onRowEvent.bind(this, record)
                })}
                scroll={{ x: '100%', y: 'calc(100vh - 291px)' }}
              />
            </div>
          </div>
          {this.state.panelShow ? <Modal
            title="添加积分"
            visible={this.state.panelShow}
            onOk={this.addNum}
            onCancel={this.handleCancel}
          >
            <div className='only-panel-add'>
              <div className='add-body'>为此志愿者账号添加 <InputNumber min={1} ref={(node) => {
                if (node) {
                  node.focus();
                }
              }} onChange={(value) => {
                this.score = value;
              }} style={{ width: '50px' }}/> 积分
              </div>
            </div>
          </Modal> : ''}
        </div>
      </> : <VolunteerDetail
        serverArea={this.state.serverArea}
        serverType={this.state.serverType}
        detailData={this.state.currentDetail}
        customerId={this.state.customerId}
        zzmm={this.state.zzmm || []}
        jyxl={this.state.jxyl || []}
        spiderData={this.state.spiderData || []}
        onOk={this.onOk}
        back={this.pageBack}
        pageStag={this.pageStag}
        />
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
