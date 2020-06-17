<template>
	<view>
		<view class="my_ak">
			<view class="my_ak_text_02">
				<text>{{pwd}}</text>
			</view>
			<view class="my_ak_text_03">
				<text>有效期至{{endTime}}</text>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="text-xl text-bold">说明</text>
				</view>
			</view>

			<view class="my_ak_text_explain">
				<text>1.在门禁机上点击"密码开门"，再输入密码直接开门</text>
			</view>
			<view class="my_ak_text_explain">
				<text>2.该密码能开启的门禁机有：{{loactions}}</text>
			</view>
			<view class="my_ak_text_explain">
				<text>3.该密码只能打开相应门禁两次</text>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/visitorApplicationKey/visitorApplicationKey.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;

	export default {
		data() {
			return {
				pwd: '请先申请钥匙',
				loactions: '没有门禁',
				endTime: '0000-00-00 00:00:00',
				owner: null,
				idCard: "",
				communityId: "",
				applicationKeys: ""
			};
		},

		components: {},
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

				_that.owner = _owner;
				_that.idCard = _idCard;
				_that.communityId = _communityId;

				_that.applyVisitorApplicationKey();
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
		onShareAppMessage: function() {
			return {
				title: this.owner.appUserName + '分享的访客钥匙',
				path: '/pages/visitorApplicationKey/visitorApplicationKey?idCard=' + this.owner.idCard + '&communityId=' + this.owner
					.communityId,
				success: function(res) {
					console.log('成功', res);
				}
			};
		},
		methods: {
			loadApplicationKey: function() {
				let _that = this;

				let _objData = {
					page: 1,
					row: 10,
					idCard: this.idCard,
					communityId: this.communityId,
					typeFlag: '1100103'
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

							_that.showPwd();
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
			showPwd: function() {
				let _applicationKeys = this.applicationKeys;
				let _pwd = '';
				let _loactions = '';
				let _endTime = '';

				for (let _akIndex = 0; _akIndex < _applicationKeys.length; _akIndex++) {
					if (_applicationKeys[_akIndex].state != '10001') {
						continue;
					}

					_pwd = _applicationKeys[_akIndex].pwd;
					_loactions += _applicationKeys[_akIndex].locationObjName + ",";
					_endTime = _applicationKeys[_akIndex].endTime;
				}

				if (_pwd == '') {
					return;
				}

				this.pwd = _pwd;
				this.loactions = _loactions;
				this.endTime = _endTime;
			},

			/**
			 * 申请钥匙
			 */
			applyVisitorApplicationKey: function() {
				let _that = this;

				let _objData = {
					"idCard": this.idCard,
					"communityId": this.communityId
				};
				context.request({
					url: constant.url.applyVisitorApplicationKey,
					header: context.getHeaders(),
					method: "POST",
					data: _objData,
					//动态数据
					success: function(res) {
						console.log(res);

						if (res.statusCode == 200) {
							//成功情况下跳转
							_that.loadApplicationKey();
						}
					},
					fail: function(e) {
						console.log("申请访客钥匙异常", e);
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
	@import "./visitorApplicationKey.css";
</style>
