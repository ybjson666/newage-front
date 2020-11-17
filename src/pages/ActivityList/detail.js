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
  Modal,
  Transfer
} from 'antd';
import * as volunteerListApi from '../../api/volunteerList';
import * as activityApi from '../../api/activity';
import UploadImg from '../../components/upload/UploadComponentOther';
import './detail.less';
import AddressChoose from '../../components/AddressChoose';
import moment from 'moment';
import { activityState } from '../../utils/utils';
import Quill from '../../components/quill';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { confirm } = Modal;

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
      showModal:false,
      targetKeys:[],
      selectedKeys:[],
      disabled:false,
      voluntes:[]
    };
    this.volunParamsData={
      activityId:"",
      type:"1"
    }
    this.imgPrev=sessionStorage.getItem('imgPrev');
  }

  componentDidMount() {
    // 在DidMount里去请求数据
    this.imgPrev=sessionStorage.getItem('imgPrev');
    if(this.props.type=='edit'){
      if(this.props.detailData){
        this.volunParamsData.activityId=this.props.detailData.activityRecruit&&this.props.detailData.activityRecruit.activityrecruitid||"";
      }
    }
    
    
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
        } else if ( this.props.type === 'edit' &&!faceUrl&&this.pageData.cover) {
          data.cover = this.pageData.cover;
        }else{
          message.error('请上传封面!');
          return;
        }
        if (values.rTime&& values.rTime[0]) {
          values.rStartTime = moment(values.rTime[0]).valueOf();
          values.rEndTime = moment(values.rTime[1]).valueOf();
          delete values.rTime;
        }
        if (values.aTime&&values.aTime[0]) {
          values.aStartTime = moment(values.aTime[0]).valueOf();
          values.aEndTime = moment(values.aTime[1]).valueOf();
          delete values.aTime;
        }
        if (values.aStartTime < values.rEndTime) {
          message.error('报名时间要在活动时间前!');
          return;
        }
       
        if (this.props.type === 'edit') {
          if(!values.activityname&&this.pageData.activityname){
            values.activityname=this.pageData.activityname;
          }
          values.activityrecruitid = this.pageData.activityrecruitid;
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
    this.setState({ nameEdit: true });
  };
  //tab 点击
  tabChange = (tabKey) => {
    if(tabKey==2){
        if(!this.state.voluntes.length){
          this.fetchInviteVolun();
        }
    }
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
    // const currentDate = moment().subtract(1, 'days').valueOf() ;
    const currentDate = moment().endOf('day').valueOf() ;
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
  //打开添加志愿者弹框
  openModal=()=>{
    const { detailData }=this.props;
    if(JSON.stringify(detailData)!=='{}'){
        if(detailData.activityRecruit.state==4){
          message.error('该活动已结束');
          return;
        }else{
          let volunNums=detailData.cusList.length;
          let total=detailData.activityRecruit.recruitcount;
          if(total>0&&volunNums>=total){
            confirm({
              title: '添加志愿者',
              content: '该活动志愿者剩余名额不足,是否确认添加?',
              onOk:() =>{
                this.setState({
                  showModal:true
                })
              }
            });
          }else{
            this.setState({
              showModal:true
            })
          }
          
          
        }
    }
  }
  closeModal=()=>{
    this.setState({
      showModal:false
    })
  }
  transChange=(nextTargetKeys, direction, moveKeys)=>{
    this.setState({ targetKeys: nextTargetKeys });
  }
  tranSelectChange=(sourceSelectedKeys, targetSelectedKeys)=>{
    let selectedKeys=[...sourceSelectedKeys, ...targetSelectedKeys];
    this.setState({ selectedKeys });
  }
 
  handleDisable = disabled => {
    this.setState({ disabled });
  };
  //获取邀请志愿者列表
  fetchInviteVolun=()=>{
    volunteerListApi.getInviteVoluns(this.volunParamsData).then((res) => {
      if(res.state===200){
          let result=res.data;
          let voluntes=result.map((item,index)=>{
            return {
              key:index,
              customerID:item.CustomerID,
              customerName:item.CustomerName
            }
          })
          this.setState({
            voluntes
          })
      }else{
        message.error(res.message)
      }
    })
  }
  //确认添加
  sureAdd=()=>{
    const {targetKeys,voluntes}=this.state;
    let arr=[];
    if(!targetKeys.length){
      message.error("请添加志愿者");
      return;
    }
    targetKeys.forEach((key)=>{
      voluntes.forEach(item=>{
        if(item.key==key){
          arr.push(item.customerID)
        }
      })
    })
    arr=arr.join(',');

    volunteerListApi.addInvite({type:'1',ids:arr,activityId:this.volunParamsData.activityId}).then((res) => {
      if(res.state===200){
          message.success('添加成功');
          this.props.fetchInfo(this.volunParamsData.activityId);
          this.fetchInviteVolun();
          this.setState({
            showModal:false,
            selectedKeys:[],
            targetKeys:[]
          })
      }else{
        message.error(res.message);
      }
    })
  }
  //格式化时间，将秒数转为hh::mm:ss形式
  trasTimes=(times)=>{
    if(times<1){
      return '00:00:00';
    }
    var sTime = parseInt(times);// 秒
    var mTime = 0;// 分
    var hTime = 0;// 时
    var result = '';
    if(sTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        mTime = parseInt(sTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        sTime = parseInt(sTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if(mTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hTime = parseInt(mTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            mTime = parseInt(mTime % 60);
        }
    }
    if(sTime >=0 && sTime < 10){
      result = "0" + parseInt(sTime) + "";
    }else{
        result = "" + parseInt(sTime) + "";
    }
    if(mTime >= 0 && mTime < 10) {
      result = "0" + parseInt(mTime) + ":" + result;
    }else{
      result = "" + parseInt(mTime) + ":" + result;
    }
    if(hTime >= 0 && hTime < 10) {
      result = "0" + parseInt(hTime) + ":" + result;
    }else{
      result = "" + parseInt(hTime) + ":" + result;
    }
    return result;
  }
  //将日期字符串转为时间戳
  tranStamp=(dateStr)=>{//将日期字符串转为时间戳
    if(dateStr){
      let dateTmp = dateStr.replace(/-/g,'/')   //为了兼容IOS，需先将字符串转换为'2018/9/11 9:11:23'
      return Date.parse(dateTmp)/1000 //返回'2018-9-12 9:11:23'的时间戳
    }else{
      return 0;
    }         
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { targetKeys, selectedKeys,disabled} = this.state;

    const columns = [
      {
        title: '志愿者名称',
        dataIndex: 'customername',
        align: 'left',
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      }, 
      {
        title: '加入时间',
        dataIndex: 'subdate',
        align: 'left',
        render: (tags, row) => {
          return (<span>{tags}</span>);
        }
      }, 
      {
        title: '签到时间',
        dataIndex: 'signtime',
        align: 'left',
        render: (tags, row) => {
          let times="";
          if(tags){
            times=tags;
          }else{
            times="暂未签到"
          }
          return (<span>{times}</span>);
        }
      }, 
      {
        title: '签退时间',
        dataIndex: 'signouttime',
        align: 'left',
        render: (tags, row) => {
          let times="";
          if(tags){
            times=tags;
          }else{
            times="暂未签退"
          }
          return (<span>{times}</span>);
        }
      },
      {
        title: '参与时长',
        dataIndex: 'costTime',
        align: 'left',
        render:(tags,row)=>{
          let startTime=this.tranStamp(row.signtime);
          let endTime=this.tranStamp(row.signouttime);
          let cost_time_stamp=endTime-startTime;
          let cost_time=this.trasTimes(cost_time_stamp)
          return <span>{cost_time}</span>
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
    let tableData = [];
    // this.cancleEdit=true;
    if (type === 'edit') {
      tableData = detailData.cusList;
    }
    if (type === 'edit' && this.pageData.state == 4) {
      this.cancleEdit = true;
    }
    if (type === 'edit' && !this.position) {
      this.position = {
        addresslatitude: this.pageData.addresslatitude,
        addresslongitude: this.pageData.addresslongitude
      };
    }

    const actvDesc="为避免活动创建失败，建议此处输入字数不超过500字!";
    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk} to={'/ActivityList'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/ActivityList'} className={'active'}>
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
                <TabPane tab="志愿者" key="2">
                </TabPane>
              </Tabs> : ''}
              <div className='detail-panel-part-activity'>
                <div className='panel-part-title-activity'>
                  {this.props.type === 'create' || (type === 'edit' && this.state.nameEdit && !this.cancleEdit) ?
                    <Form.Item style={{ 'marginBottom': '0', width: '100%' }} {...otherFormItemLayout}>
                      {getFieldDecorator('activityname', {
                        initialValue: this.pageData.activityname||this.pageData.title||'',
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
                      { type === 'edit' && !this.cancleEdit?<Icon className='can-editButton' type="edit" stlyle={{'position':'relative'}} />:''}
                    </span>}</div>
                {this.state.tabKey == '1' ? <div className='has-img'>
                    <div className='part-main'>
                      <UploadImg
                        type='text'
                        buttonText={'点击上传封面图'}
                        imgValue={this.pageData.cover?(this.imgPrev+this.pageData.cover): ''}
                        disabled={this.cancleEdit}
                        onChange={(res) => {
                          this.pageData.cover=res.data;
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
                      <Row>
                        <Form.Item label="服务类型"  {...tailFormItemLayout}>
                          {getFieldDecorator('activitytype', {
                            initialValue: this.pageData.activitytype ? this.pageData.activitytype + '' : undefined,
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
                        <Col span={12}>
                          <Form.Item label="招募人数">
                            {getFieldDecorator('recruitcount', {
                              initialValue: this.pageData.recruitcount,
                              rules: [
                                {
                                  required: false,
                                  message: '请输入招募人数！'
                                },{
                                  pattern: new RegExp(/^[0-9]\d*$/, "g"),
                                  message: '请输入正确的人数'
                                }
                              ]
                            })(<InputNumber disabled={this.cancleEdit} min={0} style={{ width: '200px' }}
                                            placeholder='请输入招募人数' max={99999}/>)}
                          </Form.Item>
                        </Col>
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
                            initialValue: type==='launch'||type === 'edit' ? [moment(this.pageData.recruitstarttime), moment(this.pageData.recruitendtime)] : [],
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
                            //选择时间后的监听方法
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
                            initialValue:  type==='launch'||type === 'edit'  ? [moment(this.pageData.activitystarttime), moment(this.pageData.activityendtime)] : [],
                            rules: [
                              {  validator:function(rule, value, callback){
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
                      <Row>
                        <Form.Item label="活动描述" ref={(node)=>
                        {
                          if(node){
                            this.formItem=node
                          }
                          }}  {...tailOtherFormItemLayout}>
                          {getFieldDecorator('activitydesc', {
                            initialValue: this.pageData.activitydesc||this.pageData.description,
                            rules: [
                              {
                                required: true,
                                message: '请输入活动描述！'
                              }
                            ]
                          })(<Quill
                            className='showText-area'
                            limit='501'
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
                            <Form.Item label="创建时间" >
                              {this.pageData.subdate}
                            </Form.Item>
                          </Col>
                        </Row> : ''}
                    </div>
                  </div> :
                  <div className='tableCont mainContentBox table-activity-detail' style={{ height: '500px' }}>
                    <div className="add-volunteer-warper">
                        <span onClick={this.openModal}>添加志愿者</span>
                    </div>
                    <Table
                      rowKey="customername"
                      columns={columns}
                      dataSource={tableData}
                      pagination={false}
                      scroll={{ x: '100%', y: '400px' }}
                    />
                  </div>
                }
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
          <Modal
            title="添加志愿者"
            visible={this.state.showModal}
            onCancel={this.closeModal}
            width={500}
            footer={null}
          >
            <div className="add-box">
              <Transfer
                dataSource={this.state.voluntes}
                titles={['志愿者', '已选择']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={this.transChange}
                onSelectChange={this.tranSelectChange}
                render={item => item.customerName}
                selectAllLabels={['全选']}
                
              />
              <div className="btn-block">
                <span onClick={this.sureAdd}>确认添加</span>
              </div>
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
