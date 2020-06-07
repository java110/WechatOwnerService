// pages/enterCommunity/enterCommunity.js
const context = require('../../context/Java110Context.js')
const constant = context.constant;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaCode: '',
    areaName: '',
    communityName: '',
    appUserName: '',
    idCard: '',
    link: '',
    second: 60,
    msgCode: '',
    areaShow: false,
    btnValue: '获取验证码',
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
    let _that = this;
    let _location = context.getLocation();
    let _currentLocation = context.getCurrentLocation();
    let _areaName = _currentLocation.city + _currentLocation.district;
    let _areaCode = _currentLocation.adcode;
    //加载省份
    context._loadArea('', '', function(_areaList) {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.areaCode == '' || this.data.areaCode == undefined) {
      let _currentLocation = context.getCurrentLocation();
      let _areaName = _currentLocation.city + _currentLocation.district;
      let _areaCode = _currentLocation.adcode;
      this.setData({
        areaCode: _areaCode,
        areaName: _areaName
      });
    }

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
    console.log('获取验证码');
    var _that = this;

    let obj = {
      tel: this.data.link
    };

    if (obj.tel == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    context.request({
      url: constant.url.userSendSms,
      header: context.getHeaders(),
      method: "POST",
      data: obj, //动态数据
      success: function(res) {
        console.log(res);
        //成功情况下跳转
        if (res.statusCode == 200) {
          wx.hideLoading();
          _that.timer();
          return;
        }
        wx.hideLoading();
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        });
      },
      fail: function(e) {
        wx.hideLoading();
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    });


  },
  bindOwner: function(e) {

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
      // } else if (obj.idCard == "") {
      //   msg = "请填写身份证";
    } else if (obj.link == "") {
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
      wx.showLoading({
        title: '绑定中',
      });

      let _userInfo = context.getUserInfo();
      let userId = '-1';
      if (_userInfo != null && _userInfo != undefined) {
        userId = _userInfo.userId;
      }
      let _header = context.getHeaders();
      _header['user-id'] = userId;
      context.request({
        url: constant.url.appUserBindingOwner,
        header: _header,
        method: "POST",
        data: obj, //动态数据
        success: function(res) {
          console.log(res);
          //成功情况下跳转
          if (res.statusCode == 200) {
            wx.hideLoading();
            wx.redirectTo({
              url: "/pages/viewBindOwner/viewBindOwner"
            });
            return;
          }
          wx.hideLoading();
          wx.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
          });
        },
        fail: function(e) {
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

  /**
   * 选择小区
   */
  chooseCommunity: function(e) {

    if (this.data.areaCode == '' || this.data.areaCode == undefined) {
      wx.showToast({
        title: '请先选择地区',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/viewCommunitys/viewCommunitys?areaCode=' + this.data.areaCode,
    })
  },
  timer: function() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  }
})