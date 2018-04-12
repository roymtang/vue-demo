/**
 *<p>
 *<li>
 *
 *					----administrator 2016-10-06
 *</li>
 *</p>
 *
 *<b>类说明： JS通信协议类  </b>
 *<p>
 *		本类主要用于 1.JSON对象转化成请求XML
 *				        2.返回XML转化成JSON对象
 *				        3.请求协议的发送和返回处理
 *
 *</p>
 */

import $ from 'jquery'
import stringutils from './gnnt.stringutils.js'
import httputils from './gnnt.httputils.js'
import store from './gnnt.store.js'
import Config from './gnnt.config.js'

  /**
   * @func JS通信协议类对象
   */
  var communication = {};

  /**
   * @func 返回发送请求的URL地址
   * IP数组  配置文件
   */
  communication.urlAddress = function(protocol,type){

    //请求前置机地址信息
    var req = {};

    //获取协议-配置地址Map集合
    var protocolMap = Config.protocolMap;

    //如果是手机端模式，则获取手机端的协议-配置地址Map集合
    if(type == 'mobile'){
      protocolMap = Config.mprotocolMap;
    }

    //console.log(protocol);

    //获取协议对应的IP地址信息
    var ipAdress = protocolMap[protocol][0];

    //IP数组
    var ipArray = ipAdress.split(",");

    //随机数，用于获取IP数组中的一个随机IP地址
    var value = Math.floor(Math.random()*(ipArray.length) + 0);

    //前置机IP地址、端口
    ipAddress = ipArray[value];

    //设置web端前置机地址
    req['webUrl'] = protocolMap[protocol][1].replace("{IPADDRESS}", ipAddress);

    //返回前置机地址信息
    return req;
  }

  /**
   * @func 将XML转换成JSON格式
   * @param xml 待转化的XML字符串
   */
  communication.xmlToJson = function (xml, tab , callback) {
    if(!stringutils.isNull(xml)){
      var X = {
        toObj: function(xml) {
          var o = {};
          if (xml.nodeType==1) {
            if (xml.attributes.length)
              for (var i=0; i<xml.attributes.length; i++)
                o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
            if (xml.firstChild) {
              var textChild=0, cdataChild=0, hasElementChild=false;
              for (var n=xml.firstChild; n; n=n.nextSibling) {
                if (n.nodeType==1) hasElementChild = true;
                else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                else if (n.nodeType==4) cdataChild++; // cdata section node
              }
              if (hasElementChild) {
                if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                  //X.removeWhite(xml);
                  for (var n=xml.firstChild; n; n=n.nextSibling) {
                    if (n.nodeType == 3)  // text node
                      o["#text"] = X.escape(n.nodeValue);
                    else if (n.nodeType == 4)  // cdata node
                      o["#cdata"] = X.escape(n.nodeValue);
                    else if (o[n.nodeName]) {  // multiple occurence of element ..
                      if (o[n.nodeName] instanceof Array)
                        o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                      else
                        o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                    }
                    else  // first occurence of element..
                      o[n.nodeName] = X.toObj(n);
                  }
                }
                else { // mixed content
                  if (!xml.attributes.length)
                    o = X.escape(X.innerXml(xml));
                  else
                    o["#text"] = X.escape(X.innerXml(xml));
                }
              }
              else if (textChild) { // pure text
                if (!xml.attributes.length)
                  o = X.escape(X.innerXml(xml));
                else
                  o["#text"] = X.escape(X.innerXml(xml));
              }
              else if (cdataChild) { // cdata
                if (cdataChild > 1)
                  o = X.escape(X.innerXml(xml));
                else
                  for (var n=xml.firstChild; n; n=n.nextSibling)
                    o["#cdata"] = X.escape(n.nodeValue);
              }
            }
            if (!xml.attributes.length && !xml.firstChild) o = null;
          } else if (xml.nodeType==9) { // document.node
            o = X.toObj(xml.documentElement);
          }
          return o;
        },
        toJson: function(o, name, ind) {
          var json = name ? ("\""+name+"\"") : "";
          if (o instanceof Array) {
            for (var i=0,n=o.length; i<n; i++)
              o[i] = X.toJson(o[i], "", ind+"\t");
            json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
          } else if (o == null){
            json += (name&&":") + "null";
          } else if (typeof(o) == "object") {
            var arr = [];
            for (var m in o)
              arr[arr.length] = X.toJson(o[m], m, ind+"\t");
            json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
          } else if (typeof(o) == "string"){
            json += (name&&":") + "\"" + o.toString() + "\"";
          } else {
            json += (name&&":") + o.toString();
          }
          return json;
        },
        innerXml: function(node) {
          var s = ""
          if ("innerHTML" in node)
            s = node.innerHTML;
          else {
            var asXml = function(n) {
              var s = "";
              if (n.nodeType == 1) {
                s += "<" + n.nodeName;
                for (var i=0; i<n.attributes.length;i++)
                  s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                if (n.firstChild) {
                  s += ">";
                  for (var c=n.firstChild; c; c=c.nextSibling)
                    s += asXml(c);
                  s += "</"+n.nodeName+">";
                }
                else
                  s += "/>";
              }
              else if (n.nodeType == 3)
                s += n.nodeValue;
              else if (n.nodeType == 4)
                s += "<![CDATA[" + n.nodeValue + "]]>";
              return s;
            };
            for (var c=node.firstChild; c; c=c.nextSibling)
              s += asXml(c);
          }
          return s;
        },
        escape: function(txt) {
          return txt.replace(/[\\]/g, "\\\\")
            .replace(/[\"]/g, '\\"')
            .replace(/[\n]/g, '\\n')
            .replace(/[\r]/g, '\\r');
        },
        removeWhite: function(e) {
          e.normalize();
          for (var n = e.firstChild; n; ) {
            if (n.nodeType == 3) {
              if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                var nxt = n.nextSibling;
                e.removeChild(n);
                n = nxt;
              } else {
                n = n.nextSibling;
              }
            } else if (n.nodeType == 1) {
              X.removeWhite(n);
              n = n.nextSibling;
            } else {
              n = n.nextSibling;
            }
          }
          return e;
        }
      };
      if( Object.prototype.toString.call(xml) === "[object String]" ){
        xml = this.parseXml(xml);
      }
      if (xml.nodeType == 9){
        if(xml.documentElement!=null&&xml.documentElement.innerHTML!=null){
          xml = this.parseXml(xml.documentElement.innerHTML);
        } else {
          xml = xml.documentElement;
        }
      }
      if(tab == null){
        tab = '';
      }
      var json = X.toJson(X.toObj(xml), xml.nodeName, "\t");
      if(stringutils.isNull(json) || json == "{}"){
        return null;
      } else {
        json = "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
        //console.log(json);
        var resp = eval('json='+json);
        resp['REP']['TIMESTAMP'] = new Date().getTime();
        //调用回调函数，进行具体业务处理，检测返回码，是否是session失效
        if(!stringutils.isNull(callback)){
          callback();
        }
        //返回Ajax请求响应json对象
        return resp;
      }
    }
  }

  /**
   * @func 将Json转换成XML格式
   * @param o 待转化的json对象
   */
  communication.jsonToXml = function (o, tab) {

    if(!stringutils.isNull(o)){
      var toXml = function(v, name, ind) {

        var xml = "";

        if (v instanceof Array) {
          for (var i=0, n=v.length; i<n; i++){
            xml += ind + toXml(v[i], name, ind+"\t") + "\n";
          }
        } else if (typeof(v) == "object") {
          var hasChild = false;
          xml += ind + "<" + name;
          for (var m in v) {
            if (m.charAt(0) == "@")
              xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
            else
              hasChild = true;
          }
          xml += hasChild ? ">" : "/>";
          if (hasChild) {
            for (var m in v) {
              if (m == "#text")
                xml += v[m];
              else if (m == "#cdata")
                xml += "<![CDATA[" + v[m] + "]]>";
              else if (m.charAt(0) != "@")
                xml += toXml(v[m], m, ind+"\t");
            }
            xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
          }
        } else {
          xml += ind + "<" + name + ">" + stringutils.deNull(v).toString() +  "</" + name + ">";
        }
        return xml;
      }, xml="";

      for (var m in o){
        xml += toXml(o[m], m, "");
      }

      if(xml != null){
        xml = Config.xmlHead + '<' + Config.xmlTag + '>' + xml + '</' + Config.xmlTag + '>' ;
      }

      return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
    }
  }

  /**
   * @func 将Xml转化为Dom对象
   * @param xml 待转化的XML字符串
   */
  communication.parseXml = function (xml) {
    var dom = null;
    xml = this.removeXMLNode(xml);
    if (window.DOMParser) {
      try {
        dom = (new DOMParser()).parseFromString(xml, "application/xml");
      } catch (e) {
        dom = null;
      }
    } else if (window.ActiveXObject) {
      try {
        dom = new ActiveXObject('Microsoft.XMLDOM');
        dom.async = false;
        if (!dom.loadXML(xml)){
        }
      } catch (excep) {
        dom = null;
      }
    }
    if(dom!=null){
      if(dom.childNodes!=null&&dom.childNodes[0].firstChild!=null){
        if(dom.childNodes[0].firstChild.tagName == 'parsererror'){
          dom.childNodes[0].removeChild(dom.childNodes[0].firstChild);
        }
      }
      if(dom.childNodes!=null&&dom.childNodes[0].nodeName=='REP'){
        dom = dom.childNodes[0];
      }
    }
    return dom;
  }

  /**
   * @func 去掉多余标签 <br/>
   * 	如 <?xml version="1.0" encoding="GB2312"?> <MEBS_MOBILE>
   * @param 待处理的xml字符串
   */
  communication.removeXMLNode = function (xml){
    //获取配置信息中的XML标签数组
    var xmlLab = Config.xmlLab.split(",");
    //去掉<?xml version="1.0" encoding="GB2312"?>
    if(xml.indexOf('<?')>=0&&xml.indexOf('?>')>=0){
      xml = xml.substring(xml.indexOf('?>')+2);
    }
    //去掉MEBS_MOBILE标签
    for( var lab in xmlLab ){
      var value = xmlLab[lab];
      if(xml.indexOf(value)>=0){
        if(xml.indexOf('<'+value+'>')>=0){
          xml = xml.replace('<'+value+'>','');
        }
        if(xml.indexOf('</'+value+'>')>=0){
          xml = xml.replace('</'+value+'>','');
        }
      }
    }
    return xml;
  }

  /**
   * @func 启动线程
   */
  communication.thread = function(callback,timestamp){
    if(!stringutils.isNull(callback)){
      callback();
      setInterval(callback,timestamp);
    }
  }

  /**
   * @func 向服务器发送XML请求
   * @param xml 请求Xml
   * @param callback 查询成功后的回调函数
   */
  communication.sendXmlReq = function(xml,callback,url,errorback){
    var reqData = this.parseXml(xml);
    var reqName = $(reqData).find('REQ').attr('name');
    var flag = !Constant.TIME_CHECK ? true : httputils.timemanager.checkReqTime(reqName , url);
    if(flag){
      $.support.cors=true;
      url = stringutils.isNull(url)?communication.urlAddress().webUrl:url;
      $.ajax({
        url:url,
        type:'post',
        data: xml,
        crossDomain: true ,
        success:callback,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        error:errorback
      });
      if(Constant.TIME_CHECK){
        //console.log('发送请求【请求协议】： request '+xml);
        httputils.timemanager.setReqTime(reqName , url);
      }
    } else {
      //console.log('拦截请求【请求过快】： request '+xml);
      if(httputils.timemanager.tips[reqName] == 'Y'){
        //提示异常信息
        gnntbox.warning('操作频繁，请稍后重试!');
      } else if(httputils.timemanager.cache[reqName] == 'Y'){
        //获取缓存数据
        var cacheDATA = store.get(xml);
        //回调缓存数据
        callback(cacheDATA);
      } else {
        if(!stringutils.isNull(errorback)){
          errorback();
        }
      }
    }
  }

  export default communication;
