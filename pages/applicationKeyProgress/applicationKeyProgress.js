// pages/applicationKeyProgress/applicationKeyProgress.js
const context = require('../../context/Java110Context.js');
const constant = context.constant;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applicationKeys:[],
    idCard:'',
    communityId:''
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
    let _that = this;
    context.getOwner(function (_owner) {
      let _idCard = _owner.idCard;
      let _communityId = _owner.communityId;
      _that.setData({
        idCard: _idCard,
        communityId: _communityId
      });
      _that.loadApplicationKey();
    });
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
  loadApplicationKey: function () {

    let _that = this;
    let _objData = {
      page: 1,
      row: 10,
      idCard: this.data.idCard,
      communityId: this.data.communityId,
      typeFlag:'1100102'
    }
    context.request({
      url: constant.url.listApplicationKeys,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          //成功情况下跳转
          let _applicationKeys = res.data.applicationKeys;
          if (_applicationKeys.length == 0) {
            wx.showToast({
              title: "未查询到钥匙",
              icon: 'none',
              duration: 2000
            });
            return;
          }

          _that.setData({
            applicationKeys: _applicationKeys
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
  },
  gotoDetail:function(e){
    let _applicationKey = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/viewApplicationKeyUser/viewApplicationKeyUser?applicationKeyId=' + _applicationKey.applicationKeyId+"&communityId="+this.data.communityId,
    })
  }
})