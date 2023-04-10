<template>
<view class="user-container">
	<view class="flex-sub text-center bg-white">
		<view class="solid-bottom text-xl padding">
			<text class="text-black text-bold">{{publicity.title}}</text>
		</view>
		<view class="flex justify-around">
		  <view class="footer">发布人: {{publicity.createUserName}} </view>
		  <view class="footer">时间: {{publicity.createTime}}</view>
		</view>
		  
	</view>
	<view class="flex-sub bg-white">
		<view class="content">
		    <!-- <rich-text class="solid-bottom text-df padding" :nodes="notice.context"></rich-text> -->
			<jyf-parser :html="publicity.context" ref="article"></jyf-parser>
			
		</view>
	</view>
</view>
</template>

<script>
	/** detail.js **/
	
	import conf from '../../conf/config.js'
	import {replaceImgSrc} from '../../lib/java110/utils/ImageUtil.js'
	//获取app实例
	const app = getApp().globalData;
	
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import {
		getCommunityPublicity,
		getCommunityId
	} from '@/api/community/communityApi.js';

	export default {
		data() {
			return {
				publicity: {},
				pubId: '',
				communityId:''
			};
		},
		
		components:{jyfParser},

		onLoad: function(options) {
			this.pubId = options.pubId;
			this.communityId = options.communityId;
			this._loadPublicity();
		},
		methods: {
			_loadPublicity:function(){
				let _that =this;
				getCommunityPublicity({
					pubId:this.pubId,
					communityId:this.communityId,
					page:1,
					row:1
				}).then(_data=>{
					let _publicity = _data[0];
					_publicity.createTime = _publicity.createTime.replace(/:\d{1,2}$/, ' ');
					_that.publicity = _publicity;
				});
			},
			
		}
	};
</script>
<style lang="scss">
	.user-container {
	    padding: 25rpx 10rpx;
	    background-color: #F0F0F0;
		/*border: 1px solid black;*/
	}
	
	.notice {
	    margin: 10rpx 7rpx;
	    padding: 25rpx;
	    background-color: #ffffff;
	    border-radius: 7rpx;
	}
	.title {
	    border-bottom: 1rpx solid #dedede;
	    font-weight: 700;
	    font-size: 34rpx;
	    color: #00AA00;
	}
	.content{
	    padding: 15rpx 0;
	    font-size: 25rpx;
	    color: #7B7B7B;
	}
	.footer {
	    padding: 15rpx 0;
	    font-size: 22rpx;
	    color: #ADADAD;
	}
</style>
