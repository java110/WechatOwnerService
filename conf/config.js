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

// #ifndef H5
//服务器域名 小程序 或者 app 时 后端地址
const baseUrl = 'https://app.demo.winqi.cn/'; 
// #endif

//默认的小区ID和名称，用户还没有登录时显示的小区信息
const DEFAULT_COMMUNITY_ID = "7020181217000001";//HC测试小区id  用于没有登录时展示相关信息
const DEFAULT_COMMUNITY_NAME = "丰仪家园";

// 微信公众号 appId，小程序和app 可以不用修改
const wAppId="wx43458162e3c31d92"; //微信AppId

const logLevel="DEBUG"; // 日志级别

export default{
	baseUrl:baseUrl,
	DEFAULT_COMMUNITY_ID:DEFAULT_COMMUNITY_ID,
	DEFAULT_COMMUNITY_NAME:DEFAULT_COMMUNITY_NAME,
	wAppId:wAppId,
	logLevel:logLevel
}