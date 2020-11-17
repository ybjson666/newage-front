import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  DatePicker,
  Button,
  Breadcrumb,
  Input,
  Select,
  Form,
  Tabs,
  Row,
  Col,
  InputNumber,
  message,
  Spin,
  Table,
  Tooltip,
  Icon,
  Checkbox
} from 'antd';
import * as activityApi from '../../api/activity';
import UploadImg from '../../components/upload/UploadComponentOther';
import './detail.less';
import AddressChoose from '../../components/AddressChoose';
import moment from 'moment';
import { activityState, phoneEqual } from '../../utils/utils';
import * as resourceApi from '../../api/resourceList';
import TimeRangePicker from '../../components/TimeRangePicker';

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

// 一个简单的table列表demo
class TableList extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      totalCount: 0,
      loading: false,
      nameEdit: false,
      tabKey: '1',
      num: 0,
      fullDay: false,
      tableData: [],
      emptyTxt: '加载中...'
    };
    this.listData = {
      pageSize: 10,
      pageNo: 1
    };
    this.imgPrev = sessionStorage.getItem('imgPrev');
  }

  componentDidMount() {
    // 在DidMount里去请求数据
    this.imgPrev = sessionStorage.getItem('imgPrev');
    // const { getList } = this.props;
    // const { params } = this.state;
    // this.getDataList();
    // getList(params);
  }

  // 全选、多选事件
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    selectedRowKeys.push(row.id);
    this.setState({ selectedRowKeys });
  };

  uploadSuccess = (res) => {
    this.faceUrl = res.data;
  };
  handleSubmit = (e) => {
    e && e.preventDefault();
    const { type } = this.props;
    if (!this.faceUrl && type !== 'edit') {
      message.error('请上传封面!');
      return;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {};
        if (this.state.tabKey != 2) {
          data = Object.assign(values, this.position || {});
        } else {
          data = values;
        }
        const faceUrl = this.faceUrl ? this.faceUrl : '';
        if (faceUrl) {
          data.resourceface = faceUrl;
        } else if (this.props.type === 'edit' && !faceUrl && this.pageData.resourceface) {
          data.resourceface = this.pageData.resourceface;
        } else {
          message.error('请上传封面!');
          return;
        }
        if (data.rTime && data.rTime[0]) {
          values.opentime = moment(values.rTime[0]).valueOf();
          values.closetime = moment(values.rTime[1]).valueOf();
          delete values.rTime;
        }
        if (values.closetime < values.opentime) {
          message.error('结束时间须大于开始时间!');
          return;
        }
        if(!values.lat||!values.lng){
          message.error('资源地址不准确，请重新选择资源地址!');
          return;
        }
        if (this.props.type === 'edit') {
          if (!values.resourcename && this.pageData.resourcename) {
            values.resourcename = this.pageData.resourcename;
          }
          values.resourceid = this.pageData.resourceid;
          // values.userid = this.pageData.userid;
          if(isNaN(parseInt(values.resourcetype))){
            values.resourcetype=this.pageData.resourcetype;
          }
          this.onUpdate(values);
        } else {
          this.onSubmit(values);
        }
      }
    });
  };
  //创建
  onSubmit = (values) => {
    this.setState({ loading: true });
    resourceApi.addResource(values).then(res => {
      if (!res.success) return;
      message.success('保存成功');
      if ('onOk' in this.props) {
        this.props.onOk();
      }
    })
      .catch(err => {
        message.error('保存失败');
      }).finally(err => {
      this.setState({ loading: false });
    });
  };
  //修改
  onUpdate = (values) => {
    this.setState({ loading: true });
    resourceApi.modifyResource(values).then(res => {
      if (!res.success) return;
      message.success('保存成功');
      if ('onOk' in this.props) {
        this.props.onOk();
      }
    })
      .catch(err => {
        message.error('保存失败');
      }).finally(err => {
      this.setState({ loading: false });
    });
  };
  //编辑活动名称
  editAtivityName = () => {
    this.setState({ nameEdit: true });
  };
  //tab 点击
  tabChange = (tabKey) => {
    this.setState({ tabKey });
    if (tabKey == 2) {
      this.getTableData();
    } else {
      this.listData = {
        pageSize: 10,
        pageNo: 1
      };
      this.setState({
        emptyTxt: '加载中...',
        tableData: []
      });
    }
  };
  // 获取预约列表数据
  getTableData = () => {
    const useData = {
      ...this.listData,
      resourceid: this.pageData.resourceid
    };
    resourceApi.resourceShowHistory(useData).then(res => {
      const arrayData = (res && res.data.data) || [];
      const tableData = Array.isArray(arrayData) ? arrayData : [];
      let startNum = this.listData.pageSize * (this.listData.pageNo - 1);
      tableData.map((ele, index) => {
        ele.rowIndex = startNum + index + 1;
      });
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
// 全天可用checkbox事件
  onFullDayChange = (value) => {
    this.setState({ fullDay: !this.state.fullDay });
    if (!this.state.fullDay) {
      this.props.form.setFieldsValue({
        rTime: [moment().startOf('day'), moment().endOf('day')]
      });
    } else {
      this.props.form.setFieldsValue({
        rTime: []
      });
    }
  };
  // 选择时间
  timeChooseChange = (value) => {
    if (value[0] && value[1]) {
      const start = moment(value[0]).format('HH:mm:ss');
      const end = moment(value[1]).format('HH:mm:ss');
      if (start == '00:00:00' && end == '23:59:59') {
        this.setState({ fullDay: true });
      }
    }
  };
  // 分页
  onShowSizeChange = (page, pageSize) => {
    this.listData.pageNo = page;
    this.listData.pageSize = pageSize;
    this.getTableData();
  };
  checkTypeName = (type = '') => {
    if (!type) {
      return;
    } else {
      let status = false;
      this.props.serverType.map(ele => {
        if (ele.dictid == type) {
          status = true;
        }
      });
      if (status) {
        return type+'';
      } else {
        let str = '';
        this.props.allServerTypeData.map(ele => {
          if (ele.dictid == type) {
            str = ele.dictname;
          }
        });
        return str;
      }
    }

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        dataIndex: 'rowIndex',
        title: '序号',
        width: 70,
        render: (text, row) => (

          <span>{text}</span>
        )
      },
      {
        title: '预约人',
        dataIndex: 'CustomerName',
        align: 'left',
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '预约开始日期',
        dataIndex: 'StartTime',
        align: 'left',
        render: (tags, row) => {
          return (<span>{tags}</span>);
        }
      }, {
        title: '预约结束日期',
        dataIndex: 'EndTime',
        align: 'left',
        render: (tags, row) => {
          return (<span>{tags}</span>);
        }
      }
      // {
      //   title: '审核状态',
      //   dataIndex: 'signouttime',
      //   align: 'left',
      //   render: (tags, row) => {
      //     return (<span>{tags}</span>);
      //   }
      // }
    ];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 19 }
      }
    };
    const tailOtherFormItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 20 }
      }
    };
    const otherFormItemLayout = {
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };
    const pagination = {
      'pageSize': this.listData.pageSize,
      'total': this.state.totalCount,
      'current': this.listData.pageNo,
      'showTotal': total => `共 ${total} 条数据`,
      'showSizeChanger': true,
      'onShowSizeChange': this.onShowSizeChange,
      'onChange': this.onShowSizeChange
    };
    const { detailData = {}, serverArea = [], serverType = [], showType = [],type, spiderData = [] } = this.props;
    this.pageData = detailData&&type === 'edit' ? detailData : {};
    let tableData = [];
    // this.cancleEdit=true;
    if (type === 'edit') {
      tableData =  this.pageData.cusList||[];
    }
    // if (type === 'edit' && this.pageData.state > 3) {
    //   this.cancleEdit = true;
    // }
    if (type === 'edit' && !this.position) {
      this.position = {
        lat: this.pageData.lat,
        lng: this.pageData.lng
      };
    }
    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk} to={'/ResourceList'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/ActivityList'} className={'active'}>
              {this.props.type === 'create' ? '新建资源' : '资源详情'}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox resource-detail-part'>
          <Spin tip="保存中..." spinning={this.state.loading}>
            <Form className='form-part' {...formItemLayout} onSubmit={this.handleSubmit}>
              {type != 'create' ? <Tabs defaultActiveKey="1" activeKey={this.state.tabKey} onChange={this.tabChange}>
                <TabPane tab="基本信息" key="1">
                </TabPane>
                <TabPane tab="预约情况" key="2">
                </TabPane>
              </Tabs> : ''}
              <div className='detail-panel-part-activity'>
                {this.state.tabKey == '1' ? <div className='has-img'>
                    <div className='panel-part-title-activity'>
                      {this.props.type === 'create' || (type === 'edit' && this.state.nameEdit && !this.cancleEdit) ?
                        <Form.Item style={{ 'marginBottom': '0', width: '100%' }} {...otherFormItemLayout}>
                          {getFieldDecorator('resourcename', {
                            initialValue: this.pageData.resourcename || '',
                            rules: [
                              {
                                required: true,
                                message: '请输入资源名称！'
                              }
                            ]
                          })(<Input maxLength={20} placeholder='请输入资源名称'/>)}
                        </Form.Item> : <span className='title-show-part' role='button' tabIndex='-1'
                                             onClick={this.editAtivityName}>
                      {this.pageData.resourcename}
                          {type === 'edit' && !this.cancleEdit ?
                            <Icon className='can-editButton' type="edit" stlyle={{ 'position': 'relative' }}/> : ''}
                    </span>}</div>
                    <div className='part-main'>
                      <UploadImg
                        type='text'
                        buttonText={'点击上传资源图'}
                        imgValue={this.pageData.resourceface ? (this.imgPrev + this.pageData.resourceface) : ''}
                        disabled={this.cancleEdit}
                        onChange={(res) => {
                          this.pageData.resourceface = res.data;
                          this.faceUrl = res.data;
                          this.setState({ num: this.state.num + 1 });
                        }}
                      />
                      <p style={{ 'textAlign': 'center', 'margin': '10px 0' }}>建议上传4:3的jpg,png格式图片,图片大小不超过5M</p>
                      {/*资源开放时间*/}
                      <Row className={'row-content'}>
                        <Form.Item label="资源开放时间"  {...tailFormItemLayout}>
                          {getFieldDecorator('rTime', {
                            initialValue: this.pageData.opentime || this.pageData.closetime ? [this.pageData.opentime ? moment(this.pageData.opentime) : '', this.pageData.closetime ? moment(this.pageData.closetime) : ''] : [],
                            rules: [
                              {
                                required: true,
                                validator: (rule, value, callback) => {
                                  if (value[0] && value[1]) {
                                    if (moment(value[1]).valueOf() < moment(value[0]).valueOf()) {
                                      callback('结束时间须大于开始时间!');
                                    }
                                    return callback();
                                  }
                                  if (!value[0] && !value[1]) {
                                    callback('请选择资源开放时间!');
                                  } else if (!value[0] && value[1]) {
                                    callback('请选择开放开始时间!');
                                  } else if (!value[1] && value[0]) {
                                    callback('请选择开放结束时间!');
                                  }

                                }
                              }
                            ]
                          })(<TimeRangePicker onLastChange={this.timeChooseChange} disabled={this.state.fullDay}/>)}
                          <Checkbox style={{ marginLeft: '5px' }} checked={this.state.fullDay}
                                    onChange={this.onFullDayChange}/> 全天可用
                        </Form.Item>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="资源类型">
                            {getFieldDecorator('resourcetype', {
                              initialValue:this.checkTypeName(this.pageData.resourcetype),
                              rules: [
                                {
                                  required: true,
                                  message: '请选择资源类型!'
                                }
                              ]
                            })(<Select disabled={this.cancleEdit} onChange={(value) => {
                            }} style={{ width: '200px' }} placeholder='请选择资源类型'>
                              {/* {serverType.map((ele, index) => {
                                return (<Select.Option key={index}
                                                       disabled={ele.enable == 0}
                                                       value={ele.dictid + ''}>{ele.dictname}</Select.Option>);
                              })}, */}
                                {this.props.noEnableType.map((ele, index) => {
                                return (<Select.Option key={index}
                                                       value={ele.dictid + ''}>{ele.dictname}</Select.Option>);
                              })}
                            </Select>)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="资源地区">
                            {getFieldDecorator('areaid', {
                              initialValue: this.pageData.areaid ? this.pageData.areaid + '' : undefined,
                              rules: [
                                {
                                  required: true,
                                  message: '请选择资源地区!'
                                }
                              ]
                            })(<Select disabled={this.cancleEdit} onChange={(value) => {
                            }} style={{ width: '200px' }} placeholder='请选择资源地区'>
                              {serverArea.map((ele, index) => {
                                return (<Select.Option key={index}
                                                       value={ele.dictionaryId + ''}>{ele.dictionaryValue}</Select.Option>);
                              })}
                            </Select>)}
                          </Form.Item>
                        </Col>
                      </Row>
                      {/*资源地址*/}
                      <Row>
                        <Form.Item label="资源地址"  {...tailFormItemLayout}>
                          {getFieldDecorator('address', {
                            initialValue: this.pageData.address,
                            rules: [
                              {
                                required: true,
                                message: '请选择地址！'
                              }
                            ]
                          })(<AddressChoose
                            disabled={this.cancleEdit}
                            locationValue={this.pageData.address}
                            locationPoint={
                              {
                                lat: this.pageData.lng,
                                lng: this.pageData.lat
                              }}
                            onChange={(address, values) => {
                              this.props.form.setFieldsValue({
                                address
                              });
                              this.position = {
                                lat: values.latitude,
                                lng: values.longitude
                              };
                            }}
                          />)}
                        </Form.Item>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="联系人">
                            {getFieldDecorator('contactsname', {
                              initialValue: this.pageData.contractsname,
                              rules: [
                                {
                                  required: true,
                                  message: '请输入联系人！'
                                }
                              ]
                            })(<Input disabled={this.cancleEdit} maxLength={20} style={{ width: '200px' }}
                                      placeholder='请输入联系人'/>)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="联系方式">
                            {getFieldDecorator('contactsphone', {
                              initialValue: this.pageData.contractsphone,
                              rules: [
                                {
                                  required: true,
                                  message: '请输入联系方式!'
                                }, {
                                  pattern: phoneEqual,
                                  message: '请输入正确电话号码!'
                                }
                              ]
                            })(<Input maxLength={11} disabled={this.cancleEdit} style={{ width: '200px' }}
                                      placeholder='请输入联系方式'/>)}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="资源面积">
                            {getFieldDecorator('areasize', {
                              initialValue: this.pageData.areasize,
                              rules: [
                                {
                                  required: false,
                                  message: '请输入资源面积！'
                                }
                              ]
                            })(<InputNumber
                              parser={value => {
                                return isNaN(parseInt(value)) ? '' : parseInt(value);
                              }}
                              min={0}
                              disabled={this.cancleEdit} maxLength={5} style={{ width: '160px' }}
                              placeholder='请输入资源面积'/>)}<span style={{ 'marginLeft': '5px' }}>平方米</span>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="容纳人数">
                            {getFieldDecorator('containsize', {
                              initialValue: this.pageData.containsize,
                              rules: [
                                {
                                  required: false,
                                  message: '请输入容纳人数!'
                                }
                              ]
                            })(<InputNumber min={0} maxLength={5} disabled={this.cancleEdit} style={{ width: '180px' }}
                                            placeholder='请输入容纳人数'/>)} 人
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Item label="资源说明" ref={(node) => {
                          if (node) {
                            this.formItem = node;
                          }
                        }}  {...tailOtherFormItemLayout}>
                          {getFieldDecorator('desc', {
                            initialValue: this.pageData.remark,
                            rules: [
                              {
                                required: true,
                                message: '请输入资源说明！'
                              }
                            ]
                          })(<TextArea
                              className='showText-area'
                              maxLength='200'
                              disabled={this.cancleEdit}
                              rows={6}
                            />
                          )}
                        </Form.Item>
                      </Row>
                    </div>
                  </div> :
                  <div className='table-part'>
                    <div className='panel-part-title-activity'>
                      <span className='title-show-part' role='button' tabIndex='-1'>
                      {this.pageData.resourcename}
                    </span></div>
                    <div className='tableCont mainContentBox table-activity-detail' style={{ height: '400px' }}>
                      <Table
                        rowKey="resourceid"
                        columns={columns}
                        pagination={pagination}
                        dataSource={this.state.tableData}
                        locale={{ emptyText: this.state.emptyTxt }}
                        onRow={(record, index) => ({
                          index,
                          onClick: this.onRowEvent.bind(this, record)
                        })}
                        scroll={{ x: '100%', y: '300px' }}
                      />
                    </div>
                  </div>
                }
              </div>
              <div className='button-part'>
                <Button onClick={this.props.back}>
                  返回
                </Button>
                {this.cancleEdit || this.state.tabKey == 2 ? '' : <Button type="primary" htmlType="submit">
                  {type == 'create' ? '确认创建' : '确认编辑'}
                </Button>}
              </div>
            </Form>
          </Spin>
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
