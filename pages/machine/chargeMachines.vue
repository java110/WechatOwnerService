<template>
	<view>
		<view>
			<image :src="topImg" class="heard-location-icon"></image>
		</view>
		<view class="cu-list grid" :class="'col-2'">
			<view class="cu-item" @click="showOpenDoor(item);"
			v-for="(item,index) in machines" :key="index">
				<view :class="['cuIcon-command','text-red']"></view>
				<text>{{item.machineName}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topImg:this.imgUrl+'/h5/images/chargeMachine.png'
			}
		},
		methods: {
			
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
