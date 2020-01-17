// pages/enterCommunity/enterCommunity.js
const context = require('../../context/Java110Context.js');

const constant = context.constant;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "sexArr":["男","女"],
    "sex": "0",
    "name": "",
    "link": "",
    "remark": "",
    "ownerId": "",
    "userId": "",
    "ownerTypeCd": "1002",
    "age": "",
    "memberId": ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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


  bindSexChange: function(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  bindOwnerId: function(e) {
    this.setData({
      ownerId: e.detail.value
    })
  },
  bindName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindAge: function(e) {
    this.setData({
      age: e.detail.value
    })
  },
  bindRemark: function(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  submitRepair: function(e) {
    let obj = {
      "sex": this.data.sex,
      "name": this.data.name,
      "link": this.data.link,
      "remark": this.data.remark,
      "ownerId": this.data.ownerId,
      "userId": this.data.userId,
      "ownerTypeCd": this.data.ownerTypeCd,
      "age": this.data.age,
      "memberId": this.data.memberId
    }
    let msg = "";
    if (obj.ownerId == "") {
      msg = "请填写业主";
    } else if (obj.name == "") {
      msg = "请填写姓名";
    } else if (obj.sex == "") {
      msg = "请填写性别";
    } else if (obj.age == "") {
      msg = "请填写年龄";
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
        url: constant.url.saveOwner, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
        header: context.getHeaders(),
        method: "POST",
        data: {
          "sex": "1",
          "name": "1",
          "link": "1",
          "remark": "1",
          "ownerId": "1",
          "userId": "1",
          "ownerTypeCd": "1002",
          "age": "11",
          "memberId": "1"
        },
        // data:obj, //动态数据
        success: function(res) {
          console.log(res, 99999);
        }
      });
    }

  }
})