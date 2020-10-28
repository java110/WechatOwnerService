<template>
	<view class="margin-top-sm">
		<view class="text-center">
			<text class="recommend-title">为你推荐</text>
		</view>

		<view class="grid margin-bottom text-center col-2">
			<view class="padding-lr-xs margin-top-xs " v-for="(item,indexs) in products" :key="indexs">
				<view class="padding bg-white goods" @tap="_toGoodsDetail(item)">
					<view>
						<image class="goods-image" :src="item.coverPhoto"></image>
					</view>
					<view class="margin-top-sm text-left">
						<text>{{item.prodName}}</text>
					</view>
					<view class="flex justify-between margin-top-xs">
						<view>
							<text class="text-red">￥86.5</text>
						</view>
						<view>
							<text class="text-gray">销量100件</text>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {getRecommendProduct} from '../../api/goods/goodsApi.js'
	import conf from '../../conf/config.js'
	export default {
		data() {
			return {
				products:[]

			}
		},
		mounted() {
			this._loadRecommendProdcut();
		},
		methods: {
			_loadRecommendProdcut:function(){
				let _that =this;
				let _data = {
					page:1,
					row:6,
					labelCd:'8800012001',
					hasProduct:'Y'
				}
				getRecommendProduct(_data)
				.then((products)=>{
					_that.products = products;
					_that.products.forEach(item =>{
						item.coverPhoto = conf.baseUrl + item.coverPhoto;
					})
				})
			},
			_toGoodsDetail:function(_product){
				this.vc.navigateTo({
					url:'/pages/goodDetail/goodDetail?productId='+_product.productId
				});
			}
			

		}
	}
</script>

<style>
	.recommend-title{
		font-size: 36upx;
		font-weight: 600;
	}
	.goods {
		border-radius: 20upx;
	}

	.goods-image {
		height: 280upx;
	}
</style>
