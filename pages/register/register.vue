<template>
	<view>
		<view class="block__title">注册信息</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="link" required label="手机号" clearable placeholder="请输入手机号"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">密码</view>
			<input v-model="password" required type="password" label="密码" clearable placeholder="请输入密码"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">确认密码</view>
			<input v-model="rePassword" required type="password" label="确认密码" clearable placeholder="请输入确认密码"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">验证码</view>
			<input v-model="msgCode" placeholder="请输入短信验证码" name="input"></input>
			<button class='cu-btn bg-green shadow' :disabled="btnDisabled" @click="sendMsgCode()">{{btnValue}}</button>
		</view>
		<view >
			<view >{{codeMsg}}</view>
		</view> 
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-green   lg" @click="_doRegister()">绑定</button>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	import conf from '../../conf/config'

	export default {
		data() {
			return {
				link: '',
				second: 60,
				codeMsg: '',
				msgCode: '',
				areaShow: false,
				btnValue: '验证码',
				btnDisabled: false,
				password: '',
				rePassword: '',

			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
		},
		methods: {
			sendMsgCode: function() {
				var _that = this;
				let obj = {
					tel: this.link
				};
				let msg = "";
				if (obj.tel == '') {
					msg = '请输入手机号';
				}
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					return;
				}
				console.log(obj);
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				uni.request({
					url: constant.url.userSendSms,
					header: context.getHeaders(),
					method: "POST",
					data: obj, //动态数据
					success: function(res) {
						console.log(res);
						uni.hideLoading();
						//成功情况下跳转
						if (res.statusCode == 200) {
							wx.showToast({
								title: '验证码下发成功',
								icon: 'none',
								duration: 2000
							});
							_that.codeMsg = res.data;
							wx.hideLoading();
							_that.timer();
							return;
						}
						wx.hideLoading();
						wx.showToast({
							title: res.data,
							icon: 'none',
							duration: 2000
						});
					},
					fail: function(e) {
						wx.hideLoading();
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			_doRegister: function(e) {
				console.log(conf.DEFAULT_COMMUNITY_ID,'123')
				let obj = {
					"link": this.link,
					"msgCode": this.msgCode,
					"password": this.password,
					"openId": uni.getStorageSync(constant.mapping.CURRENT_OPEN_ID),
					"defaultCommunityId": conf.DEFAULT_COMMUNITY_ID
				}
				let msg = "";
				if (this.password == '' || this.password != this.rePassword) {
					msg = "密码和重置密码不一致";
				} else if (obj.link == "") {
					msg = "请填写手机号";
				} else if (obj.msgCode == "") {
					msg = "请填写验证码";
				}
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					})
					return;
				}
				console.log("提交数据", obj);
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				uni.request({
					url: constant.url.ownerRegiter,
					header: context.getHeaders(),
					method: "POST",
					data: obj, //动态数据
					success: function(res) {
						let _data = res.data;
						//成功情况下跳转
						wx.hideLoading();
						if (_data.code == 0) {
							wx.hideLoading();
							wx.redirectTo({
								url: "/pages/login/login"
							});
							return;
						}
						wx.showToast({
							title: _data.msg,
							icon: 'none',
							duration: 2000
						});
					},
					fail: function(e) {
						wx.hideLoading();
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			change: function(data) {
				let _that = this;
				_that.areaName = '';
				data.data.forEach(function(_obj) {
					_that.areaName += _obj.name;
				});
				_that.areaCode = data.data[2].code;
				console.log(data);
			},
			timer: function() {
				let promise = new Promise((resolve, reject) => {
					let setTimer = setInterval(
						() => {
							var second = this.second - 1;
							this.second = second;
							this.btnValue = second + '秒';
							this.btnDisabled = true;
							if (this.second <= 0) {
								this.second = 60;
								this.btnValue = '获取验证码';
								this.btnDisabled = false;
								resolve(setTimer)
							}
						}, 1000)
				})
				promise.then((setTimer) => {
					clearInterval(setTimer)
				})
			}
		}
	};
</script>
<style>
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
		text-align: center;
	}
</style>
