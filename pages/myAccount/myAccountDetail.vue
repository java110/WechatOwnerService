<template>
	<view>
		<view  class="block__title">缴费历史</view>
		<view v-if="accountDetails.length > 0">
			<view v-for="(item,index) in accountDetails" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>金额</view>
					<view class="text-gray">{{item.amount}}元</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">交易编号</view>
					<view class="text-gray">{{item.orderId}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">明细编号</view>
					<view class="text-gray">{{item.detailId}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">账户名称</view>
					<view class="text-gray">{{item.acctName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">明细类型</view>
					<view class="text-gray">{{item.detailType =='1001'?'转入':'转出'}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">交易时间</view>
					<view class="text-gray">{{item.createTime}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">说明</view>
					<view class="text-gray">{{item.remark}}</view>
				</view>
			</view>
			<uni-load-more :status="loadingStatus" :content-text="loadingContentText" />
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>

	</view>
</template>

<script>
	const context = require('../../context/Java110Context.js');
	import {queryOwnerAccountDetail} from '../../api/user/userApi.js'
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';


	const util = context.util;
	export default {
		data() {
			return {
				acctId: '',
				accountDetails: [],
				communityId: '',
				noData: false,
				page: 1,
				loadingStatus : 'loading',
				loadingContentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		components: {
			noDataPage,
			uniLoadMore
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			this.acctId = options.acctId;
			let _that = this;
			context.getOwner(function(_owner) {
				_that.communityId = _owner.communityId;
				_that._loadAccountDetail();
			});

			
		},
		onReachBottom : function(){
			if(this.loadingStatus == 'noMore'){
				return;
			}
			this._loadAccountDetail();
		},
		methods: {
			_loadAccountDetail: function() {
				this.loadingStatus = 'more';
				let _that = this;
				let _objData = {
					page: _that.page,
					row: 10,
					acctId: _that.acctId,
					communityId: _that.communityId
				}
				queryOwnerAccountDetail(_objData).then((res) => {
					console.log(res);
					_that.accountDetails = _that.accountDetails.concat(res.data.data);
					_that.page ++;
					if(_that.accountDetails.length == res.data.total){
						_that.loadingStatus = 'noMore';
						return;
					}
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
