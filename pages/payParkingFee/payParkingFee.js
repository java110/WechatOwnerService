// pages/payParkingFee/payParkingFee.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFeeMonth:false,
    feeMonthList:['一个月','半年','一年','两年'],
    feeMonthName:'一个月',
    feeMonth:1,
    endTime:'2020-01-07'

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
  chooseMonth:function(){
    this.setData({
      showFeeMonth:true
    })
  },
  onFeeMonthConfirm: function (e) {
    console.log("onConfirm", e);
    let _feeMonthName = null;
    _feeMonthName = e.detail.value;

    this.setData({
      showFeeMonth: false,
      feeMonthName: _feeMonthName
    });
  },
  onFeeMonthChange: function (e) {
    console.log(e);
  },
  onFeeMonthCancel: function (e) {
    this.setData({
      showFeeMonth: false
    });
  },
})