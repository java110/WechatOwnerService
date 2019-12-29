// pages/viewBindOwner/viewBindOwner.js
const context = require("../../context/Java110Context.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '申请',
        desc: ''
      },
      {
        text: '审核中',
        desc: ''
      },
      {
        text: '完成',
        desc: ''
      }
    ],
    active:0,
    areaName: '',
    communityId:'',
    communityName: '',
    appUserName: '',
    appUserId:'',
    idCard: '',
    link: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.loadOwnerInfo();
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

/**
 * 加载业主信息
 */
  loadOwnerInfo:function(){
    let _that = this;
    context.getOwner(function(_ownerInfo){
      if(_ownerInfo){
        let _active = _ownerInfo.state == '10000'?1:2
        _that.setData({
          areaName: '西宁市城东区',
          communityId: _ownerInfo.communityId,
          communityName: _ownerInfo.communityName,
          appUserName: _ownerInfo.appUserName,
          appUserId: _ownerInfo.appUserId,
          idCard: _ownerInfo.idCard,
          link: _ownerInfo.link,
          active: _active
        });
      }
    });
  }
})