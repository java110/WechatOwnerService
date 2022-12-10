<!--服务详情-->
<template>
	<view class="">
		<view  >
			<image :src="servInfo.imgUrl?servInfo.imgUrl:noPic"></image>
		</view>

		<view class="introduce-section">
			<view class="price-box">
				<text class="price">{{servInfo.price}}</text>
				<text class="price-m">元起</text>
			</view>
			<text class="title margin-top-sm">{{servInfo.goodsName}}</text>

			<view class="intro">
				{{servInfo.goodsDesc}}
			</view>
		</view>
	
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="servInfo.content"></rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom ">
			<!-- <view class="p-b-btn" @click="toTel">
				<text class="yticon cuIcon-phone"></text>
				<text>咨询</text>
			</view> -->
			<view class="action-btn-group">
				<button type="primary" class="action-btn no-border add-cart-btn" @click="toOrder">预约下单</button>
			</view>
		</view>
		
			<reserve-service-now ref="reserveServiceNowRef"></reserve-service-now>
	</view>
</template>

<script>
	import {getCatalogGoodss} from '@/api/community/reserveApi.js';
	import {getCommunityId} from '@/api/community/communityApi.js';
		import reserveServiceNow from '@/components/reserve/reserve-service-now.vue'
	export default {
		components:{
			reserveServiceNow
		},
		data() {
			return {
				goodsId: '',
				servInfo: {},
				commentList: {},
				commentTotal: 0,
				emptyData: {
					img: '/static/imgs/empty/comment_empty.png',
					tip: '暂无评价~'
				},
				noPic: '',
			};
		},
	  onLoad(options) {
		 this.noPic = this.imgUrl + '/h5/images/noPic.png'
			this.goodsId = options.goodsId
			this.loadCatalogGoods();
			
		},
		methods: {
			// 轮播图切换
			loadCatalogGoods:function(){
				let _that = this;
				getCatalogGoodss({
					page:1,
					row:1,
					type:'2002',
					communityId:getCommunityId(),
					goodsId:this.goodsId
				}).then(_data=>{
					_that.servInfo = _data[0];
				})
			},
			toOrder() {
				this.$refs.reserveServiceNowRef.reserveGoods(this.servInfo)
			},
			toTel: function() {
				let _that = this;
				uni.makePhoneCall({
					// 手机号
					phoneNumber: _that.shop.returnLink,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			}
		},

	}
</script>

<style lang='scss'>
	
	/* 主要颜色 */
	$base: #fe3b0f; // 基础颜色
	$assist-clor: #ff4e17; // 辅助颜色
	$change-clor: #fc603a; // 渐变色
	$floor-clor : #fafafa; // 底部颜色
	$price-clor : #FF0000; // 价格颜色
	$rgba-01 : rgba(233,59,61,0.1); // 基础色透明度0.1
	$rgba-02 : rgba(233,59,61,0.2); // 基础色透明度0.2
	$rgba-03 : rgba(233,59,61,0.3); // 基础色透明度0.3
	$rgba-04 : rgba(233,59,61,0.4); // 基础色透明度0.4
	$rgba-05 : rgba(233,59,61,0.5); // 基础色透明度0.5
	$rgba-06 : rgba(233,59,61,0.6); // 基础色透明度0.6
	$rgba-07 : rgba(233,59,61,0.7); // 基础色透明度0.7
	$rgba-08 : rgba(233,59,61,0.8); // 基础色透明度0.8
	
	/* 行为相关颜色 */
	$uni-color-primary: #007aff;
	$uni-color-success: #4cd964;
	$uni-color-warning: #f0ad4e;
	$uni-color-error: #dd524d;
	
	/* 文字基本颜色 */
	$uni-text-color:#333;//基本色
	$uni-text-color-inverse:#fff;//反色
	$uni-text-color-grey:#999;//辅助灰色，如加载更多的提示信息
	$uni-text-color-placeholder: #808080;
	$uni-text-color-disable:#c0c0c0;
	
	/* 背景颜色 */
	$uni-bg-color:#ffffff;
	$uni-bg-color-grey:#f8f8f8;
	$uni-bg-color-hover:#f1f1f1;//点击状态颜色
	$uni-bg-color-mask:rgba(0, 0, 0, 0.4);//遮罩颜色
	
	/* 边框颜色 */
	$uni-border-color:white;
	
	/* 尺寸变量 */
	
	/* 文字尺寸 */
	$uni-font-size-sm:24rpx;
	$uni-font-size-base:28rpx;
	$uni-font-size-lg:32rpx;
	
	/* 图片尺寸 */
	$uni-img-size-sm:40rpx;
	$uni-img-size-base:52rpx;
	$uni-img-size-lg:80rpx;
	
	/* Border Radius */
	$uni-border-radius-sm: 4rpx;
	$uni-border-radius-base: 6rpx;
	$uni-border-radius-lg: 12rpx;
	$uni-border-radius-circle: 50%;
	
	/* 水平间距 */
	$uni-spacing-row-sm: 10px;
	$uni-spacing-row-base: 20rpx;
	$uni-spacing-row-lg: 30rpx;
	
	/* 垂直间距 */
	$uni-spacing-col-sm: 8rpx;
	$uni-spacing-col-base: 16rpx;
	$uni-spacing-col-lg: 24rpx;
	
	/* 透明度 */
	$uni-opacity-disabled: 0.3; // 组件禁用态的透明度
	
	/* 文章场景相关 */
	$uni-color-title: #2C405A; // 文章标题颜色
	$uni-font-size-title:40rpx;
	$uni-color-subtitle: #555555; // 二级标题颜色
	$uni-font-size-subtitle:36rpx;
	$uni-color-paragraph: #3F536E; // 文章段落颜色
	$uni-font-size-paragraph:30rpx;
	
	
	/* 页面左右间距 */
	$page-row-spacing: 30upx;
	$page-color-base: #f8f8f8;
	$page-color-light: #f8f6fc;
	$base-color: #fa436a;
	
	/* 文字尺寸 */
	$font-sm: 24upx;
	$font-base: 28upx;
	$font-lg: 32upx;
	/*文字颜色*/
	$font-color-dark: #303133;
	$font-color-base: #606266;
	$font-color-light: #909399;
	$font-color-disabled: #C0C4CC;
	$font-color-spec: #4399fc;
	/* 边框颜色 */
	$border-color-dark: #DCDFE6;
	$border-color-base: #E4E7ED;
	$border-color-light: #EBEEF5;
	/* 图片加载中颜色 */
	$image-bg-color: #eee;
	/* 行为相关颜色 */
	$uni-color-primary:#fa436a;
	$uni-color-success: #4cd964;
	$uni-color-warning: #f0ad4e;
	$uni-color-error: #dd524d;
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.carousel {
		height: 520upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.swiper-dot-page {
			display: flex;
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			line-height: 44rpx;
			border-radius: 22rpx;
			padding: 0 15rpx;
			background: rgba(#333, 0.3);
			font-size: 28rpx;
			color: rgba(#fff, 0.9);
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}

		.price-box {
			display: flex;
			position: relative;
			align-items: baseline;
			
		
			font-size: 26upx;
			color: $uni-color-primary;
			
		}
		.to-shop{
			text-align: center;
			min-width: 80upx;
			font-size: 12px;
			color: #909399;
		}
		.price {
			font-size: 55upx;
		}

		.price-m {
			font-size: 26upx;
			color: $base-color;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.sales-tip {
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: $font-sm;
			color: $font-color-light;
		}

		.intro {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	/* 标签 */
	.tag-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		background: linear-gradient(left, #f9f1f1, #ebf4fb);
		padding: 15upx 30upx;

		.tag-icon {
			display: flex;
			align-items: center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position: relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;

			&:after {
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position: absolute;
				background: $uni-color-primary;
			}
		}

		.icon-xingxing {
			position: relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}

		.tit {
			font-size: $font-base;
			margin-left: 10upx;
		}

		.icon-bangzhu1 {
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}

		.tag-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}

		.icon-you {
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;

			.name-block {
				position: relative;

				.name-icon {
					position: absolute;
				}
			}

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	/* 收费标准 */
	.fee-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.fee-header {
			.title {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
				margin-top: 10upx;
			}

			.location {
				font-size: $font-sm + 2upx;
			}
		}

		.fee-intro {
			font-size: $font-sm + 2upx;
		}

		.fee-content {
			.uni-collapse-cell__content {
				border-top: solid white;
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;
		padding: 10upx 30upx;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			.yticon {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .yticon {
				color: $uni-color-primary;
			}
		}

		.cart-btn {
			position: relative;

			.cart-num {
				position: absolute;
				right: 5rpx;
				top: 2rpx;
			}
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #F56C6C);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, .5);
			}

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
</style>
