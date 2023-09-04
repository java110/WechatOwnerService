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
				<view class="cu-item" v-if="feeFlag == '1003006'">
					<view class="content">
						<text class="text-grey">金额</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{amount + '元/月' }}</text>
					</view>
				</view>
				<view class="cu-item" v-else>
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
				<vcUserAccount ref="vcUserAccountRef" @getUserAmount="getUserAmount"></vcUserAccount>
				<view class="cu-list menu margin-top" @click="coupons()">
					<view class="cu-item arrow">
						<view class="content padding-tb-sm">
							<view>
								<view class="text-cut" style="width:220px">使用优惠卷抵扣</view>
							</view>
						</view>
						<view>{{couponAmount}}</view>
					</view>
				</view>
				<gift-coupon ref="giftCoupon" ></gift-coupon>
				<vcDiscount ref="vcDiscountRef" @computeFeeDiscount="computeFeeDiscount" payerObjType="3333"
					:payerObjId="roomId" :endTime="formatEndTime" :feeId="feeId" :cycles="feeMonth"
					:communityId="communityId"></vcDiscount>

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
	// pages/fee/payParkingFee.js
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;

	import vcDiscount from '@/components/vc-discount/vc-discount.vue';
	import giftCoupon from '@/components/coupon/gift-coupon.vue'
	import vcUserAccount from '@/components/vc-user-account/vc-user-account.vue';

	import {
		addMonth,
		formatDate,
		date2String,
		dateSubOneDay
	} from '../../lib/java110/utils/DateUtil.js';
	
	import {payFeeApp,payFeeWechat} from '@/api/fee/feeApi.js';

	export default {
		components: {
			vcDiscount,
			vcUserAccount,
			giftCoupon
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
				feeFlag: '',
				paymentCycle: 1,
				squarePrice: 0,
				preDegrees: '',
				curDegrees: '',
				preReadingTime: '',
				curReadingTime: '',
				feeState: '',
				startTime: '',
				deadlineTime: '',
				amountOwed: '',
				selectUserAccount: [], // 选中的账户
				accountAmount: 0.0, // 账户金额
				deductionAmount: 0.0, // 抵扣金额
				couponAmount: 0.0,
				amountCount: 0.0,
				couponList: [],
				payOnline:'Y'
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
			console.log('fee info : ', _fee);
			let _amount = _fee.amount;
			let _receivableAmount = _amount;
			if (_fee.feeFlag == "2006012") { // 一次性费用
				_receivableAmount = _amount;
			} else { // 周期性费用
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
			this.amountCount = this.receivableAmount;
			this.payOnline = _fee.payOnline;

			if (this.feeFlag != '2006012') {
				this.paymentCycle = _fee.paymentCycle;
				for (let _index = 1; _index < 7; _index++) {
					this.feeMonthList.push(_index * this.paymentCycle + '个月')
				}
				this.feeMonthName = this.paymentCycle + '个月';
				this.feeMonth = this.paymentCycle;
				let _endTime = addMonth(_lastDate, parseInt(this.feeMonth));
				this.endTime = formatDate(_endTime);
			}


			this.$nextTick(() => {
				this.$refs.vcDiscountRef._loadFeeDiscount(this.feeId, this.communityId, this.feeMonth);
				this.$refs.vcUserAccountRef._listOwnerAccount(this.feeId, this.communityId);
				this.$refs.giftCoupon.listGiftCoupon(this.feeId, this.communityId, this.feeMonth);
			})
		},
		onShow() {
			this._dealUserCoupons();
		},
		methods: {
			_dealUserCoupons: function() {
				let couponUser = uni.getStorageSync(constant.mapping.COUPON_USER_KEY);
				if(!couponUser){
					return ;
				}
				uni.removeStorageSync(constant.mapping.COUPON_USER_KEY);
				this.couponAmount = couponUser.couponAmount;
				this.couponList = couponUser.couponList;
				this.receivableAmount = this.amountCount;
				if (this.couponAmount) {
					this.receivableAmount = (parseFloat(this.receivableAmount) - parseFloat(this.couponAmount))
						.toFixed(2);
					if (this.receivableAmount <= 0) {
						this.receivableAmount = 0.0;
					}
				}
				
			},
			coupons: function(_item) {
				wx.navigateTo({
					url: '/pages/coupon/ownerCoupon',
				})
			},
			// （单价×面积+附加费）  × 周期
			getReceivableAmount: function() {
				// return ((this.builtUpArea * this.squarePrice + parseFloat(this.additionalAmount)) * this.feeMonth)
				// 	.toFixed(2);
				return (this.amount * this.feeMonth).toFixed(2);
			},

			// 折扣金额
			computeFeeDiscount: function(_price) {
				// this.receivableAmount = this.receivableAmount - _price;
				this.receivableAmount = (parseFloat(this.receivableAmount) + parseFloat(_price)).toFixed(2);
				this._computeUserAmount();
			},
			// 选择使用账户余额
			getUserAmount: function(_accInfo) {
				// 选中的账户列表
				this.selectUserAccount = _accInfo.selectedAccounts;
				// 账户金额
				this.accountAmount = _accInfo.totalUserAmount;
				this._updatePrice(this.feeMonth);
			},

			// 使用账户余额后，更新金额
			_computeUserAmount: function() {
				// 抵扣金额
				this.deductionAmount = parseFloat(this.accountAmount) > parseFloat(this.receivableAmount) ? parseFloat(
					this.receivableAmount) : parseFloat(this.accountAmount);
				// 更新应缴金额
				let receivableAmount = parseFloat(this.receivableAmount) - parseFloat(this.accountAmount);
				this.receivableAmount = receivableAmount < 0 ? '0.00' : receivableAmount.toFixed(2);
			},

			// 切换缴费周期
			dateChange: function(e) {
				let _feeMonthName = null;
				_feeMonthName = this.feeMonthList[e.detail.value];
				let _feeMonth = _feeMonthName.replace("个月", "");
				this._updatePrice(_feeMonth);
			},

			// 更新金额
			_updatePrice(_feeMonth) {
				let _lastDate = new Date(this.ordEndTime);
				let _newDate = addMonth(_lastDate, parseInt(_feeMonth));
				this.showFeeMonth = false;
				this.feeMonthName = _feeMonth + '个月';
				this.feeMonth = _feeMonth;
				this.endTime = formatDate(_newDate);
				this.receivableAmount = this.getReceivableAmount();
				this.$refs.vcDiscountRef._loadFeeDiscount(this.feeId, this.communityId, this.feeMonth);
				this.$refs.giftCoupon.listGiftCoupon(this.feeId, this.communityId, this.feeMonth);
			},

			onFeeMonthChange: function(e) {
				console.log(e);
			},

			// 计费结束时间计算（同pc端）
			_getDeadlineTime: function() {
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
				let _tradeType = 'APP';
				if(this.payOnline == 'N'){
					uni.showToast({
						icon:'none',
						title:'暂不支持线上缴费，请到前台缴费'
					})
					return;
				}
				payFeeApp(this,{
					cycles: this.feeMonth,
					communityId: this.communityId,
					feeId: this.feeId,
					feeName: '物业费',
					receivedAmount: _receivedAmount,
					tradeType: _tradeType,
					appId: this.appId,
					endTime: this.formatEndTime,
					couponList: this.couponList
				});
				
			},
			onPayFee: function() {
				let _receivedAmount = this.receivableAmount;
				let _tradeType = 'JSAPI';
				if(this.payOnline == 'N'){
					uni.showToast({
						icon:'none',
						title:'暂不支持线上缴费，请到前台缴费'
					})
					return;
				}
				payFeeWechat(this,{
					business: "payFee",
					cycles: this.feeMonth,
					communityId: this.communityId,
					feeId: this.feeId,
					feeName: '物业费',
					receivedAmount: _receivedAmount,
					tradeType: _tradeType,
					appId: this.appId,
					payerObjId: this.roomId,
					payerObjType: 3333,
					endTime: this.formatEndTime,
					selectUserAccount: this.selectUserAccount, // 选中的账户
					accountAmount: this.accountAmount, // 账户金额
					deductionAmount: this.deductionAmount, // 抵扣金额
					couponList: this.couponList
				})
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
