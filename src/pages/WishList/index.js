import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Button, Input, message, Modal, Popconfirm, Select, Table, Tooltip,Dropdown,Menu } from 'antd';
import './index.less';
import * as volunteerListApi from '../../api/volunteerList';
import * as wishApi from '../../api/wish';
import VolunteerDetail from './detail';
import { wishState } from '../../utils/utils';
import moment from 'moment';
import star from '../../assets/image/star.png';
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
      serverType:JSON.parse(localStorage.getItem('serverType'))||[],
      serverArea:JSON.parse(localStorage.getItem('serverArea'))||[],
      zzmm: [],
      jxyl: [],
      searchData: {},
      visibleArray: {},
      deleteVisible: false,
      isLoad:false
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
      useSelectedRowKeys.push(ele.wishid);
      // if (ele.state == 1) {
      //   useRows.push(ele);
      //   useSelectedRowKeys.push(ele.wishid);
      // }else{
      //   status=true
      // }
    });
    // if(status){
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
    //   return;}
    selectedRowKeys.push(row.wishid);
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
    wishApi.getWishList(listData).then(res => {
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
  // 分页
  onShowSizeChange = (page, pageSize) => {
    this.listData.pageno = page;
    this.listData.pagesize = pageSize;
    this.getDataList();
  };
  // 返回按钮
  pageBack = (status) => {
    if (status == true) {
      this.getDataList();
    }
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
      str.push(ele.wishid);
    });
    const data = {
      state: state,
      ids: str.join(',')
    };
    wishApi.setWishAudit(data).then(res => {
      if (!res || !res.success) return;
      message.success('审核成功！');
      this.getDataList();
      this.setState({
        selectRows: [],
        selectedRowKeys: []
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
    wishApi.getWishDetail(data).then(res => {
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
      message.info('请选择需要审核的心愿!');
      return;
    }
    let status = false;
    this.state.selectRows.map(ele => {
      if (ele.state != 1) {
        status = true;
      }
    });
    if (status) {
      message.error('所选项包含已审核内容,请重试!');
      return;
    }
    confirm({
      title: '确认不通过',
      content: '此操作不可撤回,是否确认驳回所选心愿申请?',
      onOk() {
        instance.confirm(instance.state.selectRows, 3);
      }
    });
  };
  // 批量通过
  mulpAccept = () => {
    console.log(this.state.selectRows);
    const instance = this;
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择需要审核的心愿!');
      return;
    }
    let status = false;
    this.state.selectRows.map(ele => {
      if (ele.state != 1) {
        status = true;
      }
    });
    if (status) {
      message.error('所选项包含已审核内容,请重试!');
      return;
    }
    confirm({
      title: '确认通过',
      content: '此操作不可撤回,是否确认通过所选心愿申请?',
      onOk() {
        instance.confirm(instance.state.selectRows, 2);
      }
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
      wishId: rows.join(',')
    };
    wishApi.isConvertTask(data).then(res => {
      if (res.data === 0) {
        confirm({
          title: '删除确认',
          content: '此操作不可撤回,是否确认删除所选心愿申请?',
          onOk() {
            instance.deleteItems(rows);
          }
        });
      } else {
        this.setState({ deleteVisible: true, currentDeleteWish: rows, currentDeleteData: row });
      }
    });
  };
  // 仅删除心愿
  deleteWishOnly = (rows) => {
    const data = {
      wishId: rows.join(',')
    };
    wishApi.onlyDelWish(data).then(res => {
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
      wishId: rows.join(',')
    };

    wishApi.delWish(data).then(res => {
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
        title: '标题',
        dataIndex: 'title',
        align: 'left',
        width: 80,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '服务地区',
        dataIndex: 'areaid',
        align: 'left',
        width: 70,
        render: (tags, row) => {
          let tag = '';
          this.state.serverArea.map((ele) => {
            if (ele.dictionaryId == tags) {
              tag = ele.dictionaryValue;
            }
          });
          return (<Tooltip placement="topLeft" title={tag}>
            <span>{tag}</span>
          </Tooltip>);
        }
      }, {
        title: '服务类型',
        dataIndex: 'wishtype',
        align: 'left',
        width: 70,
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
        title: '服务时间',
        dataIndex: 'starttime',
        align: 'left',
        width: 120,
        render: (tags, row) => {
          const date = tags && moment(tags).format('YYYY-MM-DD HH:mm:ss');
          return (
            <Tooltip placement="topLeft" title={tags}>
            <span>{date}</span>
            </Tooltip>
          );
        }
      }, {
        title: '申请人',
        dataIndex: 'customername',
        align: 'left',
        width: 60,
        render: (tags, row) => (
          <Tooltip placement="topLeft" title={tags}>
            <span>{tags}</span>
          </Tooltip>
        )
      }, {
        title: '联系人',
        dataIndex: 'contracter',
        align: 'left',
        width: 80,
        render: (tags, row) => (
          <Tooltip placement="topLeft" title={tags}>
            <span>{tags}</span>
          </Tooltip>
        )
      }
      , {
        title: '联系电话',
        dataIndex: 'phone',
        align: 'left',
        width: 120,
        render: (tags, row) => (
          <Tooltip placement="topLeft" title={tags}>
          <span>{tags}</span>
          </Tooltip>
        )
      }, {
        title: '处理状态',
        dataIndex: 'state',
        align: 'left',
        width: 70,
        render: (tags, row) => (
          <span>{wishState[tags]}</span>
        )
      }, {
        title: '评分',
        dataIndex: 'starlevel',
        align: 'left',
        width: 90,
        render: (tags, row) => {
          return (
            <span>{new Array(tags || 0).fill('').map((ele, index) => (<img key={index} src={star} alt=""/>))}</span>);
        }
      }, {
        title: '操作',
        align: 'left',
        width: 120,
        render: (tags, row) => {
            let moreMenu=<></>;
            if(row.state==1){
              moreMenu = <Menu>
                    <Menu.Item key='0'> 
                        <Popconfirm placement="right" title={'此操作不可撤回,是否确认通过所选心愿申请?'} okType={'danger'}
                                                    onConfirm={() => this.confirm([row], 2)}
                                                    okText="确认" cancelText="取消">
                        <a role="button" className='tableOperateButton' type="link">通过</a>
                      </Popconfirm> 
                  </Menu.Item>
                    <Menu.Item key='1'>
                      <Popconfirm placement="right" title={'此操作不可撤回,是否确认驳回所选心愿申请?'} okType={'danger'}
                                                    onConfirm={() => this.confirm([row], 3)}
                                                    okText="确认" cancelText="取消">
                        <a role="button" className='tableOperateButton' type="link">不通过</a>
                      </Popconfirm> 
                  </Menu.Item>
              </Menu>
            }
              
            
           
          return (
            <div role="button" tabIndex="-1" style={{ whiteSpace: 'nowrap' }} onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
            }}>
              <a role="button" tabIndex="0" className='tableOperateButton' onClick={(e) => {
                this.lookDetail(row && row.wishid || '');
              }}>查看</a>
               <a role="button" onClick={() => this.handleVisibleChange([row && row.wishid || ''], row)}
                 className='tableOperateButton' type="link" style={{marginRight:10}}>删除</a>
                 {
                   row.state==1?<Dropdown overlay={moreMenu}>
                        <a className="ant-dropdown-link" role="button">更多</a>
                    </Dropdown>:""
                 }
                
              {/*<Popconfirm placement="right" title={'此操作不可撤回,是否确认删除所选心愿申请?'} okType={'danger'}*/}
              {/*            visible={this.state.visibleArray[row.wishid]}*/}
              {/*            onVisibleChange={() => this.handleVisibleChange([row && row.wishid || ''], row)}*/}
              {/*            onConfirm={() => this.deleteItems([row && row.wishid || ''])}*/}
              {/*            okText="确认" cancelText="取消">*/}
             
              {/*</Popconfirm>*/}
            </div>
          );
        }
      }];

    return (
      this.state.pageType ? <>
        <Breadcrumb className="breadcrumbBox">
              <span className={'title-active'}>
              {this.props.navTitle}
            </span>
          {/*<Breadcrumb.Item>*/}
          {/*  <Link to={'/WishList'} className='active'>*/}
          {/*   心愿列表*/}
          {/*  </Link>*/}
          {/*</Breadcrumb.Item>*/}
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
                    服务类型：<Select placeholder='全部' value={this.state.searchData.wishType} style={{ width: 120 }}
                                 onChange={(value) => {
                                   this.listData.pageno = 1;
                                   this.listData.pagesize = 10;
                                   this.searchData.wishType = value;
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
                处理状态：<Select value={this.state.searchData.state} placeholder='全部' style={{ width: 120 }}
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
                    {Object.keys(wishState).map(res => (
                      <Option key={res} value={res}>{wishState[res]}</Option>
                    ))}

              </Select>
              </span>
                  <Search
                    placeholder="请输入心愿标题/申请人账号名"
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
                    style={{ width: 280 }}
                  />
                </div>
              </div>

            </div>
            <div className='tableCont mainContentBox' style={{ height: 'calc(100% - 121px)' }}>
              <Table
                rowKey="wishid"
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
            </div>
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
                <div className="ant-modal-confirm-content">该心愿已生成对应的任务、活动，是否全部删除?</div>
              </div>
              <div className="ant-modal-confirm-btns">
                <button type="button" onClick={this.cancelDelete} className="ant-btn"><span>取 消</span></button>
                <button type="button" onClick={() => this.deleteWishOnly(this.state.currentDeleteWish)}
                        className="ant-btn ant-btn-primary"><span>删除心愿</span></button>
                <button onClick={() => this.deleteItems(this.state.currentDeleteWish)} type="button"
                        className="ant-btn ant-btn-primary"><span>全部删除</span></button>
              </div>
            </div>
          </Modal>
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

const mapState = ({ message, navTitle }) => ({
  listData: message.listData,
  listLoading: message.listLoading,
  navTitle: navTitle.navTitle
});

const mapDispatch = ({ message }) => ({
  getList: message.getList
});

export default connect(mapState, mapDispatch)(TableList);
