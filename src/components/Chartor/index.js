import React, { Component } from 'react';
import echarts from 'echarts';


export default class Chartor extends Component{
    constructor(props){
        super()
    }
    componentWillReceiveProps=(nextProps)=>{
        this.props=nextProps;
        this.initEchart();
    }

    initEchart=()=>{
        const { chartTitle,chartDate,chartDatas }=this.props;
        var myChart = echarts.init(document.getElementById('echartor'));
        let series=chartDatas.map((item)=>(
            {
                name: item.name||"",
                type: 'line',
                smooth: true,
                symbol:"circle",
                symbolSize:6,
                lineStyle:{
                    color:item.color,
                },
                itemStyle:{
                    color:item.color
                },
                data: item.datas
            }
        ))
        let legendata=chartDatas.map(item=>(
            item.name||""
        ))
        
        let options={
            title: { 
                text: chartTitle,
                x:'center',
                textAlign:'auto'
            },
            tooltip: {},
            grid:{
                width:"90%",
                left:'3%',
                top:100
            },
            xAxis: {
                data: chartDate,
                type: 'category',
                boundaryGap: false,
            },
            legend:{
                data:legendata,
                top:40,
                align:'auto',
                x:'center'
            },
            yAxis: {
                type:'value'
            },
            series: series
        }
        // 绘制图表
        myChart.setOption(options,true);
    }
    componentDidMount=()=>{
        this.initEchart();
    }
    render(){
        return(
            <div className="chart-container" id="echartor" style={{height:400}}></div>
        )
    }
}