<template>
	<view>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white nav-list">
			<view class="search-form round" @tap="toSearch()">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="请输入商品名" @tap="toSearch()"
					></input>
			</view>
			<view class="text-white" @tap="toSelectArea()">
				{{selectCommunityName}}<text class="cuIcon-refresharrow"></text>
			</view>
		</view>
		<!-- 店铺类型 -->
		<view class="">
			<scroll-view scroll-x class="nav nav-scroll  padding-bottom-xs" scroll-with-animation >
				<view class="cu-item text-white" :class="item.shopTypeId==shopTypeId?'nav-cur':''"
					v-for="(item,index) in navList" :key="index" @tap="selectType(index)" :data-id="index">
					{{item.typeName}}
				</view>
			</scroll-view>
		</view>
		<view class="padding-lr-sm">
			<!-- 广告 -->
			<vc-ads></vc-ads>
			<!-- 商圈菜单-->
			<vc-category :category-list="categoryList"></vc-category>
			<seckill-view></seckill-view>
			<group-view></group-view>
			<!-- 商圈商品 -->
			<vc-recommend ref="vcRecommendRef"></vc-recommend>
			<!-- <vc-shop ref="vcShopRef"></vc-shop> -->
		</view>
		<vc-bottom-black></vc-bottom-black>
	</view>
</template>

<script>
	import fixedSearch from '../../components/fixed-search/fixed-search.vue';

	import vcCategory from '@/components/vc-category/vc-category.vue';

	import vcShop from '@/components/vc-shop/vc-shop.vue';

	import vcRecommend from '@/components/vc-recommend/vc-recommend.vue';

	import vcAds from '@/components/vc-ads/vc-ads.vue';

	import vcBottomBlack from '@/components/vc-bottom-black/vc-bottom-black.vue';

	import param from '../../constant/MappingConstant.js';

	import flixedadd from "../../components/flixedadd/flixedadd.vue";
	
	import groupView from '@/components/index/group-view.vue';
	import seckillView from '@/components/index/seckill-view.vue';

	import {
		getMallIndexCategoryList,
		queryShopType
	} from '../../api/mall/mallApi.js'
	import {
		getMallCommunityId,
		getMallCommunityName
	} from '../../api/community/communityApi.js';
	import {
		sliceArray
	} from '../../lib/java110/utils/ArrayUtil.js'

	export default {
		data() {
			return {
				navList: [],
				shopTypeId:'0',
				selectCommunityName: "",
				categoryList: [],
				addlistdata: [{
					title: "我的发布",
					src: "/static/images/market_my.png"
				}]
			}
		},
		components: {
			vcCategory,
			vcRecommend,
			vcAds,
			vcShop,
			vcBottomBlack,
			groupView,
			seckillView
		},
		onLoad(options) {
			let that = this;
			this.vc.onLoad(options);
			this._getCategoryList();
		},
		onShow: function() {
			this.selectCommunityName = getMallCommunityName();
			if(this.$refs.vcShopRef){
				this.$refs.vcShopRef._loadCommunityShops();
			}
			if(this.$refs.vcRecommendRef){
				this.$refs.vcRecommendRef._loadRecommendProdcut();
			}
			this.shopTypeId = 0
		},
		onReachBottom() {
			this.$refs.vcRecommendRef._loadRecommendProdcut();
		},
		methods: {
			selectType(index) {
				let shopTypeId = this.navList[index].shopTypeId;
				this.shopTypeId = shopTypeId;
				if(this.shopTypeId == 0){
					return;//首页不跳转
				}
				this.vc.navigateToMall({
					url: '/pages/market/market?typeId=' + shopTypeId
				})
			},
			_getCategoryList() {
				let _that = this
				let params = {
					page: 1,
					row: 100,
					isShow: "Y",
					shopId: '9999',
					typeCd: '2002'
				}
				getMallIndexCategoryList(params)
					.then(function(result) {
						let categoryData = result.data
						_that.categoryList = sliceArray(categoryData, 8)
					});
				params = {
					page: 1,
					row: 100
				}
				queryShopType(params)
					.then(function(result) {
						_that.navList = result.data
						_that.navList.unshift({
							"shopTypeId": "0",
							"typeName": "首页"
						})
					})
			},
			addlisttap: function(index) {
				/*第一个序列为0,第二个为1,以此类推;当值为-1代表点击的是遮慕层*/
				this.vc.loginAuth();
				let _that = this;
				if (index == 0) {
					this.vc.navigateTo({
						url: '/pages/myOrder/myOrder'
					}, true);
					return;
				}
			},
			//搜索跳转
			toSearch:function() {
				this.vc.navigateToMall({
					url: '/pages/goods/HM-search?searchType=3'
				})
			},
			//切换小区
			toSelectArea(e) {
				this.vc.navigateToMall({
					url: `/pages/selectcommunity/selectcommunity`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-list {
		background-image: linear-gradient(45deg, #FA2E1B, #FA2E1B) !important;
	}
	.nav-scroll{
		background-color: #FA2E1B;
	}
	
	.nav-cur{
		font-weight:bold;
		border-bottom:1px solid #FFFFFF;
	}
</style>
