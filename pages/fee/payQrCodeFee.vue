<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" v-if="config.preFee == 'ON'">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="tabSelect(0)">
					综合缴费
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="tabSelect(1)">
					房屋缴费
				</view>
			</view>
		</scroll-view>
		
		<view v-show="active == 0" class="margin-top">
			<qr-code-owe-fee ref="qrCodeOweFeeRef" ></qr-code-owe-fee>
		</view>
		
	</view>
</template>

<script>
	import {
		getPayFeeQrcode,
	} from '@/api/fee/qrCodePayFee.js';
	import qrCodeOweFee from '@/components/fee/qrcode-owe-fee.vue';
	export default {
		data() {
			return {
				ownerId:'',
				roomId:'',
				communityId:'',
				pfqId:'',
				active:0,
				config:{
					content: "",
					createStaffId: "",
					createStaffName: "",
					customFee: "",
					preFee: "",
					qrcodeName: "支付二维码",
					queryWay: "1001",
					smsValidate: "ON"
				}
				
			}
		},
		components:{
			qrCodeOweFee
		},
		onLoad(options) {
			this.ownerId = options.ownerId;
			this.roomId = options.roomId;
			this.pfqId = options.pfqId;
			this.communityId = options.communityId;
			this._loadConfig();
		},
		methods: {
			_loadConfig:function(){
				let _that = this;
				getPayFeeQrcode(this,{
					communityId:this.communityId,
					pfqId:this.pfqId
				}).then((_data)=>{
					_that.config = _data;
					_that.tabSelect(0);
				})
			},
			tabSelect:function(_active){
				this.active = _active;
				if(this.active == 0){
					this.$refs.qrCodeOweFeeRef._loadFees({
						ownerId:this.ownerId,
						roomId:this.roomId,
						communityId:this.communityId,
						customFee:this.config.customFee,
						createStaffId:this.config.createStaffId,
						feeType:this.config.feeType
					});
					return;
				}
			}
		}
	}
</script>

<style>

</style>
