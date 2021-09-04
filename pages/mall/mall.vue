<template>
	<view class="h5-html">
		 <web-view ref="webview"  :src="url"  @onPostMessage="onReciveMessage"></web-view>
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	import {
		reciveMessage,
		getHcCode
	} from '../../api/webView/webViewApi.js'
	import {
		getStorageSync,
		setStorageSync
	} from '../../utils/StorageUtil.js'
	import {
		decodeUrl
	} from '../../utils/UrlUtil.js';


	export default {
		data() {
			return {
				url: '',
				communityId: ''
			}
		},
		onLoad(options) {
			let _that = this;
			let _url = options.url;
			_url = decodeUrl(_url);
			//刷新hcCode
			this.vc.getCurCommunity()
				.then(function(_communityInfo) {
					_that.communityId = _communityInfo.communityId;
				})
				.then(function() {
					_that.url = conf.mallUrlIndexPage + "&hcCommunityId=" + _that.communityId;
				})

		},
		onShow() {
			let _goBackRefresh = getStorageSync('_go_back_refresh');
			if (_goBackRefresh == 1) {
				let wv = this.$refs.webview
				wv.currentWebview().reload(true);
			}
			setStorageSync('_go_back_refresh', 0);

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
