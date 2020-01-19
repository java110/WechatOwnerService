// pages/myRepair/myRepair.js
const context = require('../../context/Java110Context.js');
const factory = context.factory;
const constant = context.constant;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    ownerId:'',
    roomId:'',
    communityId:'',
    waitRepair:[],
    doingRepair:[],
    repaired:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    context.getRooms().then(function (res) {
      let _owner = res.data.owner;

      let _rooms = res.data.rooms;
      if(_rooms == null || _rooms == undefined || _rooms.length == 0){
        return ;
      }

      let _roomId = '';

      _rooms.forEach(function(_item){
        _roomId += (_item.roomId+',');
      });

      if(_roomId != ''){
        _roomId = _roomId.substring(0,_roomId.length-1);
      }

      that.setData({
        communityId: _owner.communityId,
        ownerId: _owner.memberId,
        roomId: _roomId
      });
      that._loadRepair(that.data.active);
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
  /**
   * 加载我的报修
   */
  _loadRepair:function(_active){
    let that = this;

    let _state = '';
    if (_active == 0){
      _state = '1000';
    }else if(_active == 1){
      _state = '1100';
    }else{
      _state = '1200';
    }
   
    let _paramIn = {
      "communityId": that.data.communityId,
      "ownerId": that.data.ownerId,
      "roomId":that.data.roomId,
      "state":_state,
      "page":1,
      "row":10
    };
    context.request({
      url: constant.url.listMyRepair,
      header: context.getHeaders(),
      method: "GET",
      data: _paramIn,
      success: function (res) {
        if (res.statusCode == 200) {
          let _ownerRepairs = res.data.ownerRepairs;
          if (_active == 0){
            that.setData({
              waitRepair: _ownerRepairs
            });
          } else if (_active == 1){
            that.setData({
              doingRepair: _ownerRepairs
            });
          }else{
            that.setData({
              repaired: _ownerRepairs
            });
          }
          return;
        }

        wx.showToast({
          title: "查询报修单失败",
          icon: 'none',
          duration: 2000
        });
      },
      fail: function (e) {
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  onChange:function(e){
    console.log(e);

    this._loadRepair(e.detail.index);
  }
})