<template>
	<view>
		<view class="home_swiper" v-if="goodsList && goodsList.length>0">
			<text class="text-gray padding-xs">为您推荐</text>
			<view class="goods-list">
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
	import {getCommunityId} from '@/api/community/communityApi.js'
	export default {
		name: "successGoods",
		data() {
			return {
				goodsList: [],
			};
		},
		props:{
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
	.home_swiper {
		margin-bottom: 20upx;
	}
	
	.goods-list{
		display: flex;
		width: 100%;
		height: 220rpx;
		.list{
			width: 50%;
			height: 100%;
			.pictrue{
				width: 100%;
				height: 70%;
				image{
					width: 150rpx;
					height: 150rpx;
				}
			}
			.price{
				display: flex;
				align-items: center;
				width: 100%;
				height: 30%;
				.selling-price{
					font-size: 28rpx;
					font-weight: bold;
					color: red;
				}
				.original-price{
					font-size: 24rpx;
					text-decoration: line-through;
					color: #bbbaba;
					margin-left: 10rpx;
				}
			}
		}
	}
	.good-choice{
		width: 50%;
		height: 100%;
		.goods-title{
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			height: 80rpx;
			.title{
				display: flex;
				align-items: center;
				text{
					font-size: 28rpx;
					color: #4c4b4b;
				}
			}
			.describe{
				display: flex;
				align-items: center;
				margin-left: 10rpx;
				text{
					font-size: 24rpx;
					color: #979696;
				}
				.num{
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 6rpx;
					width: 30rpx;
					height: 30rpx;
					background-color: red;
					color: #FFFFFF;
					border-radius: 6rpx;
				}
			}
		}
		.goods-list{
			display: flex;
			width: 100%;
			height: 220rpx;
			.list{
				width: 50%;
				height: 100%;
				.pictrue{
					width: 100%;
					height: 70%;
					image{
						width: 150rpx;
						height: 150rpx;
					}
				}
				.price{
					display: flex;
					align-items: center;
					width: 100%;
					height: 30%;
					.selling-price{
						font-size: 28rpx;
						font-weight: bold;
						color: red;
					}
					.original-price{
						font-size: 24rpx;
						text-decoration: line-through;
						color: #bbbaba;
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>
