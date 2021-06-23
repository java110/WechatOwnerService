<template>
	<view class="h5-html">
		 <web-view ref="webview"  :src="url"  @message="onReciveMessage"></web-view>
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	import {
		reciveMessage,
		getHcCode
	} from '../../api/webView/webViewApi.js'

	import {
		isNotNull
	} from '../../utils/StringUtil.js'

	import {
		decodeUrl,
		encodeUrl
	} from '../../utils/UrlUtil.js'
	const context = require("../../context/Java110Context.js");
	export default {
		data() {
			return {
				url: '',
			}
		},
		mounted() {
			// #ifdef H5
			window.addEventListener("message", this.onReciveMessage);
			// #endif
		},
		onLoad(options) {
			let _key = options.key;
			if (isNotNull(_key)) {
				context.onLoad(options, this._getHcCode);
			} else {
				this._getHcCode()
			}
		},
		methods: {
			onReciveMessage: function(event) {
				console.log('商城回传的参数', event);
				reciveMessage(event);
			},
			_getHcCode: function() {
				getHcCode().then(_data => {
					this.url = conf.mallUrlRefresh + "?hcCode=" + _data.hcCode;
				}, err => {

				});
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
