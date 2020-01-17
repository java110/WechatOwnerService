// pages/payParkingFee/payParkingFee.js
const context = require('../../context/Java110Context.js');

const constant = context.constant;

const util = context.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFeeMonth: false,
    feeMonthList: ['一个月', '半年', '一年', '两年'],
    feeMonthName: '一个月',
    feeMonth: 1,
    endTime: '',
    ordEndTime: '',
    amount: 0,
    receivableAmount: 0.00,
    communityId: '',
    communityName: '',
    feeId: '',
    floorNum: '',
    unitNum: '',
    roomNum: '',
    layer: '',
    builtUpArea: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _fee = JSON.parse(options.fee);
    console.log('_fee', _fee);
    let _amount = (_fee.builtUpArea * _fee.squarePrice) + parseFloat(_fee.additionalAmount);
    let _receivableAmount = _amount* 100;
    let _communityInfo = context.getCurrentCommunity();
    let _lastDate = new Date(_fee.endTime);
    let _endTime = util.date.addMonth(_lastDate, this.data.feeMonth);

    this.setData({
      receivableAmount: _receivableAmount,
      communityId: _communityInfo.communityId,
      communityName: _communityInfo.communityName,
      floorNum: _fee.floorNum,
      unitNum: _fee.unitNum,
      roomNum: _fee.roomNum,
      layer:_fee.layer,
      builtUpArea: _fee.builtUpArea,
      feeId: _fee.feeId,
      amount: _amount,
      additionalAmount: _fee.additionalAmount,
      endTime: util.date.formatDate(_endTime),
      ordEndTime: _fee.endTime
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
  chooseMonth: function () {
    this.setData({
      showFeeMonth: true
    })
  },
  onFeeMonthConfirm: function (e) {
    console.log("onConfirm", e);
    let _feeMonthName = null;
    _feeMonthName = e.detail.value;
    let _feeMonth = 1;
    if (_feeMonthName == '一个月') {
      _feeMonth = 1;
    } else if (_feeMonthName == '半年') {
      _feeMonth = 6;
    } else if (_feeMonthName == '一年') {
      _feeMonth = 12;
    } else if (_feeMonthName == '两年') {
      _feeMonth = 24;
    } else {
      return;
    }

    let _receivableAmount = _feeMonth * this.data.additionalAmount * 100;

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
  onPayFee: function () {
    let _receivedAmount = this.data.receivableAmount / 100;
    wx.showLoading({
      title: '支付中',
    });
    let _objData = {
      cycles: this.data.feeMonth,
      communityId: this.data.communityId,
      feeId: this.data.feeId,
      receivedAmount: _receivedAmount
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
              wx.navigateBack({});
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