<template>
	<view>
		<view class="bg-white">
			<view class="cu-steps">
				<view class="cu-item" :class="index>active?'':'text-green'" v-for="(item,index) in steps" :key="index">
					<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="block__title">小区信息</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-info text-green"></text>
					<text class="text-grey">小区编码</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{communityId}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-home text-green"></text>
					<text class="text-grey">小区名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{communityName}}</text>
				</view>
			</view>
		</view>
		<view class="block__title">业主信息</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{appUserName}}</text>
				</view>
			</view>
			<!-- <view class="cu-item">
				<view class="content">
					<text class="cuIcon-card text-green"></text>
					<text class="text-grey">身份证</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{idCard}}</text>
				</view>
			</view> -->
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">手机号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{link}}</text>
				</view>
			</view>
		</view>

		<view class="button_up_blank"></view>
		<view v-if="active == 1" class="cu-form-group justify-center">
			<button class="cu-btn bg-red lg" @tap.native.stop="unbindOwner">解绑业主</button>
		</view>
	</view>
</template>

<script>
	// pages/viewBindOwner/viewBindOwner.js
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;
	
	import {getCommunityName} from '@/api/community/communityApi.js'

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

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			this.loadOwnerInfo();
			this.communityName = getCommunityName();
		},
		methods: {
			/**
			 * 加载业主信息
			 */
			loadOwnerInfo: function() {
				let _that = this;

				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						let _active = _ownerInfo.state == '10000' ? 1 : 2;
						_that.areaName = _ownerInfo.parentAreaName + _ownerInfo.areaName;
						_that.communityId = _ownerInfo.communityId;
						_that.appUserName = _ownerInfo.ownerName;
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

				context.request({
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
	@import "./viewBindOwner.css";

	text {
		text-align: center;
	}
</style>
