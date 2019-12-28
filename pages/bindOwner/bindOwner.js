// pages/enterCommunity/enterCommunity.js
const context = require('../../context/Java110Context.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaCode:'',
    areaName:'',
    communityName:'',
    appUserName:'',
    idCard:'',
    link:'',
    msgCode:'',
    areaShow:false,
    areaList:{
      province_list: {
        
      },
      city_list: {
        
      },
      county_list: {
        
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;
    //加载省份
    context._loadArea('','',function(_areaList){
      _that.setData({
        areaList: _areaList
      });
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
    let curLocation = wx.getStorageSync("currentLocation");
    this.setData({
      province: curLocation.province,
      city: curLocation.city   
    })
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

  bindInput:function(e){
    console.log('数据监听',e);
     let _that = this;
     let dataset = e.currentTarget.dataset;
     let value = e.detail;
     let name = dataset.name;
     _that.data[name] = value;
    //  _that.setData({
    //    name: value
    //  });
     console.log(this.data);
  },
  sendMsgCode:function(){

  },
  bindOwner:function(){
      console.log(this.data);
      //成功情况下跳转
      wx.navigateTo({
        url: "/pages/viewBindOwner/viewBindOwner"
      })
  },
  onConfirm:function(e){
    console.log("onConfirm",e);
    let _areaCode = e.detail.values[2].code;
    let _areaName = e.detail.values[1].name + e.detail.values[2].name;
    this.setData({
      areaCode: _areaCode,
      areaName: _areaName,
      areaShow: false
    });
  },
  onChange:function(e){
      console.log(e);
  },
  chooseArea:function(e){
    this.setData({
      areaShow:true
    });
  },
  onCancel:function(e){
    this.setData({
      areaShow: false
    });
  },

 

})