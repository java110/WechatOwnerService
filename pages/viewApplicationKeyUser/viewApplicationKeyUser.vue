<template>
	<view>
		<view class="bg-white">
			<view class="cu-steps">
				<view class="cu-item" :class="index>active?'':'text-green'" v-for="(item,index) in steps" :key="index">
					<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="block__title">业主信息</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-info text-green"></text>
					<text class="text-grey">申请编码</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applicationKeyId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-order text-green"></text>
					<text class="text-grey">状态</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{stateName}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-wefill text-green"></text>
					<text class="text-grey">年龄</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{age}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-friend text-green"></text>
					<text class="text-grey">性别</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{sex}}</text>
				</view>
			</view>
		</view>

		<view class="block__title">身份信息</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-vipcard text-green"></text>
					<text class="text-grey">身份</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{typeCdName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-card text-green"></text>
					<text class="text-grey">身份证</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{idCard}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">开始时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{startTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">结束时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{endTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">手机号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{tel}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/viewApplicationKeyUser/viewApplicationKeyUser.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;

	export default {
		data() {
			return {
				steps: [{
					cuIcon: 'usefullfill',
					name: '申请',
					desc: ''
				}, {
					cuIcon: 'radioboxfill',
					name: '审核中',
					desc: ''
				}, {
					cuIcon: 'roundcheckfill',
					name: '完成',
					desc: ''
				}],
				active: 0,
				applicationKeyId: '',
				name: '',
				age: 0,
				sex: '',
				typeCdName: '',
				idCard: '',
				startTime: null,
				endTime: null,
				tel: '',
				stateName: '',
				communityId: ''
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			this.applicationKeyId = options.applicationKeyId;
			this.communityId = options.communityId;
			this.showApplicationKey();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

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
			showApplicationKey: function() {
				let _that = this;

				let _objData = {
					page: 1,
					row: 1,
					applicationKeyId: this.applicationKeyId,
					communityId: this.communityId
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

							console.log('钥匙信息：', _applicationKeys);
							let _applicationKey = _applicationKeys[0];
							let _active = '0';
							let _sex = "女";
							let _typeCd = "";

							if (_applicationKey.state == '10001') {
								_active = '2';
							} else if (_applicationKey.state == '10003') {
								_active = '2';
							} else {
								_active = '1';
							}

							if (_applicationKey.sex == '0') {
								_sex = '男';
							}

							if (_applicationKey.typeCd == "10004") {
								_typeCd = "业主";
							} else if (_applicationKey.typeCd == "10005") {
								_typeCd = "家庭成员";
							} else {
								_typeCd = "租客";
							}

							_that.applicationKeyId = _applicationKey.applicationKeyId;
							_that.name = _applicationKey.name;
							_that.age = _applicationKey.age;
							_that.sex = _sex;
							_that.typeCdName = _typeCd;
							_that.idCard = _applicationKey.idCard;
							_that.startTime = _applicationKey.startTime;
							_that.endTime = _applicationKey.endTime;
							_that.tel = _applicationKey.tel;
							_that.active = _active;
							_that.stateName = _applicationKey.stateName;
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
			}
		}
	};
</script>
<style>
	@import "./viewApplicationKeyUser.css";

	text {
		text-align: center;
	}
</style>
