// pages/payParkingFeeList/payParkingFeeList.js
const context = require('../../context/Java110Context.js');

const constant = context.constant;

const util = context.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rooms: [],
    moreRooms:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let _that = this;
    context.getRooms().then(res => {
      let _rooms = res.data.rooms;
      let _owner = res.data.owner;
      _that.setData({
        moreRooms: []
      });
      _rooms.forEach(function(_room) {
        _room.communityId = _owner.communityId;
        _room.communityName = _owner.communityName;
        _that._loadRoomFee(_rooms,_room);
      });
    });

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
  payFee: function(e) {
    let _item = e.target.dataset.item;
    wx.navigateTo({
      url: '/pages/roomFee/roomFee?fee=' + JSON.stringify(_item),
    })
  },
  _loadRoomFee: function (_rooms,_room) {
    let _that = this;
    let _objData = {
      page: 1,
      row: 30,
      payerObjId: _room.roomId,
      feeTypeCd: '888800010001',
      communityId: _room.communityId
    }
    context.request({
      url: constant.url.queryFeeByOwner,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function(res) {
        console.log(res);
        if (res.statusCode == 200) {
          //成功情况下跳转
          let _roomFees = res.data.fees;
          _roomFees.forEach(function(_roomFee){
            let _tmpEndTime = _roomFee.endTime.replace(/\-/g, "/")
            let _endTime = new Date(_tmpEndTime);
            let _tmpRoom = JSON.parse(JSON.stringify(_room));
            _tmpRoom.endTime = util.date.formatDate(_endTime);

            let _now = new Date();

            if (_endTime > _now) {
              _tmpRoom.feeStateName = '正常'
            } else {
              _tmpRoom.feeStateName = '欠费'
            }
            _tmpRoom.additionalAmount = _roomFee.additionalAmount;
            _tmpRoom.squarePrice = _roomFee.squarePrice;
            _tmpRoom.amount = _roomFee.feePrice;
            _tmpRoom.feeId = _roomFee.feeId;
            _tmpRoom.feeName = _roomFee.feeName;
            _that.data.moreRooms.push(_tmpRoom);
          });
          _that.setData({
            moreRooms: _that.data.moreRooms
          });
        }
      },
      fail: function(e) {
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  payFeeDetail: function (e) {
    let _item = e.target.dataset.item;
    wx.navigateTo({
      url: '/pages/payFeeDetail/payFeeDetail?fee=' + JSON.stringify(_item),
    });
  }
})