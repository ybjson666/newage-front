import { message } from 'antd';
// import request from './request';
// window.mfUploaderData = {};
// window.tempUploaderData = [];
  const myUploader = function(options,callback) { //定义插件的名称，这里为userCp
    let dft = {
      //以下为该插件的属性及其默认值
      name: "", //表单name
      accept:{}, //文件上传条件
      fileNumLimit:9,//上传数量
      formData:{}
    };

    let ops = $.extend(dft,options);
    // let $list =  $(ops.list);
    //let uploadQuery = "";
    // if (ops.formData.type == "video" || ops.formData.type == "voice") {
    //uploadQuery = "?type=" + ops.formData.type;
    // }
    // 初始化Web Uploader
    let uploader = WebUploader.create({
      // 选完文件后，是否自动上传。
      auto: true,
      swf: '/js/Uploader.swf',
      // 文件接收服务端。
      server: options.server,
      //server: 'http://yanshiscms.sobeycloud.com/scms//api/revelation/uploadImg?noLogin=false&TenantID=default&userName=666&nickName=1111&uid=11&token=22',
      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: {
        id: '#'+options.id,
        multiple: false,
        innerHTML:''
      },
      fileVal:'upfile',
      method:'POST',
      formData:options.formData,
      // 只允许选择图片文件。
      accept:options.accept,
      duplicate: true,
      fileNumLimit:options.fileNumLimit
    });

    // $(this).find('.webuploader-pick').html('+')

    uploader.on( 'error', function( type ){
      var msg = '';
      if(type == 'Q_EXCEED_NUM_LIMIT'){
        msg='已超过上传数量上限';
      }else if(type == 'Q_EXCEED_SIZE_LIMIT'){
        msg='文件过大';
      }else if(type == 'Q_TYPE_DENIED'){
        msg='请传入规定的文件类型';
      }else{
        msg='请勿传入同一文件';
      }
      // layer.open({
      //   skin: 'msg'
      //   ,time: 5 //2秒后自动关闭'
      //   ,content: msg
      // });
      return false;
    });

    // 缩略图大小
    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ){
      // console.log(file);
      // console.log(typeof callback);
      if(typeof callback == 'function'){
        // console.log(file);
        callback({
          state:'fileQueued',
          data:file
        });
      }
      // window.tempUploaderData.push(file);
      if($('#fileList_upload_content .file-item.thumbnail').length>=ops.fileNumLimit){
        uploader.removeFile(uploader.getFile(file.id));
        message.info('已超过上传数量上限')
        // layer.open({
        //   skin: 'msg'
        //   ,time: 5 //2秒后自动关闭'
        //   ,content: '已超过上传数量上限'
        // });
        return false;
      }
      // var $li = $(
      //   '<div id="' + file.id + '" class="file-item thumbnail">' +
      //   '<img>' +
      //   '<i class="delBtn"  style="display:none;" id="delBtn_'+file.id+'">x</i>'+
      //   '<i class="cancelBtn" id="cancelBtn_'+file.id+'">x</i>'+
      //   '</div>'
      //   ),
      //   $img = $li.find('img');

      // $list为容器jQuery实例
      // $list.append( $li );
      // 创建缩略图
      // 如果为非图片文件，可以不用调用此方法。
      // thumbnailWidth x thumbnailHeight 为 80 x 80
      if(file.type.indexOf('image') != -1){
        uploader.makeThumb( file, function( error, src ) {
          // if ( error ) {
          //   $img.replaceWith('<span>文件不能预览</span>');
          //   return;
          // }
          // $img.attr( 'src', src );
        }, this.options.accept.thumbnailWidth, this.options.accept.thumbnailHeight );
      }
      // else if(ops.formData.type.indexOf('video') != -1) {
      //   $img.attr('src', './img/defVideo.png');
      // }
      // }else if(file.type.indexOf('audio') != -1){
      //     $img.attr('src','./img/defAudio.png');
      // }

      // $li.on('click', '.cancelBtn', function() {
      //   uploader.removeFile( file,true);
      //   $(this).parent('div').remove();
      // })

      // $li.on('click', '.delBtn', function() {
      //   $(this).parent('div').remove();
      //   $.each(window.tempUploaderData ,function(i,key){
      //     if(key.id == file.id){
      //       tempUploaderData.splice(i,1);
      //       uploader.removeFile( file,true);
      //       return false;
      //     }
      //   })

        // if(window.mfUploaderData&&window.mfUploaderData[ops.name]){
        //   $.each(window.mfUploaderData[ops.name] ,function(i,key){
        //     if(key.id == file.id){
        //       if(window.mfUploaderData[ops.name].length == 1){
        //         delete  window.mfUploaderData[ops.name];
        //       }else{
        //         window.mfUploaderData[ops.name].splice(i,1);
        //       }
        //       uploader.removeFile( file,true);
        //       return false;
        //     }
        //   })
        // }
      })


    // });


    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
      // var $li = $( '#'+file.id ),
      //   $percent = $li.find('.progressWrap');
      //
      // // 避免重复创建
      // if ( !$percent.length ) {
      //   $percent = $('<div class="progressWrap"><p class="progress"><span class="progressStatus"></span></p><span class="progressNum"> </span></div>')
      //     .appendTo( $li );
      // }
      // var percentage
      // if(percentage>0.99){
      //   percentage = '99%';
      // }else{
      //   percentage = (percentage * 100).toFixed(2) + '%';
      // }
      if(typeof callback == 'function'){
        callback({
          state:'uploadProgress',
          data:file,
          pertent:percentage
        });
      }
      // $percent.find('.progressStatus').css('width', percentage);
      // $percent.find('.progressNum').html(percentage);

    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function( file ) {
      // $( '#'+file.id ).addClass('upload-state-done');
      if(typeof callback == 'function'){
        callback({
          state:'uploadSuccess',
          data:file,
        });
      }
    });

    // 文件上传失败，显示上传出错。
    uploader.on( 'uploadError', function( file ) {
      // var $li = $( '#'+file.id ),
      //   $error = $li.find('div.error');
      //
      // // 避免重复创建
      // if ( !$error.length ) {
      //   $error = $('<div class="error"></div>').appendTo( $li );
      // }
      // $error.text('上传失败');
      if(typeof callback == 'function'){
        callback({
          state:'uploadError',
          data:file,
        });
      }
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete',function(file,response) {
      // var $li = $( '#'+file.id ),
      //   $percent = $li.find('.progressWrap');
      // $percent.find('.progressStatus').css('width', '100%');
      // $percent.find('.progressNum').html('100%');
      // $( '#'+file.id ).find('.progressWrap').fadeOut();
      // $('#cancelBtn_'+file.id).hide();
      // $('#delBtn_'+file.id).show();
      // if(typeof callback == 'function'){
      //     callback({
      //         state:'uploadComplete',
      //         data:file,
      //     });
      // }
    });
    //得到后台返回数据
    uploader.on('uploadAccept',function(file,response) {
      //console.log(response);
      if(typeof callback == 'function'){
        callback({
          state:'uploadAccept',
          data:file,
          response:response
        });
      }
      // if(response.code == 200){
      //   !window.mfUploaderData[ops.name] ? window.mfUploaderData[ops.name] = [{id:file.file.id,src:response.data}] : window.mfUploaderData[ops.name].push({id:file.file.id,src:response.data});
      // }else{
      //   // layer.open({
      //   //     skin: 'msg'
      //   //     ,time: 10 //2秒后自动关闭
      //   //     ,content: '上传成功'
      //   // });
      //   // layer.msg('上传成功');
      // }

    });

  }
export default myUploader;
