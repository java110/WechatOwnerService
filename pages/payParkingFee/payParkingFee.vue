<template>
	<view>

		<scroll-view scroll-y>
			<view class="block__title">车位信息</view>
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">小区</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{communityName}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">车位编号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{num + '号车位'}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">车位类型</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{feeTypeCdName}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">车牌号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{carNum}}</text>
					</view>
				</view>
			</view>
			<view class="block__title">费用信息</view>
			<view class="cu-list menu fee-last">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">费用编号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{feeId }}</text>
					</view>
				</view>
				<view class="cu-item" v-if="feeFlag == '1003006'">
					<view class="content">
						<text class="text-grey">金额</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{feePrice + '元/月' }}</text>
					</view>
				</view>
				<view class="cu-item" v-else>
					<view class="content">
						<text class="text-grey">金额</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{feePrice + '元' }}</text>
					</view>
				</view>
				<view class="cu-item arrow" v-if="feeFlag == '1003006'">
					<view class="content">
						<text class="text-grey">周期</text>
					</view>
					<view class="action">
						<picker bindchange="PickerChange" :value="index" :range="feeMonthList" @change="dateChange">
							<view class="picker">
								{{feeMonthName}}
							</view>
						</picker>
					</view>
				</view>
				<view class="cu-item" v-if="feeFlag != '2006012'">
					<view class="content">
						<text class="text-grey">缴费后时间</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{endTime }}</text>
					</view>
				</view>
				<vc-discount ref="vcDiscountRef" @computeFeeDiscount="computeFeeDiscount" :feeId="feeId" :cycles="feeMonth"
				 :communityId="communityId"></vc-discount>


			</view>
		</scroll-view>
		<view class=" bg-white  border flex justify-end" style="position: fixed;width: 100%;bottom: 0;">

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
	import vcDiscount from '@/components/vc-discount/vc-discount.vue'
	import {
		addMonth,
		formatDate,
		date2String
	} from '../../utils/DateUtil.js'


	// #ifdef H5

	const WexinPayFactory = require('../../factory/WexinPayFactory.js');

	// #endif

	export default {
		components: {
			vcDiscount
		},
		data() {
			return {
				showFeeMonth: false,
				feeMonthList: [],
				feeMonthName: '',
				feeMonth: 1,
				endTime: '',
				ordEndTime: '',
				formatEndTime:'',
				amount: 0,
				receivableAmount: 0.00,
				additionalAmount: 0,
				num: '',
				feeTypeCdName: '',
				carNum: '',
				feePrice: 0.00,
				communityId: '',
				communityName: '',
				feeId: '',
				appId: '',
				feeFlag: '',
				paymentCycle: 1,
			};
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			// #ifdef MP-WEIXIN
			let accountInfo = uni.getAccountInfoSync();
			this.appId = accountInfo.miniProgram.appId;
			// #endif

			// #ifdef H5
			this.appId = uni.getStorageSync(constant.mapping.W_APP_ID)
			// #endif
			let _fee = JSON.parse(options.fee);
			let _receivableAmount = _fee.paymentCycle * _fee.feePrice;

			let _communityInfo = context.getCurrentCommunity();
			let _lastDate = new Date(_fee.endTime);


			this.receivableAmount = _receivableAmount;
			this.communityId = _communityInfo.communityId;
			this.communityName = _communityInfo.communityName;
			this.num = _fee.num;
			this.feeTypeCdName = _fee.feeTypeCdName;
			this.carNum = _fee.carNum;
			this.feeId = _fee.feeId;
			this.feePrice = _fee.feePrice;

			this.ordEndTime = _fee.endTime;
			this.formatEndTime = date2String(_fee.endTime);
			this.feeFlag = _fee.feeFlag;
			if (this.feeFlag == '2006012') {
				return;
			}
			this.paymentCycle = _fee.paymentCycle;
			this.feeMonth = _fee.paymentCycle;
			for (let _index = 1; _index < 7; _index++) {
				this.feeMonthList.push(_index * this.paymentCycle + '个月')
			}
			this.feeMonthName = this.paymentCycle + '个月';
			let _endTime = addMonth(_lastDate, parseInt(this.feeMonth));
			this.endTime = formatDate(_endTime);
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2]; //上一个页面
			//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
			prevPage.needFefresh = false;
			this.$refs.vcDiscountRef._loadFeeDiscount(this.feeId, this.communityId, this.feeMonth);
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			computeFeeDiscount: function(_price) {
				this.receivableAmount = this.receivableAmount - _price;
			},
			dateChange: function(e) {
				console.log("onConfirm", e);
				let _feeMonthName = null;
				_feeMonthName = this.feeMonthList[e.detail.value];
				let _feeMonth = _feeMonthName.replace("个月", "");;

				let _receivableAmount = _feeMonth * this.feePrice;

				let _lastDate = new Date(this.ordEndTime);
				let _newDate = addMonth(_lastDate, parseInt(_feeMonth));

				this.showFeeMonth = false;
				this.feeMonthName = _feeMonthName;
				this.receivableAmount = _receivableAmount;
				this.feeMonth = _feeMonth;
				this.endTime = formatDate(_newDate);
				this.$refs.vcDiscountRef._loadFeeDiscount(this.feeId, this.communityId, this.feeMonth);
			},
			onFeeMonthCancel: function(e) {
				this.showFeeMonth = false;
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
					feeId: this.feeId,
					feeName: '停车费',
					receivedAmount: _receivedAmount,
					tradeType: _tradeType,
					appId: this.appId,
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
					title: '支付中',
				});
				let _tradeType = 'JSAPI';
				let _objData = {
					cycles: this.feeMonth,
					communityId: this.communityId,
					feeId: this.feeId,
					feeName: '停车费',
					receivedAmount: _receivedAmount,
					tradeType: _tradeType,
					appId: this.appId,
					endTime: this.formatEndTime
				}

				context.request({
					url: constant.url.preOrder,
					header: context.getHeaders(),
					method: "POST",
					data: _objData, //动态数据
					success: function(res) {
						console.log(res);
						if (res.statusCode == 200 && res.data.code == '0') {
							let data = res.data;
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
						uni.hideLoading();
						uni.showToast({
							title: "缴费失败",
							icon: 'none',
							duration: 2000
						})
					},
					fail: function(e) {
						uni.hideLoading();
						uni.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			}
		}
	};
</script>
<style>
	@import "./payParkingFee.css";

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
