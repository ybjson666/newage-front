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
import * as activityApi from '../../api/ActivityPractice.js';
import VolunteerDetail from './detail';
import { praActivityState,Base64 } from '../../utils/utils';
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
      showRecord:false,
      isLoad:false
    };
    this.listData = {
      pageno: 1,
      pagesize: 10
    };
    this.searchData = {};
    this.callBackParams={};
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
    rows.map(ele => {
      useRows.push(ele);
      useSelectedRowKeys.push(ele.activitypracticeid);
    });
    this.setState({ selectedRowKeys: useSelectedRowKeys, selectRows: useRows });
  };

  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    const selectRows = [];
    selectedRowKeys.push(row.activitypracticeid);
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
    activityApi.getActivityList(listData).then(res => {
      const arrayData = (res && res.data.data) || [];
      const tableData = Array.isArray(arrayData) ? arrayData : [];
      tableData.map(item=>{
        return item.isShow=false;
      })
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
  //获取文本编辑框参数
  fetchParams=()=>{
    activityApi.getParams({}).then(res => {
      if(res.state==200){
        this.callBackParams.cb=res.data.cb;
        this.callBackParams.sj=res.data.sj;
        this.callBackParams.zm=res.data.zm;
      }
    })
  }
  //发布总结
  pubSummary=(row)=>{
    let params={
      "taskId":row.activityrecruitid,
      "callbackFlag":"Y",
      "callbackUrl":this.callBackParams.cb+'?type=2',
      "editor_callback_url":this.callBackParams.sj,
      "editor_type":"2",
      "editor_tite":row.activityname,
      "editor_id":row.activityrecruitid
    }
    let base=new Base64();
    let result=base.encode(JSON.stringify(params));
    // let url=`https://editorweb.wjtest.chinamcloud.cn/?queryParam=${result}&version=cms2&catalogId=7119&type=1#/`
    let url=`https://editorweb.wjtest.chinamcloud.cn/?queryParam=${result}&version=cms2&type=1#/`
    window.open(url)
  }
  //更多点击切换
  changeShow=(row)=>{
    let { tableData }=this.state;
    row.isShow=!row.isShow;
    tableData.map(item=>{
      if(item.activityrecruitid===row.activityrecruitid){
        item=row;
      }
    })
    this.setState({tableData})
  }
  //关闭总结记录弹窗
  closeRecordModal=()=>{
    this.setState({
      showRecord:false
    })
  }
  openRecordModal=()=>{
    this.setState({
      showRecord:true
    })
  }
  // 分页
  onShowSizeChange = (page, pageSize) => {
    this.listData.pageno = page;
    this.listData.pagesize = pageSize;
    this.getDataList();
  };
  // 返回按钮
  pageBack = (status) => {
    if(status){
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
      if(!res||!res.success)return;
      const useData = res && Array.isArray(res.data) ? res.data : [];
      localStorage.setItem('serverArea',JSON.stringify(useData))
      this.setState({
        serverArea: useData
      });
    });
  };
  //确认删除
  confirm = (rows) => {
    let str = [];
    rows.map(ele => {
      str.push(ele.activitypracticeid);
    });
    const data = {
      ids: str.join(',')
    };
    activityApi.activityDel(data).then(res => {
      if (res.state == 200) {
        message.success('删除成功！');
        if(rows.length==this.state.tableData.length){
          this.listData.pageno=1;
        }
        this.getDataList();
        this.setState({
          selectRows: [],
          selectedRowKeys: []
        });
      }
    });
  };
  //查看详情
  lookDetail = (row) => {
    if (!row.activitypracticeid) {
      return;
    }
    const data = {
      id: row.activitypracticeid
    };
    activityApi.activityDetail(data).then(res => {
      if (res.success) {
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
      message.info('请选择需要删除的活动!');
      return;
    }
    const instance = this;
    confirm({
      title: '删除确认',
      content: '此操作不可撤回,是否确认删除所选活动?',
      onOk() {
        instance.confirm(instance.state.selectRows);
      }
    });
  };
  // 新建活动
  createActivity = () => {
    this.setState({ pageType: 'create' });
  };
  // 启用/禁用
  enableChange=(rowIds,enable)=>{
    const data = {
      enable: enable==1?0:1,
      ids: rowIds.join(',')
    };
    activityApi.activityEnable(data).then(res => {
      if (!res || !res.success) return;
      const msg= enable==1?'禁用成功':'启用成功';
      message.success(msg);
      this.getDataList();
      this.setState({
        selectRows: [],
        selectedRowKeys: []
      });
    });
  }
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
        width: 100,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )

      }, {
        title: '活动地区',
        dataIndex: 'areaid',
        align: 'left',
        width: 100,
        render: (tags, row) => {
          let tag = '';
          // console.log(tags);
          if (this.state.serverArea.length > 0) {
            this.state.serverArea.map((ele) => {
              if (ele.dictionaryId == tags) {
                tag = ele.dictionaryValue;
              }
            });
          }
          return (<span>{tag}</span>);
        }
      }, {
        title: '参与人数',
        dataIndex: 'hascount',
        align: 'left',
        width: 60,
        render: (tags, row) => {
          return (<span>{tags} 人</span>);
        }
      },
      {
        title: '举办组织',
        dataIndex: 'stationName',
        align: 'left',
        width: 100,
        render:(tags,row)=>{
            let orgiName="";
            if(row.userid=='1'){
              orgiName='实践中心'
            }else{
              orgiName=row.userid;
            }
            return <Tooltip placement="topLeft" title={orgiName}>
              <span>{orgiName}</span>
            </Tooltip>  
        }
      }, 
      {
        title: '活动开始时间',
        dataIndex: 'activitystarttime',
        align: 'left',
        width: 150,
        render: (tags, row) => {
          const date = tags && moment(tags).format('YYYY-MM-DD HH:mm:ss');
          return (
            <span>{date}</span>
          );
        }
      }, {
        title: '活动结束时间',
        dataIndex: 'activityendtime',
        align: 'left',
        width: 150,
        render: (tags, row) => {
          const date = tags && moment(tags).format('YYYY-MM-DD HH:mm:ss');
          return (
            <span>{date}</span>
         );
        }
      }, {
        title: '活动状态',
        dataIndex: 'state',
        align: 'left',
        width: 80,
        render: (tags, row) => (
          <span>{praActivityState[tags]}</span>
        )
      }
      , {
        title: '操作',
        align: 'left',
        width: 120,
        render: (tags, row) => {
          return (
            <div role="button" className="operate-wraps" tabIndex="-1" style={{ whiteSpace: 'nowrap' }} onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
            }}>
              <a role="button" tabIndex="0" className='tableOperateButton' onClick={(e) => {
                this.lookDetail(row || {});
              }}>查看</a>
             
                <a role="button" tabIndex="0" className='tableOperateButton' onClick={(e) => {
                    this.enableChange([row.activitypracticeid],row.enable);
                  }}>{row.enable==0?'启用':'禁用'}</a>
              
                <Popconfirm placement="right" title={'此操作不可撤回,是否确认删除所选活动?'} okType={'danger'}
                            onConfirm={() => this.confirm([row], 1)}
                            okText="确认" cancelText="取消">
                  <a role="button" className='tableOperateButton' type="link">删除</a>
                </Popconfirm>
            </div>
          );
        }
      }
    ];

    const recordColums=[
      {
        title: '文稿标题',
        dataIndex: 'title',
        align: 'left',
      },
      {
        title: '创建日期',
        dataIndex: 'creatTime',
        align: 'left',
      },
      {
        title: '发布渠道',
        dataIndex: 'channel',
        align: 'left',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        align: 'left',
        render:()=>{
          return(
            <div className="btn-groups">
              <a role="button" className="prev-btn">预览</a>
              <a role="button" className="edit-btn">编辑</a>
            </div>
          )
        }
      }
    ]

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
                <Button type={'primary'} onClick={this.createActivity}>新建活动</Button>
                <Button type={'danger'} ghost onClick={this.mulpDelete}>删除</Button>
              </div>
              <div className='searchFatherBox searchLeftPadding'>
                <div className='searchBox '>
                  <span className='item-search-part'>
                活动状态：<Select value={this.state.searchData.state} placeholder='全部' style={{ width: 120 }}
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
                    {Object.keys(praActivityState).map((ele,index)=>{
                     return <Option key={index} value={ele}>{praActivityState[ele]}</Option>
                    })}
              </Select>
                  </span>
                  <Search
                    placeholder="请输入活动名"
                    enterButton="搜索"
                    value={this.state.searchData.activityname}
                    onChange={(e) => {
                      this.searchData.activityname = e.target.value;
                      this.setState({
                        searchData: this.searchData
                      });
                    }}
                    onSearch={value => {
                      this.searchData.activityname = value;
                      this.getDataList();
                    }}
                    style={{ width: 240 }}
                  />
                </div>
              </div>

            </div>
            <div className='tableCont mainContentBox' style={{ height: 'calc(100% - 121px)'}}>
              <Table
                rowKey="activitypracticeid"
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
          <Modal
            title="总结记录"
            visible={this.state.showRecord}
            onCancel={this.closeRecordModal}
            footer={null}
            width={800}
          >
            <div className="records-wraps">
              <Table
                 columns={recordColums}
              >

              </Table>
            </div>
          </Modal>
        </div>
      </> : <VolunteerDetail
        type={this.state.pageType}
        serverArea={this.state.serverArea}
        serverType={this.state.serverType}
        detailData={this.state.currentDetail}
        // zzmm={this.state.zzmm || []}
        // jyxl={this.state.jxyl || []}
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
