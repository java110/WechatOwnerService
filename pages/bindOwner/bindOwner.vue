<template>
	<view>
		<view class="block__title">小区信息</view>
		<view class="cu-form-group">
			<view class="title">市/区</view>
			<pickerAddress @change="change">{{areaName}}</pickerAddress>
		</view>
		<view class="cu-form-group">
			<view class="title">小区名称</view>
			<input :value="communityName" @input="bindInput" data-name="communityName" required readonly label="小区名称"
			 placeholder="请选择小区" name="communityName" icon="arrow" @tap.native.stop="chooseCommunity"></input>
			<text class='cuIcon-right'></text>
		</view>

		<view class="block__title">业主信息</view>
		<view class="cu-form-group">
			<view class="title">姓名</view>
			<input :value="appUserName" @input="bindInput" data-name="appUserName" required label="姓名" clearable placeholder="请输入名称"
			 name="appUserName"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			<input :value="idCard" @input="bindInput" data-name="idCard" required label="身份证" clearable placeholder="请输入身份证"
			 name="idCard"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input :value="link" @input="bindInput" data-name="link" required label="手机号" clearable placeholder="请输入手机号" name="link"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">验证码</view>
			<input :value="msgCode" @input="bindInput" data-name="msgCode" required label="验证码" clearable placeholder="请输入短信验证码"
			 name="msgCode"></input>
			<button class="cu-btn sm" slot="button" type="number" size="small" @tap.native.stop="sendMsgCode">发送验证码</button>
		</view>
		<view class="button_up_blank">
			<button class="cu-btn bg-green lg margin-top" @tap.native.stop="bindOwner">绑定业主</button>
		</view>
	</view>
</template>

<script>
	// pages/enterCommunity/enterCommunity.js
	const context = require("../../context/Java110Context.js");
	import pickerAddress from "../../components/pickerAddress/pickerAddress.vue"
	const constant = context.constant;

	export default {
		data() {
			return {
				areaCode: '',
				communityName: '',
				appUserName: '',
				idCard: '',
				link: '',
				msgCode: '',
				areaShow: false,
				areaList: {
					province_list: {},
					city_list: {},
					county_list: {}
				},
				province_list: {},
				city_list: {},
				county_list: {},
				multiArray: [
					['安徽', '湖北'],
					['合肥', '淮南', '六安'],
					['蜀山', '高新']
				],
				areaName:null
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			 context.onLoad(options);

			let _location = context.getLocation();

			let _currentLocation = context.getCurrentLocation();
			console.log(_currentLocation+"    444444");
			let _areaName = _currentLocation.city + _currentLocation.district;
			// console.log(_areaName);
			// let _areaCode = _currentLocation.adcode; //加载省份

			context._loadArea('', '', function(_areaList) {
				_that.areaList = _areaList,
					console.log("地址列表", _areaList);
				_that.communityName = _location
					// _that.areaCode = _areaCode,
					_that.areaName = _areaName
				// _that.setData({
				//   areaList: _areaList,
				//   communityName: _location,
				//   areaCode: _areaCode,
				//   areaName: _areaName
				// });
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
				//this.areaName = _areaName;
				// this.setData({
				//   areaCode: _areaCode,
				//   areaName: _areaName
				// });
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
			change:function(e){
				console.log(e);
				let city ='';
				for(let c in e.data){
					console.log(e.data[c]);
					city +=e.data[c].name;
				}
				this.$data.areaName = city;
			},
			bindInput: function(e) {
				console.log('数据监听', e);

				let _that = this;

				let dataset = e.currentTarget.dataset;
				let value = e.detail.value;
				let name = dataset.name;
				_that[name] = value; //  

				console.log(this);
			},
			sendMsgCode: function() {},
			bindOwner: function(e) {
				let obj = {
					"areaCode": this.areaCode,
					"communityName": this.communityName,
					"appUserName": this.appUserName,
					"idCard": this.idCard,
					"link": this.link,
					"msgCode": this.msgCode
				};
				let msg = "";

				if (obj.areaCode == "") {
					msg = "请选择地区";
				} else if (obj.communityName == "") {
					msg = "请填写小区名称";
				} else if (obj.appUserName == "") {
					msg = "请填写业主名称";
				} else if (obj.idCard == "") {
					msg = "请填写身份证";
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
					});
				} else {
					console.log("提交数据", obj);
					wx.showLoading({
						title: '绑定中'
					});
					context.request({
						url: constant.url.appUserBindingOwner,
						header: context.getHeaders(),
						method: "POST",
						data: obj,
						//动态数据
						success: function(res) {
							console.log(res); //成功情况下跳转

							if (res.statusCode == 200) {
								wx.hideLoading();
								wx.redirectTo({
									url: "/pages/viewBindOwner/viewBindOwner"
								});
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
							});
						}
					});
				}
			},
			onConfirm: function(e) {
				console.log("onConfirm", e);
				let _areaCode = e.detail.values[2].code;

				let _areaName = e.detail.values[1].name + e.detail.values[2].name;
				this.areaCode = _areaCode,
					this.areaName = _areaName,
					this.areaShow = false

				// this.setData({
				//   areaCode: _areaCode,
				//   areaName: _areaName,
				//   areaShow: false
				// });
			},
			onChange: function(e) {
				console.log(e);
			},
			onCancel: function(e) {
				this.areaShow = false;
				// this.setData({
				//   areaShow = false
				// });
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
					url: '/pages/viewCommunitys/viewCommunitys?areaCode=' + this.areaCode
				});
			}
		}
	};
</script>
<style>
	@import "./bindOwner.css";
</style>
