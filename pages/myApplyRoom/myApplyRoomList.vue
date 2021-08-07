<template>
	<view class="tab-container bg-white">
		<view class="cu-list menu">
			<view class="cu-item arrow" v-if="applyList.length > 0" v-for="(item, key) in applyList" :key="key" :data-item="item" @click="toApplyRoomDetail(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-homefill text-green margin-right-xs"></text> {{item.applyTypeName}}</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-right margin-right-xs"></text> {{item.stateName}}</view>
				</view>
				<view class="action">
	
				</view>
			</view>
			<view class="cu-item" v-if="applyList.length === 0">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">暂无装修信息</text>
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
	
	import {
		queryApplyRoomDiscount
	} from '../../api/applyRoom/applyRoomApi.js'	
	
	export default {
		data() {
			return {
				roomDetail: [],
				applyList: [],
				noData: false
			};
		},
	
		components: {
			noDataPage
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			_that.roomDetail = JSON.parse(options.room);
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let _that = this;
			this.noData = false;
			let params = {
				roomName: this.roomDetail.floorNum + '-' + this.roomDetail.unitNum + '-' + this.roomDetail.roomNum,
				communityId: this.roomDetail.communityId,
				page: 1,
				row: 10,
			}
			console.log(params);
			queryApplyRoomDiscount(params).then(function(_res){
				_that.moreRooms = [];
				if (_res.length == 0) {
					_that.noData = true;
					return;
				}
				_that.applyList = _res
			})
		},
		methods: {
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
