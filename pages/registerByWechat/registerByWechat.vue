<template>
	<view>
		<view class="block__title">选择小区</view>

		<view class="cu-form-group arrow">
			<view class="title">市/区</view>
			<pickerAddress @change="change">{{areaName}}</pickerAddress>
			<text class='cuIcon-right'></text>
		</view>

		<view class="cu-form-group" @tap="chooseCommunity">
			<view class="title">小区名称</view>
			<input v-model="communityName" required readonly label="小区名称" placeholder="请选择小区" name="communityName" icon="arrow"></input>
			<text class='cuIcon-right'></text>
		</view>

		<view class="block__title">业主信息</view>
		<view class="cu-form-group">
			<view class="title">姓名</view>
			<input v-model="appUserName" required label="姓名" clearable placeholder="请输入名称" name="appUserName"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			<input v-model="idCard" required label="身份证" clearable placeholder="请输入身份证" name="idCard"></input>
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
			<view class="title">手机号</view>
			<input v-model="link" required label="手机号" disabled="disabled" clearable placeholder="请输入手机号"></input>
			<button  class="cu-btn bg-green" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">获取手机号</button>
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-green   lg" @click="_doRegister()">绑定</button>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	import pickerAddress from '../../components/pickerAddress/pickerAddress.vue'

	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				title: 'Hello',
				areaCode: '',
				areaName: '请选择地区',
				communityName: '',
				communityId: '',
				appUserName: '',
				idCard: '',
				link: '',
				second: 60,
				msgCode: '',
				areaShow: false,
				btnValue: '验证码',
				btnDisabled: false,
				password: '',
				rePassword: '',
				areaList: {
					province_list: {

					},
					city_list: {

					},
					county_list: {

					}
				},
				sessionKey: '',
				openId:''
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			let _location = context.getLocation();
			let _currentLocation = context.getCurrentLocation();

			let _areaName = _currentLocation.city + _currentLocation.district;
			let _areaCode = _currentLocation.adcode;
			//加载省份
			context._loadArea('', '', function(_areaList) {
				_that.areaList = _areaList;
				_that.communityName = _location;
				_that.areaCode = _areaCode;
				_that.areaName = _areaName;
			});

			uni.login({
				success: (res) => {
					console.log("login", res);
					_that.wxLogin(res.code);
				}
			})
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			if (this.areaCode == '' || this.areaCode == undefined) {
				let _currentLocation = context.getCurrentLocation();
				let _areaName = _currentLocation.city + _currentLocation.district;
				let _areaCode = _currentLocation.adcode;
				this.areaCode = _areaCode;
				this.areaName = _areaName;

			} else {
				let community = uni.getStorageSync("_selectCommunity");
				if (community != null && community != undefined) {
					this.communityId = community.communityId;
					this.communityName = community.name;
				}
			}

		},
		methods: {
			onGetPhoneNumber(e) {
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					wx.showToast({
						title: '手机号码未授权，请授权后再使用',
						icon: "none"
					});
					return;
				}
				let _that = this;
				wx.request({
					url: constant.url.getWxPhoto,
					method: 'post',
					header: context.getHeaders(),
					data: {
						iv: e.detail.iv,
						// 用户非敏感信息
						key: _that.sessionKey,
						// 签名
						decryptData: e.detail.encryptedData,
					},
					success: function(res) {
						let _json = res.data;
						console.log('日志',_json)
						if(_json.code == 0){
							_that.link = _json.data.phoneNumber;
						}
					},
					fail: function(error) {}
				});
			},
			_doRegister: function(e) {
				let obj = {
					"areaCode": this.areaCode,
					"communityId": this.communityId,
					"communityName": this.communityName,
					"appUserName": this.appUserName,
					"idCard": this.idCard,
					"link": this.link,
					"msgCode": this.msgCode,
					"password": this.password,
					"openId": this.openId,
					"sessionKey":this.sessionKey
				}

				let msg = "";
				if (this.password == '' || this.password != this.rePassword) {
					msg = "密码和重置密码不一致";
				} else if (obj.areaCode == "") {
					msg = "请选择地区";
				} else if (obj.communityName == "") {
					msg = "请填写小区名称";
				} else if (obj.appUserName == "") {
					msg = "请填写业主名称";
				} else if (obj.link == "") {
					msg = "请填写手机号";
				}
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					})
				} else {
					uni.showLoading({
						title: '加载中',
						mask: true
					});
					uni.request({
						url: constant.url.ownerRegisterWxPhoto,
						header: context.getHeaders(),
						method: "POST",
						data: obj, //动态数据
						success: function(res) {
							console.log(res);
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
				}
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
			/**
			 * 选择小区
			 */
			chooseCommunity: function(e) {

				if (this.areaCode == '' || this.areaCode == undefined) {
					wx.showToast({
						title: '请先选择地区',
						icon: 'none'
					});
					return;
				}
				wx.navigateTo({
					url: '/pages/viewCommunitys/viewCommunitys?areaCode=' + this.areaCode,
				})
			},
			wxLogin: function(_code) {
				let _that = this;
				let _appId = '';
				// #ifdef MP-WEIXIN
				let accountInfo = uni.getAccountInfoSync();
				_appId = accountInfo.miniProgram.appId;
				// #endif
				wx.request({
					url: constant.url.loginUrl,
					method: 'post',
					header: context.getHeaders(),
					data: {
						code: _code,
						// 用户非敏感信息
						signature: '',
						// 签名
						encryptedData: '',
						// 用户敏感信息
						iv: '', // 解密算法的向量
						appId: _appId,
						userInfo:{}

					},
					success: function(res) {
						let sessionKey = res.data.sessionKey;
						_that.sessionKey = sessionKey;
						_that.openId = res.data.openId;
					},
					fail: function(error) {
						// 调用服务端登录接口失败
						let sessionKey = res.data.sessionKey;
						_that.sessionKey = sessionKey;
						_that.openId = res.data.openId;
						
					}
				});
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
