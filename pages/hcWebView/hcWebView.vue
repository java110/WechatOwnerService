<template>
	<view class="h5-html">
		 <web-view ref="webview"  :src="url"  @message="reciveMessage"></web-view>
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	export default {
		data() {
			return {
				url: ''
			}
		},
		mounted() {
			// #ifdef H5
			window.addEventListener("message", this.reciveMessage);
			// #endif
		},
		onLoad(options) {
			let _url = options.url;

			if(_url.indexOf("http")>-1){
				_url = _url.replace("**","?");
				_url = _url.replace("@@","&");
				_url = _url.replace("$$","#");
				this.url = _url;
			}else{
				this.url = conf.mallUrl + '#' + _url;
			}

			console.log('_hcUrl',this.url);

		},
		methods: {
			reciveMessage: function(event) {
				console.log('商城回传的参数', event);
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
