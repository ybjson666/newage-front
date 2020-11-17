import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Breadcrumb,
  Input,
  Select,
  Form,
  Icon,
  Row,
  Col,
  Radio,
  message,
  Spin,
  Modal
} from 'antd';
import * as volunteerListApi from '../../api/volunteerList';
import UploadImg from '../../components/upload/UploadComponent';
import './detail.less';
import {emailEqual,isCardEqual,phoneEqual} from '../../utils/utils';


const { confirm } = Modal;
// 一个简单的table列表demo
class TableList extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      tableData: [],
      totalCount: 0,
      loading:false
    };
    this.imgPrev=sessionStorage.getItem('imgPrev');
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
  // 分页
  onShowSizeChange = (page, pageSize) => {
    const { getList } = this.props;
    const { params } = { ...this.state };
    params.pageSize = pageSize;
    params.page = page;
    this.setState({
      params
    });
    getList(params);
  };
  uploadSuccess=(res)=>{
    this.faceUrl=res.data;
  };
  handleSubmit=(e)=>{
    e && e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
       
        const  faceUrl=this.faceUrl?this.imgPrev+this.faceUrl: this.props.detailData&&this.props.detailData.thridInfo&&this.props.detailData.thridInfo.avatar||'';
        if(faceUrl){
          values.faceUrl=faceUrl;
        }
        values.uid=this.props.detailData&&this.props.detailData.thridInfo&&this.props.detailData.thridInfo.userid;
        this.onSubmit(values);
      }
    });
  };
  onSubmit=(values)=>{
    this.setState({loading:true});
    volunteerListApi.customModify(values).then(res=>{
      message.success('保存成功');
      if('onOk' in this.props){
        this.props.onOk();
      }
    })
      .catch(err=>{
      message.error('保存失败')
    }).finally(err=>{
      this.setState({loading:false});
    })
  };
  //确认状态
  confirm = (state) => {
    this.setState({loading:true});
    const data = {
      state: state,
      customerIds: this.currentId
    };
    volunteerListApi.setAdminApply(data).then(res => {
      if(!res.success)return;
      message.success('审核成功！');
      this.props.onOk();
    }).finally(()=>{
      this.setState({loading:false});
    });
  };
  // 不通过
  mulpDelete = () => {
    const instance = this;
    confirm({
      title: '确认不通过',
      content: '此操作不可撤回,是否确认驳回所选志愿者申请?',
      onOk() {
        instance.confirm(3);
      }
    });
  };
  // 通过
  mulpAccept = () => {
    const instance = this;
    confirm({
      title: '确认通过',
      content: '此操作不可撤回,是否确认通过所选志愿者申请?',
      onOk() {
        instance.confirm(2);
      }
    });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const { listData } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
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
    const {detailData={},serverArea=[],serverType=[],zzmm=[],jyxl=[],spiderData=[],pageStag}=this.props;
    const thridInfo=detailData.thridInfo;
    const currentState=detailData.state;
    if(!this.currentId){
      this.currentId=detailData.customerid;
    }
    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk}   to={'/CheckPendingList'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/'} className={'active'}>
              申请人详情
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox detail-part'>
          <Spin tip="保存中..." spinning={this.state.loading}>
          <Form className='form-part' {...formItemLayout} onSubmit={this.handleSubmit}>
            <div className='detail-panel-part'>
              <div className='panel-part-title'>基本信息</div>
              <div className='has-img'>
                <div className='img-part'>
                <UploadImg success={this.uploadSuccess}  type={'upload'} src={thridInfo.avatar?thridInfo.avatar:''} className='avator-part'/>
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
                          initialValue:thridInfo.mobile,
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
                      <Form.Item label="账号名称" >
                        {getFieldDecorator('nickname', {
                          initialValue:thridInfo.nickname,
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
                        initialValue:thridInfo.sex<1?undefined:thridInfo.sex,
                        rules: [
                          {
                            required: false,
                            message: '请选择性别！'
                          }
                        ]
                      })(<Radio.Group disabled={true} onChange={this.onChange} >
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
                      <Form.Item label="申请时间" >
                        {detailData.subdate}
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className='detail-panel-part'>
              <div className='panel-part-title'>申请信息</div>
              <div className='has-img'>
                <div className='img-part'>
                  <UploadImg className='id-pic'
                             src={detailData.idcardfronturl?this.imgPrev+detailData.idcardfronturl:''}
                             buttonText ={'查看'}
                             type={'look'}
                  />
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
                          initialValue: detailData.realname,
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
                      <Form.Item label="联系电话" >
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
                      <Form.Item label="邮箱" >
                        {getFieldDecorator('email', {
                          initialValue: detailData.email||'',
                          rules: [
                            {
                              required: true,
                              message: '请输入邮箱!'
                            } , {
                              pattern: emailEqual,
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
                          initialValue: detailData.education?detailData.education+'':'',
                          rules: [
                            {
                              required: true,
                              message: '请选择学历！'
                            }
                          ]
                        })(<Select style={{ width: '200px' }}>
                            {jyxl.map((ele, index) => {
                              return (<Select.Option key={index} value={ele.DictID+''}>{ele.DictName}</Select.Option>);
                            })}
                        </Select>)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="政治面貌" >
                        {getFieldDecorator('politicallevel', {
                          initialValue: detailData.politicallevel?detailData.politicallevel+'':'',
                          rules: [
                            {
                              required: true,
                              message: '请选择政治面貌!'
                            }
                          ]
                        })(<Select style={{ width: '200px' }}>
                          {zzmm.map((ele, index) => {
                            return (<Select.Option key={index} value={ele.DictID+''}>{ele.DictName}</Select.Option>);
                          })}
                        </Select>)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item label="服务类型">
                        {getFieldDecorator('serverType', {
                          initialValue: detailData.servicetype?detailData.servicetype+'':'',
                          rules: [
                            {
                              required: true,
                              message: '请选择服务类型！'
                            }
                          ]
                        })(<Select style={{ width: '200px' }}>
                          {serverType.map((ele, index) => {
                            return (<Select.Option key={index} value={ele.dictionaryId+''}>{ele.dictionaryValue}</Select.Option>);
                          })}
                        </Select>)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="服务地区" >
                        {getFieldDecorator('serverArea', {
                          initialValue: detailData.servicearea?detailData.servicearea+'':'',
                          rules: [
                            {
                              required: true,
                              message: '请输入服务地区!'
                            }
                          ]
                        })(<Select style={{ width: '200px' }}>
                          {serverArea.map((ele, index) => {
                            return (<Select.Option key={index} value={ele.dictionaryId+''}>{ele.dictionaryValue}</Select.Option>);
                          })}
                        </Select>)}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                      <Col span={12}>
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
                                    dropdownMenuStyle={{maxHeight:'200px'}}
                                    disabled={pageStag=='B'?false:true}
                                    filterOption={(input, option) =>{
                                        return  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }} style={{ width: '200px' }}>
                            {spiderData.map((ele, index) => {
                              console.log(ele)
                              console.log(index)
                              return (<Select.Option key={index}
                                                    value={ele.userId}>{ele.userName}</Select.Option>);
                            })}
                          </Select>)}
                        </Form.Item>
                      </Col>

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
                          })(<Input style={{ width: '200px' }} maxlength='12'/>)}                        
                        </Form.Item>
                      </Col>
                    </Row>

                </div>
              </div>
            </div>
            <div className='button-part'>
              <Button onClick={this.props.back} >
                返回
              </Button>
              <Button  type="primary" htmlType="submit">
                保存
              </Button>
              {currentState==1?
                <Button onClick={this.mulpAccept} type="primary" >
                通过
              </Button>
                :''}
              {currentState==1?
                <Button onClick={this.mulpDelete} type="danger" ghost>
                不通过
              </Button>
              :''}
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
