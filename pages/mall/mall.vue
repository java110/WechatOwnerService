<template>
	<view class="h5-html">
		 <web-view ref="webview"  :src="url"  @onPostMessage="reciveMessage"></web-view>
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
				window.addEventListener("message",this.reciveMessage);
			// #endif
		},
		onLoad(options) {
			let _url = options.url;
			
			if(_url){
				this.url = conf.mallUrl + _url;
			}else{
				this.url = conf.mallUrlIndexPage;
			}
		},
		methods: {
			reciveMessage: function(event) {
				
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
