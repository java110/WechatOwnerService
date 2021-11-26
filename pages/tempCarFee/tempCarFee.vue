<template>
	<view>
		<scroll-view scroll-y>
			<view class="block__title">停车费</view>
			<view class="cu-list menu fee-last">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">车辆</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{carNum }}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">查询时间</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{queryTime }}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">进场时间</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{inTime }}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">停车时间</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{stopTimeTotal }}分钟</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">金额</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{amount + '元' }}</text>
					</view>
				</view>
				<view class="cu-bar btn-group" style="margin-top: 30px;">
					<button @click="onPayFee" :disabled="amount == 0"
						class="cu-btn bg-green shadow-blur round lg">确认缴费</button>
				</view>
				<view class="cu-bar btn-group" style="margin-top: 30px;">
					<button @click="onReQuery()"
						class="cu-btn bg-grey shadow-blur round lg">重新查询</button>
				</view>
			</view>
		</scroll-view>
	</view>

	</view>
</template>

<script>
	// pages/payParkingFee/payParkingFee.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	// #ifdef H5
	const WexinPayFactory = require('../../factory/WexinPayFactory.js');
	// #endif
	import {
		getTempCarFeeOrder,
		toPayTempCarFee
	} from '../../api/fee/feeApi.js'

	export default {
		data() {
			return {
				paId: '',
				carNum: '',
				stopTimeTotal: 0,
				inTime: '',
				amount: 0.0,
				queryTime: '',
				appId: '',
				openId: '',
				inoutId:''
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.openId = options.openId;
			this.paId = options.paId;
			this.carNum = options.carNum;
			this.appId = options.appId;
			this._loadTempCarFee();
		},
		methods: {
			_loadTempCarFee: function() {
				let _that = this;
				getTempCarFeeOrder({
					paId: this.paId,
					carNum: this.carNum
				}).then(_data => {
					if (_data.code != 0) {
						uni.showToast({
							icon: 'none',
							title: '未查到停车费'
						})
						return;
					}
					let data = _data.data;
					_that.stopTimeTotal = data.stopTimeTotal;
					_that.inTime = data.inTime;
					_that.amount = data.amount;
					_that.queryTime = data.queryTime;
					_that.inoutId = data.orderId;
				})
			},
			onPayFee: function() {
				let _receivedAmount = this.receivableAmount;
				wx.showLoading({
					title: '支付中'
				});
				let _tradeType = 'JSAPI';
				let _objData = {
					carNum: this.carNum,
					openId: this.openId,
					paId: this.paId,
					feeName: '停车费',
					tradeType: _tradeType,
					appId: this.appId,
					inoutId: this.inoutId
				};
				toPayTempCarFee(_objData)
				.then(_data=>{
					if (_data.code == '0') {
						// #ifdef H5	
						WexinPayFactory.wexinPay(_data, function() {
							uni.showToast({
								title: "支付成功",
								duration: 2000
							});
							uni.navigateBack({
								delta:1
							});
						});
						// #endif
						wx.hideLoading();
						return;
					}
					wx.hideLoading();
					wx.showToast({
						title: "缴费失败",
						icon: 'none',
						duration: 2000
					});
				})
			},
			onReQuery:function(){
				uni.navigateTo({
					url: '/pages/tempParkingFee/tempParkingFee?paId=' + _that.paId + "&appId=" + _that.appId + "&openId=" + this.openId
				})
			}
			
		}
	};
</script>
<style>
	.ppf_item {
		padding: 0rpx 0rpx 0rpx 0rpx;
	}

	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}

	.block__bottom {
		height: 180rpx;
	}

	.fee-last {
		margin-bottom: 200upx;
	}

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
