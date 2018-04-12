/**
 *<p>
 *<li>
 *
 *					----administrator 2016-10-06
 *</li>
 *</p>
 *
 *<b>类说明： JS安全处理类  </b>
 *<p>
 *		本类主要用于 安全业务处理，加密算法，防护盾
 *
 *</p>
 */
import stringutils from './gnnt.stringutils.js';
import md5 from './gnnt.md5.js';
import Config from './gnnt.config.js';;




  var security = {};

/*  if(stringutils.isNull(Config)){
    Config = store.get('config');
    if(stringutils.isNull(Config)){
      Config = require("config");
    }
  }*/

  /**
   * @func 防护盾模块
   */
  security.echarutils = function(){

    echarutils = {};

    /**
     * @func 获取相应的加密串
     * @param numb
     * @returns {String}
     */
    echarutils.getEChar = function(numb){

      /**
       * seedA，在部署时，此项变量需要根据服务端配置进行修改,正式环境部署，请压缩后在部署
       */
      var seedA = security.cryptoutils().decryptByAes(Config.seedOne);
      /**
       * seedB，在部署时，此项变量需要根据服务端配置进行修改,正式环境部署，请压缩后在部署
       */
      var seedB = security.cryptoutils().decryptByAes(Config.seedTwo);
      /**
       * seedC 常量配置，需和服务端防护盾中配置保持一致
       */
      var seedC = security.cryptoutils().decryptByAes(Config.seedThree);

      //console.log('numb : ' + numb);
      //console.log('seedOne : ' + seedA);
      //console.log('seedTwo : ' + seedB);
      //console.log('seedThree : ' + seedC);

      if((!stringutils.isNull(numb) && numb!='0' ||  typeof numb == 'number' ) && !isNaN(numb)){
        //console.log(numb);
        numb = numb.toString();
        var type = numb.substring(0, 1)*1.0;
        var retcode = '';
        var retbytes = []
        switch (type) {
          case 0:
            retcode = Number(numb) * seedA + seedB * 2.0 + seedC * 1.0;
            break;
          case 1:
            retcode = Number(numb) * seedB + seedA * 5.0 + seedC * Number(numb);
            break;
          case 2:
            retcode = Number(numb) * (seedA * 3.0 + seedB * 2.0 + seedC * 2.0);
            break;
          case 3:
            retcode = Number(numb) * (seedA * 5.0 + seedC * 2.0) + seedA * seedB;
            break;
          case 4:
            retcode = Number(numb) * seedB * 5.0 + seedA * seedC;
            break;
          case 5:
            retcode = Number(numb) * seedA + 2 * seedB + 3 * seedC;
            break;
          case 6:
            retcode = Number(numb) * seedB + 2 * seedA + 5 * seedC;
            break;
          case 7:
            retcode = Number(numb) * 1.0 + seedB * 1.0 + seedA * 1.0 + seedC * 3.0;
            break;
          case 8:
            retcode = Number(numb) * (seedB*1.0 + 2 * seedA + seedC * 3);
            break;
          case 9:
            retcode = Number(numb) * (seedA*1.0 + 2 * seedB + seedC * 5);
            break;
          default:
            retcode = Number(numb) * seedA + seedB * 1.0 + seedC * 3;
        }

        if(retcode>100000000){
          retcode = retcode.toString().substring(0, 8);
        } else {
          retcode = retcode + '';
        }
        //console.log(retcode);

        retbytes = echarutils.getBytes(retcode);

        for(var i=0; i + 1<retbytes.length; i++){
          var elem = retbytes[i];
          retbytes[i] = retbytes[i+1];
          retbytes[i+1] = elem;
          i++;
        }

        retcode = echarutils.getString(retbytes);
        //console.log(retcode);

        retcode = md5(retcode);
        //console.log(retcode);

        return retcode;

      } else {

        return '';

      }
    }

    /**
     * @func 将字符串转为byte数组
     * @param str
     * @returns {Array}
     */
    echarutils.getBytes = function(str){
      var ch, st, re = [];
      for (var i = 0; i < str.length; i++ ) {
        ch = str.charCodeAt(i);
        st = [];
        do {
          st.push( ch & 0xFF );
          ch = ch >> 8;
        }
        while ( ch );
        re = re.concat( st.reverse() );
      }
      return re;
    }

    /**
     * @func 将bytes数组转为字符串
     * @param bytes
     * @returns {String}
     */
    echarutils.getString = function(bytes){
      var str = '';
      for(var i in bytes){
        str = str + String.fromCharCode(bytes[i]);
      }
      return str;
    }

    return echarutils;
  }

  /**
   * @func DES加密工具
   */
  security.cryptoutils = function(){

    cryptoutils = {};

    //CryptoUtil加密模式
    cryptoutils.MODE = {
      'DES_ECB':'des-ecb',
      'DES_CBC':'des-cbc',
      '3DES_ECB':'des-ede3',
      '3DES_CBC':'des-ede3-cbc'
    }

    /**
     * @func CryptoUtil DES方法
     */
    cryptoutils.des = function (param , keyCode , ivParameter) {
      try{
        var key = new Buffer(keyCode);
        var iv = new Buffer(ivParameter ? ivParameter : 0)
        var plaintext = param.plaintext
        var alg = param.alg
        var autoPad = param.autoPad  ||  true ;

        //encrypt
        var cipher = crypto.createCipheriv(alg, key, iv);
        cipher.setAutoPadding(autoPad)  //default true
        var ciph = cipher.update(plaintext, 'utf8', 'hex');
        ciph += cipher.final('hex');

        //decrypt
        var decipher = crypto.createDecipheriv(alg, key, iv);
        cipher.setAutoPadding(autoPad)
        var txt = decipher.update(ciph, 'hex', 'utf8');
        txt += decipher.final('utf8');

        return {encrypty:ciph,decrypt:txt};
      } catch(e){
        return null;
      }
    }

    /**
     * @func DES加密
     * @param message
     * @param mode
     * @returns
     */
    cryptoutils.encryptDES = function(message , mode , keyCode , ivParameter){
      try{
        var encrypt = des({alg: mode,plaintext: message } , keyCode , ivParameter);
        return encrypt ;
      } catch(e){
        return null;
      }
    }

    /**
     * @func CBC模式加密
     * @param message 待加密的字符串
     * @returns
     */
    cryptoutils.encryptByDESModeCBC = function (message , parameter) {

      //加密密钥
      var keyCode = cryptoutils.decryptByAes(Config.keyCode);

      //加密密钥偏移量
      var ivParameter = cryptoutils.decryptByAes(Config.ivParameter);

      //如果有加密密钥参数，则使用加密密钥参数
      if(parameter != null && typeof(parameter) != "undefined" && parameter != "" ){
        keyCode = parameter;
        ivParameter = parameter;
      }

      try{
        var keyHex = CryptoJS.enc.Utf8.parse(keyCode);
        var ivHex = CryptoJS.enc.Utf8.parse(ivParameter);

        encrypted = CryptoJS.DES.encrypt(message, keyHex, {
          iv:ivHex,
          mode: CryptoJS.mode.CBC,
          padding:CryptoJS.pad.Pkcs7
        });

        var retcode = encrypted.toString();
        var encrypt = encrypted.ciphertext.toString();

        return retcode;

      } catch(e){

        return "";
      }
    }

    /**
     * @func CBC模式解密
     * @param ciphertext2 待解密的加密串
     * @returns
     */
    cryptoutils.decryptByDESModeCBC = function (ciphertext2 , parameter) {

      //加密密钥
      var keyCode = cryptoutils.decryptByAes(Config.keyCode);

      //加密密钥偏移量
      var ivParameter = cryptoutils.decryptByAes(Config.ivParameter);

      //如果有加密密钥参数，则使用加密密钥参数
      if(parameter != null && typeof(parameter) != "undefined" && parameter != "" ){
        keyCode = parameter;
        ivParameter = parameter;
      }

      try{
        var keyHex = CryptoJS.enc.Utf8.parse(keyCode);
        var ivHex = CryptoJS.enc.Utf8.parse(ivParameter);

        // direct decrypt ciphertext
        var decrypted = CryptoJS.DES.decrypt(
          { ciphertext: CryptoJS.enc.Hex.parse(ciphertext2) },
          keyHex,
          { iv:ivHex, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
        );

        return decrypted.toString(CryptoJS.enc.Utf8);

      } catch(e){

        return "";
      }
    }

    /**
     * @func DES  ECB模式加密
     * @param message 待加密的字符串
     * @returns
     */
    cryptoutils.encryptByDESModeEBC = function (message , parameter){

      //加密密钥
      var keyCode = cryptoutils.decryptByAes(Config.keyCode);

      //加密密钥偏移量
      var ivParameter = cryptoutils.decryptByAes(Config.ivParameter);

      var keyHex = CryptoJS.enc.Utf8.parse(keyCode);

      //如果有加密密钥参数，则使用加密密钥参数
      if(parameter != null && typeof(parameter) != "undefined" && parameter != "" ){
        keyCode = parameter;
        ivParameter = parameter;

        keyHex= parameter;
      }

      try{
        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.ciphertext.toString();
      } catch(e){
        return "";
      }
    }

    /**
     * @func DES  ECB模式解密
     * @param ciphertext 待解密的加密串
     * @returns
     */
    cryptoutils.decryptByDESModeEBC = function (ciphertext , parameter){

      //加密密钥
      var keyCode = cryptoutils.decryptByAes(Config.keyCode);

      //加密密钥偏移量
      var ivParameter = cryptoutils.decryptByAes(Config.ivParameter);

      //如果有加密密钥参数，则使用加密密钥参数
      if(parameter != null && typeof(parameter) != "undefined" && parameter != "" ){
        keyCode = parameter;
        ivParameter = parameter;
      }

      try{
        var keyHex = CryptoJS.enc.Utf8.parse(keyCode);
        var decrypted = CryptoJS.DES.decrypt({
          ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
        }, keyHex, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });

        var result_value = decrypted.toString(CryptoJS.enc.Utf8);

        return result_value;
      } catch(e){
        return "";
      }
    }

    /**
     * @func AES ECB模式加密
     * @param message 待加密的字符串
     */
    cryptoutils.encryptByAes = function(message){

      //AES加密密钥
      var aesKeyCode = Config.aesKeyCode;

      try{
        var key = CryptoJS.enc.Utf8.parse(aesKeyCode);
        var encryptedData = CryptoJS.AES.encrypt(message, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });

        var encryptedBase64Str = encryptedData.toString();
        var encryptedStr = encryptedData.ciphertext.toString();

        return encryptedStr;
      } catch(e){
        return "";
      }
    }

    cryptoutils.decryptByAes = function(ciphertext){

      //AES加密密钥
      var aesKeyCode = Config.aesKeyCode;

      try{
        var key = CryptoJS.enc.Utf8.parse(aesKeyCode);
        var encryptedHexStr = CryptoJS.enc.Hex.parse(ciphertext);
        var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);

        var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });

        var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);

        return decryptedStr;
      } catch(e){
        return "";
      }
    }

    return cryptoutils;
  }

  /**
   * @func 获取防护盾加密串
   */
  //security.getEChar = new security.echarutils().getEChar;

  /**
   * @func 加密密码
   */
  //security.encryptDes = new security.cryptoutils().encryptByDESModeCBC;

  /**
   * @func 解密密码
   */
  //security.decryptDes = new security.cryptoutils().decryptByDESModeCBC;

  /**
   * @func 加密密码
   */
  security.encryptDesEBC = new security.cryptoutils().encryptByDESModeEBC;

  /**
   * @func 解密密码
   */
  //security.decryptDesEBC = new security.cryptoutils().decryptByDESModeEBC;

  /**
   * @func 加密密码（Aes）
   */
  //security.encryptByAes = new security.cryptoutils().encryptByAes;

  /**
   * @func 解密密码（Aes）
   */
  //security.decryptByAes = new security.cryptoutils().decryptByAes;

  /**
   * @func des 加解密
   */
  //security.des = new security.cryptoutils().encryptDES;

  export default {security};

