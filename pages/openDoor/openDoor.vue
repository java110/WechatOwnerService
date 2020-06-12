<template>
	<view>
		<view>
			<image src="../../static/images/openDoorTop.png" class="heard-location-icon"></image>
		</view>
		<view class="cu-list grid" :class="'col-2'">
			<view class="cu-item" @click="clickHerf('applicationKey/applicationKey');">
				<view :class="['cuIcon-like','text-red']"></view>
				<text>申请钥匙</text>
			</view>
			<view class="cu-item" @click="clickHerf('applicationKeyProgress/applicationKeyProgress');">
				<view :class="['cuIcon-search']"></view>
				<text>申请进度</text>
			</view>
			<view class="cu-item" @click="clickHerf('myApplicationKey/myApplicationKey');">
				<view :class="['cuIcon-peoplefill','text-red']"></view>
				<text>我的钥匙</text>
			</view>
			<view class="cu-item" @click="clickHerf('visitorApplicationKey/visitorApplicationKey');">
				<view :class="['cuIcon-command']"></view>
				<text>访客钥匙</text>
			</view>
			<!-- #ifdef APP-PLUS   -->
			<view class="cu-item" @click="clickHerf('viewPersonFace/viewPersonFace');">
				<view :class="['cuIcon-camera','text-red']"></view>
				<text>采集人脸</text>
			</view>
			<view class="cu-item" @click="clickHerf('noPage');">
				<view :class="['cuIcon-qrcode']"></view>
				<text>二维码开门</text>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

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
		onShareAppMessage: function() {},
		methods: {
			clickHerf: function(pagUrl) {
				if(pagUrl == 'noPage'){
					uni.showToast({
						icon:'none',
						title:'正在开发中'
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/' + pagUrl
				});
			}
		}
	};
</script>
<style>
	@import "./openDoor.css";
	text {
		text-align: center;
	}
</style>
