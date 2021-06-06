<template>
	<view>
		<view class=" text-center margin-top-100">
			<view class="">
				<text class=" cuIcon-warnfill light text-orange no-data-icon"></text>
			</view>
			<view class="">
				<text class="text-gray">当前没有数据</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: 'NoDataPage',
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.no-data-icon{
		font-size: 200upx;
	}
	.margin-top-100{
		margin-top: 200upx;
		
	}

</style>
