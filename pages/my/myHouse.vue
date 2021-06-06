<template>
	<view class="tab-container bg-white">
		<view class="cu-list menu">
			<view class="cu-item arrow" v-if="rooms.length > 0" v-for="(item, key) in rooms" :key="key" :data-item="item" @click="myHouseDetail(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-homefill text-green margin-right-xs"></text> {{item.floorNum}}号楼{{item.unitNum}}单元{{item.roomNum}}室</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-right margin-right-xs"></text> {{item.roomId}}</view>
				</view>
				<view class="action">

				</view>
			</view>
			<view class="cu-item" v-if="rooms.length === 0">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">暂无房屋信息</text>
				</view>
				<view class="action">

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/my/myHouse.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;

	export default {
		data() {
			return {
				rooms: ""
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			console.log('123123')
			this.loadOwnerHouse();
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
		onPullDownRefresh: function() {
			this.loadOwnerHouse();
			uni.stopPullDownRefresh();
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			myHouseDetail: function(_item) {
				this.vc.navigateTo({
					url: '/pages/my/myHouseDetail?room=' + JSON.stringify(_item)
				});
			},

			/**
			 * 加载业主房屋信息
			 */
			loadOwnerHouse: function() {
				let _that = this;

				context.getRooms().then(res => {
					if (res) {
						_that.rooms = res.data.rooms;
					}
					
				});
			}
		}
	};
</script>
<style>
	@import "./myHouse.css";
</style>
