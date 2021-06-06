<template>
	<view class="h5-html">
		 <web-view ref="webview"  :src="url"  @message="onReciveMessage"></web-view>
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	import {
		reciveMessage
	} from '../../api/webView/webViewApi.js'
	export default {
		data() {
			return {
				url: ''
			}
		},
		mounted() {
			// #ifdef H5
			window.addEventListener("message", this.onReciveMessage);
			// #endif
		},
		onLoad(options) {
			let _url = options.url;
			this.url = conf.mallUrlRefresh + "&url="+_url;
		},
		methods: {
			onReciveMessage: function(event) {
				console.log('商城回传的参数', event);
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
