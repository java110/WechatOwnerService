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
		onLoad(options) {
			this.url = options.url;
		
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
