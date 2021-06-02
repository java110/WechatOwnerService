<template>
	<view>
		 <web-view ref="webview"
		        src="http://mallapp.homecommunity.cn/#/?hcCommunityId=7020181217000001&hcCode=123456789"  @message="reciveMessage"></web-view>
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	export default {
		data() {
			return {
				url:conf.mallUrl
			}
		},
		methods: {
			reciveMessage:function(event){
				console.log('商城回传的参数',event);
			}
		}
	}
</script>

<style>

</style>
