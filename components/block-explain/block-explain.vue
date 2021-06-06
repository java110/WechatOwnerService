<template>
	<view>
		<view class="box">
			<view class="title text-df text-grey">优惠及违约说明</view>
			<view class="sub-title text-df">·优惠</view>
			<view class="con text-sm">1.折扣： <text class="detail text-grey">优惠费用 = 金额 * 周期 * 折扣率。</text></view>
			<view class="con text-sm">2.减免： <text class="detail text-grey">优惠费用按照减免规则计算。</text></view>
			<view class="sub-title text-df">·违约</view>
			<view class="con text-sm">1.按日收取滞纳金： <text class="detail text-grey">需支付滞纳金额 = 每日金额 * 违约天数 * 滞纳金收取费率。</text></view>
			<view class="con text-sm">2.按月收取滞纳金： <text class="detail text-grey">需支付滞纳金额 = 每月金额 * 违约月数 * 滞纳金收取费率。</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.box{
	margin: 20upx;
}
.title{
	
}
.sub-title{
	
}
.con{
	text-indent: 2rem;
}
.detail{
	
}
</style>
