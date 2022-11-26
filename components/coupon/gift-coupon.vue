<template>
	<view>
		<view v-if="coupons && coupons.length > 0">
			<view class="block__title">赠送优惠券</view>
			<checkbox-group @change="checkboxChange">
				<view class="cu-list menu" v-for="(coupon, idx) in coupons" :key="idx" :data-item="coupon"
				 @click="_viewcouponDetail(coupon)">
					<view class="cu-item ">
						<view class="content padding-tb-sm">
							<view>
								<view class="text-cut" style="width:220px">{{coupon.couponName}}({{coupon.toTypeName}})</view>
							</view>
						</view>
						<view class="action">
							<text class="text-grey text-sm">{{coupon.quantity}}张</text>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	import {
		computePayFeeCoupon
	} from '@/api/fee/feeApi.js'
	export default {
		name:"giftCoupon",
		data() {
			return {
				coupons: []
			};
		},
		methods: {
			listGiftCoupon: function(_feeId, _communityId, _feeMonth) {
				let _that = this;
				computePayFeeCoupon({
					page: 1,
					row: 30,
					feeId: _feeId,
					communityId: _communityId,
					cycles:_feeMonth
				}).then((data) => {
					if(!data){
						_that.coupons = [];
						return;
					}
					_that.coupons = data.data;
				})
			},
			
		}
	};
</script>

<style>
.block__title {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    color: rgba(69,90,100,.6);
    padding: 40rpx 30rpx 20rpx;
}
</style>
