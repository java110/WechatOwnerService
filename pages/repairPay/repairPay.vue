<template>
	<view>
		<scroll-view scroll-y>
			<view class="block__title">报修信息</view>
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">工单号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{repairId}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">报修类型</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{repairTypeName}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">报修位置</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{repairObjName}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">报修人</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{repairName}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">报修内容</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{remark}}</text>
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
						<text class="text-grey text-sm">{{feeInfo.feeId }}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">金额</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{feeInfo.amount + '元' }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class=" bg-white  border flex justify-end" style="position: fixed;width: 100%;bottom: 0;">

			<view class="action text-orange margin-right line-height">
				合计：{{feeInfo.amount}}元
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
	import {date2String} from '../../utils/DateUtil.js'
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const util = context.util;
	
	// #ifdef H5
	
	const WexinPayFactory = require('../../factory/WexinPayFactory.js');
	
	// #endif

	export default {
		data() {
			return {
				communityId: '',
				communityName: '',
				repairId:'',
				appId: '',
				repairInfo:{},
				feeInfo:{},
				userId:'',
				payerObjId: '',
				payerObjType: '3333',
				endTime: '',
				repairTypeName: '',
				repairObjName: '',
				repairName: '',
				remark: '',
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
			this.communityId = options.communityId;
			this.repairId = options.repairId;
			this.userId = options.userId;
			this.payerObjId = options.repairObjId;
			this.endTime = date2String(new Date(options.appointmentTime.replace(/-/g, "/")));
			this.repairTypeName = options.repairTypeName;
			this.repairObjName = options.repairObjName;
			this.repairName = options.repairName;
			this.remark = options.context
			
			this._loadRepair();
			this._listFee();
		},

		methods: {
			/**
			 * 加载我的报修
			 * 
			 */
			_listFee: function() {
				let that = this;
				let _url = '';
				_url = constant.url.listFeeByAttr;
				let _paramIn = {
					"communityId": that.communityId,
					"page": 1,
					"row": 1,
					"specCd": '390001',
					"value": that.repairId
				};
				context.request({
					url: _url,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							that.feeInfo = _json.data[0];
							return;
						}
						wx.showToast({
							title: "查询费用失败",
							icon: 'none',
							duration: 2000
						});
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			_loadRepair: function() {
				let that = this;
				let _url = '';
				_url = constant.url.listStaffFinishRepairs;
				let _paramIn = {
					"communityId": that.communityId,
					"page": 1,
					"row": 1,
					"userId": that.userId,
					"repairId": that.repairId
				};
				context.request({
					url: _url,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							that.repairInfo = _json.data[0];
							return;
						}
						wx.showToast({
							title: "查询报修单失败",
							icon: 'none',
							duration: 2000
						});
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			_payWxApp: function(_data) {
				wx.showLoading({
					title: '支付中'
				});
				let _tradeType = 'APP';
				let _objData = {
					cycles: 1,
					communityId: this.communityId,
					feeId: this.feeInfo.feeId,
					feeName: '报修费',
					receivedAmount: this.feeInfo.feePrice,
					tradeType: _tradeType,
					appId: this.appId
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
				wx.showLoading({
					title: '支付中'
				});
				let _tradeType = 'JSAPI';
				let _objData = {
					cycles: '1',
					communityId: this.communityId,
					feeId: this.feeInfo.feeId,
					feeName: '报修费',
					receivedAmount: this.feeInfo.feePrice,
					tradeType: _tradeType,
					appId: this.appId,
					endTime: this.endTime,
					payerObjId: this.payerObjId,
					payerObjType: this.payerObjType
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
								WexinPayFactory.wexinPay(data,function(){
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
	
	.ppf_item{
	  padding: 0rpx 0rpx 0rpx 0rpx;
	}
	
	.block__title {
	  margin: 0;
	  font-weight: 400;
	  font-size: 14px;
	  color: rgba(69,90,100,.6);
	  padding: 40rpx 30rpx 20rpx;
	}
	
	.button_up_blank{
	  height: 40rpx;
	}
	
	.block__bottom{
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
