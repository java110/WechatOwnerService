<template>
	<view>
		<view class="home_swiper margin-top-sm" v-if="goodsList && goodsList.length>0">
			<text class="text-gray padding-sm">为您推荐</text>
			<view class="goods-list margin-top-xs">
				<view class="list" v-for="(item,index) in goodsList" @click="_advertJump(item)" :key="index">
					<view class="pictrue">
						<image :src="item.picUrl" mode="heightFix"></image>
					</view>
					<view class="title-tag">
						<view class="tag">
							{{item.prodName}}
						</view>
					</view>
					<view class="price-info">
						<view class="user-price">
							<text class="min">￥</text>
							<text class="max">{{item.price}}</text>
						</view>
						<!-- <view class="vip-price">
							<image src="/static/vip_ico.png"></image>
							<text>￥{{item.defaultSpecValue.vipPrice}}</text>
						</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		listCommunityMarketGoods
	} from '../../api/index/indexApi.js';
	import {
		getCommunityId
	} from '@/api/community/communityApi.js'
	export default {
		name: "successGoods",
		data() {
			return {
				goodsList: [],
			};
		},
		props: {
			objType: {
				type: String,
				default: '3003',
			},
		},
		created() {
			this._loadAdvertGoods();
		},
		methods: {
			_loadAdvertGoods: function() {
				let _that = this;
				let _objData = {
					objType: this.objType,
					communityId: getCommunityId(),
				};
				//查询 广告
				listCommunityMarketGoods(_objData)
					.then(function(_aPhotos) {
						_that.goodsList = _aPhotos.data;
					});
			},
			_advertJump: function(ad) {
				// 站外
				let url = encodeURIComponent(ad.picLink)
				uni.navigateTo({
					url: '/pages/hcWebView/hcWebView?url=' + url
				})
			},
		}
	}
</script>

<style lang="scss">
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 30rpx;
		.list{
			width: 48%;
			//height: 540rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			overflow: hidden;
			.pictrue{
				display: flex;
				justify-content: center;
				width: 100%;
				image{
					height: 350rpx;
				}
			}
			.title-tag{
				// display: flex;
				//height: 100rpx;
				padding: 20rpx;
				.tag{
					float: left;
					margin-right: 10rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					white-space: normal;
					font-size: 26rpx;
					line-height: 40rpx;
					text{
						font-size: 24rpx;
						color: #FFFFFF;
						padding: 4rpx 16rpx;
						//background: linear-gradient(to right,$base,$change-clor);
						border-radius: 6rpx;
						margin-right: 10rpx;
					}
				}
			}
			.price-info{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
				height: 80rpx;
				.user-price{
					display: flex;
					align-items: center;
					text{
						color: #FF0000;
					}
					.min{
						font-size: 24rpx;
					}
					.max{
						font-size: 32rpx;
					}
				}
				.vip-price{
					display: flex;
					align-items: center;
					image{
						width: 26rpx;
						height: 26rpx;
						margin-right: 10rpx;
					}
					text{
						color: #fcb735;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
