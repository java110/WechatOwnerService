<template>
	<view>
		<swiper class="ad-swiper bg-white" indicator-dots="true" indicator-color="rgba(228,228,228,1)"
		 indicator-active-color="#FECA49" autoplay="true" interval="5000" duration="1000" circular="true">
			<block v-for="(item, index) in rentingPhotos" :key="index">
				<swiper-item>
					<image :src="item.url"></image>
				</swiper-item>
			</block>
		</swiper>
		
		<view class="flex justify-between padding  bg-white border-bottom">
			<view class="renting-title">
				<view>
					<text class="text-lx">保安公园豪华大单间</text>
				</view>
				<view>
					<text class="text-xs">押二付一</text>
				</view>
			</view>
			<view>
				<text class="text-lx text-red">2000元/月</text>
			</view>
		</view>
		
		<view class="flex justify-between padding-xl bg-white">
			<view class="text-center">
				<view>
					<text>一室一厅</text>
				</view>
				<view>
					<text class="text-xs">户型</text>
				</view>
			</view>
			<view class="text-center">
				<view>
					<text>25平方米</text>
				</view>
				<view>
					<text class="text-xs">面积</text>
				</view>
			</view>
			<view class="text-center">
				<view>
					<text>1层</text>
				</view>
				<view>
					<text class="text-xs">楼层</text>
				</view>
			</view>
			<view class="text-center">
				<view>
					<text>有</text>
				</view>
				<view>
					<text class="text-xs">电梯</text>
				</view>
			</view>
			
		</view>
		<view class="flex justify-between margin-top-sm bg-white padding border-bottom">
			<view>
				<text>租房方式：</text>
				<text>整租</text>
			</view>
			<view>
				<text>入驻日期：</text>
				<text>立即入驻</text>
			</view>
		</view>
		<view class="flex justify-between bg-white padding">
			<view>
				<text>出租小区：</text>
				<text>格兰小镇</text>
			</view>
		</view>
		
		<view class="bg-white padding margin-top">
			<view>
				<text>房源描述</text>
			</view>
			<view>
				<text class="text-xs">
					全新装修，品牌家电，智能操控，拎包入住，可停车，安静。
				</text>
			</view>
		</view>
		<view class=" bg-white  border flex justify-end" style="position: fixed;width: 100%;height:100upx;bottom: 0;">
		
			<view class="action text-orange margin-right flex align-center">
				<text>推荐预约看房</text>
			</view>
			<view class="flex btn-group align-center">
				<button class="cu-btn bg-orange shadow-blur lgplus sharp margin-right" @click="onPayFee()">电话咨询</button>
				<button class="cu-btn bg-blue shadow-blur lgplus sharp margin-right" @click="_payWxApp()">预约看房</button>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	import url from '../../constant/url.js';
	const constant = context.constant;
	const factory = context.factory;

	export default {
		data() {
			return {
				rentingPhotos:[]
			};
		},
		onLoad() {
			this.loadRentHouse();
		},
		
		methods: {
			
		}
	}
</script>

<style>
	
</style>
