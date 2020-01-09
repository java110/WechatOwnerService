// pages/payParkingFee/payParkingFee.js
const context = require('../../context/Java110Context.js');

const constant = context.constant;

const util = context.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFeeMonth:false,
    feeMonthList:['一个月','半年','一年','两年'],
    feeMonthName:'一个月',
    feeMonth:1,
    endTime:'',
    amount:0,
    receivableAmount:0.00,
    additionalAmount:0,

    communityId:'',
    communityName:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _fee = JSON.parse(options.fee);
    console.log('_fee',_fee);
    let _receivableAmount = this.data.feeMonth * _fee.additionalAmount * 100;
    let _communityInfo = context.getCurrentCommunity();
    this.setData({
      receivableAmount: _receivableAmount,
      communityId: _communityInfo.communityId,
      communityName:_communityInfo.communityName,
      num:_fee.num,
      typeCdName:_fee.typeCdName,
      carNum: _fee.carNum,
      feeId:_fee.feeId,
      additionalAmount: _fee.additionalAmount,
      endTime: _fee.endTime
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
    let _feeMonth = 1;
    if (_feeMonthName == '一个月'){
      _feeMonth = 1;
    } else if (_feeMonthName == '半年'){
      _feeMonth = 6;
    } else if (_feeMonthName == '一年') {
      _feeMonth = 12;
    } else if (_feeMonthName == '两年') {
      _feeMonth = 24;
    }else{
      return ;
    }

    let _receivableAmount = _feeMonth * this.data.additionalAmount * 100;

    let _lastDate = new Date(this.data.endTime);
    let _newDate = util.date.addMonth(_lastDate, _feeMonth);

    this.setData({
      showFeeMonth: false,
      feeMonthName: _feeMonthName,
      receivableAmount: _receivableAmount,
      feeMonth: _feeMonth,
      endTime: util.date.formatDate(_newDate)
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
  onPayFee:function(){
    wx.showToast({
      title: '缴费成功',
    });
    wx.navigateBack({
      
    });
  }
})