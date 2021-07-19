<template>
	<view class="user-container">
		<view class="cu-list menu" v-if="notices.length > 0" v-for="(notice, idx) in notices" :key="idx" :data-item="notice"
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
		<view class="cu-list menu" v-if="notices.length === 0">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-notification text-grey"></text>
					<text class="text-grey">暂无公告信息</text>
				</view>
				<view class="action">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				pageSize: 10
			};
		},
		onLoad: function(options) {
			let that = this;
			context.onLoad(options);
			that.communityId = context.getUserInfo().communityId;
			
			context.request({
				header: context.getHeaders(),
				url: constant.url.GetNoticeListUrl,
				method: "GET",
				data: {
					communityId: that.communityId,
					page: 1,
					row: 10,
					noticeTypeCd:1000,
					clientType: 'H5'
				},
				success: function(res) {
					// TODO 判断
					console.log(res);
					res.data.notices.forEach(function(item, index) {
						item.timeStr = item.startTime.replace(/:\d{1,2}$/, ' ');
					});
					that.notices = res.data.notices;
				}
			});
		},
		onShow: function() {
			let that = this;
		},
		methods: {
			gotoDetail: function(_notice) {
				console.log('看看',_notice);
				let that = this;
				
				//wx.setStorageSync('notice-' + index, JSON.stringify(that.notices[index]));
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
