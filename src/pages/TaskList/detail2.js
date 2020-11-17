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
  Icon,
  Radio,
  Modal
} from 'antd';
import * as taskApi from '../../api/taskList';
import './detail.less';
import AddressChoose from '../../components/AddressChoose';
import Quill from '../../components/quill';
import moment from 'moment';
import UploadImg from '../../components/upload/UploadComponent';
import * as volunteerListApi from '../../api/volunteerList';


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
      showVolunModal:false,
      isLoading:false
    };
    this.cancleEdit=false;
    this.imgPrev = sessionStorage.getItem('imgPrev');
  }

  componentDidMount() {
    // 在DidMount里去请求数据
    const { getList } = this.props;
    const { params } = this.state;
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
    const { spiderData } = this.props;
    let isTop="";
    let stationId=this.pageData.stationid||"";
    let stationType=this.pageData.stationType||"";
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        spiderData.map(item=>{
          if(item.userName==values.stationName){
              stationId=item.userId;
              isTop=item.isTop;
              stationType=item.stationType
          }
        })
        if (!values.address) {
          delete values.address;
        }
        let data = values;
        if(!values.stationName){
          values.stationName="";
          isTop="-1";
        }
        if (this.position && this.position.addresslatitude && this.position.addresslongitude) {
          data = Object.assign(values, this.position || {});
        }

        if (values.aTime && values.aTime[0] && values.aTime[1]) {
          values.aStartTime = moment(values.aTime[0]).valueOf();
          values.aEndTime = moment(values.aTime[1]).valueOf();
          delete values.aTime;
        }
        if (!values.title && this.pageData.title) {
          values.title = this.pageData.title;
        }

        if (this.props.type === 'edit') {
          values.taskid = this.pageData.taskid;
          data={...values,isTop,stationId,stationType};

          this.onUpdate(data);
        }else if(this.props.type==='publish'){
          values.taskid = this.pageData.taskid;
          this.onPublish(values);
        }else {
          data={...values,isTop,stationId,stationType};
          this.onSubmit(data);
        }
      }
    });
  };
  onSubmit = (values) => {
    this.setState({ loading: true });
    taskApi.addTask(values).then(res => {
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
    taskApi.updateTask(values).then(res => {
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
  //发布任务
  onPublish=(values)=>{
    this.setState({ loading: true });
    taskApi.pubTask(values).then(res => {
      if (!res.success) return;
      message.success('发布成功');
      if ('onOk' in this.props) {
        this.props.onOk();
      }
    })
      .catch(err => {
        message.error('发布失败');
      }).finally(err => {
      this.setState({ loading: false });
    });
  }
  //编辑活动名称
  editAtivityName = () => {
    this.setState({ nameEdit: true });
  };
  //tab 点击
  tabChange = (tabKey) => {
    this.setState({ tabKey });
  };
  //打开志愿者详情弹窗
  seekVolunter=()=>{
    this.setState({
      showVolunModal:true
    })

  }
  //关闭志愿者详情弹框
  closeModal=()=>{
    this.setState({
      showVolunModal:false
    })
  }
  //取消发布
  cancelPublish=(taskId)=>{
    taskApi.cancelpubTask({taskId}).then(res=>{
      if (!res.success) return;
      message.success('取消发布成功');
      if ('onOk' in this.props) {
        this.props.onOk();
      }
    })
  }

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
    const { detailData = {}, serverArea = [], serverType = [], type, spiderData = [], zzmm=[],jyxl=[] } = this.props;

    this.pageData = ((type === 'edit')||(type==='publish')) ? detailData : {};
   
    if((type==='edit'&&(this.pageData.state===4||this.pageData.state===5||this.pageData.state===6))||(this.pageData.isPublish=='2'&&this.pageData.claimCustomerId)){
      this.cancleEdit=true;
    }
    if ((type === 'edit'||type === 'publish') && !this.position) {
      this.position = {
        addresslatitude: this.pageData.addresslatitude,
        addresslongitude: this.pageData.addresslongitude
      };
    }
    const  volunterInfo =detailData.customer;


    function getEduca(){//获取学历
      let educa="";
      jyxl.map(item=>{
        if(item.DictID==volunterInfo.education){
          educa=item.DictName
        }
      })
      return educa;

    }
    function getPolitica(){//获取政治面貌
      let polit="";
      zzmm.map(item=>{
        if(item.DictID==volunterInfo.politicallevel){
          polit=item.DictName
        }
      })
      return polit;
    }
    function getServType(){//获取服务类型
      let servTypes="";
      serverType.map(item=>{
        if(item.dictionaryId==volunterInfo.servicetype){
          servTypes=item.dictionaryValue
        }
      })
      return servTypes;
    }
    function getServArea(){//获取服务地区
      let servArea="";
      serverArea.map(item=>{
        if(item.dictionaryId==volunterInfo.servicearea){
          servArea=item.dictionaryValue
        }
      })
      return servArea;
    }
    function getTissue(){//获取所属组织
      let tissue="";
      spiderData.map(item=>{
        if(item.userId==volunterInfo.spiderid){
          tissue=item.userName
        }
      })
      return tissue;
    }
    const actvDesc = '为避免任务创建失败，建议此处输入字数不超过500字!';
    let getButton=()=>{
      if(this.cancleEdit===false){
        if(type==='publish'){
          if(this.pageData.isPublish!='2'){
            return <Button type="primary" htmlType="submit">确认发布</Button>
          }else if(this.pageData.isPublish=='2'&&!this.pageData.claimCustomerId){
            return <Button type="primary" htmlType="submit">保存</Button>
          }
        }else{
          return <Button type="primary" htmlType="submit">保存</Button>
        }
      }else{
        if(type==='publish'&&this.pageData.isPublish=='2'&&!this.pageData.claimCustomerId&&this.pageData.isMine==0 ){
          return <Button type="primary" onClick={()=>{this.cancelPublish(this.pageData.taskid)}}>取消发布</Button>
        }
      }
    }

    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk} to={'/TaskList'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/TaskList'} className={'active'}>
              {this.props.type === 'create' ? '新建任务' : '任务详情'}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox detail-part'>
          <Spin tip={type==='publish'?'发布中...':'保存中...'} spinning={this.state.loading}>
            <Form className='form-part' {...formItemLayout} onSubmit={this.handleSubmit}>
              <div className='detail-panel-part-activity'>

                <div className='panel-part-title-activity'>
                  {this.props.type === 'create' || (type === 'edit' && this.state.nameEdit && !this.cancleEdit)||(type==='publish'&&this.pageData.isPublish!='2') ?
                    <Form.Item style={{ 'marginBottom': '0', width: '100%' }} {...otherFormItemLayout}>
                      {getFieldDecorator('title', {
                        initialValue: this.pageData.title,
                        rules: [
                          {
                            required: true,
                            message: '请输入任务名称！'
                          }
                        ]
                      })(<Input maxLength={30} placeholder='请输入任务名称'/>)}
                    </Form.Item> : <span role='button' tabIndex='-1'
                                         onClick={this.editAtivityName}>
                      {this.pageData.title}
                      { type === 'edit' && !this.cancleEdit?<Icon className='can-editButton' type="edit" stlyle={{'position':'relative'}} />:''}
                      </span>}
                  </div>
                <div className='has-img'>
                  <div className='part-main'>
                    <Row className={'row-content'}>
                      <Col span={12}>
                        <Form.Item label="任务地区">
                          {getFieldDecorator('areaid', {
                            initialValue: this.pageData.areaid ? this.pageData.areaid + '' : undefined,
                            rules: [
                              {
                                required: false,
                                message: '请选择任务地区!'
                              }
                            ]
                          })(<Select disabled={this.cancleEdit} style={{ width: '200px' }} placeholder='请选择任务地区'>
                            {serverArea.map((ele, index) => {
                              return (<Select.Option key={index}
                                                     value={ele.dictionaryId}>{ele.dictionaryValue}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="任务地址">
                          {getFieldDecorator('address', {
                            initialValue: this.pageData.address,
                            rules: [
                              {
                                required: type==='publish'?true:false,
                                message: '请输入任务地址！'
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
                    <Row className='row-content'>
                      <Col span={12}>
                        <Form.Item label="服务类型">
                          {getFieldDecorator('tasktype', {
                            initialValue: this.pageData.tasktype ? this.pageData.tasktype + '' : undefined,
                            rules: []
                          })(<Select disabled={this.cancleEdit} style={{ width: '200px' }} placeholder='请选择服务类型'>
                            {serverType.map((ele, index) => {
                              return (<Select.Option key={index}
                                                    value={ele.dictionaryId}>{ele.dictionaryValue}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Col>
                      {
                        type==='publish'?
                        <Col span={12}>
                          <Form.Item label="签到半径">
                          {getFieldDecorator('checkrange', {
                            initialValue:this.pageData.checkRange?this.pageData.checkRange:undefined,
                            rules: [
                              {
                                required:true,
                                message: '请填写签到半径！'
                              }
                            ],
                          })(<InputNumber max={10000}  min={1} style={{ width: '200px' }}
                          placeholder='请填写签到半径' disabled={this.cancleEdit}/>)}<span style={{'marginLeft':'5px'}}>米</span>
                          </Form.Item>
                        </Col>:""
                      }
                    </Row>
                    <Row>
                      <Form.Item label="任务时间"  {...tailFormItemLayout}>
                        {getFieldDecorator('aTime', {
                          initialValue: ((type === 'edit'||type === 'publish') && this.pageData.starttime) || (type === 'edit' && this.pageData.endtime) ? [(this.pageData.starttime && moment(this.pageData.starttime)) || '', (this.pageData.endtime && moment(this.pageData.endtime)) || ''] : [],
                          rules: [
                            {
                              required: false
                              // message: '请输入账号！'
                            }
                          ]
                        })(<RangePicker
                          showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                          }}
                          disabled={this.cancleEdit}
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder={['开始时间', '结束时间']}
                          style={{ width: '380px' }}>
                        </RangePicker>)}
                      </Form.Item>
                    </Row>
                    <Row>
                      <Form.Item label="任务描述"  {...tailFormItemLayout}>
                        {getFieldDecorator('description', {
                          initialValue: this.pageData.description,
                          rules: [
                            {
                              required: true,
                              message: '请输入任务描述！'
                            }
                          ]
                        })(<Quill
                          limit='501'
                          className='showText-area'
                          disabled={this.cancleEdit}
                          placeholder={actvDesc}
                          rows={6}/>
                        )}
                      </Form.Item>
                    </Row>
                    {/* {this.pageData.state == 4 ? <Row>
                      <Form.Item label="转派说明"  {...tailFormItemLayout}>
                        {taskback&&taskback.backremark}
                      </Form.Item>
                    </Row> : ''} */}
                    {
                      type==='publish'?"":<Row>
                      <Form.Item label="任务人"  {...tailFormItemLayout}>
                        {getFieldDecorator('stationName', {
                          initialValue: this.pageData.stationName?this.pageData.stationName:undefined,
                          rules: [{
                            required: false,
                            message: '请选择任务人！'
                          }]
                        })(<Select disabled={this.cancleEdit} style={{ width: '200px' }} placeholder='请选择任务人'>
                          {spiderData.map((ele, index) => {
                            return (<Select.Option key={index} value={ele.userName}>{ele.userName}</Select.Option>);
                          })}
                        </Select>)}
                      </Form.Item>
                    </Row>
                    }
                    {
                      type==='publish'?"":<p className="alerting">*不选任务人默认为创建者</p>
                    }
                    {
                      type==='publish'?<div className="claim-row">
                        <div className="claim-item">
                          <span>认领状态：</span>
                          <span>{this.pageData.claimCustomerId?'已认领':'暂未认领'}</span>
                        </div>
                        <div className="claim-item">
                          <span>认领人：</span>
                          {
                            this.pageData.claimCustomerId?<span style={{color:"#bc261a",cursor:"pointer"}} onClick={()=>{this.seekVolunter(this.pageData.claimCustomerId)}}>{volunterInfo.customername}</span>
                            :<span>暂无</span>
                          }

                        </div>
                      </div>:""
                    }
                  </div>
                </div>
              </div>
              <div className='button-part'>
                <Button onClick={this.props.back}>
                  返回
                </Button>
                {
                  getButton()
                }
              </div>
            </Form>
          </Spin>
        </div>
        {
            this.state.showVolunModal?<Modal
              title="志愿者详情"
              visible={this.state.showVolunModal}
              onCancel={this.closeModal}
              footer={null}
              width={1000}
              >
                <Spin spinning={this.state.isLoading}>
                    <div className="volunter-info-wraper">
                        <Form {...formItemLayout}>
                          <div className="title-bar">基本信息</div>
                          <div className="info-part">
                            <div className="pic-panel">
                              {
                                volunterInfo.thridInfo&&volunterInfo.thridInfo.avatar?<UploadImg  type={'upload'}
                                src={volunterInfo.thridInfo.avatar} className='avator-part'/>:<div className="none">暂无头像</div>
                              }

                            </div>
                            <div className="info-panel">
                              <Row>
                                <Col span={12}>
                                  <Form.Item label="用户ID" >
                                    {volunterInfo.thridInfo&&volunterInfo.thridInfo.userid||'暂无'}
                                  </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item label="性别:">
                                      {getFieldDecorator('sex', {
                                        initialValue: volunterInfo.thridInfo&&volunterInfo.thridInfo.sex < 1 ? undefined : volunterInfo.thridInfo&&volunterInfo.thridInfo.sex
                                      })(<Radio.Group disabled={true}   onChange={this.onChange}>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                      </Radio.Group>)}
                                    </Form.Item>
                                  </Col>
                                </Row>
                              <Row>
                                <Col span={12}>
                                  <Form.Item label="账号">
                                    {
                                      volunterInfo.thridInfo&&volunterInfo.thridInfo.mobile||'暂无'
                                    }
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="账号名称">
                                    {
                                      volunterInfo.thridInfo&&volunterInfo.thridInfo.nickname||'暂无'
                                    }
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12}>
                                  <Form.Item label="注册时间">
                                    {
                                      volunterInfo.thridInfo&&volunterInfo.thridInfo.regtime||'暂无'
                                    }
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="最后登录时间">
                                    {
                                      volunterInfo.thridInfo&&volunterInfo.thridInfo.loginTime||'暂无'
                                    }
                                  </Form.Item>
                                </Col>
                              </Row>
                            </div>
                          </div>
                          <div className="title-bar">志愿者信息</div>
                          <div className="info-part">
                            <div className="pic-panel">
                                <div>
                                  <UploadImg className='id-pic'
                                    src={volunterInfo.idcardfronturl ? (this.imgPrev + volunterInfo.idcardfronturl) : ''}
                                    buttonText={'身份证正面'}
                                    type={'look'}
                                  />
                                </div>
                                <div>
                                  <UploadImg className='id-pic back-id'
                                    src={volunterInfo.idcardbackurl ? (this.imgPrev + volunterInfo.idcardbackurl) : ''}
                                    buttonText={'身份证背面'}
                                    type={'look'}
                                  />
                                </div>
                            </div>
                            <div className="info-panel">
                              <Row>
                                <Col span={12}>
                                  <Form.Item label="真实姓名">
                                    {
                                      volunterInfo.realname
                                    }
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="联系电话">
                                    {
                                      volunterInfo.contactphone
                                    }
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12}>
                                  <Form.Item label="身份证号码">
                                    {
                                      volunterInfo.idcardno
                                    }
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="邮箱">
                                    {
                                      volunterInfo.email
                                    }
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12}>
                                  <Form.Item label="学历">
                                    {
                                      getEduca()
                                    }
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="政治面貌">
                                    {
                                      getPolitica()
                                    }
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12}>
                                  <Form.Item label="服务类型">
                                    {
                                      getServType()
                                    }
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="服务地区">
                                    {
                                      getServArea()
                                    }
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12}>
                                  <Form.Item label="所属组织">
                                    {
                                      getTissue()
                                    }
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="工作单位">
                                    {
                                      volunterInfo.workunit
                                    }
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12}>
                                  <Form.Item label="审核人">
                                    {
                                      volunterInfo.checkusername
                                    }
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="审核时间">
                                    {
                                      volunterInfo.checkdate
                                    }
                                  </Form.Item>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Form>
                    </div>
                </Spin>
            </Modal>:null
          }
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
