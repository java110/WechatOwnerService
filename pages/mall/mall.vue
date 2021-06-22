<template>
	<view class="h5-html">
		 <web-view ref="webview"  :src="url"  @onPostMessage="onReciveMessage"></web-view>
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	import {
		reciveMessage,getHcCode
	} from '../../api/webView/webViewApi.js'


	export default {
		data() {
			return {
				url: '',
				communityId: ''
			}
		},
		mounted() {
			// #ifdef H5
			window.addEventListener("message", this.onReciveMessage);
			// #endif
		},
		onLoad(options) {
			let _that = this;
			let _url = options.url;

			//刷新hcCode
			this.vc.getCurCommunity()
				.then(function(_communityInfo) {
					_that.communityId = _communityInfo.communityId;
				})
				.then(function() {
					_that.url = conf.mallUrlIndexPage +"&hcCommunityId="+_that.communityId;
				})

		},
		methods: {
			onReciveMessage: function(event) {
				reciveMessage(event);
			}
		}
	}
</script>

<style>
	.h5-html {
		width: 100%;
		height: 100%;
	}
</style>
