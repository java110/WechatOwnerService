// pages/viewApplicationKeyUser/viewApplicationKeyUser.js
const context = require('../../context/Java110Context.js');
const constant = context.constant;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '申请',
        desc: ''
      },
      {
        text: '审核中',
        desc: ''
      },
      {
        text: '完成',
        desc: ''
      }
    ],
    active:0,
    applicationKeyId:'',
    name:'',
    age:0,
    sex:'',
    typeCdName:'',
    idCard:'',
    startTime:null,
    endTime: null,
    tel:'',
    stateName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      idCard: options.idCard
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

  loadApplicationKey:function(){

    let _that = this;
    let _objData = {
      page : 1,
      row : 1,
      idCard : this.data.idCard
    }
    context.request({
      url: constant.url.listApplicationKeys,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function (res) {
        console.log(res);
        if (res.resultCode == 200) {
          //成功情况下跳转
          let _applicationKeys = res.data.applicationKeys;
          if (_applicationKeys.length == 0){
            wx.showToast({
              title: "未查询到钥匙",
              icon: 'none',
              duration: 2000
            });
            return ;
          }

          let _applicationKey = _applicationKeys[0];
          let _active = '0';
          if (_applicationKey.state == '10001'){
            _active = '2';
          } else if (_applicationKey.state == '10002') {
            _active = '2';
          }else{
            _active = '1';
          }
          _that.setData({
            applicationKeyId: _applicationKey.applicationKeyId,
            name: _applicationKey.name,
            age: _applicationKey.age,
            sex: _applicationKey.sex,
            typeCdName: _applicationKey.typeCd,
            idCard: _applicationKey.idCard,
            startTime: _applicationKey.startTime,
            endTime: _applicationKey.endTime,
            tel: _applicationKey.tel,
            active: _active,
            stateName: stateName
          });
          


          
        }
      },
      fail: function (e) {
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    });
  }
})