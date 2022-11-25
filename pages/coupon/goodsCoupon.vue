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
	import {generatorCouponQrcode} from '@/api/fee/feeApi.js'
	export default {
		data() {
			return {
				qrCode:'no data',
				couponId:'',
				remark:''
			}
		},
		onLoad(options) {
			this.couponId = options.couponId;
			
			this._generatorCouponQrcode();
		},
		methods: {
			_generatorCouponQrcode:function(){
				let _that = this;
				generatorCouponQrcode({
					couponId:this.couponId
				}).then(_data=>{
					if(_data.code  != 0){
						uni.showToast({
							icon:'none',
							title:_data.msg
						})
						return ;
					}
					_that.qrCode = _data.data.qrCode;
					_that.remark = _data.data.remark;
					this._initQrCode();
				})
			},
			_initQrCode:function(){
				new qrCode('goodsQrcode', {
					text: this.qrCode,
					width: 250,
					height: 250,
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
