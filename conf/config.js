/**
 * HC智慧家园配置文件
 * 
 * 本项目只有这里修改相应配置信息，如果不是二次开发 请不要修改其他文件内容
 * 
 * @website http://www.homecommunity.cn/
 * @author 吴学文
 * @QQ 928255095
 */

// #ifdef H5
// 服务器域名 公众号时，配置为 / 就可以
const baseUrl = '/';
// #endif
const commonBaseUrl = 'http://demo.homecommunity.cn/';

//商城的url
const mallUrl = 'http://mallapp.homecommunity.cn/';

const mallUrlIndexPage = mallUrl + '#/pages/index/index?mallFrom=HC';

//商城token 刷新页面
const mallUrlRefresh = mallUrl + "#/pages/mallTokenRefresh/mallTokenRefresh?mallFrom=HC"

// #ifndef H5
//服务器域名 小程序 或者 app 时 后端地址
const baseUrl = 'http://demo.homecommunity.cn/';
// #endif

//默认的小区ID和名称，用户还没有登录时显示的小区信息

const DEFAULT_COMMUNITY_ID = "2021080494780158"; //HC测试小区id  用于没有登录时展示相关信息
const DEFAULT_COMMUNITY_NAME = "HC演示小区";


// APP 或者 公众号  appId
const wAppId = ""; //微信AppId

//app支付时这里需要填写支付秘钥
const appPayKey = "";

const logLevel = "DEBUG"; // 日志级别

export default {
	baseUrl: baseUrl,
	mallUrl: mallUrl,
	mallUrlIndexPage: mallUrlIndexPage,
	mallUrlRefresh: mallUrlRefresh,
	commonBaseUrl: commonBaseUrl,
	DEFAULT_COMMUNITY_ID: DEFAULT_COMMUNITY_ID,
	DEFAULT_COMMUNITY_NAME: DEFAULT_COMMUNITY_NAME,
	wAppId: wAppId,
	logLevel: logLevel,
	appPayKey: appPayKey
}
