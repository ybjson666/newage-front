import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Breadcrumb,
  Input,
  Select,
  Form,
  message,
  Spin,
  Modal,
  Row,
  Col,
  DatePicker
} from 'antd';
import './wishDetail.less';
import * as activityApi from '../../api/activity';
import * as wishApi from '../../api/wish';
import {sexState} from '../../utils/utils';
import moment from 'moment';

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;
const { RangePicker } = DatePicker;
// 一个简单的table列表demo
class TableList extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      tableData: [],
      totalCount: 0,
      loading: false
    };
    this.imgPrev=sessionStorage.getItem('imgPrev');
  }

  componentDidMount() {
    const { getList } = this.props;
    const { params } = this.state;
  }


  getTags = (arrays, tag) => {
    let str = '暂未设置';
    arrays.map(ele => {
      if (ele.dictionaryId === tag) {
        str = ele.dictionaryValue;
      }
    });
    return str;
  };
  //确认状态
  confirm = (state) => {
    const data = {
      state: state,
      ids: this.currentId
    };
    wishApi.setWishAudit(data).then(res => {
      if(!res.success)return;
      message.success('审核成功！');
      this.props.onOk();
    });
  };
  // 批量不通过
  mulpDelete = () => {
    console.log(this.state.selectRows);
    const instance = this;
    confirm({
      title: '确认不通过',
      content: '此操作不可撤回,是否确认驳回所选心愿申请?',
      onOk() {
        instance.confirm(3);
      }
    });
  };
  // 批量通过
  mulpAccept = () => {
    console.log(this.state.selectRows);
    const instance = this;
    confirm({
      title: '确认通过',
      content: '此操作不可撤回,是否确认通过所选心愿申请?',
      onOk() {
        instance.confirm(2);
      }
    });
  };

  //保存信息
  saveInfo=()=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
    // this.props.back();
  }
  render() {
    const { detailData = {}, serverArea = [], serverType = [], zzmm = [], jyxl = [] } = this.props;
    const { ActivityEnter = {}, ActivityRecruit = {},customerInfo={},wish={} } = detailData;
    
    if(!this.currentId){
      this.currentId=wish.wishid;
    }
    const currentState=wish.state;
    // const currentState=0;
    const { getFieldDecorator } = this.props.form;

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
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 18 }
      }
    };
    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk} to={'/WishList'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/WishList'} className={'active'}>
              心愿详情
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox wishList-detail-part'>
          <Spin tip="审核中..." spinning={this.state.loading}>
            <div className='part-content'>
              <div className='detail-panel-part'>
                <div className='panel-part-title'>心愿信息</div>
                <div className='content-part-other'>
                  <Form className='form-part' {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row>
                      <Form.Item label="心愿标题:" {...tailFormItemLayout}>
                        {getFieldDecorator('title', {
                          initialValue:wish.title,
                          rules: [
                            {
                              required: true,
                              message: '请输入心愿标题！'
                            }
                          ]
                        })(<Input  disabled={true} maxLength={30}  style={{ width: '70%' }} readOnly/>)}
                      </Form.Item>
                    </Row>
                    <Row>
                      <Form.Item label="心愿详情:" {...tailFormItemLayout}>
                        {getFieldDecorator('description', {
                          initialValue:wish.description,
                          rules: [
                            {
                              required: true,
                              message: '请输入心愿详情！'
                            }
                          ]
                        })(<Input.TextArea disabled={true}  maxLength={500} rows={10}  readOnly/>)}
                      </Form.Item>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="服务类型">
                          {getFieldDecorator('wishtype', {
                            initialValue: wish.wishtype?wish.wishtype+'':'',
                            rules: [
                              {
                                required: false,
                                message: '请选择服务类型！'
                              }
                            ]
                          })(<Select disabled={true} style={{ width: '80%' }}>
                            {serverType.map((ele, index) => {
                              return (<Select.Option key={index} value={ele.dictionaryId}>{ele.dictionaryValue}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="服务地区" >
                          {getFieldDecorator('areaid', {
                            initialValue: wish.areaid? wish.areaid+'':'',
                            rules: [
                              {
                                required: false,
                                message: '请选择服务地区!'
                              }
                            ]
                          })(<Select disabled={true} style={{ width: '80%' }}>
                            {serverArea.map((ele, index) => {
                              return (<Select.Option key={index} value={ele.dictionaryId}>{ele.dictionaryValue}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Item label="服务时间:" {...tailFormItemLayout}>
                        {getFieldDecorator('starttime', {
                          initialValue:wish.starttime?((wish.starttime&&moment(wish.starttime))||''):'',
                          rules: [
                            {
                              required: false,
                            }
                          ]
                        })(<DatePicker
                          disabled={true}
                                         format="YYYY-MM-DD HH:mm:ss"
                                         placeholder={'开始时间'}
                                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        />)}
                      </Form.Item>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="联系人">
                          {getFieldDecorator('contacter', {
                            initialValue:wish.contacter,
                            rules: [
                              {
                                required: true,
                                message:'请填写联系人'
                              }
                            ]
                          })(<Input disabled={true} style={{ width: '75%' }} readOnly/>)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="联系电话" >
                          {getFieldDecorator('phone', {
                            initialValue:wish.phone,
                            rules: [
                              {
                                required: true,
                                message:'请填写联系电话'
                              }
                            ]
                          })(<Input disabled={true} style={{ width: '75%' }} readOnly/>)}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
              <div className='detail-panel-part'>
                <div className='panel-part-title'>申请人信息</div>
                <div className='panel-img panel-img-right'>
                  <div className='img-inner img-right'>
                    <img src={customerInfo.thridInfo&&customerInfo.thridInfo.avatar?customerInfo.thridInfo&&customerInfo.thridInfo.avatar:''} alt=""/>
                  </div>
                </div>
                <div className='content-part'>
                  <div className='content-line'>
                    申请人账号：{customerInfo.thridInfo&&customerInfo.thridInfo.mobile}
                  </div>
                  <div className='content-line'>
                    申请人账号名：{customerInfo.thridInfo&&customerInfo.thridInfo.nickname}
                  </div>
                  <div className='content-line'>
                    性别：{sexState[customerInfo.thridInfo&&customerInfo.thridInfo.sex]}
                  </div>
                  <div className='content-line'>
                    账户类型：{customerInfo.isvolunteer==1?'志愿者账户':'普通账户'}
                  </div>
                  <div className='content-line'>
                    申请时间：{wish.subdate}
                  </div>
                </div>
              </div>
            </div>
            <div className='button-part'>
               <Button onClick={this.props.back}>
                返回
              </Button>
              {/*<Button type="primary" onClick={this.saveInfo}> 保存</Button>*/}
              {currentState==1?<Button onClick={this.mulpAccept} type="primary" htmlType="submit">
                通过
              </Button>:''}
              {currentState==1? <Button onClick={this.mulpDelete} type="danger" htmlType="submit" ghost>
                不通过
              </Button>:''}
            </div>
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
