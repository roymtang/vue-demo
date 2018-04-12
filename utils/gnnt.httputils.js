/**
 *<p>
 *<li>
 *
 *					----administrator 2016-10-06
 *</li>
 *</p>
 *
 *<b>类说明： JS HTTP连接工具类  </b>
 *<p>
 *		本类主要用于 1.http连接工具
 *
 *</p>
 */
import $ from 'jquery'
import stringutils from './gnnt.stringutils.js'
import store from './gnnt.store.js'
import Config from './gnnt.config.js'

   var httputils = {};

  /**
   * @func 调转至指定URL
   */
  httputils.redirectUrl = function(murl){
    try {
      if(document.getElementById("bdmark") != null){
        return;
      }
      var urlhash = window.location.hash;
      if (!urlhash.match("fromapp")){
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)) {
          //判断是否是在微信内置浏览器浏览
          if(true ||navigator.userAgent.match(/(iPhone|Android)/i) && navigator.userAgent.match(/(MicroMessenger)/i)){
            //如果url不为空，则跳转到URL地址
            if(!stringutils.isNull(murl)){
              window.location = murl;
            } else { //如果未发现url，直接跳转到Home页面
              window.location = 'index.html';
            }
          } else {//无权限浏览，跳转到提示页面
            window.location = 'auth.html';
          }
        } else {
          window.location = murl;
        }
      }
    } catch(e){}
  }

  /**
   * @func 调转至指定主页面
   */
  httputils.redirectMain = function(murl){

    try {
      if(document.getElementById("bdmark") != null){
        return;
      }
      var urlhash = window.location.hash;
      if (!urlhash.match("fromapp")){
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)) {
          //判断是否是在微信内置浏览器浏览
          if(true ||navigator.userAgent.match(/(iPhone|Android)/i) && navigator.userAgent.match(/(MicroMessenger)/i)){
            //如果url不为空，则跳转到URL地址
            if(!stringutils.isNull(murl)){
              window.location = murl;
            } else { //如果未发现url，直接跳转到Home页面（MOBILE-WEB端）
              window.location = Config.mobileMainURL;
            }
          } else {//无权限浏览，跳转到提示页面
            window.location = 'auth.html';
          }
        } else if(window.location.pathname != Config.mobileMainURL) {
          //如果url不为空，则跳转到URL地址
          if(!stringutils.isNull(murl)){
            window.location = murl;
          } else { //如果未发现url，直接跳转到Home页面（PC-WEB端）
            window.location = Config.webMainURL;
          }
        }
      }
    } catch(e){}
  }

  /**
   * @func 跳转检测,保证在手机端只能查看手机端的网页，在PC端只能查看PC端的网页
   */
  httputils.redirectCheck = function(){
    var href = window.location.href;
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)) {
      //如果浏览器为手机端，网页在PC端，则跳转到手机端网页
      if(href.indexOf('pc-web') >= 0){
        window.location = Config.mobileMainURL;
      }
    } else {
      //如果浏览器为PC端，网页在mobile端，则跳转到PC端网页
      if(href.indexOf('mobile-web') >= 0){
        window.location = Config.webMainURL;
      }
    }
  }

  /**
   * @func 获取当前地址参数值
   */
  httputils.queryArgs = function (name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return "";
  }

  /**
   * @func 获取cookie对应的用户session
   */
  httputils.queryCookie = function(callback){
    //先获取session信息，如果存在，则不进行查询，如果不存在，则查询cookie对应的session信息
    try{
      var userSession = store.get(Constant.USER_SESSION);
      var session = store.get('session');
      var info = session.split('|');
      if(stringutils.isNull(userSession) || userSession['REP']['RESULT']['N'] == 'null' || userSession['REP']['RESULT']['RETCODE'] != info[1]){
        var sessionXML = "<?xml version=\"1.0\" encoding = \"GBK\"?><GNNT><REP name=\"logon\"><RESULT><SYI>302</SYI><JSI></JSI><LT></LT><LI></LI><CP></CP><CFP></CFP><I></I><N>{name}</N><NAME>{name}</NAME><U>{name}</U><RK></RK><FUT></FUT><UT></UT><RETCODE>{session}</RETCODE></RESULT></REP></GNNT>";
        if(!stringutils.isNull(session) && session != 'null'){
          sessionXML = sessionXML.replace(new RegExp('{name}','gm'), stringutils.deNull(info[0])).replace(new RegExp('{session}','gm'), stringutils.deNull(info[1]));
          userSession = communication.xmlToJson(sessionXML);
          store.set(Constant.USER_SESSION , userSession);
        }
      }
      if(!stringutils.isNull(callback)){
        callback(userSession);
      }
    } catch(e){
      //console.log('查询cookie信息异常' + e);
    }
  }

  /**
   * @func 时间管理javascript类
   * @descript 本类的主要目的是，有效请求必须在每个页面发送
   * 	比如check_userinfo这个请求，因为不checkuser，则sessionID在发售的系统中是失效的，需要从其他系统中checkuser到本系统，但是不确定用户首先点击哪个菜单或者页面，所以大部分页面都有checkuser，另外checkuser不能太快，如果太快会被拦截，所以就要加一个时间管理的类来处理这个问题
   */
  httputils.timemanager = {};

  /**
   * @func 时间管理设置,有防止重复提交的功能，比如设置 协议 issue_delivery_apply ，10000 , 表示交收申请，如果在10秒内重复点击提交，则只会生效一次。
   */
  httputils.timemanager.req = {
    'my_order_query':'3000',
    'systime_query':'30230',
    'sysstatus_query':'38832',
    'check_userinfo':'32832',
    'categoryinfo_query':'12540',
    'cmdty_bill_query':'5000',
    'cmdtyinfo_query':'3100',
    'cmdty_quotation_query':'100',
    'system_commodity_detail_query':'32552',
    'issue_delivery_apply':'10000',
    'commodity_data_query':'500'
  }

  /**
   * @func 协议请求时间记录信息
   */
  httputils.timemanager.record = {
  }

  /**
   * @func 协议请求过快是否提示信息
   */
  httputils.timemanager.tips = {
    'my_order_query':'N',
    'systime_query':'N',
    'sysstatus_query':'N',
    'check_userinfo':'N',
    'categoryinfo_query':'N',
    'cmdty_bill_query':'N',
    'cmdtyinfo_query':'N',
    'cmdty_quotation_query':'N',
    'system_commodity_detail_query':'N',
    'issue_delivery_apply':'Y',
    'commodity_data_query':'N'
  }

  /**
   * @func 是否使用缓存
   */
  httputils.timemanager.cache = {
    'my_order_query':'Y',
    'systime_query':'N',
    'sysstatus_query':'N',
    'check_userinfo':'N',
    'categoryinfo_query':'Y',
    'cmdty_bill_query':'Y',
    'cmdtyinfo_query':'Y',
    'cmdty_quotation_query':'Y',
    'system_commodity_detail_query':'Y',
    'issue_delivery_apply':'N',
    'commodity_data_query':'Y'
  }

  /**
   * @func 记录某请求信息本次发送时间
   * @param req
   */
  httputils.timemanager.setReqTime = function(req , url){
    try{
      var urlType = httputils.timemanager.checkUrlType(url);
      var reqTimeMap = store.get(Constant.REQ_TIME_MAP + 'BY' + urlType);
      if(stringutils.isNull(reqTimeMap)){
        httputils.timemanager.record[urlType][req] = new Date().getTime();
        store.set(Constant.REQ_TIME_MAP + 'BY' + urlType,httputils.timemanager.record[urlType]);
      } else {
        reqTimeMap[req] = new Date().getTime();
        httputils.timemanager.record[urlType][req] = new Date().getTime();
        store.set(Constant.REQ_TIME_MAP + 'BY' + urlType , reqTimeMap);
      }
    } catch(e){

    }
  }

  /**
   * @func 获取某请求协议最近一次发送时间
   * @param req
   */
  httputils.timemanager.getReqTime = function(req , url){
    try{
      var urlType = httputils.timemanager.checkUrlType(url);
      var reqTimeMap = store.get(Constant.REQ_TIME_MAP + 'BY' + urlType);
      if(stringutils.isNull(reqTimeMap)){
        store.set(Constant.REQ_TIME_MAP + 'BY' + urlType , httputils.timemanager.record[urlType]);
        return new Date().getTime() - 10000000000;
      } else {
        var time = reqTimeMap[req] ;
        if(stringutils.isNull(time) || time == '' || time == 0){
          try{
            time = httputils.timemanager.record[urlType][req];
          } catch(e){
            time = 0;
          }
        }
        return time;
      }
    } catch(e){

    }
  }

  /**
   * @func 检测是否协议请求速度超过配置时间
   */
  httputils.timemanager.checkReqTime = function(req , url){
    var currentTime = new Date().getTime();
    var lastTime = Number(httputils.timemanager.getReqTime(req , url));
    var urlType = httputils.timemanager.checkUrlType(url);
    if(stringutils.isNull(httputils.timemanager.req[req])){
      return true;
    } else {
      var realTime = currentTime - lastTime;
      if(stringutils.isNull(httputils.timemanager.record[urlType])){
        httputils.timemanager.record[urlType] = {
          'my_order_query':'',
          'systime_query':'',
          'sysstatus_query':'',
          'check_userinfo':'',
          'categoryinfo_query':'',
          'cmdty_bill_query':'',
          'cmdtyinfo_query':'',
          'cmdty_quotation_query':'',
          'system_commodity_detail_query':'',
          'issue_delivery_apply':'',
          'commodity_data_query':''
        };
      }
      var time = Number(stringutils.deNull(httputils.timemanager.req[req]));
      //console.log(req+"  real:" + realTime + " time :"+time);
      if(realTime < time){
        return false;
      } else {
        return true;
      }
    }
  }

  /**
   * @func 检测URL的类型
   */
  httputils.timemanager.checkUrlType = function(url){
    if(url.indexOf('issue-frontend')>=0){
      return 'Issue';
    } else if(url.indexOf('mvs-frontend')>=0){
      return 'Message';
    } else if(url.indexOf('report-frontend')>=0){
      return 'Report';
    } else if(url.indexOf('expand-frontend')>=0){
      return 'Expand';
    } else if(url.indexOf('quotation-frontend')>=0){
      return 'Quotation';
    } else {
      return 'Other';
    }
  }

  export default httputils;


