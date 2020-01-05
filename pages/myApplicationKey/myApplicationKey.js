// pages/myApplicationKey/myApplicationKey.js
const context = require('../../context/Java110Context.js');
const constant = context.constant;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applicationKeys:[],
    pwd:'请先申请钥匙',
    loactions:'没有门禁',
    endTime:'0000-00-00 00:00:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      let _idCard = _owner.idCard;
      let _communityId = _owner.communityId;
      _that.setData({
        idCard: _idCard,
        communityId: _communityId
      });
      _that.loadApplicationKey();
    });
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
  loadApplicationKey: function () {

    let _that = this;
    let _objData = {
      page: 1,
      row: 10,
      idCard: this.data.idCard,
      communityId: this.data.communityId
    }
    context.request({
      url: constant.url.listApplicationKeys,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          //成功情况下跳转
          let _applicationKeys = res.data.applicationKeys;
          if (_applicationKeys.length == 0) {
            wx.showToast({
              title: "未查询到钥匙",
              icon: 'none',
              duration: 2000
            });
            return;
          }

          _that.setData({
            applicationKeys: _applicationKeys
          });

          _that.showPwd();
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
  },
  showPwd:function(){
      let _applicationKeys = this.data.applicationKeys;
      let _pwd = '';
      let _loactions = '';
      let _endTime = '';

      for(let _akIndex = 0 ; _akIndex < _applicationKeys.length; _akIndex++){
        if (_applicationKeys[_akIndex].state != '10001'){
            continue;
        }

        _pwd = _applicationKeys[_akIndex].pwd;
        _loactions += (_applicationKeys[_akIndex].locationObjName+",");
        _endTime = _applicationKeys[_akIndex].endTime;
      }

      if(_pwd == ''){
        return ;
      }

      this.setData({
        pwd: _pwd,
        loactions: _loactions,
        endTime: _endTime
      });
  }
})