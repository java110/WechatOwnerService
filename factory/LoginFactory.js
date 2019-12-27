/**
 * 登录相关 代码封装
 * 
 * add by wuxw 2019-12-28
 * 
 */
/**
 * 登录工厂类
 */

const util = require("../utils/index.js");
const constant = require("../constant/index.js")

class LoginFactory {

  constructor() {

  }

  // 检查本地 storage 中是否有登录态标识
  checkLoginStatus() {
    let coreUtil = util.core;
    let loginFlag = wx.getStorageSync(constant.mapping.LOGIN_FLAG);
    if (loginFlag) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效(为过期)
        success: function () {
          // 直接从Storage中获取用户信息
          let userStorageInfo = wx.getStorageSync('userInfo');
          console.log('用户信息', userStorageInfo);
          if (userStorageInfo) {
            //that.globalData.userInfo = JSON.parse(userStorageInfo);
          } else {
            coreUtil.showInfo('缓存信息缺失');
            console.error('登录成功后将用户信息存在Storage的userStorageInfo字段中，该字段丢失');
          }

        },
        // session_key 过期
        fail: function () {
          // session_key过期
          doLogin();
        }
      });
    } else {
      // 无登录态
      doLogin();
    }
  }

  // 登录动作
  doLogin(callback = () => { }) {
    let that = this;
    wx.login({
      success: function (loginRes) {
        if (loginRes.code) {
          // TODO
          let defaultRawData = '{"nickName":"","gender":1,"language":"","city":"","province":"","country":"","avatarUrl":""}';
          // 请求服务端的登录接口
          wx.request({
            url: api.loginUrl,
            method: 'post',
            header: {
              APP_ID: api.appInfo.appId
            },
            data: {
              code: loginRes.code, // 临时登录凭证
              userInfo: JSON.parse(defaultRawData), // 用户非敏感信息
              signature: '', // 签名
              encryptedData: '', // 用户敏感信息
              iv: '' // 解密算法的向量
            },
            success: function (res) {
              console.log('login success...:');
              res = res.data;

              if (res.result == 0) {
                that.globalData.userInfo = res.userInfo;
                console.log(res.userInfo);
                wx.setStorageSync('userInfo', JSON.stringify(res.userInfo));
                wx.setStorageSync('loginFlag', res.sessionKey);
                wx.setStorageSync('token', res.token);
                callback();
              } else {
                that.showInfo(res.errmsg);
              }
            },

            fail: function (error) {
              // 调用服务端登录接口失败
              that.showInfo('调用接口失败');
              console.log(error);
            }
          });
          return;
          /* 
           * @desc: 获取用户信息 期望数据如下 
           *
           * @param: userInfo       [Object]
           * @param: rawData        [String]
           * @param: signature      [String]
           * @param: encryptedData  [String]
           * @param: iv             [String]
           **/
          wx.getUserInfo({

            withCredentials: true, // 非必填, 默认为true

            success: function (infoRes) {
              console.log(infoRes, '>>>')

              // 请求服务端的登录接口
              wx.request({
                url: api.loginUrl,
                method: 'post',
                header: {
                  APP_ID: api.appInfo.appId
                },
                data: {
                  code: loginRes.code, // 临时登录凭证
                  userInfo: JSON.parse(infoRes.rawData), // 用户非敏感信息
                  signature: infoRes.signature, // 签名
                  encryptedData: infoRes.encryptedData, // 用户敏感信息
                  iv: infoRes.iv // 解密算法的向量
                },

                success: function (res) {
                  console.log('login success');
                  res = res.data;

                  if (res.result == 0) {
                    that.globalData.userInfo = res.userInfo;
                    wx.setStorageSync('userInfo', JSON.stringify(res.userInfo));
                    wx.setStorageSync('loginFlag', res.sessionKey);
                    callback();
                  } else {
                    that.showInfo(res.errmsg);
                  }
                },

                fail: function (error) {
                  // 调用服务端登录接口失败
                  that.showInfo('调用接口失败');
                  console.log(error);
                }
              });
            },

            fail: function (error) {
              // 获取 userInfo 失败，去检查是否未开启权限
              wx.hideLoading();
              that.checkUserInfoPermission();
            }
          });

        } else {
          // 获取 code 失败
          that.showInfo('登录失败');
          console.log('调用wx.login获取code失败');
        }
      },

      fail: function (error) {
        // 调用 wx.login 接口失败
        that.showInfo('接口调用失败');
        console.log(error);
      }
    });
  }
};