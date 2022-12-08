<template>
	<view>
		<view class="page">
			<view class="tab">
				<view class="tabItem" v-for="(item,index) in tab" :key="index" :class="{active:active==index}"
					@click="changeTab(index)">
					<view class="title">{{item}}</view>
					<view class="underLine" :class="{active:active==index}"></view>
				</view>
			</view>
			<view class="content">
				<!-- 未使用 -->
				<view >
					<view class="list"  v-if="active==0">
						<view class="listItem"  v-for="(item, index) in couponList" :key="index" @click="_toQrCode(item)">
							<image :src="couponImg" class="coupon"></image>
							<view class="box">
								<view class="descripe">
									<view class="shop-name">{{ item.couponName }}({{item.stock}}张)</view>
									<view class="text">{{ item.value }}</view>
									<view class="expire">{{ item.createTime }}-{{ item.endTime+' 前' }}</view>
								</view>
								<view class="usestate">
									{{item.toTypeName}}
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 已使用 -->
					<view class="list expired" v-if="active==1">
						<view class="listItem"  v-for="(item, index) in useCouponList" :key="index">
							<image :src="couponImg" class="coupon"></image>
							<view class="box">
								<view class="descripe">
									<view class="shop-name">{{ item.couponName }}</view>
									<view class="text">{{ item.value }}</view>
									<view class="expire">{{ item.createTime }}-{{ item.endTime+'00：00' }}</view>
								</view>
								<view class="usestate" >
									已使用
								</view>
							</view>
						</view>
					</view>
				<!-- 已过期 -->
				<view class="list expired" v-if="active==2">
					<view >
						<view class="listItem"  v-for="(item, index) in tmpCouponList" :key="index">
							<image :src="couponImg" class="coupon"></image>
							<view class="box">
								<view class="descripe">
									<view class="shop-name">{{ item.couponName }}</view>
									<view class="text">{{ item.value }}</view>
									<view class="expire">{{ item.createTime }}-{{ item.endTime+'00：00' }}</view>
								</view>
								<view class="usestate">
									已过期
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>
<script>
	
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;

	import vcDiscount from '@/components/vc-discount/vc-discount.vue'
	import vcUserAccount from '@/components/vc-user-account/vc-user-account.vue'

	// import mapping from '../../constant/MappingConstant.js'
	// #ifdef H5

	const WexinPayFactory = require('../../factory/WexinPayFactory.js');

	// #endif

	// #ifdef APP-PLUS
	import {
		getPayInfo
	} from '../../factory/WexinAppPayFactory.js'
	// #endif

	import {
		addMonth,
		formatDate,
		date2String,
		dateSubOneDay
	} from '../../lib/java110/utils/DateUtil.js'
	import {
		getCouponUsers
	} from '../../api/fee/feeApi.js';
	
	import {getCommunityId} from '@/api/community/communityApi.js'

	export default {
		data() {
			return {
				couponList: [],
				tmpCouponList: [],
				useCouponList: [],
				userLink: '',
				couponAmount: 0.0,
				imgStaticUrl: this.STATICURL,
				tab: ['未使用', '已使用', '已过期'],
				active: 0, //当前选中项
				isHas: true,
				pageShow: false,
				couponImg:this.imgUrl+'/h5/images/coupon.png',
			}
		},
		onLoad: function(options) {
			context.onLoad(options);
			this._loadCouponUsers();
		},
		methods: {
			_loadCouponUsers: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 30,
					tel: context.getUserInfo().link,
					communityId:getCommunityId(),
					state: '1001',
					isStart:'Y'
				}
				_that.couponList = [];
				_that.tmpCouponList = [];
				let _couponUsers = [];
				getCouponUsers(_objData, _couponUsers)
					.then((_couponList) => {
						
						_couponList.data.forEach(items => {
							items.createTime = items.createTime.replaceAll('-', '/');
							items.endTime= items.endTime.replaceAll('-', '/');
							if (items.isExpire == 'Y') {
								_that.couponList.push(items);
							} else {
								_that.tmpCouponList.push(items);
							}
						})
						console.log(_that.couponList);
						//_that.noData = false;
					}, () => {
						//_that.noData = true;
					})

			},
			changeTab(index) {
				let _that = this;
				_that.useCouponList=[];
				this.active = index;
				this.isHas = false
				if (this.active != '1') {
					return;
				}
				let _objData = {
					page: 1,
					row: 30,
					tel: context.getUserInfo().link,
					state: '2002'
				}
				let _couponUsers = [];
				getCouponUsers(_objData, _couponUsers)
					.then((_couponList) => {
						_couponList.data.forEach(item => {
							item.createTime = item.createTime.replaceAll('-', '/');
							item.endTime= item.endTime.replaceAll('-', '/');
							_that.useCouponList.push(item);
						})
						//_that.noData = false;
					}, () => {
						//_that.noData = true;
					});
			},
			_toQrCode:function(_coupon){
				
				if(_coupon.toType == '2002'){
					uni.showToast({
						icon:'none',
						title:'请到缴费抵消'
					})
					return;
				}else if(_coupon.toType == '1001' || _coupon.toType == '1011'){
					uni.navigateTo({
						url:'/pages/coupon/goodsCoupon?couponId='+_coupon.couponId
					})
				}else if(_coupon.toType == '4004'){
					uni.navigateTo({
						url:'/pages/coupon/giftParkingCoupon?couponId='+_coupon.couponId+"&couponName="+_coupon.couponName
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.fee-last {
		margin-bottom: 200upx;
	}

	.cu-btn.lgplus {
		padding: 0 20px;
		font-size: 18px;
		height: 100upx;

	}

	.cu-btn.sharp {
		border-radius: 0upx;
	}

	.line-height {
		line-height: 100upx;
	}

	.page {
		.button {
			position: fixed;
			bottom: 80rpx;
			width: 500rpx;
			height: 44px;
			left: 125rpx;
			font-size: 16px;
			background-image: -webkit-linear-gradient(left, #8bbefd, #e0e0e0);
			background-image: linear-gradient(to right, #8bbefd, #e0e0e0);
			box-shadow: 4rpx 4rpx 4rpx #ccc;
			border-radius: 50rpx;
		}

		.tab {
			top: 0;
			position: fixed;
			left: 0;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 88rpx;
			background: #fff;
			z-index: 2;
			border-bottom: 1rpx solid #fbfbfb;

			.tabItem {
				font-size: 28rpx;
				line-height: 48rpx;
				color: #999;
				font-weight: 400;

				&.active {
					color: #FA3E3F;
					font-weight: 600;
				}
			}
		}

		.content {
			padding-top: 88rpx;

			.list {
				.listItem {
					padding: 11rpx 22rpx;
					background: #fff;
					position: relative;
					border-bottom: 1rpx solid #fbfbfb;

					&:last-child {
						border-bottom: none;
					}

					.coupon {
						width: 100%;
						height: 188rpx;
					}

					.box {
						color: #fff;
						position: absolute;
						left: 32rpx;
						top: 32rpx;
						right: 32rpx;
						bottom: 32rpx;
						padding: 42rpx 23rpx 42rpx 31rpx;
						display: flex;
						justify-content: space-around;
						align-items: center;

						.price {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 120rpx;

							.icon {
								font-size: 36rpx;
							}

							.volum {
								font-size: 60rpx;
							}
						}

						.descripe {
							margin-left: 22rpx;
							flex: 1;

							.shop-name {
								background-color: #fff;
								color: #79b2fb;
								border-radius: 50rpx;
								padding: 2rpx 10rpx;
								width: fit-content;
								font-size: 24rpx;
							}

							.text {
								font-size: 24rpx;
								line-height: 33rpx;
								margin-top: 15rpx;
							}

							.expire {
								font-size: 18rpx;
								line-height: 25rpx;
								margin-top: 15rpx;

							}
						}

						.usestate {
							font-size: 24rpx;
							width: 120rpx;
							text-align: center;

							image {
								width: 121rpx;
								height: 121rpx;
							}
						}
					}
				}

			}

			.expired {
				.shop-name {
					color: #adacac !important;
				}
			}
		}
	}
</style>
