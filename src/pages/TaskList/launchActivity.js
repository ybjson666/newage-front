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
  Icon
} from 'antd';
import * as volunteerListApi from '../../api/volunteerList';
import * as activityApi from '../../api/activity';
import * as praActivityApi from '../../api/ActivityPractice';
import UploadImg from '../../components/upload/UploadComponentOther';
import '../ActivityList/detail.less';
import AddressChoose from '../../components/AddressChoose';
import moment from 'moment';
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
      tableData: [],
      totalCount: 0,
      loading: false,
      nameEdit: false,
      tabKey: '1',
      num:0,
    };
    this.imgPrev=sessionStorage.getItem('imgPrev');
    this.position={};
  }

  componentDidMount() {
    // 在DidMount里去请求数据
    this.imgPrev=sessionStorage.getItem('imgPrev');
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
        if(!this.position.addresslatitude||!this.position.addresslongitude){
          message.error('请在地图上选择准确的活动地点，以便获取签到范围.');
          return;
        }
        if (this.state.tabKey != 2) {
          data = Object.assign(values, this.position || {});
        } else {
          data = values;
        }
        const faceUrl = this.faceUrl ? this.faceUrl : '';
        if (faceUrl) {
          data.cover = faceUrl;
        } else if (this.props.type === 'edit' && !faceUrl) {
          data.cover = this.pageData.cover;
        }
        if (values.rTime) {
          values.rStartTime = moment(values.rTime[0]).valueOf();
          values.rEndTime = moment(values.rTime[1]).valueOf();
          delete values.rTime;
        }
        if (values.aTime) {
          values.aStartTime = moment(values.aTime[0]).valueOf();
          values.aEndTime = moment(values.aTime[1]).valueOf();
          delete values.aTime;
        }
        if (values.aStartTime < values.rEndTime) {
          message.error('报名时间要在活动时间前!');
          return;
        }
        if (this.props.type === 'edit') {
          values.activityrecruitid = this.pageData.activityrecruitid;
          this.onUpdate(values);
        } else {
          values.taskid = this.pageData.taskid;
          values.wishid = this.pageData.wishid;
          if(this.props.type==='launch'){
            this.onSubmit(values);
          }
          if(this.props.type==='practice'){
            this.onPracticeSubmit(values);
          }
        }
      }
    });
  };
  // 实践活动创建
  onPracticeSubmit=(values)=>{
    this.setState({ loading: true });
    praActivityApi.activityAdd(values).then(res => {
      if (!res.success) return;
      message.success('实践活动创建成功');
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
  // 招募活动创建
  onSubmit = (values) => {
    this.setState({ loading: true });
    activityApi.activityAdd(values).then(res => {
      if (!res.success) return;
      message.success('活动创建成功');
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
  onUpdate = (values) => {
    this.setState({ loading: true });
    activityApi.activityUpdate(values).then(res => {
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
  };
  // 开始时间限制
  disabledStartDate = (value) => {
    const currentDate = moment().subtract(1, 'days').valueOf() ;
    return moment(value).valueOf() < currentDate;
  };
  range=(start, end)=> {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  disabledStartDateTime=()=>{
    const hour=moment().hour();
    const minute=moment().minute();
    return {
      disabledHours: () => this.range(0, 24).splice(0, hour),
      disabledMinutes: () => this.range(0, 60).splice(0,minute),
    };
  };
  //结束时间限制

  disabledEndDate = (value) => {
    const currentDate = moment().subtract(1, 'days').valueOf() ;
    const useNowValue=moment(value).valueOf();
    const useValue=moment(useNowValue).valueOf();
    const rTime=this.props.form.getFieldValue('rTime');
    let rEndTime='';
    if(rTime&&Array.isArray(rTime)&&rTime[1]){
      rEndTime=moment(rTime[1]).valueOf();
    }
    return  rEndTime?useValue < rEndTime:useValue < currentDate;
  };
  // 分秒限制
  disabledEndDateTime=(_, type)=>{
    const rTime=this.props.form.getFieldValue('rTime');
    let useTime=moment();
    let useDate='';
    if(rTime&&Array.isArray(rTime)&&rTime[1]){
      useTime=moment(rTime[1]);
      useDate=moment(rTime[1]).format('YYYY-MM-DD');
    }else{
      return  {};
    }
    let hour=useTime.hour();
    let minute=useTime.minute();
    let second=useTime.second();
    // console.log(second);
    let currentHour;
    let currentMinute;
    let currentDate;
    if(Array.isArray(_)&&type=='start'){
      currentHour=moment(_[0]).hour();
      currentMinute=moment(_[0]).minute();
      currentDate=moment(_[0]).format('YYYY-MM-DD');
    }else if(Array.isArray(_)&&type=='end'){
      currentHour=moment(_[1]).hour();
      currentMinute=moment(_[1]).minute();
      currentDate=moment(_[1]).format('YYYY-MM-DD');
    }else{
      currentHour=moment(_).hour();
      currentMinute=moment(_).minute();
      currentDate=moment(_).format('YYYY-MM-DD');

    }
    let status=moment(useDate).isSame(moment(currentDate));
    if(second+1>=60){
      minute=minute+1;
      second=0;
      if(minute>=60){
        hour=hour+1;
        minute=0;
      }
    }
    return {
      disabledHours: () => status ? this.range(0, 24).splice(0, hour) : this.range(0, 24).splice(0, 0),
      disabledMinutes: () => status&&currentHour==hour ? this.range(0, 60).splice(0, minute) : this.range(0, 60).splice(0, 0),
      disabledSeconds: () => status&&currentHour==hour&&currentMinute==minute ? this.range(0, 60).splice(0, second) : this.range(0, 60).splice(0, 0)
    };
  };
  render() {
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
    const { detailData = {}, serverArea = [], serverType = [], type } = this.props;
    this.pageData =detailData ||{};
    if (this.pageData.addresslatitude||this.pageData.addresslongitude) {
      this.position = {
        addresslatitude: this.pageData.addresslatitude,
        addresslongitude: this.pageData.addresslongitude
      };
    }
    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk} to={'/TaskList'}>
              实践任务
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/TaskList'} className={'active'}>
              {type=='launch'?'发起招募活动':''}
              {type=='practice'?'发起实践活动':''}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox detail-part'>
          <Spin tip="保存中..." spinning={this.state.loading}>
            <Form className='form-part' {...formItemLayout} onSubmit={this.handleSubmit}>
              <div className='detail-panel-part-activity'>
                <div className='panel-part-title-activity'>
                    <Form.Item style={{ 'marginBottom': '0', width: '100%' }} {...otherFormItemLayout}>
                      {getFieldDecorator('activityname', {
                        initialValue: this.pageData.title||'',
                        rules: [
                          {
                            required: true,
                            message: '请输入活动名称！'
                          }
                        ]
                      })(<Input maxLength={30} placeholder='请输入活动名称'/>)}
                    </Form.Item> </div>
               <div className='has-img'>
                    <div className='part-main'>
                      <UploadImg
                        type='text'
                        buttonText={'点击上传封面图'}
                        imgValue={this.pageData.cover?(this.imgPrev+this.pageData.cover): ''}
                        disabled={this.cancleEdit}
                        onChange={(res) => {
                          this.faceUrl = res.data;
                          this.setState({num:this.state.num+1});
                        }}
                      />
                      <p style={{"textAlign":'center','margin':'10px 0'}}>建议上传16:9的jpg,png格式图片,图片大小不超过5M</p>
                      <Row className={'row-content'}>
                        <Col span={12}>
                          <Form.Item label="活动地区">
                            {getFieldDecorator('areaid', {
                              initialValue: this.pageData.areaid ? this.pageData.areaid + '' : undefined,
                              rules: [
                                {
                                  required:true,
                                  message: '请选择活动地区!'
                                }
                              ]
                            })(<Select disabled={this.cancleEdit} onChange={(value) => {
                            }} style={{ width: '200px' }} placeholder='请选择活动地区'>
                              {serverArea.map((ele, index) => {
                                return (<Select.Option key={index}
                                                       value={ele.dictionaryId + ''}>{ele.dictionaryValue}</Select.Option>);
                              })}
                            </Select>)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="活动地址">
                            {getFieldDecorator('address', {
                              initialValue: this.pageData.address,
                              rules: [
                                {
                                  required: true,
                                  message: '请选择活动地址！'
                                }
                              ]
                            })(<AddressChoose
                              disabled={this.cancleEdit}
                              locationValue={this.pageData.address}
                              locationPoint={
                                {
                                  latitude: this.pageData.addresslatitude,
                                  longitude: this.pageData.addresslongitude
                                }}
                              onChange={(address, values) => {
                                this.props.form.setFieldsValue({
                                  address
                                });
                                this.position = {
                                  addresslatitude: values.latitude,
                                  addresslongitude: values.longitude
                                };
                              }}
                            />)}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Item label="服务类型"  {...tailFormItemLayout}>
                          {getFieldDecorator('activitytype', {
                            initialValue: this.pageData.tasktype ? this.pageData.tasktype + '' : undefined,
                            rules: []
                          })(<Select disabled={this.cancleEdit} style={{ width: '200px' }} placeholder='请选择服务类型'>
                            {serverType.map((ele, index) => {
                              return (<Select.Option key={index}
                                                     value={ele.dictionaryId + ''}>{ele.dictionaryValue}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Row>
                      <Row>
                        {type=='launch'? <Col span={12}>
                          <Form.Item label="招募人数">
                            {getFieldDecorator('recruitcount', {
                              initialValue: this.pageData.recruitcount,
                              rules: [
                                {
                                  required: false,
                                  message: '请输入招募人数！'
                                }
                              ]
                            })(<InputNumber disabled={this.cancleEdit} min={0} style={{ width: '200px' }}
                                            placeholder='请输入招募人数'/>)}
                          </Form.Item>
                        </Col>: <Col span={12}>
                        <Form.Item label="活动人数">
                          {getFieldDecorator('recruitcount', {
                            initialValue: this.pageData.recruitcount,
                            rules: [
                              {
                                required: false,
                                message: '请输入活动人数！'
                              }
                            ]
                          })(<InputNumber disabled={this.cancleEdit} min={0} style={{ width: '200px' }}
                                          placeholder='请输入活动人数'/>)}
                        </Form.Item>
                      </Col>}
                        <Col span={12}>
                          <Form.Item label="签到半径" >
                            {getFieldDecorator('checkrange', {
                              initialValue: this.pageData.checkrange,
                              rules: [
                                {
                                  required: true,
                                  message: '请输入签到半径!'
                                }
                              ]
                            })(<InputNumber max={10000} disabled={this.cancleEdit} min={1} style={{ width: '200px' }}
                                            placeholder='请填写签到半径'/>)} <span style={{'marginLeft':'5px'}}>米</span>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Item label="报名时间"  {...tailFormItemLayout}>
                          {getFieldDecorator('rTime', {
                            rules: [
                              {
                                required: true,
                                message: '请选择报名时间！'
                              }
                            ]
                          })(<RangePicker
                            disabled={this.cancleEdit}
                            showTime={{
                              hideDisabledOptions: true,
                              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                            }}
                            onChange={(value)=>{
                              this.props.form.setFieldsValue(
                                {'aTime':[moment(moment(value[1]).add('1','seconds')),undefined]}
                              )
                            }}
                            format="YYYY-MM-DD HH:mm:ss"
                            // disabledTime={this.disabledStartDateTime}
                            disabledDate={this.disabledStartDate}
                            placeholder={['开始时间', '结束时间']}
                            style={{ width: '380px' }}>
                          </RangePicker>)}
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item label="活动时间"  {...tailFormItemLayout}>
                          {getFieldDecorator('aTime', {
                            initialValue: this.pageData.starttime || this.pageData.endtime ? [(this.pageData.starttime && moment(this.pageData.starttime)), (this.pageData.endtime && moment(this.pageData.endtime))] : [],
                            rules: [
                              {
                                validator:function(rule, value, callback){
                                  if(!value[1]){callback('请选择结束时间')}
                                  if(value[0]&&value[1]){callback()}
                                  }, 
                                required: true,
                                message: '请选择活动时间！'
                              }
                            ]
                          })(<RangePicker
                            disabled={this.cancleEdit}
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledTime={this.disabledEndDateTime}
                            disabledDate={this.disabledEndDate}
                            showTime={{
                              hideDisabledOptions: true,
                              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                            }}
                            placeholder={['开始时间', '结束时间']}
                            style={{ width: '380px' }}>
                          </RangePicker>)}
                        </Form.Item>
                      </Row>
                      {type=='practice'? <Row>
                        <Form.Item label="活动审核"  {...tailFormItemLayout}>
                          {getFieldDecorator('ischeck', {
                            initialValue: this.pageData.ischeck ? this.pageData.ischeck + '' : '1',
                            rules: [
                              {
                                required: false,
                                message: '请选择活动审核！'
                              }
                            ]
                          })(<Select disabled={this.cancleEdit} style={{ width: '200px' }} placeholder='请选择'>
                            <Select.Option value={'1'}>开启</Select.Option>
                            <Select.Option value={'2'}>关闭</Select.Option>
                          </Select>)}
                        </Form.Item>
                      </Row>:''}
                      <Row>
                        <Form.Item label="活动描述" ref={(node)=>
                        {
                          if(node){
                            this.formItem=node
                          }
                        }}  {...tailOtherFormItemLayout}>
                          {getFieldDecorator('activitydesc', {
                            initialValue: this.pageData.description||'',
                            rules: [
                              {
                                required: true,
                                message: '请输入活动描述！'
                              }
                            ]
                          })(<Quill
                            limit='500'
                              className='showText-area'
                              disabled={this.cancleEdit}
                              rows={4}
                            />
                          )}
                        </Form.Item>
                      </Row>
                    </div>
                  </div>
              </div>
              <div className='button-part'>
                <Button onClick={this.props.back}>
                  返回
                </Button>
                {this.cancleEdit ? '' : <Button type="primary" htmlType="submit">
                  保存
                </Button>}
              </div>
            </Form>
          </Spin>
        </div>
      </>
    );
  }
}

const mapState = ({ message }) => ({
  listData: message.listData,
  listLoading: message.listLoading
});

const mapDispatch = ({ message }) => ({
  getList: message.getList
});
const WrappedRegistrationForm = Form.create({ name: 'detailForm' })(TableList);
export default connect(mapState, mapDispatch)(WrappedRegistrationForm);
