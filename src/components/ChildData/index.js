import React, { Component } from 'react';
import { Card } from 'antd';
import './index.less';

export default class ChildData extends Component{
    constructor(props){
        super()
    }

    render(){
        return(
            <div className="childData-container">
                <Card title={this.props.childTitle} bordered={false}>
                    <ul className="child-contents">
                        {
                            this.props.childDatas.map((item,index)=>(
                                <li key={index}>
                                    <p className="child-nums">{item.nums}</p>
                                    <p>{item.name}</p>
                                </li>
                            ))
                        }
                    </ul>
                </Card>
            </div>
        )
    }
}