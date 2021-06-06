<template>
<view class="user-container">
	<view class="flex-sub text-center bg-white">
		<view class="solid-bottom text-xl padding">
			<text class="text-black text-bold">{{notice.title}}</text>
		</view>
		  <view class="footer">时间: {{notice.timeStr}}</view>
	</view>
	<view class="flex-sub bg-white">
		<view class="content">
		    <!-- <rich-text class="solid-bottom text-df padding" :nodes="notice.context"></rich-text> -->
			<jyf-parser :html="notice.context" ref="article"></jyf-parser>
			
		</view>
	</view>
</view>
</template>

<script>
	/** detail.js **/
	const context = require("../../../context/Java110Context.js");
	const constant = context.constant; //获取app实例
	import conf from '../../../conf/config.js'
	import {replaceImgSrc} from '../../../utils/ImageUtil.js'
	//获取app实例
	const app = getApp().globalData;
	
	import jyfParser from "@/components/jyf-parser/jyf-parser";

	export default {
		data() {
			return {
				notice: {},
				noticeId: ''
			};
		},
		
		components:{jyfParser},

		onLoad: function(options) {
			context.onLoad(options);
			let _noticeId = options.noticeId;
			this.noticeId = _noticeId;
			this._loadNoticeDetail();
		},
		onShow: function() {
			let that = this; // that.setData({
			//     userInfo: app.globalData.userInfo
			// });
		},
		methods: {
			_loadNoticeDetail: function() {
				let that = this;
				
				that.communityId = context.getUserInfo().communityId;
				context.request({
					header: context.getHeaders(),
					url: constant.url.GetNoticeListUrl,
					method: "GET",
					data: {
						communityId: that.communityId,
						page: 1,
						row: 10,
						noticeId: that.noticeId
					},
					success: function(res) {
						// TODO 判断
						console.log(res);
						let notice = res.data.notices[0]
						notice.timeStr = notice.startTime.replace(/:\d{1,2}$/, ' ');
						notice.context = replaceImgSrc(notice.context,conf.baseUrl);
						that.notice = notice;
					}
				});
			}
		}
	};
</script>
<style>
	@import "./detail.css";
</style>
