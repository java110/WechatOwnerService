<template>
	<view>
		<view class="block__title">物业信息</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-home text-green"></text>
					<text class="text-grey">小区名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{communityName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-service text-green"></text>
					<text class="text-grey">物业名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{property.storeName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-info text-green"></text>
					<text class="text-grey">物业编号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{property.storeId}}</text>
				</view>

			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-location text-green"></text>
					<text class="text-grey">公司地址</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{property.address}}</text>
				</view>

			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">联系电话</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{property.tel}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	export default {
		data() {
			return {
				property: {},
				communityId: '',
				communityName: ''
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			context.getOwner(function(_ownerInfo) {
				if (_ownerInfo) {
					let _active = _ownerInfo.state == '10000' ? 1 : 2;

					_that.communityId = _ownerInfo.communityId;
					_that.communityName = _ownerInfo.communityName;
					_that._loadProperty();
				}
			});

		},
		methods: {
			_loadProperty: function() {
				let _that = this;
				context.getProperty()
					.then(function(_property) {
						_that.property = _property;
					});
			}
		}
	}
</script>

<style>
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 60rpx 30rpx 20rpx;
	}


	.button_up_blank {
		height: 40rpx;
	}
</style>
