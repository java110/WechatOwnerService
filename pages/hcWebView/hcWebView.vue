<template>
	<view class="h5-html">
		 <web-view ref="webview"  :src="url"  @message="reciveMessage"></web-view>
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	import {
		decodeUrl
	} from '../../lib/java110/utils/UrlUtil.js'
	import {
		reciveMessage
	} from '../../api/webView/webViewApi.js'

	import {
		isNull
	} from '../../lib/java110/utils/StringUtil.js'

	import {
		getStorageSync
	} from '../../lib/java110/utils/StorageUtil.js'
	import {getMallCommunityId} from '../../api/community/communityApi.js'
	import mapping from '../../constant/MappingConstant.js'
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			let _url = options.url;
			
			// #ifdef APP-PLUS
				this.navigateApp(_url)
			// #endif
			
		},
		methods: {
			onReciveMessage: function(event) {
				console.log('商城回传的参数', event);
				event.data = JSON.parse(event.data);
				reciveMessage(event);
			},
			navigateApp:function(_url){
				if (isNull(_url)) {
					_url = getStorageSync(mapping.HC_MALL_CUR_URL);
				}
				if (_url.indexOf("http") < 0 && _url.indexOf("https") < 0) {
					_url = conf.mallUrl + '#' + _url;
				}
				_url = decodeUrl(_url)
				if(_url.indexOf("?")>0){
					_url = _url +"&hcCommunityId="+getMallCommunityId();
				}else{
					_url = _url +"?hcCommunityId="+getMallCommunityId();
				}
				_url = _url +"&mallFrom=HC_APP"
				this.url = _url;
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
