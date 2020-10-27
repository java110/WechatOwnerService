<template>
	<scroll-view @scrolltolower="lower" class="scroll-restaurants-list" scroll-y="true" style="height:100%">
		<swiper class="categoryList padding-top-xs margin-top-sm bg-white" indicator-dots="true" indicator-color="rgba(228,228,228,1)"
		 indicator-active-color="#FECA49">
			<block v-for="(item, index) in categoryList" :key="index">
				<swiper-item>
					<block v-for="(item, index2) in item" :key="index2">
						<view class="category-info" v-if="item.href != 'undefined'">
							<navigator @tap="toPage(item.href)">
								<image :src="item.src" class="category-image"></image>
								<view class="category-text">{{item.name}}</view>
							</navigator>
						</view>
						<view class="category-info" v-else>
							<view @tap="callUndefined()">
								<image :src="item.src" class="category-image"></image>
								<view class="category-text">{{item.name}}</view>
							</view>
						</view>
					</block>
				</swiper-item>
			</block>
		</swiper>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: {}
			}
		},
		mounted() {
			this.getCategorys();
		},
		methods: {

			toPage: function(pageUrl) {
				uni.navigateTo({
					url:pageUrl
				})
			},
			callUndefined:function(){
				uni.showToast({
					icon:'none',
					title:'此功能暂不开放'
				})
			},
			getCategorys: function() {
				this.categoryList = {
					pageone: [{
						name: "跳蚤市场",
						src: "/static/images/mall_market.png",
						href: "/pages/market/market"
					}, {
						name: "品质拼团",
						src: "/static/images/mall_groupBuy.png",
						href: "/pages/payParkingFeeList/payParkingFeeList"
					}, {
						name: "限时秒杀",
						src: "/static/images/mall_secKill.png",
						href: "undefined"
					}, {
						name: "家政服务",
						src: "/static/images/mall_domestic.png",
						href: "undefined"
					}, {
						name: "美食",
						src: "/static/images/mall_delicious.png",
						href: "undefined"
					}, {
						name: "超市",
						src: "/static/images/mall_supermarket.png",
						href: "undefined"
					}]

				};
			}
		}
	}
</script>

<style>
	.categoryList {
		width: 100%;
		height: 360upx;
		border-bottom: 20rpx solid #f4f4f4;
	}

	.category-image {
		width: 80rpx;
		height: 80rpx;
	}

	.category-text {
		font-size: 25rpx;
		width: 100%;
		/* line-height: 30rpx */
	}

	.category-info {
		display: inline-block;
		text-align: center;
		position: relative;
		margin-top: 20rpx;
		height: 130rpx;
		width: 25%;
	}
</style>
