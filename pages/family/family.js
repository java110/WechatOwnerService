// pages/enterCommunity/enterCommunity.js
const context = require('../../context/Java110Context.js');

const constant = context.constant;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "sexArr":["男","女"],
    "sexShow":false,
    "sex": "0",
    "name": "",
    "link": "",
    "remark": "",
    "ownerId": "",
    "userId": "",
    "ownerTypeCd": "1002",
    "idCard":"",
    "age": "",
    "memberId": "-1",
    "communityId":"",
    "remark":''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _that = this;
    context.getOwner(function(_owner){
      _that.setData({
        ownerId: _owner.memberId,
        communityId: _owner.communityId
      });
    });
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
    console.log(this.data);
  },
  submitOwnerMember: function(e) {
    console.log('请求信息',e);
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
      "communityId":this.data.communityId,
      "idCard":this.data.idCard
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
    } else if(obj.idCard == ""){
      msg = "请填写身份证";
    }
    if (msg != "") {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '提交中',
      });
      console.log("提交数据", obj);
      wx.request({
        url: constant.url.saveOwner, 
        header: context.getHeaders(),
        method: "POST",
        data: obj,
        // data:obj, //动态数据
        success: function(res) {
          console.log(res, 99999);

          if (res.statusCode == 200) {
            wx.hideLoading();
            wx.navigateBack();
            return;
          }

          wx.hideLoading();
          wx.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
          });
        },
        fail: function (e) {
          wx.hideLoading();
          wx.showToast({
            title: "服务器异常了",
            icon: 'none',
            duration: 2000
          })
        }
      });
    }

  },
  
  onConfirm: function (e) {
    let _sex = e.detail.index;
    this.setData({
      sex:_sex,
      sexShow: false
    });
  },
  chooseSex: function (e) {
    this.setData({
      sexShow: true
    });
  },
  onCancel: function (e) {
    this.setData({
      sexShow: false
    });
  }
})