<template>
	<view>
		<view class="padding-xl margin-top">
			<canvas style="width: 520upx;height: 520upx;  margin: 0 auto;" canvas-id="goodsQrcode"></canvas>
		</view>
			
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-blue margin-tb-sm lg" @tap="_closeModal()">关闭</button>
		</view>
	</view>
</template>

<script>
	const qrCode = require('@/lib/weapp-qrcode.js');
	export default {
		data() {
			return {
				qrCode:'no data',
				remark:''
			}
		},
		onLoad(options) {
			this.qrCode = options.timeId;
			let _that = this;
			setTimeout(function(){
				_that._initQrCode();
			},1500);
			
		},
		methods: {

			_initQrCode:function(){
				console.log('this.qrCode',this.qrCode)
				new qrCode('goodsQrcode', {
					text: this.qrCode,
					width: 220,
					height: 220,
					colorDark: "#333333",
					colorLight: "#FFFFFF",
					correctLevel: qrCode.CorrectLevel.L
				})
			},
			_closeModal:function(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>

</style>
