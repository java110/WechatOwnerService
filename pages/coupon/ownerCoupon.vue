<template>
	<view>
		<view class="block__title" v-if="couponList.length > 0">可使用优惠卷</view>
		<view class="block__title" v-if="couponList.length < 1">请使用商城系统积累优惠卷</view>
		<!-- 费用项 -->
		<uni-collapse @change="change" class="margin-top fee-content">
			<uni-tr v-show="false">
				<uni-th align="center" :with="50"> </uni-th>
			</uni-tr>
			<!-- 多个复选框，带全选 -->
			<view class="tl-section">
				<checkbox-group class="block" @change="checkboxChange">
					<view class="cu-form-group" v-for="(coupon,index) in couponList">
						<view class="title">{{coupon.couponName}} 面值：{{coupon.actualPrice}}元
							有效期：{{coupon.actualPrice}}
						</view>
						<checkbox class='round' :class="couponList[index].checked?'checked':''"
							:checked="couponList[index].checked?true:false" :value="coupon.couponId"></checkbox>
					</view>
				</checkbox-group>
			</view>
		</uni-collapse>

		<view class=" bg-white  border flex justify-end" style="position: fixed;width: 100%;bottom: 0;">

			<view class="action text-orange margin-right line-height">
				合计：{{couponAmount}}元
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="_navigateBack()">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;

	import vcDiscount from '@/components/vc-discount/vc-discount.vue'
	import vcUserAccount from '@/components/vc-user-account/vc-user-account.vue'

	// import mapping from '../../constant/MappingConstant.js'
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
	import {
		getCouponUsers
	} from '../../api/fee/feeApi.js';
	import {getCommunityId} from '@/api/community/communityApi.js';

	export default {
		data() {
			return {
				couponList: [],
				tmpCouponList: [],
				userLink: '',
				couponAmount: 0.0
			}
		},
		onLoad: function(options) {
			context.onLoad(options);
			this._loadCouponUsers();
		},
		methods: {
			checkboxChange(e) {
				this.couponAmount = '0'
				var items = this.couponList
				var values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].couponId == values[j]) {
							items[i].checked = true;
							break
						}
					}
					if (items[i].checked == true) {
						this.couponAmount = (parseFloat(this.couponAmount) + parseFloat(items[i].actualPrice)).toFixed(2);
					}
				}
				console.log(this.couponList);
			},
			_loadCouponUsers: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 30,
					tel: context.getUserInfo().ownerTel,
					communityId:getCommunityId(),
					state: '1001',
					toType:'2002'
				}
				_that.couponList = [];
				let _couponUsers = [];
				getCouponUsers(_objData, _couponUsers)
					.then((_couponList) => {
						console.log("测试测试");
						_couponList.data.forEach(items => {
							items['checked'] = false;
							if (items.isExpire == 'Y') {
								// for(let stockIndex = 0; stockIndex < items.stock;stockIndex++){
								// 	_that.couponList.push(items);
								// }
								_that.couponList.push(items);
							}
						})
						//_that.noData = false;
					}, () => {
						//_that.noData = true;
					})

			},
			_navigateBack: function() {
				let _that = this;
				let newCouponList = [];
				_that.couponList.forEach(items => {
					if (items.checked == true) {
						newCouponList.push(items);
					}
				})

				let outCouponList = {
					couponList: newCouponList,
					couponAmount: _that.couponAmount
				};
				uni.setStorageSync(constant.mapping.COUPON_USER_KEY, outCouponList);
				uni.navigateBack();
			}
		}
	}
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