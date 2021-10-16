<template>
	<view>
		<view class="margin-top" v-if="applyRoomRecordList.length > 0">
			<view class="cu-list menu-avatar " v-for="(item,index) in applyRoomRecordList" :key="index" @tap="_showDetail(item)">
				<view class="cu-item arrow">
					<view class="item-content">
						<view class="text-grey">
							<text class="cuIcon-notification text-cut text-green margin-right-xs"></text>
						 {{item.stateName}}-{{item.createTime}}
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								操作人员：{{item.createUserName}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">
							<text class="lg text-gray cuIcon-right margin-left-xs"></text>
						</view>
					</view>
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
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {listApplyRoomDiscountRecord} from '../../api/applyRoom/applyRoomApi.js'
	export default {
		data() {
			return {
				applyRoomInfo: [],
				communityId: '',
				applyRoomRecordList: [],
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
		onLoad: function(options) {
			let _that = this;
			_that.applyRoomInfo = JSON.parse(options.apply);
			console.log(_that.applyRoomInfo);
			this.loadApply();
		},
		onShow: function(){
		},
		onReachBottom : function(){
			if(this.loadingStatus == 'noMore'){
				return;
			}
			this.loadApply();
		},
		methods: {
			/**
			 * 加载数据
			 */
			loadApply: function(){
				this.loadingStatus = 'more';
				let _that = this;
				let _objData = {
					page: this.page,
					row: 10,
					communityId: this.applyRoomInfo.communityId,
					ardId: this.applyRoomInfo.ardId,
					roomName: this.applyRoomInfo.roomName,
					roomId: this.applyRoomInfo.roomId
				};
				listApplyRoomDiscountRecord(_objData)
				.then(function(res){
					_that.applyRoomRecordList = _that.applyRoomRecordList.concat(res.data)
					_that.page ++;
					if(_that.applyRoomRecordList.length == res.total){
						_that.loadingStatus = 'noMore';
						return;
					}
				})
			},
			
			/**
			 * 跳转详情页
			 */			
			_showDetail: function(_item){
				_item.communityId = this.applyRoomInfo.communityId;
				uni.navigateTo({
					url: '/pages/myApplyRoom/myApplyRoomRecordDetail?apply=' + JSON.stringify(_item)
				});
			}
		}
	}
</script>

<style>
	.record-add{
		position: fixed;
		right: 10rpx;
		bottom: 50rpx;
		width: 100rpx;
		height: 100rpx;
	}
	.record-add img{
		width: 100%;
		height: 100%;
	}
	.load-more{
		width: 80%;
		margin: 30rpx auto;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		color: #007AFF;
		font-size: 32rpx;
		text-decoration: underline;
	}
	.item-content{
		width: 100%;
		margin-left: 20rpx;
		line-height: 1.6em;
	}
</style>
