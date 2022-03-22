<template>
	<!--  @scrolltolower="lower" -->
	<scroll-view class="scroll-restaurants-list " scroll-y="true" style="height:300upx">
		<swiper class=" padding-top-xs margin-top-sm bg-white c-radius" style="height: 280upx;" indicator-dots="true" indicator-color="rgba(228,228,228,1)"
		 indicator-active-color="#FECA49">
			<block v-for="(item, index) in categoryList" :key="index">
				<swiper-item class="margin-top-sm">
					<block v-for="(item, index2) in item" :key="index2">
						<view class="category-info">
							<navigator @tap="_urlJump(item)">
								<image :src="item.hktIcon" class="category-image"></image>
								<view class="category-text">{{item.hktName}}</view>
							</navigator>
						</view>
					</block>
				</swiper-item>
			</block>
		</swiper>
	</scroll-view>
</template>

<script>

	export default {
	  // 组件传参菜单数据
    props: ['categoryList'],
		data() {
			return {
			}
		},
		mounted() {
		},
		methods: {
			_urlJump: function(_menu){
				this.vc.navigateToMall({
					url: _menu.url
				})
			},
			callUndefined:function(){
				uni.showToast({
					icon:'none',
					title:'此功能暂不开放'
				})
			},
		}
	}
</script>

<style>

	.category-image {
		width: 60rpx;
		height: 60rpx;
	}

	.category-text {
		font-size: 25rpx;
		width: 100%;
	}

	.category-info {
		display: inline-block;
		text-align: center;
		position: relative;
		height: 120rpx;
		width: 25%;
	}
	.c-radius{
		border-radius: 15upx;
	}
</style>
