<template>
	<view class="">
		<view class="flex justify-center logo">
			<view class="cu-avatar xl round margin-left logo-lage" :style="{backgroundImage: 'url(' + logoUrl + ')' }"></view>
		</view>

		<view class="margin-top padding-left padding-right radius" v-if="!loginByPhone">
			<view class="cu-form-group margin-top">
				<view class="title">用户名</view>
				<input placeholder="请输入用户名" name="input" v-model="username"></input>
			</view>
			<view class="cu-form-group border-bottom" >
				<view class="title">密码</view>
				<input placeholder="请输入密码" type="password" name="input" v-model="password"></input>
			</view>
		</view>
		<view class="margin-top padding-left padding-right radius" v-else>
			<view class="cu-form-group margin-top">
				<view class="title">手机号</view>
				<input placeholder="请输入手机号" name="input" v-model="username"></input>
			</view>
			<view class="cu-form-group border-bottom" >
				<view class="title">验证码</view>
				<input v-model="password" placeholder="请输入短信验证码" name="input"></input>
				<button class='cu-btn bg-green shadow' :disabled="btnDisabled" @click="sendMsgCode()">{{btnValue}}</button>
			</view>
		</view>

		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-green lg" @click="_doLogin()">登录</button>
			<button class="cu-btn line-orange  margin-tb-sm lg" @click="_doRegister()">绑定业主</button>
			
			<view class="text-center margin-top-sm text-green" @click="_doLoginPhone()">{{phoneLoginName}}</view>
		</view>

	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-input.vue' //input
	import wButton from '../../components/watch-button.vue' //button
	import {
		sendSmsCode,
		userLogin
	} from '../../api/user/userApi.js'
	const context = require("../../context/Java110Context.js");

	const constant = context.constant;
	const factory = context.factory;

	const login = 1; //1标识登录页面 请下发code 不要下发key
	export default {
		data() {
			return {
				logoUrl: '',
				username: 'test001',
				password: 'wuxw2015',
				appId: "",
				code: "",
				loginByPhone: false,
				msgCode: '',
				btnDisabled: false,
				btnValue: '验证码',
				phoneLoginName:'验证码登录'

			};
		},
		onLoad(option) {
			// #ifdef H5
			this.code = option.code;
			let _key = option.key;
			if (_key) {
				context.onLoad(option);
				// 判断当前是否已经登录 ，如果登录了跳转至首页
			} else {
				if (this.code == '' || this.code == undefined) {
					//跳转鉴权
					factory.login.wechatRefreshToken(window.location.href, login);
				}
			}
			// #endif
			_this = this;
			this.logoUrl = constant.url.baseUrl + 'logo.png';
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
				let that = this;
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
					appId: this.vc.getWAppId(),
					loginByPhone:this.loginByPhone
				};
				userLogin(_obj)
				.then(()=>{
					wx.switchTab({
						url: "/pages/index/index?wAppId="+that.vc.getWAppId()
					});
				});
			},
			_doRegister: function() {
				//let _url = '/pages/registerByWechat/registerByWechat';
				let _url = '/pages/register/register';
				// #ifdef H5
				_url += ('?code=' + this.code);
				// #endif
				this.vc.navigateTo({
					url: _url
				})
			},
			sendMsgCode: function() {
				sendSmsCode(this.username, this);
			},
			_doLoginPhone:function(){
				this.loginByPhone = !this.loginByPhone;
				if(this.loginByPhone){
					this.phoneLoginName="密码登录"
				}else{
					this.phoneLoginName="验证码登录"
				}
				this.username = '';
				this.password = '';
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
