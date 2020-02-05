// pages/payFeeDetail/payFeeDetail.js
const context = require('../../context/Java110Context.js');

const constant = context.constant;

const util = context.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feeDetails:[],
    feeId:'',
    communityId:'',
    feeName:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _fee = JSON.parse(options.fee);
    this.setData({
      feeId: _fee.feeId,
      feeName:_fee.feeName,
      communityId: _fee.communityId,
    });
    this._loadFeeDetail();
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
  _loadFeeDetail:function(){
    let _that = this;
    let _objData = {
      page: 1,
      row: 30,
      feeId: this.data.feeId,
      communityId: this.data.communityId
    }
    context.request({
      url: constant.url.queryFeeDetail,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          //成功情况下跳转
          let _feeDetails = res.data.feeDetails;
          _feeDetails.forEach(function (_feeDetail) {
            let _tmpCreateTime = _feeDetail.createTime.replace(/\-/g, "/")
            let _createTime = new Date(_tmpCreateTime);
            _feeDetail.createTime = util.date.formatDate(_createTime);
          });
          _that.setData({
            feeDetails: _feeDetails
          });
        }
      },
      fail: function (e) {
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    });
  }
})