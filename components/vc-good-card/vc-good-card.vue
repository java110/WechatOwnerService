<template>
	<view class="">
		<view class="goods-box flex justify-start" >
			<image class="goods-img" :src="baseUrl+detail.coverPhoto || ''" mode="aspectFill"></image>
			<view class="flex flex-direction justify-start order-right">
				<view class="goods-title more-t">{{ detail.prodName || '' }}</view>
				<view class="order-tip one-t">
					<text class="order-num">数量:{{ detail.goodsNum || 0 }};</text>
				</view>
				<view class="order-goods x-f ">
					<text class="order-price">￥{{ detail.price || 0 }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import conf from '../../conf/config.js';
export default {
	name: 'vcGoodCard',
	components: {},
	data() {
		return {
			baseUrl:conf.baseUrl
		};
	},
	props: {
		detail: {},
		sku: {},
	},
	computed: {},
	created() {},
	methods: {
		// 路由跳转
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		}
	}
};
</script>

<style lang="scss">
.goods-box {
	position: relative;
	.goods-img {
		height: 180rpx;
		width: 180rpx;
		background-color: #ccc;
		margin-right: 25rpx;
	}
	.order-goods__tag {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 3;
		width: 60rpx;
		height: 30rpx;
	}
	.goods-title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		width: 450rpx;
		line-height: 40rpx;
		margin-bottom: 10rpx;
	}

	.size-tip {
		line-height: 40rpx;
		// background: #f4f4f4;
		// padding: 0 16rpx;
		font-size: 24rpx;
		color: #666;
	}
	.sub-tip {
		width: 480rpx;
		line-height: 40rpx;
		// background: #F6F2EA;
		font-size: 24rpx;
		color: #a8700d;
		margin: 10rpx 0;
	}

	.price {
		color: #e1212b;
	}
}
// order
.goods-box {
	.order-right {
		height: 180rpx;
	}
	.order-tip {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		width: 450rpx;
			margin-bottom: 20rpx;
		.order-num {
			margin-right: 10rpx;
		}
	}

	.order-goods {
		width: 480rpx;
	
		.status-btn {
			background: none;
			height: 32rpx;
			border: 1rpx solid rgba(207, 169, 114, 1);
			border-radius: 15rpx;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(168, 112, 13, 1);
			padding: 0 10rpx;
			margin-left: 20rpx;
			background:rgba(233,183,102,0.16);
		}
		.order-price {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
		}
	}
}
</style>