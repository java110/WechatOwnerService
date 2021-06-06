<template>
	<view>
		<view class="bg-white">
			<view class="cu-steps">
				<view class="cu-item" :class="index>active?'':'text-green'" v-for="(item,index) in steps" :key="index">
					<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="block__title">房屋信息</view>
		<view class="cu-form-group">
			<view class="title">市/区</view>
			{{areaName}}
		</view>
		<view class="cu-form-group">
			<view class="title">小区编码</view>
			{{communityId}}
		</view>
		<view class="cu-form-group">
			<view class="title">小区名称</view>
			{{communityName}}
		</view>
		<view class="block__title">投诉信息</view>

		<view class="cu-form-group">
			<view class="title">业主编码</view>
			{{appUserId}}
		</view>
		<view class="cu-form-group">
			<view class="title">姓名</view>
			{{appUserName}}
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			{{idCard}}
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			{{link}}
		</view>
		<view class="button_up_blank"></view>

		<!-- <block wx:if="{{active == 1}}">
    <van-button type="danger"  size="large" catchtap="unbindOwner">解绑业主</van-button>
  </block> -->
	</view>
</template>

<script>
	// pages/viewBindOwner/viewBindOwner.js
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
				areaName: '',
				communityId: '',
				communityName: '',
				appUserName: '',
				appUserId: '',
				idCard: '',
				link: ''
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			this.loadOwnerInfo();
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
			/**
			 * 加载业主信息
			 */
			loadOwnerInfo: function() {
				let _that = this;

				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						let _active = _ownerInfo.state == '10000' ? 1 : 2;

						_that.areaName = '西宁市城东区';
						_that.communityId = _ownerInfo.communityId;
						_that.communityName = _ownerInfo.communityName;
						_that.appUserName = _ownerInfo.appUserName;
						_that.appUserId = _ownerInfo.appUserId;
						_that.idCard = _ownerInfo.idCard;
						_that.link = _ownerInfo.link;
						_that.active = _active;
					}
				});
			},
			unbindOwner: function() {
				//调用解绑业主，并且删除本地缓存
				let obj = {
					"appUserId": this.appUserId,
					"communityId": this.communityId
				};
				let msg = "";

				if (obj.appUserId == "" || obj.communityId == "") {
					msg = "数据异常";
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					return;
				}

				wx.request({
					url: constant.url.appUserUnBindingOwner,
					header: context.getHeaders(),
					method: "POST",
					data: obj,
					//动态数据
					success: function(res) {
						console.log(res);

						if (res.statusCode != 200) {
							wx.showToast({
								title: '解绑失败',
								icon: 'none',
								duration: 2000
							});
							return;
						} //成功情况下跳转


						wx.redirectTo({
							url: "/pages/bindOwner/bindOwner"
						});
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
	@import "./viewComplaint.css";
</style>
