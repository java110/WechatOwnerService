<template>
	<view>
		<view  class="block__title">门禁同步记录</view>
		<view v-if="noData == false">
			<view v-for="(item,index) in machineTranslates" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>同步时间</view>
					<view class="text-gray">{{item.updateTime}}</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">设备名称</view>
					<view class="text-gray">{{item.machineName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">状态</view>
					<view class="text-gray">{{item.stateName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">说明</view>
					<view class="text-gray">{{item.remark}}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>

	</view>
</template>

<script>
	const context = require('../../context/Java110Context.js');
	import {formatDate}  from '../../utils/DateUtil.js'
	
	import {getMachineTranslates} from '../../api/machine/machineApi.js'

	const constant = context.constant;
	import noDataPage from '@/components/no-data-page/no-data-page.vue'


	const util = context.util;
	export default {
		data() {
			return {
				machineTranslates: [],
				ownerId: '',
				communityId: '',
				noData: false
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
			context.getOwner(function(_owner) {
				_that.ownerId = _owner.memberId;
				_that.communityId = _owner.communityId;
				_that._loadMachineTranslates();
			});

			
		},
		methods: {
			_loadMachineTranslates: function() {
				let _that = this;
				getMachineTranslates({
					page: 1,
					row: 30,
					typeCd:'8899',
					objId:this.ownerId,
					communityId:this.communityId
				})
				.then(_data => {
					_data.forEach(function(_log) {
						_log.updateTime = _log.updateTime.replace(/\-/g, "/")	
					});
					_that.machineTranslates = _data;
				},err =>{
					_that.noData = true;
				});
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
