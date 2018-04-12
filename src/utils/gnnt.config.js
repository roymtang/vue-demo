
import $ from 'jquery'
import store from './gnnt.store.js'

var Config = {}

Config = { time : new Date().getTime() };
Config.config = function con(){
  try{
    var config = store.get('config');
    var timestamp = new Date().getTime();
    if(config != null && typeof(config) != "undefined"  && config != "" && timestamp - config.time < 3600000 ){
      return config;
    } else {
      //加载config.properties配置文件
      $.properties({
        name:'Config.properties',// 资源文件名称
        path:'./',// 资源文件所在目录路径
        mode:'both',// 模式：变量或 Map
        language:' ',// 对应的语言
        cache:true,
        encoding: 'UTF-8',
        callback: function() {// 回调方法

        }
      });
    }
  } catch(e){
    console.log('初始化错误：' + e);
  }
}

  /**
   * 连接前置机的IP地址集合(多个用逗号分隔)
   */
  Config.ipAdress = $.prop('IpAddress');
  /**
   * 发售交易前置URL
   */
  Config.URL = $.prop('URL');

  /**
   * 发售报表前置URL
   */
  Config.reportURL = $.prop('reportURL');

  /**
   * 消息系统前置URL
   */
  Config.messageURL = $.prop('messageURL');

  /**
   * 发售交收前置URL
   */
  Config.deliveryURL = $.prop('deliveryURL');

  /**
   * 发售申购前置URL
   */
  Config.subscribeURL = $.prop('subscribeURL');

  /**
   * 发售交易前置URL（手机）
   */
  Config.mobileURL = $.prop('mobileURL');

  /**
   * 发售交收前置URL（手机）
   */
  Config.mobileDeliveryURL = $.prop('mobileDeliveryURL');

  /**
   * 发售申购前置URL（手机）
   */
  Config.mobileSubscribeURL = $.prop('mobileSubscribeURL');

  /**
   * XML标签
   */

  // Config.xmlLab = $.prop('xmlLab');
  Config.xmlLab = 'MEBS_MOBILE,MEBS_MT,MEBS_WEB,GNNT,MEBS';

  /**
   * XMLHead标签
   */
  Config.xmlHead = $.prop('xmlHead');

  /**
   * XML标识
   */
  Config.xmlTag = $.prop('xmlIdentify');

  /**
   * 防护盾配置SeedOne
   */
  Config.seedOne = $.prop('seedOne');

  /**
   * 防护盾配置SeedTwo
   */
  Config.seedTwo = $.prop('seedTwo');

  /**
   * 防护盾配置SeedThree
   */
  Config.seedThree = $.prop('seedThree');

  /**
   * 加密密钥
   */
  Config.keyCode = $.prop("keyCode");

  /**
   * 加密密钥偏移量
   */
  Config.ivParameter = $.prop("ivParameter");

  /**
   * AES加密密钥
   */
  Config.aesKeyCode = $.prop("aesKeyCode");

  /**
   * 手机端WEB主页面
   */
  Config.mobileMainURL = $.prop('mobileMainURL');

  /**
   * PC端WEB主页面
   */
  Config.webMainURL = $.prop('webMainURL');

  /**
   * 拓展系统URL
   */
  Config.expandURL = $.prop('expandURL');
  /**
   * 行情系统URL
   */
  Config.quotationURL = $.prop('quotationURL');

  /**
   * 配置协议-前置机URL集合
   */
  Config.protocolMap = {
    'issue':[Config.ipAdress, Config.URL],
    'delivery':[Config.ipAdress, Config.deliveryURL],
    'subscribe':[Config.ipAdress, Config.subscribeURL],
    'report':[Config.ipAdress, Config.reportURL],
    'message':[Config.ipAdress, Config.messageURL],
    'quotation':[Config.ipAdress, Config.quotationURL],

    'logon':[Config.ipAdress, Config.URL],
    'logout':[Config.ipAdress, Config.URL],
    'change_user_password':[Config.ipAdress, Config.URL],
    'check_userinfo':[Config.ipAdress, Config.URL],
    'commodity_data_query':[Config.ipAdress, Config.URL],
    'firm_info':[Config.ipAdress, Config.URL],
    'user_login':[Config.ipAdress, Config.URL],
    'user_logoff':[Config.ipAdress, Config.URL],
    'query_commodity':[Config.ipAdress, Config.URL],
    'sys_time_query':[Config.ipAdress, Config.URL],

    'issue_delivery_apply':[Config.ipAdress, Config.deliveryURL],
    'issue_delivery_query':[Config.ipAdress, Config.deliveryURL],
    'issue_delivery_fund_apply':[Config.ipAdress, Config.deliveryURL],
    'issue_enable_delivery_query':[Config.ipAdress, Config.deliveryURL],
    'issue_delivery_revoke':[Config.ipAdress, Config.deliveryURL],
    'issue_delivery_sure':[Config.ipAdress, Config.deliveryURL],
    'issueget_interval_num':[Config.ipAdress, Config.deliveryURL],
    'issueget_labelled':[Config.ipAdress, Config.deliveryURL],
    'issueget_selectnum':[Config.ipAdress, Config.deliveryURL],
    'issue_transfer_apply':[Config.ipAdress, Config.deliveryURL],
    'issue_transfer_query':[Config.ipAdress, Config.deliveryURL],
    'issue_transfer_fund_apply':[Config.ipAdress, Config.deliveryURL],
    'issue_enable_transfer_query':[Config.ipAdress, Config.deliveryURL],
    'issue_transfer_revoke':[Config.ipAdress, Config.deliveryURL],
    'issue_transfer_sure':[Config.ipAdress, Config.deliveryURL],
    'issue_verifycode_apply':[Config.ipAdress, Config.deliveryURL],
    'issue_warehouse_query':[Config.ipAdress, Config.deliveryURL],

    'issue_apply_query':[Config.ipAdress, Config.subscribeURL],
    'issue_commodity_query':[Config.ipAdress, Config.subscribeURL],
    'issue_deletepurchase':[Config.ipAdress, Config.subscribeURL],
    'issue_purchase_maxqty_query':[Config.ipAdress, Config.subscribeURL],
    'issue_ratioassign_query':[Config.ipAdress, Config.subscribeURL],
    'issue_apply':[Config.ipAdress, Config.subscribeURL],
    'issue_trade_query':[Config.ipAdress, Config.subscribeURL],

    'trust_purchase_maxqty_query':[Config.ipAdress, Config.subscribeURL],
    'trust_commodity_query':[Config.ipAdress, Config.subscribeURL],
    'trust_purchase':[Config.ipAdress, Config.subscribeURL],
    'trust_deletepurchase':[Config.ipAdress, Config.subscribeURL],
    'trust_purchaseorder_query':[Config.ipAdress, Config.subscribeURL],
    'trusttrade_query':[Config.ipAdress, Config.subscribeURL],

    'commodity_data_query':[Config.ipAdress, Config.URL],
    'commodity_hisprice_query':[Config.ipAdress, Config.URL],
    'commodity_query':[Config.ipAdress, Config.URL],
    'firm_info':[Config.ipAdress, Config.URL],
    'firm_sum_info':[Config.ipAdress, Config.URL],
    'getnum':[Config.ipAdress, Config.URL],
    'holddetail_query':[Config.ipAdress, Config.URL],
    'hold_query':[Config.ipAdress, Config.URL],
    'my_order_query':[Config.ipAdress, Config.URL],
    'my_pending_order_query':[Config.ipAdress, Config.URL],
    'order':[Config.ipAdress, Config.URL],
    'pendingstyle_query':[Config.ipAdress, Config.URL],
    'price_pending_order_query':[Config.ipAdress, Config.URL],
    'query_buyorsell_quantity':[Config.ipAdress, Config.URL],
    'sysstatus_query':[Config.ipAdress, Config.URL],
    'systime_query':[Config.ipAdress, Config.URL],
    'trade_query':[Config.ipAdress, Config.URL],
    'trade_sum_query':[Config.ipAdress, Config.URL],
    'order_wd':[Config.ipAdress, Config.URL],

    'issue_trust_apply':[Config.ipAdress, Config.subscribeURL],
    'issue_trustapply_query':[Config.ipAdress, Config.subscribeURL],
    'issue_trustapply_revoke':[Config.ipAdress, Config.subscribeURL],
    'issue_trust_bill_query':[Config.ipAdress, Config.subscribeURL],
    'issue_trustplan_query':[Config.ipAdress, Config.subscribeURL],
    'warehouse_query':[Config.ipAdress, Config.subscribeURL],

    'issue_specassign_order_query':[Config.ipAdress, Config.subscribeURL],
    'issue_specassign_trade_query':[Config.ipAdress, Config.subscribeURL],
    'issue_ratioassign_maxqty_query':[Config.ipAdress, Config.subscribeURL],
    'issue_radiotrade_query':[Config.ipAdress, Config.subscribeURL],
    'issue_ratioassign_sure':[Config.ipAdress, Config.subscribeURL],
    'issue_radiotrade_query':[Config.ipAdress, Config.subscribeURL],
    'issue_ratioassign_query':[Config.ipAdress, Config.subscribeURL],

    'commodity_detail_query':[Config.ipAdress, Config.expandURL],
    'cookie_decryptinfo_query':[Config.ipAdress, Config.expandURL],
    'system_commodity_detail_query':[Config.ipAdress, Config.expandURL],

    'broadcast_query':[Config.ipAdress, Config.messageURL],
    'message_query':[Config.ipAdress, Config.messageURL],

    'issueorder_report_query':[Config.ipAdress, Config.reportURL],
    'issuetradedetail_report_query':[Config.ipAdress, Config.reportURL],
    'issuehold_report_query':[Config.ipAdress, Config.reportURL],
    'issueholddetail_report_query':[Config.ipAdress, Config.reportURL],
    'trustpurchase_report_query':[Config.ipAdress, Config.reportURL],
    'trustpurchasetrade_report_query':[Config.ipAdress, Config.reportURL],
    'specassign_report_query':[Config.ipAdress, Config.reportURL],
    'spectrade_report_query':[Config.ipAdress, Config.reportURL],
    'ratioassign_report_query':[Config.ipAdress, Config.reportURL],
    'ratiotrade_report_query':[Config.ipAdress, Config.reportURL],
    'issuetrade_report_query':[Config.ipAdress, Config.reportURL],
    'trusteeship_report_query':[Config.ipAdress, Config.reportURL],
    'commoditydelivery_report_query':[Config.ipAdress, Config.reportURL],
    'commoditytransfer_report_query':[Config.ipAdress, Config.reportURL],
    'issuefundsinfo_report_query':[Config.ipAdress, Config.reportURL],
    'issuegetselectnum_report_query':[Config.ipAdress, Config.reportURL],

    'category_cmdtyinfo_query':[Config.ipAdress, Config.quotationURL],
    'cmdty_quotation_query':[Config.ipAdress, Config.quotationURL],
    'rank_cmdtyinfo_query':[Config.ipAdress, Config.quotationURL],
    'categoryinfo_query':[Config.ipAdress, Config.quotationURL],
    'cmdty_bill_query':[Config.ipAdress, Config.quotationURL],
    'cmdtyinfo_query':[Config.ipAdress, Config.quotationURL]
  }

  /**
   * 配置协议-前置机URL集合(手机端)
   */
  Config.mprotocolMap = {
    'issue':[Config.ipAdress, Config.URL],
    'delivery':[Config.ipAdress, Config.deliveryURL],
    'subscribe':[Config.ipAdress, Config.subscribeURL],
    'report':[Config.ipAdress, Config.reportURL],
    'message':[Config.ipAdress, Config.messageURL],
    'quotation':[Config.ipAdress, Config.quotationURL],

    'logon':[Config.ipAdress, Config.mobileURL],
    'logout':[Config.ipAdress, Config.mobileURL],

    'change_user_password':[Config.ipAdress, Config.mobileURL],
    'check_userinfo':[Config.ipAdress, Config.mobileURL],
    'commodity_data_query':[Config.ipAdress, Config.mobileURL],
    'firm_info':[Config.ipAdress, Config.mobileURL],
    'user_login':[Config.ipAdress, Config.mobileURL],
    'user_logoff':[Config.ipAdress, Config.mobileURL],
    'query_commodity':[Config.ipAdress, Config.mobileURL],
    'sys_time_query':[Config.ipAdress, Config.mobileURL],

    'issue_delivery_apply':[Config.ipAdress, Config.mobileURL],
    'issue_delivery_query':[Config.ipAdress, Config.mobileURL],
    'issue_delivery_fund_apply':[Config.ipAdress, Config.mobileURL],
    'issue_enable_delivery_query':[Config.ipAdress, Config.mobileDeliveryURL],
    'issue_delivery_revoke':[Config.ipAdress, Config.mobileURL],
    'issue_delivery_sure':[Config.ipAdress, Config.mobileURL],
    'issueget_interval_num':[Config.ipAdress, Config.mobileURL],
    'issueget_labelled':[Config.ipAdress, Config.mobileURL],
    'issueget_selectnum':[Config.ipAdress, Config.mobileURL],
    'issue_transfer_apply':[Config.ipAdress, Config.mobileURL],
    'issue_transfer_query':[Config.ipAdress, Config.mobileURL],
    'issue_transfer_fund_apply':[Config.ipAdress, Config.mobileURL],
    'issue_enable_transfer_query':[Config.ipAdress, Config.mobileURL],
    'issue_transfer_revoke':[Config.ipAdress, Config.mobileURL],
    'issue_transfer_sure':[Config.ipAdress, Config.mobileURL],
    'issue_verifycode_apply':[Config.ipAdress, Config.mobileURL],
    'issue_warehouse_query':[Config.ipAdress, Config.mobileURL],

    'issue_apply_query':[Config.ipAdress, Config.mobileURL],
    'issue_commodity_query':[Config.ipAdress, Config.mobileURL],
    'issue_deletepurchase':[Config.ipAdress, Config.mobileURL],
    'issue_purchase_maxqty_query':[Config.ipAdress, Config.mobileURL],
    'issue_apply':[Config.ipAdress, Config.mobileURL],
    'issue_trade_query':[Config.ipAdress, Config.mobileURL],

    'trust_purchase_maxqty_query':[Config.ipAdress, Config.mobileURL],
    'trust_commodity_query':[Config.ipAdress, Config.mobileURL],
    'trust_purchase':[Config.ipAdress, Config.mobileURL],
    'trust_deletepurchase':[Config.ipAdress, Config.mobileURL],
    'trust_purchaseorder_query':[Config.ipAdress, Config.mobileURL],
    'trusttrade_query':[Config.ipAdress, Config.mobileURL],

    'commodity_data_query':[Config.ipAdress, Config.mobileURL],
    'commodity_hisprice_query':[Config.ipAdress, Config.mobileURL],
    'commodity_query':[Config.ipAdress, Config.mobileURL],
    'firm_info':[Config.ipAdress, Config.mobileURL],
    'firm_sum_info':[Config.ipAdress, Config.mobileURL],
    'getnum':[Config.ipAdress, Config.mobileURL],
    'holddetail_query':[Config.ipAdress, Config.mobileURL],
    'hold_query':[Config.ipAdress, Config.mobileURL],
    'my_order_query':[Config.ipAdress, Config.mobileURL],
    'my_pending_order_query':[Config.ipAdress, Config.mobileURL],
    'order':[Config.ipAdress, Config.mobileURL],
    'pendingstyle_query':[Config.ipAdress, Config.mobileURL],
    'price_pending_order_query':[Config.ipAdress, Config.mobileURL],
    'query_buyorsell_quantity':[Config.ipAdress, Config.mobileURL],
    'sysstatus_query':[Config.ipAdress, Config.mobileURL],
    'systime_query':[Config.ipAdress, Config.mobileURL],
    'trade_query':[Config.ipAdress, Config.mobileURL],
    'trade_sum_query':[Config.ipAdress, Config.mobileURL],
    'order_wd':[Config.ipAdress, Config.mobileURL],

    'issue_trust_apply':[Config.ipAdress, Config.mobileURL],
    'issue_trustapply_query':[Config.ipAdress, Config.mobileURL],
    'issue_trustapply_revoke':[Config.ipAdress, Config.mobileURL],
    'issue_trust_bill_query':[Config.ipAdress, Config.mobileURL],
    'issue_trustplan_query':[Config.ipAdress, Config.mobileURL],
    'warehouse_query':[Config.ipAdress, Config.mobileURL],

    'commodity_detail_query':[Config.ipAdress, Config.expandURL],
    'cookie_decryptinfo_query':[Config.ipAdress, Config.expandURL],
    'system_commodity_detail_query':[Config.ipAdress, Config.expandURL],

    'issueorder_report_query':[Config.ipAdress, Config.reportURL],
    'issuetradedetail_report_query':[Config.ipAdress, Config.reportURL],
    'issuehold_report_query':[Config.ipAdress, Config.reportURL],
    'issueholddetail_report_query':[Config.ipAdress, Config.reportURL],
    'trustpurchase_report_query':[Config.ipAdress, Config.reportURL],
    'trustpurchasetrade_report_query':[Config.ipAdress, Config.reportURL],
    'specassign_report_query':[Config.ipAdress, Config.reportURL],
    'spectrade_report_query':[Config.ipAdress, Config.reportURL],
    'ratioassign_report_query':[Config.ipAdress, Config.reportURL],
    'ratiotrade_report_query':[Config.ipAdress, Config.reportURL],
    'issuetrade_report_query':[Config.ipAdress, Config.reportURL],
    'trusteeship_report_query':[Config.ipAdress, Config.reportURL],
    'commoditydelivery_report_query':[Config.ipAdress, Config.reportURL],
    'commoditytransfer_report_query':[Config.ipAdress, Config.reportURL],
    'issuefundsinfo_report_query':[Config.ipAdress, Config.reportURL],
    'issuegetselectnum_report_query':[Config.ipAdress, Config.reportURL],

    'category_cmdtyinfo_query':[Config.ipAdress, Config.quotationURL],
    'cmdty_quotation_query':[Config.ipAdress, Config.quotationURL],
    'categoryinfo_query':[Config.ipAdress, Config.quotationURL],
    'rank_cmdtyinfo_query':[Config.ipAdress, Config.quotationURL],
    'cmdty_bill_query':[Config.ipAdress, Config.quotationURL],
    'cmdtyinfo_query':[Config.ipAdress, Config.quotationURL],
    'user_collect_commodity':[Config.ipAdress, Config.expandURL],
    'user_collect_commodity_query':[Config.ipAdress, Config.expandURL]
  }


  /**
   * 系统状态对象
   */
  Config.sysstatusMap = {
    '0':'初始化完成',
    '1':'闭市状态',
    '2':'结算处理',
    '3':'对账完成',
    '4':'暂停交易',
    '5':'交易中',
    '6':'节间休息',
    '7':'交易结束',
    '8':'集合竞价交易中',
    '9':'集合竞价交易结束',
    '10':'交易结算完成'
  }

  //store.set('config',Config);

  //return Config;


export default Config;
