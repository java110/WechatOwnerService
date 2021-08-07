<template>
	<view>
		<view>
			<view class="header_fixed">
				<!-- <scroll-view v-if="parkingSpaces.length <5 && parkingSpaces.length >1" class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="item.psId==curParkingSpace.psId?'text-green cur':''" v-for="(item,index) in parkingSpaces"
						 :key="index" @tap="switchParkingSpace(item)" :data-id="index">
							{{item.carNum}}({{item.num}}车位)
						</view>
					</view>
				</scroll-view> -->
				<scroll-view v-if="parkingSpaces.length >1" scroll-x class="bg-white nav" scroll-with-animation scroll-left="true">
					<view class="cu-item flex-sub" :class="item.psId==curParkingSpace.psId?'text-green cur':''" v-for="(item,index) in parkingSpaces"
					 :key="index" @tap="switchParkingSpace(item)" :data-id="index">
						{{item.carNum}}({{item.num}}车位)
					</view>
				</scroll-view>
			</view>
			<view v-if="parkingSpaces.length == 1" class="block__title">{{parkingSpaces[0].carNum}}({{parkingSpaces[0].num}}车位)</view>
			<view v-if="parkingSpaces.length > 1" class="margin-header-top"></view>
			<view v-if="noData == false" class="margin-bottom-100">
				<view v-for="(item,index) in moreParkingSpaces" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding-top padding-left padding-right">
					<view class="flex padding-bottom-xs solid-bottom justify-between">
						<view>{{item.feeName}}</view>
						<view class="text-gray">{{item.feeStateName}}</view>
					</view>
					<view class="flex margin-top justify-between">
						<view class="text-gray">费用编码</view>
						<view class="text-gray">{{item.feeId}}</view>
					</view>
					<view class="flex margin-top justify-between">
						<view class="text-gray">车牌号码</view>
						<view class="text-gray">{{curParkingSpace.carNum}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">状态</view>
						<view class="text-gray">{{item.stateName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">每月金额</view>
						<view class="text-gray">{{item.feePrice}}元</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">到期时间</view>
						<view class="text-gray">{{item.endTime}}</view>
					</view>
					<view class="solid-top flex justify-end margin-top padding-top-sm padding-bottom-sm">
						<!-- <button class="cu-btn sm line-gray" @click="payFeeDetail(item)">历史缴费</button> -->
						<button class="cu-btn sm bg-green margin-left" @click="payFee(item)">缴费</button>
					</view>
				</view>
			</view>
			<view v-else>
				<no-data-page></no-data-page>
			</view>
			
			<view class=" bg-white  border flex justify-end" style="position: fixed;width: 100%; bottom: 0;">
				<view class="btn-group line-height">
					<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="toCarOweFee()">欠费缴费</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/payParkingFeeList/payParkingFeeList.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	//const util = context.util;
	
	import {formatDate} from '../../utils/DateUtil.js'
	import noDataPage from '@/components/no-data-page/no-data-page.vue'

	export default {
		data() {
			return {
				parkingSpaces: [],
				curParkingSpace: {},
				moreParkingSpaces: [],
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
			context.getOwner(function(_owner) {
				_that._loadParkingSpace(_owner);
			});
		},
		methods: {
			payFee: function(_item) {
				this.vc.navigateTo({
					url: '/pages/payParkingFee/payParkingFee?fee=' + JSON.stringify(_item),
				})
			},
			_loadParkingSpace: function(_owner) {
				let _that = this;
				_that.moreParkingSpaces = [];
				let _objData = {
					page: 1,
					row: 10,
					ownerId: _owner.ownerId,
					communityId: _owner.communityId
				}
				context.request({
					url: constant.url.queryParkingSpacesByOwner,
					header: context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log(res);
						if (res.statusCode == 200) {
							//成功情况下跳转
							let _parkingSpaces = res.data.parkingSpaces;
							_that.parkingSpaces = _parkingSpaces;
							if (_parkingSpaces.length == 0) {
								_that.noData = true;
								return;
							}
							_that.curParkingSpace = _parkingSpaces[0];

							_that._loadParkingSpaceFee();
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
			_loadParkingSpaceFee: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 30,
					payerObjId: _that.curParkingSpace.carId,
					communityId: _that.curParkingSpace.communityId
				}

				_that.moreParkingSpaces = [];
				context.request({
					url: constant.url.queryFeeByOwner,
					header: context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						if (res.statusCode == 200) {
							//成功情况下跳转
							let _parkingSpaceFees = res.data.fees;
							if (_parkingSpaceFees.length < 1) {
								_that.noData = true;
							}
							_parkingSpaceFees.forEach(function(_fee) {
								let _tmpEndTime = _fee.endTime.replace(/\-/g, "/")
								let _endTime = new Date(_tmpEndTime);

								_fee.endTime = formatDate(_endTime);
								_fee.num = _that.curParkingSpace.num;
								let _now = new Date();
								if (_endTime > _now) {
									_fee.feeStateName = '正常'
								} else {
									_fee.feeStateName = '欠费'
								}
								_that.moreParkingSpaces.push(_fee);
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
				this.vc.navigateTo({
					url: '/pages/payFeeDetail/payFeeDetail?fee=' + JSON.stringify(_item),
				});
			},
			switchParkingSpace: function(_parkingSpace) {
				this.curParkingSpace = _parkingSpace;
				this.noData = false;
				this._loadParkingSpaceFee();
			},
			toCarOweFee:function(){
				if(this.vc.isEmpty(this.curParkingSpace.carId)){
					uni.showToast({
						icon:'none',
						title:'没有车辆'
					});
					return;
				}
				this.vc.navigateTo({
					url:'/pages/carOweFee/carOweFee?carId='+this.curParkingSpace.carId
				});
			}
		}
	};
</script>
<style>
	@import "./payParkingFeeList.css";

	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.solid-top::after {
		border-top: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.margin-header-top {
		height: 100upx;
	}
	
	.line-height {
	    line-height: 100rpx;
	}
	.cu-btn.lgplus {
	    padding: 0 20px;
	    font-size: 18px;
	    height: 100rpx;
	}
	.cu-btn.sharp {
	    border-radius: 0rpx;
	}
	.margin-bottom-100{
		margin-bottom: 100rpx;
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
	/**top: 80upx;**/
	.header_fixed {
		position: fixed;
		top: 0upx;
		left: 0;
		width: 100%;
		z-index: 2;
	}
	/*  #endif  */
</style>
