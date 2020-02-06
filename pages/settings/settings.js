// pages/settings/settings.js
const context = require("../../context/Java110Context.js");
const constant = context.constant;
const factory = context.factory;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerImg: null,
    imageList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOwnerHeaderImg();
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
  settingHeadImg:function(){
    var _that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // console.log(res)
        wx.showToast({
          title: '正在上传',
          icon: 'loading',
          mask: true,
          duration: 1000
        });
        var tempFilePaths = res.tempFilePaths
        console.log('头像地址',tempFilePaths);
        factory.base64.urlTobase64(tempFilePaths[0]).then(function (_baseInfo) {
          _that.setData({
            headerImg: _baseInfo
          });
          _that._uploadOwnerHeaderImg();
          wx.hideLoading()
        });
      }
    })
  },
  
  /**
   * 查询业主头像
   */
  loadOwnerHeaderImg: function () {
    let _that = this;
    context.getOwner(function (_owner) {
      let _headerImg = constant.url.getOwnerPhotoPath + "?objId=" + _owner.memberId + "&communityId=" + _owner.communityId + "&fileTypeCd=10000&time=" + new Date();
      _that.setData({
        headerImg: _headerImg
      });
    });
  },
  _uploadOwnerHeaderImg: function () {
    let _that = this;
    context.getOwner(function (_owner) {
      let _memberId = _owner.memberId;
      let _communityId = _owner.communityId;
      let obj = {
        memberId: _memberId,
        communityId: _communityId,
        photo: _that.data.headerImg
      };
      context.request({
        url: constant.url.uploadOwnerPhoto,
        header: context.getHeaders(),
        method: "POST",
        data: obj, //动态数据
        success: function (res) {
          console.log(res);
          if (res.statusCode != 200) {
            wx.showToast({
              title: '头像上传失败',
              icon: 'none',
              duration: 2000
            });
            return;
          }     
        },
        fail: function (e) {
          wx.showToast({
            title: "服务器异常了",
            icon: 'none',
            duration: 2000
          });
        }
      });
    });

  }

})