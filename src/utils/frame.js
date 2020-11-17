
// window.jointUrls = function(params){
//     let searchStr = '?';
//     for (let key in params) {
//         if(params[key]){
//             searchStr += `${key}=${params[key]}&`;
//         }
//     }
//     return searchStr.substr(0,searchStr.length-1);
// }
// window.getCookie = () => {
//     let cookieJson = {};
//     if(document.cookie){
//         document.cookie.split(';').forEach(function(item,i){
//             let itemArray = item.split('=');
//             cookieJson[itemArray[0].trim()] = itemArray[1].trim();
//         });
//     }
//     return cookieJson;
// }
import myUploader from './myUploader';
import { getIdsObj } from '@/utils/getIdsObj';
window.jumpDefault = (defaultUrl)=>{
    if(window.location.hash){
        if(window.location.hash.substr(1) == '/'){
            window.location.hash = defaultUrl ;
        }
    }else{
        if(window.location.pathname&&window.location.pathname=='/'){
            window.location.hash = defaultUrl ;
        }else if(!window.location.pathname){
            window.location.hash = defaultUrl ;
        }
    }
}
const dynamicLoadCss = (url) => {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.type='text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
}
const loadFrame = (url,callback) =>{
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type="text/javascript";
    // console.log(document.all);
    if(callback){
        if(document.all){
          script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
              // console.log('菜单打印');
              script.onload = script.onreadystatechange = null;
              callback(true);
            }
          };
            // script.onreadystatechange=function(){
            //     if(script.readyState == "loaded" || script.readyState == "complete"){
            //         script.onreadystatechange = null;
            //         callback(true);
            //       console.log('菜单打印');
            //     }
            // }
        }else{
            script.onload=()=>{
              // console.log('加载完成');
              callback(true);
            }
        }
    }
    script.src = url;
    head.appendChild(script);
}
window.getCookie = () => {
  let cookieJson = {};
  if(document.cookie){
    document.cookie.split(';').forEach(function(item,i){
      let itemArray = item.split('=');
      cookieJson[itemArray[0].trim()] = itemArray[1].trim();
    });
  }
  return cookieJson;
}
export function cmcSbumenu(){
  window.COOKIEJSON = window.getCookie();
  if(getIdsObj().type!=2){
    if(window.COOKIEJSON['chinamcloud_version']&&window.COOKIEJSON['chinamcloud_version']=='v2'){

    }else {
      dynamicLoadCss(window.CONFIG.CMC_CONSOLE_URL+window.CONFIG.CMC_CONSOLE_HEADER_LEFT_CSS);
      dynamicLoadCss(window.CONFIG.CMC_CONSOLE_URL+window.CONFIG.CMC_CONSOLE_HEADER_SUBMENU_CSS);
      loadFrame(window.CONFIG.CMC_CONSOLE_URL+window.CONFIG.CMC_CONSOLE_HEADER_LEFT_JS,()=>{

        // document.body.children[0].setAttribute("style","position:relative;z-index:10;");
        //
        // window.COOKIEJSON = window.getCookie();
      });
      loadFrame(window.CONFIG.CMC_CONSOLE_URL+window.CONFIG.CMC_CONSOLE_HEADER_SUBMENU_JS,(res)=>{
        if(res){
          // console.log('菜单打印');
          // console.log(document.getElementById('main'));
          var menu = window.cmc_leftmenu(document.getElementById('main'), {
            productId: window.CONFIG.CMC_PRODUVTID,
            title: window.CONFIG.CMC_TITLE,
          });
          $('body .cmcFlexNone').css('padding-left','60px');
          $('body #root').css('margin-top','50px');
          // if(!window.COOKIEJSON['login_chinamcloud_id']&&!window.COOKIEJSON['login_chinamcloud_tid']){
          //   window.location.href = window.CONFIG.CALLBACK_LOGIN;
          // }else{
          //   window.jumpDefault('#/SpiderCMS');
          // }
        }
      })
    }
  }
}
// window.CONFIG.CMC_CONSOLE_URL.replace(/\.js$/ig,'.css')
