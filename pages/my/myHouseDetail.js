// pages/my/myHouseDetail.js
const context = require('../../context/Java110Context.js');
const factory = context.factory;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ownerInfo: {}, // 用户信息
    userInfo: {}, // 用户信息
    ownerFlag: false, // 是否有业主信息 标记 如果有为 true  没有为false
    roomDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;
      factory.login.checkLoginStatus(function() {
      _that.setData({
        userInfo: context.getUserInfo(),
        roomDetail:wx.getStorageSync('roomDetail')
      });
    });
     //查询用户信息
     _that.loadOwenrInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, 
  loadOwenrInfo: function() {
    let _that = this;
    context.getOwner(function(_ownerInfo) {
      console.log(_ownerInfo);
      if (_ownerInfo) {
        _that.setData({
          ownerFlag: true,
          ownerInfo: _ownerInfo
        })
      } else {
        _that.setData({
          ownerFlag: false
        })
      }
    });
  }
})