<template>
	<view>
		<view class="margin-top">
			<view class="cu-list menu" v-if="applicationKeys.length > 0" v-for="(item, idx) in applicationKeys" :key="idx"
			 :data-item="item" @click="gotoDetail(item)">
				<view class="cu-item arrow">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-order text-cut text-green margin-right-xs"></text>
							<view class="text-cut" style="width:85%;">{{item.locationObjName}}</view>
						</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs">审核进度：</text> {{item.stateName}}</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu" v-if="applicationKeys.length === 0">
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-notification text-grey"></text>
						<text class="text-grey">暂无审核信息</text>
					</view>
					<view class="action">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/applicationKeyProgress/applicationKeyProgress.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	export default {
		data() {
			return {
				applicationKeys: [],
				idCard: '',
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
		onLoad: function(options) {
			 context.onLoad(options);
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let _that = this;

			context.getOwner(function(_owner) {
				let _idCard = _owner.idCard;
				let _communityId = _owner.communityId;

				_that.idCard = _idCard;
				_that.communityId = _communityId;

				_that.loadApplicationKey();
			});
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
			loadApplicationKey: function() {
				let _that = this;

				let _objData = {
					page: 1,
					row: 10,
					idCard: this.idCard,
					communityId: this.communityId,
					typeFlag: '1100102'
				};
				context.request({
					url: constant.url.listApplicationKeys,
					header: context.getHeaders(),
					method: "GET",
					data: _objData,
					//动态数据
					success: function(res) {
						console.log(res);

						if (res.statusCode == 200) {
							//成功情况下跳转
							let _applicationKeys = res.data.applicationKeys;

							if (_applicationKeys.length == 0) {
								wx.showToast({
									title: "未查询到钥匙",
									icon: 'none',
									duration: 2000
								});
								return;
							}

							_that.applicationKeys = _applicationKeys;
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
			},
			gotoDetail: function(_item) {
				let _applicationKey =_item;
				wx.navigateTo({
					url: '/pages/viewApplicationKeyUser/viewApplicationKeyUser?applicationKeyId=' + _applicationKey.applicationKeyId +
						"&communityId=" + this.communityId
				});
			}
		}
	};
</script>
<style>
	.cu-list+.cu-list {
		margin-top: 10px;
	}
</style>
