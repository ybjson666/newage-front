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
 import { getActvCount } from '@/api/count'
 

  class ActvCount extends Component{

    constructor(props){
      super();
      this.state={
        childTitle:'当前组织数据概览',
        childDatas:[
          {
            nums:0,
            name:'活动举办数量(场)'
          },
          {
            nums:0,
            name:'活动参与人次(次)'
          },
          {
            nums:0,
            name:'活动举办时长(小时)'
          }
        ],
        btnGroups:[
          {
            type:'actvnums',
            name:'活动数量'
          },
          {
            type:'joinnums',
            name:'参与人次'
          },
          {
            type:'actvtimes',
            name:'活动时长'
          }
        ],
        isLoading:true,
        curIndex:0,
        dataType:0,
        chartTitle:"近七日新增活动 (场)",
        chartDate:[],
        chartDatas:[
          {
            name:'实践活动',
            color:'#5b8ff9',
            datas:[0,0,0,0,0,0,0],
          },
          {
            name:'招募活动',
            color:'#5ad8a6',
            datas:[0,0,0,0,0,0,0]
          }
        ],
        tableSource:[],
        dataGroups:{
          actvnums:[
            {
              name:'实践活动',
              color:'#5b8ff9',
              datas:[0,0,0,0,0,0,0,0],
            },
            {
              name:'招募活动',
              color:'#5ad8a6',
              datas:[0,0,0,0,0,0,0,0]
            }
          ],
          joinnums:[
            {
              name:'实践活动',
              color:'#5b8ff9',
              datas:[0,0,0,0,0,0,0,0],
            },
            {
              name:'招募活动',
              color:'#5ad8a6',
              datas:[0,0,0,0,0,0,0,0]
            }
          ],
          actvtimes:[
            {
              name:'实践活动',
              color:'#5b8ff9',
              datas:[0,0,0,0,0,0,0,0],
            },
            {
              name:'招募活动',
              color:'#5ad8a6',
              datas:[0,0,0,0,0,0,0,0]
            }
          ]
        }
      }
    }

    titleGroups={
      actvnums:'近七日新增活动 (场)',
      joinnums:'近七日新增活动参与人次 (次)',
      actvtimes:'近七日每日活动时长 (小时)'
    }

    componentDidMount=()=>{
      this.fetchData();
    }

    fetchData= async()=>{
      let { childDatas,dataGroups,chartDatas }=this.state;
      let uid="-1";
      const result=await getActvCount({uid});
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
          childDatas[0].nums=top.sumSeason||0;
          childDatas[1].nums=top.sumPersonTime||0;
          childDatas[2].nums=Math.round(top.sumTimes)||0;

          //折线图数据
          dataGroups.actvnums[0].datas=middle.arPersonTime.reverse();
          dataGroups.actvnums[1].datas=middle.apPersonTime.reverse();
          dataGroups.joinnums[0].datas=middle.arSeason.reverse();
          dataGroups.joinnums[1].datas=middle.apSeason.reverse();
          dataGroups.actvtimes[0].datas=middle.arTime.reverse();
          dataGroups.actvtimes[1].datas=middle.apTime.reverse();
          chartDatas[0].datas=middle.arPersonTime.reverse();
          chartDatas[1].datas=middle.apPersonTime.reverse();

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
      let chartDatas=this.state.dataGroups[dataType];
      this.setState({
        curIndex,
        dataType,
        chartTitle,
        chartDatas
      })
    }

    //查看详情
    seekInfo=(pageid)=>{
      this.props.history.push(`/ActvCountDetail/${pageid}`);
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
          title: '活动举办数(场)',
          dataIndex: 'sumSeason',
          key: 'sumSeason'
        },
        {
          title: '活动参与人次(次)',
          dataIndex: 'sumPersonTime',
          key: 'sumPersonTime'
        },
        {
          title: '活动举办时长(小时)',
          dataIndex: 'sumTimes',
          key: 'sumTimes',
          render:(text)=>{
            if(text){
              return <span>{parseInt(text)}</span>
            }else{
              return <span>0</span>
            }
          }
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
                  <ChildData childTitle={childTitle} childDatas={childDatas}/>
                  <div className="chart-show-container">
                    <Card title="当前组织数据趋势" bordered={false}>
                      <div className="chart-btn-group">
                          {
                            btnGroups.map((item,index)=>(
                              <div className="btn-items" key={index}>
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