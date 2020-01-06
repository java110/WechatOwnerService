// pages/enterCommunity/enterCommunity.js
const context = require('../../context/Java110Context.js');

const constant = context.constant;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr: [{
      label: "卧室报修",
      value: 10001
    }, {
      label: "管道报修",
      value: 10002
    }, {
      label: "客厅报修",
      value: 10003
    }],
    repairType: 10001,
    repairTypeIndex:0,
    repairName: "",
    tel: "",
    communityId:"",
    roomId: "",
    appointmentTime: "",
    context: "",
    date: "",
    time: "",
    photos: [],
    imgUrl: []
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindTypeChange: function(e) {
    let value = e.detail.value;
    this.setData({
      repairType: this.data.typeArr[value].value,
      repairTypeIndex: value
    })
  },
  bindRepairName: function(e) {
    this.setData({
      repairName: e.detail.value
    })
  },
  bindTel: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  bindCommunity: function (e) {
    this.setData({
      communityId: e.detail.value
    })
  },
  bindRoom: function(e) {
    this.setData({
      roomId: e.detail.value
    })
  },
  bindContent: function(e) {
    console.log(e, 9999999);
    this.setData({
      context: e.detail.value
    })
  },
  submitRepair: function(e) {
    let obj = {
      appointmentTime: this.data.date + " " + this.data.time + ":00",
      repairType: this.data.repairType,
      repairName: this.data.repairName,
      tel: this.data.tel,
      communityId: this.data.communityId,
      roomId: this.data.roomId,
      context: this.data.context,
      photos: [this.data.photos[1]]
    }
    let msg = "";
    if (obj.repairName == "") {
      msg = "请填写报修人";
    } else if (obj.tel == "") {
      msg = "请填写联系方式";
    } else if (obj.communityId == ""){
      msg = "请填写小区信息";
    } else if (obj.roomId == "") {
      msg = "请填写房屋信息";
    } else if (this.data.date == "") {
      msg = "请填写预约日期";
    } else if (this.data.time == "") {
      msg = "请填写预约时间";
    } else if (obj.content == "") {
      msg = "请填写报修内容";
    } else if (this.data.photos == "") {
      msg = "请上传图片";
    }
    if (msg != "") {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    } else {
      console.log("提交数据", obj);
      context.request({
        url: constant.url.saveOwnerRepair, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
        header: context.getHeaders(),
        method: "POST",
        data: {
          "repairType": "10001",
          "roomId": "752019100758260005",
          "communityId": "7020181217000001",
          "repairName": "吴学文",
          "tel": "17797173942",
          "context": "服务太差",
          "appointmentTime": "2019-12-14 18:30:30",
          "photos": ['base64....']
        },
        // data:obj, //动态数据
        success: function(res) {
          console.log(res, 99999);
        }
      });
    }

  },
  uploadImg: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths);
        const photos = [];
        for (var x = 0; x < res.tempFilePaths.length; x++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[x], //选择图片返回的相对路径
            encoding: "base64", //这个是很重要的
            success: res => { //成功的回调
              //返回base64格式
              console.log('data:image/png;base64,' + res.data)
              photos[x] = res.data;
            }
          })
        }
        that.setData({
          photos: photos,
          imgUrl: tempFilePaths
        })

      }
    })
  }
})