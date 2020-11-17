import produce from 'immer';
export { default as deepEqual } from './deepEqual';
export { default as type } from './type';

/**
 * chunk函数，将数组拆成size大小的小块
 * chunk([1, 2, 3, 4, 5], 2) => [[1, 2], [3, 4], [5]]
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
 * @param {array} input 数组
 * @param {number} size 大小
 * @return {array} arr
 */
export const chunk = (input, size) => {
  return input.reduce((arr, item, index) => {
    return index % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

/**
 * 判断是否为空
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
 * @param {*} obj
 */
export const isEmpty = obj => {
  return (obj ? [Object, Array].includes(obj.constructor) && !Object.entries(obj).length : true);
}

/**
 * 用于保存数据公共方法
 */
export const saveDataCommon = produce((state, payload) => {
  Object.keys(payload).forEach(k => state[k] = payload[k]);
});
Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
export const articleTypeUrl={
  '1':'',
  '2':'pics',
  '4':'Link',
  '5':'Video',
  '11':'Audio'
}
export const ant_spinOpacity0 = function() {
  $('body .ant-table-wrapper .ant-spin-container').css('opacity',0);
}
export const ant_spinOpacity1 = function() {
  $('body .ant-table-wrapper .ant-spin-container').css('opacity',1);
}
