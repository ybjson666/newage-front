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
  Popconfirm,
  Modal
} from 'antd';
import * as activityApi from '../../api/ActivityPractice';
import UploadImg from '../../components/upload/UploadComponentOther';
import './detail.less';
import AddressChoose from '../../components/AddressChoose';
import moment from 'moment';
import { activityState } from '../../utils/utils';
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
      num: 0,
      detailVisible: false,
      participantData: {}
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.type === 'edit'&&!prevState.canGo) {
      return {
        tableData: nextProps.detailData && nextProps.detailData.cusList || [],
        canGo:true
      };
    }
      return {};
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
       
        if (values.rTime && values.rTime[0]) {
          values.rStartTime = moment(values.rTime[0]).valueOf();
          values.rEndTime = moment(values.rTime[1]).valueOf();
          delete values.rTime;
        }
        if (values.aTime && values.aTime[0]) {
          values.aStartTime = moment(values.aTime[0]).valueOf();
          values.aEndTime = moment(values.aTime[1]).valueOf();
          delete values.aTime;
        }
        if (values.aStartTime < values.rEndTime) {
          message.error('报名时间要在活动时间前!');
          return;
        }
       
        if (this.props.type === 'edit') {
          if (!values.activityname && this.pageData.activityname) {
            values.activityname = this.pageData.activityname;
          }
          // 活动id
          values.activitypracticeid  = this.pageData.activitypracticeid;

          values.userid = this.pageData.userid;
          this.onUpdate(values);



        } else {
         this.onSubmit(values);
        }
      }
    });
  };
  onSubmit = (values) => {
    this.setState({ loading: true });
    activityApi.activityAdd(values).then(res => {
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
    if(this.state.tabKey==2)return;
    this.setState({ nameEdit: true });
  };
  //tab 点击
  tabChange = (tabKey) => {
    this.setState({ tabKey });
  };
  // 开始时间限制
  disabledStartDate = (value) => {
    const currentDate = moment().subtract(1, 'days').valueOf();
    return moment(value).valueOf() < currentDate;
  };
  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  disabledStartDateTime = () => {
    const hour = moment().hour();
    const minute = moment().minute();
    return {
      disabledHours: () => this.range(0, 24).splice(0, hour),
      disabledMinutes: () => this.range(0, 60).splice(0, minute)
    };
  };
  //结束时间限制

  disabledEndDate = (value) => {
    // const currentDate = moment().subtract(1, 'days').valueOf();
    const currentDate = moment().endOf('day').valueOf() ;
    const useNowValue = moment(value).valueOf();
    const useValue = moment(useNowValue).valueOf();
    const rTime = this.props.form.getFieldValue('rTime');
    let rEndTime = '';
    if (rTime && Array.isArray(rTime) && rTime[1]) {
      rEndTime = moment(rTime[1]).valueOf();
    }
    return rEndTime ? useValue < rEndTime : useValue < currentDate;
  };
  // 分秒限制
  disabledEndDateTime = (_, type) => {
    const rTime = this.props.form.getFieldValue('rTime');
    let useTime = moment();
    let useDate = '';
    if (rTime && Array.isArray(rTime) && rTime[1]) {
      useTime = moment(rTime[1]);
      useDate = moment(rTime[1]).format('YYYY-MM-DD');
    } else {
      return {};
    }
    let hour = useTime.hour();
    let minute = useTime.minute();
    let second = useTime.second();
    // console.log(second);
    let currentHour;
    let currentMinute;
    let currentDate;
    if (Array.isArray(_) && type == 'start') {
      currentHour = moment(_[0]).hour();
      currentMinute = moment(_[0]).minute();
      currentDate = moment(_[0]).format('YYYY-MM-DD');
    } else if (Array.isArray(_) && type == 'end') {
      currentHour = moment(_[1]).hour();
      currentMinute = moment(_[1]).minute();
      currentDate = moment(_[1]).format('YYYY-MM-DD');
    } else {
      currentHour = moment(_).hour();
      currentMinute = moment(_).minute();
      currentDate = moment(_).format('YYYY-MM-DD');

    }
    let status = moment(useDate).isSame(moment(currentDate));
    if (second + 1 >= 60) {
      minute = minute + 1;
      second = 0;
      if (minute >= 60) {
        hour = hour + 1;
        minute = 0;
      }
    }
    return {
      disabledHours: () => status ? this.range(0, 24).splice(0, hour) : this.range(0, 24).splice(0, 0),
      disabledMinutes: () => status&&currentHour==hour ? this.range(0, 60).splice(0, minute) : this.range(0, 60).splice(0, 0),
      disabledSeconds: () => status&&currentHour==hour&&currentMinute==minute ? this.range(0, 60).splice(0, second) : this.range(0, 60).splice(0, 0)
    };
  };
  //参与者移除
  deleteConfirm = (rows) => {
    let str = [];
    rows.map(ele => {
      str.push(ele.activityenterid);
    });
    const data = {
      id: str.join(',')
    };
    activityApi.activityDeletePracticeEnter(data).then(res => {
      if (res.state == 200) {
        message.success('移除成功！');
        let currentTableData = this.state.tableData;
        let useData=currentTableData.filter((ele, index) => {
          return ele.activityenterid != rows[0].activityenterid
        });
        // this.tableData=useData;
        this.setState({tableData:useData,backStatus:true });
      }
    });
  };
// 参与者查看
  lookDetail = (row) => {
    activityApi.activityCheckActivityPracticeEnter({ id: row.activityenterid }).then(res => {
      if (!res || !res.success) {
        return;
      }
      const currentData = res.data;
      this.setState({
        detailVisible: true,
        participantData: {
          ActivityEnter: currentData.ActivityEnter || {},
          thridInfo: currentData.CustomerInfo && currentData.CustomerInfo.thridInfo || {}
        }
      });
    });
  };
  // 关闭详情窗口
  handleCancel = () => {
    this.setState({ detailVisible: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // 表头
    const columns = [
      {
        title: '参与者名称',
        dataIndex: 'customername',
        align: 'left',
        width:150,
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, {
        title: '加入时间',
        dataIndex: 'subdate',
        align: 'left',
        width:160,
        render: (tags, row) => {
          return (<span>{tags}</span>);
        }
      }, {
        title: '是否审核',
        dataIndex: 'checkerid',
        align: 'left',
        width:100,
        render: (tags, row) => {
          if(tags){
            return (<span>{'已审核'}</span>);
          }else{
            return (<span>{'未经审核'}</span>);
          }

        }
      }, {
        title: '签到时间',
        dataIndex: 'signtime',
        align: 'left',
        width:200,
        render: (tags, row) => {
          let times="";
          if(tags){
            times=tags
          }else{
            times="暂未签到"
          }
          return (<span>{times}</span>);
        }
      }, {
        title: '签退时间',
        dataIndex: 'signouttime',
        width:200,
        align: 'left',
        render: (tags, row) => {
          let times="";
          if(tags){
            times=tags
          }else{
            times="暂未签退"
          }
          return (<span>{times}</span>);
        }
      }, {
        title: '操作',
        align: 'left',
        width: 120,
        render: (tags, row) => {
          return (
            <div role="button" tabIndex="-1" style={{ whiteSpace: 'nowrap' }} onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
            }}>
              <a role="button" tabIndex="0" className='tableOperateButton' onClick={(e) => {
                this.lookDetail(row || {});
              }}>查看</a>
              <Popconfirm placement="right" title={'此操作不可撤回，是否确认将该用户从此活动的参与者中移除?'} okType={'danger'}
                          onConfirm={() => this.deleteConfirm([row], 1)}
                          okText="确认" cancelText="取消">
                <a role="button" className='tableOperateButton' type="link">移除</a>
              </Popconfirm>
            </div>
          );
        }
      }

    ];
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
    this.pageData = type === 'edit' ? detailData.activityRecruit : {};
    // let tableData = [];
    // this.cancleEdit=true;
    // if (type === 'edit') {
    //   tableData = detailData.cusList;
    // }
    if (type === 'edit' && this.pageData.state ==4) {
      this.cancleEdit = true;
    }
    if (type === 'edit' && !this.position) {
      this.position = {
        addresslatitude: this.pageData.addresslatitude,
        addresslongitude: this.pageData.addresslongitude
      };
    }

    const actvDesc = '为避免活动创建失败，建议此处输入字数不超过500字!';
    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk} to={'/ActivityPracticeList'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/ActivityPracticeList'} className={'active'}>
              {this.props.type === 'create' ? '新建活动' : '活动详情'}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox detail-part'>
          <Spin tip="保存中..." spinning={this.state.loading}>
            <Form className='form-part' {...formItemLayout} onSubmit={this.handleSubmit}>
              {type != 'create' ? <Tabs defaultActiveKey="1" activeKey={this.state.tabKey} onChange={this.tabChange}>
                <TabPane tab="活动信息" key="1">
                </TabPane>
                <TabPane tab="参与者" key="2">
                </TabPane>
              </Tabs> : ''}
              <div className='detail-panel-part-activity'>
                <div className='panel-part-title-activity'>
                  {this.props.type === 'create' || (type === 'edit' && this.state.nameEdit && !this.cancleEdit) ?
                    <Form.Item style={{ 'marginBottom': '0', width: '100%' }} {...otherFormItemLayout}>
                      {getFieldDecorator('activityname', {
                        initialValue: this.pageData.activityname || this.pageData.title || '',
                        rules: [
                          {
                            required: true,
                            message: '请输入活动名称！'
                          }
                        ]
                      })(<Input maxLength={30} placeholder='请输入活动名称'/>)}
                    </Form.Item> : <span className='title-show-part' role='button' tabIndex='-1'
                                         onClick={this.editAtivityName}>
                      {this.pageData.activityname}
                      {type === 'edit' && !this.cancleEdit&&this.state.tabKey==1 ?
                        <Icon className='can-editButton' type="edit" stlyle={{ 'position': 'relative' }}/> : ''}
                    </span>}</div>
                {this.state.tabKey == '1' ? <div className='has-img'>
                    <div className='part-main'>
                      <UploadImg
                        type='text'
                        buttonText={'点击上传封面图'}
                        imgValue={this.pageData.cover ? (this.imgPrev + this.pageData.cover) : ''}
                        disabled={this.cancleEdit}
                        onChange={(res) => {
                          this.pageData.cover = res.data;
                          this.faceUrl = res.data;
                          this.setState({ num: this.state.num + 1 });
                        }}
                      />
                      <p style={{ 'textAlign': 'center', 'margin': '10px 0' }}>建议上传16:9的jpg,png格式图片,图片大小不超过5M</p>
                      <Row className={'row-content'}>
                        <Col span={12}>
                          <Form.Item label="活动地区">
                            {getFieldDecorator('areaid', {
                              initialValue: this.pageData.areaid ? this.pageData.areaid + '' : undefined,
                              rules: [
                                {
                                  required: true,
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
                      {/*<Row>*/}
                      {/*  <Form.Item label="服务类型"  {...tailFormItemLayout}>*/}
                      {/*    {getFieldDecorator('activitytype', {*/}
                      {/*      initialValue: this.pageData.activitytype ? this.pageData.activitytype + '' : undefined,*/}
                      {/*      rules: []*/}
                      {/*    })(<Select disabled={this.cancleEdit} style={{ width: '200px' }} placeholder='请选择服务类型'>*/}
                      {/*      {serverType.map((ele, index) => {*/}
                      {/*        return (<Select.Option key={index}*/}
                      {/*                               value={ele.dictionaryId + ''}>{ele.dictionaryValue}</Select.Option>);*/}
                      {/*      })}*/}
                      {/*    </Select>)}*/}
                      {/*  </Form.Item>*/}
                      {/*</Row>*/}
                      <Row>
                        <Col span={12}>
                          <Form.Item label="活动人数">
                            {getFieldDecorator('recruitcount', {
                              initialValue: this.pageData.recruitcount,
                              rules: [
                                {
                                  required: false,
                                  message: '请输入活动人数！'
                                }, {
                                  pattern: new RegExp(/^[0-9]\d*$/, 'g'),
                                  message: '请输入正确的人数'
                                }
                              ]
                            })(<InputNumber disabled={this.cancleEdit} min={0} style={{ width: '200px' }}
                                            placeholder='请输入活动人数' max={99999}/>)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="签到半径">
                            {getFieldDecorator('checkrange', {
                              initialValue: this.pageData.checkrange,
                              rules: [
                                {
                                  required: true,
                                  message: '请输入签到半径!'
                                }
                              ]
                            })(<InputNumber max={10000} disabled={this.cancleEdit} min={1} style={{ width: '200px' }}
                                            placeholder='请填写签到半径'/>)} <span style={{ 'marginLeft': '5px' }}>米</span>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Item label="报名时间"  {...tailFormItemLayout}>
                          {getFieldDecorator('rTime', {
                            initialValue: type === 'launch' || type === 'edit' ? [moment(this.pageData.recruitstarttime), moment(this.pageData.recruitendtime)] : [],
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
                              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                            }}
                            onChange={(value) => {
                              this.props.form.setFieldsValue(
                                { 'aTime': [moment(moment(value[1]).add('1', 'seconds')), undefined] }
                              );
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
                            initialValue: type === 'launch' || type === 'edit' ? [moment(this.pageData.activitystarttime), moment(this.pageData.activityendtime)] : [],
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
                              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                            }}
                            placeholder={['开始时间', '结束时间']}
                            style={{ width: '380px' }}>
                          </RangePicker>)}
                        </Form.Item>
                      </Row>
                      <Row>
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
                      </Row>
                      <Row>
                        <Form.Item label="活动描述" ref={(node) => {
                          if (node) {
                            this.formItem = node;
                          }
                        }}  {...tailOtherFormItemLayout}>
                          {getFieldDecorator('activitydesc', {
                            initialValue: this.pageData.activitydesc || this.pageData.description,
                            rules: [
                              {
                                required: true,
                                message: '请输入活动描述！'
                              }
                            ]
                          })(<Quill
                              className='showText-area'
                              limit='500'
                              disabled={this.cancleEdit}
                              rows={4}
                              placeholder={actvDesc}
                            />
                          )}
                        </Form.Item>
                      </Row>
                      {type === 'edit' ?
                        <Row>
                          <Form.Item label="活动状态"  {...tailFormItemLayout}>
                            {activityState[this.pageData.state]}
                          </Form.Item>
                        </Row> : ''}
                      {type === 'edit' ?
                        <Row>
                          <Col span={12}>
                            <Form.Item label="创建人">
                              {this.pageData.subuser}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="创建时间">
                              {this.pageData.subdate}
                            </Form.Item>
                          </Col>
                        </Row> : ''}
                    </div>
                  </div> :
                  <div className='tableCont mainContentBox table-activity-detail' style={{ height: '400px' }}>
                    <Table
                      rowKey="activityenterid"
                      columns={columns}
                      dataSource={this.state.tableData}
                      pagination={false}
                      scroll={{ x: '100%', y: '300px' }}
                    />
                  </div>
                }
              </div>
              <div className='button-part'>
                <Button onClick={()=>this.props.back(this.state.backStatus)}>
                  返回
                </Button>
                {this.cancleEdit||this.state.tabKey==2 ? '' : <Button type="primary" htmlType="submit">
                  保存
                </Button>}
              </div>
            </Form>
          </Spin>
          <Modal
            title="报名详情"
            visible={this.state.detailVisible}
            className='activityPractice-detail-modal'
            onCancel={this.handleCancel}
            footer={null}
          >
            <div className='line-part'>
              <div className='label-part'>账号头像:</div>
              <div
                className='content-text'>
                <img className='avatar-img' src= {this.state.participantData.thridInfo && this.state.participantData.thridInfo.avatar}  alt=""/>
               </div>
            </div>
            <div className='line-part'>
              <div className='label-part'>账号名:</div>
              <div
                className='content-text'>{this.state.participantData.thridInfo && this.state.participantData.thridInfo.nickname}</div>
            </div>
            <div className='line-part'>
              <div className='label-part'>真实姓名:</div>
              <div
                className='content-text'>{this.state.participantData.thridInfo && this.state.participantData.thridInfo.realName}</div>
            </div>
            <div className='line-part'>
              <div className='label-part'>联系电话:</div>
              <div
                className='content-text'>{this.state.participantData.thridInfo && this.state.participantData.thridInfo.mobile}</div>
            </div>
            <div className='line-part word-tips'>
              <div className='label-part'>报名说明:</div>
              <div
                className='content-text'>{this.state.participantData.ActivityEnter && this.state.participantData.ActivityEnter.remark}</div>
            </div>
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
