<template>
	<view class="margin-top">
		<view>
			<view class="text-left ">
				<scroll-view scroll-x class="nav" scroll-with-animation>
					<view class="cu-item"
						:class="item.mainCategoryId==curCategoryId?'text-catagory-select ':'text-catagory'"
						v-for="(item,index) in mainCatagorys" :key="index" @tap="_doSelect(item)" :data-id="index">
						{{item.categoryName}}
					</view>
				</scroll-view>
			</view>
			<view class="grid margin-bottom text-center col-2">
				<view class="margin-top-xs margin-bottom-sm" v-for="(product,i) in products" :key="i">
					<view class="padding-sm  bg-white goods " :class="i%2 == 0 ? 'margin-right-xs' : 'margin-left-xs'"
						@tap="_toGoodsDetail(product)">
						<view v-if="product.coverPhoto">
							<image class="goods-image c-radius" :src="product.coverPhoto"></image>
						</view>
						<view v-else>
							<image class="goods-image c-radius" :src="noPic"></image>
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
		getRecommendProduct,
		queryMainCategory,
		queryPhoneMainCategoryProduct
	} from '../../api/goods/goodsApi.js'
	import conf from '../../conf/config.js'
	import {
		getMallCommunityId
	} from '../../api/community/communityApi.js';
	export default {
		data() {
			return {
				curCategoryId: '-1',
				mainCatagorys: [{
					categoryName: "为你推荐",
					mainCategoryId: "-1"
				}],
				products: [],
				communityId: "",
				noPic: '',
				pagesize: 10,
				pagefrom: 1,
			}
		},
		mounted() {
			this._loadMainCatagory();
			this.noPic = this.imgUrl + '/h5/images/noPic.png'
		},
		methods: {
			_loadMainCatagory: function() {
				let _that = this;
				let _data = {
					page: 1,
					row: 10
				}
				
				this.products=[];
				this.pagefrom =0;
				
				queryMainCategory(_data)
					.then((products) => {
						if (!products || products.length < 1) {
							return;
						}
						_that.mainCatagorys = products;
						_that.curCategoryId = products[0].mainCategoryId;
					}).then(() => {
						_that._loadRecommendProdcut();
					})
			},
			_loadRecommendProdcut: function() {
				let _that = this;
				_that.communityId = getMallCommunityId();
				let _data = {
					page: this.pagefrom+1,
					row: this.pagesize,
					communityId: _that.communityId,
					mainCategoryId: _that.curCategoryId
				}
				queryPhoneMainCategoryProduct(_data)
					.then((_data) => {
						_that.products = _that.products.concat(_data.data);
						if (_that.pagefrom <= _data.records) {
							_that.pagefrom = _that.pagefrom + 1;
						} else {
							_that.loadingText = "已经到底了";
						}
					})
			},
			_toGoodsDetail: function(_product) {
				this.vc.navigateToMall({
					url: '/pages/goods/goods?productId=' + _product.productId + "&shopId=" + _product.shopId
				}, true);
			},
			_doSelect: function(item) {
				this.curCategoryId = item.mainCategoryId;
				this.pagefrom =0;
				this.products=[];
				this._loadRecommendProdcut();
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

	.text-catagory {
		color: #656565;
		font-size: 28upx;

	}

	.text-catagory-select {
		color: #000000;
		font-size: 40upx;
	}
</style>
