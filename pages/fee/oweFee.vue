<template>
	<view>
		<scroll-view scroll-y style="padding-bottom: 200rpx;">
			<view class="block__title" v-if="fees.length > 0">应缴费用</view>
			<view class="cu-list menu"  v-for="(item,index) in fees" :key="index" :data-item="item" v-if="item.payOnline == 'Y'">
				<view class="cu-item " >
					<view class="content padding-tb-sm">
						<view>
							<view class="text-cut" style="width:150px">{{item.feeName}}({{item.payerObjName}})</view>
						</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs">{{item.endTime}}至{{item.deadlineTime}}</text></view>
					</view>
					<view class="action">
						<text class="text-grey text-sm">应缴:￥{{item.feePrice}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="fees.length > 0" class="bg-white  border flex justify-end" style="position: fixed;width: 100%;bottom: 0;">

			<view class="action text-orange margin-right line-height">
				合计：{{receivableAmount}}元
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="onPayFee()">缴费</button>	
			</view>
		</view>
	</view>

	</view>
</template>

<script>
	// pages/fee/payParkingFee.js
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;
	// #ifdef H5
	import {payOweFee} from'../../api/fee/H5PayFee.js'
	// #endif
	// #ifdef APP-PLUS
	import {payOweFee} from'../../api/fee/AppPayFee.js'
	// #endif
	// #ifdef MP-WEIXIN
	import {payOweFee} from'../../api/fee/MiniPayFee.js'
	// #endif

	import {
		addMonth,
		formatDate
	} from '../../lib/java110/utils/DateUtil.js'

	import {
		getCurCommunity
	} from '../../api/community/communityApi.js'

	import {
		getRoomOweFees
	} from '../../api/fee/feeApi.js'
	
	import {
		getCurOwner
	} from '../../api/owner/ownerApi.js'
	
	import {
		getRoomFees
	} from '../../api/fee/feeApi.js'
	
	
	export default {
		data() {
			return {
				scrollLeft: 0,
				amount: 0,
				receivableAmount: 0.00,
				communityId: '',
				communityName: '',
				appId: '',
				fees: [],
				roomId: '',
				storeId: ''
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			getCurOwner().then(function(_owner){
				_that.communityId = _owner.communityId;
				_that.communityName = _owner.communityName;
				_that.ownerId = _owner.ownerId;
				_that._loadOweFee();
			})
		},
		methods: {
			
			
			_loadOweFee: function() {
				let _that =this;
				let _objData = {
					ownerId: this.ownerId,
					page: 1,
					row: 50,
					communityId: this.communityId
				}
				getRoomOweFees(_objData)
					.then(function(_fees) {
						_that.fees = _fees;
						if(_fees && _fees.length > 0){
							_that.storeId = _fees[0].incomeObjId;
						}
						return _fees;
					}, function(error) {
						uni.showToast({
							icon:'none',
							title:'没有应缴费用'
						})
					})
					.then(function(_fees){
						_fees.forEach(function(_item){
							if(_item.payOnline == 'Y'){
								_that.receivableAmount += _item.feePrice;
							}
						})
						_that.receivableAmount = _that.receivableAmount.toFixed(2);
					})
			},
			onPayFee:function(){
				payOweFee(this);
			}
		}
	};
</script>
<style>
	.ppf_item {
		padding: 0rpx 0rpx 0rpx 0rpx;
	}

	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}

	.block__bottom {
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
