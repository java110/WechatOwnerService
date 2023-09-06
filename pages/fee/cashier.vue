<template>
	<view>
		
		<view class="bg-white money-info">
			<view class="money-title">订单金额</view>
			<view class="money-title">{{money}}</view>
		</view>
		
		<view class="cu-bar btn-group" style="margin-top: 30px;">
			<button @click="_submit" class="cu-btn bg-blue shadow-blur round lg">确认支付</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:0.0,
				business:'',
				data:{}
			}
		},
		onLoad(options) {
			this.money = options.money;
			this.business = options.business;
			this.data = uni.getStorageSync('doing_cashier');
		},
		methods: {
			
			_submit:function(){
				
			}
			
		}
	}
</script>

<style lang="scss">
	.money-info{
		height: 200upx;
		margin:20upx
	}
</style>
