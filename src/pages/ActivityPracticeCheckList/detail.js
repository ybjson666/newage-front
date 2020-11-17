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
  Modal
} from 'antd';
import * as volunteerListApi from '../../api/volunteerList';
import UploadImg from '../../components/upload/UploadComponent';
import './detail.less';
import { imgUrl } from '../../utils/config';
import { emailEqual, isCardEqual, phoneEqual } from '../../utils/utils';
import * as activityApi from '../../api/ActivityPractice';

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;
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
    activityApi.activityAudit(data).then(res => {
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
      content: '此操作不可撤回,是否确认驳回所选活动申请?',
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
      content: '此操作不可撤回,是否确认通过所选活动申请?',
      onOk() {
        instance.confirm(2);
      }
    });
  };
  render() {
    const { detailData = {}, serverArea = [], serverType = [], zzmm = [], jyxl = [] } = this.props;
    const { ActivityEnter = {}, ActivityRecruit = {},CustomerInfo={} } = detailData;
    if(!this.currentId){
      this.currentId=ActivityEnter.activityenterid;
    }
    const currentState=ActivityEnter.state;
    // const currentState=0;
    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk} to={'/PracticeCheckList'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/PracticeCheckList'} className={'active'}>
              实践活动报名申请详情
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox ActivityCheckList-detail-part'>
          <Spin tip="审核中..." spinning={this.state.loading}>
            <div className='part-content'>
              <div className='detail-panel-part'>
                <div className='panel-part-title'>活动信息</div>
                <div className='panel-img'>
                  <div className='img-inner'>
                    <img src={ActivityRecruit.cover?this.imgPrev+ActivityRecruit.cover:''} alt=""/>
                  </div>
                </div>
                <div className='content-part'>
                  <div className='content-line'>
                    活动名称：{ActivityRecruit.activityname}
                  </div>
                  <div className='content-line'>
                    活动地址：{ActivityRecruit.address}
                  </div>
                  <div className='content-line'>
                    活动地区：{this.getTags(serverArea,ActivityRecruit.areaid)}
                  </div>
                  {/*<div className='content-line'>*/}
                  {/*  活动类型：{this.getTags(serverType,ActivityRecruit.activitytype)*/}
                  {/*}*/}
                  {/*</div>*/}
                  <div className='content-line'>
                    报名时间：{ActivityRecruit.recruitstarttime} ~ {ActivityRecruit.recruitendtime}
                  </div>
                  <div className='content-line'>
                    活动时间：{ActivityRecruit.activitystarttime} ~ {ActivityRecruit.activityendtime}
                  </div>
                  <div className='content-line'>
                    活动人数：{ActivityRecruit.hascount}/{ActivityRecruit.recruitcount==0?'无限制':ActivityRecruit.recruitcount}
                  </div>
                  <div className='content-line'>
                    活动描述：
                    <div className='textarea-part' dangerouslySetInnerHTML={{ __html: ActivityRecruit.activitydesc }}/>
                  </div>
                </div>
              </div>
              <div className='detail-panel-part'>
                <div className='panel-part-title'>申请人信息</div>
                <div className='panel-img panel-img-right'>
                  <div className='img-inner img-right'>
                    <img src={CustomerInfo.thridInfo&&CustomerInfo.thridInfo.avatar? (CustomerInfo.thridInfo&&CustomerInfo.thridInfo.avatar):''} alt=""/>
                  </div>
                </div>
                <div className='content-part'>
                  <div className='content-line'>
                    申请人账号名：{CustomerInfo.customername}
                  </div>
                  <div className='content-line'>
                    申请人账号类型：{CustomerInfo.isvolunteer==1?'志愿者':'普通用户'}
                  </div>
                  <div className='content-line'>
                    申请人真实姓名：{CustomerInfo.realname}
                  </div>
                  {/*<div className='content-line'>*/}
                  {/*  服务地区：{this.getTags(serverArea,CustomerInfo.servicearea)}*/}
                  {/*</div>*/}
                  {/*<div className='content-line'>*/}
                  {/*  服务类型：{this.getTags(serverType,CustomerInfo.servicetype)}*/}
                  {/*</div>*/}
                  <div className='content-line'>
                    申请人联系电话：{CustomerInfo.thridInfo&&CustomerInfo.thridInfo.mobile||''}
                  </div>
                  <div className='content-line'>
                    申请时间：{ActivityEnter.subdate}
                  </div>
                  <div className='content-line'>
                    申请描述：{ActivityEnter.remark}
                  </div>
                </div>
              </div>
            </div>
            <div className='button-part'>
              <Button onClick={this.props.back}>
                返回
              </Button>
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
