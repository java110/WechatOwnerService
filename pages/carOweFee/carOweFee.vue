<template>
	<view>
		<scroll-view scroll-y>
			<view class="block__title">车辆信息</view>
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">车牌号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{carNum}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">车位</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{areaNum}}停车场{{num}}停车位</text>
					</view>
				</view>
			</view>
			<view class="block__title" v-if="fees.length > 0">欠费信息</view>
			<view class="cu-list menu"  v-for="(item,index) in fees" :key="index" :data-item="item">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							<view class="text-cut" style="width:220px">{{item.feeName}}</view>
						</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs">{{item.endTime}}至{{item.deadlineTime}}</text></view>
					</view>
					<view class="action">
						<text class="text-grey text-sm">应缴:￥{{item.feePrice}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="fees.length > 0" class="bg-white  border flex justify-end" style="position: fixed;width: 100%;bottom: 0;">

			<view class="action text-orange margin-right line-height">
				合计：{{receivableAmount}}元
			</view>
			<view class="btn-group">
				<!-- #ifdef H5 || MP-WEIXIN -->
				<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="onPayFee()">提交订单</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="_payWxApp()">提交订单</button>
				<!-- #endif -->
			</view>
		</view>
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
		addMonth,
		formatDate
	} from '../../utils/DateUtil.js'

	import {
		getCurCommunity
	} from '../../api/community/communityApi.js'

	import {
		getRoomOweFees
	} from '../../api/fee/feeApi.js'
	
	import {
		getCars
	} from '../../api/car/carApi.js'
	export default {
		data() {
			return {
				scrollLeft: 0,
				amount: 0,
				receivableAmount: 0.00,
				communityId: '',
				communityName: '',
				carNum: '',
				areaNum: '',
				num: '',
				additionalAmount: "",
				appId: '',
				fees: [],
				carId: ''
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			
			this.appId = this.vc.getWAppId();
			
			this.carId = options.carId;

			getCurCommunity()
				.then(function(_curCommunity) {
					_that.communityId = _curCommunity.communityId;
					_that.communityName = _curCommunity.communityName;
					return _curCommunity;
				}).then(function(_curCommunity) {
					_that._loadCarOweFee();
				}).then(function(){
					getCars({
						carId:_that.carId,
						page:1,
						row:1,
						communityId:_that.communityId
					}).then(data => {
						let _carInfo = data[0];
						_that.carNum = _carInfo.carNum;
						_that.areaNum = _carInfo.areaNum;
						_that.num = _carInfo.num;
					});
				});
			
		},
		methods: {

			_loadCarOweFee: function() {
				let _that =this;
				let _objData = {
					payObjId: this.carId,
					payObjType:'6666',
					page: 1,
					row: 50,
					communityId: this.communityId
				}

				getRoomOweFees(_objData)
					.then(function(_fees) {
						_that.fees = _fees;
						return _fees;
					}, function(error) {
						uni.showToast({
							icon:'none',
							title:'没有欠费信息'
						})
					})
					.then(function(_fees){
						_fees.forEach(function(_item){
							_that.receivableAmount += _item.feePrice;
							
						})
						_that.receivableAmount = _that.receivableAmount.toFixed(2);
					})
			},

			_payWxApp: function(_data) {
				let _receivedAmount = this.receivableAmount;
				wx.showLoading({
					title: '支付中'
				});

				let _tradeType = 'APP';
				let _objData = {
					cycles: this.feeMonth,
					communityId: this.communityId,
					roomId: this.carId,
					payObjType:'6666',
					feeName: '物业费',
					receivedAmount: _receivedAmount,
					tradeType: _tradeType,
					appId: this.appId
				};
				context.request({
					url: constant.url.toOweFeePay,
					header: context.getHeaders(),
					method: "POST",
					data: _objData,
					//动态数据
					success: function(res) {

						if (res.statusCode == 200 && res.data.code == '0') {
							let data = res.data; //成功情况下跳转
							let obj = {
								appid: data.appId,
								noncestr: data.nonceStr,
								package: 'Sign=WXPay', // 固定值，以微信支付文档为主
								partnerid: data.partnerid,
								prepayid: data.prepayid,
								timestamp: data.timeStamp,
								sign: data.sign // 根据签名算法生成签名
							}
							// 第二种写法，传对象字符串
							let orderInfo = JSON.stringify(obj)
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: orderInfo, //微信、支付宝订单数据
								success: function(res) {
									uni.showToast({
										title: "支付成功",
										duration: 2000
									});
									uni.navigateBack({});
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
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
			onPayFee: function() {
				let _receivedAmount = this.receivableAmount;
				wx.showLoading({
					title: '支付中'
				});
				let _tradeType = 'JSAPI';
				let _objData = {
					cycles: this.feeMonth,
					communityId: this.communityId,
					roomId: this.carId,
					payObjType:'6666',
					feeName: '停车费',
					receivedAmount: _receivedAmount,
					tradeType: _tradeType,
					appId: this.appId
				};
				context.request({
					url: constant.url.toOweFeePay,
					header: context.getHeaders(),
					method: "POST",
					data: _objData,
					//动态数据
					success: function(res) {
						if (res.statusCode == 200 && res.data.code == '0') {
							let data = res.data; //成功情况下跳转
							// #ifdef MP-WEIXIN
							uni.requestPayment({
								'timeStamp': data.timeStamp,
								'nonceStr': data.nonceStr,
								'package': data.package,
								'signType': data.signType,
								'paySign': data.sign,
								'success': function(res) {
									uni.showToast({
										title: "支付成功",
										duration: 2000
									});
									uni.navigateBack({});
								},
								'fail': function(res) {
									console.log('fail:' + JSON.stringify(res));
								}
							});
							// #endif
							// #ifdef H5
							WexinPayFactory.wexinPay(data, function() {
								uni.showToast({
									title: "支付成功",
									duration: 2000
								});
								uni.navigateBack({});
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
