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
			</view>
		</scroll-view>
	</view>

	</view>
</template>

<script>
	// pages/payParkingFee/payParkingFee.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const WexinPayFactory = require('../../factory/WexinPayFactory.js');

	import {
		getTempCarFeeOrder
	} from '../../api/fee/feeApi.js'
	import {
		isNotNull
	} from '../../utils/StringUtil.js'
	import {
		refreshUserOpenId
	} from '../../api/user/userApi.js'
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
			if (!isNotNull(this.openId)) {
				//刷新 openId
				this._refreshWechatOpenId();
				return;
			}
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
				})
			},
			onPayFee: function() {
				let _receivedAmount = this.receivableAmount;
				wx.showLoading({
					title: '支付中'
				});
				let _tradeType = 'JSAPI';
				let _objData = {
					cycles: this.feeMonth,
					communityId: this.communityId,
					feeId: this.feeId,
					feeName: '物业费',
					receivedAmount: _receivedAmount,
					tradeType: _tradeType,
					appId: this.appId,
					payerObjId: this.roomId,
					payerObjType: 3333,
					endTime: this.formatEndTime
				};
				context.request({
					url: constant.url.preOrder,
					header: context.getHeaders(),
					method: "POST",
					data: _objData,
					//动态数据
					success: function(res) {
						if (res.statusCode == 200 && res.data.code == '0') {
							let data = res.data; //成功情况下跳转
							WexinPayFactory.wexinPay(data, function() {
								uni.showToast({
									title: "支付成功",
									duration: 2000
								});
								uni.navigateBack({});
							});
							wx.hideLoading();
							return;
						}
						wx.hideLoading();
						wx.showToast({
							title: "缴费失败",
							icon: 'none',
							duration: 2000
						});
					},
					fail: function(e) {
						wx.hideLoading();
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			_refreshWechatOpenId: function() {
				let _redirectUrl = window.location.href;
				refreshUserOpenId({
					redirectUrl: _redirectUrl,
					wAppId: this.appId
				}).then(_data => {

				});
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
