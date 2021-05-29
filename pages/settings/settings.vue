<template>
	<view>
		<view>
			<view class="cu-list menu">
				<view class="cu-item arrow" @click="settingHeadImg()">
					<view class="content">
						<text class="cuIcon-emojiflashfill text-pink"></text>
						<text class="text-grey">我的头像</text>
					</view>
					<view class="action">
						<view class="cu-avatar round " :style="{backgroundImage: 'url(' + headerImg + ')'}"></view>
					</view>
				</view>
				<view class="cu-item arrow" @click="_toPage('/pages/changeOwnerPhone/changeOwnerPhone')">
					<view class="content">
						<text class="cuIcon-mobilefill text-cyan"></text>
						<text class="text-grey">手机号</text>
					</view>
					<view class="action">

					</view>
				</view>
				<view class="cu-item arrow" @click="_toPage('/pages/changePassword/changePassword')">
					<view class="content">
						<text class="cuIcon-warnfill text-cyan"></text>
						<text class="text-grey">密码</text>
					</view>
					<view class="action">

					</view>
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item arrow" @click="_toPage('/pages/viewAdmin/viewAdmin')">
					<view class="content">
						<text class="cuIcon-questionfill text-cyan"></text>
						<text class="text-grey">技术支持</text>
					</view>
					<view class="action">

					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">版本号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">V0.1.0</text>
					</view>
				</view>

			</view>

			<view v-if="login" class="margin-top">
				<view class="cu-list menu">
					<view class="cu-item " @tap="_logout()">
						<view class="content text-center">
							<text class="text-red">退 出</text>
						</view>
					</view>
				</view>
			</view>


		</view>
		<view class="cu-modal" :class="logoutUser==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">退出系统</view>
					<view class="action" @tap="_cancleLogout()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认退出系统吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleLogout()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doLogoutUser()">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	import * as TanslateImage from '../../utils/translate-image.js';
	const constant = context.constant;
	const factory = context.factory;
	export default {
		data() {
			return {
				headerImg: null,
				imageList: [],
				logoutUser: false,
				login: true
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			const userInfo = uni.getStorageSync(constant.mapping.OWNER_INFO);
			if (userInfo == null || userInfo == '') {
				this.login = false;
				return;
			}
			this.loadOwnerHeaderImg();

		},
		methods: {
			settingHeadImg: function() {
				var _that = this;
				wx.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						// console.log(res)
						wx.showToast({
							title: '正在上传',
							icon: 'loading',
							mask: true,
							duration: 1000
						});
						var tempFilePaths = res.tempFilePaths
						console.log('头像地址', tempFilePaths);
						//#ifdef H5
						TanslateImage.translate(tempFilePaths, (_baseInfo) => {
							_that.headerImg = _baseInfo;
							_that._uploadOwnerHeaderImg();
							wx.hideLoading()
						})
						//#endif
						//#ifdef MP-WEIXIN
						factory.base64.urlTobase64(tempFilePaths[0]).then(function(_baseInfo) {
							_that.headerImg = _baseInfo;
							_that._uploadOwnerHeaderImg();
							wx.hideLoading()
						});
						//#endif
					}
				})
			},
			/**
			 * 查询业主头像
			 */
			loadOwnerHeaderImg: function() {
				let _that = this;
				context.getOwner(function(_owner) {
					let _headerImg = constant.url.getOwnerPhotoPath + "?objId=" + _owner.memberId + "&communityId=" + _owner.communityId +
						"&fileTypeCd=10000";
					_that.headerImg = _headerImg;
				});
			},
			_uploadOwnerHeaderImg: function() {
				let _that = this;
				context.getOwner(function(_owner) {
					let _memberId = _owner.memberId;
					let _communityId = _owner.communityId;
					let obj = {
						memberId: _memberId,
						communityId: _communityId,
						photo: _that.headerImg
					};
					context.request({
						url: constant.url.uploadOwnerPhoto,
						header: context.getHeaders(),
						method: "POST",
						data: obj, //动态数据
						success: function(res) {
							console.log(res);
							if (res.statusCode != 200) {
								wx.showToast({
									title: '头像上传失败',
									icon: 'none',
									duration: 2000
								});
								return;
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
			//退出系统
			_logout: function() {
				this.logoutUser = true;
			},
			_cancleLogout: function() {
				this.logoutUser = false;
			},
			_toPage: function(_url) {
				this.vc.navigateTo({
					url: _url
				});
			},
			_doLogoutUser: function() {
				let _data = {
					token: wx.getStorageSync('token')
				}
				let that = this;
				context.request({
					url: constant.url.userLogout,
					header: context.getHeaders(),
					method: "POST",
					data: _data,
					success: function(res) {
						if (res.statusCode != 200) {
							uni.showToast({
								icon: "none",
								title: res.data
							});
							return;
						}
						let wAppId = uni.getStorageSync(constant.mapping.W_APP_ID);
						uni.clearStorageSync();
						if (wAppId != null && wAppId != undefined && wAppId != '') {
							uni.setStorageSync(constant.mapping.W_APP_ID, wAppId);
						}
						that.vc.navigateTo({
							url: '/pages/login/login'
						});
					},
					fail: function(error) {
						// 调用服务端登录接口失败
						uni.showToast({
							title: '调用接口失败'
						});
						console.log(error);
					}
				});
			}
		}
	}
</script>

<style>

</style>
