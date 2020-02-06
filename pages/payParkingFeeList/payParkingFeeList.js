// pages/payParkingFeeList/payParkingFeeList.js
const context = require('../../context/Java110Context.js');

const constant = context.constant;

const util = context.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkingSpaces: [],
    moreParkingSpaces: [],
    needFefresh: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let _that = this;
    if (!this.data.needFefresh) {
      this.setData({
        needFefresh: true,
      });
      return;
    }
    context.getOwner(function(_owner) {
      _that._loadParkingSpace(_owner);
    });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  payFee: function(e) {
    let _item = e.target.dataset.item;
    wx.navigateTo({
      url: '/pages/payParkingFee/payParkingFee?fee=' + JSON.stringify(_item),
    })
  },
  _loadParkingSpace: function(_owner) {
    let _that = this;
    _that.setData({
      moreParkingSpaces: []
    });
    let _objData = {
      page: 1,
      row: 10,
      ownerId: _owner.memberId,
      communityId: _owner.communityId
    }
    context.request({
      url: constant.url.queryParkingSpacesByOwner,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function(res) {
        console.log(res);
        if (res.statusCode == 200) {
          //成功情况下跳转
          let _parkingSpaces = res.data.parkingSpaces;
          if (_parkingSpaces.length == 0) {
            wx.showToast({
              title: "未查询到停车位",
              icon: 'none',
              duration: 2000
            });
            return;
          }

          for (let _psIndex = 0; _psIndex < _parkingSpaces.length; _psIndex++) {
            let _tmpParkingSpace = JSON.parse(JSON.stringify(_parkingSpaces[_psIndex]));
            _that._loadParkingSpaceFee(_tmpParkingSpace, function(_tmpParkingSpace, _fees) {

              _fees.forEach(function(_fee) {
                let _tmpEndTime = _fee.endTime.replace(/\-/g, "/")
                let _endTime = new Date(_tmpEndTime);

                _tmpParkingSpace.endTime = util.date.formatDate(_endTime);


                let _now = new Date();

                if (_endTime > _now) {
                  _tmpParkingSpace.feeStateName = '正常'
                } else {
                  _tmpParkingSpace.feeStateName = '欠费'
                }
                _tmpParkingSpace.feePrice = _fee.feePrice;
                _tmpParkingSpace.feeTypeCdName = _fee.feeTypeCdName;
                _tmpParkingSpace.feeName = _fee.feeName;
                _tmpParkingSpace.feeId = _fee.feeId;
                _that.data.moreParkingSpaces.push(_tmpParkingSpace);
              });
              _that.setData({
                moreParkingSpaces: _that.data.moreParkingSpaces
              });
            });
          }

        }
      },
      fail: function(e) {
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  _loadParkingSpaceFee: function(_parkingSpace, callBack) {
    let _that = this;
    let _objData = {
      page: 1,
      row: 30,
      payerObjId: _parkingSpace.psId,
      communityId: _parkingSpace.communityId
    }
    context.request({
      url: constant.url.queryFeeByOwner,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function(res) {
        console.log(res);
        if (res.statusCode == 200) {
          //成功情况下跳转
          let _parkingSpaceFees = res.data.fees;
          callBack(_parkingSpace, _parkingSpaceFees);

        }
      },
      fail: function(e) {
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  payFeeDetail: function(e) {
    let _item = e.target.dataset.item;
    wx.navigateTo({
      url: '/pages/payFeeDetail/payFeeDetail?fee=' + JSON.stringify(_item),
    });
  }
})