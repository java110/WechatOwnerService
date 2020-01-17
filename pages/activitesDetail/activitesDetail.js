const context = require("../../context/Java110Context.js");
const constant = context.constant;
const util = context.util;
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    activitiesId:'',
    title:'',
    communityId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activitiesId: options.activitiesId,
      title: options.title,
      communityId: options.communityId
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
    let _that = this;
    context.getOwner(function (_owner) {
      let _communityId = '';
      if (_owner == null) {
        _communityId = '7020181217000001'
      } else {
        _communityId = _owner.communityId;
      }
      _that.setData({
        communityId: _communityId
      });

      _that._loadActivite();
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
  _loadActivite:function(){
    let _that = this;
    let _objData = {
      page: 1,
      row: 1,
      communityId: this.data.communityId,
      activitiesId: this.data.activitiesId
    };
    context.request({
      url: constant.url.listActivitiess,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function (res) {
        console.log("请求返回信息：", res);
        if (res.statusCode == 200) {

          let _activites = res.data.activitiess[0];
          _activites.src = constant.url.filePath + "?fileId=" + _activites.headerImg + "&communityId=" + _that.data.communityId + "&time=" + new Date();
          let _startTime = _activites.startTime.replace(/\-/g, "/")
          let _tmpStartTime = new Date(_startTime);

          _activites.startTime = util.date.formatDate(_tmpStartTime);
          _that.setData(_activites);
          return;
        }
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
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