// pages/enterCommunity/enterCommunity.js
const { appInfo, urlInfo } = require("../../config/config.js");
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      province:'',
      city:'',
      multiArray: [],
      multiIndex: [0, 0, 0],
      provinces:[],
      areas:[],
      currentArea:{},
      
        "communityName":"",
    "ownerName": "",
    "idCard": "",
    "tel": "",
    "validateCode": ""
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查询省级地区
    let pros = this._loadArea('',''); 
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

    bindRegionChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      // this.setData({
      //   region: e.detail.value
      // })
 
  },
  _loadArea:function(_level,_parentAreaCode){
    let that = this;
      wx.request({
        url: urlInfo.areaUrl,
        header: util.getHeaders(),
        data: {
          areaLevel: _level,                    // 临时登录凭证
          parentAreaCode: _parentAreaCode
        },
        success: function (res) {
          console.log('login success');
          res = res.data;
          var province = [], city = [], area = [];
          var _currentArea = [];
          province = res.areas.filter(item => {
            return item.parentAreaCode == 0;
          })
          city = res.areas.filter(item => {
            return item.parentAreaCode == province[0].areaCode;
          })
          area = res.areas.filter(item => {
            return item.parentAreaCode == city[0].areaCode;
          })
          var provinceList = province.map(item => {
            return item.areaName;
          })
          var cityList = city.map(item => {
            return item.areaName;
          })
          var quyuList = area.map(item => {
            return item.areaName;
          });
          let curLocation = wx.getStorageSync("currentLocation");
          _currentArea = res.areas.filter(item => {
            return item.areaCode == curLocation.adcode;
          })
          that.setData({
            multiArray: [provinceList, cityList, quyuList],
            areas: res.areas,
            currentArea: _currentArea[0],
            province
          });
          

        },

        fail: function (error) {
          // 调用服务端登录接口失败
          wx.showToast({
            title: '调用接口失败',
          });
          console.log(error);
        }
      })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value,this.data);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    const provinceName = data.multiArray[0][data.multiIndex[0]];
    let provinceId = "";
    let province = this.data.province;
    let quyuList = [], cityList = [], provinceList = [], city = [], area = [];
    try {
      province.forEach(item => {
        if (item.areaName === provinceName) {
          provinceId = item.areaCode;
          throw (new Error('find item'))
        }
      })
    } catch (err) {
    }
    city = this.data.areas.filter(item => {
      return item.parentAreaCode == provinceId;
    })
    if (e.detail.column == 0) {
      data.multiIndex = [e.detail.value, 0, 0];
      try {
        area = this.data.areas.filter(item => {
          return item.parentAreaCode == city[data.multiIndex[1]].areaCode;
        })
      } catch (err) { }
    } else if (e.detail.column == 1) {
      data.multiIndex[2] = 0;
      area = this.data.areas.filter(item => {
        return item.parentAreaCode == city[e.detail.value].areaCode;
      })
    } else {
      const cityName = data.multiArray[1][data.multiIndex[1]];
      let cityId = '';
      try {
        this.data.areas.forEach(item => {
          if (item.areaName === cityName) {
            cityId = item.areaCode;
            throw (new Error('find item'));
          }
        })
      } catch (err) { }
      area = this.data.areas.filter(item => {
        return item.parentAreaCode == cityId;
        //return item.parentAreaCode == city[e.detail.value].areaCode;

      })
    }
    provinceList = province.map(item => {
      return item.areaName
    })
    cityList = city.map(item => {
      return item.areaName;
    })
    quyuList = area.map(item => {
      return item.areaName;
    });
    data.currentArea = area[data.multiIndex[2]];
    data.multiArray = [provinceList, cityList, quyuList],
      this.setData(data);
  },
  enterCommunity:function(e){
    //this.data.areaCode = this.data.currentArea.areaCode;
    console.log("提交数据",this.data);
  }
})