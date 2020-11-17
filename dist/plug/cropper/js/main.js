$(function () {

  function GetRequest(){

    if(location.href.indexOf('?') == -1){
      return {};
    }
    var url = location.href.split('?')[1].split('#')[0]; //获取url中"?"符后"#"前的字串 
    var theRequest = {};
    var str = url;
    var strs;
    if (str.indexOf("&") != -1) {
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          var splitData = strs[i].split("=");
            if(splitData.length > 2){
              var index = strs[i].indexOf('=');
              theRequest[splitData[0]] = unescape(strs[i].substr(index+1));
            }else{
              theRequest[splitData[0]] = unescape(splitData[1]);
            }

        }
    } else {
        theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
    }
    return theRequest;

  }


  /**
 * 网络图像文件转Base64
 */
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}
 
 
/**
*Base64字符串转二进制
*/
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}
 
 
var img = window.parent.editorData.cropperBase64;
var image = new Image();
//image.crossorigin="anonymous";
image.setAttribute("crossOrigin",'Anonymous')
image.src = img;
image.onload = function() {
    //这样就获取到了文件的Base64字符串
    var base64 = getBase64Image(image);
    //Base64字符串转二进制
    var file = dataURLtoBlob(base64);
}

  'use strict';
$('#image').attr('src',img);
  var console = window.console || { log: function () {} };
  var URL = window.URL || window.webkitURL;
  var $image = $('#image');
  var $Base64Img = $('#Base64Img');
  var $dataX = $('#dataX');
  var $dataY = $('#dataY');
  var $dataHeight = $('#dataHeight');
  var $dataWidth = $('#dataWidth');
  var $dataRotate = $('#dataRotate');
  var $dataScaleX = $('#dataScaleX');
  var $dataScaleY = $('#dataScaleY');
  var cropperSize = window.parent.editorData.cropperSize;
  var options = {
        aspectRatio:  cropperSize ||(4 / 3),
        minCropBoxWidth: 50,
        minCropBoxHeight: 50,
        preview: '.img-preview',
        viewMode:1,
        crop: function (e) {
          $dataX.val(Math.round(e.detail.x));
          $dataY.val(Math.round(e.detail.y));
          $dataHeight.val(Math.round(e.detail.height));
          $dataWidth.val(Math.round(e.detail.width));
          $dataRotate.val(e.detail.rotate);
          $dataScaleX.val(e.detail.scaleX);
          $dataScaleY.val(e.detail.scaleY);
        }
      };
  var originalImageURL = $image.attr('src');
  var uploadedImageName = 'cropped.jpg';
  var uploadedImageType = 'image/jpeg';
  var uploadedImageURL;


  // Tooltip
  //$('[data-toggle="tooltip"]').tooltip();


  // Cropper
  $image.on({
    ready: function (e) {
      console.log(e.type);
    },
    cropstart: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
      console.log(e.type, e.detail.action);
    },
    crop: function (e) {
      console.log(e.type);
    },
    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    }
  }).cropper(options);


  // Buttons
  if (!$.isFunction(document.createElement('canvas').getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }


  // Download
  // if (typeof $download[0].download === 'undefined') {
  //   $download.addClass('disabled');
  // }


  // Options
  $('.docs-toggles').on('change', 'input', function () {
    var $this = $(this);
    var name = $this.attr('name');
    var type = $this.prop('type');
    var cropBoxData;
    var canvasData;

    if (!$image.data('cropper')) {
      return;
    }

    if (type === 'checkbox') {
      options[name] = $this.prop('checked');
      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');

      options.ready = function () {
        $image.cropper('setCropBoxData', cropBoxData);
        $image.cropper('setCanvasData', canvasData);
      };
    } else if (type === 'radio') {
      options[name] = $this.val();
    }

    $image.cropper('destroy').cropper(options);
  });


  // Methods
  $('.docs-buttons').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var cropper = $image.data('cropper');
    var cropped;
    var $target;
    var result;

    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if (cropper && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== 'undefined') {
        $target = $(data.target);

        if (typeof data.option === 'undefined') {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      cropped = cropper.cropped;

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('clear');
          }

          break;

        case 'getCroppedCanvas':
          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break;
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('crop');
          }

          break;

        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
            // Bootstrap's Modal
            //$('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
           // if (!$download.hasClass('disabled')) {
             // download.download = uploadedImageName;
              $Base64Img.attr('src', result.toDataURL(uploadedImageType));
            //}
          }

          break;

        case 'destroy':
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            $image.attr('src', originalImageURL);
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }

    }
  });


  // Keyboard
  $(document.body).on('keydown', function (e) {

    if (!$image.data('cropper') || this.scrollTop > 300) {
      return;
    }

    switch (e.which) {
      case 37:
        e.preventDefault();
        $image.cropper('move', -1, 0);
        break;

      case 38:
        e.preventDefault();
        $image.cropper('move', 0, -1);
        break;

      case 39:
        e.preventDefault();
        $image.cropper('move', 1, 0);
        break;

      case 40:
        e.preventDefault();
        $image.cropper('move', 0, 1);
        break;
    }

  });


  // Import image
  var $inputImage = $('#inputImage');

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;

      if (!$image.data('cropper')) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          uploadedImageName = file.name;
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
          $inputImage.val('');
        } else {
          window.alert('请上传图片文件.');
        }
      }
    });
  } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
  }

});
