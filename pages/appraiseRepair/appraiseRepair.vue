<template>
	<view>
		<view class="content">
			<my-issue key="1" :score="3" textareaPlaceholder="请评价本地服务" headTitleValue="服务分数"/>
		</view>
	</view>
</template>

<script>
	 import myIssue from '@/components/myIssue.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components:{myIssue},
		methods: {
			
		}
	}
</script>

<style>
.content{
		height: 100%;
	}
</style>
