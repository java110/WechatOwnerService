// pages/enterCommunity/enterCommunity.js
const { appInfo, urlInfo } = require("../../config/config.js");
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      province:'',
      city:'',
      provinces:[],
      citys:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查询省级地区
    let pros = this._loadArea('101','0');
    this.setData({
      provinces: pros.areas,
    })
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
    let curLocation = wx.getStorageSync("currentLocation");
    this.setData({
      province: curLocation.province,
      city: curLocation.city,
      communityName:'',
      idCard:'',
      tel:'',
      validateCode:'',
    })
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
  _loadArea:function(_level,_parentAreaCode){
      wx.request({
        url: urlInfo.areaUrl,
        header: util.getHeaders(),
        data: {
          areaLevel: _level,                    // 临时登录凭证
          parentAreaCode: _parentAreaCode
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
      })
  }
})