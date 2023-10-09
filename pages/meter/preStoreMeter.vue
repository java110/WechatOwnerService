<template>
	<view>
		<view class="block__title">{{machineName}}充值</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">费用</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{feeConfigName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">剩余余额</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{prestoreDegrees}}</text>
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
	import {getMeterMachine} from '../../api/machine/machineApi.js';
	import {getCommunityId} from '@/api/community/communityApi.js';
	import {getUserId} from '../../api/user/userApi.js';
	
	import {payFeeApp,payFeeWechat} from '@/api/fee/feeApi.js';
	export default {
		data() {
			return {
				machineId:'',
				machineName:'',
				feeConfigName:'',
				prestoreDegrees:'0',
				amount:'0',
				appId:'',
				communityId:'',
				roomId:''
			}
		},
		onLoad(options) {
			this.machineId = options.machineId;
			this.roomId = options.roomId;
			this.loadMeterMachine();
		},
		methods: {
			loadMeterMachine: function() {
				let _that = this;
				getMeterMachine({
					page:1,
					row:10,
					communityId:getCommunityId(),
					machineId:this.machineId,
					roomId:this.roomId
				}).then(_data=>{
					_that.machineName=_data[0].machineName;
					_that.feeConfigName=_data[0].feeConfigName;
					_that.prestoreDegrees=_data[0].prestoreDegrees;
					_that.amount=_data[0].amount;
				})
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
					business: "preStoreMeter",
					communityId:getCommunityId(),
					roomId: this.roomId,
					machineId: this.machineId,
					feeName: this.feeConfigName+'充值',
					receivedAmount: _receivedAmount,
					tradeType: _tradeType,
				};
				uni.setStorageSync('doing_cashier',_objData);
				uni.navigateTo({
					url:'/pages/fee/cashier?money='+_receivedAmount+"&business=preStoreMeter&communityId="+getCommunityId()+"&cashierUserId="+getUserId()
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
