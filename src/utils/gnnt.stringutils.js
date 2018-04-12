/**
 *<p>
 *<li>
 *					---gaoyy 2018-03-22
 *</li>
 *</p>
 *
 *<b>类说明： JS字符串工具类  </b>
 *<p>
 *		本类主要用于 1.字符串工具类
 *</p>
 */
import $ from 'jquery'
import accounting from './gnnt.accounting.js'
var stringutils={}

/**
 * @func 字符串去掉多余空格
 */
stringutils.trim = function(arg){
  if(stringutils.isNull(arg)){
    return "";
  } else if(typeof arg != 'string'){
    return arg;
  }
  return arg.replace(/^\s+|\s+$/gm,'');
}

/**
 * @func 判断是否为空;
 */
stringutils.isNull = function (arg){
  if(arg != null && typeof(arg) != "undefined" && arg != "" ){
    return false;
  } else {
    return true;
  }
}

/**
 * @func 将空字符串转化成'';
 */
stringutils.deNull = function (arg , sign){
  if(arg != null && typeof(arg) != "undefined"){
    return stringutils.trim(arg);
  } else {
    if(stringutils.isNull(sign)){
      return '';
    } else {
      return sign;
    }
  }
}

/**
 * @func 生成UUID
 */
stringutils.UUID = function(len, radix) {
  var chars = '023456789ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random()*16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

/**
 * @func 格式化Money
 * @param dollar
 * @param flag 默认'￥' 货币类型
 * @param fixed 小数点保留位数
 */
stringutils.formatMoney = function (dollar , flag , fixed){
  try{
    if(!stringutils.isNull(accounting)){
      dollar = accounting.formatMoney(dollar , flag , fixed);
    }
  }catch(e){}
  return dollar;
};

/**
 * @func 格式化数字
 * @param number 要格式化的数字
 * @param fixed 保留多少位小数
 * @param divide 分隔符
 */
stringutils.formatNumber = function (number , fixed , divide){
  if(!stringutils.isNull(accounting)){
    return accounting.formatNumber(number , fixed , divide);
  }
  return number;
};

/**
 * @func 格式化数字(满3位不会有空格之类的分隔符分开)
 * @param number 要格式化的数字
 * @param fixed 保留多少位小数
 */
stringutils.toFixed = function(number,fixed){
  return accounting.toFixed(number,fixed);
};

/**
 * @func 字符串转日期
 * @param string 日期字符串
 */
stringutils.strToDate = function(string){
  return new Date(Date.parse(string.replace(/-/g,  "/")));
};

/**
 * @func 字符串转日期
 * @param string 日期字符串
 */
stringutils.addMonth = function(date,num){
  var month = date.getMonth() + num;
  date.setMonth(month);
  return date;
};

/**
 * @func 格式化日期：yyyy-MM-dd
 */
stringutils.formatDate = function (date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();
  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return (myyear + "-" + mymonth + "-" + myweekday);
};

/**
 * @func 获得某月的天数
 */
stringutils.getMonthDays = function(myMonth) {

  var nowYear = new Date().getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);

  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
};

/**
 * @func 获得本季度的开始月份
 */
stringutils.getQuarterStartMonth = function() {

  var quarterStartMonth = 0;

  if (nowMonth < 3) {
    quarterStartMonth = 0;
  }
  if (2 < nowMonth && nowMonth < 6) {
    quarterStartMonth = 3;
  }
  if (5 < nowMonth && nowMonth < 9) {
    quarterStartMonth = 6;
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9;
  }
  return quarterStartMonth;
};

/**
 * @func 获得本周的开始日期
 * @returns
 */
stringutils.getWeekStartDate = function() {

  var now = new Date(); //当前日期
  var nowDayOfWeek = now.getDay(); //今天本周的第几天
  var nowDay = now.getDate(); //当前日
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  return stringutils.formatDate(weekStartDate);
};

/**
 * @func 获得本周的结束日期
 * @returns
 */
stringutils.getWeekEndDate = function() {

  var now = new Date(); //当前日期
  var nowDayOfWeek = now.getDay(); //今天本周的第几天
  var nowDay = now.getDate(); //当前日
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
  return stringutils.formatDate(weekEndDate);
};

/**
 * @func 获得上周的开始日期
 * @returns
 */
stringutils.getLastWeekStartDate = function() {

  var now = new Date(); //当前日期
  var nowDayOfWeek = now.getDay(); //今天本周的第几天
  var nowDay = now.getDate(); //当前日
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
  return stringutils.formatDate(weekStartDate);
};

/**
 * @func 获得上周的结束日期
 * @returns
 */
stringutils.getLastWeekEndDate = function() {

  var now = new Date(); //当前日期
  var nowDayOfWeek = now.getDay(); //今天本周的第几天
  var nowDay = now.getDate(); //当前日
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
  return stringutils.formatDate(weekEndDate);
};

/**
 * @func 获得本月的开始日期
 * @returns
 */
stringutils.getMonthStartDate = function() {

  var now = new Date(); //当前日期
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return stringutils.formatDate(monthStartDate);
};

/**
 * @func 获得本月的结束日期
 * @returns
 */
stringutils.getMonthEndDate = function() {

  var now = new Date(); //当前日期
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  var monthEndDate = new Date(nowYear, nowMonth, stringutils.getMonthDays(nowMonth));
  return stringutils.formatDate(monthEndDate);
};

/**
 * @func 获得上月开始时间
 * @returns
 */
stringutils.getLastMonthStartDate = function() {

  var now = new Date(); //当前日期
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //
  var lastMonthDate = new Date(); //上月日期
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  var lastMonth = lastMonthDate.getMonth();

  var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
  return stringutils.formatDate(lastMonthStartDate);
};

/**
 * @func 获得上月结束时间
 * @returns
 */
stringutils.getLastMonthEndDate = function() {

  var now = new Date(); //当前日期
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //
  var lastMonthDate = new Date(); //上月日期
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  var lastMonth = lastMonthDate.getMonth();

  var lastMonthEndDate = new Date(nowYear, lastMonth, stringutils.getMonthDays(lastMonth));
  return stringutils.formatDate(lastMonthEndDate);
};

/**
 * @func 获得本季度的开始日期
 * @returns
 */
stringutils.getQuarterStartDate = function() {

  var now = new Date(); //当前日期
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //
  var lastMonthDate = new Date(); //上月日期
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

  var quarterStartDate = new Date(nowYear, stringutils.getQuarterStartMonth(), 1);
  return stringutils.formatDate(quarterStartDate);
};

/**
 * @func 或的本季度的结束日期
 * @returns
 */
stringutils.getQuarterEndDate = function() {

  var now = new Date(); //当前日期
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //
  var lastMonthDate = new Date(); //上月日期
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

  var quarterEndMonth = stringutils.getQuarterStartMonth() + 2;
  var quarterStartDate = new Date(nowYear, quarterEndMonth , stringutils.getMonthDays(quarterEndMonth));
  return stringutils.formatDate(quarterStartDate);
};

/**
 * @func 根据快捷查询类型，计算出查询起始结束日期
 * @params searchtype 快捷查询类型
 */
stringutils.queryDate = function(searchtype){
  var date = {'startdate':new Date(),'enddate':new Date()};
  if(searchtype == 'lasyDay'){
    var now = new Date();
    now.setDate(now.getDate() - 1);
    date['startdate'] = stringutils.formatDate(now);
    date['enddate'] = stringutils.formatDate(now);
  } else if(searchtype == 'lasyWeek'){
    date['startdate'] = stringutils.getLastWeekStartDate();
    date['enddate'] = stringutils.getLastWeekEndDate();
  } else if(searchtype == 'week'){
    date['startdate'] = stringutils.getWeekStartDate();
    date['enddate'] = stringutils.getWeekEndDate();
  } else if(searchtype == 'lastMonth'){
    date['startdate'] = stringutils.getLastMonthStartDate();
    date['enddate'] = stringutils.getLastMonthEndDate();
  } else if(searchtype == 'month'){
    date['startdate'] = stringutils.getMonthStartDate();
    date['enddate'] = stringutils.getMonthEndDate();
  } else if(searchtype == 'max'){
    var now = new Date();
    now.setMonth(now.getMonth() - 3);
    now.setDate(now.getDate() + 1);
    date['startdate'] = stringutils.formatDate(now);
    date['enddate'] = stringutils.formatDate(new Date());
  }
  return date;
}

/**
 * @func 获取cookie值
 * @param name
 * @returns 返回cookie值
 */
stringutils.getCookie = function(name) {
  var arr = [];
  var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return '';
}

/**
 * @func 将字符串转为byte数组
 * @param str
 * @returns {Array}
 */
stringutils.stringToByte = function (str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for(var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if(c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if(c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if(c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;
}

/**
 * @func 将byte数组转为字符串
 * @param arr
 * @returns
 */
stringutils.byteToString = function (arr) {
  if(typeof arr === 'string') {
    return arr;
  }
  var str = '',
    _arr = arr;
  for(var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if(v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for(var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

/**
 * @func 日期的格式化
 * @param 日期格式化
 * @returns
 */
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
export default stringutils;

