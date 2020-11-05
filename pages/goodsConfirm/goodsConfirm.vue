<template>
	<view class="page_box">
		<view class="head_box">
			<view class="add-address-box " v-if="!addressId" @tap="jump('/pages/addressList/addressList')">
				<view class="box-bg flex justify-between align-center padding">
					<text class="select-notice">请选择收货地址</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="address-list" v-else @tap="jump('/pages/user/address/list', { from: 'order' })">
				<image class="address-bg" src="http://shopro.7wpp.com/imgs/address_line.png" mode=""></image>
				<view class="top x-f">
					<text class="name">{{ address.consignee }}</text>
					<text class="phone">{{ address.phone }}</text>
					<text class="tag" v-if="address.is_default == 1">默认</text>
				</view>
				<view class="detail x-bc">
					<view class="address">{{ address.province_name }}{{ address.city_name }}{{ address.area_name }}{{ address.address }}</view>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		<view class="content_box">
			<!-- 确认订单商品卡片 -->

			<view class="goods-list " v-for="(g,index) in perGoodsList" :key="g.index">
				<view class="flex justify-start align-center">
					<view class="flex align-center justify-center" style="height: 200rpx;" @tap="onSel(index, g.checked)">
						<checkbox :checked="g.checked" :class="{ checked: g.checked }" class="goods-radio round orange"></checkbox>
					</view>
					<view class="goods-card">
						<vc-good-card :detail="g" :sku="g.price">
							<block slot="goodsBottom">
								<view class="goods-price flex justify-between">
									<view class="">
										<text>￥{{ g.price }}</text>
									</view>
									<text class="goods-num">x{{ g.goodsNum }}</text>
								</view>
							</block>
						</vc-good-card>
					</view>
				</view>
				<!-- 配送方式 -->
				<view class="logistic item-list flex justify-between align-center" @tap="onSelExpressType(g)">
					<view class="x-f">
						<view class="item-title">配送方式</view>
					</view>
					<view class="flex justify-end">
						<view class="detail">{{getCurGoodsExpress(g)}}</view>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>

			<!-- 备注 -->
			<view class="remark-box flex justify-between item-list align-center">
				<view class="item-title">备注</view>
				<input class="item-input" placeholder-class="input-pl" type="text" v-model="remark" placeholder="建议留言前先于卖家沟通确认"></input>
			</view>
			<view class=" flex justify-between item-list border-top align-center">
				<view class="item-title">商品金额</view>
				<view class="x-f">
					<text class="price">￥{{ orderPre.goods_amount || '0.00' }}</text>
				</view>
			</view>
			<view class="price-box flex justify-between item-list align-center">
				<view class="item-title">运费</view>
				<view class="x-f">
					<text class="price">￥{{ orderPre.dispatch_amount || '0.00' }}</text>
				</view>
			</view>
		</view>
		<view class="foot_box flex justify-between align-center">
			<text class="num">共1件</text>
			<view class="all-money">
				<text>合计：</text>
				<text class="price">￥{{ orderPre.total_fee || '0.00' }}</text>
			</view>
			<button class="cu-btn sub-btn" @tap="subOrder" :disabled="isSubOrder">
				<text v-if="isSubOrder" class="cuIcon-loading2 cuIconfont-spin"></text>
				提交订单
			</button>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex';

	import vcGoodCard from '@/components/vc-good-card/vc-good-card.vue'


	import {
		getStoreCart
	} from '../../api/goods/goodsApi.js'

	import {
		getCurOwner
	} from '../../api/owner/ownerApi.js'


	export default {
		components: {
			vcGoodCard
		},
		data() {
			return {
				showPicker: false,
				isSubOrder: false,
				address: {
					is_default: 0
				},
				storeList: [], //门店列表
				storeInfo: {
					id: 0
				}, //商家信息
				addressId: 0,
				from: '',
				orderType: '',
				grouponBuyType: 'alone',
				grouponId: 0,
				perGoodsList: [], //确认单订单商品
				remark: '',
				orderPre: {},
				couponId: 0,
				expressTypeCur: '',
				showCheckTime: false, //配送时间弹窗。
				inExpressType: [], //当前商品支持的配送方式。
				getFocus: false, //获取焦点。
				checkType: '自提',
				checkTime: {},
				checkTimeCur: 0, //默认选中时间。
				checkTimeId: 'c1', //锚点用
				checkDayCur: 0, //默认日期
				personId: ''

			};
		},
		watch: {
			address(val, oldVal) {
				if (this.address) {
					this.addressId = this.address.id;
					this.getPre();
				}
			}
		},
		async onLoad(options) {
			let _that = this;
			if (options.hasOwnProperty("productId")) {
				this.perGoodsList.push({
					productId: options.productId,
					valueId: options.productId,
					goodsNum: options.goodsNum,
					price: options.price,
					prodName: options.prodName,
					coverPhoto: decodeURIComponent(options.coverPhoto),
					storeId: options.storeId
				});
			}



			await this.init();
		},
		onShow() {},
		methods: {
			init() {
				return Promise.all([this.getOwner(), this.getDefaultAddress(), this.getPre()]);
			},
			jump(path) {
				this.vc.navigateTo({
					url: path
				})
			},
			// 编译预留手机号
			onInput() {
				this.getFocus = true;
				this.selfPhone = '';

			},
			// 获取当前商品配送方式
			getCurGoodsExpress(goods) {
				for (let item of this.perGoodsList) {
					if (item.productId == goods.productId && goods.valueId == item.valueId) {
						//return this.expressTypeMap[item.dispatch_type];
						return "商家配送";
					}
				}
			},
			// 订单信息
			getPre() {
				let that = this;
				getStoreCart({
					personId: that.goodsList,

				}).then(res => {
					if (res.code === 1) {
						that.orderPre = res.data;
						that.perGoodsList = res.data.new_goods_list
						that.perGoodsList.map(item => {
							item.selType = item.dispatch_type;
							that.goodsList.forEach(goods => {
								if (item.goods_id == goods.goods_id && item.sku_price_id == goods.sku_price_id) {
									goods.dispatch_type = item.dispatch_type;

									if (item.store_id) {
										goods.store_id = item.store_id;
									}
								}
							})
						})
					}
				});
			},
			// 提交订单
			subOrder() {
				let that = this;
				that.isSubOrder = true;
				that.$api('order.createOrder', {
					goods_list: that.goodsList,
					from: that.from,
					address_id: that.addressId,
					coupons_id: that.couponId,
					remark: that.remark,
					order_type: that.orderType,
					buy_type: that.grouponBuyType,
					groupon_id: that.grouponId
				}).then(res => {
					if (res.code === 1) {
						let orderId = res.data.id;
						let orderSn = res.data.order_sn;
						that.getCartList();
						that.isSubOrder = false;
						//  #ifdef MP-WEIXIN
						res.data.activity_type == 'groupon' ? this.$store.dispatch('getMessageIds', 'grouponResult') : this.$store.dispatch(
							'getMessageIds', 'result');
						//  #endif
						if (res.data.status > 0) {
							that.$Router.replace({
								path: '/pages/order/payment/result',
								query: {
									orderSn: orderSn,
									type: '',
									pay: 1
								}
							});
						} else {
							uni.redirectTo({
								url: `/pages/order/payment/method?orderId=${orderId}`
							});
						}
					} else {
						that.isSubOrder = false;
					}
				});
			},
			// 初始地址
			getDefaultAddress() {
				// this.$api('address.defaults').then(res => {
				// 	if (res.code === 1) {
				// 		if (res.data) {
				// 			this.address = res.data;
				// 			this.selfPhone = res.data.phone
				// 		}

				// 	}
				// });
			},
			getOwner: function() {
				let _that = this;
				return getCurOwner()
					.then((owner) => {
						console.log(owner)
						_that.personId = owner.memberId

					})
			},

			// 格式日期
			check(type, index) {
				if (type == 'time') {
					this.checkTimeCur = index;
					this.checkTimeId = this.checkTime['time'][index].split(':')[[0]];
				}
				if (type == 'day') {
					this.checkDayCur = index;
				}
			}
		}
	};
</script>

<style lang="scss">
	.goods-radio {
		transform: scale(0.7);
		margin-right: 20rpx;
		margin-left: 20upx;
		// background:  #E9B564;
	}

	.add-address-box {
		height: 100rpx;
		background: #fff;
		position: relative;

		.address-bg {
			position: absolute;
			bottom: 0;
			height: 8rpx;
			width: 100%;
		}

		.select-notice {
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 40rpx;
		}
	}

	.address-list {
		padding: 40rpx;
		background: #fff;

		position: relative;

		.address-bg {
			position: absolute;
			bottom: 0;
			height: 8rpx;
			width: 750rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		.name,
		.phone {
			font-size: 30rpx;
			font-weight: 500;
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
			.address {
				margin-top: 25rpx;
				width: 543rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 40rpx;
			}
		}
	}

	// 备注
	.remark-box {
		margin-top: 20rpx;
		background: #fff;
		padding: 25rpx;

		.item-input {
			flex: 1;
			text-align: end;
			font-size: 28rpx;
		}

		.input-pl {
			color: #c4c4c4;
		}
	}

	// 商品卡片
	.goods-list {
		background: #fff;
		position: relative;
		margin-top: 20rpx;

		/deep/ .goods-title {
			width: 460rpx !important;
		}

		.goods-card {
			padding: 30rpx;
		}

		.goods-price {
			font-size: 30rpx;
			font-weight: 500;
			width: 480rpx;

			.goods-num {
				font-size: 28rpx;
				color: #c4c4c4;
			}
		}
	}

	.item-list {
		height: 100rpx;
		background: #fff;
		padding: 0 25rpx;

		.item-title {
			font-size: 28rpx;
			margin-right: 20rpx;
		}

		.detail {
			font-size: 28rpx;
			color: #333;
		}

		.price {
			font-size: 26rpx;
			color: #e1212b;
			margin-right: 20rpx;
		}

		.sel-coupon {
			font-size: 26rpx;
			color: #c4c4c4;
			margin-right: 20rpx;
		}

		.cuIcon-right {
			color: #c4c4c4;
		}
	}

	.logistic,
	.price-box,
	.remark-box,
	.score,
	.coupon {
		border-top: 1rpx solid rgba(#dfdfdf, 0.5);
	}

	.border-top {
		border-top: 1rpx solid rgba(#dfdfdf, 0.5);
	}

	.foot_box {
		height: 100rpx;
		padding: 0 25rpx;
		justify-content: flex-end;
		background-color: #fff;
		border-top: 0.5px solid #eeeeee;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;

		.num {
			font-size: 26rpx;
			color: #999;
		}

		.all-money {
			margin: 0 60rpx 0 20rpx;

			.price {
				color: #e1212b;
			}
		}

		.sub-btn {
			width: 210rpx;
			height: 70rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
			border-radius: 35rpx;
			font-size: 28rpx;
			color: #fff;
		}
	}

	// 弹窗之配送方式
	// 配送方式
	.express-type {
		width: 750rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		height: 700rpx;
		overflow: visible;

		.express-type__head {
			width: 100%;
			height: 74rpx;
			background: #F8E3BD;
			border-radius: 20rpx 20rpx 0 0;

			&-nav {
				width: (750rpx/4);
				position: relative;
				height: 100%;
			}

			.head-nav--active {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0;
				background: #fff;
				width: 100%;
				height: 80rpx;
				background-color: #fff;
				border-radius: 20rpx 20rpx 0px 0px;

				&::after {
					content: '';
					display: block;
					width: 40rpx;
					height: 80rpx;
					position: absolute;
					transform: skewX(20deg);
					background: #fff;
					border-top-right-radius: 20rpx;
					top: 0;
					right: -15rpx;
				}

				&::before {
					content: '';
					display: block;
					width: 40rpx;
					height: 80rpx;
					position: absolute;
					transform: skewX(-20deg);
					background: #fff;
					border-top-left-radius: 20rpx;
					top: 0;
					left: -15rpx;
				}
			}

			.head-nav__left--active {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0;
				background: #fff;
				width: 100%;
				height: 74rpx;
				background-color: #fff;
				border-radius: 20rpx 20rpx 0px 0px;

				&::after {
					content: '';
					display: block;
					width: 40rpx;
					height: 74rpx;
					position: absolute;
					transform: skewX(20deg);
					background: #fff;
					border-top-right-radius: 20rpx;
					top: 0;
					right: -15rpx;
				}
			}

			.head-nav__right--active {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0;
				background: #fff;
				width: 100%;
				height: 74rpx;
				background-color: #fff;
				border-radius: 20rpx 20rpx 0px 0px;

				&::before {
					content: '';
					display: block;
					width: 40rpx;
					height: 74rpx;
					position: absolute;
					transform: skewX(-20deg);
					background: #fff;
					border-top-left-radius: 20rpx;
					top: 0;
					left: -15rpx;
				}
			}

			.head-nav__title {
				font-size: 24rpx;
				font-weight: 500;
				color: #666;
				position: relative;
				z-index: 6;
			}

			.head-nav__title--active {
				color: #a8700d;
				font-size: 26rpx;
			}
		}

		.express-type__content {
			.empty-address {
				height: 120rpx;
				padding: 0 25rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}

			// 无定位
			.location-box {
				height: 500rpx;
				justify-content: center;

				.nolocation-img {
					width: 74rpx;
					height: 90rpx;
					margin-bottom: 40rpx;
				}

				.location-title {
					font-size: 35rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(70, 53, 27, 1);
					margin-bottom: 20rpx;
				}

				.location-tip {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					margin-bottom: 40rpx;
				}

				.open-location {
					width: 492rpx;
					height: 70rpx;
					background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
					box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
					border-radius: 35rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
			}

			// 快递
			.express-address {
				position: relative;
				padding: 30rpx 25rpx;
				background: url('http://shopro.7wpp.com/imgs/address_bg.png') no-repeat;
				background-size: 430rpx 300rpx;
				background-position: top right;

				.express-top {
					margin-bottom: 20rpx;
					width: 550rpx;
					text-align: left;

					.address {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 40rpx;
						text-align: left;
					}

					.dispatch-notice {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 40rpx;
						text-align: left;
					}

					.address-location {
						position: absolute;
						right: 60rpx;
						top: 30rpx;

						.location-img {
							width: 80rpx;
							height: 90rpx;
						}

						.location-text {
							font-size: 18rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
						}
					}

					.tag {
						background: rgba(233, 191, 113, 0.2);
						border-radius: 6rpx;
						padding: 0 16rpx;
						line-height: 38rpx;
						color: #a8700d;
						font-size: 22rpx;
						margin-right: 20rpx;
					}

					.tag1 {
						background: rgba(53, 190, 105, 0.2);
						border-radius: 6rpx;
						padding: 0 16rpx;
						line-height: 38rpx;
						color: #1bbc50;
						font-size: 22rpx;
						margin-right: 20rpx;
					}

					.address-guide {
						position: absolute;
						right: 25rpx;
						top: 40rpx;
						color: #999999;
					}
				}

				.express-content {
					margin-bottom: 20rpx;

					.box-line {
						width: 1rpx;
						height: 61rpx;
						border-left: 1rpx solid rgba(238, 238, 238, 1);
						margin: 0 40rpx;
					}

					.phone-box1 {

						.name,
						.phone {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(102, 102, 102, 1);
						}

						.phone {
							margin-left: 20rpx;
						}
					}

					.time-box,
					.phone-box {
						text-align: left;

						.box-title {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #666;
							padding-bottom: 10rpx;
						}

						.box-text {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333;
						}

						.edit-phone {
							width: 160rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333;
						}

						.box-icon {
							font-size: 28rpx;
							color: #999;
							display: inline-block;
							width: 40rpx;
							text-align: center;
							line-height: 40rpx;
						}
					}
				}

				.express-bottom {
					.protocol-checkbox {
						transform: scale(0.7);
					}

					.protocol {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);

						.protocol-text {
							color: #6487a4;
						}
					}
				}
			}
		}

		.express-type__bottom {
			height: 90rpx;
			padding: 0 30rpx;

			.cancel-btn {
				width: 335rpx;
				height: 74rpx;
				background: rgba(238, 238, 238, 1);
				border-radius: 37rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			.save-btn {
				width: 335rpx;
				height: 74rpx;
				background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
				border-radius: 37rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}
		}
	}

	// 选择配送给时间
	.checkTime-box {
		background: rgba(255, 255, 255, 1);
		border-radius: 20rpx 20rpx 0px 0px;
		height: 720rpx;

		.checkTime-head {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 100rpx;
			position: relative;

			.cuIcon-roundclosefill {
				color: #e0e0e0;
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				line-height: 30rpx;
				font-size: 40rpx;
			}
		}

		.checkTime-foot {
			height: 100rpx;

			.save-btn {
				width: 690rpx;
				height: 80rpx;
				background: linear-gradient(90deg, rgba(240, 199, 133, 1), rgba(246, 214, 157, 1));
				border-radius: 40rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}

		.checkTime-content {
			.checkTime-content__left {
				height: 100%;
				width: 190rpx;
				background: #f5f5f5;

				.left-item {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					height: 100rpx;
					width: 100%;
				}
			}

			.checkTime-content__right {
				flex: 1;
				height: 100%;
				overflow-y: auto;

				.right-item {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					width: 100%;
					text-align: center;
					border-bottom: 1rpx solid rgba(#dfdfdf, 0.6);
					margin: 0 30rpx;
					line-height: 100rpx;
				}
			}

			.item--active {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(168, 112, 13, 1) !important;
				background-color: #fff;
			}
		}
	}
</style>
