<template>
	<view>
		<view class="cu-list menu" v-if="discounts.length > 0" v-for="(discount, idx) in discounts" :key="idx" :data-item="discount"
		 @click="_viewDiscountDetail(discount)">
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<view>
						<view class="text-cut" style="width:220px">{{discount.discountName}}</view>
					</view>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{discount.discountPrice}}元</text>
				</view>
			</view>
		</view>
		<blockExplain v-if="discounts.length > 0"></blockExplain>
	</view>
</template>

<script>
	import blockExplain from '@/components/block-explain/block-explain.vue'
	import {
		getFeeDiscounts
	} from '../../api/fee/feeApi.js'
	export default {
		components: {
			blockExplain
		},
		data() {
			return {
				discounts: []
			};
		},
		props: {
			feeId: {
				//是否开启绝对定位。
				type: String,
				default: ''
			},
			communityId: {
				//是否开启绝对定位。
				type: String,
				default: ''
			},
			cycles: {
				type: String,
				default: 1
			},
			payerObjType: {
				type: String,
				default: ''
			},
			payerObjId: {
				type: String,
				default: ''
			},
			endTime: {
				type: String,
				default: ''
			}
		},
		computed: {},
		methods: {
			_loadFeeDiscount: function(_feeId, _communityId, _feeMonth) {
				let _that = this;
				getFeeDiscounts({
					page: 1,
					row: 20,
					feeId: _feeId,
					communityId: _communityId,
					cycles: _feeMonth,
					payerObjType: this.payerObjType,
					payerObjId: this.payerObjId,
					endTime: this.endTime
				}).then((data) => {
					_that.discounts = data;

					let _totalDiscountMoney = 0.0;
					let _selectDiscount = [];
					_that.discounts.forEach(disItem => {
						//disItem.discountPrice = Math.floor(disItem.discountPrice);
						if(disItem.discountType == "1001" || disItem.discountType == "3003"){
							// 优惠
							_totalDiscountMoney -= parseFloat(Math.abs(disItem.discountPrice));
							disItem.discountPrice = -1 * Math.abs(disItem.discountPrice);
						}else if(disItem.discountType == "2002"){
							// 违约
							_totalDiscountMoney += parseFloat(Math.abs(disItem.discountPrice));
							disItem.discountPrice = Math.abs(disItem.discountPrice);
						}
						_selectDiscount.push(disItem);
					})
					// if(_totalDiscountMoney > 0){
						_that.$emit('computeFeeDiscount',_totalDiscountMoney)
					// }

				})
			},
			_viewDiscountDetail: function(_discount) {

			}
		}
	};
</script>

<style lang="scss">

</style>
