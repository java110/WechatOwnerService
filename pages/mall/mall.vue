<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" v-model="communityName" type="text" placeholder="请输入商品名" confirm-type="search"></input>
			</view>
		</view>
		<vc-category></vc-category>
		
	</view>
</template>

<script>
	
	import vcCategory from '@/components/vc-category/vc-category.vue'
	
	export default {
		data() {
			return {
				
			}
		},
		components:{
			vcCategory
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
