<template>
	<view>
		<view class="cu-bar search bg-white b-radius">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" placeholder="请输入服务名称" type="text"  @tap="toSearch()" disabled="true"></input>
			</view>
			<view class="text-green" @tap="toSelectArea()">
				{{selectCommunityName}}<text class="cuIcon-refresharrow"></text></view>
		</view>
		<view class="padding-lr-sm">
			<vc-ads :height="300" locationTypeCd="5000"></vc-ads>
			<vc-category-homemaking :category-list="categoryList"></vc-category-homemaking>
			<vc-recommend-homemaking :category-type="categoryType" ref="vcRecommendRef"></vc-recommend-homemaking>
			<vc-shop :openType="openType" ref="vcShopRef"></vc-shop>
		</view>
		
		<vc-bottom-black></vc-bottom-black>

	</view>
</template>

<script>
	import fixedSearch from '../../components/fixed-search/fixed-search.vue';
	
	import vcCategory from '@/components/vc-category-homemaking/vc-category-homemaking.vue'
	
	import vcShop from '@/components/vc-shop/vc-shop.vue'
	
	import vcRecommend from '@/components/vc-recommend-homemaking/vc-recommend-homemaking.vue'
	
	import vcAds from '@/components/vc-ads/vc-ads.vue'
	
	import vcBottomBlack from '@/components/vc-bottom-black/vc-bottom-black.vue';
	import param from "../../constant/param.js"
	import {
		getHousekeepingTypeList
	} from "../../api/homemaking/homemakingApi.js"
	import {
		sliceArray
	} from '../../utils/ArrayUtil.js'
	import mapping from '../../constant/MappingConstant.js'
	import {getCommunityId,getMallCommunityId,getMallCommunityName} from '../../api/community/communityApi.js';
	export default {
		data() {
			return {
				// 专区目录类型
				selectCommunityName:"",
				categoryType: param.CATEGORY_TYPE.HOMEMAKING,
				openType: "2,3",
				categoryList: {},
				addlistdata:[
					{
						title:"我的发布",
						src:"/static/images/market_my.png"
					}
				]
			}
		},
		components: {
			vcCategory,
			vcRecommend,
			vcAds,
			vcShop,
			vcBottomBlack
		},
		onLoad(options) {
			this.vc.onLoad(options)
			this._getCategoryList()
		},
		onShow: function() {
			this.selectCommunityName = getMallCommunityName();
			if(this.$refs.vcShopRef){
				this.$refs.vcShopRef._loadCommunityShops();
			}
			if(this.$refs.vcRecommendRef){
				this.$refs.vcRecommendRef._loadRecommendProdcut();
			}
			
		},
		methods: {
			_getCategoryList() {
				let _that = this
				let params = {
					page: 1,
					row: 100,
					isShow: "Y",
					shopId: param.SHOP_ID_GLOBAL,
					typeCd: param.MENU_TYPE.HOMEMAKING
				}
				getHousekeepingTypeList(params)
					.then(function(result) {
						let categoryData = result.data
						_that.categoryList = sliceArray(categoryData, 8)
					})
			},
			addlisttap:function(index){/*第一个序列为0,第二个为1,以此类推;当值为-1代表点击的是遮慕层*/
				this.vc.loginAuth();
				let _that = this;
				if(index == 0){
					this.vc.navigateToMall({
						url:'/pages/homemaking/order'
					},true);
					return ;
				}
			},
			//搜索跳转
			toSearch(e){
				this.vc.navigateToMall({
					url: `/pages/goods/HM-search?searchType=2`
				},true)
			},
			//切换小区
			toSelectArea(e){
				this.vc.navigateToMall({
					url: `/pages/selectcommunity/selectcommunity`
				},true)
			}
		}
	}
</script>

<style>

</style>
