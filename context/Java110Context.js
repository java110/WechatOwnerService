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

const getCurrentLocation = function(){
  return wx.getStorageSync('currentLocation');
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

const _loadArea = function (_level, _parentAreaCode, callBack = (_areaList)=>{}) {
  let areaList = wx.getStorageSync(constant.mapping.AREA_INFO);
  if (areaList){
    callBack(areaList);
    return ;
  }
  wx.request({
    url: constant.url.areaUrl,
    header: getHeaders(),
    data: {
      areaLevel: _level,                    // 临时登录凭证
      parentAreaCode: _parentAreaCode
    },
    success: function (res) {
      console.log('login success');
      res = res.data;
      var province = [], city = [], area = [];
      var _currentArea = [];
      province = res.areas.filter(item => {
        return item.areaLevel == '101';
      })
      city = res.areas.filter(item => {
        return item.areaLevel == '202';
      })
      area = res.areas.filter(item => {
        return item.areaLevel == '303';
      });
      var provinceList = {};
      province.forEach(function(item){
        provinceList[item.areaCode] = item.areaName;
      });

      var cityList = {};
      city.forEach(function (item) {
        cityList[item.areaCode] = item.areaName;
      });
      var quyuList  = {};
      area.forEach(function (item) {
        quyuList[item.areaCode] = item.areaName;
      });
      let areaList = {
        province_list: provinceList,
        city_list: cityList,
        county_list: quyuList
      };
      callBack(areaList);
      //将 地区信息存储起来
      wx.setStorageSync(constant.mapping.AREA_INFO, areaList);
    },

    fail: function (error) {
      // 调用服务端登录接口失败
      wx.showToast({
        title: '调用接口失败',
      });
      console.log(error);
    }
  })
}

module.exports = {
  constant: constant,
  util: util,
  factory:factory,
  getHeaders: getHeaders,
  getLocation: getLocation,
  getUserInfo: getUserInfo,
  getLoginFlag: getLoginFlag,
  _loadArea: _loadArea,
  getCurrentLocation: getCurrentLocation
};