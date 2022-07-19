<template>
	<view>
		

		<!-- <view class="padding-lr-sm">
      <vc-ads :height="300" locationTypeCd="5000"></vc-ads>
      <vc-category-homemaking :category-list="categoryList"></vc-category-homemaking>
      <vc-recommend-homemaking :category-type="categoryType" ref="vcRecommendRef"></vc-recommend-homemaking>
      <vc-shop :openType="openType" ref="vcShopRef"></vc-shop>
    </view>
    <vc-bottom-black></vc-bottom-black> -->

		<view class="real_list">
			<view class="title">物业服务</view>
			<view class="list">
				<view class="item" v-for="(item,index) in real_list" :key="index" @tap="to(item)">
					<image :src="item.src"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="live_list">
			<view class="title">生活服务</view>
			<view class="list">
				<view class="item" v-for="(item,index) in live_list" :key="index" @tap="to(item)">
					<image :src="item.src"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		hasOwner
	} from '../../api/owner/ownerApi.js'
	import {
		getCategoryList
	} from '../../api/index/indexApi.js'
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
	} from '../../lib/java110/utils/ArrayUtil.js'
	import mapping from '../../constant/MappingConstant.js'
	import {
		getCommunityId,
		getMallCommunityId,
		getMallCommunityName
	} from '../../api/community/communityApi.js';
	export default {
		data() {
			return {
				// 专区目录类型
				selectCommunityName: "",
				categoryType: param.CATEGORY_TYPE.HOMEMAKING,
				openType: "2,3",
				categoryList: {},
				addlistdata: [{
					title: "我的发布",
					src: "/static/images/market_my.png"
				}],
				real_list: [],
				live_list: [],
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
			// this._getCategoryList()

			// 菜单
			this.categoryList = getCategoryList();
			let list = this.categoryList.pageone.concat(this.categoryList.pagetwo)
			console.log(list)
			this.real_list = [{
						name: '生活缴费',
						src: '/static/images/serve/1.png',
						href: list[0].href
					},
					{
						name: '家庭成员',
						src: '/static/images/serve/2.png',
						href: list[8].href
					},
					{
						name: '访客通行',
						src: '/static/images/serve/3.png',
						href: list[14].href
					},
					// {
					//   name: '门禁钥匙',
					//   src: '/static/images/serve/4.png',
					//   href:''
					// },
					// {
					//   name: '我的房屋',
					//   src: '/static/images/serve/5.png',
					//   href:''
					// },
					{
						name: '报事维修',
						src: '/static/images/serve/6.png',
						href: list[4].href
					},
					{
						name: '社区公告',
						src: '/static/images/serve/7.png',
						href: list[5].href
					},
					{
						name: '一键开门',
						src: '/static/images/serve/8.png',
						href: list[6].href
					},
					// {
					//   name: '新房交付',
					//   src: '/static/images/serve/9.png',
					//   href:''
					// },
					{
						name: '装修报备',
						src: '/static/images/serve/10.png',
						href: list[11].href
					},
					{
						name: '业主信息',
						src: '/static/images/serve/my1.png',
						href: '../viewBindOwner/viewBindOwner'
					},
					{
						name: '我的物业',
						src: '/static/images/serve/my2.png',
						href: '../myProperty/myProperty'
					},
					{
						name: '我的房屋',
						src: '/static/images/serve/my3.png',
						href: '../my/myHouse'
					},
					{
						name: '我的车位',
						src: '/static/images/serve/my6.png',
						href: '/pages/parkingInfo/parkingInfo'
					},
					{
						name: '门禁日志',
						src: '/static/images/serve/my9.png',
						href: '/pages/machineTranslateLog/machineTranslateLog'
					},
					{
						name: '联系客服',
						src: '/static/images/serve/my10.png',
					},
					{
						name: '空置房申请',
						src: '/static/images/serve/my9.png',
						href: '/pages/myApplyRoom/myRoomList'
					},
					{
						name: '我的投诉',
						src: '/static/images/serve/11.png',
						href: '../complaintList/complaintList'
					},
					{
						name: '房屋装修',
						src: '/static/images/serve/15.png',
						href: '../myRenovation/myRoomList'
					}
				],
				this.live_list = [{
						name: '便民信息',
						src: '/static/images/serve/11.png',
						href: 'https://m.cnbianmin.com/xa/'
					},
					{
						name: '便民电话',
						src: '/static/images/serve/12.png',
						href: '/pages/homemaking/phone'
					},
					{
						name: '社区周边',
						src: '/static/images/serve/13.png',
						href: 'https://m.baidu.com/sf?openapi=1&dspName=iphone&from_sf=1&pd=poi&pn=0&rn=10&nqt=s&resource_id=4255&word=%E8%A5%BF%E5%AE%89%E7%A4%BE%E5%8C%BA&nwd=%E8%A5%BF%E5%AE%89%E7%A4%BE%E5%8C%BA&title=%E8%A5%BF%E5%AE%89%E7%A4%BE%E5%8C%BA&user_loc=&ext=%7B%22c%22%3A%22233%22%2C%22loc%22%3A%22%22%2C%22poi_cityname%22%3A%22%E8%A5%BF%E5%AE%89%E5%B8%82%22%2C%22b%22%3A%22%22%2C%22target%22%3A%22%22%2C%22center%22%3A%22%E8%A5%BF%E5%AE%89%E7%A4%BE%E5%8C%BA%22%2C%22type%22%3A%220%22%2C%22nwd%22%3A%22%25E8%25A5%25BF%25E5%25AE%2589%25E7%25A4%25BE%25E5%258C%25BA%22%2C%22source_city_code%22%3A%22233%22%2C%22user_loc%22%3A%22%22%2C%22center_type%22%3A%22%22%7D&poi_type=other&hit_sid=yes&cinema_uid=&new_search=0&allFilterUid=&sfrom=search_47198&is_new_poilist=1'
					},
					{
						name: '商圈',
						src: '/static/images/serve/14.png',
						href: '/pages/mall/mall'
					}
				]
		},
		onShow: function() {
			this.selectCommunityName = getMallCommunityName();
			if (this.$refs.vcShopRef) {
				this.$refs.vcShopRef._loadCommunityShops();
			}
			if (this.$refs.vcRecommendRef) {
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
						console.log(_that.categoryList)
					})
			},
			addlisttap: function(index) {
				/*第一个序列为0,第二个为1,以此类推;当值为-1代表点击的是遮慕层*/
				this.vc.loginAuth();
				let _that = this;
				if (index == 0) {
					this.vc.navigateToMall({
						url: '/pages/homemaking/order'
					}, true);
					return;
				}
			},
			//搜索跳转
			toSearch(e) {
				this.vc.navigateToMall({
					url: `/pages/goods/HM-search?searchType=2`
				}, true)
			},
			//切换小区
			toSelectArea(e) {
				this.vc.navigateToMall({
					url: `/pages/selectcommunity/selectcommunity`
				}, true)
			},
			to(v) {
				if (v.name == '商圈') {
					uni.switchTab({
						url: v.href
					})
				} else if (v.href != '') {
					hasOwner();
					this.vc.navigateTo({
						url: v.href
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '此功能暂不开放'
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.real_list,
	.live_list {
		background: #fff;
		padding: 0 40upx;
		margin-top: 20upx;

		.title {
			line-height: 32upx;
			background: #fff;
			font-size: 30upx;
			font-weight: 600;
			color: #333;
			padding: 40upx 0;
			margin-top: 10px;
		}

		.item {
			width: 25%;
			display: inline-block;
			text-align: center;
			margin-bottom: 40upx;
		}

		image {
			height: 44upx;
			width: 44upx;
			margin-bottom: 10upx;
		}

		.text {
			color: #333;
			font-size: 28upx;
		}
	}
</style>
