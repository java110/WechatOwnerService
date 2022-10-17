<template>
	<view>
		<view class="block__title">我的停车劵</view>
		<!-- 费用项 -->
		<uni-collapse @change="change" class="margin-top fee-content">
			<uni-tr v-show="false">
				<uni-th align="center" :with="50"> </uni-th>
			</uni-tr>
			<!-- 多个复选框，带全选-->
			<view class="tl-section">
				<checkbox-group class="block"  @change="checkboxChange">
					<view class="cu-form-group" v-for="(coupon,index) in coupons">
						<view class="title">
							<text class="ellip">{{coupon.couponName}}-</text>
							<text v-if="coupon.typeCd == '1001'">{{coupon.value}}分钟</text>
							<text v-if="coupon.typeCd == '2002'">{{coupon.value}}元</text>
							<text v-if="coupon.typeCd == '3003'">{{coupon.value}}折</text>
							<text v-if="coupon.typeCd == '4004'">全免</text>
						</view>
						<checkbox class='round'  :class="coupons[index].checked?'checked':''"
							:checked="coupons[index].checked?true:false" :value="coupon.pccId"></checkbox>
					</view>
				</checkbox-group>
			</view>
		</uni-collapse>

		<view class=" bg-white  border flex justify-end" style="position: fixed;width: 100%;bottom: 0;">
			<view class="action text-orange margin-right line-height">
				共：{{selectCoupons.length}}张
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="_selectCouponBack()">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/payParkingFee/payParkingFee.js
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;

	import {
		addMonth,
		formatDate,
		date2String,
		dateSubOneDay
	} from '../../lib/java110/utils/DateUtil.js'
	import {
		getParkingCarCoupon
	} from '../../api/fee/feeApi.js'

	export default {
		data() {
			return {
				coupons: [],
				selectCoupons: [],
				couponAmount: 0.0,
				carNum: '',
				paId: ''
			}
		},
		onLoad: function(options) {
			this.carNum = options.carNum;
			this.paId = options.paId;
			this._loadCarCoupons(options);
		},
		methods: {
			checkboxChange(e) {
				let items = this.coupons
				let values = e.detail.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].pccId == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
				this.selectCoupons = values;
			},
			_loadCarCoupons: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 30,
					carNum: this.carNum,
					paId: this.paId,
					state:'1001'
				}
				_that.coupons = [];
				getParkingCarCoupon(_objData)
					.then((_data) => {
						_that.coupons = _data;
					}, (_err) => {
						uni.showToast({
							icon: 'none',
							title: _err
						})
					})
			},
			_selectCouponBack: function() {
				let _that = this;
				uni.setStorageSync(constant.mapping.COUPON_USER_TEMP_CAR_KEY, this.selectCoupons);
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	/* 	@import "./roomFee.css";
 */
.block__title {
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  color: rgba(69,90,100,.6);
  padding: 40rpx 30rpx 20rpx;
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
