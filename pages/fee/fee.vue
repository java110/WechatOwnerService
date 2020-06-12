<template>
<view>

  <view class="block__title">物业费信息</view>
  <view class="ppfl_c" v-for="(item, idx) in rooms" :key="idx">
    <van-panel :title="item.unitNum + '单元' + item.roomNum + '号房间'" desc :status="item.feeStateName + '状态'" use-footer-slot>
      <view class="ppfl_context">    
        <van-row>
          <van-col span="5">小区:</van-col>
          <van-col span="15">{{communityName}}</van-col>
        </van-row>
        <van-row>
          <van-col span="5">业主:</van-col>
          <van-col span="7">{{item.ownerName}}</van-col>
        </van-row>
        <van-row>          
          <van-col span="5">总金额:</van-col>
          <van-col span="7">{{item.additionalAmount}}</van-col>
        </van-row>
        <van-row>
          <van-col span="5">到期时间:</van-col>
          <van-col span="7">{{item.endTime}}</van-col>
        </van-row>
      </view>
      <!-- <view>
        <button class="button" size="mini" type="default" catchtap="gotoDetail" data-item="{{item}}">付款</button>
        <button class="button" size="mini" type="default" catchtap="gotoDetail" data-item="{{item}}">反馈</button>
      </view> -->
      <view slot="footer" class="ppfl_footer">
        <van-button size="small" class="ppfl_footer_his" :data-item="item">缴费历史</van-button>
        <van-button size="small" type="primary" v-if="item.state == 'Y'" @click="payFee" :data-item="item">缴费</van-button>
      </view>
    </van-panel>
  </view>
</view>
</template>

<script>
const context = require("../../context/Java110Context.js");
const constant = context.constant;
const util = context.util;

export default {
  data() {
    return {
      rooms: [],
      page: 1,
      totalPage: 0,
      loading: false,
      communityId: "",
      communityName: ""
    };
  },

  components: {},
  props: {},
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
  methods: {
    /**
     * 加载业主房屋信息
     */
    loadOwnerHouse: function () {
      let _that = this;

      context.getRooms().then(res => {
        if (res) {
          console.log("res=", res);
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
            _that.loadParkingSpaceFeeFun(_owner, _room[_psIndex], function (_fee) {
              let _tmpEndTime = _fee.endTime.replace(/\-/g, "/");

              let _endTime = new Date(_tmpEndTime);

              _room[_psIndex].endTime = util.date.formatDate(_endTime);

              let _now = new Date();

              if (_endTime > _now) {
                _room[_psIndex].feeStateName = '正常';
                _room[_psIndex].state = 'N';
              } else {
                _room[_psIndex].feeStateName = '欠费';
                _room[_psIndex].state = 'Y';
              }

              _room[_psIndex].additionalAmount = _fee.additionalAmount;
              _room[_psIndex].feeId = _fee.feeId;
              _room[_psIndex].ownerName = _fee.ownerName;
              console.log("_room[_psIndex]=", _room[_psIndex]);

              _that.setData({
                rooms: _room
              });
            });
          }

          _that.setData({
            rooms: res.data.rooms
          });
        }
      });
    },
    loadParkingSpaceFeeFun: function (_owner, _room, callBack) {
      let _that = this;

      let _objData = {
        page: 1,
        row: 10,
        roomId: _room.roomId,
        communityId: _owner.communityId,
        feeTypeCd: '888800010001'
      };
      context.request({
        url: constant.url.queryFeeByOwner,
        header: context.getHeaders(),
        method: "GET",
        data: _objData,
        //动态数据
        success: function (res) {
          console.log("res====>>>", res);

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
          });
        }
      });
    },
    setData: function (obj, callback) {
      let that = this;
      let keys = [];
      let val, data;
      let reg = /[d+]/;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          if (index + 1 == keys.length) {
            if (reg.test(key2)) {
              let re = /(.*?)[(d+)]/.exec(key2);
              let name = re[1];
              let kk = re[2];
              data = data[name];
              data[kk] && that.$set(data, kk, val);
            } else {
              data[key2] && that.$set(data, key2, val);
            }
          } else {
            if (reg.test(key2)) {
              let re = /(.*?)[(d+)]/.exec(key2);
              let name = re[1];
              let kk = re[2];
              data = data[name][kk];
            } else if (data[key2]) {
              that.$set(data, key2, {});
              data = data[key2];
            }
          }
        });
      });
      callback && callback();
    }
  }
};
</script>
<style>
@import "./fee.css";
</style>