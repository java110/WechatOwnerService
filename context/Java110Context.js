/**
 * 上下文对象,再其他文件调用常量 方法 时间工具类时 只引入上下文文件
 * 
 * add by wuxw 2019-12-27
 * 
 * the source opened https://gitee.com/java110/WechatOwnerService
 */

const constant = require('../constant/index.js');
const util = require('../utils/index.js');
const factory = require('../factory/index.js');

/**
 * 获取请后台服务时的头信息
 */
const getHeaders = function () {
  return {
    app_id: constant.app.appId,
    transaction_id: util.core.wxuuid(),
    req_time: util.date.getDateYYYYMMDDHHMISS(),
    sign: '1234567',
    user_id: '-1',
    cookie: '_java110_token_=' + wx.getStorageSync('token')
  }
}

/**
 * 获取位置
 * add by wuxw 2019-12-28
 */
const getLocation = function(){
  return wx.getStorageSync('location');
}

/**
 * 获取用户信息
 * 
 * add by wuxw 2019-12-28
 */
const getUserInfo = function(){
  let _userInfo = wx.getStorageSync(constant.mapping.USER_INFO);
  return JSON.parse(_userInfo);
}

/**
 * 登录标记
 * add  by wuxw 2019-12-28
 */
const getLoginFlag = function(){
  let _loginFlag = wx.getStorageSync(constant.mapping.LOGIN_FLAG)
  return _loginFlag;
}

module.exports = {
  constant: constant,
  util: util,
  factory:factory,
  getHeaders: getHeaders,
  getLocation: getLocation,
  getUserInfo: getUserInfo,
  getLoginFlag: getLoginFlag
};