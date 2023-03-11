<template>
	<view class="">
		<view class="suc-a">
			<view class="a-name">
				{{machineName}}
			</view>
			<view class="a-code">
				设备编号: {{machineCode}}
			</view>
		</view>
		
		<view class="suc-b">
			<view class="suc-b-1">收费规则: 按时间收费(最小1小时)</view>
			<view class="suc-b-1">充电价格: {{durationPrice}}元/小时, 1小时起</view>
			<view class="suc-b-1">规则说明:</view>
			<view class="suc-b-2">1、充电时间不满1小时按1小时结算</view>
			<view class="suc-b-2">2、充电自满最长充电时间为10小时</view>
		</view>
		
		<view class="plat-btn-black"></view>
		<view class="cu-bar btn-group" style="margin-top: 30px;">
			<button @click="_toChargeConfirm"
				class="cu-btn bg-orange shadow-blur round lg">我知道了</button>
		</view>
	</view>
</template>

<script>
	import {
		getChargeMachines,
		startCharge
	} from '../../api/machine/machineApi.js';
	import {
		getCommunityId
	} from '../../api/community/communityApi.js'
	export default {
		data() {
			return {
				machineId: '',
				portId:'',
				duration:'',
				communityId: '',
				machineCode: '',
				machineName: '',
				durationPrice: '',
				couponIds:'',
			}
		},
		
		onLoad(options) {
			this.machineId = options.machineId;
			this.communityId = options.communityId;
			this.portId = options.portId;
			this.duration = options.duration;
			this.couponIds = options.couponIds;
			this._loadChargeMachines();
		},
		methods: {
			_loadChargeMachines: function() {
				let _that = this;
				getChargeMachines({
					page: 1,
					row: 1,
					machineId: this.machineId,
					communityId: this.communityId
				}).then(_data => {
					//_that.machines = _data.data;
					_that.machineCode = _data.data[0].machineCode;
					_that.machineName = _data.data[0].machineName;
					_that.durationPrice = _data.data[0].durationPrice;
				})
			},
			_toChargeConfirm:function(){
				
				startCharge({
					communityId:getCommunityId(),
					machineId:this.machineId,
					portId:this.portId,
					duration:this.duration,
					couponIds:this.couponIds
				}).then(_data=>{
					if(_data.code != 0){
						uni.showToast({
							icon:'none',
							title:_data.msg
						});
						return ;
					}
					
					uni.navigateTo({
						url:'/pages/machine/chargeMachineOrder?orderId='+_data.data 
					})
				})
				
				// uni.navigateTo({
				// 	url:'/pages/machine/chargeMachineOrder?orderId=112023031176130002'
				// })
			}
		}
	}
</script>

<style lang="scss">
	.suc-a{
		height: 120upx;
		margin: 40upx;
		background-color: #0FBA82;
		border-radius: 20upx;
		text-align: center;
		color: #fff;
		padding-top: 25upx;
		.a-name{
			font-size: 32upx;
		}
		.a-code{
			font-size: 28upx;;
		}
	}
	.suc-b{
		margin: 40upx;
		margin-top:80upx;
		.suc-b-1{
			font-size: 30upx;
			color: #000;
			font-weight: 400;
			margin-bottom: 30upx;
		}
		.suc-b-2{
			margin-bottom: 10upx;
		}
	}
</style>
