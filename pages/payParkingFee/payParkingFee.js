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
    feeMonthList:[],
    feeMonthName:'',
    feeMonth:0,
    endTime:'',
    ordEndTime:'',
    amount:0,
    receivableAmount:0.00,
    additionalAmount:0,

    communityId:'',
    communityName:'',
    feeId:'',
    paymentCycles: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _fee = JSON.parse(options.fee);
    console.log('_fee',_fee);
    
    let _communityInfo = context.getCurrentCommunity();
    let _lastDate = new Date(_fee.endTime);
    let _paymentCycle = _fee.paymentCycle;
    let _paymentCycles = [];
    let _feeMonthList = [];
    let _receivableAmount = _paymentCycle * _fee.feePrice * 100;
    let _endTime = util.date.addMonth(_lastDate, _paymentCycle);

    for (let _index = 1; _index < 6; _index++) {
      _paymentCycles.push(_index * parseInt(_paymentCycle));
      _feeMonthList.push((_index * parseInt(_paymentCycle)) + "个月");
    }
    this.setData({
      receivableAmount: _receivableAmount,
      communityId: _communityInfo.communityId,
      communityName:_communityInfo.communityName,
      num:_fee.num,
      feeTypeCdName: _fee.feeTypeCdName,
      carNum: _fee.carNum,
      feeId:_fee.feeId,
      feePrice: _fee.feePrice,
      endTime: util.date.formatDate(_endTime),
      ordEndTime: _fee.endTime,
      feeMonth: _paymentCycle,
      feeMonthName: _paymentCycle + '个月',
      paymentCycles: _paymentCycles,
      feeMonthList: _feeMonthList,
    });

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      needFefresh: false
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
    let _feeMonth = this.data.paymentCycles[e.detail.index];
    // if (_feeMonthName == '一个月'){
    //   _feeMonth = 1;
    // } else if (_feeMonthName == '半年'){
    //   _feeMonth = 6;
    // } else if (_feeMonthName == '一年') {
    //   _feeMonth = 12;
    // } else if (_feeMonthName == '两年') {
    //   _feeMonth = 24;
    // }else{
    //   return ;
    // }

    let _receivableAmount = _feeMonth * this.data.feePrice * 100;

    let _lastDate = new Date(this.data.ordEndTime);
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
    let _receivedAmount = this.data.receivableAmount/100;
    wx.showLoading({
      title: '支付中',
    });
    let _objData = {
      cycles: this.data.feeMonth,
      communityId: this.data.communityId,
      feeId: this.data.feeId,
      feeName: '停车费',
      receivedAmount: _receivedAmount, 
      tradeType: 'JSAPI'
    }
    
    context.request({
      url: constant.url.preOrder,
      header: context.getHeaders(),
      method: "POST",
      data: _objData, //动态数据
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && res.data.code == '0') {
          let data = res.data;
          //成功情况下跳转
          wx.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.sign,
            'success': function (res) { 
              wx.showToast({
                title: "支付成功",
                duration: 2000
              });
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2]; //上一个页面
              //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
              prevPage.setData({
                needFefresh: true
              });
              wx.navigateBack({ });
            },
            'fail': function (res) {
              console.log('fail:' + JSON.stringify(res));
            }
          });
          wx.hideLoading();
          return;
        }
        wx.hideLoading();
        wx.showToast({
          title: "缴费失败",
          icon: 'none',
          duration: 2000
        })
      },
      fail: function (e) {
        wx.hideLoading();
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    });
  }
})