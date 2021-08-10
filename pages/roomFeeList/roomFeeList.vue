<template>
	<view>
		<view class="header_fixed">
			<scroll-view v-if="rooms.length <3 && rooms.length >1" class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.roomId==curRoom.roomId?'text-green cur':''" v-for="(item,index) in rooms"
					 :key="index" @tap="switchRoom(item)" :data-id="index">
						{{item.floorNum}}栋{{item.unitNum}}单元{{item.roomNum}}室
					</view>
				</view>
			</scroll-view>
			<scroll-view v-if="rooms.length >2" scroll-x class="bg-white nav" scroll-with-animation scroll-left="true">
				<view class="cu-item flex-sub" :class="item.roomId==curRoom.roomId?'text-green cur':''" v-for="(item,index) in rooms"
				 :key="index" @tap="switchRoom(item)" :data-id="index">
					{{item.floorNum}}栋{{item.unitNum}}单元{{item.roomNum}}室
				</view>
			</scroll-view>
		</view>
		<view v-if="rooms.length == 1" class="block__title">{{rooms[0].floorNum}}栋{{rooms[0].roomNum}}室</view>
		<view v-if="rooms.length > 1" class="margin-header-top"></view>
		<view v-if="noData == false">
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
		<view class=" bg-white  border flex justify-end" style="position: fixed;width: 100%; bottom: 0;">
			<view class="btn-group line-height">
				<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="toRoomOweFee()">欠费缴费</button>
				
			</view>
		</view>
	</view>
</template>

<script>
	// pages/payParkingFeeList/payParkingFeeList.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	import noDataPage from '@/components/no-data-page/no-data-page.vue'

	import {
		getRooms
	} from '../../api/room/roomApi.js'

	import {
		getRoomFees
	} from '../../api/fee/feeApi.js'
	

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
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
		},
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
			getRooms().then(data => {
				let _rooms = data.rooms;
				this.rooms = _rooms;
				let _owner = data.owner;
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
					communityId: _room.communityId,
					state: '2008001'
				}
				_that.moreRooms = [];
				getRoomFees(_objData, _room)
					.then((moreRooms) => {
						_that.moreRooms = moreRooms;
						_that.noData = false;
					}, () => {
						_that.noData = true;
					})

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
			},
			toRoomOweFee:function(){
				if(this.vc.isEmpty(this.curRoom.roomId)){
					uni.showToast({
						icon:'none',
						title:'没有房屋'
					});
					return;
				}
				this.vc.navigateTo({
					url:'/pages/roomOweFee/roomOweFee?roomId='+this.curRoom.roomId
				});
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
	.cu-btn.lgplus {
		padding: 0 20px;
		font-size: 18px;
		height: 100upx;
	
	}
	
	.cu-btn.sharp {
		border-radius: 0upx;
	}
	
	.line-height {
		line-height: 100upx;
	}
</style>
