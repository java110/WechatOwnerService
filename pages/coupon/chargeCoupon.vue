<template>
	<view>
		<view class="block__title" >我的充电劵</view>
		<!-- 费用项 -->
		<uni-collapse @change="change" class="margin-top fee-content">
			<uni-tr v-show="false">
				<uni-th align="center" :with="50"> </uni-th>
			</uni-tr>
			<!-- 多个复选框，带全选 -->
			<view class="tl-section">
				<checkbox-group class="block" @change="checkboxChange">
					<view class="cu-form-group" v-for="(coupon,index) in couponList">
						<view class="title">{{coupon.couponName}} 面值：{{coupon.value}}小时
							有效期：{{coupon.endTime}}
						</view>
						<checkbox class='round' :class="couponList[index].checked?'checked':''"
							:checked="couponList[index].checked?true:false" :value="coupon.couponId"></checkbox>
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
	
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;

	import {
		addMonth,
		formatDate,
		date2String,
		dateSubOneDay
	} from '../../lib/java110/utils/DateUtil.js'
	import {
		getCouponUsers
	} from '../../api/fee/feeApi.js'
	import {getCommunityId} from '@/api/community/communityApi.js';
	export default {
		data() {
			return {
				couponList: [],
				selectCoupons: [],
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
				let items = this.couponList
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
			_loadCouponUsers: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 30,
					tel: context.getUserInfo().ownerTel,
					state: '1001',
					communityId:getCommunityId(),
					toType:'5005'
				}
				_that.couponList = [];
				let _couponUsers = [];
				getCouponUsers(_objData, _couponUsers)
					.then((_couponList) => {
						_couponList.data.forEach(items => {
							items['checked'] = false;
							if (items.isExpire == 'Y') {
								for(let stockIndex = 0; stockIndex < items.stock;stockIndex++){
									_that.couponList.push(items);
								}
							}
						})
					}, () => {
					})

			},
			_selectCouponBack: function() {
				let _that = this;
				uni.setStorageSync('COUPON_USER_CHARGE', this.selectCoupons);
				uni.navigateBack();
			}
		}
	}
</script>

<style>
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