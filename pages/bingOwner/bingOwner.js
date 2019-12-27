// pages/enterCommunity/enterCommunity.js
const { appInfo, urlInfo } = require("../../config/config.js");
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaCode:'',
    communityName:'',
    appUserName:'',
    idCard:'',
    link:'',
    msgCode:'' 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      city: curLocation.city   
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

  bindInput:function(e){
    console.log('数据监听',e);
     let _that = this;
     let dataset = e.currentTarget.dataset;
     let value = e.detail;
     let name = dataset.name;
     _that.data[name] = value;
    //  _that.setData({
    //    name: value
    //  });
     console.log(this.data);
  },
  sendMsgCode:function(){

  },
  bindOwner:function(){
      console.log(this.data);
  }

})