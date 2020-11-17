import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  Divider,
  Tooltip,
  Dropdown,
  Menu,
  Button,
  Breadcrumb,
  Input,
  Select
} from 'antd';
import './index.less';

const { Search } = Input;
const { Option } = Select;

// 一个简单的table列表demo
class TableList extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      params: {
        pageSize: 10,
        page: 1
      }
    }
  }

  componentDidMount() {
    // 在DidMount里去请求数据
    const { getList } = this.props;
    const { params } = this.state;
    // getList(params);
  }

  // 全选、多选事件
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

   // 行选择
   onRowEvent = row => {
    const selectedRowKeys = [];
    selectedRowKeys.push(row.id);
    this.setState({ selectedRowKeys });
  }

   // 分页
   onShowSizeChange = (page, pageSize) => {
    const { getList } = this.props;
    const { params } = {...this.state};
    params.pageSize = pageSize;
    params.page = page;
    this.setState({
      params
    });
    getList(params);
  }

  render() {
    const { selectedRowKeys } = this.state;
    const { listData } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const pagination = {
      'pageSize': listData.pageSize,
      'total': listData.totalRecords,
      'current': listData.currentPage,
      'showTotal':total => `共 ${total} 条数据`,
      'showSizeChanger':true,
      'onShowSizeChange':this.onShowSizeChange,
      'onChange': this.onShowSizeChange
    };
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        align: 'left',
        render: (text,row) => (
          <Tooltip placement="topLeft" title={text}>
            <span>{text}</span>
          </Tooltip>
        )
      },{
        title: '内容',
        dataIndex: 'content',
        align: 'left',
        width: '180px',
        render: (tags, row) => (
          <Tooltip placement="topLeft" title={tags}>
            <span>{tags}</span>
          </Tooltip>
        )
      },{
        title: '作者',
        dataIndex: 'author',
        align: 'left',
        width: '180px',
        render: (tags, row) => (
          <span>{tags}</span>
        )
      },{
        title: '时间',
        dataIndex: 'time',
        align: 'left',
        width: '180px',
        render: (tags, row) => (
          <span>{tags}</span>
        )
      },{
        title: '操作',
        align: 'left',
        width: '180px',
        render: (tags, row) => {
          const moreMenu = <Menu>
            <Menu.Item key='0'>按钮3</Menu.Item>
            <Menu.Item key='1'>按钮4</Menu.Item>
            <Menu.Item key='2'>按钮5</Menu.Item>
          </Menu>
          return (
            <div style={{whiteSpace: 'nowrap'}}>
              <a href="javascript:;">按钮1</a>
              <Divider type="vertical" />
              <a href="javascript:;">按钮2</a>
              <Divider type="vertical" />
              <Dropdown overlay={moreMenu}>
                <a className="ant-dropdown-link" >
                  更多
                </a>
              </Dropdown>
            </div>
          )
        }
      }]

    return (
      <>
        <Breadcrumb className="breadcrumbBox">
          <Breadcrumb.Item>
            <Link to={'/'}>
              面板屑
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='eachPageBox' >
          <div className="navTopBox">
            <div className='btnBox'>
              <Button>按钮1</Button>
              <Button>按钮2</Button>
              <Button>按钮3</Button>
              <Button>按钮4</Button>
              <Button>按钮5</Button>
            </div>
            <div className='searchFatherBox'>
              <div className='searchBox'>
                <Select placeholder='请选择作者' style={{ width: 120, marginRight: 20 }} onChange={() => {}}>
                  <Option value="作者1">作者1</Option>
                  <Option value="作者2">作者2</Option>
                  <Option value="作者3">作者3</Option>
                  <Option value="作者4">作者4</Option>
                </Select>
                <Search
                  placeholder="请输入搜索内容"
                  enterButton="搜索"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                />
              </div>
            </div>

          </div>
          <div className='tableCont mainContentBox' style={{height:"calc(100% - 121px)"}}>
            <Table
              rowKey="id"
              columns={columns}
              rowSelection={rowSelection}
              pagination={pagination}
              dataSource={this.props.listData.list}
              loading={this.props.listLoading}
              onRow={(record, index) => ({
                index,
                onClick: this.onRowEvent.bind(this, record)
              })}
              scroll={{x:"100%", y:'calc(100vh - 310px)'}}
            />
          </div>
        </div>
      </>
    )
  }
}

const mapState = ({ message }) => ({
  listData: message.listData,
  listLoading: message.listLoading,
});

const mapDispatch = ({ message }) => ({
  getList: message.getList,
})

export default connect(mapState, mapDispatch)(TableList);
