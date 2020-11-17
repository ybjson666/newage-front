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
 import { getTaskCount } from '@/api/count'
  class ActvCount extends Component{

    constructor(props){
      super();
      this.state={
        childTitle:'当前组织数据概览',
        childDatas:[
          {
            nums:0,
            name:'待完成任务(个)'
          },
          {
            nums:0,
            name:'已完成任务(个)'
          }
        ],
        btnGroups:[
          {
            type:'add',
            name:'新增任务'
          },
          {
            type:'down',
            name:'完成任务'
          }
        ],
        curIndex:0,
        dataType:0,
        isLoading:true,
        chartTitle:"近七日每日新增任务数 (个)",
        chartDate:['06-01','06-02','06-03','06-04','06-05','06-06','06-07'],
        chartDatas:[
          {
            color:'#5b8ff9',
            datas:[0,0,0,0,0,0,0],
          }
        ],
        tableSource:[],
        dataGroups:{
          'add':[
            {
              color:'#5b8ff9',
              datas:[0,0,0,0,0,0,0],
            }
          ],
          'down':[
            {
              color:'#5b8ff9',
              datas:[0,0,0,0,0,0,0],
            }
          ]
        }
      }
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
      const result=await getTaskCount({uid});

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
          childDatas[0].nums=top.nocount||0;
          childDatas[1].nums=top.okcount||0;

          //折线图数据
          dataGroups.add[0].datas=middle.creTask.reverse();
          dataGroups.down[0].datas=middle.comTask.reverse();
          chartDatas[0].datas=middle.creTask.reverse();
         

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

    titleGroups={
      'add':'近七日每日新增任务数 (个)',
      'down':'近七日每日完成任务数 (个)'
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
        this.props.history.push(`/TaskCountDetail/${pageid}`);
      })
    }

    goHome=()=>{
      this.props.history.replace('/TaskCount')
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
          title: '待完成任务数(个)',
          dataIndex: 'nocount',
          key: 'nocount'
        },
        {
          title: '已完成任务数(个)',
          dataIndex: 'okcount',
          key: 'okcount'
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
                              <div className="btn-items3" key={index}>
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