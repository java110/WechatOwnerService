<template>
	<view>
		<scroll-view scroll-y>
			<view class="block__title">订单信息</view>
			<form>
				<view class="cu-list menu">
					<view class="cu-item">
						<view class="content">
							<text class="text-b">{{bookparams.cgName}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">预约日期</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">{{bookparams.bookDate}}</text>
						</view>
					</view>
				</view>

				<view class="block__title">场地信息</view>
				<view class="cu-list menu" v-for="(item,index) in this.bookList" :key="index">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">{{item.changdiName}}</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">{{HoursStr(item.hours) }}</text>
						</view>
					</view>
				</view>
				<!-- <view class="block__title">支付方式</view>
				<view class="cu-form-group fee-last">
					<view class="title">微信支付</view>
					<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				</view> -->
			</form>
		</scroll-view>
		<view class=" bg-white  border flex cu-form-group" style="position: fixed;width: 100%;bottom: 0;">

			<view class="title">总计:
				<text class="solid-bottom text-xxl text-price text-red">{{totalMoney}}</text>
			</view>
			<view class="btn-group">
				<!-- #ifdef H5 || MP-WEIXIN -->
				<!-- cu-btn bg-red shadow-blur lgplus sharp -->
				<button @click="onPayFee()" class="cu-btn round bg-blue"
					style="background-color: #1cbbb4;">提交订单</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<button @click="_payWxApp()" class="cu-btn round bg-blue"
					style="background-color: #1cbbb4;">提交订单</button>
				<!-- #endif -->
			</view>
		</view>
	</view>

	</view>
</template>

<script>
	// pages/payParkingFee/payParkingFee.js
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;
	import url from '@/constant/url.js'

	import vcDiscount from '@/components/vc-discount/vc-discount.vue'
	import vcUserAccount from '@/components/vc-user-account/vc-user-account.vue'


	// #ifdef H5

	const WexinPayFactory = require('../../factory/WexinPayFactory.js');

	// #endif

	// #ifdef APP-PLUS
	import {
		getPayInfo
	} from '../../factory/WexinAppPayFactory.js'
	// #endif

	import {
		addMonth,
		formatDate,
		date2String,
		dateSubOneDay
	} from '../../lib/java110/utils/DateUtil.js'

	export default {
		components: {
			vcDiscount,
			vcUserAccount
		},
		data() {
			return {
				bookparams: [], // 订场信息
				bookList: [], // 订场列表
				switchA: false, // 选择微信支付开关
				totalMoney: 0, //
				canPay: "f",
				ownerInfo: [], // 
				link: "", // 注册者电话
				appUserName: "", // 注册者名称
			};
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.loadOwenrInfo();
			context.onLoad(options);
			// #ifdef MP-WEIXIN
			let accountInfo = uni.getAccountInfoSync();
			this.appId = accountInfo.miniProgram.appId;
			// #endif
			// #ifdef H5
			this.appId = uni.getStorageSync(constant.mapping.W_APP_ID)
			// #endif
			let _fee = JSON.parse(options.fee);
			this.bookparams = _fee;
			this.bookList = JSON.parse(_fee.bookList);
			// debugger
			for (var col = 0; col < this.bookList.length; col++) {
				this.totalMoney = (Number(this.totalMoney) + Number(this.bookList[col].cdMoney)).toFixed(2);
			}
			if (Number(this.totalMoney).toFixed(2) ==  Number(this.bookparams.totalMoney).toFixed(2)) {
				this.canPay = "t";
			}
		},
		onShow() {},
		methods: {
			loadOwenrInfo: function() {
				let _that = this;
				// debugger
				context.getOwner(function(_ownerInfo) {
					console.log('用户信息');
					console.log(_ownerInfo);
					_that.ownerInfo = _ownerInfo;
				});
			},

			SwitchA(e) {
				this.switchA = e.detail.value
			},
			// 时间转换
			HoursStr(hours) {
				let hourSlot = hours + ":00-" + (Number(hours) + 1) + ":00";
				return hourSlot;
			},
			onFeeMonthChange: function(e) {
				console.log(e);
			},
			onFeeMonthCancel: function(e) {
				this.showFeeMonth = false;
			},
			_payWxApp: function(_data) {
				// debugger
				console.log('_payWxApp');
				if (this.canPay == "t") {
					let _receivedAmount = this.receivableAmount;
					wx.showLoading({
						title: '支付中'
					});

					let _tradeType = 'APP';
					let _objData = {
						cycles: this.feeMonth,
						communityId: this.communityId,
						feeId: this.feeId,
						feeName: '物业费',
						receivedAmount: _receivedAmount,
						tradeType: _tradeType,
						appId: this.appId,
						endTime: this.formatEndTime,
						couponList: this.couponList
					};
					context.request({
						url: constant.url.preOrder,
						header: context.getHeaders(),
						method: "POST",
						data: _objData,
						//动态数据
						success: function(res) {
							console.log("微信支付",res)
							if (res.statusCode == 200 && res.data.code == '0') {
								let data = res.data; //成功情况下跳转

								let obj = {};
								let orderInfo = {};
								// #ifdef MP-WEIXIN
								obj = {
									appid: data.appId,
									noncestr: data.nonceStr,
									package: 'Sign=WXPay', // 固定值，以微信支付文档为主
									partnerid: data.partnerid,
									prepayid: data.prepayid,
									timestamp: data.timeStamp,
									sign: data.sign // 根据签名算法生成签名
								}
								// #endif
								// #ifdef APP-PLUS
								obj = getPayInfo(data);
								// #endif

								// 第二种写法，传对象字符串
								orderInfo = JSON.stringify(obj)
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: orderInfo, //微信、支付宝订单数据
									success: function(res) {
										uni.showToast({
											title: "支付成功",
											duration: 2000
										});
										uni.reLaunch({
											url: '../../pages/myBooking/myBoomList',
											fail (error) {
													console.log(error)
											}
										});
									},
									fail: function(err) {
										console.log('fail:' + JSON.stringify(err));
									}
								});
								wx.hideLoading();
								return;
							}
							if (res.statusCode == 200 && res.data.code == '100') {
								let data = res.data; //成功情况下跳转
								uni.showToast({
									title: "支付成功",
									duration: 2000
								});
								setTimeout(function() {
									uni.reLaunch({
										url: '../../pages/myBooking/myBoomList',
										fail (error) {
												console.log(error)
										}
									});
								}, 2000)

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
				} else {
					wx.showLoading({
						title: '支付失败'
					});
				}
			},
			onPayFee: function() {
				// debugger
				let _that = this;
				if (this.canPay == "t") {
					let totalMoney = this.totalMoney;
					wx.showLoading({
						title: '支付中'
					});
					let _tradeType = 'JSAPI';

					// debugger
					let spacesList = [];
					for (var col = 0; col < this.bookList.length; col++) {
						let hoursData = this.bookList[col].hours;
						let sId = this.bookList[col].spaceId;
						let openTimes = [];
						let inList = false;
						for (var cola = 0; cola < spacesList.length; cola++) {
							if (sId == spacesList[cola].spaceId) {
								// debugger;
								openTimes = spacesList[cola].openTimes;
								inList = true;
								break;
							}
						}
						openTimes.push({
							hours: hoursData
						});

						if (!inList) {
							spacesList.push({
								spaceId: sId,
								openTimes
							});
						}
					}

					let _objData = {
						"business": "venueReservation",
						"tradeType": _tradeType,
						"communityId": this.ownerInfo.communityId,
						"spaces": JSON.stringify(spacesList),
						"personName": this.ownerInfo.appUserName,
						"personTel": this.ownerInfo.link,
						"payWay": "2",
						"state": "S",
						"remark": "",
						"appointmentTime": this.bookparams.bookDate
					};
					//{"spaceId":"102022093043260007","personName":"wuxw","personTel":"18909711443","appointmentTime":"01:00","receivableAmount":"10","receivedAmount":"10","payWay":"2","state":"S","remark":"123","appointmentDate":"2022-09-01","communityId":"2022081539020475"}
					console.log('_objData');
					context.request({
						url: url.unifiedPayment,
						header: context.getHeaders(),
						method: "POST",
						data: _objData,
						//动态数据
						success: function(res) {
							console.log("微信支付2",res)
							// debugger
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
										console.log("微信支付22",res)
										uni.showToast({
											title: "支付成功",
											duration: 2000
										});
										uni.reLaunch({
											url: '../../pages/myBooking/myBoomList',
											fail (error) {
													console.log(error)
											}
										});
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
									uni.reLaunch({
										url: '../../pages/myBooking/myBoomList',
										fail (error) {
												console.log(error)
										}
									});
								});
								// #endif
								wx.hideLoading();
								return;
							}
							if (res.statusCode == 200 && res.data.code == '100') {
								let data = res.data; //成功情况下跳转
								uni.showToast({
									title: "支付成功",
									duration: 2000
								});
								setTimeout(function() {
									uni.reLaunch({
										url: '../../pages/myBooking/myBoomList',
										fail (error) {
												console.log(error)
										}
									});
								}, 2000)

								return;
							} else if (res.data.code == '404') {
								debugger
								let tipsIndex = res.data.msg.indexOf("已经被预约");
								if (tipsIndex>=0){
								let tips = _that.HoursStr(res.data.msg.substr(0, tipsIndex))+"\n\r" + res.data.msg
									.substr(tipsIndex, res.data.msg.length - tipsIndex);

								wx.showToast({
									title: "缴费失败:" + tips,
									icon: 'none',
									duration: 4000
								});
								}else{
									wx.showToast({
										title: "缴费失败:" + res.data.msg,
										icon: 'none',
										duration: 4000
									});
								}
							} else {
								wx.showToast({
									title: "缴费失败:" + res.data.msg,
									icon: 'none',
									duration: 2000
								});
							}
							wx.hideLoading();
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
				} else {
					debugger
					wx.showLoading({
						title: '支付失败'
					});
				}
			}
		}
	};
</script>
<style>
	@import "./appointmentPay.css";
/* 	@import "../../components/colorui/main.css";
	@import "../../components/colorui/icon.css"; */

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
