// pages/index/index.js
const context = require("../../context/Java110Context.js");
const constant = context.constant;
import Dialog from '../../lib/dialog/dialog';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    communityId:'',
    ad: [],
    notices: [
    ],
    categoryList: {
      pageone: [{
        name: "物业费",
        src: "/images/1.png",
        href: "/pages/roomFeeList/roomFeeList"
      }, {
        name: "停车费",
        src: "/images/2.png",
          href:"/pages/payParkingFeeList/payParkingFeeList"
      }, {
        name: "投诉建议",
        src: "/images/3.png",
        href:"/pages/complaint/complaint"
      }, {
        name: "家庭成员",
        src: "/images/4.png",
        href: "/pages/familyList/familyList"
      }, {
        name: "报修",
        src: "/images/5.png",
        href: "/pages/repair/repair"
      }, {
        name: "报修2",
        src: "/images/5.png",
        href: "/pages/repair/repair2"
      }, {
        name: "房屋出租",
        src: "/images/6.png"
      }, {
        name: "公告",
        src: "/images/7.png",
        href: "/pages/notice/index"
        }]

    },
    selected: 0,
    mask1Hidden: true,
    mask2Hidden: true,
    animationData: "",
    location: "",
    characteristicSelected: [false, false, false, false, false, false, false],
    discountSelected: null,
    selectedNumb: 0,
    sortSelected: "综合排序"
  },
  finish: function() {
    var that = this;
  },
  sortSelected: function(e) {
    var that = this;
  },
  onGotUserInfo: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  clearSelectedNumb: function() {
    this.setData({
      characteristicSelected: [false],
      discountSelected: null,
      selectedNumb: 0
    })
  },
  characteristicSelected: function(e) {
    var info = this.data.characteristicSelected;
    info[e.currentTarget.dataset.index] = !info[e.currentTarget.dataset.index];
    this.setData({
      characteristicSelected: info,
      selectedNumb: this.data.selectedNumb + (info[e.currentTarget.dataset.index] ? 1 : -1)
    })
    console.log(e.currentTarget.dataset.index);
  },
  discountSelected: function(e) {
    if (this.data.discountSelected != e.currentTarget.dataset.index) {
      this.setData({
        discountSelected: e.currentTarget.dataset.index,
        selectedNumb: this.data.selectedNumb + (this.data.discountSelected == null ? 1 : 0)
      })
    } else {
      this.setData({
        discountSelected: null,
        selectedNumb: this.data.selectedNumb - 1
      })
    }
  },
  onTapTag: function(e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    });
  },
  mask1Cancel: function() {
    this.setData({
      mask1Hidden: true
    })
  },
  mask2Cancel: function() {
    this.setData({
      mask2Hidden: true
    })
  },
  onOverallTag: function() {
    this.setData({
      mask1Hidden: false
    })
  },
  onFilter: function() {
    this.setData({
      mask2Hidden: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _that = this;
    console.log(context);
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

      //查询小区文化
      _that._loadActivites();

      //查询小区广告
      _that._loadCommunityAdvertPhoto();

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
    var _that = this;

    _that.setData({
      location: wx.getStorageSync('location')
    });
    _that._judgeBindOwner();
  },

  _judgeBindOwner:function(){
    context.getOwner(function(_owner){
      if(_owner == null){
        Dialog.confirm({
          title: '温馨提示',
          message: '您还没有绑定业主，请先绑定业主或取消查看演示环境'
        }).then(() => {
          // on confirm
          wx.navigateTo({
            url: '../bindOwner/bindOwner',
          })
        }).catch(() => {
          // on cancel
          //这里写死 演示数据
          let _ownerInfo = { "appUserId": "982020011296320035", "appUserName": "吴学文", "communityId": "7020181217000001", "communityName": "万博家博园（城西区）", "idCard": "632126199109162011", "link": "18999999999", "memberId": "772019092507000013", "state": "12000", "stateName": "审核成功" };

          wx.setStorageSync(constant.mapping.OWNER_INFO, _ownerInfo);
          let _currentCommunityInfo = {
            communityId: _ownerInfo.communityId,
            communityName: _ownerInfo.communityName
          }
          wx.setStorageSync(constant.mapping.CURRENT_COMMUNITY_INFO, _currentCommunityInfo);
        });
      } 
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
  /**
   * 加载活动
   * 第一次加载是可能没有小区 则直接下载固定小区
   * 
   */
  _loadActivites:function(){
    let _that = this;
    let _objData = {
      page:1,
      row:5,
      communityId:this.data.communityId
    };
    context.request({
      url: constant.url.listActivitiess,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function (res) {
        console.log("请求返回信息：", res);
        if (res.statusCode == 200) {

          let _activites = res.data.activitiess;
          let _acts = [];
          _activites.forEach(function(_item){
            _item.src = constant.url.filePath + "?fileId=" + _item.headerImg +"&communityId="+_that.data.communityId+"&time="+new Date();
            _acts.push(_item);
          });


          _that.setData({
            notices: _acts
          });
          
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
  },
  _loadCommunityAdvertPhoto:function(){
    let _that = this;
    let _objData = {
      page: 1,
      row: 5,
      communityId: this.data.communityId
    };
    context.request({
      url: constant.url.listAdvertPhoto,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function (res) {
        console.log("请求返回信息：", res);
        if (res.statusCode == 200) {

          let _advertPhotos = res.data;
          let _aPhotos = [];
          _advertPhotos.forEach(function (_item) {
            _item.url = constant.url.hcBaseUrl + _item.url + "&time=" + new Date();
            _aPhotos.push(_item);
          });

          _that.setData({
            ad: _aPhotos
          });

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
  },
  _moreActivities:function(){
    wx.navigateTo({
      url: '/pages/activites/activites',
    })
  }
})