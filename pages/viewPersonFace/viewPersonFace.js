// pages/viewPersonFace/viewPersonFace.js
const context = require("../../context/Java110Context.js");
const constant = context.constant;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      face:null,
      btnValue:"采集人脸"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        face:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578300447436&di=e20a0afaadbfd1c48b9de834c35da9ee&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170524%2F20170524155526_e561e179dc10040e208de068f528e3b3_3.jpeg'
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
      this.loadOwnerFace();
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
  collectFace:function(){
    //采集人脸
    console.log('采集人脸');
    wx.navigateTo({
      url: '/pages/collectFace/collectFace',
    })
  },
  /**
   * 查询业主人脸
   */
  loadOwnerFace:function(){
    let _that = this;
    context.getOwner(function(_owner){
      let _face = constant.url.getOwnerPhotoPath + "?objId=" + _owner.memberId+"&communityId="+_owner.communityId+"&fileTypeCd=10000&time=" + new Date();
      _that.setData({
        face: _face
      });
    });
  }
})