<template>
	<view>
		<view  class="block__title">缴费历史</view>
		<view v-if="noData == false">
			<view v-for="(item,index) in feeDetails" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>缴费金额</view>
					<view class="text-gray">{{item.receivedAmount}}元</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">费用名称</view>
					<view class="text-gray">{{item.feeName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">缴费编码</view>
					<view class="text-gray">{{item.detailId}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">缴费周期</view>
					<view class="text-gray">{{item.cycles}}个月</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">起始时间</view>
					<view class="text-gray">{{item.startTime}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">结束时间</view>
					<view class="text-gray">{{item.endTime}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">缴费时间</view>
					<view class="text-gray">{{item.createTime}}</view>
				</view>
				<view class="flex margin-top-xs justify-between" v-if="item.preDegrees">
					<view class="text-gray">上期度数</view>
					<view class="text-gray">{{item.preDegrees}}</view>
				</view>
				<view class="flex margin-top-xs justify-between" v-if="item.curDegrees">
					<view class="text-gray">本期度数</view>
					<view class="text-gray">{{item.curDegrees}}</view>
				</view>
				<view class="flex margin-top-xs justify-between" v-if="item.preDegrees">
					<view class="text-gray">使用量</view>
					<view class="text-gray">{{item.curDegrees-item.preDegrees}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">备注</view>
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
	import {formatDate}  from '../../utils/DateUtil.js'

	const constant = context.constant;
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';


	const util = context.util;
	export default {
		data() {
			return {
				feeDetails: [],
				ownerId: '',
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
			let _that = this;
			context.getOwner(function(_owner) {
				_that.ownerId = _owner.memberId;
				_that.communityId = _owner.communityId;
				_that._loadFeeDetail();
			});

			
		},
		onReachBottom : function(){
			if(this.loadingStatus == 'noMore'){
				return;
			}
			this._loadFeeDetail();
		},
		methods: {
			_loadFeeDetail: function() {
				this.loadingStatus = 'more';
				let _that = this;
				let _objData = {
					page: _that.page,
					row: 10,
					ownerId: this.ownerId,
					communityId: this.communityId
				}
				context.request({
					url: constant.url.queryFeeDetail,
					header: context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						if (res.statusCode == 200) {
							//成功情况下跳转
							let _feeDetails = res.data.feeDetails;
							if (_feeDetails == null || _feeDetails == undefined) {
								_feeDetails = [];
							} else {
								_feeDetails.forEach(function(_feeDetail) {
									let _tmpCreateTime = _feeDetail.createTime.replace(/\-/g, "/")
									let _createTime = new Date(_tmpCreateTime);
									_feeDetail.createTime = formatDate(_createTime);
									if(_feeDetail.hasOwnProperty("startTime")){
										let _tmpStartTime = _feeDetail.startTime.replace(/\-/g, "/")
										let _startTime = new Date(_tmpStartTime);
										_feeDetail.startTime = formatDate(_startTime);
									}
									
									if(_feeDetail.hasOwnProperty("endTime")){
										let _tmpEndTime = _feeDetail.endTime.replace(/\-/g, "/")
										let _endTime = new Date(_tmpEndTime);
										_feeDetail.endTime = formatDate(_endTime);
									}
									
								});
							}
							_that.feeDetails = _that.feeDetails.concat(_feeDetails);
							_that.page ++;

							if (_that.feeDetails.length < 1) {
								_that.noData = true;
							}
							if(_that.feeDetails.length == res.data.total){
								_that.loadingStatus = 'noMore';
								return;
							}
						}
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
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
