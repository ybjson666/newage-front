import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Breadcrumb,
  Form,
  message,
  Spin,
  Modal
} from 'antd';
import './detail.less';
import * as orderSheetListAPi from '../../api/orderSheetList';
import moment from 'moment';

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
    this.imgPrev = sessionStorage.getItem('imgPrev');
  }

  componentDidMount() {

  }


  getTags = (arrays, tag) => {
    let str = '暂未设置';
    arrays.map(ele => {
      if (ele.dictid === tag) {
        str = ele.dictname;
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
    orderSheetListAPi.getAuditAll(data).then(res => {
      if (!res || !res.success) return;
      message.success('审核成功！');
      this.props.onOk();
    });
  };
  // 批量不通过
  mulpDelete = () => {
    const instance = this;
    confirm({
      title: '确认不通过',
      content: '此操作不可撤回,是否确认驳回所选点单预约申请?',
      onOk() {
        instance.confirm(3);
      }
    });
  };
  // 批量通过
  mulpAccept = () => {
    const instance = this;
    const item = this.props.detailData;
    let statusBefore = true;
    let statusAfter = true;
    let statutsTime = true;
    let statutsCount ="";
    if(item.activityOrder.servicecount==0|| item.activityOrder.hascount < item.activityOrder.servicecount){
      statutsCount="充足";
    }else if(item.activityOrder.hascount == item.activityOrder.servicecount){
      statutsCount='无剩余';
    }else if(item.activityOrder.hascount > item.activityOrder.servicecount){
      statutsCount='不足';
    }
    if (item.activityOrder.begintime && item.activityOrder.endtime) {
      statusBefore = moment(item.bookdate).isAfter(item.activityOrder.begintime);
      statusAfter = moment(item.bookdate).isBefore(item.activityOrder.endtime);
    }
    if(item.activityOrder.endtime){
      statutsTime = moment().isBefore(item.activityOrder.endtime);
    }
    let text = '此操作不可撤回,是否确认通过所选点单预约申请';
    if (!(statusBefore && statusAfter )) {
      text = '该申请与预设点单申请信息不符，是否确认通过所选点单预约申请？';
    }
    if (!statutsTime) {
      text = '当前服务已过期，是否确认通过所选点单预约申请？';
    }
    if (statutsCount=='无剩余') {
      text = '该点单已无剩余场次，是否确认通过所选点单预约申请！';
    }else if(statutsCount=='不足'){
      text = '该点单剩余场次不足，是否确认通过所选点单预约申请！';
    }
    confirm({
      title: '确认通过',
      content: text,
      onOk() {
        instance.confirm(2);
      }
    });
  };

  render() {
    const { detailData = {}, serverType = [] } = this.props;
    const { activityOrder = {}, customer = {} } = detailData;
    if (!this.currentId) {
      this.currentId = detailData.activityorderenterid;
    }
    const currentState = detailData.state;
    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link onClick={this.props.onOk} to={'/OrderSheetCheck'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/OrderSheetCheck'} className={'active'}>
              点单服务预约详情
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox orderActivityCheckList-detail-part'>
          <Spin tip="审核中..." spinning={this.state.loading}>
            <div className='part-content'>
              <div className='detail-panel-part'>
                <div className='panel-part-title'>点单服务信息</div>
                <div className='panel-img'>
                  <div className='img-inner'>
                    <img src={activityOrder.cover ? this.imgPrev + activityOrder.cover : ''} alt=""/>
                  </div>
                </div>
                <div className='content-part'>
                  <div className='content-line'>
                    活动名称：{activityOrder.title}
                  </div>
                  {
                    activityOrder.begintime?<div className='content-line'>
                    服务时间：{activityOrder.begintime} 至 {activityOrder.endtime}
                  </div>:<div className='content-line'>
                    服务时间：不限制
                  </div>
                  }
                  
                  <div className='content-line'>
                    点单类型：{this.getTags(serverType, activityOrder.dictid)}
                  </div>
                  {/*<div className='content-line'>*/}
                  {/*  活动类型：{this.getTags(serverType,ActivityRecruit.activitytype)*/}
                  {/*}*/}
                  {/*</div>*/}
                  <div className='content-line'>
                    服务场次：{activityOrder.hascount} / {activityOrder.servicecount==0?'不限场次':activityOrder.servicecount+'场'}
                  </div>
                  <div className='content-line'>
                    服务价格：{activityOrder.serviceprice>0?activityOrder.serviceprice:'免费'}
                  </div>
                  <div className='content-line'>
                    联系人：{detailData.activityOrder.contactperson} ({detailData.activityOrder.contactphone})
                  </div>
                  <div className='content-line'>
                    服务描述：
                    <div className='textarea-part' dangerouslySetInnerHTML={{ __html: activityOrder.descript }}/>
                  </div>
                </div>
              </div>
              <div className='detail-panel-part'>
                <div className='panel-part-title'>预约信息</div>
                <div className='panel-img panel-img-right'>
                  <div className='img-inner img-right'>
                    <img
                      src={customer.thridInfo && customer.thridInfo.avatar ? (customer.thridInfo && customer.thridInfo.avatar) : ''}
                      alt=""/>
                  </div>
                </div>
                <div className='content-part'>
                  <div className='content-line'>
                    预约账号名：{customer.customername}
                  </div>
                  <div className='content-line'>
                    预约人：{detailData.realname} ({detailData.phone})
                  </div>
                  <div className='content-line'>
                    预约时间：{detailData.bookdate}
                  </div>
                  <div className='content-line'>
                    预约地址：{detailData.address}
                  </div>
                  <div className='content-line'>
                    预约描述：{detailData.remark}
                  </div>
                </div>
              </div>
            </div>
            <div className='button-part'>
              <Button onClick={this.props.back}>
                返回
              </Button>
              {currentState == 1 ? <Button onClick={this.mulpAccept} type="primary" htmlType="submit">
                通过
              </Button> : ''}
              {currentState == 1 ? <Button onClick={this.mulpDelete} type="danger" htmlType="submit" ghost>
                不通过
              </Button> : ''}
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
