// pages/enterCommunity/enterCommunity.js
const context = require('../../context/Java110Context.js')
const constant = context.constant;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: ['投诉', '建议'],
    typeName: '',
    typeCd: '',
    typeShow: false,
    photoList: [],
    tel: '',
    context: '',
    complaintName: '',
    roomId: '',
    userId: '',
    storeId: '',

    areaCode: '',
    areaName: '',
    communityName: '',
    appUserName: '',
    idCard: '',
    link: '',
    msgCode: '',
    areaShow: false,
    areaList: {
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
  onLoad: function(options) {
    context.getOwner(function (_owner) {
      console.log(_owner,99999999);
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindInput: function(e) {
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
  sendMsgCode: function() {

  },
  bindOwner: function(e) {


    // context.getOwner(function(_ownerInfo) {
    // console.log(_ownerInfo, 888888888);
    // if (_ownerInfo) {

    let obj = {
      "typeCd": this.data.typeCd,
      "complaintName": this.data.complaintName,
      "tel": this.data.tel,
      // "roomId": _ownerInfo.roomId,
      "context": this.data.context,
      "userId": this.data.userId,
      "storeId": this.data.storeId
    }
    let msg = "";
    if (obj.areaCode == "") {
      msg = "请选择地区";
    } else if (obj.communityName == "") {
      msg = "请填写小区名称";
    } else if (obj.typeCd == "") {
      msg = "请选择投诉类型";
    } else if (obj.complaintName == "") {
      msg = "请填写投诉人";
    } else if (obj.tel == "") {
      msg = "请填写手机号";
    } else if (obj.context == "") {
      msg = "请填写投诉内容";
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
        url: constant.url.appUserBindingOwner,
        header: context.getHeaders(),
        method: "POST",
        data: {
          "typeCd": "809001",
          "roomId": "752019100758260005",
          "complaintName": "吴学文",
          "tel": "17797173942",
          "context": "服务太差",
          "userId": "1292827282727",
          "storeId": "402019032924930007",
        },
        // data: obj, //动态数据
        success: function(res) {
          console.log(res);
          //成功情况下跳转
          // wx.redirectTo({
          //   url: "/pages/viewComplaint/viewComplaint"
          // });
        },
        fail: function(e) {
          console.log(e);
          wx.showToast({
            title: "服务器异常了",
            icon: 'none',
            duration: 2000
          })
        }
      });

    }



    // } else {

    // }
    // });






  },
  onConfirm: function(e) {
    console.log("onConfirm", e);
    let _areaCode = e.detail.values[2].code;
    let _areaName = e.detail.values[1].name + e.detail.values[2].name;
    this.setData({
      areaCode: _areaCode,
      areaName: _areaName,
      areaShow: false
    });
  },
  onChange: function(e) {
    console.log(e);
  },
  chooseArea: function(e) {
    this.setData({
      areaShow: true
    });
  },
  onCancel: function(e) {
    this.setData({
      areaShow: false
    });
  },


  onTypeConfirm: function(e) {
    console.log("onConfirm", e);
    this.setData({
      typeName: e.detail.value,
      typeCd: e.detail.index ? '809001' : '809002',
      typeShow: false
    });
  },
  onTypeCancel: function(e) {
    this.setData({
      typeShow: false
    });
  },

  chooseType: function(e) {
    this.setData({
      typeShow: true
    });
  },

  afterRead: function(e) {
    console.log(e);
    wx.getFileSystemManager().readFile({
      filePath: e.detail.file.path, //选择图片返回的相对路径
      encoding: "base64", //这个是很重要的
      success: res => { //成功的回调
        //返回base64格式
        console.log('data:image/png;base64,' + res.data)
        // photos[x] = res.data;
      }
    })
  }

})