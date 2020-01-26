// pages/tempParkingFeePay/tempParkingFeePay.js
const context = require("../../context/Java110Context.js");
const constant = context.constant;
const util = context.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityId:'',
    communityName:'',
    inTime:'',
    nowTime:'',
    carNum:'',
    additionalAmount:'',
    squarePrice:'',
    money:0.00,
    ingTime:'',
    inoutId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let carInfo = JSON.parse(options.carInfo);
    let _ingTime = carInfo.inHours + ":" + carInfo.inMin;
    let _money = carInfo.money * 100;
    this.setData({
      communityId: carInfo.communityId,
      communityName: carInfo.communityName,
      carNum: carInfo.carNum,
      inTime:carInfo.inTime,
      inoutId:carInfo.inoutId,
      money: _money,
      ingTime: _ingTime
    });

    this._loadTempParkingFeeConfig();
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
  onPayFee:function(){

  },
  _loadTempParkingFeeConfig:function(){
    let _that = this;
    let _objData = {
      communityId: this.data.communityId,
      feeTypeCd: '888800010007'
    }

    context.request({
      url: constant.url.queryConfigFee,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function (res) {
        console.log("请求返回信息：", res);
        if (res.statusCode == 200) {
          //let _carInouts = res.data.carInouts;
          let tempParkingSpaceFeeConfig = res.data[0];
         
          _that.setData({
            additionalAmount: tempParkingSpaceFeeConfig.additionalAmount,
            squarePrice: tempParkingSpaceFeeConfig.squarePrice
          
          });
          
          return ;
        }
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        });
      },
      fail: function (e) {
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    })
  
  }
})