<template>
	<view>
		<view class="scs-t">{{msg}}</view>
		
		<view class="flex flex-direction fixed-bottom" style="width: 100%;">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="toIndex()">返回首页</button>
		</view>
	</view>
</template>

<script>
	// pages/visit/addVisitSuccess.js
	import context from '../../lib/java110/Java110Context.js';

	export default {
		data() {
			return {
				msg: '',
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			this.msg = options.msg;
		},
		
		methods: {
			toIndex: function(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {}
	};
</script>
<style>
	@import "./addVisitSuccess.css";
</style>
