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
import * as activityApi from '../../api/activity';
import './detail.less';
import * as wishApi from '../../api/wish';
import { sexState } from '../../utils/utils';
import moment from 'moment';
import * as resourceOrderApi from '../../api/resourceOrderList';

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
    this.imgPrev = sessionStorage.getItem('imgPrev');
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
    resourceOrderApi.getAuditAll(data).then(res => {
      if (!res.success) return;
      message.success('审核成功！');
      this.props.onOk();
    });
  };
  // 批量不通过
  mulpDelete = () => {
    const instance = this;
    confirm({
      title: '确认不通过',
      content: '此操作不可撤回,是否确认驳回所选资源预约申请?',
      onOk() {
        instance.confirm(2);
      }
    });
  };
  // 批量通过
  mulpAccept = () => {
    const useData = {
      ids: this.currentId,
      state: 1
    };
    const instance = this;
    resourceOrderApi.getAudit(useData).then(res => {
      if (!res || !res.success) return;
      let text = '此操作不可撤回,是否确认通过所选资源预约申请';
      if (res.data == 0) {
        text = '所选申请与已审核通过的申请存在时间冲突，是否依然将其审核为通过?';
      }
      confirm({
        title: '确认通过',
        content: text,
        onOk() {
          instance.confirm(1);
        }
      });
    });

  };

  //保存信息
  saveInfo = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
    // this.props.back();
  };
  // 获取资源类型名称
  getType = (detailData) => {
    let tag = '';
    this.props.serverType.map((ele) => {
      if (ele.dictid == detailData.ResourceType) {
        tag = ele.dictname;
      }
    });
    return tag;
  };

  render() {
    const { detailData = {}, serverArea = [], serverType = [], zzmm = [], jyxl = [] } = this.props;
    // const { ActivityEnter = {}, ActivityRecruit = {},customerInfo={},wish={} } = detailData;

    if (!this.currentId) {
      this.currentId = detailData.ResourceBookID;
    }
    const currentState = detailData.State;
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
            <Link onClick={this.props.onOk} to={'/ResourceOrderList'}>
              {this.props.navTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/ResourceOrderList'} className={'active'}>
              预约详情
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox resourceOrderList-detail-part'>
          <Spin tip="审核中..." spinning={this.state.loading}>
            <div className='part-content'>
              <div className='detail-panel-part'>
                <div className='panel-part-title'>预约信息</div>
                <div className='content-part-other'>
                  <Row>
                    <Col span={12}>
                      <div>
                        <span className='line-label'>资源名称 :</span><span
                        className='line-content'>{detailData.ResourceName}</span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <span className='line-label'>资源地址 :</span>{detailData.Address}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div>
                        <span className='line-label'>资源类型 :</span>{this.getType(detailData)}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <div>
                        <span className='line-label'>预约账号名 :</span>{detailData.CustomerName}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <span className='line-label'>预约账号 :</span> {detailData.ContactPhone}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <div>
                        <span className='line-label'>预约联系人 :</span>{detailData.ContactName}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <span className='line-label'>联系方式 :</span> {detailData.phone}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div>
                        <span className='line-label'> 预约时间段 :</span>{detailData.StartTime} ~ {detailData.EndTime}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div>
                        <span className='line-label'> 预约说明 :</span><span
                        className='line-content'>{detailData.Remark}</span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className='button-part'>
              <Button onClick={this.props.back}>
                返回
              </Button>
              {/*<Button type="primary" onClick={this.saveInfo}> 保存</Button>*/}
              {currentState == 0 ? <Button onClick={this.mulpAccept} type="primary" htmlType="submit">
                通过
              </Button> : ''}
              {currentState == 0 ? <Button onClick={this.mulpDelete} type="danger" htmlType="submit" ghost>
                不通过
              </Button> : ''}
            </div>
          </Spin>
        </div>
      </>
    );
  }
}

const mapState = ({ message, navTitle }) => ({
  listData: message.listData,
  listLoading: message.listLoading,
  navTitle: navTitle.navTitle
});

const mapDispatch = ({ message }) => ({
  getList: message.getList
});
const WrappedRegistrationForm = Form.create({ name: 'detailForm' })(TableList);
export default connect(mapState, mapDispatch)(WrappedRegistrationForm);
