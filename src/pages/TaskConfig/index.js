import React, { Component } from 'react';
import {
    Table,
    Form,
    Row,
    Col,
    Modal,
    InputNumber
  } from 'antd';
import './index.less';

class TaskConfig extends Component {
    constructor(){
        super();
        this.state={
            isLoading:false,
            isOpen:false,
            configList:[
                {
                    index:'1',
                    code:'<span>我是配置代码<span>',
                    config:'12小时',
                    desc:'任务超时退回时间'
                },
                {
                    index:'2',
                    code:'<span>我是配置代码<span>',
                    config:'12小时',
                    desc:'任务超时退回时间'
                },
                {
                    index:'3',
                    code:'<span>我是配置代码<span>',
                    config:'12小时',
                    desc:'任务超时退回时间'
                },
                {
                    index:'4',
                    code:'<span>我是配置代码<span>',
                    config:'12小时',
                    desc:'任务超时退回时间'
                }
            ]
        }
    }

    //打开模态框
    openModal=()=>{
        this.setState({
            isOpen:true
        })
    }
    //关闭模态框
    closeModal=()=>{
        this.setState({
            isOpen:false
        })
    }
    handleOk=()=>{

    }


    render(){

        const { getFieldDecorator } = this.props.form;

        const colums=[
            {
                title: '序号',
                dataIndex: 'index',
                align: 'left'
            },
            {
                title: '配置代码',
                dataIndex: 'code',
                align: 'left'
            },
            {
                title: '配置值',
                dataIndex: 'config',
                align: 'left'
            },
            {
                title: '配置描述',
                dataIndex: 'desc',
                align: 'left'
            },
            {
                title: '操作',
                dataIndex: 'operate',
                align: 'left',
                render:()=>{
                    return <a role="button" onClick={()=>{this.openModal()}}>修改</a>
                }
            }
        ]

        const formItemLayout={
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
              },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        }
        return(
            <div className="task-config-wraper">
                <Table
                 className="tableCont mainContentBox"
                 rowKey="index"
                 columns={colums}
                 dataSource={this.state.configList}
                 loading={this.state.listLoading}
                />
                {
                    this.state.isOpen?
                    <Modal
                        title="修改配置项"
                        visible={this.state.isOpen}
                        onOk={this.handleOk}
                        onCancel={this.closeModal}
                        width={600}
                    >
                        <div className="config-modal-wraper">
                            <Form className='form-part' {...formItemLayout} onSubmit={this.handleOk}>
                                <Row>
                                <Col span={18}>
                                    <Form.Item label="配置项">
                                    {getFieldDecorator('configTime', {
                                        initialValue:undefined,
                                        rules: [
                                        {
                                            required:true,
                                            message: '请填写时间'
                                        }
                                        ],
                                    })(<InputNumber max={10000}  min={1} style={{ width: '200px' }}
                                    placeholder='请填写时间'/>)}<span style={{'marginLeft':'5px'}}>小时</span>
                                    </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Modal>:null
                }
                
            </div>
        )
    }
}
const Task=Form.create()(TaskConfig);
export default Task;