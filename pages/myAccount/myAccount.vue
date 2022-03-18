<template>
	<view class="tab-container bg-white">
		<view class="cu-list menu">
			<view class="cu-item arrow" v-if="accounts.length > 0" v-for="(item, key) in accounts" :key="key" :data-item="item" @click="myAccountDetail(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-rechargefill text-green margin-right-xs"></text> {{item.acctTypeName}}</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-right margin-right-xs"></text>余额: {{item.amount}}</view>
				</view>
				<view class="action">
				</view>
			</view>
			<view class="cu-item arrow" @click="coupons(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-ticket text-green margin-right-xs"></text>我的优惠券</view>
					<view class="text-gray text-sm">
					</view>
				</view>
				<view class="action">
			
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/myAccount/myAccount.js
	import context from '../../lib/java110/Java110Context.js';
	import {queryOwnerAccount} from '../../api/user/userApi.js'

	export default {
		data() {
			return {
				accounts: ""
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			this.loadOwnerAccount();
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
		onShareAppMessage: function() {},
		methods: {
			coupons: function(_item) {
				this.vc.navigateTo({
					url: '/pages/myAccount/myCoupons',
				})
			},
			myAccountDetail: function(_item) {
				this.vc.navigateTo({
					url: '/pages/myAccount/myAccountDetail?acctId=' + _item.acctId
				});
			},
			/**
			 * 加载业主房屋信息
			 */
			loadOwnerAccount: function() {
				let _that = this;
				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						queryOwnerAccount({
							page: 1,
							row: 20,
							idCard: _ownerInfo.idCard,
							link: _ownerInfo.link,
							communityId: _ownerInfo.communityId
						}).then((data) => {
							_that.accounts = data;
						})
					}
				});
			}
		}
	};
</script>
<style>
	@import "./myAccount.css";
</style>
