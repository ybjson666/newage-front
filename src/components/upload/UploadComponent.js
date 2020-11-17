import React from 'react';
import { Button, Upload, Icon, message, Modal } from 'antd';
// import {getToken} from "../../utils/auth";
import './index.less';
import { uploadImg } from '../../api/volunteerList';

function getImgToBase64(url, callback) {//将图片转换为Base64
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image;
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/png');
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}

export default class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      imageSrc: ''
    };
    const instance = this;
    this.uploadProps = {
      name: 'file',
      action: this.props.api || '/v1/spider-newera/customer/admin/uploadFace',
      showUploadList: false,
      accept: this.props.accept,
      // headers: {
      // Authorization: `Bearer ${getToken()}`,
      // },
      beforeUpload(file, fileList) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          const url = reader.result;
          uploadImg({ base64: reader.result }).then(res => {
            if ('success' in instance.props) {
              instance.props.success(res);
              message.success(` 上传成功,请点击保存!`);
            }
            instance.setState({
              imageSrc: url
            });
          }).catch(err=>{
            message.success(` 上传失败,请重新上传!`);
          });
        };
        return false;
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
          instance.props.success && instance.props.success();
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
          instance.props.error && instance.props.error();
        }
      }
    };
  }

  buttonClick = () => {
    const { type = 'upload' } = this.props;
    if (type === 'look') {
      this.setState({ visible: true });
    }
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div className='upload-inline'>
        <div className={`pic-part ${this.props.className}`}>
          <img src={this.state.imageSrc || this.props.src ||''} alt="" width='400'/>
        </div>
        {this.props.src && this.props.type === 'upload'?'': <Upload {...this.uploadProps} ref={node => this.node = node}>
          {this.props.src && this.props.type === 'upload' ? <Button onClick={this.buttonClick} type="link" block>
            {this.props.buttonText || '上传图片'}
          </Button> : ''}
          {this.props.type === 'text' ? <Button onClick={this.buttonClick} type="link" block>
            {this.props.buttonText || '上传图片'}
          </Button> : ''}
        </Upload>}
        {this.props.src && this.props.type === 'look' ? <Button onClick={this.buttonClick} type="link" block>
          {this.props.buttonText || '上传图片'}
        </Button> : ''}
        <Modal
          title="查看图片"
          visible={this.state.visible}
          className='img-look-modal'
          onCancel={this.handleCancel}
          footer={null}
        >
          <img src={this.props.src} alt=""/>
        </Modal>
      </div>
    );
  }
}
