// pages/enterCommunity/enterCommunity.js
const context = require('../../context/Java110Context.js');

const constant = context.constant;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "columns":["男","女"],
    "sex": "",
    sexValue:"",
    "name": "",
    "link": "",
    "remark": "",
    "ownerId": "",
    "userId": "",
    "ownerTypeCd": "1002",
    "age": "",
    "memberId": -1,
    communityId:"",
    idCard:"",
    sexShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    context.getOwner(function (_owner) {
      console.log(_owner);
      that.setData({
        ownerId: _owner.memberId,
        userId: _owner.memberId,
        communityId: _owner.communityId
      })
    })
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

  bindInput: function (e) {
    console.log('数据监听', e);
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

  onSexConfirm: function (e) {
    console.log("onConfirm", e);
    this.setData({
      sexValue: e.detail.value,
      sex: e.detail.index+'',
      sexShow: false
    });
  },
  onSexCancel: function (e) {
    this.setData({
      sexShow: false
    });
  },
  chooseSex: function (e) {
    this.setData({
      sexShow: true
    });
  },

  submit: function(e) {
    let obj = {
      "sex": this.data.sex,
      "name": this.data.name,
      "link": this.data.link,
      "remark": this.data.remark,
      "ownerId": this.data.ownerId,
      "userId": this.data.userId,
      "ownerTypeCd": this.data.ownerTypeCd,
      "age": this.data.age,
      "memberId": this.data.memberId,
      "communityId": this.data.communityId,
      "idCard": this.data.idCard
    }
    let msg = "";
    if (obj.name == "") {
      msg = "请填写姓名";
    } else if (obj.sex == "") {
      msg = "请填写性别";
    } else if (obj.idCard == "") {
      msg = "请填写身份证";
    } else if (obj.age == "") {
      msg = "请填写年龄";
    } else if (obj.link == "") {
      msg = "请填写电话";
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
        // data: {
        //   "sex": "1",
        //   "name": "1",
        //   "link": "1",
        //   "remark": "1",
        //   "ownerId": "1",
        //   "userId": "1",
        //   "ownerTypeCd": "1002",
        //   "age": "11",
        //   "memberId": "1"
        // },
        data:obj, //动态数据
        success: function(res) {
          console.log(res, 99999);
          if (res.statusCode == 200){
            wx.navigateBack()
          }
        }
      });
    }

  }
})