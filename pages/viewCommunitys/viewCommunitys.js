
const context = require('../../context/Java110Context.js');
const constant = context.constant;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaCode: '',
    value:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _areaCode = options.areaCode;
    this.setData({
      areaCode: _areaCode
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
    this._loadCommunity();
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
  onSearch() {
    this._loadCommunity();
  },

  onClick() {
    this._loadCommunity();
  },
  chooseCommunity:function(e){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]; 
    prevPage.setData({
      communityName:e.target.dataset.item.name,
    })
    console.log(e);
    wx.navigateBack({
      delta: 1,
    })
  },

  _loadCommunity:function(){
    let _that = this;
    let dataObj = {
      page:1,
      row:15,
      cityCode:this.data.areaCode,
      state:'1100',
      name:this.data.value
    }
    context.request({
      url: constant.url.listCommunitys,
      header: context.getHeaders(),
      method: "GET",
      data: dataObj, //动态数据
      success: function (res) {
        console.log(res);
        //成功情况下跳转
        if (res.statusCode == 200) {
          let _communtiys = res.data.communitys;
          _that.setData({
            communitys: _communtiys
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