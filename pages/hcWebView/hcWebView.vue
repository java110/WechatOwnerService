<template>
	<view class="h5-html">
		 <web-view ref="webview"  :src="url"  @message="reciveMessage"></web-view>
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	import {
		decodeUrl
	} from '../../utils/UrlUtil.js'
	import {
		reciveMessage
	} from '../../api/webView/webViewApi.js'

	import {
		isNull
	} from '../../utils/StringUtil.js'

	import {
		getStorageSync
	} from '../../utils/StorageUtil.js'
	import mapping from '../../constant/MappingConstant.js'
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			let _url = options.url;
			if (isNull(_url)) {
				_url = getStorageSync(mapping.HC_MALL_CUR_URL);
			}
			if (_url.indexOf("http") < 0 && _url.indexOf("https") < 0) {
				_url = conf.mallUrl + '#' + _url;
			}
			this.url = _url;
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
