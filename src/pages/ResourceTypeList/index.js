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
  InputNumber,
  Spin
} from 'antd';
import * as resourceTypeApi from '../../api/resourceType';
// 资源类型状态
import { resourceTypeState } from '../../utils/utils';
import moment from 'moment';
import './index.less';

const { confirm } = Modal;

// 一个简单的table列表demo
class TableList extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      tableData: [],
      totalCount: 0,
      emptyTxt: '加载中...',
      visible:false,
      currentDetail: {},
      modalTitle:'',
      loading:false
    };
    this.listData = {
      pageNo: 1,
      pageSize: 10
    };
    this.searchData = {};
  }

  componentDidMount() {
      this.getDataList();
  }

  // 全选、多选事件
  onSelectChange = (selectedRowKeys, rows) => {
    const useSelectedRowKeys = [];
    const useRows = [];
    rows.map(ele => {
      useRows.push(ele);
      useSelectedRowKeys.push(ele.dictid);
    });
    this.setState({ selectedRowKeys: useSelectedRowKeys, selectRows: useRows });
  };

  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    const selectRows = [];
    selectedRowKeys.push(row.dictid);
    selectRows.push(row);
    this.setState({ selectedRowKeys, selectRows });
  };
// 获取列表
  getDataList = () => {
    const listData = Object.assign(this.searchData, this.listData);
    this.setState({
      emptyTxt:'加载中',
      tableData:[]
    });
    resourceTypeApi.getResourceTypeList(listData).then(res => {
      if (!res || !res.success) return;
      const arrayData = res && res.data.data || [];
      const tableData = Array.isArray(arrayData) ? arrayData : [];
      this.setState({
        tableData: tableData,
        totalCount: res.data && res.data.totalCount || 0
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
    this.listData.pageNo = page;
    this.listData.pageSize = pageSize;
    this.getDataList();
  };

  //确认启用,禁用
  confirm = (row) => {
    const data = {
      enable: row.enable==1?0:1,
      dictIds: row.dictid
    };
    resourceTypeApi.enableResourceType(data).then(res => {
      if (!res || !res.success) return;
      const msg= row.enable==1?'禁用成功':'启用成功';
      message.success(msg);
      this.getDataList();
      // this.setState({
      //   selectRows: [],
      //   selectedRowKeys: []
      // });
    });
  };
  lookDetail = (row) => {
    this.setState({visible:true,modalTitle:'编辑类型',modalType:'edit',typeName:row.dictname,dictId:row.dictid});
  };

  // 保存成功回调
  onOk = () => {
    this.getDataList();
    this.setState({ pageType: true });
  };
  // 批量删除
  mulpDelete = () => {
    console.log(this.state.selectRows);
    const instance = this;
    if (!this.state.selectRows || this.state.selectRows.length < 1) {
      message.info('请选择删除项!');
      return;
    }
    confirm({
      title: '删除确认',
      content: '此操作不可撤回,是否删除所选资源类型标签?',
      onOk() {
        instance.deleteItem(instance.state.selectedRowKeys);
      }
    });
  };
    // 新建类型
  openModal=()=>{
    this.setState({visible:true,modalTitle:'新建类型',modalType:'create'});
  };
  // 关闭弹窗
  closeModal=()=>{
    this.setState({visible:false,modalTitle:'',modalType:'',typeName:''});
  };
  // 弹框确认事件
  handleOk = () => {
    if (!this.state.typeName) {
      message.error('请输入资源类型名称!');
      return;
    }
    this.setState({loading:true});
    if(this.state.modalType=='create'){
      const data = {
        dictName: this.state.typeName,
      };
      resourceTypeApi.addResourceType(data).then(res => {
        if (!res.success) return;
        message.info('创建成功');
        this.closeModal();
        this.getDataList();
      }).finally(_=>{
        this.setState({loading:false});
      });
    }else{
      const data = {
        dictName: this.state.typeName,
        dictId:this.state.dictId
      };
      resourceTypeApi.modifyResourceType(data).then(res => {
        if (!res.success) return;
        message.info('编辑成功');
        this.closeModal();
        this.getDataList();
      }).finally(_=>{
        this.setState({loading:false});
      });
    }

  };
  // 删除标签
  deleteItem=(data)=>{
    const useData={
      dictIds:data.join(',')
    };
    resourceTypeApi.delResourceType(useData).then(res=>{
      if (!res||!res.success) return;
      message.info('删除成功');
      this.closeModal();
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
    const columns = [
      {
        title: '类型名称',
        dataIndex: 'dictname',
        align: 'left',
        width: 180,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '创建时间',
        dataIndex: 'remark',
        align: 'left',
        width: 140,
        render: (tags, row) => {
          const num=parseFloat(tags);
          const time=tags?moment(num).format('YYYY-MM-DD HH:mm:ss'):'';
          return (
            <span>{time}</span>
         );
        }
      }, {
        title: '状态',
        dataIndex: 'enable',
        align: 'left',
        width: 80,
        render: (tags, row) => {
          return (<span>{resourceTypeState[tags]}</span>);
        }
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
                this.lookDetail(row || '');
              }}>编辑</a>
              {/* <Popconfirm placement="right" title={'此操作不可撤回,是否确认通过所选心愿申请?'} okType={'danger'}*/}
              {/*                              onConfirm={() => this.confirm([row], 2)}*/}
              {/*                              okText="确认" cancelText="取消">*/}
              {/*  <a role="button" className='tableOperateButton' type="link">{row.enable==1?'禁用':'启用'}</a>*/}
              {/*</Popconfirm>*/}
              <a role="button" tabIndex={0} className='tableOperateButton'   onClick={() => this.confirm(row)} type="link">{row.enable==1?'禁用':'启用'}</a>
              <Popconfirm placement="right" title={'此操作不可撤回,是否删除所选资源类型标签?'} okType={'danger'}
                                            onConfirm={() => this.deleteItem([row.dictid], 3)}
                                            okText="确认" cancelText="取消">
                <a role="button" className='tableOperateButton' type="link">删除</a>
              </Popconfirm>
            </div>
          );
        }
      }];

    return (<>
      <Breadcrumb className="breadcrumbBox">
        <Breadcrumb.Item>
            <span className={'title-active'}>
              {this.props.navTitle}
            </span>
        </Breadcrumb.Item>
      </Breadcrumb>
        <div className='eachPageBox resourceTypeList-page'>
          <div style={{ height: '100%' }}>
            <div className="navTopBox">
              <div className='btnBox'>
                <Button type={'primary'} onClick={this.openModal}>新建类型</Button>
                <Button type={'danger'} ghost onClick={this.mulpDelete}>删除</Button>
              </div>
            </div>
            <div className='tableCont mainContentBox' style={{ height: 'calc(100% - 61px)' }}>
              <Table
                rowKey="dictid"
                columns={columns}
                rowSelection={rowSelection}
                pagination={pagination}
                dataSource={this.state.tableData}
                locale={{ emptyText: this.state.emptyTxt }}
                onRow={(record, index) => ({
                  index,
                  onClick: this.onRowEvent.bind(this, record)
                })}
                scroll={{ x: '100%', y: 'calc(100vh - 230px)' }}
              />
            </div>
          </div>
           <Modal
             className={'resourceTypeList-modal'}
            title={this.state.modalType=='create'?'新建类型':'编辑类型'}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.closeModal}
            okText={this.state.modalType=='create'?'确认创建':'确认编辑'}
          >
             <Spin tip="保存中..." spinning={this.state.loading}>
             <div className={'content-main'} >
               <div className='form-name' >类型名称</div>
               <div><Input onPressEnter={this.handleOk} className='form-input' maxLength={12} placeholder={'请在此输入资源类型名称'} value={this.state.typeName } onChange={(e)=>{
                 this.setState({
                   typeName:e.target.value
                 })
               }}/></div>
            </div>
             </Spin>
          </Modal>
        </div>
      </>);
  }
}

const mapState = ({ message ,navTitle}) => ({
  listData: message.listData,
  listLoading: message.listLoading,
  navTitle:navTitle.navTitle
});

const mapDispatch = ({ message }) => ({
  getList: message.getList
});

export default connect(mapState, mapDispatch)(TableList);
