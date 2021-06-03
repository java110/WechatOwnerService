<template>
	<view class="h5-html">
		 <web-view ref="webview"    :src="url"  @onPostMessage="reciveMessage"></web-view>
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
		onLoad() {
			this.url = conf.mallUrl;
		
		},
		// onReady() {
		// 	var that = this;
		// 	var height = 0; //定义动态的高度变量，如高度为定值，可以直接写
		// 	var statusBarHeight = 0;
		// 	uni.getSystemInfo({
		// 		//成功获取的回调函数，返回值为系统信息
		// 		success: (sysinfo) => {
		// 			height = sysinfo.windowHeight - that.$navHeight - sysinfo.statusBarHeight; //自行修改，自己需要的高度
		// 			statusBarHeight = sysinfo.statusBarHeight;
		// 		},
		// 		complete: () => {}
		// 	});
			
		// 	var pages = getCurrentPages();  
		// 	var page = pages[pages.length - 1];  
		
		// 	var currentWebview = page.$getAppWebview(); //页面栈最顶层就是当前webview  

		// 	setTimeout(function() {
		// 		var wv = currentWebview.children()[0];
		// 		wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
		// 			top: that.$navHeight + statusBarHeight,
		// 			height: height
		// 		})
		// 	}, 500); //如页面初始化调用需要写延迟
		// },
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
