/**
 * <p>
 * <li>
 *
 * ----HuangYong 2016-10-06 </li>
 * </p>
 *
 * <b>类说明： JS基础工具类 </b>
 * <p>
 * 本类主要用于 判断字符串为空，字符串转化，简单JS格式验证
 *
 * 本js类推荐使用原生的js进行编写，因为本类的方法有可能在页面加载之初，jquery还未加载完成时使用
 * </p>
 */
import $ from 'jquery'
var tools = {}


     /**
      * @func 返回第一次加载页面让文本框自动获得焦点
      * @param 文本框ID
      */
tools.getFocus= function (inputID) {
       document.getElementById(inputID).focus();
     }

     /**
      * @func 返回事件节点，同时兼容ie和ff的写法
      */
  tools.getEvent=function () {
       if (document.all) return window.event;

       func = this.getEvent.caller;

       while (func != null) {
         var arg0 = func.arguments[0];
         if (arg0) {
           if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
             return arg0;
           }
         }
         func = func.caller;
       }

       return null;
     }

     /**
      * @func 返回去掉左右空格后的字符串
      * @param 去掉空格的参数
      */
  tools.myTrim=function (s) {
       return s.replace(/(^\s*)|(\s*$)/g, "");
     },

     /**
      * @func 返回字符串是否为空，true，是，false，否
      * @param 判断是否为空的参数
      */
  tools.isEmpty=function (s) {
       if (this.myTrim(s + '').length <= 0) {
         return true;
       }
       return false;
     }

     /**
      * @func 返回对象是否为空，true，是，false，否
      * @param 判断是否为空的参数
      */
  tools.isNull=function (s) {
       if (typeof(s) == "undefined" || s == null || this.isEmpty(s)) {
         return true;
       }
       return false;
     }

     /**
      * @func 判断是否是整数
      * @param 传入字符串
      * @returns true:是，false，否
      */
  tools.isInteger=function (s) {
       if (this.isEmpty(s)) {
         return false;
       }

       var patrn = /^[\-\+]?\d+$/;
       if (patrn.exec(s)) {
         return true;
       }
       return false;
     }

     /**
      * @func 验证正的最多n为小数的数字
      * @param s
      *            要校验的字符串，n 小数位数
      * @returns true 验证成功,false 验证失败
      */
  tools.isFloat= function (s, n) {
       if (this.isEmpty(s)) {
         return false;
       }

       if (!this.isInteger(n)) {
         return false;
       } else {
         if (n < 1)
           return false;
       }

       var matchs = '\^[\-\+\]?([0-9]\*|0)(\\.[0-9]{1,' + n + '})\?\$';
       var patrn = new RegExp(matchs, "ig");
       if (patrn.exec(s)) {
         return true;
       }

       return false;
     }

     /**
      * @func 判断字符串是否由数字字符组成
      * @param 需要判断的字符串
      * @returns true 由数字组成, false 不只由数字组成
      */
  tools.isNumber=function (s) {
       if (this.isEmpty(s)) {
         return false;
       }

       var patrn = /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?)$/;
       if (patrn.exec(s)) {
         return true;
       }

       return false;
     }

     /**
      * @func 判断是否为日期类型（不能验证时分秒）
      * @param 传入的日期
      * @returns true 是日期类型 false 不是日期类型
      */
  tools.isDate=function (s) {
       if (this.isEmpty(s)) {
         return false;
       }

       if (/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s)) {
         var r = s.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
         if (r == null)
           return false;
         var d = new Date(r[1], r[3] - 1, r[4]);
         return (d.getFullYear() == r[1]
           && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
       } else {
         return false;
       }
     }

     /**
      * @func 是否是日期时间类型
      * @param 需判断的日期
      * @returns true 是日期时间类型 ,false 不是日期时间类型
      */
  tools.isDateTime= function (str) {
       if (this.isEmpty(str)) {
         return false;
       }

       var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
       var r = str.match(reg);
       if (r == null)
         return false;
       var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
       return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3]
         && d.getDate() == r[4] && d.getHours() == r[5]
         && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
     }

     /**
      * @func 验证d1、d2两个日期哪个大
      * @param 比较的日期参数
      * @returns true d1小于等于d2, false d1大于d2，或者日期格式不正确
      */
  tools.compareDate= function (d1, d2) {
       if (this.isEmpty(d1) || this.isEmpty(d2)) {
         return undefined;
       }

       return ((new Date(d1.replace(/-/g, "\/"))) <= (new Date(d2
         .replace(/-/g, "\/"))));
     }

     /**
      * @func 验证日期和当前时间的大小
      * @param 验证的日期
      * @returns true d1小于等于d2 ,false d1大于d2，或者日期格式不正确
      */
  tools.compareWithToday= function (d1) {
       if (this.isEmpty(d1)) {
         return false;
       }
       return ((new Date(d1.replace(/-/g, "\/"))) <= (new Date()));
     }

     /**
      * @func 判断是否包含特殊字符 s 被验证的字符串 ch
      * @param s:验证的字符串，ch：特殊字符，vec：特殊字符数组
      * @returns true汉字不算特殊字符串，false 汉字算是字符串; vec 特殊字符数组，包含在数组中的不算特殊字符
      *          true 不包含特殊字符 false 包含特殊字符
      */
  tools.isStr=function (s, ch, vec) {
       if (this.isEmpty(s)) {
         return false;
       }
       var china = "";
       var strs = "";
       if (ch) {
         china = "\\u4e00-\\u9fa5";
       }
       if (vec != null) {
         for (var i = 0; i < vec.length; i++) {
           strs += "|\\" + vec[i];
         }
       }
       var matchs = '\^[0-9A-Za-z' + china + strs + ']{1,}\$';
       var patrn = new RegExp(matchs, "ig");
       if (patrn.exec(s)) {
         return true;
       }
       return false;
     }

     /**
      * @func 验证一代身份证号（15位数）匹配对应省份地址；生日能正确匹配]
      * @param 待验证的字符串
      * @returns 是否匹配
      */
  tools.IsIDCard15= function (input) {
       // 验证是否可以转换为15位整数
       if (input.length != 15) {
         return false;
       }
       // 验证省份是否匹配
       // 1~6位为地区代码，其中1、2位数为各省级政府的代码，3、4位数为地、市级政府的代码，5、6位数为县、区级政府代码。
       var address = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91,";
       if (address.indexOf(input.substring(0, 2) + ",") < 0) {
         return false;
       }
       // 验证生日是否匹配
       var birthdate = input.substring(6, 12);
       birthdate = birthdate.substring(0, 2) + "/"
         + birthdate.substring(2, 4) + "/"
         + birthdate.substring(4, 6);
       if (new Date(birthdate) == "Invalid Date") {
         return false;
       }
       return true;
     }

     /**
      * @func 返回身份证是否合法
      * @param 验证的字符串
      * @returns true:成功，false，失败
      */
  tools.isCardID=function (sId) {
       /**
        * 判断身份证合法
        */
       var aCity = {
         11: "北京",
         12: "天津",
         13: "河北",
         14: "山西",
         15: "内蒙古",
         21: "辽宁",
         22: "吉林",
         23: "黑龙江",
         31: "上海",
         32: "江苏",
         33: "浙江",
         34: "安徽",
         35: "福建",
         36: "江西",
         37: "山东",
         41: "河南",
         42: "湖北",
         43: "湖南",
         44: "广东",
         45: "广西",
         46: "海南",
         50: "重庆",
         51: "四川",
         52: "贵州",
         53: "云南",
         54: "西藏",
         61: "陕西",
         62: "甘肃",
         63: "青海",
         64: "宁夏",
         65: "新疆",
         71: "台湾",
         81: "香港",
         82: "澳门",
         91: "国外"
       };

       var iSum = 0;
       var info = "";
       // 身份证15为验证
       if (this.IsIDCard15(sId)) {
         return true;
       }
       if (sId.length != 18 || !/^\d{17}(\d|x)$/i.test(sId)) {
         return false;
       }// "你输入的身份证长度或格式错误";
       sId = sId.replace(/x$/i, "a");
       if (aCity[parseInt(sId.substr(0, 2))] == null) {
         return false;
       }// "你的身份证地区非法";
       sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2))
         + "-" + Number(sId.substr(12, 2));
       var d = new Date(sBirthday.replace(/-/g, "/"));
       if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1)
           + "-" + d.getDate())) {
         return false;
       }// "身份证上的出生日期非法";
       for (var i = 17; i >= 0; i--)
         iSum += (Math.pow(2, i) % 11)
           * parseInt(sId.charAt(17 - i), 11);
       if (iSum % 11 != 1) {
         return false;
       }// "你输入的身份证号非法";
       return true;
     }

     /**
      * @func 钱，去掉逗号，小数点后面自动补全
      * @param 文本框ID
      */
  tools.removeStr=function (s) {
       var str = document.getElementById(s).value;
       str = str.replace(/,/gi, "");
       str = str.replace(/，/gi, "");
       var after = "";
       if (str.indexOf(".") > 0) {
         after = str.substring(str.indexOf("."), str.length);
       }
       if (!after == "") {
         if (after.length < 2) {
           str = str + "00";
         } else if (after.length == 2) {
           str = str + "0";
         } else {
           str = str;
         }
       }
       document.getElementById(s).value = str;
     }

     /**
      * @func 钱,千分位格式化
      * @param 文本框ID
      */
  tools.transStr= function (s) {
       var str = document.getElementById(s).value;
       var begin = "";
       var after = "";
       var l;
       var str2 = "";
       if (str.indexOf(".") < 0)
         str = str + ".00";
       if (str.indexOf(".") > 0) {
         begin = str.substring(0, str.indexOf("."));
         after = str.substring(str.indexOf("."), str.length);
       } else {
         begin = str;
       }
       l = begin.length / 3;
       if (l > 1) {
         for (var i = 0; i < l;) {
           str2 = "," + begin.substring(begin.length - 3, begin.length) + str2;
           begin = begin.substring(0, begin.length - 3);
           l = begin.length / 3;
         }
         if (after.length < 3) {
           str2 = begin + str2 + after + "0";
         } else {
           str2 = begin + str2 + after
         }
         str = str2.substring(1);
       } else {
         if (after.length < 3) {
           str = str + "0";
         } else {
           str = str;
         }
       }
       document.getElementById(s).value = str;
     }

     /*
          * 格式化字符串：
          * val：将格式化的数据
          * stat: 格式化的类型（formatNumber:格式化成数字,formatDate格式化成日期（时间）:,formatPercent:格式化成百分比,formatYuan:格式化成人民币¥5.00,formatDollar:格式化成美元$5.00,formatState:格式化状态）
          * pattern: 格式化数字的如formatNumber一般就#0和#0.00两个参数，格式化状态就穿对应的key，value对象进来，时间就yyy-mm-dd这种格式
          */
  tools.format= function (val, stat, pattern) {
       if (typeof(val) == 'object' && jQuery.isEmptyObject(val)) {
         return "";
       }

       if (val == undefined) {
         return "";
       }

       if (stat) {
         stat = stat.toLocaleLowerCase();
         if (stat == 'formatnumber') {
           var decimalNum = pattern.split('.');
           if (pattern.indexOf(',')) {
             if (decimalNum.length == 2) {
               val = this.formatNumber(val, decimalNum[1].length);
             } else {
               val = this.formatInt(val);
             }
           } else {
             if (decimalNum.length == 2) {
               val = this.roundDigit(val, decimalNum[1].length);
             } else {
               val = this.roundDigit(val, 0);
             }
           }
         }
         else if (stat == 'formatdate') {
           if (val.time != undefined) {
             val = this.formatDate(pattern, new Date(val.time));
           }
         }
         else if (stat == 'formatdollar') {
           var decimalNum = pattern.split('.');
           if (pattern.indexOf(',')) {
             if (decimalNum.length == 2) {
               val = this.formatNumber(val, decimalNum[1].length);
             } else {
               val = this.formatInt(val);
             }
           } else {
             if (decimalNum.length == 2) {
               val = this.roundDigit(val, decimalNum[1].length);
             } else {
               val = this.roundDigit(val, 0);
             }
           }
           val = "$" + val;
         }
         else if (stat == 'formatyuan') {
           var decimalNum = pattern.split('.');
           if (pattern.indexOf(',')) {
             if (decimalNum.length == 2) {
               val = this.formatNumber(val, decimalNum[1].length);
             } else {
               val = this.formatInt(val);
             }
           } else {
             if (decimalNum.length == 2) {
               val = this.roundDigit(val, decimalNum[1].length);
             } else {
               val = this.roundDigit(val, 0);
             }
           }
           val = "￥" + val;
         }
         else if (stat == 'formatpercent') {
           var decimalNum = pattern.split('.');
           if (pattern.indexOf(',')) {
             if (decimalNum.length == 2) {
               val = this.percentNum(val, decimalNum[1].length);
             } else {
               val = this.percentNum(val, 0);
             }
           } else {
             if (decimalNum.length == 2) {
               val = this.percentNum(val, decimalNum[1].length);
             } else {
               val = this.percentNum(val, 0);
             }
           }
         }
         else if (stat == 'formatstate') {
           if (typeof(pattern) == 'object') {
             var abc = pattern[val];

             if (abc != undefined && !this.isEmpty(abc)) {
               val = abc;
             }
           }
         }
       }

       return val;
     }

     /**
      * 金额千位格式化函数
      */
  tools.formatNumber=function (s, n) {
       n = n > 0 && n <= 20 ? n : 2;

       s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";

       var l = s.split(".")[0].split("").reverse(),
         r = s.split(".")[1];
       var len = (s.indexOf("-") != -1) ? l.length - 1 : l.length;
       t = "";

       for (i = 0; i < len; i++) {
         t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != len ? "," : "");
       }

       return ((s.indexOf("-") != -1) ? "-" : "") + t.split("").reverse().join("") + "." + r;
     }

     /**
      * 整数千位格式化函数
      */
  tools.formatInt= function (s) {
       s = parseInt((s + "").replace(/[^\d-]/g, "")) + "";
       var l = s.split(".")[0].split("").reverse();
       t = "";
       var len = (s.indexOf("-") != -1) ? l.length - 1 : l.length;
       for (i = 0; i < len; i++) {
         t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != len ? "," : "");
       }
       return ((s.indexOf("-") != -1) ? "-" : "") + t.split("").reverse().join("");
     }

     /**
      * 精确小数点N位，四舍五入方式
      */
  tools.roundDigit= function (num, n) {
       if (typeof num != "number")
         return "";
       return Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
     }

     /**
      * 将比例形式的数据转化为百分比表示
      */
  tools.percentNum=function (val, digit) {
       if (val != "" || val == 0) {
         val = ((this.roundDigit(parseFloat(val) * 100, digit)).toFixed(digit) + "%");
       }
       return val;
     }

export default tools;

