/**
 *<p>
 *<li>
 *
 *					----administrator 2016-10-06
 *</li>
 *</p>
 *
 *<b>类说明： JS 常量类  </b>
 *<p>
 *
 *</p>
 */

	var Constant = {};

	/** 市场代码 **/
	Constant.MARKET_ID = '10012';

	/** 项目名称 **/
	Constant.WEB_PRO_NAME = 'issue-front';

	/** 系统模式ID **/
	Constant.SYSTEM_ID = '302';

	/** 登陆系统模式ID */
	Constant.LOGON_SYSTEM_ID = '405';

	/** 系统模式 **/
	Constant.SYSTEM_MODE = 'ISSUE';

	/** 通过CheckUser方式切换 **/
	Constant.TRANSFER_TYPE = 'Y';

	/** 系统状态 **/
	Constant.SYSTEM_STATUS = 'system_status';

	/** 系统时间 **/
	Constant.SYSTEM_TIME = 'system_time';

	/** 交易商信息 **/
	Constant.FIRM_INFO = 'firm_info';

	/** 用户信息 **/
	Constant.USER_SESSION = 'user-session';

	/** 登陆类型 */
	Constant.LOGON_TYPE = "web";

	/** 原登陆类型 */
	Constant.FROM_LOGON_TYPE = 'web';

	/** ECHAR CODE */
	Constant.ECHAR_CODE = 'echar_code';

	/** LOGON_ERROR_CODE */
	Constant.LOGON_ERROR_CODE = 'logon_error_code';

	/** LOGON_REQ */
	Constant.LOGON_REQ = "logon_req";

	/** FIRM_SUM_INFO */
	Constant.FIRM_SUM_INFO = 'firm_sum_info';

	/** 最近查询委托记录时间常量 */
	Constant.ORDER_LASTTIME = 'order_lasttime';

	/** 成交明细记录常量 */
	Constant.TRADE_INFO = 'trade_info';

	/** 最大成交单号常量 */
	Constant.TRADE_MAX_NO = 'trade_max_no';

	/** 持仓明细记录常量 */
	Constant.HOLD_INFO = 'hold_info';

	/** 持仓明细最近查询时间常量 */
	Constant.HOLD_LASTTIME = 'hold_lasttime';

	/** page size 页面大小 */
	Constant.PAGE_SIZE = 100000;

	/** 最大查询月份 */
	Constant.MAX_QUERY_MONTH = 3;

	/** 系统时间定时查询价格 */
	Constant.TIMING = 30000;

	/** 商品信息 */
	Constant.COMMODITY_INFO = 'commodity_info';

	/** 商品图片信息 */
	Constant.COMMODITY_IMAGE_INFO = 'commodity_image_info';

	/** 手机商品图片信息 */
	Constant.COMMODITY_MB_IMAGE_INFO = 'commodity_mb_image_info';

	/** 商品行情信息 */
	Constant.QUOTATION_INFO = 'quotation_info';

	/** 成交量信息 */
	Constant.TRADE_QTY = 'trade_qty';

	/** 成交额信息 */
	Constant.TRADE_FUNDS = 'trade_funds';

	/** 是否启用时间检测 */
	Constant.TIME_CHECK = true;

	/** 请求时间Map关键字 */
	Constant.REQ_TIME_MAP = "req_time_map";

	/** 市场名称 */
	Constant.MARKET_NAME = '发售系统';

	/** 公司名称 */
	Constant.COMPANY_NAME = '金网';

	/** 客户电话 */
	Constant.SERVICE_PHONE = '028-6868-8888';

	/** 持仓汇总最新查询时间戳 */
	Constant.HOLD_SUM_LASTTIME = 'hold_sum_lasttime';

	/** 可交收商品关键字 */
	Constant.DELIVERY_COMMODITY = 'delivery_commodity';

	/** 可划转商品关键字 */
	Constant.TRANSFER_ENABLE_COMMODITY  = 'transfer_enable_commodity';

	/** 搜索商品信息关键字 */
	Constant.SEARCH_COMMODITY = 'category_cmd_info_by_categoryid:';

	/** 密码正则 */
	Constant.PWD_REGEX =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

	export default Constant
