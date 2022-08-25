<template>
	<view>
		<service-property></service-property>
		<!-- #ifdef H5 || WUYE -->
		<service-homemaking></service-homemaking>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		hasOwner
	} from '../../api/owner/ownerApi.js'
	import serviceProperty from '@/components/service/service-property.vue'
	import serviceHomemaking from '@/components/service/service-homemaking.vue'
	import param from "../../constant/param.js"
	import {
		getHousekeepingTypeList
	} from "../../api/homemaking/homemakingApi.js"
	import {
		sliceArray
	} from '../../lib/java110/utils/ArrayUtil.js'
	import mapping from '../../constant/MappingConstant.js'
	import {
		getCommunityId,
		getMallCommunityId,
		getMallCommunityName
	} from '../../api/community/communityApi.js';
	export default {
		data() {
			return {
				// 专区目录类型
				selectCommunityName: "",
				
			}
		},
		components: {
			serviceProperty,
			serviceHomemaking
		},
		onLoad(options) {
			this.vc.onLoad(options)
		},
		onShow: function() {
		},
		methods: {
		
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
