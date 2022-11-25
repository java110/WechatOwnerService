<template>
	<view>
		<view class="home_list">
			<view class="home_item" v-for="(item,index) in home_list" :key="index" @click="to(item)">
				<image :src="item.src"></image>
				<view class="text">{{item.name}}</view>
			</view>
		</view>

		<view class="serve_box">
			<view class="serve_title">功能服务<text class="more" @click="more()">更多</text></view>
			<view class="serve_list">
				<view class="serve_item" v-for="(item,index) in serve_list" :key="index" @click="to(item)">
					<image :src="item.src"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>

		<view class="new_box">
			<view class="margin-bottom-xs">
				<uni-notice-bar showIcon="true" scrollable="true" single="true" speed="30" text="欢迎访问智慧物业">
				</uni-notice-bar>
			</view>
			<view class="new_list">
				<view class="new_item" v-for="(item,index) in new_list" :key="index" @click="to(item)">
					<view class="new_wrap">
						<view class="new_font">
							<view class="name">{{item.name}}</view>
							<view class="text">{{item.desc}}</view>
						</view>
						<image :src="item.src"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="callPropertyModal==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">拨打电话</view>
					<view class="action" @tap="_cancleCall()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认拨打,{{property.communityName}}物业客服电话<br />{{property.sCommunityTel}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleCall()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doCall()">拨号</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		hasOwner
	} from '../../api/owner/ownerApi.js';
	import {
		hasLogin
	} from '../../lib/java110/page/Page.js';

	import {
		getProperty
	} from '../../api/property/propertyApi.js';

	export default {
		name: "indexMenu",
		data() {
			return {
				home_list: [],
				serve_list: [],
				callPropertyModal: false,
				property: {},
				new_list: [{
						src: this.imgUrl + '/h5/images/serve/new1.png',
						name: '报事报修',
						desc: '一键维修',
						href: '/pages/repair/repair'
					},
					{
						src: this.imgUrl + '/h5/images/serve/new2.png',
						name: '联系物业',
						desc: '一键搞定',
						href: '_callPropertyTel'
					},
				],
			};
		},
		created() {
			this._loadFunc();
		},
		methods: {
			_loadFunc: function() {
				this.home_list = [{
							name: '社区公告',
							src: this.imgUrl + '/h5/images/serve/7.png',
							href: '/pages/notice/index'
						},
						{
							name: '家庭成员',
							src: this.imgUrl + '/h5/images/serve/2.png',
							href: '/pages/family/familyList'
						},
						{
							name: '访客通行',
							src: this.imgUrl + '/h5/images/serve/3.png',
							href: '/pages/visit/visitList'
						},
					],
					this.serve_list = [{
							name: '生活缴费',
							src: this.imgUrl + '/h5/images/serve/1.png',
							href: '/pages/fee/oweFee'
						},
						{
							name: '房屋费',
							src: this.imgUrl + '/h5/images/serve/5.png',
							href: '/pages/fee/roomFeeListNew'
						},
						{
							name: '停车费',
							src: this.imgUrl + '/h5/images/serve/9.png',
							href: '/pages/fee/payParkingFeeList'
						},
						{
							name: '一键开门',
							src: this.imgUrl + '/h5/images/serve/8.png',
							href: '/pages/machine/openDoor'
						},
					]
			},
			to: function(v) {
				if (v.href == '_callPropertyTel') {
					this.callPropertyTel();
				} else {
					this.vc.navigateTo({
						url: v.href
					});
				}
			},
			callPropertyTel: function() { //拨打电话
				let _that = this;
				if (!hasLogin()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					});
					return;
				}
				hasOwner();
				uni.getStorage({
					key: 'ownerInfo',
					success: function(res) {
						_that.property = res.data;
						_that.callPropertyModal = true;
					}
				});
			},
			_doCall: function() {

				let _that = this;
				uni.makePhoneCall({
					// 手机号
					phoneNumber: _that.property.sCommunityTel,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},
			_cancleCall: function() {
				this.callPropertyModal = false;
			},
			more: function() {
				uni.switchTab({
					url: '/pages/homemaking/homemaking'
				})
			}
		}
	}
</script>

<style lang="less">
	.home_list {
		display: flex;
		margin-bottom: 20upx;

		.home_item {
			padding: 20upx;
			width: calc((100% - 40upx) / 3);
			margin-right: 20upx;
			background: #fff;
			text-align: center;
			display: flex;
			align-items: center;
			border-radius: 5upx;
			font-size: 28upx;

			image {
				height: 40upx;
				width: 40upx;
				margin-right: 5upx;
			}
		}

		.home_item:last-child {
			margin-right: 0;
		}
	}

	.serve_box {
		padding: 0 20upx;
		background: #fff;
		margin-bottom: 20upx;

		.serve_title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20upx 0;
			font-size: 30upx;
			font-weight: 600;

			.more {
				font-size: 24upx;
				font-weight: 400;
				color: #999;
			}
		}

		.serve_list {
			border-radius: 5px;
		}

		.serve_item {
			display: inline-block;
			padding: 20upx;
			width: 25%;
			text-align: center;
			font-size: 28upx;

			image {
				height: 64upx;
				width: 64upx;
			}

			.text {
				white-space: nowrap;
				font-size: 20upx;
				font-weight: 400;
			}
		}

		.home_item:last-child {
			margin-right: 0;
		}

	}

	.new_box {
		background: #fff;
		padding: 20upx;
		margin-bottom: 20upx;

		.new_wrap {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.new_item {
			position: relative;
			display: inline-block;
			padding: 20upx;
			margin-right: 20upx;
			width: calc((100% - 40upx) / 2);
			background: #f5f5f5;
			border-radius: 5upx;

			.new_font {
				z-index: 2;
			}

			.name {
				font-size: 28upx;
				font-weight: 600;
				color: #333;
				text-align: left;
			}

			.text {
				font-size: 24upx;
				font-weight: 400;
				color: #999;
			}

			image {
				width: 160upx;
				height: 120upx;
			}
		}

		.new_item:last-child {
			margin-right: 0;
		}
	}
</style>
