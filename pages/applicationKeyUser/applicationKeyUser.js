// pages/applicationKeyUser/applicationKeyUser.js

const context = require('../../context/Java110Context.js');
const util = context.util;
const factory = context.factory;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    locations:[],
    communityId:'',
    showTypeCd:false,
    typeCdList: ['业主', '家庭成员','租客'],
    typeCdName:'业主',
    sexList:['男','女'],
    showSex:false,
    showExpiry: false,
    expiryList:['一个月','半年','一年'],
    
    photoList:[],
    name:'',
    age: null,
    sex: '男',
    typeCd: 0,
    idCard:'',
    startTime: null,
    endTime:null,
    tel:'',
    photos: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let _that = this;
    context.getOwner(function(_owner){
        _that.setData({
          name:_owner.appUserName,
          idCard:_owner.idCard,
          tel:_owner.link
        });

    });

    this.setData({
      locations: JSON.parse(options.locations),
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
    let _startTime = util.date.formatTime(new Date());
    this.setData({
      startTime: _startTime
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
  bindInput: function (e) {
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
  sendMsgCode: function () {

  },
  /**
   * 选择身份
   */
  chooseTypeCd:function(){
      this.setData({
        showTypeCd:true
      });
  },
  onConfirm: function (e) {
    console.log("onConfirm", e);
    let _typeCd = "";
    if(e.detail.index == 0){
      _typeCd = "10004";
    } else if (e.detail.index == 1){
      _typeCd = "10005";
    }else{
      _typeCd = "10006";
    }
    this.setData({
      showTypeCd: false,
      typeCd: _typeCd,
      typeCdName: e.detail.value
    });
  },
  onChange: function (e) {
    console.log(e);
  },
  onCancel: function (e) {
    this.setData({
      showTypeCd: false
    });
  },
  chooseSex:function(){
    this.setData({
      showSex: true
    });
  },
  onSexConfirm: function (e) {
    console.log("onConfirm", e);
  
    this.setData({
      showSex: false,
      sex: e.detail.value
    });
  },
  onSexChange: function (e) {
    console.log(e);
  },
  onSexCancel: function (e) {
    this.setData({
      showSex: false
    });
  },
  chooseExpiry: function () {
    this.setData({
      showExpiry: true
    });
  },
  onExpiryConfirm: function (e) {
    console.log("onConfirm", e);
    let _endTime = null;
    if (e.detail.value == '一个月'){
      _endTime = util.date.formatTime(util.date.addMonth(new Date(),1));
    } else if (e.detail.value == '半年'){
      _endTime = util.date.formatTime(util.date.addMonth(new Date(), 6));
    }else{
      _endTime = util.date.formatTime(util.date.addYear(new Date(), 1));
    }

    this.setData({
      showExpiry: false,
      expiry: e.detail.value,
      endTime: _endTime
    });
  },
  onExpiryChange: function (e) {
    console.log(e);
  },
  onExpiryCancel: function (e) {
    this.setData({
      showExpiry: false
    });
  },
  afterRead(event) {
    const { file } = event.detail;
    let _that = this;
    const { photoList = [] } = this.data;
    photoList.push(file);
    this.setData({ photoList });
    
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    factory.base64.urlTobase64(file.path).then(function(_baseInfo){
      _that.data.photos.push(_baseInfo);
    });
    console.log("data信息：",this.data);
  },
  removePhoto:function(e){
    console.log(e.detail.index);
  },
  saveApplicationKey:function(){
    //保存钥匙信息
    console.log(this.data);
    let _objData = {
      name: this.data.name,
      age: this.data.age,
      sex: this.data.sex,
      typeCd: this.data.typeCd,
      idCard: this.data.idCard,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      tel: this.data.tel,
      photos: this.data.photos,
    };
    let msg = '';
    if(_objData.name == ''){
      msg = '请填写名称';
    }
    if (_objData.age == null){
      msg = "请填写年龄"
    }
    if (_objData.sex == null) {
      msg = "请选择性别"
    }
    if (_objData.typeCd == null) {
      msg = "请选择身份"
    }
    if (_objData.idCard == null) {
      msg = "请填写身份证"
    }
    

  }
})