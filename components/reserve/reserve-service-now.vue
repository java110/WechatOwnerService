<template>
	<view class="">
		<!-- 规格 -->
		<view class="cu-modal sku-modal  bottom-modal" style="z-index: 999;" :class="{ show:isShow }"
			@tap="_cancle">
			<view class="cu-dialog" @tap.stop style="background: none;">
				<view class="shop-modal page_box">
					<text class="cuIcon-roundclosefill" @tap="_cancle"></text>
					<!-- 商品信息 -->
					<view class="flex justify-between">
						<view>预约数量</view>
						<view style="width: 60%;">
							<radio-group class="flex justify-end" @change="_changeReserveQuantity">
								<view v-for="item in goods.hoursMaxQuantity" :key="item">
									<radio class="" v-model="goods.quantity" :value="item+1"></radio>
									<view>{{item+1}}个</view>
								</view>
							</radio-group>
							<!-- <checkbox class='round checked' checked="true" value="B"></checkbox> -->
						</view>
					</view>
					<view class="flex justify-between margin-top">
						<view>预约时间</view>
						<view style="width: 60%;">
							<checkbox-group class="flex justify-end" @change="_changeReserveTime">
								<view class="margin-right-sm" v-if="item.isOpen == 'Y'"
									v-for="(item,index) in openTimes" :key="index">
									<checkbox class=' ' :value="item.hours"></checkbox>
									<view>{{item.hours}}时</view>
								</view>
							</checkbox-group>
							<!--  -->
						</view>
					</view>
					<view class="btn-box foot_box margin-top-lg">
						<button class="cu-btn  seckill-btn" @tap="confirm">确认</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCatalogs,
		getCatalogGoodss,
		getReserveParams
	} from '@/api/community/reserveApi.js';
	import {
		getCommunityId
	} from '@/api/community/communityApi.js';
	export default {
		name: 'reserveServiceNow',
		data() {
			return {
					isShow: false,
				goods: {},
				openTimes:[]
			};
		},
		mounted() {
			// 单规格选项
		},
		methods: {
			reserveGoods: function(_goods) {
				this.isShow = true;
				this.goods = {
					hours: [],
					quantity: "1"
				},
				this.money = 0;
				this.openTimes = [];
				
				this._loadGoods(_goods.goodsId);
			},
			_cancle: function() {
				this.isShow = false;
			},
			// 选择规格
			_changeReserveTime: function(e) {
				this.goods.hours = e.detail.value;
				this._computeMoney();
			},
			_changeReserveQuantity: function(e, guid, item) {
				this._computeMoney();
				this.goods.quantity = e.detail.value;
			},
			_loadGoods: function(_goodsId) {
				let _that = this;
				getCatalogGoodss({
					page: 1,
					row: 1,
					communityId: getCommunityId(),
					goodsId: _goodsId
				}).then(_data => {
					_data[0].hoursMaxQuantity = parseInt(_data[0].hoursMaxQuantity);
					_that.goods = _data[0];
					_that.goods.hours = [];
					_that.goods.quantity = "1"
					
					_that._loadGoodsParams();
				})
			},
			_loadGoodsParams: function() {
				let _that = this;
				getReserveParams({
					page: 1,
					row: 1,
					communityId: getCommunityId(),
					paramsId: this.goods.paramsId
				}).then(_data => {
					_that.openTimes = _data[0].openTimes;
					_that.$forceUpdate();
				})
			},
			_computeMoney:function(){
				let _quantity = this.goods.hours.length * parseFloat(this.goods.quantity);
				this.money = (_quantity * parseFloat(this.goods.price)).toFixed(2);
				this.goods.money = this.money;
			},
			confirm:function(){
				let _selectGoods = [];
				_selectGoods.push(this.goods)
				uni.setStorageSync('/pages/reserve/reserveOrder',_selectGoods);
				uni.navigateTo({
					url:'/pages/reserve/reserveOrder?from=service'
				})
			}
		}
	};
</script>

<style lang="scss">
	.size-box {
		line-height: 82rpx;
		background: #fff;
		padding: 0 20rpx;
		margin: 20rpx 0;
		font-size: 28rpx;

		.title {
			color: #999;
			margin-right: 20rpx;
		}

		.cuIcon-right {
			color: #bfbfbf;
			font-size: 36rpx;
		}
	}

	// 规格
	.shop-modal {
		width: 750upx;
		height: 650rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 30rpx 30rpx 0 0 !important;
		padding: 60upx 20upx 30rpx;

		.cuIcon-roundclosefill {
			font-size: 34rpx;
			color: #e0e0e0;
			position: absolute;
			top: 20rpx;
			right: 20rpx;
		}

		.top {
			margin-bottom: 50upx;

			.shop-img {
				width: 160upx;
				height: 160upx;
				border-radius: 6upx;
				margin-right: 30upx;
				background: #ccc;
			}

			.goods-box {
				height: 160upx;
				width: 490rpx;
				align-items: flex-start;

				.goods-title {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 42rpx;
					text-align: left;
				}

				.goods-bottom {
					width: 100%;
				}

				.price-box {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #e1212b;

					.unit {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #e1212b;
					}
				}

				.stock {
					font-size: 26rpx;
					color: #999;
				}
			}
		}

		.select-box {
			margin-bottom: 25upx;

			.type-title {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				margin-bottom: 20upx;
			}

			.tag-box {
				flex-wrap: wrap;
			}

			.tag {
				line-height: 62rpx;
				background: rgba(#ddd, 0.8);
				border-radius: 31rpx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999;
				padding: 0 30upx;
				margin-bottom: 20rpx;
				margin-right: 10rpx;
			}

			.tag-active {
				background: linear-gradient(45deg, #ff9700, #ed1c24);
				color: rgba(#fff, 0.9);
			}

			.tag-disabled {
				background: #f5f5f5;
			}
		}

		.buy-num-box {
			.num-title {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				margin-bottom: 20upx;
			}
		}
	}

	.btn-box {
		height: 100rpx;

		.cu-btn {
			width: 340rpx;
			height: 70rpx;
			border-radius: 35rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 0.9);
			padding: 0;
		}

		.cart-btn {
			background: linear-gradient(45deg, rgba(103, 104, 105, 1), rgba(82, 82, 82, 1));
			box-shadow: 0px 2rpx 5rpx 0px rgba(102, 103, 104, 0.46);
		}

		.buy-btn {
			background-image: linear-gradient(45deg, #ff9700, #ed1c24);
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		}

		.seckill-btn {
			width: 710rpx;
			height: 70rpx;
			background-image: linear-gradient(45deg, #ff9700, #ed1c24);
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			border-radius: 35rpx;
			padding: 0;
		}
	}
</style>
