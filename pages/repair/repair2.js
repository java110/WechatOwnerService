// pages/enterCommunity/enterCommunity.js
const context = require('../../context/Java110Context.js')
const constant = context.constant;
const factory = context.factory;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    minDate: new Date().getTime(),
    bindDate: '',
    bindTime: '',
    roomCloums:[],
    roomIdArr:[],
    roomName:"",
    roomId: '',
    roomShow:false,
    columns: ['卧室报修', '管道报修', '客厅报修'],
    typeName: '',
    typeId: '',
    typeShow: false,
    timeShow:false,
    photoList: [],
    bindTel: '',
    context: '',
    bindRepairName: '',
    userId: '',
    storeId: '',
    photos: [],
    communityId:"",
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    }
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

  doRepair: function(e) {
  
    let obj = {
      "repairName": this.data.bindRepairName,
      "repairType": this.data.typeId,
      "appointmentTime": this.data.bindDate + " " + this.data.bindTime + ":00",
      "tel": this.data.bindTel,
      "roomId": this.data.roomId,
      "photos": [],
      "context": this.data.context,
      "userId": this.data.userId,
      "communityId": this.data.communityId,
      "bindDate": this.data.bindDate,
      "bindTime": this.data.bindTime
    }
  
    let _photos = this.data.photos;
    _photos.forEach(function(_item) {
      obj.photos.push({ "photo": _item });
    });

    let msg = "";
    if (obj.roomId == "") {
      msg = "请选择房屋";
    } else if (obj.repairType == "") {
      msg = "请选择报修类型";
    } else if (obj.bindRepairName == "") {
      msg = "请填写报修人";
    } else if (obj.tel == "") {
      msg = "请填写手机号";
    } else if (obj.bindDate == "") {
      msg = "请选择预约日期";
    }else if (obj.bindTime == "") {
      msg = "请选择预约时间";
    }else if (obj.context == "") {
      msg = "请填写投诉内容";
    }
    console.log(obj.roomId);

    if (msg != "") {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    } else {
      context.request({
        url: constant.url.saveOwnerRepair, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
        header: context.getHeaders(),
        method: "POST",
        data:obj, //动态数据
        success: function(res) {
          if (res.statusCode == 200) {
            wx.redirectTo({
              url: '/pages/myRepair/myRepair',
            });
            return;
          }
          wx.showToast({
            title: "服务器异常了",
            icon: 'none',
            duration: 2000
          })
        },
        fail:function(e){
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

  onTimeConfirm: function(e) {
    console.log("onConfirm", e);
    this.setData({
      bindTime: e.detail,
      timeShow: false
    });
  },
  onTimeCancel: function(e) {
    this.setData({
      timeShow: false
    });
  },
  chooseTime: function(e) {
    this.setData({
      timeShow: true
    });
  },

  onDateConfirm: function(e) {
    console.log("onConfirm", e);
    var oDate = new Date(e.detail * 1),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth() + 1,
    oDay = oDate.getDate();
    console.log("oYear", oYear);
    console.log("oMonth", oMonth);
    console.log("oDay", oDay);

    this.setData({
      bindDate:oYear +"-" +oMonth+"-" +oDay,
      dateShow: false
    });
  },
  onDateCancel: function(e) {
    this.setData({
      dateShow: false
    });
  },
  chooseDate: function(e) {
    this.setData({
      dateShow: true
    });
  },

  onTypeConfirm: function(e) {
    console.log("onConfirm", e);
    this.setData({
      typeName: e.detail.value,
      typeId: e.detail.index ? '809001' : '809002',
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