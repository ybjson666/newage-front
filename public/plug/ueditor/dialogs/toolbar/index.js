(function(G, $) {

    var ROOT_URL = "";
    var CONTEXT_PATH = "";
    var dateNum = false; //  自定义插入日期bug-会莫名其妙执行两次
    var timeNum = false; //  自定义插入时间bug-会莫名其妙执行两次
    var ctrlKeyV = false; // 粘贴-不重复执行
    var clearFormat = false; //清除格式
    var chiyh = false; //  中文引号 -bug
    var timeNum135 = false; //  135
    var colorAndBack = false; //  135 编号样式bug
    var updaVodepAndMob = false; //插入视频、图片、组件后不换行的bug
    var contentPa = ""; // 编辑器内容
    var mobSHowHide = 'show'; //侧栏显示开关
    var editorWidth = 1280;
    var isFullscreen = false;

    // plugins/lineheight.js
/**
 * 设置行内间距
 * @file
 * @since 1.2.6.1
 */



    G.Index = function() {

    };

    Index.prototype.api = function(endpoint, body, method, success, error) {
        var url = ROOT_URL + CONTEXT_PATH + endpoint;
        $.ajax({
            type: method,
            url: url,
            data: body,
            dataType: 'json',
            success: function(msg) {
                success(msg);
            },
            error: function(msg) {
                error(msg);
            }
        });
    };
    Index.prototype.setContentInfo = function(res) {
        contentPa = res;
    };
    Index.prototype.html = {
        toolbarDate: function() {
            for (var key in toolBarArray) {
                this.toolbarHtml(key, toolBarArray[key]);
            }
        },
        toolbarHtml: function(toolName, toolLists) {
            //var  editor = UE.getEditor("WxMsgContent");
            // 工具栏tab切换 默认选中第一个
            // var toolBarTabHtml = '<div class="zving-toolbarTab-item item1 edui-default">' + toolName + '</div>';
            // $("#tx-toolBarTab").append(toolBarTabHtml);
            // $("#tx-toolBarTab").children(".zving-toolbarTab-item.item1.edui-default:eq(0)").addClass("current");


            // var childHtml = "";
            // for (var key in toolLists) {

            //     var findDomTr1 = "";
            //     var findDomTr2 = "";
            //     for (var i = 0; i < toolLists[key].length; i++) {
            //         for (var j = 0; j < toolLists[key][i].length; j++) {
            //             var classNameBef = "edui-button"; //普通按钮
            //             if (toolLists[key][i][j] == "fontfamily" || toolLists[key][i][j] == "fontsize" || toolLists[key][i][j] == "customstyle" || toolLists[key][i][j] == "paragraph" || toolLists[key][i][j] == "insertcode") {
            //                 classNameBef = "edui-combox"; //下拉
            //             } else if (toolLists[key][i][j] == "forecolor" || toolLists[key][i][j] == "backcolor" || toolLists[key][i][j] == "autotypeset" || toolLists[key][i][j] == "emotion" || toolLists[key][i][j] == "inserttable") {
            //                 classNameBef = "edui-splitbutton"; //按钮下拉
            //             } else if (toolLists[key][i][j] == "insertorderedlist" || toolLists[key][i][j] == "insertunorderedlist" || toolLists[key][i][j] == "rowspacingtop" || toolLists[key][i][j] == "rowspacingbottom" || toolLists[key][i][j] == "lineheight") {
            //                 classNameBef = "edui-menubutton";
            //             }

            //             //                        $("#UEditor").find(".edui-box."+classNameBef+".edui-for-"+toolLists[key][i][j]+".edui-default").addClass("tx-hide");

            //             if (i == 0) {
            //                 if (toolLists[key][i][j] == "vote" || toolLists[key][i][j] == "newImage" || toolLists[key][i][j] == "newVideo" || toolLists[key][i][j] == "newFile" || toolLists[key][i][j] == "meiTu" || toolLists[key][i][j] == "htxPreview" || toolLists[key][i][j] == "ziJianJu" || toolLists[key][i][j] ==  '135Editor') {
            //                     var tit = "";
            //                     if (toolLists[key][i][j] == "vote") {
            //                         tit = "添加投票和问卷";
            //                     }

            //                     //鼠标移动上去的title显示
            //                     if (toolLists[key][i][j] == "newImage") {
            //                         tit = "上传图片";
            //                     } else if (toolLists[key][i][j] == "newVideo") {
            //                         tit = "上传视频";
            //                     } else if (toolLists[key][i][j] == "newFile") {
            //                         tit = "上传附件";
            //                     } else if (toolLists[key][i][j] == "meiTu") {
            //                         tit = "美图秀秀";
            //                     } else if (toolLists[key][i][j] == "ziJianJu") {
            //                         tit = "字间距";
            //                     } else if (toolLists[key][i][j] == "htxPreview") {
            //                         tit = "手机预览图文";
            //                     }else if( toolLists[key][i][j] == '135Editor'){
            //                         tit = "编辑器插件";
            //                     }

            //                     if (toolLists[key][i][j] == "ziJianJu") {
            //                         findDomTr1 += '<select id="ziJianJuSelect">' + '<option value="0">字间距</option>' + '<option value="1">1px</option>' + '<option value="2">2px</option>' + '<option value="3">3px</option>' + '<option value="4">4px</option>' + '<option value="5">5px</option>' + '<option value="6">6px</option>' + '</select>';
            //                     } else {
            //                         findDomTr1 += '<div id="' + toolLists[key][i][j] + '" class="edui-box edui-button edui-for-' + toolLists[key][i][j] + ' edui-default tx-hide">' + '<div id="edui170_state" class="edui-default">' + '<div class="edui-button-wrap edui-default">' + '<div id="edui170_body" title="' + tit + '" class="edui-button-body edui-default">' + '<div class="edui-box edui-icon edui-default"></div>' + '<div class="edui-box edui-label edui-default"></div>' + '</div>' + '</div>' + '</div>' + '</div>';
            //                     }
            //                 } else {
            //                     findDomTr1 += $(".edui-box." + classNameBef + ".edui-for-" + toolLists[key][i][j] + ".edui-default").prop("outerHTML");
            //                     $("#UEditor").find(".edui-box." + classNameBef + ".edui-for-" + toolLists[key][i][j] + ".edui-default").remove();
            //                 }
            //             } else {
            //                 if (toolLists[key][i][j] == "vote" || toolLists[key][i][j] == "newImage" || toolLists[key][i][j] == "newVideo" || toolLists[key][i][j] == "newFile" || toolLists[key][i][j] == "meiTu" || toolLists[key][i][j] == "htxPreview" || toolLists[key][i][j] == "ziJianJu" || toolLists[key][i][j] ==  '135Editor') {
            //                     var tit = "";
            //                     if (toolLists[key][i][j] == "vote") {
            //                         tit = "添加投票和问卷";
            //                     }

            //                     if (toolLists[key][i][j] == "newImage") {
            //                         tit = "上传图片";
            //                     } else if (toolLists[key][i][j] == "newVideo") {
            //                         tit = "上传视频";
            //                     } else if (toolLists[key][i][j] == "newFile") {
            //                         tit = "上传附件";
            //                     } else if (toolLists[key][i][j] == "meiTu") {
            //                         tit = "美图秀秀";
            //                     } else if (toolLists[key][i][j] == "ziJianJu") {
            //                         tit = "字间距";
            //                     } else if (toolLists[key][i][j] == "htxPreview") {
            //                         tit = "手机预览图文";
            //                     }else if( toolLists[key][i][j] == '135Editor'){
            //                         tit = "编辑器插件";
            //                     }

            //                     if (toolLists[key][i][j] == "ziJianJu") {
            //                         findDomTr2 += '<select id="ziJianJuSelect">' + '<option value="0">字间距</option>' + '<option value="1">1px</option>' + '<option value="2">2px</option>' + '<option value="3">3px</option>' + '<option value="4">4px</option>' + '<option value="5">5px</option>' + '<option value="6">6px</option>' + '</select>';
            //                     } else {
            //                         findDomTr2 += '<div id="' + toolLists[key][i][j] + '" class="edui-box edui-button edui-for-' + toolLists[key][i][j] + ' edui-default tx-hide">' + '<div id="edui170_state" class="edui-default">' + '<div class="edui-button-wrap edui-default">' + '<div id="edui170_body" title="' + tit + '" class="edui-button-body edui-default">' + '<div class="edui-box edui-icon edui-default"></div>' + '<div class="edui-box edui-label edui-default"></div>' + '</div>' + '</div>' + '</div>' + '</div>';
            //                     }
            //                 } else {
            //                     findDomTr2 += $(".edui-box." + classNameBef + ".edui-for-" + toolLists[key][i][j] + ".edui-default").prop("outerHTML");

            //                     $("#UEditor").find(".edui-box." + classNameBef + ".edui-for-" + toolLists[key][i][j] + ".edui-default").remove();
            //                 }
            //             }
            //         }

            //     }

            //     childHtml += '     <div class="zving-toolbarCon-item-separate edui-default">' + '     	  <table border="0" cellpadding="2" cellspacing="0" class="edui-default">' + '     	   	  <tbody class="edui-default">' + '     	  		  <tr class="edui-default txmin30">' + '     	  		  	  <td class="edui-default">' + '     	  		          <div class="edui-toolbar edui-default">' + '     	  		               ' + findDomTr1 + '' + '     	  		          </div>' + '     	  		  	  </td>' + '     	  		  </tr>' + '     	  		  <tr class="edui-default txmin30">' + '     	  		  	  <td class="edui-default">' + '     	  		          <div class="edui-toolbar edui-default">' + '     	  		               ' + findDomTr2 + '' + '     	  		          </div>' + '     	  		  	  </td>' + '     	  		  </tr>' + '     	  		  <tr class="edui-default">' + '     	  		  	  <td class="zving-toolbarCon-item-separate-label edui-default">' + '     	  		          ' + key + '' + '     	  		  	  </td>' + '     	  		  </tr>' + '     	  	  </tbody>' + '     	  </table>' + '     </div>';
            // }

            // var html = '	<div class="zving-toolbarCon-item edui-default">' + '		' + childHtml + '' + '	</div>';

            // $("#tx-toolbarCon").append(html);
            // $("#tx-toolbarCon").children(".zving-toolbarCon-item:eq(0)").addClass("show");

            //            字间距
            // $("#ziJianJuSelect").change(function() {
            //     var va = $(this).children('option:selected').val();
            //     var objs = document.getElementById('ueditor_0').contentWindow.document.getElementById('bjqView').getElementsByTagName("p");
            //     for (var i = 0; i < objs.length; i++) {
            //         objs[i].style.letterSpacing = va + "px";
            //     }
            // })

            // 粘贴-屏蔽-百度推广
            // editor.addListener("keydown", function(type, event) {
            // //     if (ctrlKeyV) {
            // //         //判断是不是ctrl + v
            // //         console.log(event);
            // //         console.log(event.keyCode);
            // //         if (event.ctrlKey && event.keyCode == 86) {
            // //             setTimeout(function() {
            // //                 var content = editor.getContent(); //获取内容
            // //                 console.log(content + '');
            // //                 xhIframe(content);
            // //             }, 500);
            // //         }
            // //         ctrlKeyV = false;
            // //     } else {
            // //         ctrlKeyV = true;
            // //     }
            // });

            function xhIframe(content) {
                var startIndex = content.indexOf("<iframe"); //开始位置
                var endIndex = content.indexOf("</iframe>"); //结束位置
                if (startIndex > 0 && endIndex > 0) {
                    endIndex = endIndex + 9;
                    var newContent = content.substring(startIndex, endIndex); //获取iframe
                    var nContent = content.replace(newContent, '');
                    xhIframe(nContent);
                } else {
                    //重新赋值
                    editor.focus();
                    editor.setContent(content);
                    //                    清除复制过来的img上的title,word_img和alt（app那边识别不了）
                    var objs = document.getElementById('ueditor_0').contentWindow.document.getElementById('bjqView').getElementsByTagName("img");
                    for (var i = 0; i < objs.length; i++) {
                        objs[i].removeAttribute("title");
                        objs[i].removeAttribute("alt");
                        objs[i].removeAttribute("word_img");
                    }
                }
            }
            //解决字体设置不对p标签生效,字体下拉框显示错误问题
             $('body').on("click", ".edui-for-fontfamily .edui-label.edui-listitem-label.edui-default", function(e) {
               
                // console.log( $(this).parents('.edui-for-fontfamily') );
                // console.log('=====')
                // if($(this).parents('.edui-for-fontfamily').length){

                // }else if(e.handleObj.selector.indexOf('.edui-for-fontfamily')){

                // }

                var editor1 = UE.getEditor("WxMsgContent");
                var getRange = editor1.selection.getRange();
                var startContainer = editor1.selection.getRange().startContainer;
                var endContainer = editor1.selection.getRange().endContainer;
                var document1 = editor1.selection.getRange().document;

                var dom = $(document.getElementById('ueditor_0').contentWindow.document.body).find(startContainer);
                var val = $(this).text();
                if(getRange.collapsed){
                }else{
                    var domNext = dom;
                    var htmlData = [];
                    console.log(domNext);
                    console.log('=======domNext[0]')
                    do{
                        console.log(domNext);
                        console.log('=====');
                        if(domNext[0].nodeName == 'P'){
                            //domNext.css('fontFamily',val)
                        }
                        domNext = domNext.next();

                    }while( domNext[0] != endContainer)

                    if( domNext[0] == endContainer ){
                        if(domNext[0].nodeName == 'P'){
                            domNext.css('fontFamily',val)
                        }
                    }
                }
        
             })
            //解决字号设置不对p标签生效,字体下拉框显示错误问题
             $('body').on("click", ".edui-for-fontsize .edui-label.edui-listitem-label.edui-default", function() {

                var editor1 = UE.getEditor("WxMsgContent");
                var getRange = editor1.selection.getRange();
                var startContainer = editor1.selection.getRange().startContainer;
                var endContainer = editor1.selection.getRange().endContainer;
                var document1 = editor1.selection.getRange().document;

                var dom = $(document.getElementById('ueditor_0').contentWindow.document.body).find(startContainer);
                var val = $(this).text();
                if(getRange.collapsed){
                }else{
                    var domNext = dom;
                    var htmlData = [];
                    do{
                        if(domNext[0].tagName == 'P'){
                            //domNext.css('fontSize',$(this).css('fontSize'))
                        }
                        domNext = domNext.next();

                    }while( domNext[0] != endContainer)

                    if( domNext[0] == endContainer ){
                        if(domNext[0].tagName == 'P'){
                            domNext.css('fontSize',$(this).css('fontSize'))
                        }
                    }
                }
        
             })

            //     清除格式
            $('body').on("click", ".edui-box.edui-button.edui-for-removeformat.edui-default", function() {
                // console.log('清楚格式');
                // var aaa = UE.getEditor('WxMsgContent').selection.getRange();
                //  var bookmark = aaa.createBookmark();
                // console.log(UE.getEditor('WxMsgContent').selection.getStart());
                // console.log(UE.dom.domUtils.getNextDomNode( UE.getEditor('WxMsgContent').selection.getStart(),true) );
                // console.log('哈哈哈');

                // console.log(bookmark);
                // console.log('清楚格式 === E');


                var objs = document.getElementById('ueditor_0').contentWindow.document.getElementById('bjqView').getElementsByTagName("a");
                for (var i = 0; i < objs.length; i++) {
                    objs[i].removeAttribute("href");
                    objs[i].removeAttribute("_href");
                }
                var imgObjs = document.getElementById('ueditor_0').contentWindow.document.getElementById('bjqView').getElementsByTagName("img");
                for (var j = 0; j < imgObjs.length; j++) {
                    imgObjs[j].removeAttribute("style");
                    imgObjs[i].removeAttribute("word_img");
                }
                $(document.getElementById('ueditor_0').contentWindow.document.body).find('._135editor').removeClass('_135editor');

                //去除标签中的"&nbsp;"
                $(document.getElementById('ueditor_0').contentWindow.document.body).find('*').each(function() {
                    var html = $(this).html();
                    if ($(this).children().length) {
                        $(this).html($.trim(html.replace(/(&nbsp;)/g, '')));
                    } else {
                        $(this).html($.trim(html.replace(/(\s+)|(&nbsp;)/g, '')));
                    }

                });

                //将H1 - H6替换成p标签
                var editor1 = UE.getEditor("WxMsgContent");
                var getRange = editor1.selection.getRange();
                var startContainer = editor1.selection.getRange().startContainer;
                var endContainer = editor1.selection.getRange().endContainer;
                var document1 = editor1.selection.getRange().document;
                // console.log(editor1.selection.getRange());
                // console.log(document1)
                // console.log(startContainer);
                // console.log(endContainer);
                // console.log('======6666666666 E');
                var dom = $(document.getElementById('ueditor_0').contentWindow.document.body).find(startContainer);
                var tagNameData = ['H1','H2','H3','H4','H5','H6'];

                // console.log( dom != endContainer );
                // return;

                if(getRange.collapsed){

                    if(tagNameData.indexOf(dom[0].tagName) != -1){
                        $(dom).replaceWith('<p>'+$(dom).html()+'</p>');
                    }
                    
                    $(dom).find('img').parent('p').css('textAlign','center');
                }else{

                    var domNext = dom;
                    console.log(domNext);
                    var htmlData = [];

                    do{

                        if(tagNameData.indexOf(domNext[0].tagName) != -1){
                           htmlData.push(domNext);
                        }else{

                            domNext.removeAttr("style");
                            domNext.find('section').each(function() {
                                $(this).removeAttr("style");
                            });
                            domNext.find('img').parent('p').css('textAlign','center');

                        }
                        
                        domNext = domNext.next();

                    }while( domNext[0] != endContainer)

                    if( domNext[0] == endContainer ){

                        if(tagNameData.indexOf(domNext[0].tagName) != -1){
                           htmlData.push(domNext);
                        }else{

                            domNext.removeAttr("style");
                            domNext.find('section').each(function() {
                                $(this).removeAttr("style");
                            });
                            domNext.find('img').parent('p').css('textAlign','center');

                        }
                    }
   
                    $.each(htmlData,function(i,key){
                        key.replaceWith("<p>"+key.html()+"</p>");
                    })

                }

            });

            /*全屏*/
            $('body').on("click", ".edui-box.edui-button.edui-for-fullscreen.edui-default", function() {

                if (isFullscreen) {
                    isFullscreen = false;
                    $('#edui14_toolbarbox').hide();
                    $('#AttributeWrap').show();
                } else {
                    isFullscreen = true;
                    $('#edui14_toolbarbox').show();
                    $('#AttributeWrap').hide();
                    $('.layui-layer-tips').hide();
                    // console.log('全屏');
                }

            });
            /*插入日期*/
            $(".edui-box.edui-button.edui-for-date.edui-default").on("click", function() {
                if (dateNum) {
                    UE.getEditor('UEditor').focus(); //获取焦点
                    var mydate = new Date();
                    var str = mydate.getFullYear() + "-";
                    str += (mydate.getMonth() + 1) + "-";
                    str += mydate.getDate();
                    UE.getEditor('UEditor').execCommand('inserthtml', str);
                    dateNum = false;
                } else {
                    dateNum = true;
                }
            });
            /*插入时间*/
            $(".edui-box.edui-button.edui-for-time.edui-default").on("click", function() {
                if (timeNum) {
                    UE.getEditor('UEditor').focus(); //获取焦点
                    var mydate = new Date();
                    var str = mydate.getHours() + ":";
                    str += mydate.getMinutes() + ":";
                    str += mydate.getSeconds();
                    UE.getEditor('UEditor').execCommand('inserthtml', str);
                    timeNum = false;
                } else {
                    timeNum = true;
                }
            });

            /*中文引号-bug*/
            $(".edui-box.edui-button.edui-for-source.edui-default").on("click", function() {
                if ($(this).children("div.edui-default").hasClass("edui-state-checked")) {
                    if (chiyh) {
                        var conten = editor.getContent(); //获取编辑器内容
                        conten = conten.replace(/&amp;/g, "&");

                        editor.setContent(conten);
                        chiyh = false;
                    } else {
                        chiyh = true;
                    }
                }
            });



            //            135 组件-编号标题选中后在选择颜色&&背景色bug
            $(".edui-popup.edui-default.edui-for-forecolor.edui-anchor-topleft a.edui-box.edui-colorpicker-colorcell.edui-default").on("click", function() {
                if (colorAndBack) {
                    var len = $("#ueditor_0").contents().find("._135editor[data-id='33']").length;
                    for (var i = 0; i < len; i++) {
                        if ($("#ueditor_0").contents().find("._135editor[data-id='33']:eq(" + i + ")").children("p").children("span").length >= 2) {
                            $("#ueditor_0").contents().find("._135editor[data-id='33']:eq(" + i + ")").children("p").children("span:eq(0)").addClass("mobHide");
                        }
                    }
                    colorAndBack = false;
                } else {
                    colorAndBack = true;
                }
            });
            $(".edui-popup.edui-default.edui-for-backcolor.edui-anchor-topleft a.edui-box.edui-colorpicker-colorcell.edui-default").on("click", function() {
                if (colorAndBack) {
                    var len = $("#ueditor_0").contents().find("._135editor[data-id='33']").length;
                    for (var i = 0; i < len; i++) {
                        if ($("#ueditor_0").contents().find("._135editor[data-id='33']:eq(" + i + ")").children("p").children("span").length >= 2) {
                            $("#ueditor_0").contents().find("._135editor[data-id='33']:eq(" + i + ")").children("p").children("span:eq(0)").addClass("mobHide");
                        }
                    }
                    colorAndBack = false;
                } else {
                    colorAndBack = true;
                }
            });

            //            音频...bug另类解决方式
            setTimeout(function() {
                if (timeNum135) {
                    if ($("#uid_body1").attr("txErr") == "2" || $("#uid_body1").attr("txErr") == "4" || $("#uid_body1").attr("txErr") == "8" || $("#uid_body1").attr("txErr") == "12" || $("#uid_body1").attr("txErr") == "13" || $("#uid_body1").attr("txErr") == "16") {
                        console.log("非普通新闻...");
                        editor.setContent("");
                    } else if ($("#uid_body1").attr("txErr") == "11" || $("#uid_body1").attr("txErr") == "10" || $("#uid_body1").attr("txErr") == "3" || $("#uid_body1").attr("txErr") == "5") {
                        console.log("视音频点播直播新闻...");
                        contentPa = contentPa.substring(str.indexOf("<!--PLAYERCODEEND-->") + 20, str.length);
                        contentPa = contentPa.replace(/&amp;/g, "&");
                        contentPa = contentPa.replace(/'/g, "&#39;");
                        editor.setContent(contentPa);
                    } else {
                        console.log("普通新闻...");
                        contentPa = contentPa.replace(/&amp;/g, "&");
                        contentPa = contentPa.replace(/'/g, "&#39;");
                        editor.setContent(contentPa);
                    }
                    timeNum135 = false;
                } else {
                    timeNum135 = true;
                }
            }, 500);
        },
        mobileStyleReset: function() {
            var bodyWidth = document.documentElement.clientWidth;
            var bodyHeight = document.documentElement.clientHeight;

            // 编辑器工具栏
            var topEditTool = bodyWidth - parseInt($(".rigTbass").width());
            $("#editorToolbarWrap").css({
                width: "698px"
            }); //外面整个宽度
            $("#editorToolbarWrap .edui-default.edui-toolbar.edui-txmarauto").css({
                //width: (parseInt($("#_Table1").width())-67) + "px"
                width: '698px'
            }); //中间工具栏宽度

        }
    };
    // 伪工具栏默认配置
    var toolBarArray = {
        "常用": {
            "操作": [
                ["undo", "redo", "selectall"],
                ["source", "fullscreen", "vote"]
            ],
            "字体": [
                ["fontfamily", "fontsize"],
                ["bold", "italic", "underline", "forecolor", "backcolor"]
            ],
            "标题": [
                // ["customstyle"],
                ["paragraph"]
            ],
            "排版": [
                ["justifyleft", "justifycenter", "justifyright", "justifyjustify", "autotypeset", "indent"],
                ["rowspacingtop", "rowspacingbottom", "lineheight", "ziJianJu"]
            ],
            "插入": [
                ["link", "unlink", "newFile"], //"simpleupload","insertimage","insertvideo","pagebreak","135Editor"
                ["newImage", "newVideo", "meiTu", "insertframe"] //"attachment"
            ],
            "工具": [
                ["removeformat", "pasteplain", "searchreplace"], //"drafts","formatmatch"
                ["cleardoc", "blockquote", "htxPreview"]
            ]
        },
        "扩展": {
            "字体": [
                ["touppercase", "tolowercase", "strikethrough"],
                ["superscript", "subscript", "fontborder"]
            ],
            //            "段落":[
            //                [],
            //                ["insertorderedlist","insertunorderedlist"]
            //            ],
            "输入/环绕方式": [
                ["directionalityltr", "directionalityrtl"], //,"insertcode"
                ["imagenone", "imageleft", "imageright", "imagecenter"]
            ],
            "插入": [
                ["date", "time", "map", "emotion"],
                ["horizontal"] //"anchor","135editor","spechars",
            ],
            "表格行与列": [
                ["inserttable", "deletetable", "insertparagraphbeforetable"],
                ["insertrow", "deleterow", "insertcol", "deletecol"]
            ],
            "单元格": [
                ["mergecells", "mergeright", "mergedown", "splittocells"],
                ["splittorows", "splittocols"]
            ],
            "工具": [
                ["print"], //"drafts","formatmatch"
                ["help"]
            ]
        }
    };
    setTimeout(function() {
        // 伪工具栏
        Index.prototype.html.toolbarHtml();
    }, 500)

    setTimeout(function() {
        // 135Mobile
        // Index.prototype.operation.mobileClick();
        // Index.prototype.operation.fucBug();
    }, 1000)

    // 工具栏tab切换及工具栏操作图标hover
    //Index.prototype.operation.toolbarTabClick("zving-toolbarTab", "zving-toolbarTab-item", "zving-toolbarCon", "zving-toolbarCon-item");



    //滚动条
    // $(window).scroll(function() {

    //     if ($("body#uid_body1").is(".fullscreen")) {
    //         //           console.log("全屏了");
    //     } else {
    //         if ($(document).scrollTop() > 0) {
    //             if ($(document).scrollTop() >= 25) {
    //                 $("#editorToolbarWrap").css({
    //                     top: "0px"
    //                 });
    //                 $("#edui14_sidebar").css({
    //                     top: (110 - 25) + "px"
    //                 });
    //             } else {
    //                 $("#editorToolbarWrap").css({
    //                     top: (25 - $(document).scrollTop()) + "px"
    //                 });
    //                 $("#edui14_sidebar").css({
    //                     top: (110 - $(document).scrollTop()) + "px"
    //                 });
    //             }
    //         } else {
    //             $("#editorToolbarWrap").css({
    //                 top: "25px"
    //             });
    //             $("#edui14_sidebar").css({
    //                 top: "110px"
    //             });
    //         }
    //     }
    // });


    //    窗口大小变化
    // window.onresize = function() {
    //     Index.prototype.html.mobileStyleReset();
    // }


    //vms视频过来的宽度有问题，由于是嵌在iframe里面的，所以这边的css是直接控制不到iframe里面元素的样式，故只能如此...
    // var videoWidthAuto;
    // setTimeout(function() {
    //     videoWidthAuto = setInterval(video_playerWidth, 1000);
    // }, 1000);


    function video_playerWidth() {
        var videoWapLength = $(".video_player").length;
        for (var i = 0; i < videoWapLength; i++) {
            var iframeName = $(".video_player:eq(" + i + ")").children("iframe").attr("name");

            var objectLength = document.getElementById(iframeName).contentWindow.document.getElementsByTagName("body")[0].getElementsByTagName("object").length;

            if (objectLength != 0) {
                if (document.getElementById(iframeName).contentWindow.document.getElementById("flashdiv")) {
                    //右边有节目单
                    document.getElementById(iframeName).contentWindow.document.getElementsByClassName("playerWrapper")[0].style.width = "408px";
                    document.getElementById(iframeName).contentWindow.document.getElementById("flashdiv").style.width = "100%";
                    document.getElementById(iframeName).contentWindow.document.getElementById("MyVideoPlayer").width = "100%";
                } else {
                    //右边没得节目单
                    document.getElementById(iframeName).contentWindow.document.getElementById("MyVideoPlayer").width = "100%";
                }
                break;
            }
        }
    }


    $(document).on('click','.picEdit',function(){
        var editSrc = $(document.getElementById('ueditor_0').contentWindow.document.body).find(window.current_active_135item).attr('src');
        edit_image(editSrc);
    })

    //将编辑器内的图片设置封面图
    $(document).on('click','.setcCover',function(){
        window.hideMessageBox('Information');
        var img = $(document.getElementById('ueditor_0').contentWindow.document.body).find(window.current_active_135item)
        var imSrc = img.attr('src');
        //渲染右边划出部分图片信息
        window.BasicInformation.state.fileList[0] = {
              uid: Math.random(),
              name: Math.random(),
              status: 'done',
              url: imSrc,
              thumbUrl: imSrc,
            };
        window.BasicInformation.setState({
            imageUrlList:[imSrc]
        })
        //iframe窗

        // layer.open({
        //   type: 2,
        //   id:'cropper',
        //   title:'图片裁剪',
        //   area: ['1200px', '660px'],
        //   anim: 2,
        //   moveOut:true,
        //   content: ['/plug/cropper/index.html?imgsrc='+img.attr('src')+''] //iframe的url，no代表不显示滚动条
        //   ,btn: ['确定', '不需要裁剪'],
        //   yes:function(index, layero){
        //     console.log(layero);
        //     $(layero).find('iframe').contents().find('#getCroppedCanvas').click();
        //     var Base64Img = $(layero).find('iframe').contents().find('#Base64Img').attr('src');
        //     console.warn(Base64Img);
        //     console.log($(layero).html())
        //     var uploadUrl = URL+'/image/uploadBase64Image';

        //     jQuery.ajax({
        //         url: uploadUrl,
        //         type: 'POST',
        //         headers:{
        //             'Content-Type':'application/json;charset=utf-8',
        //             tenantId : tenantId,
        //             access_token : window.access_token
        //         },
        //         data:JSON.stringify({base64:Base64Img}),
        //         processData: false,
        //         contentType: false
        //     }).success(function(res) {
        //         if(res.state == 200){
        //             console.log(res);
        //             window.BasicInformation.state.fileList[0] = {
        //                   uid: Math.random(),
        //                   name: res.data[0].imageName,
        //                   status: 'done',
        //                   url: res.data[0].imageUrl,
        //                   thumbUrl: res.data[0].imageUrl,
        //                 };
        //             window.BasicInformation.setState({
        //                 imageUrlList:[res.data[0].imageUrl],
        //             })
        //         }
        //     }).fail(function(res) {
        //         console.log('文件上传失败')
        //     });

        //     //do something
        //     //layer.close(index); //如果设定了yes回调，需进行手工关闭

        //   },
        //   btn2:function(index, layero){
        //     //do something
        //     layer.close(index); //如果设定了yes回调，需进行手工关闭
        //   },
        //     cancel: function(index, layero){ 
        //         layer.close(index)
        //       return false; 
        //     }    
        // });

    })

    $(document).on('click','.videoLive',function(){

        var editSrc = $(document.getElementById('ueditor_0').contentWindow.document.body).find(window.current_active_135item);
        
        var Information = window.editorData.Information;
        console.log(Information);
        let type = $(this).attr('data-type');
        let islive = $(this).attr('islive');
        console.log(islive);
        if(islive){
            console.log('aaaaaaa');
            $(this).attr('type','live');
            $(this).attr('data-mid',$(this).attr('id'));
        }
        if(type == 'live' || islive){
            var playerCode =  Information.state.data.liveDto.playerCode.slice(9,-3).replace('@WIDTH@','768px').replace('@HEIGHT@','490px');
            layer.open({
                type: 1,
                shade: [0.7,'#000'],
                area: [1100,490], //宽高
                title: '直播预览', //不显示标题
                content:'<div id="liveBox" style="height:490px;width:1100px;">'+playerCode+'</div>', //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                cancel: function(){
                }
            });
        }else if(type == 'PgcLive'){
            var playerCode =''
            var id = $(this).attr('data-mid');
            // var Information = window.editorData.Information;
            console.log(Information);
            var liveUrl = $(this).attr('data-live');
            var livePic = $(this).attr('data-pic');
            // console.log(livePic);
            // console.log(liveUrl);
            layer.open({
                type: 1,
                shade: [0.7,'#000'],
                area: [1100,490], //宽高
                title: '直播预览', //不显示标题
                content:'<div id="liveBox" style="height:490px;width:1100px;"><iframe id="pgcLives1" style="width:100%;height:100%;border:0"></iframe></div>', //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                success: function(layero, index){
                    let nps;
                    let qrdiv = '<link href="../plug/DPlayer/css/DPlayer.min.css" rel="stylesheet" type="text/css" ><script src="../plug/DPlayer/js/hls.js"></script><script src="../plug/DPlayer/js/DPlayer.min.js"></script><div id="videoBox"></div><script type="text/javascript">'+nps+' = new DPlayer({container: document.getElementById("videoBox"), live: true, danmaku: false, video: {url:"'+liveUrl+'", type:"hls"}})</script>';
                    console.log('==========')
                    let  contentWin=document.getElementById("pgcLives1").contentWindow;
                    contentWin.document.write(qrdiv);
                    contentWin.document.close();
                },
                cancel: function(index, layero){
                    let  contentWin=document.getElementById("pgcLives1").contentWindow;
                    contentWin.document.write('');
                    contentWin.document.close();
                }
            });
        }


    })

    //编辑器中视频截图
    $(document).on('click','.screenshots',function(){
        window.hideMessageBox('Information');
        var video = $(document.getElementById('ueditor_0').contentWindow.document.body).find(window.current_active_135item);
        window.editorData.screenshots(video);
        //不详为什么右边没设置到,再点视频红色边框时
        $('#UploadMaterialWrap').css({
            'overflowY':'auto'
        })
    })

    $(document).on('click','.edui-button.edui-for-abstract',function(){
        var editor1 = UE.getEditor("WxMsgContent");
        var getRange = editor1.selection.getRange();
        var startContainer = editor1.selection.getRange().startContainer;
        var endContainer = editor1.selection.getRange().endContainer;
        var document1 = editor1.selection.getRange().document;
        var aa = editor1.selection.getRange().cloneContents()
        let data = window.BasicInformation.props.data;
        data.summary = $(aa).text();
        var setValue = window.BasicInformation.state.setValue;
            setValue.name = 'summary';
            setValue.value = $(aa).text();
     
            console.log(setValue.rand);
            console.log('setValue');
        window.BasicInformation.setState({
            setValueRand:Math.random(),
            setValue
        })
    })

UE.registerUI('sensitivewords', function(editor, uiName) {
    var sensitiveWords = {};//关键词过滤
    var _this = this;
    var editor1 = UE.getEditor("WxMsgContent");
    /*
    *      取消所有高亮
    *      noset =true 返回清理后的内容不刷新编辑器
    *      noset =false 或 不传返回清理后的内容 刷新编辑器
    */
    sensitiveWords.CancleSensitiveWordsHighlight = function () {
        var regstrEpswh = '<span class="ckeditor_sensitivewords" style="background-color:[^<>:]+[;]color:red;*">([^<>]+)<\\/span>';
        var htmlEpswh = editor1.getContent();
        htmlEpswh = htmlEpswh.replace(eval("/" + regstrEpswh + "/ig"), "$1");
        if (htmlEpswh != null){
            editor1.setContent(htmlEpswh)
        }
        return htmlEpswh;
    }
    /*
    *    epswhlwords 敏感词
    *    epswhligChar 敏感词中忽略的特殊字符
    *    epswhlcolor 高亮底色
    */
    sensitiveWords.SensitiveWordsHighlight = function (epswhlwords, epswhligChar, epswhlcolor) {
        var keyWordsArr = [];//存放找到的敏感词数据和出现次数
        //var epswhligChar = "`~!@#$^&*()=|{}‘:;‘,\\[\\]\\.<>/?~！@#￥……&*（）—|{}【】‘；：”“‘。，、？  "
        var epswhligChar = "";
        //空的字符串
        if (typeof epswhlwords == "string" && !epswhlwords)
            return;
        //空数组
        if (typeof epswhlwords == "object" && epswhlwords[0] == undefined){
            // _this.trigger("showmessage", {
            //     'id': 'success-msg',
            //     'content':'没有敏感词存在哦~~!',
            //     'type': 'success',
            //     'timeout': '2000'
            // })
            //layer.msg('没有敏感词存在哦~~!');
            return;
        }
        var htmlEpswh = editor1.getContent();
        //高亮模板
        var highLighCOde = '<span class="ckeditor_sensitivewords" style="background-color:{$color};color:red;font-weight: 600;">{$word}</span>';
        if (!epswhlcolor)
            epswhlcolor = "#ffff00";
        highLighCOde = highLighCOde.replace("{$color}", epswhlcolor);

        //如果内容中有高亮内容先进行清理
        if (htmlEpswh.indexOf('ckeditor_sensitivewords') > -1) {
            htmlEpswh = this.CancleSensitiveWordsHighlight();
        }
        //重新高亮
        var epswhlkeyWords = [];
        if (typeof epswhlwords == "string"){
            epswhlkeyWords = epswhlwords.split(',');
        }
        else{
            epswhlkeyWords = epswhlwords;
        }
        //需要忽略的分隔符
        if (epswhligChar && epswhligChar.length > 0) {
            epswhligChar = epswhligChar.replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; });
            epswhligChar = "[" + epswhligChar + "]*";
        } else {
            epswhligChar = '';
        }
        for (var i = 0; i < epswhlkeyWords.length; i++) {
            var allkey = epswhlkeyWords[i].split('');
            var regstr = allkey.join(epswhligChar);
            regstr = "(" + regstr + ")";
            var reg = eval("/" + regstr + "/ig");
            var hcode = highLighCOde.replace("{$word}", "$1");
            var keyWordsList = htmlEpswh.match(reg);
            if(keyWordsList&&keyWordsList.length > 0){
                keyWordsArr.push({times:keyWordsList.length,value:epswhlkeyWords[i]})
            }
            if(htmlEpswh.indexOf('<span class="ckeditor_sensitivewords" style="background-color:transparent;color:red;font-weight: 600;">' + epswhlkeyWords[i] + '</span>') ==-1){
                htmlEpswh = htmlEpswh.replace(reg, hcode);
            }
        }
            //document 对象在源码模式无效，this.setData是重新加载，不是同步方法，不能使用
            if (htmlEpswh!=null){
                 editor1.setContent(htmlEpswh)
            }
            // console.log(htmlEpswh);
            if (htmlEpswh.indexOf('ckeditor_sensitivewords') == -1){
                _this.trigger("showmessage", {
                    'id': 'success-msg',
                    'content':'没有敏感词存在哦~~!',
                    'type': 'success',
                    'timeout': '2000'
                })
                window.hideMessageBox('SensitiveWords');
                if($('#AttributeWrap').css('display') !='none'){
                    $("#AttributeWrap").parent().css('overflow','hidden auto');
                }
                if($('#materialBox').css('display') !='none'){
                    $("#materialBox").css('overflow','auto');
                }
            }else{
                if($('#SensitiveWords').css('display') !='block'){
                    window.showMessageBox('SensitiveWords');
                }
            }
            return keyWordsArr;

           // this.document.getBody().setHtml(htmlEpswh);
         }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
           var keyWordsArr = sensitiveWords.SensitiveWordsHighlight( window.editorData.sensitive, "`~!@#$^&*()=|{}‘:;‘,\\[\\]\\.<>/?~！@#￥……&*（）—|{}【】‘；：”“‘。，、？  ","transparent");

            window.editorData.SensitiveWords.setState({
                changedSensitiveWordsList : keyWordsArr?keyWordsArr:[],
                sensitiveWordsList : $.extend(true,[],keyWordsArr?keyWordsArr:[])
            })
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title:'敏感词检测',
        className: "edui-for-sensitiveWords",
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            // console.log('敏感词检测');
            let words = editor1.getContentTxt();
            window.editorData.getSensitive(words,function (data) {
                if(data.status){
                    current_editor.execCommand(uiName);
                }
            });
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

    UE.registerUI('addpic',function(editor,uiName){
        //注册按钮执行时的command命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName,{
            execCommand:function(){
                if(window.editorData.ManuscriptThis1){
                    window.editorData.ManuscriptThis1.setState({
                        UEditorAddPicVisible:true
                    })
                }
                if(window.editorData.videoArticle){
                    window.editorData.videoArticle.setState({
                        UEditorAddPicVisible:true
                    })
                }
            }
        });

        //创建一个button
        var btn = new UE.ui.Button({
            //按钮的名字
            name:uiName,
            //提示
            title:'添加图片',
            className: "edui-for-addPic",
            //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
            cssRules :'background-position:-327px -32px',
            //点击时执行的命令
            onclick:function () {
                //这里可以不用执行命令,做你自己的操作也可
                editor.execCommand(uiName);
            }
        });

        //当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState(uiName);
            if (state == -1) {
                btn.setDisabled(true);
                btn.setChecked(false);
            } else {
                btn.setDisabled(false);
                btn.setChecked(state);
            }
        });

        //因为你是添加button,所以需要返回这个button
        return btn;
    }/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);

    UE.registerUI('addvideo',function(editor,uiName){
        //注册按钮执行时的command命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName,{
            execCommand:function(){
                if(window.editorData.videoUploadThis){
                    window.editorData.videoUploadThis.setState({
                        modalVisible:true
                    })
                }
                if(window.editorData.videoArticle){
                    window.editorData.videoArticle.setState({
                        modalVisible:true
                    })
                }
            }
        });

        //创建一个button
        var btn = new UE.ui.Button({
            //按钮的名字
            name:uiName,
            //提示
            title:'添加视频',
            className: "edui-for-addVideo",
            //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
            cssRules :'background-position:-388px -32px',
            //点击时执行的命令
            onclick:function () {
                //这里可以不用执行命令,做你自己的操作也可
                editor.execCommand(uiName);
            }
        });

        //当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState(uiName);
            if (state == -1) {
                btn.setDisabled(true);
                btn.setChecked(false);
            } else {
                btn.setDisabled(false);
                btn.setChecked(state);
            }
        });

        //因为你是添加button,所以需要返回这个button
        return btn;
    }/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);
})(window || this, $);




