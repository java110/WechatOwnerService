// pages/collectFace/collectFace.js
const context = require("../../context/Java110Context.js");
const constant = context.constant;
const factory = context.factory;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'',
    uploadFlag:false
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
  takePhoto:function() {
    let _that = this;
    _that.setData({
      uploadFlag: true
    })
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.getFileSystemManager().readFile({
          filePath: res.tempImagePath,
          encoding: 'base64',
          success: (photoRes) => {
            let _baseInfo = photoRes.data;
            _that.setData({
              src: _baseInfo
            });
            _that._uploadOwnerPhoto();
            wx.hideLoading()
          }
        });
      },
      fail:(e)=>{
        _that.setData({
          uploadFlag:false
        })
      }
    })
  },
  _uploadOwnerPhoto:function(){
    let _that = this;
    context.getOwner(function (_owner) {
      let _memberId = _owner.memberId;
      let _communityId = _owner.communityId;
      let obj = {
        memberId: _memberId,
        communityId: _communityId,
        photo: _that.data.src
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
              _that.setData({
                uploadFlag: false
              });
              return;
            }
            //成功情况下跳转
            wx.navigateBack({
              delta:1
            });
          },
          fail: function (e) {
            wx.showToast({
              title: "服务器异常了",
              icon: 'none',
              duration: 2000
            });
            _that.setData({
              uploadFlag: false
            });
          }
        });
    });
    
  }
})