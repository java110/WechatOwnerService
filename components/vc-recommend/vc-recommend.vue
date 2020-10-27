<template>
	<view class="margin-top-sm">
		<view class="text-center">
			<text class="recommend-title">为你推荐</text>
		</view>

		<view class="grid margin-bottom text-center col-2">
			<view class="padding-lr-xs margin-top-xs " v-for="(item,indexs) in 4" :key="indexs">
				<view class="padding bg-white goods">
					<view>
						<image class="goods-image" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603787011106&di=b9c14428500a1ffa46ea52ba1c07702f&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201110%2F20%2F104212ds59m9rtqspt6tzt.jpg"></image>
					</view>
					<view class="margin-top-sm text-left">
						<text>迪奥修护精华水迪奥修护精华水</text>
					</view>
					<view class="flex justify-between margin-top-xs">
						<view>
							<text class="text-red">￥86.5</text>
						</view>
						<view>
							<text class="text-gray">销量100件</text>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.recommend-title{
		font-size: 36upx;
		font-weight: 600;
	}
	.goods {
		border-radius: 20upx;
	}

	.goods-image {
		height: 280upx;
	}
</style>
