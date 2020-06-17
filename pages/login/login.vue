<template>
	<view class="">
		<view class="flex justify-center logo">
			<view class="cu-avatar xl round margin-left logo-lage" :style="{backgroundImage: 'url(' + logoUrl + ')' }"></view>
		</view>

		<view class="margin-top padding-left padding-right radius">
			<view class="cu-form-group margin-top">
				<view class="title">用户名</view>
				<input placeholder="请输入用户名" name="input" v-model="username"></input>
			</view>
			<view class="cu-form-group border-bottom">
				<view class="title">密码</view>
				<input placeholder="请输入密码" type="password" name="input" v-model="password"></input>
			</view>
		</view>

		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-green lg" @click="_doLogin()">登录</button>
			<button class="cu-btn line-orange  margin-tb-sm lg" @click="_doRegister()">注册</button>
		</view>

	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-input.vue' //input
	import wButton from '../../components/watch-button.vue' //button
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;
	
	const login = 1;//1标识登录页面 请下发code 不要下发key
	export default {
		data() {
			return {
				logoUrl: '',
				username: 'test001',
				password: 'wuxw2015',
				appId: "",
				code: ""
			};
		},
		onLoad(option) {
			// #ifdef H5
			this.code = option.code;
			let _key = option.key;
			if(_key){
				context.onLoad(option);
				// 判断当前是否已经登录 ，如果登录了跳转至首页
				
			}else{
				if (this.code == '' || this.code == undefined) {
					//跳转鉴权
					factory.login.wechatRefreshToken(window.location.href,login);
				}
			}
			// #endif
			_this = this;
			this.logoUrl = constant.url.baseUrl + 'logo.png';
			// #ifdef MP-WEIXIN
			let accountInfo = uni.getAccountInfoSync();
			this.appId = accountInfo.miniProgram.appId;
			// #endif
		},
		methods: {
			_doLogin: function() {
				let _that = this;
				//先微信登录
				// #ifdef MP-WEIXIN 
				wx.login({
					success: function(loginRes) {
						if (loginRes.code) {
							// TODO
							//请求服务后端登录
							_that._doMyLogin(loginRes);
						} else {
							// 获取 code 失败
							_that.coreUtil.showInfo('微信登录失败');
						}
					},
					fail: function(error) {
						// 调用 wx.login 接口失败
						_that.coreUtil.showInfo('微信登录失败');
						console.log(error);
					}
				});
				// #endif
				// #ifdef APP-PLUS
				_that._doMyLogin({});
				// #endif

				// #ifdef H5
				_that._doMyLogin({
					code: this.code
				});
				// #endif
			},
			_doMyLogin: function(_wxLoginRes) {
				if (this.username == '') {
					wx.showToast({
						title: '请填写用户名',
						icon: "none"
					});
					return;
				}

				if (this.password == '') {
					wx.showToast({
						title: '请填写密码',
						icon: "none"
					});
					return;
				}
				let _code = _wxLoginRes.hasOwnProperty("code") ? _wxLoginRes.code : '';
				let _obj = {
					username: this.username,
					password: this.password,
					code: _code,
					appId: this.appId
				};

				uni.showLoading({
					title: '加载中',
					mask: true
				});

				uni.request({
					url: constant.url.loginOwnerUrl,
					header: context.getHeaders(),
					method: "POST",
					data: JSON.stringify(_obj),
					//动态数据
					success: function(res) {
						//将用户信息携入缓存中
						uni.hideLoading();
						console.log("登录返回信息", res);
						if (res.statusCode != 200) {
							uni.showToast({
								icon: 'none',
								title: res.data
							});
							return;
						}
						let _data = res.data;

						let _ownerInfo = _data.owner;
						wx.setStorageSync(constant.mapping.OWNER_INFO, _ownerInfo);
						wx.setStorageSync(constant.mapping.USER_INFO, JSON.stringify(_ownerInfo));
						let _currentCommunityInfo = {
							communityId: _ownerInfo.communityId,
							communityName: _ownerInfo.communityName
						};
						wx.setStorageSync(constant.mapping.CURRENT_COMMUNITY_INFO, _currentCommunityInfo);

						let date = new Date();
						let year = date.getFullYear(); //获取当前年份

						let mon = date.getMonth(); //获取当前月份

						let da = date.getDate(); //获取当前日

						let h = date.getHours() + 1; //获取小时

						let m = date.getMinutes(); //获取分钟

						let s = date.getSeconds(); //获取秒

						console.log("获取过去时间", year, mon, da, h, m, s); //将时间格式转化为时间戳

						let afterOneHourDate = new Date(year, mon, da, h, m, s); //30s之后的时间

						console.log("afterOneHourDate", afterOneHourDate);
						wx.setStorageSync(constant.mapping.LOGIN_FLAG, {
							sessionKey: _ownerInfo.userId,
							expireTime: afterOneHourDate.getTime()
						});
						wx.setStorageSync(constant.mapping.TOKEN, _data.token);
						//保存临时 钥匙
						wx.setStorageSync(constant.mapping.OWNER_KEY, _data.key);
						wx.switchTab({
							url: "/pages/index/index"
						})

					},
					fail: function(e) {
						console.log(e);
						uni.hideLoading();
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			_doRegister: function() {
				let _url = '/pages/register/register';
				// #ifdef H5
				_url += ('?code=' + this.code);
				// #endif
				uni.navigateTo({
					url: _url
				})
			}

		}
	}
</script>

<style>
	page {
		background-color: #FFF;
	}

	.logo {
		margin-top: 160upx;
		margin-bottom: 140upx;
	}

	.logo .logo-lage {
		height: 180upx;
		width: 180upx;
	}

	.login-nav {
		background-color: #00AA00;
		height: 120upx;
	}

	.login-nav text {
		color: #FFFFFF;
		font-size: 30upx;
	}
</style>
