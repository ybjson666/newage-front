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
  Checkbox,
  Popover
} from 'antd';
import UploadImg from '../../components/upload/UploadComponentOther';
import './detail.less';
import moment from 'moment';
import { activityState, phoneEqual } from '../../utils/utils';
import * as resourceApi from '../../api/orderSheetList';
import Quill from '../../components/quill';

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
          data.cover = faceUrl;
        } else if (this.props.type === 'edit' && !faceUrl && this.pageData.cover) {
          data.cover = this.pageData.cover;
        } else {
          message.error('请上传封面!');
          return;
        }
        if (data.rTime && data.rTime[0]) {
          values.beginTime = moment(values.rTime[0]).startOf('day').valueOf();
          values.endTime = moment(values.rTime[1]).endOf('day').valueOf();
          delete values.rTime;
        }
        if (values.closetime < values.opentime) {
          message.error('结束时间须大于开始时间!');
          return;
        }
        let servCount=values.serviceCount;
        let hasCount=this.pageData.hascount;
       
        if(servCount<hasCount&&servCount!==0){
          message.error('服务场次不得低于已预约场次，请重试！');
          return;
        }
        values.servicePrice=values.servicePrice?values.servicePrice:0;
        if (this.props.type === 'edit') {
          if (!values.title && this.pageData.title) {
            values.title = this.pageData.title;
          }
          values.activityOrderID = this.pageData.activityorderid;
          // values.userid = this.pageData.userid;
          if (isNaN(parseInt(values.dictID))) {
            values.dictID = this.pageData.dictid;
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
      activityId: this.pageData.activityorderid
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
        return type + '';
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
      // {
      //   dataIndex: 'rowIndex',
      //   title: '序号',
      //   width: 70,
      //   render: (text, row) => (
      //
      //     <span>{text}</span>
      //   )
      // },
      {
        title: '预约人姓名',
        dataIndex: 'realname',
        align: 'left',
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '联系方式',
        dataIndex: 'phone',
        align: 'left',
        render: (tags, row) => {
          return (<span>{tags}</span>);
        }
      }, {
        title: '服务时间',
        dataIndex: 'bookdate',
        align: 'left',
        render: (tags, row) => {
          return (<span>
            <div>{tags}</div>
           </span>);
        }
      }, {
        title: '服务评分',
        dataIndex: 'score',
        align: 'left',
        render: (tags, row) => {
          return (<span>{!tags ? '暂无评分' : `${tags} 分`}</span>);
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
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 20 }
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
    const { detailData = {}, serverArea = [], serverType = [], type, spiderData = [] } = this.props;
    this.pageData = detailData && type === 'edit' ? detailData : {};
    let tableData = [];
    // this.cancleEdit=true;
    if (type === 'edit') {
      tableData = this.pageData.cusList || [];
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
  
    const actvDesc = '为避免点单创建失败，建议此处输入字数不超过500字!';
    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk} to={'/OrderSheetList'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/OrderSheetList'} className={'active'}>
              {this.props.type === 'create' ? '新建点单' : '点单详情'}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox resource-detail-part'>
          <Spin tip="保存中..." spinning={this.state.loading}>
            <Form className='form-part' {...formItemLayout} onSubmit={this.handleSubmit}>
              {type != 'create' ? <Tabs defaultActiveKey="1" activeKey={this.state.tabKey} onChange={this.tabChange}>
                <TabPane tab="点单信息" key="1">
                </TabPane>
                <TabPane tab="预约详情" key="2">
                </TabPane>
              </Tabs> : ''}
              <div className='detail-panel-part-activity'>
                {this.state.tabKey == '1' ? <div className='has-img'>
                    <div className='panel-part-title-activity'>
                      {this.props.type === 'create' || (type === 'edit' && this.state.nameEdit && !this.cancleEdit) ?
                        <Form.Item style={{ 'marginBottom': '0', width: '100%' }} {...otherFormItemLayout}>
                          {getFieldDecorator('title', {
                            initialValue: this.pageData.title || '',
                            rules: [
                              {
                                required: true,
                                message: '请输入点单服务名称！'
                              }
                            ]
                          })(<Input maxLength={10} placeholder='请输入点单服务名称'/>)}
                        </Form.Item> : <span className='title-show-part' role='button' tabIndex='-1'
                                             onClick={this.editAtivityName}>
                      {this.pageData.title}
                          {type === 'edit' && !this.cancleEdit ?
                            <Icon className='can-editButton' type="edit" stlyle={{ 'position': 'relative' }}/> : ''}
                    </span>}</div>
                    <div className='part-main'>
                      <UploadImg
                        type='text'
                        buttonText={'点击上传服务封面'}
                        imgValue={this.pageData.cover ? (this.imgPrev + this.pageData.cover) : ''}
                        disabled={this.cancleEdit}
                        onChange={(res) => {
                          this.pageData.cover = res.data;
                          this.faceUrl = res.data;
                          this.setState({ num: this.state.num + 1 });
                        }}
                      />
                      <p style={{ 'textAlign': 'center', 'margin': '10px 0' }}>建议上传16:9的jpg,png格式图片,图片大小不超过5M</p>
                      {/*资源开放时间*/}
                      <Row className={'row-content'}>
                        <Form.Item label="服务时间">
                          {getFieldDecorator('rTime', {
                            initialValue: this.pageData.begintime || this.pageData.endtime ? [this.pageData.begintime ? moment(this.pageData.begintime) : '', this.pageData.endtime ? moment(this.pageData.endtime) : ''] : [],
                            rules: [
                              {
                                required: false,
                                message: '请选择服务时间'
                              }
                            ]
                          })(<RangePicker style={{ width: '100%' }}/>)}
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item label="点单类型">
                          {getFieldDecorator('dictID', {
                            initialValue: this.checkTypeName(this.pageData.dictid),
                            rules: [
                              {
                                required: true,
                                message: '请选择点单类型!'
                              }
                            ]
                          })(<Select disabled={this.cancleEdit} onChange={(value) => {
                          }} placeholder='请选择点单类型'>
                            {serverType.map((ele, index) => {
                              return (<Select.Option key={index}
                                                     disabled={ele.enable == 0}
                                                     value={ele.dictid + ''}>{ele.dictname}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item label="服务场次">
                          {getFieldDecorator('serviceCount', {
                            initialValue: this.pageData.servicecount,
                            rules: [
                              {
                                required: false,
                                message: '请输入服务场次!'
                              },

                              {
                                required: false,
                                pattern: /^[0-9]\d*$/,
                                message: '请填写正整数'
                              }
                            ]
                          })(<InputNumber  max={99999} maxLength={5} placeholder={'请输入服务场次'} style={{ width: '85%' }}/>)} <span
                          style={{ marginLeft: '5px' }}>场</span>
                          <span>
                               <Popover style={{ width: '100px' }} placement="right" title={'提示'} content={(
                                 <div className={'price-tips-only-orderSheet'}>不填或为0时即为不限服务场次</div>)}
                                        trigger="hover">
                          <Icon style={{ marginLeft: '5px', color: '#3e8ff7' }} type="question-circle"/>
                          </Popover>
                          </span>
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item label="服务价格">
                          {getFieldDecorator('servicePrice', {
                            initialValue: type=='edit'?(this.pageData.serviceprice>0?this.pageData.serviceprice:'免费'):'',
                            rules: [
                              {
                                required: false,
                                message: '请填写服务价格!'
                              },
                              {
                                pattern: /^(^[0-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/,
                                message: '仅可输入小数点后两位正数'
                              }
                            ]
                          })(
                          <Input min={0} maxLength={5} max={99999} placeholder={'请填写服务价格'} style={{ width: '85%' }}/>
                          )}

                          <span
                          style={{ marginLeft: '5px' }}>元</span>
                          <span>
                               <Popover style={{ width: '100px' }} placement="right" title={'提示'} content={(
                                 <div className={'price-tips-only-orderSheet'}>服务价格仅作终端展示，平台暂不提供线上收款服务</div>)}
                                        trigger="hover">
                          <Icon style={{ marginLeft: '5px', color: '#3e8ff7' }} type="question-circle"/>
                          </Popover>
                          </span>
                        </Form.Item>
                      </Row>

                      <Row>
                        <Form.Item label="联系人">
                          {getFieldDecorator('contactPerson', {
                            initialValue: this.pageData.contactperson,
                            rules: [
                              {
                                required: true,
                                message: '请输入联系人！'
                              }
                            ]
                          })(<Input disabled={this.cancleEdit} maxLength={20}
                                    placeholder='请输入联系人'/>)}
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item label="联系电话">
                          {getFieldDecorator('contactPhone', {
                            initialValue: this.pageData.contactphone,
                            rules: [
                              {
                                required: true,
                                message: '请输入联系电话!'
                              }, {
                                pattern: phoneEqual,
                                message: '请输入正确电话号码!'
                              }
                            ]
                          })(<Input maxLength={11} disabled={this.cancleEdit}
                                    placeholder='请输入联系方式'/>)}
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item label="服务描述" ref={(node) => {
                          if (node) {
                            this.formItem = node;
                          }
                        }}>
                          {getFieldDecorator('descript', {
                            initialValue: this.pageData.descript,
                            rules: [
                              {
                                required: true,
                                message: '请输入服务描述！'
                              }
                            ]
                          })(<Quill
                            limit='500'
                            className='showText-area2'
                            disabled={this.cancleEdit}
                            placeholder={actvDesc}
                            rows={6}/>
                          )}
                        </Form.Item>
                      </Row>
                    </div>
                  </div> :
                  <div className='table-part'>
                    <div className='panel-part-title-activity'>
                      <span className='title-show-part' role='button' tabIndex='-1'>
                      {this.pageData.title}
                    </span></div>
                    <div className='tableCont mainContentBox table-activity-detail' style={{ height: '400px' }}>
                      <Table
                        rowKey="activityorderenterid"
                        columns={columns}
                        pagination={false}
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
