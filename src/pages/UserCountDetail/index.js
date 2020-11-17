import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Card,
    Spin,
    Button,
    Breadcrumb
  } from 'antd';
 import './index.less';
 import ChildData from '@/components/ChildData'
 import Chartor from '@/components/Chartor'
 import { getUserCount } from '@/api/count'

  class ActvCount extends Component{

    constructor(props){
      super();
      this.state={
        childTitle:'当前组织数据概览',
        childDatas:[
          {
            nums:0,
            name:'发布心愿人数(个)'
          },
          {
            nums:0,
            name:'志愿者参与人数(个)'
          }
        ],
        btnGroups:[
          {
            type:'pub',
            name:'发布心愿人数'
          },
          {
            type:'join',
            name:'志愿者参与人数'
          }
        ],
        curIndex:0,
        dataType:0,
        isLoading:true,
        chartTitle:"近七日每日发布心愿人数 (个)",
        chartDate:[],
        chartDatas:[
          {
            color:'#5b8ff9',
            datas:[0,0,0,0,0,0,0],
          }
        ],
        tableSource:[],
        dataGroups:{
          'pub':[
            {
              color:'#5b8ff9',
              datas:[0,0,0,0,0,0,0],
            }
          ],
          'join':[
            {
              color:'#5b8ff9',
              datas:[0,0,0,0,0,0,0],
            },
          ]
        }
      }
    }

    titleGroups={
      'pub':'近七日每日发布心愿人数 (个)',
      'join':'近七日每日志愿者参与人数 (个)'
    }

    componentDidMount=()=>{
      let pageid=this.props.match.params.pageid;
      this.fetchData(pageid);
    }
    componentWillReceiveProps=(nextProps)=>{
      let pageid=nextProps.match.params.pageid;
      this.fetchData(pageid);
    }

    fetchData= async(uid)=>{
      let { childDatas,dataGroups,chartDatas }=this.state;
      const result=await getUserCount({uid});

      if(result.state===200){
        if(result.data){
          let { top,middle,lower}=result.data;
          let date = Date.parse(new Date()); //获取当前日期
          let chartDate=[];
          let tableSource=[];
          for(var i=6;i>=0;i--){
            chartDate[i] = this.handleDay(date);
            date = date-86400000;
          }
          //上部数据
          childDatas[0].nums=top.publishcount||0;
          childDatas[1].nums=top.joincount||0;

          //折线图数据
          dataGroups.pub[0].datas=middle.wishCount.reverse();
          dataGroups.join[0].datas=middle.joinCount.reverse();
          chartDatas[0].datas=middle.wishCount.reverse();

          //表格数据
          tableSource=lower;
          this.setState({chartDate,childDatas,dataGroups,chartDatas,tableSource,isLoading:false});
          
        }
      }else{
        this.setState({isLoading:false})
      }
    }

    //处理时间
    handleDay=(timestamp)=>{
      var date = new Date(timestamp);
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
      var D = date.getDate();
      return `${M}-${D}`;
    }
    

    //按钮选择切换功能
    chooseTypes=(curIndex,dataType)=>{
      let chartTitle=this.titleGroups[dataType]
      let chartDatas=this.state.dataGroups[dataType]
      this.setState({
        curIndex,
        dataType,
        chartTitle,
        chartDatas
      })
    }

    //查看详情
    seekInfo=(pageid)=>{
      this.setState({isLoading:true},()=>{
        this.props.history.push(`/UserCountDetail/${pageid}`);
      })
    }

    goHome=()=>{
      this.props.history.replace('/UserCount')
    }
  
    goBack=()=>{
      this.props.history.goBack()
    }

    render(){
      const { childTitle,childDatas,btnGroups,curIndex,chartTitle,chartDate,chartDatas,tableSource,isLoading}=this.state;

      const colums=[
        {
          title: '组织名称',
          dataIndex: 'structureName',
          key: 'structureName'
        },
        {
          title: '发布心愿人数(个)',
          dataIndex: 'publishcount',
          key: 'publishcount'
        },
        {
          title: '志愿者参与人数(个)',
          dataIndex: 'joincount',
          key: 'joincount'
        },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          render:(txt,record)=>(
            <a role="button" className="seek-btn" onClick={()=>{this.seekInfo(record.userId)}}>查看详情</a>
          )
        },
      ]
        return(
          <div className="count-container">
            <Spin spinning={isLoading}>
              <Breadcrumb className="breadcrumbBox">
                <Breadcrumb.Item>
                  <span className={'title-active'}>
                    {this.props.navTitle}
                  </span>
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className='eachPageBox'>
              <div style={{ height: '100%' }}>
                <div className="mainContentBox">
                  <div className="nav-btn-block">
                      <Button className="backhome" type="primary" onClick={this.goHome}>返回主页</Button>
                      <Button onClick={this.goBack}>返回上一级</Button>
                  </div>
                  <ChildData childTitle={childTitle} childDatas={childDatas}/>
                  <div className="chart-show-container">
                    <Card title="当前组织数据趋势" bordered={false}>
                      <div className="chart-btn-group">
                          {
                            btnGroups.map((item,index)=>(
                              <div className="btn-items2" key={index}>
                                <Button onClick={()=>{this.chooseTypes(index,item.type)}} type={curIndex===index?'primary':'default'}>{item.name}</Button>
                              </div>
                            ))
                          }
                      </div>
                      <div className="chart-wraps">
                          <Chartor 
                            chartTitle={chartTitle}
                            chartDate={chartDate}
                            chartDatas={chartDatas}
                          />
                      </div>
                    </Card>
                  </div>
                  <div className="count-table-container">
                    <Card title="下属组织明细" bordered={false}>
                        <Table
                          dataSource={tableSource}
                          columns={colums}
                          rowKey='userId'
                          pagination={false}
                        />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            </Spin>
          </div>
        )
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
  
  export default connect(mapState, mapDispatch)(ActvCount);