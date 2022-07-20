<template>
	<view>
		<view class="live_list">
			<view class="title">生活服务</view>
			<view class="list">
				<view class="item" v-for="(item,index) in live_list" :key="index" @tap="to(item)">
					<image :src="item.hktIcon"></image>
					<view class="text">{{item.hktName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		hasOwner
	} from '@/api/owner/ownerApi.js';
	
	import param from "@/constant/param.js"
	import {
		getHousekeepingTypeList
	} from "@/api/homemaking/homemakingApi.js"
	export default {
		name:"serviceHomemaking",
		data() {
			return {
				live_list: [],
				categoryType: param.CATEGORY_TYPE.HOMEMAKING,
				openType: "2,3",
			};
		},
		created() {
			this._getCategoryList();
		},
		methods:{
			to:function(v) {
				 if (v.href != 'undefined') {
					this.vc.navigateToMall({
						url:"/pages/homemaking/categoryServ?hktId="+v.hktId
					},true)
				} else {
					uni.showToast({
						icon: 'none',
						title: '此功能暂不开放'
					})
				}
			},
			_getCategoryList() {
				let _that = this
				let params = {
					page: 1,
					row: 100,
					isShow: "Y",
					shopId: param.SHOP_ID_GLOBAL,
					typeCd: param.MENU_TYPE.HOMEMAKING
				}
				getHousekeepingTypeList(params)
					.then(function(result) {
						let categoryData = result.data;
						_that.live_list = categoryData;
						console.log(_that.live_list)
					})
			},
		}
	}
</script>


<style lang="less">
	.real_list,
	.live_list {
		background: #fff;
		padding: 0 40upx;
		margin-top: 20upx;

		.title {
			line-height: 32upx;
			background: #fff;
			font-size: 30upx;
			font-weight: 600;
			color: #333;
			padding: 40upx 0;
			margin-top: 10px;
		}

		.item {
			width: 25%;
			display: inline-block;
			text-align: center;
			margin-bottom: 40upx;
		}

		image {
			height: 44upx;
			width: 44upx;
			margin-bottom: 10upx;
		}

		.text {
			color: #333;
			font-size: 28upx;
		}
	}
</style>