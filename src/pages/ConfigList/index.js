import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Breadcrumb,
  Input,
  Modal,
  message,
  Form,
  Row,
  Spin,
  Switch,
  InputNumber
} from 'antd';
import './index.less';
import * as ConfigList from '../../api/configList';



// 一个简单的table列表demo
class TableList extends Component {
  constructor() {
    super();
    this.state = {
      emptyTxt: '加载中...',
      currentDetail: {},
      pageType: true,
      visible: false,
      loading: false,
      isOpen:"",
      isOpenWish:""
    };
  }

  componentDidMount() {
    // 在DidMount里去请求数据
    setTimeout(() => {
      this.getDataList();
    });
  }

// 获取列表
  getDataList = () => {
    this.setState({
      emptyTxt: '加载中',
      tableData: []
    });
    ConfigList.getConfigList({}).then(res => {
      if (!res.success) return;
      const arrayData = res && res.data || [];
      let isOpen="";
      let isOpenWish=""
      const tableData = Array.isArray(arrayData) ? arrayData : [];
      tableData.map((ele, index) => {
        ele.index = index + 1;
      });
      tableData.forEach((item)=>{
        if(item.syskey==="WishGroup"){
            isOpen=item.sysvalue
        }else if(item.syskey==='WishAutoCheck'){
            isOpenWish=item.sysvalue
        }
      })
      this.setState({
        tableData: tableData,
        isOpen,
        isOpenWish,
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

  // 修改配置值
  lookDetail = (id, row) => {

    if (!id) {
      return;
    }
    if(row.syskey==="TaskExpressTime"){
      this.setState({
        currentDetail: row,
        visible: true,
        pageType: 'editTask',
        editValue: row.sysvalue
      });
    }else{
      this.setState({
        currentDetail: row,
        visible: true,
        pageType: 'edit',
        editValue: row.sysvalue
      });
    }

  };

  // 打开弹框
  createRule = (type) => {
    let title="";
    switch(type){
        case 'public':
        title="初始化公众号";
        break;
        case 'mini':
        title="初始化小程序";
        break;
        case 'task':
        title="设置任务超时时间";
        break;
    }
    this.setState({ visible: true, addType: type, title, pageType: 'add' });
  };
  // 创建配置
  handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.pageType === 'edit') {
          // 活动id
          values.id = this.state.currentDetail.sysconfigid;
          this.onUpdate(values);
        } else {
          this.onSubmit(values);
        }
      }
    });
  };
  // 关闭弹窗
  handleCancel = () => {
    if (this.state.loading) {
      return;
    }
    this.setState({ visible: false, addType:'',pageType: '', currentDetail: {}, editValue: '' });
    this.props.form.resetFields();
  };
  // 创建积分接口
  onSubmit = (values) => {
    this.setState({ loading: true });
    ConfigList.configAdd(values).then(res => {
      if (!res.success) return;
      message.success('保存成功');
      this.getDataList();
      setTimeout(() => {
        this.handleCancel();
      }, 0);
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
    ConfigList.configUpdate(values).then(res => {
      if (!res.success) return;
      message.success('保存成功');
      this.getDataList();
      setTimeout(() => {
        this.handleCancel();
      }, 0);
    })
      .catch(err => {
        message.error('保存失败');
      }).finally(err => {
      this.setState({ loading: false });
    });
  };
  //开关切换
  switchControl=(checked,e)=>{
    this.setState({
      isOpen:checked?'1':'0'
    },()=>{
      ConfigList.configAdd({wishGroup:checked?'1':'0'}).then(res => {
        if(res.state==200){
          message.success('修改成功');
          this.getDataList();
        }
      })
    })

  }
  //开关切换
  switchWishControl=(checked,e)=>{
    this.setState({
      isOpenWish:checked?'1':'0'
    },()=>{
      ConfigList.configAdd({wishCheck:checked?'1':'0'}).then(res => {
        if(res.state==200){
          message.success('修改成功');
          this.getDataList();
        }
      })
    })
  }

  render() {
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
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        align: 'left',
        width: 60,
        render: (text, row) => (
          (<span>{text}</span>)
        )
      },
      {
        title: '配置代码',
        dataIndex: 'syskey',
        align: 'left',
        render: (text, row) => (
          (<span>{text}</span>)
        )
      }, {
        title: '配置值',
        dataIndex: 'sysvalue',
        align: 'left',
        render: (text, row) => (
          (<span>{text}</span>)
        )
      }, {
        title: '配置描述',
        dataIndex: 'name',
        align: 'left',
        render: (tags, row) => {
          return (<span>{tags}</span>);
        }
      },
      {
        title: '操作',
        align: 'left',
        width: 60,
        render: (tags, row) => {
          return (
            <div role="button" tabIndex="-1" style={{ whiteSpace: 'nowrap' }} onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
            }}>
              <a role="button" tabIndex="0" className='tableOperateButton' onClick={(e) => {
                this.lookDetail(row && row.sysconfigid || '', row);
              }}>修改</a>
            </div>
          );
        }
      }];

    const { getFieldDecorator } = this.props.form;

    const limitDecimals=(value)=>{
      return value.replace(/^(0+)|[^\d]+/g,'');
    }
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
                <Button type={'primary'} onClick={() => this.createRule('public')}>初始化公众号</Button>
                <Button type={'primary'} onClick={() => this.createRule('mini')}>初始化小程序</Button>
                <Button type={'primary'} onClick={() => this.createRule('task')}>设置任务超时时间</Button>
                <div className="switch-btn-wraps" style={{marginRight:20}}>
                  <span style={{marginRight:10}}>是否发布心愿到站所</span>
                  <Switch checkedChildren="是" unCheckedChildren="否"  checked={this.state.isOpen=='1'?true:false} onClick={(checked,e)=>{this.switchControl(checked,e)}} />
                </div>
                {/*<div className="switch-btn-wraps">*/}
                {/*  <span style={{marginRight:10}}>心愿是否人工审核</span>*/}
                {/*  <Switch checkedChildren="是" unCheckedChildren="否"  checked={this.state.isOpenWish=='1'?true:false} onClick={(checked,e)=>{this.switchWishControl(checked,e)}} />*/}
                {/*</div>*/}
              </div>
            </div>
            <div className='tableCont mainContentBox' style={{ height: 'calc(100% - 121px)' }}>
              <Table
                rowKey="sysconfigid"
                columns={columns}
                pagination={false}
                dataSource={this.state.tableData}
                locale={{ emptyText: this.state.emptyTxt }}
                scroll={{ x: '100%', y: 'calc(100vh - 291px)' }}
              />
            </div>
          </div>
          <Modal
            title={((this.state.pageType === 'edit')||(this.state.pageType === 'editTask')) ? '修改配置值' : this.state.title}
            visible={this.state.visible}
            className='rule-modal'
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            okText={'确 认'}
            confirmLoading={this.state.loading}
            maskClosable={false}
          >
            <Spin tip="保存中..." spinning={this.state.loading}>
              <Form className='form-part' {...formItemLayout} onSubmit={this.handleSubmit}>
                <div className='detail-panel-part-activity'>
                  {this.state.addType === 'public' && this.state.pageType === 'add' ? <div>
                    <Row>
                      <Form.Item label="APP_ID"  {...tailFormItemLayout}>
                        {getFieldDecorator('subAppId', {
                          initialValue: this.state.currentDetail.subAppId,
                          rules: [
                            {
                              required: true,
                              message: '请输入公众号APP_ID'
                            }
                          ]
                        })(<Input style={{ width: '300px' }} placeholder='请输入公众号APP_ID'/>)}
                      </Form.Item>
                    </Row>
                    <Row>
                      <Form.Item label="SecurityKey"  {...tailFormItemLayout}>
                        {getFieldDecorator('subAppSec', {
                          initialValue: this.state.currentDetail.subAppSec,
                          rules: [
                            {
                              required: true,
                              message: '请输入公众号SecurityKey'
                            }
                          ]
                        })(<Input style={{ width: '300px' }} placeholder='请输入公众号SecurityKey'/>)}
                      </Form.Item>
                    </Row>
                  </div> : ''}
                  {this.state.addType === 'mini' && this.state.pageType === 'add' ? <div>
                    <Row>
                      <Form.Item label="APP_ID"  {...tailFormItemLayout}>
                        {getFieldDecorator('miniProId', {
                          initialValue: this.state.currentDetail.miniProId,
                          rules: [
                            {
                              required: true,
                              message: '请输入小程序APP_ID'
                            }
                          ]
                        })(<Input style={{ width: '300px' }} placeholder='请输入小程序APP_ID'/>)}
                      </Form.Item>
                    </Row>
                    <Row>
                      <Form.Item label="SecurityKey"  {...tailFormItemLayout}>
                        {getFieldDecorator('miniProSec', {
                          initialValue: this.state.currentDetail.miniProSec,
                          rules: [
                            {
                              required: true,
                              message: '请输入小程序SecurityKey'
                            }
                          ]
                        })(<Input style={{ width: '300px' }} placeholder='请输入小程序SecurityKey'/>)}
                      </Form.Item>
                    </Row>
                  </div> : ''}
                  {
                    this.state.addType==='task'?<div>
                      <Row>
                      <Form.Item label="配置值"  {...tailFormItemLayout}>
                        {getFieldDecorator('expressTime', {
                          initialValue: this.state.currentDetail.TaskExpressTime,
                          rules: [
                            {
                              required: true,
                              message: '请输入配置值'
                            }
                          ]
                        })(<InputNumber max={9999} min={0} style={{ width: '300px' }} placeholder='请输入配置值' formatter={limitDecimals} parser={limitDecimals}/>)}<span style={{'marginLeft':'5px'}}>小时</span>
                      </Form.Item>
                    </Row>
                    </div>:""
                  }
                  {this.state.pageType === 'edit' ? <div>
                    <Row>
                      <Form.Item label="配置值"  {...tailFormItemLayout}>
                        {getFieldDecorator('value', {
                          initialValue: this.state.editValue,
                          rules: [
                            {
                              required: true,
                              message: '请输入配置值'
                            }
                          ]
                        })(<Input style={{ width: '300px' }} placeholder='请输入配置值'/>)}
                      </Form.Item>
                    </Row>
                  </div> : ''}
                  {
                    this.state.pageType==='editTask'?<div>
                    <Row>
                      <Form.Item label="配置值"  {...tailFormItemLayout}>
                        {getFieldDecorator('expressTime', {
                          initialValue: this.state.editValue,
                          rules: [
                            {
                              required: true,
                              message: '请输入配置值'
                            }
                          ]
                        })(<InputNumber max={9999} min={0} style={{ width: '300px' }} placeholder='请输入配置值' formatter={limitDecimals} parser={limitDecimals}/>)}<span style={{'marginLeft':'5px'}}>小时</span>
                      </Form.Item>
                    </Row>
                  </div> : ''}

                </div>
              </Form>
            </Spin>
          </Modal>
        </div>
      </>
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

const WrappedRegistrationForm = Form.create({ name: 'detailForm' })(TableList);
export default connect(mapState, mapDispatch)(WrappedRegistrationForm);
