<template>
	<view>
		<view class="home_swiper" v-if="ad && ad.length>0">
			<text class="text-gray padding-xs">更多精彩</text>
			<swiper class="ad-swiper margin-top-xs bg-white" indicator-dots="true" indicator-color="rgba(228,228,228,1)"
				indicator-active-color="#FECA49" autoplay="true" interval="5000" duration="1000" circular="true">
				<block v-for="(item, index) in ad" :key="index" @click="_advertJump(item)">
					<swiper-item>
						<image style="height:100%;width: 100%" :src="item.picUrl"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		listMarketPicByCommunity
	} from '../../api/index/indexApi.js';
	import {getCommunityId} from '@/api/community/communityApi.js'
	export default {
		name: "successAds",
		data() {
			return {
				ad: [],
			};
		},
		props:{
			objType: {
			  type: String,
			  default: '3003',
			},
		},
		created() {
			this._loadAdvertPhoto();
		},
		methods: {
			_loadAdvertPhoto: function() {
				let _that = this;
				let _objData = {
					objType: this.objType,
					communityId: getCommunityId(),
				};
				//查询 广告
				listMarketPicByCommunity(_objData)
					.then(function(_aPhotos) {
						_that.ad = _aPhotos.data;
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

<style>
	.home_swiper {
		margin-bottom: 20upx;
	}
</style>
