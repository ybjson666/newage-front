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
  Form,
  Row,
  Col,
  Spin
} from 'antd';
import './index.less';
import * as volunteerListApi from '../../api/volunteerList';
import * as integralListApi from '../../api/IntegralList';
import { activityPraCheckState as activityCheckState } from '../../utils/utils';
import moment from 'moment';
import * as activityApi from '../../api/ActivityPractice';
import * as resourceApi from '../../api/resourceList';
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
      currentDetail: {},
      pageType: true,
      serverType: [],
      serverArea: [],
      jfgz: JSON.parse(localStorage.getItem('jfgz'))||[],
      searchData: {},
      visible: false,
      loading: false
    };
    this.listData = {
      pageNo: 1,
      pageSize: 10
    };
    this.searchData = {};
  }

  componentDidMount() {
    // 在DidMount里去请求数据
    const loginTid = getCookie().login_chinamcloud_tid;
    const login_tid=localStorage.getItem('login_tid');
    if(loginTid!==login_tid){
      localStorage.setItem('login_tid',loginTid)
      this.getDict();
    }else{
      if(!localStorage.getItem('jfgz')){
         this.getDict();
      }
    }
   
    // this.getSearviceType();
    // this.getSearviceArea();
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
      useSelectedRowKeys.push(ele.activityenterid);
    });
    this.setState({ selectedRowKeys: useSelectedRowKeys, selectRows: useRows });
  };

  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    const selectRows = [];
    selectedRowKeys.push(row.activityenterid);
    selectRows.push(row);
    this.setState({ selectedRowKeys, selectRows });
  };
// 获取列表
  getDataList = () => {
    const listData = Object.assign(this.searchData, this.listData);
    this.setState({
      emptyTxt: '加载中',
      tableData: []
    });
    integralListApi.getScoreRuleList(listData).then(res => {
      if (!res.success) return;
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
      this.setState({
        serverType: useData
      });
    });
  };
  // 获取服务地区
  getSearviceArea = () => {
    volunteerListApi.getServerarea().then((res) => {

      const useData = res && Array.isArray(res.data) ? res.data : [];
      this.setState({
        serverArea: useData
      });
    });
  };
  //确认撤销
  deleteItem = (rows) => {
    let str = [];
    rows.map(ele => {
      str.push(ele.scoreruleid);
    });
    const data = {
      ruleIds: str.join(',')
    };
    integralListApi.ruleListDelete(data).then(res => {
      if (!res.success) return;
      message.info(res.message);
      this.getDataList();
      this.setState({
        selectRows: [],
        selectedRowKeys: []
      });
    });
  };
  // 查看详情
  lookDetail = (activityId) => {
    if (!activityId) {
      return;
    }
    const data = {
      ruleId: activityId
    };
    integralListApi.ruleListShow(data).then(res => {
      if (!res.success) return;
      this.setState({
        currentDetail: res.data,
        visible: true,
        pageType: 'edit'
      });
    });
  };

  // 保存成功回调
  onOk = () => {
    this.getDataList();
    this.setState({ pageType: true });
  };
  // 创建积分弹框
  createRule = () => {
    this.setState({ visible: true });

  };
  // 积分规则字典
  getDict = () => {
    volunteerListApi.getDictAll().then(res => {
      if (!res || !res.success) return;
      const allData = res && Array.isArray(res.data) ? res.data : [];
      const jfgz = [];
      allData.map(ele => {
        if (ele.DictType === 'SCORERULE') {
          jfgz.push(ele);
        }
      });
      localStorage.setItem('jfgz',JSON.stringify(jfgz))
      this.setState({
        jfgz
      });
    });
  };
  // 创建积分规则
  handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.pageType === 'edit') {
          // 活动id
          values.RuleID = this.state.currentDetail.scoreruleid;
          this.onUpdate(values);
        } else {
          this.onSubmit(values);
        }
      }
    });
  };
  // 关闭弹窗
  handleCancel = () => {
    if(this.state.loading){return};
    this.setState({ visible: false,pageType:'',currentDetail:{} });
    this.props.form.resetFields();
  };
  // 创建积分接口
  onSubmit = (values) => {
    this.setState({ loading: true });
    integralListApi.addRuleList(values).then(res => {
      if (!res.success) return;
      message.success('保存成功');
      this.getDataList();
      setTimeout(()=>{
        this.handleCancel();
      },0);
    })
      .catch(err => {
        message.error('保存失败');
      }).finally(err => {
      this.setState({ loading: false });
    });
  };
  // 修改积分接口
  onUpdate = (values) => {
    this.setState({ loading: true });
    integralListApi.ruleListModify(values).then(res => {
      if (!res.success) return;
      message.success('保存成功');
      this.getDataList();
      setTimeout(()=>{
        this.handleCancel();
      },0);
    })
      .catch(err => {
        message.error('保存失败');
      }).finally(err => {
      this.setState({ loading: false });
    });
  };
  //确认启用,禁用
  confirm = (rowIds, enable) => {
    const data = {
      enable: enable == 1 ? 0 : 1,
      ruleIds: rowIds.join(',')
    };
    integralListApi.ruleListEnable(data).then(res => {
      if (!res || !res.success) return;
      const msg = enable == 1 ? '禁用成功' : '启用成功';
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 18 }
      }
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
        title: '积分规则名称',
        dataIndex: 'rulename',
        align: 'left',
        width: 180,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '达成条件',
        dataIndex: 'ruleconditionid',
        align: 'left',
        width: 90,
        render: (tags, row) => {
          let tag = '';
          this.state.jfgz.map((ele) => {
            if (ele.DictID == tags) {
              tag = ele.DictName;
            }
          });
          return (<span>{tag}</span>);
        }
      }, {
        title: '对应积分数',
        dataIndex: 'scorevalue',
        align: 'left',
        width: 80,
        render: (tags, row) => {
          return (<span>{tags}</span>);
        }
      },
      // {
      //   title: '使用范围',
      //   dataIndex: 'customername',
      //   align: 'left',
      //   width: 90,
      //   render: (tags, row) => (
      //     <Tooltip placement="topLeft" title={tags}>
      //       <span>{tags}</span>
      //     </Tooltip>
      //   )
      // },
      // {
      //   title: '创建人',
      //   dataIndex: 'subuser',
      //   align: 'left',
      //   width: 90,
      //   render: (tags, row) => {
      //
      //     return (<span>{tags}</span>);
      //   }
      // },

      {
        title: '创建时间',
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
        title: '状态',
        dataIndex: 'enable',
        align: 'left',
        width: 80,
        render: (tags, row) => (
          <span>{tags == 1 ? '启用' : '禁用'}</span>
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
                this.lookDetail(row && row.scoreruleid || '');
              }}>查看</a>
              <a role="button" tabIndex="0" onClick={() => this.confirm([row.scoreruleid], row.enable)}
                 className='tableOperateButton' type="link">{row.enable == 1 ? '禁用' : '启用'}</a>
              <Popconfirm placement="right" title={'此操作不可撤回,是否确认删除所选积分规则?'} okType={'danger'}
                          onConfirm={() => this.deleteItem([row])}
                          okText="确认" cancelText="取消">
                <a role="button" className='tableOperateButton' type="link">删除</a>
              </Popconfirm>
            </div>
          );
        }
      }];
    const { getFieldDecorator } = this.props.form;
    return (
      <>
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
                <Button type={'primary'} onClick={this.createRule}>新建积分规则</Button>
              </div>
            </div>
            <div className='tableCont mainContentBox' style={{ height: 'calc(100% - 121px)' }}>
              <Table
                rowKey="scoreruleid"
                columns={columns}
                rowSelection={rowSelection}
                pagination={pagination}
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
            title={this.state.pageType=='edit'?'查看积分规则':"新建积分规则"}
            visible={this.state.visible}
            className='rule-modal'
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            okText={'保存'}
            confirmLoading={this.state.loading}
            maskClosable={false}
          >
            <Spin tip="保存中..." spinning={this.state.loading}>
              <Form className='form-part' {...formItemLayout} onSubmit={this.handleSubmit}>
                <div className='detail-panel-part-activity'>
                  <Row>
                    <Form.Item label="积分规则名称"  {...tailFormItemLayout}>
                      {getFieldDecorator('RuleName', {
                        initialValue: this.state.currentDetail.rulename,
                        rules: [
                          {
                            required: true,
                            message: '请输入积分规则名称'
                          }
                        ]
                      })(<Input maxLength={20} style={{ width: '200px' }} placeholder='请输入积分规则名称'/>)}
                    </Form.Item>
                  </Row>
                  <Row>
                    <Form.Item label="达成条件"  {...tailFormItemLayout}>
                      {getFieldDecorator('RuleConditionID', {
                        initialValue: this.state.currentDetail.ruleconditionid?this.state.currentDetail.ruleconditionid+'':undefined,
                        rules: [
                          {
                            required: true,
                            message: '请选择达成条件'
                          }
                        ]
                      })(<Select disabled={this.cancleEdit} style={{ width: '200px' }} placeholder='请选择达成条件'>
                        {this.state.jfgz.map((ele, index) => {
                          return (<Select.Option key={index}
                                                 value={ele.DictID + ''}>{ele.DictName}</Select.Option>);
                        })}
                      </Select>)}
                    </Form.Item>
                  </Row>
                  <Row>
                    <Form.Item label="奖励积分数"  {...tailFormItemLayout}>
                      {getFieldDecorator('ScoreValue', {
                        initialValue: this.state.currentDetail.scorevalue,
                        rules: [
                          {
                            required: true,
                            message: '请输入奖励积分数'
                          },
                          {
                            pattern: /^[1-9]\d*$/,
                            message: '请填写正整数'
                          }
                        ]
                      })(<InputNumber min={0} maxLength={3}/>)} <span className='text-margin'> 积分</span>
                    </Form.Item>
                  </Row>
                  {this.state.pageType === 'edit' ? <Row>
                    {/*<Col span={12}>创建人 : {this.state.currentDetail.subuser}</Col>*/}
                    <Col span={12}>创建时间 : {this.state.currentDetail.subdate}</Col>
                  </Row> : ''}

                  {/*<Row>*/}
                  {/*  <Form.Item label="使用范围"  {...tailFormItemLayout}>*/}
                  {/*    {getFieldDecorator('activitytype', {*/}
                  {/*      rules: []*/}
                  {/*    })(<Select disabled={this.cancleEdit} style={{ width: '200px' }} placeholder='请选择使用范围'>*/}
                  {/*      {[].map((ele, index) => {*/}
                  {/*        return (<Select.Option key={index}*/}
                  {/*                               value={ele.dictionaryId + ''}>{ele.dictionaryValue}</Select.Option>);*/}
                  {/*      })}*/}
                  {/*    </Select>)}*/}
                  {/*  </Form.Item>*/}
                  {/*</Row>*/}
                </div>
              </Form>
            </Spin>
          </Modal>
        </div>
      </>
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

const WrappedRegistrationForm = Form.create({ name: 'detailForm' })(TableList);
export default connect(mapState, mapDispatch)(WrappedRegistrationForm);
