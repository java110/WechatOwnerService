// pages/applicationKeyLocation/applicationKeyLocation.js
const context = require('../../context/Java110Context.js');
const constant = context.constant;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    locations:[],
    communityName:'',
    communityId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //this._loadOwnerLocation();

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
    this._loadOwnerLocation();

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

  _loadOwnerLocation:function(){
   
    let _that = this;
    context.getOwner(function(_owner){
      console.log('数据执行', _owner);
      let _data = {
        memberId: _owner.memberId,
        communityId: _owner.communityId
      }
      _that.setData({
        communityName: _owner.communityName,
        communityId: _owner.communityId
      });
      context.request({
        url: constant.url.listOwnerMachines,
        header: context.getHeaders(),
        method: "GET",
        data: _data, //动态数据
        success: function (res) {
          console.log('查询业主门禁', res);
          //成功情况下跳转
          if (res.statusCode == 200) {
            let _machines = res.data.machines;
            _that.setData({
              locations: _machines
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

    });
    
  },
  gotoApplyApplicationKeyPage:function(){
    // 跳转至 填写信息页面
    console.log('gotoApplyApplicationKeyPage', this.data.locations);

    if (this.data.locations.length < 1){
        wx.showToast({
          title: '没有相应门禁供您申请',
        })
    }


    wx.navigateTo({
      url: "/pages/applicationKeyUser/applicationKeyUser?locations=" + JSON.stringify(this.data.locations)
        +"&communityId="+this.data.communityId
    })
  }

})