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
	} from '../../lib/java110/utils/StringUtil.js'

	import {
		decodeUrl,
		encodeUrl
	} from '../../lib/java110/utils/UrlUtil.js'
	import context from '../../lib/java110/Java110Context.js'
	export default {
		data() {
			return {
				url: '',
			}
		},
		onLoad(options) {
			let _key = options.key;
			let _hcCode = options.hcCode;
			if(isNotNull(_hcCode)){
				this.url = conf.mallUrlRefresh + "&hcCode=" + _hcCode;
				return ;
			}
			if (isNotNull(_key)) {
				context.onLoad(options, this._getHcCode);
			} else {
				this._getHcCode()
			}
		},
		methods: {
			_getHcCode: function() {
				getHcCode().then(_data => {
					this.url = conf.mallUrlRefresh + "&hcCode=" + _data.hcCode;
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
