<template>
	<view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">当前小区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{communityName}}</text>
				</view>
			</view>
		</view>
		<view v-if="locations.length > 0">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item, idx) in locations" :key="idx">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> {{item.locationObjName}}</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill margin-right-xs"></text> {{item.machineCode}}</view>
					</view>

				</view>

			</view>
			<view class="akl_wirte_btn">
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-green lg" @click="gotoApplyApplicationKeyPage()">填写资料</button>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	// pages/applicationKeyLocation/applicationKeyLocation.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	export default {
		data() {
			return {
				locations: [],
				communityName: '',
				communityId: ''
			};
		},
		components: {
			noDataPage
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) { //this._loadOwnerLocation();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.loadOwnerLocationFun();
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
			loadOwnerLocationFun: function() {
				let _that = this;

				context.getOwner(function(_owner) {
					console.log('数据执行', _owner);
					let _data = {
						memberId: _owner.memberId,
						communityId: _owner.communityId
					};
					_that.communityName = _owner.communityName;
					_that.communityId = _owner.communityId;


					context.request({
						url: constant.url.listOwnerMachines,
						header: context.getHeaders(),
						method: "GET",
						data: _data,
						//动态数据
						success: function(res) {
							console.log('查询业主门禁', res); //成功情况下跳转

							if (res.statusCode == 200) {
								let _machines = res.data.machines;
								_that.locations = _machines;
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
				});
			},
			gotoApplyApplicationKeyPage: function() {
				// 跳转至 填写信息页面
				console.log('gotoApplyApplicationKeyPage', this.locations);

				if (this.locations.length < 1) {
					wx.showToast({
						icon: 'none',
						title: '没有相应门禁供您申请'
					});
					return;
				}

				wx.navigateTo({
					url: "/pages/applicationKeyUser/applicationKeyUser?locations=" + JSON.stringify(this.locations) +
						"&communityId=" + this.communityId
				});
			}
		}
	};
</script>
<style>
	@import "./applicationKeyLocation.css";
</style>
