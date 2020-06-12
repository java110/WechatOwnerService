<template>
	<view>
		<view class="header_fixed">
			<scroll-view v-if="rooms.length <5 && rooms.length >1" class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.roomId==curRoom.roomId?'text-green cur':''" v-for="(item,index) in rooms"
					 :key="index" @tap="switchRoom(item)" :data-id="index">
						{{item.floorNum}}栋{{item.roomNum}}室
					</view>
				</view>
			</scroll-view>
			<scroll-view v-if="rooms.length >4" scroll-x class="bg-white nav" scroll-with-animation scroll-left="true">
				<view class="cu-item flex-sub" :class="item.roomId==curRoom.roomId?'text-green cur':''" v-for="(item,index) in rooms" :key="index"
				 @tap="switchRoom(item)" :data-id="index">
					{{item.floorNum}}栋{{item.roomNum}}室
				</view>
			</scroll-view>
		</view>
		<view v-if="rooms.length == 1" class="block__title">{{rooms[0].floorNum}}栋{{rooms[0].roomNum}}室</view>
		<view v-if="rooms.length > 1" class="margin-header-top"></view>
		<view v-if="noData == false" >
			<view v-for="(item,index) in moreRooms" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding-top padding-left padding-right">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>{{item.feeName}}</view>
					<view class="text-gray">{{item.feeStateName}}</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">费用编码</view>
					<view class="text-gray">{{item.feeId}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">楼层</view>
					<view class="text-gray">{{item.layer}}层</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">每月金额</view>
					<view class="text-gray">{{item.amount}}元</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">费用到期</view>
					<view class="text-gray">{{item.endTime}}</view>
				</view>
				<view class="solid-top flex justify-end margin-top padding-top-sm padding-bottom-sm">
					<button class="cu-btn sm line-gray" @click="payFeeDetail(item)">历史缴费</button>
					<button class="cu-btn sm bg-green margin-left" @click="payFee(item)">缴费</button>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	// pages/payParkingFeeList/payParkingFeeList.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const util = context.util;
	import noDataPage from '@/components/no-data-page/no-data-page.vue'

	export default {
		data() {
			return {
				rooms: [],
				curRoom: {},
				moreRooms: [],
				needFefresh: true,
				noData: false
			};
		},

		components: {
			noDataPage
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let _that = this;
			if (!this.needFefresh) {
				this.needFefresh = true;
				return;
			}
			this.noData = false;
			context.getRooms().then(res => {
				let _rooms = res.data.rooms;
				this.rooms = _rooms;
				let _owner = res.data.owner;
				_that.moreRooms = [];
				if (_rooms.length == 0) {
					_that.noData = true;
					return;
				}
				_rooms.forEach(function(_room) {
					_room.communityId = _owner.communityId;
					_room.communityName = _owner.communityName;
				});
				_that.curRoom = _rooms[0];
				_that._loadRoomFee();
			});
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {

			payFee: function(_item) {
				wx.navigateTo({
					url: '/pages/roomFee/roomFee?fee=' + JSON.stringify(_item),
				})
			},
			_loadRoomFee: function() {
				let _that = this;
				let _room = this.curRoom;
				let _objData = {
					page: 1,
					row: 30,
					payerObjId: _room.roomId,
					feeTypeCd: '888800010001',
					communityId: _room.communityId
				}
				_that.moreRooms = [];
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
							if(_roomFees.length < 1){
								_that.noData = true;
							}
							_roomFees.forEach(function(_roomFee) {
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
								_that.moreRooms.push(_tmpRoom);
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
			payFeeDetail: function(_item) {
				wx.navigateTo({
					url: '/pages/payFeeDetail/payFeeDetail?fee=' + JSON.stringify(_item),
				});
			},
			switchRoom: function(_room) {
				this.curRoom = _room;
				this.noData = false;
				this._loadRoomFee();	
			}
		}
	};
</script>
<style>
	@import "./roomFeeList.css";

	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.solid-top::after {
		border-top: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.margin-header-top {
		height: 100upx;
	}
	/*  #ifdef  APP-PLUS || MP-WEIXIN  */
	.header_fixed {
		position: fixed;
		top: 0upx;
		left: 0;
		width: 100%;
		z-index: 2;
	}
	/*  #endif  */
	/*  #ifdef  H5  */
	.header_fixed {
		position: fixed;
		top: 80upx;
		left: 0;
		width: 100%;
		z-index: 2;
	}
	/*  #endif  */
</style>
