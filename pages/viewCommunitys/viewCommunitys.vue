<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchValue" data-name="searchValue" name="searchValue" @focus="onChange" @blur="onSearch"
				 :adjust-position="false" placeholder="请输入小区名称" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="onSearch">搜索</button>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="(community, idx) in communitys" :key="idx" :label="community.address">
				<view class="content padding-tb-sm" is-link @click="chooseCommunity(community)">
					<view>
						<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> {{community.name}}</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{community.address}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	export default {
		data() {
			return {
				appUserName: '',
				areaCode: '',
				searchValue: '',
				communityName: "",
				communitys: ""
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			let _areaCode = options.areaCode;
			this.areaCode = _areaCode;
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.loadCommunityFun();
		},

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
			onSearch() {
				this.loadCommunityFun();
			},

			onClick() {
				this.loadCommunityFun();
			},

			chooseCommunity: function(_community) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				uni.setStorageSync("_selectCommunity",_community);
				prevPage.communityName = _community.name;
				//console.log(e);
				wx.navigateBack({
					delta: 1
				});
			},
			loadCommunityFun: function() {
				let _that = this;

				let dataObj = {
					page: 1,
					row: 15,
					cityCode: this.areaCode,
					state: '1100',
					name: this.searchValue
				};
				uni.request({
					url: constant.url.listCommunitys,
					header: context.getHeaders(),
					method: "GET",
					data: dataObj,
					//动态数据
					success: function(res) {
						console.log(res); //成功情况下跳转

						if (res.statusCode == 200) {
							let _communtiys = res.data.communitys;

							_that.communitys = _communtiys;
						}
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
		}
	};
</script>
<style>
	@import "./viewCommunitys.css";
</style>
