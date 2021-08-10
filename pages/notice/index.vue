<template>
	<view class="user-container">
		<block v-if="notices.length > 0">
			<view class="cu-list menu" v-for="(notice, idx) in notices" :key="idx" :data-item="notice"
			 @click="gotoDetail(notice)">
				<view class="cu-item arrow">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-notification text-cut text-green margin-right-xs"></text>
							<view class="text-cut" style="width:220px">{{notice.title}}</view>
						</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs">发布时间：</text> {{notice.timeStr}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingStatus" :content-text="loadingContentText" />
		</block>
		<block v-else>
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-notification text-grey"></text>
						<text class="text-grey">暂无公告信息</text>
					</view>
					<view class="action">
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	/** index.js **/
	const context = require("../../context/Java110Context.js");
	const constant = context.constant; //获取app实例
	//获取app实例
	const app = getApp().globalData;

	export default {
		data() {
			return {
				communityId: "",
				notices: [],
				currPageIndex: 0,
				pageSize: 10,
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
			uniLoadMore
		},
		onLoad: function(options) {
			let that = this;
			context.onLoad(options);
			that.communityId = context.getUserInfo().communityId;
			that._loadNotices();
		},
		onShow: function() {
			let that = this;
		},
		onReachBottom : function(){
			if(this.loadingStatus == 'noMore'){
				return;
			}
			this._loadApply();
		},
		methods: {
			_loadNotices: function(){
				this.loadingStatus = 'more';
				let that = this;
				context.request({
					header: context.getHeaders(),
					url: constant.url.GetNoticeListUrl,
					method: "GET",
					data: {
						communityId: that.communityId,
						page: that.page,
						row: 10,
						noticeTypeCd:1000,
						clientType: 'H5'
					},
					success: function(res) {
						// TODO 判断
						res.data.notices.forEach(function(item, index) {
							item.timeStr = item.startTime.replace(/:\d{1,2}$/, ' ');
						});
						that.notices = that.notices.concat(res.data.notices);
						if(that.notices.length == res.data.total){
							that.loadingStatus = 'noMore';
							return;
						}
					}
				});
			},
			gotoDetail: function(_notice) {
				let that = this;
				this.vc.navigateTo({
					url: "/pages/notice/detail/detail?noticeId=" + _notice.noticeId
				});
			},
		}
	};
</script>
<style>
	@import "./index.css";
	.cu-list+.cu-list {
	    margin-top: 10px;
	}
</style>
