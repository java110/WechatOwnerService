// pages/my/myHouse.js
const context = require('../../context/Java110Context.js');

const constant = context.constant;

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOwnerHouse();
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

   myHouseDetail: function(e) {
    var roomDetail =  e.currentTarget.dataset.item;
    wx.setStorageSync('roomDetail',roomDetail);
    wx.navigateTo({
      url: '../my/myHouseDetail',
    })
  },

  /**
   * 加载业主房屋信息
   */
  loadOwnerHouse:function(){
      let _that = this;
      context.getRooms().then(res=>{
        if(res){
          _that.setData({
            rooms: res.data.rooms
          });
        }
       })
    }
})