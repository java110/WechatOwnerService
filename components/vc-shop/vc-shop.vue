<template>
	<view class="vc-shop margin-top " v-if="shops.length>0">
		<view class="text-left margin-left-xs margin-bottom-sm">
			<text class="recommend-title">附近商家</text>
		</view>
		<view class="cu-list menu-avatar c-radius vc-shop-shop" v-for="(item,index) in shops" :key="index">
			<view class="cu-item cur" @click="_toShopDetail(item)">
				<view class="cu-avatar radius lg" :style="'background-image:url('+item.shopLogo+');'">
					<!-- <view class="cu-tag badge"></view> -->
				</view>
				<view class="content">
					<view>
						<view class="text-cut">{{item.shopName}}</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="cuIcon-locationfill text-orange margin-right-xs"></text> {{item.sendAddress}}
						</view>
					</view>
				</view>
				<view class="action" v-show="false">
					<view class="text-orange cuIcon-rechargefill text-lg"></view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		loadCommunityShops
	} from '../../api/mall/mallApi.js'
	import {
		getCommunityId
	} from '../../api/community/communityApi.js'
	import {
		isNotNull
	} from '../../utils/StringUtil.js'

	export default {
		props: {
			openType: {
				type: String,
				default: '1,3'
			}
		},
		data() {
			return {
				communityId: "",
				shops: []
			}
		},
		mounted() {
			this._loadCommunityShops();
		},
		methods: {
			_loadCommunityShops: function() {
				let _that = this;
				_that.communityId = getCommunityId();
				let _data = {
					page: 1,
					row: 5,
					communityId: _that.communityId,
					state:"24002",
					openType: _that.openType
				}
				// 组件传参店铺类型不为空，追加参数
				if (isNotNull(this.openType)) {
					_data.openType = this.openType
				}
				loadCommunityShops(_data)
					.then((_shops) => {
						_that.shops = _shops;
					})
			},
			/**
			 * 跳转到店铺页面，家政服务页面区分
			 * @param _shop
			 * @private
			 */
			_toShopDetail: function(_shop) {
				let url = this.openType == "1,3" ? '/pages/cate/cate?shopId=' :
					'/pages/homemaking/shop?shopId='
				this.vc.navigateTo({
					url: url + _shop.shopId
				}, true);
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
		height: 280upx;
	}

	.vc-shop .vc-shop-shop {
		margin-top: 5px;
	}
</style>
