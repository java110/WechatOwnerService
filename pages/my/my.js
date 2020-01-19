/** index.js **/
const context = require('../../context/Java110Context.js');
const factory = context.factory;
//获取app实例
const app = getApp();

Page({
  data: {
    userInfo: {}, // 用户信息
    ownerFlag: false // 是否有业主信息 标记 如果有为 true  没有为false
  },
  onLoad: function() {
    let _that = this;
    factory.login.checkLoginStatus(function() {
      _that.setData({
        userInfo: context.getUserInfo()
      });
      //查询用户信息
      _that.loadOwenrInfo();
    });
  },

  onShow: function() {
    console.log('show 方法被调用');
    let _that = this;
    //查询用户信息
    _that.loadOwenrInfo();
    _that.setData({
      userInfo: context.getUserInfo()
    });

  },
  bindingOwner: function() {
    wx.navigateTo({
      url: '../bindOwner/bindOwner',
    })
  },
  viewOwner: function() {
    wx.navigateTo({
      url: '../viewBindOwner/viewBindOwner',
    })
  },
  loadOwenrInfo: function() {
    let _that = this;
    context.getOwner(function(_ownerInfo) {
      console.log(_ownerInfo);
      if (_ownerInfo) {
        _that.setData({
          ownerFlag: true
        })
      } else {
        _that.setData({
          ownerFlag: false
        })
      }
    });
  },
  myComplaint() {
    wx.navigateTo({
      url: '../complaintList/complaintList',
    })
  },
  onGotUserInfo: function (e) {
    console.log("nickname=" + JSON.stringify(e.detail.userInfo));
  },
  myHouse:function() {
    wx.navigateTo({
      url: '../my/myHouse',
    })
  },
  myRepair:function(){
    wx.navigateTo({
      url: '/pages/myRepair/myRepair',
    });
  }
})