<template>
	<view class="tab-container bg-white">
		<view class="cu-list menu">
			<view class="cu-item arrow" v-if="orders.length > 0" v-for="(item, key) in orders" :key="key" :data-item="item" @click="toDetail(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-homefill text-green margin-right-xs"></text>{{item.machineName}}-{{item.portName}}</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-right margin-right-xs"></text> 订单：{{item.orderId}}</view>
				</view>
				<view class="action">
					{{item.stateName}}
				</view>
			</view>
			<view class="cu-item" v-if="orders.length === 0">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">暂无充电记录</text>
				</view>
				<view class="action">
	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	import {
		getChargeMachineOrder
	} from '../../api/machine/machineApi.js';
	
	import {getCurOwner} from '../../api/owner/ownerApi.js'
	import {
		getCommunityId
	} from '../../api/community/communityApi.js'
	export default {
		data() {
			return {
				orders:[],
				personTel:''
			}
		},
		components: {
			noDataPage
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			let _that = this;
			getCurOwner().then(_owner=>{
				_that.personTel = _owner.link;
				_that._loadChargeMachineOrder();
			})
			
		},
		methods: {
			_loadChargeMachineOrder:function(){
				let _that = this;
				getChargeMachineOrder({
					communityId:getCommunityId(),
					page:1,
					row:15,
					personTel:this.personTel
				}).then(_data =>{
					_that.orders = _data;
				})
			},
			toDetail:function(_order){
				uni.navigateTo({
					url:'/pages/machine/chargeMachineOrder?orderId='+_order.orderId 
				})
			}
		}
	}
</script>

<style>
.tab-container {
		/*border: 1px solid black;*/
		
		margin-top: 30rpx;
	}
	.tab-item {
		padding: 20rpx 30rpx;
	
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.tab-item-hover {
		background-color: #e6e6e6;
	}
	.tab-icon {
		width: 30rpx;
		height: 30rpx;
	}
	.tab-text {
		display: inline-block;
		margin-left: 10rpx;
		color: #1e1e1e;
	}
	.tab-arrow {
		display: inline-block;
		width: 20rpx;
		height: 20rpx;
		border: 1px solid #cdcdcd;
	
		border-left: none;
		border-bottom: none;
	
		transform: rotate(45deg);
	}
	.border-bottom .icon{
	  font-size: 38rpx;
	  line-height: 38rpx;
	}
</style>
