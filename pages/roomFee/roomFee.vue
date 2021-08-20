<template>
	<view>
		<scroll-view scroll-y>
			<view class="block__title">房屋信息</view>
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">小区名称</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{communityName}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">房屋</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{floorNum + '号楼'+unitNum+ '单元'+roomNum + '室'}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">建筑面积</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{builtUpArea + '平方米'}}</text>
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
				<view class="cu-item"  v-if="feeFlag == '1003006'">
					<view class="content">
						<text class="text-grey">金额</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{amount + '元/月' }}</text>
					</view>
				</view>
				<view class="cu-item"  v-else>
					<view class="content">
						<text class="text-grey">金额</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{amount + '元' }}</text>
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
						<text class="text-grey text-sm">{{endTime}}</text>
					</view>
				</view>
				<view class="cu-item" v-if="preReadingTime">
					<view class="content">
						<text class="text-grey">上期读表时间</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{preReadingTime }}</text>
					</view>
				</view>
				<view class="cu-item" v-if="preDegrees">
					<view class="content">
						<text class="text-grey">上期度数</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{preDegrees }}</text>
					</view>
				</view>
				<view class="cu-item" v-if="curReadingTime">
					<view class="content">
						<text class="text-grey">本期读表时间</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{curReadingTime }}</text>
					</view>
				</view>
				<view class="cu-item" v-if="curDegrees">
					<view class="content">
						<text class="text-grey">本期度数</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{curDegrees }}</text>
					</view>
				</view>
				<view class="cu-item" v-if="curDegrees">
					<view class="content">
						<text class="text-grey">使用量</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{curDegrees-preDegrees}}</text>
					</view>
				</view>
				
				<vcDiscount ref="vcDiscountRef" @computeFeeDiscount="computeFeeDiscount" payerObjType="3333" :payerObjId="roomId" :endTime="formatEndTime" :feeId="feeId" :cycles="feeMonth" :communityId="communityId"></vcDiscount>
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

	
	// #ifdef H5
	
	const WexinPayFactory = require('../../factory/WexinPayFactory.js');
	
	// #endif
	
	// #ifdef APP-PLUS
	import {getPayInfo} from '../../factory/WexinAppPayFactory.js'
	// #endif
	
	import {addMonth,formatDate,date2String,dateSubOneDay} from '../../utils/DateUtil.js'
	export default {
		components:{
			vcDiscount
		},
		data() {
			return {
				date: '2018-12-25',
				index: 0,
				active: 0,
				tablist: ['缴费', '历史'],
				TabCur: 0,
				scrollLeft: 0,
				showFeeMonth: false,
				feeMonthList: [],
				feeMonthName: '',
				feeMonth: 1,
				endTime: '',
				ordEndTime: '',
				formatEndTime: '',
				amount: 0,
				receivableAmount: 0.00,
				communityId: '',
				communityName: '',
				feeId: '',
				roomId: '',
				floorNum: '',
				unitNum: '',
				roomNum: '',
				layer: '',
				builtUpArea: '',
				costList: [{}, {}], //费用清单
				additionalAmount: "",
				appId: '',
				feeFlag:'',
				paymentCycle:1,
				squarePrice: 0,
				preDegrees:'',
				curDegrees:'',
				preReadingTime:'',
				curReadingTime:'',
				feeState: '',
				startTime: '',
				deadlineTime: '',
				amountOwed: '',
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
			console.log('fee info : ',_fee);
			let _amount = _fee.amount;
			let _receivableAmount = _amount;
			if(_fee.feeFlag == "2006012"){ // 一次性费用
				_receivableAmount = _amount;
			}else{ // 周期性费用
				//_receivableAmount = ((_fee.builtUpArea * _fee.squarePrice + parseFloat(_fee.additionalAmount)) * _fee.paymentCycle).toFixed(2);
				_receivableAmount = (_fee.amount * _fee.paymentCycle).toFixed(2);
			}
			let _communityInfo = context.getCurrentCommunity();
			let _lastDate = new Date(_fee.endTime);
			this.receivableAmount = _receivableAmount;
			this.communityId = _communityInfo.communityId;
			this.communityName = _communityInfo.communityName;
			this.floorNum = _fee.floorNum;
			this.unitNum = _fee.unitNum;
			this.roomNum = _fee.roomNum;
			this.roomId = _fee.roomId;
			this.layer = _fee.layer;
			this.builtUpArea = _fee.builtUpArea;
			this.feeId = _fee.feeId;
			this.amount = _amount;
			this.additionalAmount = _fee.additionalAmount;
			this.ordEndTime = _fee.endTime;
			this.formatEndTime = date2String(_fee.endTime);
			this.feeFlag = _fee.feeFlag;
			this.squarePrice = _fee.squarePrice;
			this.preDegrees = _fee.preDegrees;
			this.curDegrees = _fee.curDegrees;
			this.preReadingTime = _fee.preReadingTime;
			this.curReadingTime = _fee.curReadingTime;
			this.feeState = _fee.feeState;
			this.startTime = _fee.startTime;
			this.deadlineTime = _fee.deadlineTime;
			this.amountOwed = _fee.amountOwed;
			if(this.feeFlag == '2006012'){
				return;
			}
			this.paymentCycle = _fee.paymentCycle;	
			for (let _index = 1; _index < 7; _index++) {
				this.feeMonthList.push(_index * this.paymentCycle + '个月')
			}
			this.feeMonthName = this.paymentCycle + '个月';
			this.feeMonth = this.paymentCycle;
			let _endTime = addMonth(_lastDate, parseInt(this.feeMonth));
			this.endTime = formatDate(_endTime);
		
			
			this.$nextTick(() => {
				this.$refs.vcDiscountRef._loadFeeDiscount(this.feeId,this.communityId,this.feeMonth);
			})
		},
		methods: {
			// （单价×面积+附加费）  × 周期
			getReceivableAmount: function(){
				return ((this.builtUpArea * this.squarePrice + parseFloat(this.additionalAmount)) * this.feeMonth).toFixed(2);
			},
			computeFeeDiscount:function(_price){
				// this.receivableAmount = this.receivableAmount - _price;
				this.receivableAmount = (parseFloat(this.receivableAmount) + parseFloat(_price)).toFixed(2);
			},
			dateChange: function(e) {
				let _feeMonthName = null;
				_feeMonthName = this.feeMonthList[e.detail.value];
				let _feeMonth = _feeMonthName.replace("个月","");
				let _lastDate = new Date(this.ordEndTime);
				let _newDate = addMonth(_lastDate, parseInt(_feeMonth));
				this.showFeeMonth = false;
				this.feeMonthName = _feeMonthName;
				this.feeMonth = _feeMonth;
				this.endTime = formatDate(_newDate);
				this.receivableAmount = this.getReceivableAmount();
				this.$refs.vcDiscountRef._loadFeeDiscount(this.feeId,this.communityId,this.feeMonth);
			},
			onFeeMonthChange: function(e) {
				console.log(e);
			},
			// 计费结束时间计算（同pc端）
			_getDeadlineTime: function () {
				if (this.amountOwed == 0 && this.formatEndTime == this.deadlineTime) {
					return "-";
				}
				if (this.feeState == '2009001') {
					return "-";
				}
				return dateSubOneDay(this.startTime, this.deadlineTime, this.feeFlag);
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
					feeName: '物业费',
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
	@import "./roomFee.css";

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
