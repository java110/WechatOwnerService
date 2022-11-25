<template>
	<view>
		<view class="cu-list menu  margin-top margin-bottom">
			<view class="cu-item arrow" @click="mySettings()">
				<view class="content">
					<text class="cuIcon-settings text-gray"></text>
					<text class="text-grey">设置</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="_logout()" v-if="login">
				<view class="content">
					<text class="cuIcon-circlefill text-yellow"></text>
					<text class="text-grey">退出登录</text>
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
	import context from '@/lib/java110/Java110Context.js';
	const factory = context.factory; //获取app实例
	const constant = context.constant;
	export default {
		name: "my-system",
		data() {
			return {
				logoutUser: false,
				login: true
			};
		},
		created() {
			this._judgeHasLogin();
		},
		methods: {
			_judgeHasLogin: function() {
				let _that = this; //查询用户信息
				if (!_that.ckeckUserInfo()) {
					_that.login = false;
					return;
				}
				_that.login = true;
			},
			ckeckUserInfo: function() {
				return context.checkLoginStatus();
			},
			// 设置
			mySettings: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '/pages/login/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '/pages/settings/settings',
				});
			},
			//退出系统
			_logout: function() {
				this.logoutUser = true;
			},
			_cancleLogout: function() {
				this.logoutUser = false;
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
						that.logoutUser =false;
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
