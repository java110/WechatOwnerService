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
			<input v-model="communityName" required readonly label="小区名称" placeholder="请选择小区" name="communityName" icon="arrow"
			 ></input>
			<text class='cuIcon-right'></text>
		</view>

		<view class="block__title">完善业主</view>
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
			<input v-model="link" required label="手机号" clearable placeholder="请输入手机号"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">验证码</view>
			<input v-model="msgCode" placeholder="请输入短信验证码" name="input"></input>
			<button class='cu-btn bg-green shadow' :disabled="btnDisabled" @click="sendMsgCode()">{{btnValue}}</button>
		</view>



		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-green   lg" @click="_doRegister()">注册</button>
		</view>
	</view>
</template>

<script>
	// pages/enterCommunity/enterCommunity.js
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
				}
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
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

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
				console.log('community', community)
				if (community != null && community != undefined) {
					this.communityId = community.communityId;
					this.communityName = community.name;
				}
			}

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
			sendMsgCode: function() {
				console.log('获取验证码');
				var _that = this;

				let obj = {
					tel: this.link
				};

				if (obj.tel == '') {
					wx.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 2000
					});
					return;
				}
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

				let obj = {
					"areaCode": this.areaCode,
					"communityId": this.communityId,
					"communityName": this.communityName,
					"appUserName": this.appUserName,
					"idCard": this.idCard,
					"link": this.link,
					"msgCode": this.msgCode,
					"password": this.password,
					"openId": uni.getStorageSync(constant.mapping.CURRENT_OPEN_ID)
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
				} else if (obj.msgCode == "") {
					msg = "请填写验证码";
				}
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					})
				} else {
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
