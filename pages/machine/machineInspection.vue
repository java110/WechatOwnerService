<template>
	<view>
		<view  class="block__title">巡检记录</view>
		<view v-if="details.length > 0">
			<view v-for="(item,index) in details" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>巡检点</view>
					<view class="text-gray">{{item.inspectionName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">巡检时间</view>
					<view class="text-gray">{{item.inspectionTime}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">巡检人</view>
					<view class="text-gray">{{item.actUserName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">巡检说明</view>
					<view class="text-gray">{{item.description}}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>

	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	import {formatDate}  from '../../lib/java110/utils/DateUtil.js'

	const constant = context.constant;
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	
	import {getMachineInspections} from '@/api/machine/machineApi.js'


	const util = context.util;
	export default {
		data() {
			return {
				details: [],
				machineId: '',
				communityId: '',
				noData: false,
				page: 1,
			}
		},
		components: {
			noDataPage,
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.machineId = options.machineId;
			this.communityId = options.communityId;
			this._loadDetail();
			
		},
		onReachBottom : function(){
			if(this.loadingStatus == 'noMore'){
				return;
			}
			
		},
		methods: {
			_loadDetail: function() {
				this.loadingStatus = 'more';
				let _that = this;
				let _objData = 
				getMachineInspections({
					page: 1,
					row: 30,
					pointObjId: this.machineId,
					communityId: this.communityId,
					state:'20200407'
				}).then(_data=>{
					_that.details = _data.data;
				})
			}
		}
	}
</script>

<style>
	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}

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
</style>
