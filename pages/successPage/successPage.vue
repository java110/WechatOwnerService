<template>
	<view>
		<view class="bg-white success-msg">
			<view class="  ">
				<view class=" padding flex align-center">
					<view class="flex-sub text-center">
						<view class="text-xsl">
							<text class="cuIcon-roundcheckfill text-green"></text>
						</view>
						<view class=" text-msg">{{msg}}</view>
					</view>
				</view>
			</view>


			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-green lg" @click="_indexPage()">返回首页</button>
			</view>
		</view>

		<view class="home_wrap">
			<success-ads :objType="objType"></success-ads>
		</view>
		<view class="home_wrap">
			<success-goods :objType="objType"></success-goods>
		</view>


	</view>
</template>

<script>
	import successAds from '@/components/success/success-ads.vue';
	import successGoods from '@/components/success/success-goods.vue';
	export default {
		data() {
			return {
				msg: '处理成功',
				objType:'3003',
				imgs: [],
				goods: []
			}
		},
		onLoad(options) {
			this.msg = options.msg;
			this.objType = options.objType;
		},
		components: {
			successAds,
			successGoods
		},
		methods: {
			_indexPage:function(){
				uni.switchTab({
					url: "/pages/index/index?wAppId=" + this.vc.getWAppId()
				});
			}
		}
	}
</script>

<style>
	.success-msg {
		padding-top: 100upx;
		padding-bottom: 50upx;
	}

	.text-xsl {
		font-size: 180upx;
		line-height: 1.2;
	}

	.text-msg {
		font-size: 40upx;
	}

	.home_wrap {
		padding: 20upx 20upx 0;
	}
</style>
