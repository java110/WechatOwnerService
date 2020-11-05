<template>
	<view class="">
		<!-- 规格 -->
		<view class="cu-modal sku-modal  bottom-modal" style="z-index: 999;" :class="{ show: showModal }" @tap="hideModal"
		 v-if="goodsInfo.defaultSpecValue.price">
			<view class="cu-dialog" @tap.stop style="background: none;">
				<view class="shop-modal page_box" :style="goodsInfo.is_sku == 0 ? 'height:500rpx' : ''">
					<text class="cuIcon-roundclosefill" @tap="hideModal"></text>
					<!-- 商品信息 -->
					<view class="top flex justify-start modal-head__box">
						<image class="shop-img" :src="baseUrl+goodsInfo.coverPhoto" mode="aspectFill"></image>
						<view class="y-bc goods-box">
							<view class="goods-title more-t">{{ goodsInfo.prodName }}</view>
							<view class="flex justify-between align-center goods-bottom">
								<view class="price-box x-f">
									<view v-if="goodsType === 'score'">{{ currentSkuPrice.price_text || goodsInfo.defaultSpecValue.price }}</view>
									<view v-else-if="grouponBuyType === 'groupon'">
										￥{{ currentSkuPrice.groupon_price || (goodsInfo.activity_type === 'groupon' ? goodsInfo.groupon_price : goodsInfo.defaultSpecValue.price) }}
									</view>
									<view v-else>￥{{ currentSkuPrice.price || goodsInfo.defaultSpecValue.price }}</view>
								</view>
								<text class="stock">库存{{ currentSkuPrice.stock || goodsInfo.stock }}件</text>
							</view>
						</view>
					</view>
					<!-- 选择规格 -->
					<view class="content_box">
						<view class="select-box flex flex-direction align-start">
							<view class="type-title">规格</view>
							<view class="tag-box flex flex-direction">
								<button class="tag cu-btn" v-for="(sc, index) in skuList" :key="index" :class="{' tag-active':sc.isDefault == 'T'}"
								 @tap="chooseSku(sc,skuList)">
									{{ sc.name }}
								</button>
							</view>
						</view>
						<view class="buy-num-box flex justify-between align-center">
							<view class="num-title">购买数量</view>
							<view class="num-step">
								<uni-number-box @change="changeNum" :step="1" :min="0" :currentSkuPrice.sync="currentSkuPrice" :goodsInfo="goodsInfo"
								 :value="goodsNum"></uni-number-box>
							</view>
						</view>
					</view>
					<view class="btn-box foot_box x-bc">
						<button class="cu-btn  seckill-btn" @tap="confirm">确认</button>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	import conf from '../../conf/config.js'
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex';
	
	import {saveStoreCart} from '../../api/goods/goodsApi.js';
	
	import {getCurOwner} from '../../api/owner/ownerApi.js'
	
	export default {
		name: 'vcSku',
		components: {
			uniNumberBox
		},
		data() {
			return {
				
				baseUrl: conf.baseUrl,
				currentSkuPrice: {},
				currentSkuArray: [],
				goodsNum: 1,
				confirmGoodsInfo: {},
				type: this.buyType,
			};
		},
		props: {
			goodsInfo: {},
			skuList: [],
			value: {},
			buyType: {
				type: String,
				default: 'sku'
			},
			goodsType: {
				type: String,
				default: 'goods'
			},
			grouponBuyType: {
				type: String,
				default: 'alone'
			},
			grouponId: {
				//参加拼团的时候，传入当前团id;
				type: Number,
				default: 0
			}
		},
		created() {
		},
		mounted() {
			// 单规格选项
			
		},
		watch: {
			type(nweVal, oldVal) {
				return newVal;
			}
		},
		computed: {
			skuPrice() {
				return this.goodsInfo.sku_price;
			},
			showModal: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit('input', val);
				}
			},
			currentSkuText() {
				let that = this;
				let str = '';
				let currentSkuArray = this.currentSkuArray;
				currentSkuArray.forEach(v => {
					that.skuList.forEach(s => {
						s.content.forEach(u => {
							if (u.id === v) {
								str += ' ' + u.name;
							}
						});
					});
				});
				that.$emit('getSkuText', str);
				return str;
			}
		},

		methods: {
			jump:function(path, parmas) {

			},
			// 选择规格
			chooseSku:function(sc, skuList) {
				this.$emit('chooseSku', sc);
			},

			// 当前所选规格下，获取所有有库存的 skuPrice
			getCanUseSkuPrice: function() {
				let newPrice = [];

				if (this.skuPrice == undefined) {
					return newPrice;
				}

				for (let price of this.skuPrice) {
					if (price.stock <= 0) {
						// || price.stock < this.goodsNum		不判断是否大于当前选择数量，在 uni-number-box 判断，并且 取 stock 和 goods_num 的小值
						continue;
					}
					var isOk = true;

					this.currentSkuArray.forEach(sku => {
						// sku 不为空，并且，这个 条 skuPrice 没有被选中,则排除
						if (sku.toString() != '' && price.goods_sku_id_arr.indexOf(sku.toString()) < 0) {
							isOk = false;
						}
					});

					if (isOk) {
						newPrice.push(price);
					}
				}

				return newPrice;
			},
			// 数量
			changeNum: function(e) {
				let that = this;
				this.goodsNum = +e;
			},
			// 弹窗显示隐藏
			showSkuModal: function() {
				this.$emit('changeType', 'sku');
				this.showModal = true;
			},
			hideModal: function() {
				this.showModal = false;
			},
			
			// 立即购买
			confirmBuy:function() {
				let _that = this;
				let valueId = '';
				let price = 0.0
				_that.goodsInfo.productSpecValues.forEach(item =>{
					if(item.isDefault == 'T'){
						valueId = item.valueId
						price = item.price
					}
				});
				this.vc.navigateTo({
					url: '/pages/goodsConfirm/goodsConfirm?productId='
					+_that.goodsInfo.productId
					+"&valueId="+valueId
					+"&goodsNum="+_that.goodsNum
					+"&price="+price
					+"&prodName="+_that.goodsInfo.actProdName
					+"&coverPhoto="+encodeURIComponent(_that.goodsInfo.coverPhoto)
					+"&storeId="+_that.goodsInfo.storeId
				})

			},
			// 确定
			confirm:function() {
				switch (this.buyType) {
					case 'cart':
						this.addCartGoods();
						break;
					case 'buy':
						this.confirmBuy();
						break;
					default:
				}
			},

			addCartGoods: function() {
				let _that = this;
				let valueId = '';
				_that.goodsInfo.productSpecValues.forEach(item =>{
					if(item.isDefault == 'T'){
						valueId = item.valueId
					}
				});
				getCurOwner()
				.then((owner)=>{
					
					let _dataObj = {
						productId:_that.goodsInfo.productId,
						storeId:_that.goodsInfo.storeId,
						personId:owner.memberId,
						cartNum:_that.goodsNum,
						valueId:valueId
					};
					return saveStoreCart(_dataObj);
				},(reject)=>{
					
				}).then((data)=>{
					if(data.code == 0){
						_that.showModal = false;
						
						
						_that.$emit('changeBalance',true)
					}
				},(reject)=>{
					
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
		height: 950rpx;
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
				background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
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
			background: linear-gradient(90deg, rgba(103, 104, 105, 1), rgba(82, 82, 82, 1));
			box-shadow: 0px 2rpx 5rpx 0px rgba(102, 103, 104, 0.46);
		}

		.buy-btn {
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		}

		.seckill-btn {
			width: 710rpx;
			height: 70rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
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
