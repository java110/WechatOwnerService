<template>
	<view class="page_box">
		<view class="head_box"></view>
		<view class="content_box">
			<view class="address-list" v-for="(address,index) in addressList" :key="index" @tap="useAddress(address)">
				<view class="top flex justify-start">
					<text class="name">{{ address.username }}</text>
					<text class="phone">{{ address.tel }}</text>
					<text class="tag" v-if="address.isDefault === 'T'">默认</text>
				</view>
				<view class="detail">{{ address.address }}</view>
				<button class="cu-btn set-btn" @tap.stop="jump('/pages/addressEdit/addressEdit',address)">编辑</button>
			</view>
		</view>
		<view class="foot_box flex justify-around">
			<button class="cu-btn add-btn" @tap="jump('/pages/addressEdit/addressEdit',{addressId:'-1'})">添加收货地址</button>
		</view>
	</view>
</template>

<script>
	import {
		getCurOwner,
		getUserAddress
	} from '../../api/owner/ownerApi.js';
	export default {
		components: {},
		data() {
			return {
				addressList: [],
				from: '',
				platform: uni.getStorageSync('platform')
			};
		},
		computed: {},
		onLoad() {},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				return Promise.all([this.getAddressList()]);
			},
			useAddress(address) {
				let pages = getCurrentPages();

				// #ifdef MP-WEIXIN || APP-PLUS
				let currPage = pages[pages.length - 1].$vm;
				let prevPage = pages[pages.length - 2].$vm; //上一个页面
				// #endif

				// #ifdef H5
				let currPage = pages[pages.length - 1];
				let prevPage = pages[pages.length - 2]; //上一个页面
				// #endif
				prevPage.address = address;

				uni.navigateBack({
					delta: 1
				});
			},
			// 路由跳转
			jump(path,param) {
				this.vc.navigateTo({
					url:path+'?addressId='+param.addressId
				})
			},
			getAddressList() {
				let that = this;
				getCurOwner()
					.then((ownerInfo) => {
						let param = {
							page: 1,
							row: 30,
							userId: ownerInfo.userId
						}
						return getUserAddress(param);
					}).then((data) => {
						that.addressList = data.data;
					});

			}
		}
	};
</script>

<style lang="scss">
	.page_box {
		height: 100%;
	}

	.content_box {
		height: 100%;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		overflow-y: auto;
	}

	.address-list {
		padding: 40rpx;
		position: relative;
		background: #fff;
		margin-bottom: 20rpx;

		.name,
		.phone {
			font-size: 30rpx;
			font-weight: 600;
		}

		.phone {
			margin: 0 20rpx;
		}

		.tag {
			background: rgba(233, 191, 113, 0.2);
			border-radius: 6rpx;
			padding: 0 16rpx;
			line-height: 38rpx;
			color: #a8700d;
			font-size: 22rpx;
		}

		.detail {
			margin-top: 25rpx;
			width: 543rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 40rpx;
		}

		.set-btn {
			background: none;
			position: absolute;
			font-size: 26rpx;
			color: #a8700d;
			top: 40rpx;
			right: 20rpx;
		}
	}

	.foot_box {

		height: 100rpx;
		padding: 0 25rpx;
		justify-content: flex-end;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;

		.sync-wxaddress {
			flex: 1;
			height: 80rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 40rpx;

			.cuIcon-weixin {
				color: #1ea907;
				margin-right: 10rpx;
				font-size: 40rpx;
			}
		}

		.add-btn {
			height: 80rpx;
			flex: 1;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			border: 1rpx solid rgba(238, 238, 238, 1);
			border-radius: 40rpx;
			color: rgba(#fff, 0.9);
		}
	}
</style>
