<template>
	<view>
		<view class="block__title">
			<text>访客预约历史</text>
			<button class="cu-btn bg-blue" @click="_addVisit()">新增预约</button>
			</view>
		<view v-if="noData == false">
			<view v-for="(item,index) in visits" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding" @click="_showDetail(item)">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>预约状态</view>
					<view class="text-gray">{{item.recordState == 1 ? '已失效' : '已生效'}}</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">访客姓名</view>
					<view class="text-gray">{{item.vName}}</view>
				</view>
				<!-- <view class="flex margin-top-xs justify-between">
					<view class="text-gray">访客联系方式</view>
					<view class="text-gray">{{item.phoneNumber}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">访客性别</view>
					<view class="text-gray">{{item.visitGender=='0'?'男':'女'}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">来访事由</view>
					<view class="text-gray">{{item.visitCase}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">事由类型</view>
					<view class="text-gray">{{item.reasonType == 0 ? '喜事' : (item.reasonType == 1 ? '白事' : '-')}}</view>
				</view> -->
				<view class="flex margin-top-xs justify-between" v-if="item.carNum">
					<view class="text-gray">车牌号</view>
					<view class="text-gray">{{item.carNum}}</view>
				</view>
				<view class="flex margin-top-xs justify-between" v-if="item.carNum">
					<view class="text-gray">车辆审核状态</view>
					<view class="text-gray">{{item.stateName}}</view>
				</view>
				<!-- <view class="flex margin-top-xs justify-between">
					<view class="text-gray">随行人数</view>
					<view class="text-gray">{{item.entourage}}</view>
				</view> -->
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预计来访时间</view>
					<view class="text-gray">{{item.visitTime}}</view>
				</view>
				<!-- <view class="flex margin-top-xs justify-between">
					<view class="text-gray">离开时间</view>
					<view class="text-gray">{{item.departureTime}}</view>
				</view> -->
			</view>
			<uni-load-more :status="loadingStatus" :content-text="loadingContentText" />
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>

	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	import {listOwnerVisit}  from '../../api/visit/visit.js'
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

	export default {
		data() {
			return {
				visits: [],
				ownerInfo: {},
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
				_that.ownerInfo = _owner;
				_that._loadVisitList();
			});

			
		},
		onReachBottom : function(){
			if(this.loadingStatus == 'noMore'){
				return;
			}
			this._loadVisitList();
		},
		methods: {
			_addVisit: function(){
				uni.navigateTo({
					url: '/pages/visit/addVisit'
				})
			},
			_loadVisitList: function() {
				this.loadingStatus = 'more';
				let _that = this;
				let _objData = {
					page: _that.page,
					row: 10,
					ownerId: this.ownerInfo.ownerId,
					userId: this.ownerInfo.userId,
					communityId: this.ownerInfo.communityId
				}
				listOwnerVisit(_objData).then(function(_visits){
					_that.visits = _that.visits.concat(_visits.visits);
					_that.page ++;
					
					if (_that.visits.length < 1) {
						_that.noData = true;
					}
					if(_that.visits.length == _visits.total){
						_that.loadingStatus = 'noMore';
						return;
					}
				})
			},
			
			_showDetail(_item){
				uni.navigateTo({
					url: '/pages/visit/visitDetail?vId=' + _item.vId
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
		display: flex;
		justify-content: space-between;
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
