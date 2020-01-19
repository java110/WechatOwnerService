const context = require('../../context/Java110Context.js');

const constant = context.constant;

Page({
  data: {
    owners: [],
    page: 1,
    totalPage: 0,
    loading: false,
    communityId:'',
    ownerId:''
  },
  onLoad: function() {
    let that = this;
  },

  onShow: function () {
    let that = this;
    context.getOwner(function (_owner) {
      console.log(_owner.communityId, 99999999);
      that.setData({
        communityId: _owner.communityId,
        ownerId: _owner.memberId
      })
      that.getTable(1);
    });
  },
  getTable: function (page, override) {
    let that = this;
    this.setData({
      loading: true
    });
    let _paramIn = {
      "communityId": that.data.communityId,
      "ownerId": that.data.ownerId
    };
    context.request({
      url: constant.url.queryOwnerMembers,
      header: context.getHeaders(),
      method: "GET",
      data: _paramIn,
      success: function (res) {
        if (res.statusCode == 200) {
          let _owners = res.data.owners;
          that.setData({
            owners : _owners,
            loading: false
          })
        }
      },
      fail:function(e){
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    })
  }, 
  goAdd: function (e) {
    wx.navigateTo({
      url: "/pages/family/family"
    })
  },
  gotoDetail: function (e) {
    wx.navigateTo({
      url: "/pages/repairList/detail/detail?item=" + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  onPullDownRefresh: function () {
    // 上拉刷新
    if (!this.data.loading) {
      this.getTable(1, true).then(() => {
        // 处理完成后，终止下拉刷新
        wx.stopPullDownRefresh()
      })
    }
  },
  onReachBottom: function () {
    console.log(1, !this.data.loading,this.data.page < this.data.totalPage);
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (!this.data.loading && this.data.page < this.data.totalPage) {
      this.getTable(this.data.page + 1)
    }
  }
})