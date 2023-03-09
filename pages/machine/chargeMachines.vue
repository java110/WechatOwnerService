<template>
	<view>
		<view>
			<image :src="topImg" class="heard-location-icon"></image>
		</view>
		<view class="cu-list grid" :class="'col-2'">
			<view class="cu-item" @click="_toCharge(item);"
			v-for="(item,index) in machines" :key="index">
				<view :class="['cuIcon-command','text-green']"></view>
				<text>{{item.machineName}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getChargeMachines} from '../../api/machine/machineApi.js';
	import {getCommunityId} from '../../api/community/communityApi.js';
	import {
		hasOwner
	} from '@/api/owner/ownerApi.js';
	export default {
		data() {
			return {
				topImg:this.imgUrl+'/h5/images/chargeMachine.jpg',
				machines:[]
			}
		},
		onLoad(options) {
			this._loadChargeMachines();
		},
		methods: {
			_loadChargeMachines:function(){
				let _that = this;
				getChargeMachines({
					page:1,
					row:100,
					communityId:getCommunityId()
				}).then(_data=>{
					_that.machines = _data.data;
				})
			},
			_toCharge:function(_item){
				hasOwner();
				this.vc.navigateTo({
					url: '/pages/machine/machineToCharge?machineId='+_item.machineId+"&communityId="+_item.communityId
				});
			}
			
		}
	}
</script>

<style>
	.heard-location-icon{
	  width: 100%;
	  height: 300rpx;
	}
	text {
		text-align: center;
	}
</style>
