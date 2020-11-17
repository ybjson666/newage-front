import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import {
  Tabs,
  Tooltip,
  Button,
  Breadcrumb,
  Input,
  Select,
  Form,
  Table,
  Row,
  Col,
  Radio,
  message,
  Spin,
  Modal,
  DatePicker,
  InputNumber
} from 'antd';
import * as volunteerListApi from '../../api/volunteerList';
import UploadImg from '../../components/upload/UploadComponent';
import UploadImg2 from '../../components/upload/UploadComponentOther';
import './detail.less';
import { isCardEqual, phoneEqual,activityState } from '../../utils/utils';
import moment from 'moment';
import * as activityApi from '../../api/activity';
import * as activityPracApi from '../../api/ActivityPractice.js';
import Quill from '../../components/quill';


const { confirm } = Modal;

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
      tabKey:'1',
      actvDatas:[],
      totalNums:0,
      actvNums:0,
      actvAllTimes:"",
      emptyTxt:"加载中...",
      isLoading:false,
      showModify:false,
      signInStmp:"",
      signOutStmp:"",
      showActvModal:false,
      actvInfo:{},
      isLoadActv:false
    };
    this.actv_start_time="";
    this.actv_end_time="";
    this.imgPrev = sessionStorage.getItem('imgPrev');
    this.actvDataParams={
      pageno:1,
      pagesize:10,
      customerId:""
    }
    this.modifyDatas={
      id:"",
      stime:"",
      etime:"",
      type:""
    }
  }

  componentDidMount() {
    // 在DidMount里去请求数据
    const { getList } = this.props;
    const { params } = this.state;
    this.actvDataParams.customerId=this.props.customerId;
    this.getActvDatas();
    // this.getDataList();
    // getList(params);
  }

  // 全选、多选事件
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  //获取活动数据
  getActvDatas=()=>{
    volunteerListApi.getActvData(this.actvDataParams).then(res => {
        if(res.state===200){
            let secNums=0;
            res.data.data.map(item=>{
              secNums+=item.times
            });
            this.setState({
              actvDatas:res.data.data,
              totalNums:res.data.totalCount,
              actvNums:res.data.all,
              actvAllTimes:this.trasTimes(secNums)
            },()=>{
              if(!res.data.data.length){
                this.setState({
                  emptyTxt:"暂无数据"
                })
              }
            })
        }else{
          message.error(res.message);
          this.setState({
            isLoading:false
          })
        }
    })
  }
  // 行选择
  onRowEvent = row => {
    const selectedRowKeys = [];
    this.setState({ selectedRowKeys });
  };

  //设置暂未签到、暂未签退
  setNoSignText=(tim,stag)=>{
      var requt = '';
      if(tim===null || tim < 1){
          if(stag === 1){
            requt='暂未签到';
          }else if(stag === 2){
            requt='暂未签退';
          }
          return requt;
      }
      return tim;
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
    if(sTime >= 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        mTime = parseInt(sTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        sTime = parseInt(sTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if(mTime >= 60) {
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
    }
  }
// 获取列表
  getDataList = () => {
    const listData = {};
    listData.params = {
      pageno: 1,
      pagesize: 20
    };
    volunteerListApi.getVolunteerList(listData).then(res => {
      this.setState({
        tableData: res.data.data,
        totalCount: res.data.totalCount
      });
    });
  };
  // 上传成功
  uploadSuccess = (res) => {
    this.faceUrl = res.data;
  };
  handleSubmit = (e) => {
    e && e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const faceUrl = this.faceUrl ? this.imgPrev + this.faceUrl : this.props.detailData && this.props.detailData.thridInfo && this.props.detailData.thridInfo.avatar || '';
        if (faceUrl) {
          values.faceUrl = faceUrl;
        }
        values.uid = this.props.detailData && this.props.detailData.thridInfo && this.props.detailData.thridInfo.userid;
        this.onSubmit(values);
      }
    });
  };
  onSubmit = (values) => {
    this.setState({ loading: true });
    volunteerListApi.customModify(values).then(res => {
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
  tabChange=(tabKey)=>{
    this.setState({ tabKey });
  }
  onShowSizeChange = (page, pageSize) => {
    this.actvDataParams.pageno = page;
    this.actvDataParams.pagesize = pageSize;
    this.getActvDatas();
  };
  //关闭修改时长弹框
  closeModal=()=>{
    this.setState({
      showModify:false,
      signInStmp:"",
      signOutStmp:""
    })
  }
  //打开修改时长弹框
  openModals=(actv)=>{
    this.modifyDatas.id=actv.ActivitySignId;
    this.modifyDatas.type=actv.tag;
    this.modifyDatas.id=actv.ActivitySignId;
    this.modifyDatas.stime=this.tranStamp(actv.SignTime)*1000;
    this.modifyDatas.etime=this.tranStamp(actv.SignOutTime)*1000;
    this.actv_start_time=this.tranStamp(actv.stime)*1000;
    this.actv_end_time=this.tranStamp(actv.etime)*1000;
    this.setState({
      showModify:true,
      signInStmp:actv.SignTime,
      signOutStmp:actv.SignOutTime
    })
  }
  //选择签到时间
  signInChange=(value)=>{
    if(value){
      let time = value._d.getTime();
      this.modifyDatas.stime=time;
    }else{
      this.modifyDatas.stime="";
    }

  }
  //选择签退时间
  signOutChange=(value)=>{
      if(value){
        let time = value._d.getTime();
        this.modifyDatas.etime=time;
      }else{
        this.modifyDatas.etime="";
      }

  }
  //确认修改
  handleModify=()=>{
    const {  actv_start_time,actv_end_time,modifyDatas }=this;
    console.log(this.modifyDatas)
    if(!modifyDatas.stime){
      message.error("请选择签到时间");
      return;
    }else if(!modifyDatas.etime){
      message.error("请选择签退时间");
      return;
    }
    let text="所设时间超出了该活动时间段，是否确认保存设置？"
    if(modifyDatas.stime&&modifyDatas.etime){
      if(modifyDatas.stime>modifyDatas.etime){
        message.error("活动签到时间不能晚于活动签退时间");
        return;
      }
    }

    if(modifyDatas.stime<actv_start_time||modifyDatas.etime>actv_end_time||modifyDatas.stime>actv_end_time){
      confirm({
        title: '确认修改',
        content: text,
        onOk:()=>{
          this.sureModify()
        }
      });
    }else{
      this.sureModify()
    }
  }
  //确认修改时长
  sureModify=()=>{
    volunteerListApi.modifyTimes(this.modifyDatas).then(res => {
        if(res.state==200){
          message.info('修改成功');
          this.getActvDatas();
          this.setState({
            showModify:false
          })
        }else{
          message.error(res.message);
        }
    })
  }
  //查看活动详情
  seekActv=(row)=>{
    let { tag,aid }=row;
      this.setState({
        showActvModal:true,
        isLoadActv:true
      },()=>{
        if(tag=='2'){//招募活动
          this.fetchInfo(aid);
        }else{
          this.fetchPracInfo(aid);
        }
      })
  }
  //关闭活动详情弹框
  closeActvModal=()=>{
      this.setState({
        showActvModal:false,
        actvInfo:{}
      })
  }
  //获取活动详情数据
  fetchInfo=(actvId)=>{//获取招募活动详情
    activityApi.activityDetail({id:actvId}).then(res => {
      if (res.success) {
        this.setState({
          actvInfo: res.data.activityRecruit,
          isLoadActv:false
        });
      }else{
        message.error(res.message)
      }
    });
  }
  //获取实践活动详情
  fetchPracInfo=(actvId)=>{//获取实践活动详情
    activityPracApi.activityDetail({id:actvId}).then(res => {
      if (res.success) {
        this.setState({
          actvInfo: res.data.activityRecruit,
          isLoadActv:false
        });
      }else{
        message.error(res.message)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { actvInfo }=this.state;

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
    const { detailData = {}, serverArea = [], serverType = [], zzmm = [], jyxl = [],spiderData=[],pageStag } = this.props;
    const thridInfo = detailData.thridInfo;

    const colums=[
      {
        title: '活动名称',
        dataIndex: 'title',
        align: 'left',
        render: (text, row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      },
      {
        title: '活动状态',
        dataIndex: 'states',
        align: 'left',
        width:100,
        render:(tags,row) =>(
          <span>{activityState[row.state]}</span>
        )
        ,
      },
      {
        title: '签到时间',
        dataIndex: 'SignTime',
        align: 'left',
         //添加暂未签到
        render:(tags,row)=>(
          <span>{this.setNoSignText(row.SignTime,1)}</span>
        )
      },
      {
        title: '签退时间',
        dataIndex: 'SignOutTime',
        align: 'left',
        //添加暂未签退
        render:(tags,row)=>(
          <span>{this.setNoSignText(row.SignOutTime,2)}</span>
        )
      },
      {
        title: '参与时长',
        dataIndex: 'join_time',
        align: 'left',
        render:(tags,row)=>(
          <span>{this.trasTimes(row.times)}</span>
        )
      },
      {
        title: '操作',
        dataIndex: 'works',
        align: 'left',
        render:(tags,row)=> {
          return(
            <div className="btn-block">
              <span className="change-btn" onClick={()=>{this.openModals(row)}}>修改</span>
              <span className="seek-btn" onClick={()=>{this.seekActv(row)}}>查看活动</span>
            </div>
          )
        },
      },
    ]

    const pagination = {
      'pageSize': this.actvDataParams.pagesize,
      'total': this.state.totalNums,
      'current': this.actvDataParams.pageno,
      'showTotal': total => `共 ${total} 条数据`,
      'showSizeChanger': true,
      'onShowSizeChange': this.onShowSizeChange,
      'onChange': this.onShowSizeChange
    };
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk} to={'/'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/'} className={'active'}>
              志愿者详情
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox detail-part'>
          <Spin tip="保存中..." spinning={this.state.loading}>
            <Form className='form-part' {...formItemLayout} onSubmit={this.handleSubmit}>
            <Tabs defaultActiveKey="1" activeKey={this.state.tabKey} onChange={this.tabChange}>
              <TabPane tab="志愿者信息" key="1"></TabPane>
              <TabPane tab="活动数据" key="2"></TabPane>
            </Tabs>
            {
              this.state.tabKey==='1'?<div className="voluntInfo-wraper">
              <div className='detail-panel-part'>
                <div className='panel-part-title'>基本信息</div>
                <div className='has-img'>
                  <div className='img-part'>
                    <UploadImg success={this.uploadSuccess} type={'upload'}
                              src={thridInfo.avatar ? thridInfo.avatar : ''} className='avator-part'/>
                  </div>
                  <div className='part-main'>
                    <Row>
                      <Form.Item label="用户ID:" {...tailFormItemLayout}>
                        {thridInfo.userid}
                      </Form.Item>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="账号">
                          {getFieldDecorator('mobile', {
                            initialValue: thridInfo.mobile,
                            rules: [
                              {
                                required: true,
                                message: '请输入账号！'
                              }
                            ]
                          })(<Input disabled={true} style={{ width: '200px' }}/>)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="账号名称">
                          {getFieldDecorator('nickname', {
                            initialValue: thridInfo.nickname,
                            rules: [
                              {
                                required: true,
                                message: '请输入账号名称!'
                              }
                            ]
                          })(<Input disabled={true} style={{ width: '200px' }}/>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Item label="性别:" {...tailFormItemLayout}>
                        {getFieldDecorator('sex', {
                          initialValue: thridInfo.sex < 1 ? undefined : thridInfo.sex,
                          rules: [
                            {
                              required: false,
                              message: '请选择性别！'
                            }
                          ]
                        })(<Radio.Group disabled={true}   onChange={this.onChange}>
                          <Radio value={1}>男</Radio>
                          <Radio value={2}>女</Radio>
                        </Radio.Group>)}
                      </Form.Item>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="注册时间">
                          {thridInfo.regtime}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="最后登录时间">
                          {thridInfo.loginTime}
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <div className='detail-panel-part'>
                <div className='panel-part-title'>志愿者信息</div>
                <div className='has-img'>
                  <div className='img-part'>
                    <UploadImg className='id-pic'
                              src={detailData.idcardfronturl ? (this.imgPrev + detailData.idcardfronturl) : ''}
                              buttonText={'查看'}
                              type={'look'}/>
                      <UploadImg className='id-pic back-id'
                                src={detailData.idcardbackurl ? (this.imgPrev + detailData.idcardbackurl) : ''}
                                buttonText={'查看'}
                                type={'look'}
                      />
                  </div>
                  <div className='part-main'>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="真实姓名">
                          {getFieldDecorator('realName', {
                            initialValue:  detailData.realname,
                            rules: [
                              {
                                required: true,
                                message: '请输入真实姓名！'
                              }
                            ]
                          })(<Input style={{ width: '200px' }}/>)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="联系电话">
                          {getFieldDecorator('contactphone', {
                            initialValue: detailData.contactphone,
                            rules: [
                              {
                                required: true,
                                message: '请输入联系电话!'
                              }, {
                                pattern: phoneEqual,
                                message: '请输入正确电话号码!'
                              }
                            ]
                          })(<Input style={{ width: '200px' }}/>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="身份证号码">
                          {getFieldDecorator('idcardno', {
                            initialValue: detailData.idcardno,
                            rules: [
                              {
                                required: true,
                                message: '请输入身份证号码！'
                              }, {
                                pattern: isCardEqual,
                                message: '请输入正确身份证!'
                              }
                            ]
                          })(<Input style={{ width: '200px' }}/>)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="邮箱">
                          {getFieldDecorator('email', {
                            initialValue: detailData.email || '',
                            rules: [
                              {
                                required: true,
                                message: '请输入邮箱!'
                              }, {
                                pattern: "",
                                message: '请输入正确邮箱!'
                              }
                            ]
                          })(<Input style={{ width: '200px' }}/>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="学历">
                          {getFieldDecorator('education', {
                            initialValue: detailData.education ? detailData.education + '' : '',
                            rules: [
                              {
                                required: true,
                                message: '请选择学历！'
                              }
                            ]
                          })(<Select style={{ width: '200px' }}>
                            {jyxl.map((ele, index) => {
                              return (
                                <Select.Option key={index} value={ele.DictID + ''}>{ele.DictName}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="政治面貌">
                          {getFieldDecorator('politicallevel', {
                            initialValue: detailData.politicallevel ? detailData.politicallevel + '' : '',
                            rules: [
                              {
                                required: true,
                                message: '请选择政治面貌!'
                              }
                            ]
                          })(<Select style={{ width: '200px' }}>
                            {zzmm.map((ele, index) => {
                              return (
                                <Select.Option key={index} value={ele.DictID + ''}>{ele.DictName}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="服务类型">
                          {getFieldDecorator('serverType', {
                            initialValue: detailData.servicetype ? detailData.servicetype + '' : undefined,
                            rules: [
                              {
                                required: true,
                                message: '请选择服务类型！'
                              }
                            ]
                          })(<Select style={{ width: '200px' }}>
                            {serverType.map((ele, index) => {
                              return (<Select.Option key={index}
                                                    value={ele.dictionaryId}>{ele.dictionaryValue}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="服务地区">
                          {getFieldDecorator('serverArea', {
                            initialValue: detailData.servicearea ? detailData.servicearea + '' : undefined,
                            rules: [
                              {
                                required: true,
                                message: '请输入服务地区!'
                              }
                            ]
                          })(<Select style={{ width: '200px' }}>
                            {serverArea.map((ele, index) => {
                              return (<Select.Option key={index}
                                                    value={ele.dictionaryId}>{ele.dictionaryValue}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      {
                        pageStag==='B'?<Col span={12}>
                        <Form.Item label="所属组织">
                          {getFieldDecorator('spiderId', {
                            initialValue: detailData.spiderid ? detailData.spiderid + '' : undefined,
                            rules: [
                              {
                                required: true,
                                message: '请选择所属组织!'
                              }
                            ]
                          })(<Select showSearch
                                    // showArrow={false}
                                    dropdownMenuStyle={{maxHeight:'200px'}}
                                    disabled={this.props.pageStag=='B'?false:true}
                                    filterOption={(input, option) =>{
                                        return  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }} style={{ width: '200px' }}>
                            {spiderData.map((ele, index) => {
                              return (<Select.Option key={index}
                                                    value={ele.userId}>{ele.userName}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Col>:null
                      }
                      <Col span={12}>
                        <Form.Item label="工作单位">
                          {getFieldDecorator('workUnit', {
                            initialValue: detailData.workunit ? detailData.workunit + '' : undefined,
                            rules: [
                              {
                                required: true,
                                message: '请输入工作单位'
                              }
                            ]
                          })(<Input style={{ width: '200px'}} maxLength={12}/>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="审核人">
                          {detailData.checkusername}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="审核时间">
                          {detailData.checkdate}
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <div className='button-part'>
                <Button onClick={this.props.back}>
                  返回
                </Button>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </div>
            </div>:
            <div className="actvDataInfo-wraper">
              <h2 className="actv-title">活动统计</h2>
              <p className="caclu-block">参与活动总数：{this.state.actvDatas.length} , 参与总时长：{this.state.actvAllTimes}</p>
              <div className="actvData-table-block">
                <Table
                  rowKey="ActivitySignId"
                  columns={colums}
                  pagination={pagination}
                  dataSource={this.state.actvDatas}
                  locale={{emptyText:this.state.emptyTxt}}
                  loading={this.state.isLoading}
                  scroll={{ x: '100%', y: 'calc(100vh - 50px)' }}
                />
              </div>
            </div>
            }
            </Form>
          </Spin>
          {
            this.state.showModify?<Modal
            title="时长修改"
            visible={this.state.showModify}
            className='modi-time-modal'
            onCancel={this.closeModal}
            footer={null}
         >
           <div className="mody-modal-wraper">
             <Row className="modal-rows">
               <span className="row-label">签到时间</span>
               <div className="date-pick-wraps">
                 <DatePicker defaultValue={this.state.signInStmp?moment(this.state.signInStmp, dateFormat):undefined}
                 format={dateFormat} style={{width:300}}
                 onChange={this.signInChange}
                 showTime
                 />
               </div>
             </Row>
             <Row className="modal-rows last-rows">
               <span className="row-label">签退时间</span>
               <div className="date-pick-wraps">
                 <DatePicker defaultValue={this.state.signOutStmp?moment(this.state.signOutStmp, dateFormat):undefined}
                 format={dateFormat} style={{width:300}}
                 onChange={this.signOutChange}
                 showTime/>
               </div>
             </Row>
             <div className="btn-block">
               <Button className="sure-btn" onClick={this.handleModify}>确认修改</Button>
             </div>
           </div>
         </Modal>:null
          }

          {
            this.state.showActvModal?
            <Modal
              title="活动详情"
              visible={this.state.showActvModal}
              className='actv-modal'
              onCancel={this.closeActvModal}
              footer={null}
              width={1000}
            >
              <Spin spinning={this.state.isLoadActv}>
                  <div className="actvInfo-wrapers">
                    <Form className='form-part' {...formItemLayout}>
                      <h2 className="actv-title">{actvInfo.activityname}</h2>
                      <div className="actvInfo-contents">
                        <div className="actv-cover">
                          <UploadImg2
                            type='text'
                            buttonText={'封面图片'}
                            imgValue={actvInfo.cover?(this.imgPrev+actvInfo.cover): ''}
                            disabled={true}
                          />
                        </div>
                        <Row className="row-content">
                            <Col span={12}>
                              <Form.Item label="活动地区">
                                {getFieldDecorator('areaid', {
                                  initialValue: actvInfo.areaid ? actvInfo.areaid + '' : undefined,
                                  rules: [
                                    {
                                      required: true,
                                      message: '暂无活动地区'
                                    }
                                  ]
                                })(<Select disabled={true}
                                    style={{width:150}}
                                  placeholder='请选择活动地区'>
                                  {serverArea.map((ele, index) => {
                                    return (<Select.Option key={index}value={ele.dictionaryId + ''}>{ele.dictionaryValue}</Select.Option>);
                                  })}
                                </Select>)}
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item label="活动地址">
                                {getFieldDecorator('address', {
                                  initialValue: actvInfo.address,
                                  rules: [
                                    {
                                      required: true,
                                      message: '请选择活动地址！'
                                    }
                                  ]
                                })(<Input disabled={true} placeholder='暂无活动地址' />)}
                              </Form.Item>
                            </Col>
                        </Row>
                        <Row className="row-content">
                          <Form.Item label="服务类型"  {...tailFormItemLayout}>
                            {getFieldDecorator('activitytype', {
                              initialValue: actvInfo.activitytype ? actvInfo.activitytype + '' : undefined,
                              rules: []
                            })(<Select disabled={this.cancleEdit} style={{ width: '200px' }} placeholder='暂无服务类型' disabled={true}>
                              {serverType.map((ele, index) => {
                                return (<Select.Option key={index} value={ele.dictionaryId + ''}>{ele.dictionaryValue}</Select.Option>);
                              })}
                            </Select>)}
                          </Form.Item>
                        </Row>
                        <Row className="row-content">
                          <Col span={12}>
                            <Form.Item label="招募人数">
                              {getFieldDecorator('recruitcount', {
                                initialValue: actvInfo.recruitcount,
                                rules: [
                                  {
                                    required: false,
                                    message: '请输入招募人数！'
                                  },{
                                    pattern: new RegExp(/^[0-9]\d*$/, "g"),
                                    message: '请输入正确的人数'
                                  }
                                ]
                              })(<InputNumber disabled={true} min={0} style={{ width: '200px' }}
                                              placeholder='暂无招募人数' max={99999}/>)}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="签到半径" >
                              {getFieldDecorator('checkrange', {
                                initialValue: actvInfo.checkrange,
                                rules: [
                                  {
                                    required: true,
                                    message: '暂无签到半径!'
                                  }
                                ]
                              })(<InputNumber max={10000} disabled={true} min={1} style={{ width: '200px' }}
                                              placeholder='暂无签到半径'/>)} <span style={{'marginLeft':'5px'}}>米</span>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row className="row-content">
                          <Form.Item label="报名时间"  {...tailFormItemLayout}>
                            {getFieldDecorator('rTime', {
                              initialValue: [moment(actvInfo.recruitstarttime), moment(actvInfo.recruitendtime)] || [],
                              rules: [
                                {
                                  required: true,
                                  message: '暂无报名时间！'
                                }
                              ]
                            })(<RangePicker
                              disabled={true}
                              showTime={{
                                hideDisabledOptions: true,
                                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                              }}
                              format="YYYY-MM-DD HH:mm:ss"
                              placeholder={['开始时间', '结束时间']}
                              style={{ width: '380px' }}>
                            </RangePicker>)}
                          </Form.Item>
                        </Row>
                        <Row className="row-content">
                          <Form.Item label="活动时间"  {...tailFormItemLayout}>
                            {getFieldDecorator('aTime', {
                              initialValue: [moment(actvInfo.activitystarttime), moment(actvInfo.activityendtime)] || [],
                              rules: [
                                {
                                  required: true,
                                  message: '暂无活动时间！'
                                }
                              ]
                            })(<RangePicker
                                disabled={true}
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime={{
                                  hideDisabledOptions: true,
                                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                }}
                                placeholder={['开始时间', '结束时间']}
                                style={{ width: '380px' }}>
                            </RangePicker>)}
                          </Form.Item>
                        </Row>
                        <Row className="row-content">
                          <Form.Item label="活动描述" ref={(node)=>
                          {
                            if(node){
                              this.formItem=node
                            }
                            }}  {...tailOtherFormItemLayout}>
                            {getFieldDecorator('activitydesc', {
                              initialValue: actvInfo.activitydesc||actvInfo.description,
                              rules: [
                                {
                                  required: true,
                                  message: '请输入活动描述！'
                                }
                              ]
                            })(<Quill
                              className='showText-area'
                              limit='500'
                              disabled={true}
                              rows={4}
                              placeholder='暂无活动描述'
                              />
                            )}
                          </Form.Item>
                        </Row>
                        <Row className="row-content">
                          <Form.Item label="活动状态"  {...tailFormItemLayout}>
                            {activityState[actvInfo.state]}
                          </Form.Item>
                        </Row>
                        <Row className="row-content">
                          <Col span={12}>
                            <Form.Item label="创建人">
                                {actvInfo.subuser}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="创建时间" >
                              {actvInfo.subdate}
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </div>
              </Spin>
            </Modal>
            :null
          }
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
const TableRouter=withRouter(TableList);
const WrappedRegistrationForm = Form.create({ name: 'detailForm' })(TableRouter);
export default connect(mapState, mapDispatch)(WrappedRegistrationForm);
