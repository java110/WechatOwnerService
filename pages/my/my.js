/** index.js **/
const context = require('../../context/Java110Context.js');
const factory = context.factory;
//获取app实例
const app = getApp();

Page({
    data: {
        userInfo: {},   // 用户信息
      hasLogin: context.getLoginFlag()
            ? true 
            : false     // 是否登录，根据后台返回的skey判断
    },
    onLoad: function() {
      let _that = this;
      factory.login.checkLoginStatus(function(){
        _that.setData({
          userInfo: context.getUserInfo()
        }); 
      });
    },

    onShow: function() {
        let that = this;
        that.setData({
            userInfo: context.getUserInfo()
        });
    },
    bindingOwner:function(){
      wx.navigateTo({
        url: '../bindOwner/bindOwner',
      })
    }
})