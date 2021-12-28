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
						<view class="listItem"  v-for="(item, index) in couponList" :key="index">
							<image src="/static/images/coupon.png" class="coupon"></image>
							<view class="box">
								<view class="price">
									<view class="icon">¥</view>
									<view class="volum">{{ item.actualPrice }}</view>
								</view>
								<view class="descripe">
									<view class="shop-name">{{ item.couponName }}</view>
									<view class="text">无门槛</view>
									<view class="expire">{{ item.createTime }}-{{ item.endTime+' 前' }}</view>
								</view>
								<view class="usestate" >
									您可以在缴物业费、停车费等地方直接抵扣。
								</view>
							</view>
						</view>
					</view>
				</view>
		
				<!-- 已使用 -->
				<view v-for="(itemsData, i) in list">
					<view class="list expired" v-if="active==1">
						<view class="listItem"  v-for="(item, index) in couponList" :key="index">
							<image src="/static/images/coupon.png" class="coupon"></image>
							<view class="box">
								<view class="price">
									<view class="icon">¥</view>
									<view class="volum">{{ item.actualPrice }}</view>
								</view>
								<view class="descripe">
									<view class="shop-name">{{ item.couponName }}</view>
									<view class="text">无门槛</view>
									<view class="expire">{{ item.createTime }}-{{ item.endTime+'00：00' }}</view>
								</view>
								<view class="usestate" >
									您已使用过此优惠券。
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 已过期 -->
				<view class="list expired" v-if="active==2">
					<view >
						<view class="listItem"  v-for="(item, index) in tmpCouponList" :key="index">
							<image src="/static/images/coupon.png" class="coupon"></image>
							<view class="box">
								<view class="price">
									<view class="icon">¥</view>
									<view class="volum">{{ item.actualPrice }}</view>
								</view>
								<view class="descripe">
									<view class="shop-name">{{ item.couponName }}</view>
									<view class="text">无门槛</view>
									<view class="expire">{{ item.createTime }}-{{ item.endTime+'00：00' }}</view>
								</view>
								<view class="usestate" >
									已过期，无法使用。
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
	// pages/payParkingFee/payParkingFee.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	
	import vcDiscount from '@/components/vc-discount/vc-discount.vue'
	import vcUserAccount from '@/components/vc-user-account/vc-user-account.vue'
	
	// import mapping from '../../constant/MappingConstant.js'
	// #ifdef H5
	
	const WexinPayFactory = require('../../factory/WexinPayFactory.js');
	
	// #endif
	
	// #ifdef APP-PLUS
	import {getPayInfo} from '../../factory/WexinAppPayFactory.js'
	// #endif
	
	import {addMonth,formatDate,date2String,dateSubOneDay} from '../../utils/DateUtil.js'
	import {
		getCouponUsers
	} from '../../api/fee/feeApi.js'
	
	export default {
		data() {
			return {
				couponList: [],
				tmpCouponList:[],
				userLink: '',
				couponAmount: 0.0,
				imgStaticUrl: this.STATICURL,
				tab: ['未使用', '已使用', '已过期'],
				active: 0, //当前选中项
				isHas: true,
				pageShow: false
			}
		},
		onLoad: function(options){
			context.onLoad(options);
			this._loadCouponUsers();
		},
		methods: {
			checkboxChange(e) {
				this.couponAmount = '0'
				var items = this.couponList
				var values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].couponId == values[j]) {
							items[i].checked = true;
							break
						}
					}
					if (items[i].checked == true) {
						this.couponAmount = parseFloat(this.couponAmount) + parseFloat(items[i].actualPrice)
						}
					}
					console.log(this.couponList);
				},
			_loadCouponUsers: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 30,
					tel: context.getUserInfo().link,
					state: '1001'
				}
				_that.couponList = [];
				let _couponUsers= [];
				getCouponUsers(_objData, _couponUsers)
					.then((_couponList) => {
						_couponList.data.forEach(items => {
							items['checked'] = false;
							if(items.isExpire == 'Y'){
								_that.couponList.push(items);
							}else{
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
				this.list = []
				this.active = index;
				this.isHas = false
				// this.$nextTick(() => {
				// 	this._loadCouponUsers();
				// })
			},
			_navigateBack: function(){
				let _that = this;
				let newCouponList = [];
				_that.couponList.forEach(items => {
					if(items.checked == true){
						newCouponList.push(items);
					}
				})
				
				let outCouponList={
					couponList: newCouponList,
					couponAmount: _that.couponAmount
				};
				uni.setStorageSync(constant.mapping.COUPON_USER_KEY,outCouponList);
				uni.navigateBack();
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
							
							.shop-name{
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
			
			.expired{
				.shop-name{
					color: #adacac!important;
				}
			}
		}
	}
</style>
