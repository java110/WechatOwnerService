<template>
	<view>
		<view class="block__title">账户充值</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">账户名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{account.acctName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">账户余额</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{account.amount}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">充值金额</text>
				</view>
				<view class="action">
					<input v-model="amount" placeholder="请输入充值金额" type="number" class="text-right"></input>
				</view>
			</view>
		</view>
		
		<view class=" bg-white  border flex justify-end" style="position: fixed;width: 100%;bottom: 0;">
		
			<view class="action text-orange margin-right line-height">
				合计：{{amount}}元
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="onPayFee()">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/account/myAccount.js
	import context from '../../lib/java110/Java110Context.js';
	import {
		queryOwnerAccount,
		getUserId
	} from '../../api/user/userApi.js';
	import {getCommunityId} from '@/api/community/communityApi.js';
	import {getWAppId} from '../../lib/java110/utils/StorageUtil.js'
	
	import {payFeeApp,payFeeWechat} from '@/api/fee/feeApi.js';
	export default {
		data() {
			return {
				account:{},
				amount:'',
				appId:'',
				communityId:'',
			}
		},
		onLoad(options) {
			this.communityId = options.communityId;
			this.loadOwnerAccount();
		},
		methods: {
			loadOwnerAccount: function() {
				let _that = this;
				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						queryOwnerAccount({
							page: 1,
							row: 20,
							idCard: _ownerInfo.idCard,
							link: _ownerInfo.link,
							communityId: _that.communityId,
							acctType:'2003'
						}).then((data) => {
							if (!data) {
								_that.account = {};
								return;
							}
							_that.account = data[0];
						})
					}
				});
			},
			onPayFee: function() {
				if(!this.amount){
					uni.showToast({
						icon:'none',
						title:'未填写金额'
					});
					return ;
				}
				let _receivedAmount = this.amount;
				let _tradeType = 'JSAPI';
				
				let _objData = {
					business: "preStoreOnline",
					communityId: this.communityId,
					acctId: this.account.acctId,
					feeName: '账户充值',
					receivedAmount: _receivedAmount,
					tradeType: _tradeType,
				};
				
				uni.setStorageSync('doing_cashier',_objData);
				uni.navigateTo({
					url:'/pages/fee/cashier?money='+_receivedAmount+"&business=preStoreOnline&communityId="+this.communityId+"&cashierUserId="+getUserId()
				})
			}
		}
	}
</script>

<style lang="scss">
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
