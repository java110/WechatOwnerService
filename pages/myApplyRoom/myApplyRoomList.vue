<template>
	<view class="tab-container bg-white">
		<view class="cu-list menu" v-if="applyList.length > 0">
			<view class="cu-item arrow" v-for="(item, key) in applyList" :key="key" :data-item="item" @click="toApplyRoomDetail(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-homefill text-green margin-right-xs"></text> {{item.applyTypeName}}</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-right margin-right-xs"></text> {{item.stateName}}</view>
				</view>
				<view class="action">
	
				</view>
			</view>
			<uni-load-more :status="loadingStatus" :content-text="loadingContentText" />
		</view>
		<view class="cu-list menu" v-else>
			<view class="cu-item" v-if="applyList.length === 0">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">暂无申请信息</text>
				</view>
				<view class="action">
	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
	import {
		queryApplyRoomDiscount
	} from '../../api/applyRoom/applyRoomApi.js'	
	
	export default {
		data() {
			return {
				roomDetail: [],
				applyList: [],
				noData: false,
				page: 1,
				loadingStatus : 'loading',
				loadingContentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			};
		},
	
		components: {
			noDataPage,
			uniLoadMore
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			_that.roomDetail = JSON.parse(options.room);
			_that._loadApply();
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			
		},
		onReachBottom : function(){
			if(this.loadingStatus == 'noMore'){
				return;
			}
			this._loadApply();
		},
		methods: {
			_loadApply: function(){
				this.loadingStatus = 'more';
				let _that = this;
				let params = {
					roomName: this.roomDetail.floorNum + '-' + this.roomDetail.unitNum + '-' + this.roomDetail.roomNum,
					communityId: this.roomDetail.communityId,
					page: _that.page,
					row: 10,
				}
				queryApplyRoomDiscount(params).then(function(_res){
					_that.applyList = _that.applyList.concat(_res.data);
					_that.page ++;
					if(_that.applyList.length == _res.total){
						_that.loadingStatus = 'noMore';
						return;
					}
				})
			},
			
			toApplyRoomDetail: function(_item) {
				this.vc.navigateTo({
					url: '/pages/myApplyRoom/myApplyRoomDetail?room=' + JSON.stringify(_item)
				});
			},
		}
	};
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
