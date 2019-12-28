// pages/viewBindOwner/viewBindOwner.js
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
    this.setData({
      areaName: '西宁市城东区',
      communityId:'7020181217000001',
      communityName: '格兰小镇',
      appUserName: '吴学文',
      appUserId: '772019092507000013',
      idCard: '632126199109162011',
      link: '17797173942',
      active: 1
    });

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

  }
})