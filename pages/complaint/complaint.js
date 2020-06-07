// pages/enterCommunity/enterCommunity.js
const context = require('../../context/Java110Context.js')
const constant = context.constant;
const factory = context.factory;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomCloums:[],
    roomIdArr:[],
    roomName:"",
    roomId: '',
    roomShow:false,
    columns: ['投诉', '建议'],
    typeName: '',
    typeCd: '',
    typeShow: false,
    photoList: [],
    tel: '',
    context: '',
    complaintName: '',
    userId: '',
    storeId: '',
    photos: [],
    communityId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    context.getRooms().then(res=>{
      let arr = res.data.rooms;
      let roomCloums = [];
      let roomIdArr = [];
      arr.map(item => {
        roomCloums.push(item.floorNum + "号楼" + item.unitNum + "单元" + item.roomNum + "室");
        roomIdArr.push(item.roomId);
      })
      that.setData({
        roomCloums: roomCloums,
        roomIdArr: roomIdArr,
        userId: res.data.owner.appUserId,
        communityId: res.data.owner.communityId
      })
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

  bindOwner: function(e) {


    // context.getOwner(function(_ownerInfo) {
    // console.log(_ownerInfo, 888888888);
    // if (_ownerInfo) {

    let obj = {
      "typeCd": this.data.typeCd,
      "complaintName": this.data.complaintName,
      "tel": this.data.tel,
      "roomId": this.data.roomId,
      "photos": [],
      "context": this.data.context,
      "userId": this.data.userId,
      "communityId": this.data.communityId
    }

    let _photos = this.data.photos;
    _photos.forEach(function(_item) {
      obj.photos.push({ "photo": _item });
    });

    console.log(obj,3333333333333);

    let msg = "";

    if (obj.typeCd == "") {
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
        url: constant.url.saveComplaint,
        header: context.getHeaders(),
        method: "POST",
        // data: {
        //   "typeCd": "809001",
        //   "roomId": "752019100758260005",
        //   "complaintName": "吴学文",
        //   "tel": "17797173942",
        //   "context": "服务太差",
        //   "userId": "1292827282727",
        //   "storeId": "402019032924930007",
        // },
        data: obj, //动态数据
        success: function(res) {
          console.log(res);
          //成功情况下跳转
          wx.redirectTo({
            url: "/pages/viewComplaint/viewComplaint"
          });
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
  },
  onChange: function(e) {
    console.log(e);
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


  onRoomConfirm: function (e) {
    console.log("onConfirm", e);
    this.setData({
      roomName: e.detail.value,
      roomId: this.data.roomIdArr[e.detail.index],
      roomShow: false
    });
  },
  onRoomCancel: function (e) {
    this.setData({
      roomShow: false
    });
  },
  chooseRoom: function (e) {
    this.setData({
      roomShow: true
    });
  },

  afterRead: function(event) {

    const {
      file
    } = event.detail;
    let _that = this;
    const {
      photoList = []
    } = this.data;
    photoList.push(file);
    this.setData({
      photoList
    });

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    factory.base64.urlTobase64(file.path).then(function(_baseInfo) {
      _that.data.photos.push(_baseInfo);
    });
    console.log("data信息：", this.data);
  },
  removePhoto: function (e) {
    console.log(e.detail.index);
    let _photoList = [];
    this.data.photoList.forEach(function (item, index) {
      if (index != e.detail.index) {
        _photoList.push(item);
      }
    });
    let _photos = [];
    this.data.photos.forEach(function (item, index) {
      if (index != e.detail.index) {
        _photos.push(item);
      }
    });

    this.setData({
      photos: _photos,
      photoList: _photoList
    });
  },
})