<template>
	<view >
		<view class="tab-container bg-white">
			<view class="cu-list menu">
				<view class="cu-item arrow" v-if="accounts.length > 0" v-for="(item, key) in accounts" :key="key"
					:data-item="item" @click="myAccountDetail(item)">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-rechargefill text-green margin-right-xs"></text> {{item.acctTypeName}}
						</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-right margin-right-xs"></text>余额: {{item.amount}}
						</view>
					</view>
					<view class="action">
					</view>
				</view>
				<view class="cu-item arrow" @click="coupons(item)">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-ticket text-green margin-right-xs"></text>我的优惠券
						</view>
						<view class="text-gray text-sm">
						</view>
					</view>
					<view class="action">

					</view>
				</view>
			</view>

			
		</view>
		<view class="plat-btn-black"></view>
		<view class="cu-bar btn-group" style="margin-top: 30px;" >
			<button @click="_toPrestoreAccount" class="cu-btn bg-orange shadow-blur round lg">账户充值</button>
		</view>
	</view>


</template>

<script>
	// pages/account/myAccount.js
	import context from '../../lib/java110/Java110Context.js';
	import {
		queryOwnerAccount
	} from '../../api/user/userApi.js';
	import {getCommunityId} from '../../api/community/communityApi.js'

	export default {
		data() {
			return {
				accounts: []
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
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			coupons: function(_item) {
				this.vc.navigateTo({
					url: '/pages/coupon/myCoupons',
				})
			},
			myAccountDetail: function(_item) {
				this.vc.navigateTo({
					url: '/pages/account/myAccountDetail?acctId=' + _item.acctId
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
							if (!data) {
								_that.accounts = [];
								return;
							}
							_that.accounts = data;
						})
					}
				});
			},
			_toPrestoreAccount:function(){
				uni.navigateTo({
					url:'/pages/account/preStoreAccount?communityId='+getCommunityId()
				})
			}
		}
	};
</script>
<style>
	@import "./myAccount.css";
</style>
