const context = require('../../context/Java110Context.js');

const constant = context.constant;

Page({
  data: {
    rooms: [],
    page: 1,
    totalPage: 0,
    loading: false
  },
  // onLoad: function () {
  //   this.getTable(1);
  // },

  // onShow: function () {
  //   let that = this;
  // },
  // getTable: function (page, override) {
  //   console.log(888888888);
  //   let that = this;
  //   this.setData({
  //     loading: true
  //   })
  //   return this.request({
  //     storeTypeCd: '800900000003',
  //     storeId: '402019032924930007',
  //     userName: 'wuxw',
  //     userId: '30518940136629616640',
  //     complaintId: '111',
  //     typeCd: '809002',
  //     complaintName: '111',
  //     page: '1',
  //     row: '10',
  //     communityId: '7020181217000001'
  //     // "page": page,
  //     // "row": 10
  //   }).then(res => {
  //     console.log(res, 9999999999999)
  //     that.setData({
  //       tableData: override ? res.data.complaints : this.data.tableData.concat(res.data.complaints),
  //       totalPage: res.data.records,
  //       page: page,
  //       loading: false
  //     })
  //   })
  // },
  // goAdd: function (e) {
  //   wx.navigateTo({
  //     url: "/pages/complaint/complaint"
  //   })
  // },
  // gotoDetail: function (e) {
  //   wx.navigateTo({
  //     url: "/pages/repairList/detail/detail?item=" + JSON.stringify(e.currentTarget.dataset.item)
  //   })
  // },
  // onPullDownRefresh: function () {
  //   // 上拉刷新
  //   if (!this.data.loading) {
  //     this.getTable(1, true).then(() => {
  //       // 处理完成后，终止下拉刷新
  //       wx.stopPullDownRefresh()
  //     })
  //   }
  // },
  // onReachBottom: function () {
  //   console.log(1, !this.data.loading, this.data.page < this.data.totalPage);
  //   // 下拉触底，先判断是否有请求正在进行中
  //   // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
  //   if (!this.data.loading && this.data.page < this.data.totalPage) {
  //     this.getTable(this.data.page + 1)
  //   }
  // },
  // //封装请求
  // request: function (data) {
  //   return new Promise((resolve, reject) => {
  //     wx.request({
  //       url: constant.url.listComplaints,
  //       header: context.getHeaders(),
  //       method: "GET",
  //       data: data,
  //       success: function (res) {
  //         if (res.statusCode == 200) {
  //           resolve(res);
  //         }
  //       },
  //       fail: function (req) {
  //         console.log(constant.url.listComplaints, req);
  //       }
  //     })
  //   })
  // },
  onLoad: function () {
    this.loadOwnerHouse(1);
    let _communityInfo = context.getCurrentCommunity();
    this.setData({
      communityId: _communityInfo.communityId,
      communityName: _communityInfo.communityName       
    });
  },
  /**
   * 加载业主房屋信息
   */
  loadOwnerHouse: function () {
    let _that = this;
    context.getRooms().then(res => {
      if (res) {
        console.log("res=",res);
        let _room = res.data.rooms;
        let _owner = res.data.owner;
        if (_room.length == 0) {
          wx.showToast({
            title: "未查询到房间",
            icon: 'none',
            duration: 2000
          });
          return;
        }
        for (let _psIndex = 0; _psIndex < _room.length; _psIndex++) {
          _that._loadParkingSpaceFee(_owner,_room[_psIndex], function (_fee) {

            let _tmpEndTime = _fee.endTime.replace(/\-/g, "/")
            let _endTime = new Date(_tmpEndTime);

            _parkingSpaces[_psIndex].endTime = util.date.formatDate(_endTime);


            let _now = new Date();

            if (_endTime > _now) {
              _parkingSpaces[_psIndex].feeStateName = '正常'
            } else {
              _parkingSpaces[_psIndex].feeStateName = '欠费'
            }
            _parkingSpaces[_psIndex].additionalAmount = _fee.additionalAmount;
            _parkingSpaces[_psIndex].feeId = _fee.feeId;
            _that.setData({
              parkingSpaces: _parkingSpaces
            });
          });
        }
        _that.setData({
          rooms: res.data.rooms          
        });
      }
    })
  },
  _loadParkingSpaceFee: function (_owner,_room, callBack) {
    let _that = this;
    let _objData = {
      page: 1,
      row: 10,
      roomId: _room.roomId,
      communityId: _owner.communityId
    }
    context.request({
      url: constant.url.queryFeeByOwner,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          //成功情况下跳转
          let _roomFee = res.data;
          callBack(_roomFee);

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