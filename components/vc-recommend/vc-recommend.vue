<template>
	<view class="margin-top" v-if="products && products.length > 0">

		<view v-for="(item,indexs) in products" :key="indexs">
			<view class="text-left ">
				<text class="recommend-title">{{item.categoryName}}</text>
			</view>

			<view class="grid margin-bottom text-center col-2">
				<view class="margin-top-xs margin-bottom-sm"
					v-for="(product,i) in item.mainCategoryProducts" :key="i">
					<view class="padding-sm  bg-white goods " :class="i%2 == 0 ? 'margin-right-xs' : 'margin-left-xs'" @tap="_toGoodsDetail(product)">
						<view>
							<image class="goods-image c-radius" :src="product.coverPhoto"></image>
						</view>
						<view class="margin-top-sm text-left">
							<text>{{product.prodName}}</text>
						</view>
						<view class="flex justify-between margin-top-xs">
							<view>
								<text class="text-red">￥{{product.price}}</text>
							</view>
							<view>
								<text class="text-gray">销量{{product.sales}}件</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getRecommendProduct
	} from '../../api/goods/goodsApi.js'
	import conf from '../../conf/config.js'
	import {getMallCommunityId} from '../../api/community/communityApi.js';
	export default {
		data() {
			return {
				products: [],
				communityId: ""
			}
		},
		mounted() {
			this._loadRecommendProdcut();
		},
		methods: {
			_loadRecommendProdcut: function() {
				let _that = this;
					_that.communityId = getMallCommunityId();
				let _data = {
					page: 1,
					row: 6,
					communityId:_that.communityId
				}
				getRecommendProduct(_data)
					.then((products) => {
						_that.products = products;
					})
			},
			_toGoodsDetail: function(_product) {
				this.vc.navigateToMall({
					url: '/pages/goods/goods?productId=' + _product.productId+"&shopId="+_product.shopId 
				},true);
			}
		}
	}
</script>

<style>
	.recommend-title {
		font-size: 36upx;
		font-weight: 600;
	}

	.goods {
		border-radius: 20upx;
	}

	.goods-image {
		height: 180upx;
	}
</style>
