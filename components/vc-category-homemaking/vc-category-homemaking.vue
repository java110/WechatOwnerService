<template>
	<scroll-view @scrolltolower="lower" class="scroll-restaurants-list " scroll-y="true" style="height:100%">
		<swiper class=" padding-top-xs padding-bottom-xs margin-top-sm bg-white c-radius" indicator-dots="true" indicator-color="rgba(228,228,228,1)"
		 indicator-active-color="#FECA49">
			<block v-for="(cates, index) in categoryList" :key="index">
				<swiper-item class="margin-top-sm">
					<block v-for="(item, index2) in cates" :key="index2">
						<view class="category-info" v-if="item.href != 'undefined'">
							<navigator @tap="toPage(item)">
								<image :src="item.hktIcon" class="category-image"></image>
								<view class="category-text">{{item.hktName}}</view>
							</navigator>
						</view>
						<view class="category-info" v-else>
							<view @tap="callUndefined()">
								<image :src="item.hktIcon" class="category-image"></image>
								<view class="category-text">{{item.hktName}}</view>
							</view>
						</view>
					</block>
				</swiper-item>
			</block>
		</swiper>
	</scroll-view>
</template>

<script>
  import {sliceArray} from '../../utils/ArrayUtil.js'

	export default {
	  // 组件传参菜单数据
    props: ['categoryList'],
		data() {
			return {
        list: []
			}
		},
		mounted() {
		},
    onLoad() {
    },
    onShow() {

    },
		methods: {
			toPage: function(item) {
				this.vc.navigateToMall({
					url:"/pages/homemaking/categoryServ?hktId="+item.hktId
				},true)
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
	.categoryList {
		width: 100%;
		height: 360upx;
		border-bottom: 20rpx solid #f4f4f4;
	}

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
</style>
