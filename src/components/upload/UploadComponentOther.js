import React from 'react';
import { Button, Upload, Icon, message, Modal } from 'antd';
// import {getToken} from "../../utils/auth";
import './index.less';
import { uploadCustomImg } from '../../api/volunteerList';
import { imgUrl } from '../../utils/config';
import { getIdsObj } from '../../utils/getIdsObj';
import getCookie from '../../utils/cookie';
//头
const urlParams = getIdsObj(window.location.search);
//b:loginid login tid
// h :access_token
const cookieData = getCookie();
let stag = urlParams.stag;
if (stag) {
  stag = stag.replace('\/', '');
}
let headerData = {};
if (stag === 'H') {
  headerData = {
    access_token: cookieData.access_token,
    stag: 'H'
  };
} else {
  headerData = {
    login_id: cookieData.login_chinamcloud_id,
    login_tid: cookieData.login_chinamcloud_tid,
    stag: 'B'
  };
}

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
      value: ''
    };
    const imageDefaultType = ['image/png', 'image/jpg', 'image/jpeg'];
    const instance = this;
    this.uploadProps = {
      name: 'file',
      action: this.props.api || '/v1/picture/admin/uploadf' || '/v1/picture/admin/upload',
      showUploadList: false,
      accept: this.props.accept,
      data: headerData,
      // headers: {
      // Authorization: `Bearer ${getToken()}`,
      // },
      beforeUpload(file, fileList) {
        // debugger;
        // if(this.imageTypefile.type)
        // console.log(file);
        if (!imageDefaultType.includes(file.type)) {
          message.info('请上传png,jpg,jpeg格式图片');
          return false;
        }
        // var reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = function() {
        //   const url = reader.result;
        //   uploadCustomImg({ file: reader.result }).then(res => {
        //     if(!res||!res.success)return;
        //     if ('onChange' in instance.props) {
        //       instance.props.onChange(res);
        //       message.success(` 上传成功!`);
        //     }
        //     instance.setState({
        //       value: url
        //     });
        //   }).catch(err=>{
        //     message.success(` 上传失败,请重新上传!`);
        //   });
        // };
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          instance.currentUpdateUrl = reader.result;
        };
        return true;
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
          if (info.file.response.success) {
            message.success(`上传成功`);
            instance.setState({ value: instance.currentUpdateUrl });
            if ('onChange' in instance.props) {
              instance.props.onChange(info.file.response);
              message.success(` 上传成功!`);
            }
          } else {
            message.error(`上传失败`);
            instance.props.error && instance.props.error();
          }
        } else if (info.file.status === 'error') {
          message.error(`上传失败`);
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { imgValue } = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (imgValue) {
      return {
        value: imgValue
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  render() {
    return (
      <Upload disabled={this.props.disabled} className='upload-inline' {...this.uploadProps}
              ref={node => this.node = node}>
        {this.state.value ?
          <img src={this.state.value} style={{ width: '100%', height: '100%' }} alt=""/>
          : <Button onClick={this.buttonClick} type="link" block>
            {this.props.buttonText || '上传图片'}
          </Button>}
      </Upload>
    );
  }
}
