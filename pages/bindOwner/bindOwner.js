// pages/enterCommunity/enterCommunity.js
const context = require('../../context/Java110Context.js')
const constant = context.constant;


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
    let _location = context.getLocation();
    let _currentLocation = context.getCurrentLocation();
    let _areaName = _currentLocation.city + _currentLocation.district;
    let _areaCode = _currentLocation.adcode;
    //加载省份
    context._loadArea('','',function(_areaList){
      _that.setData({
        areaList: _areaList,
        communityName: _location,
        areaCode: _areaCode,
        areaName: _areaName
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
    let _currentLocation = context.getCurrentLocation();
    let _areaName = _currentLocation.city + _currentLocation.district;
    let _areaCode = _currentLocation.adcode;
    this.setData({
       areaCode:_areaCode,
       areaName:_areaName
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
  bindOwner: function (e) {

    let obj = {
      "areaCode": this.data.areaCode,
      "communityName": this.data.communityName,
      "appUserName": this.data.appUserName,
      "idCard": this.data.idCard,
      "link": this.data.link,
      "msgCode": this.data.msgCode
    }
    let msg = "";
    if (obj.areaCode == "") {
      msg = "请选择地区";
    } else if (obj.communityName == "") {
      msg = "请填写小区名称";
    } else if (obj.appUserName == "") {
      msg = "请填写业主名称";
    } else if (obj.idCard == "") {
      msg = "请填写身份证";
    } else if (obj.link == ""){
      msg = "请填写手机号";
    } else if (obj.msgCode == "") {
      msg = "请填写验证码";
    }
    if (msg != "") {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    } else {
      console.log("提交数据", obj);
      wx.request({
        url: constant.url.appUserBindingOwner,
        header: context.getHeaders(),
        method: "POST",
        data:obj, //动态数据
        success: function (res) {
          console.log(res);
          //成功情况下跳转
          wx.redirectTo({
            url: "/pages/viewBindOwner/viewBindOwner"
          });
        },
        fail:function(e){
          wx.showToast({
            title: "服务器异常了",
            icon: 'none',
            duration: 2000
          })
        }
      });
    }

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