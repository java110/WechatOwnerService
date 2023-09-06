<template>
	<view>

		<view class="bg-white money-info text-center">
			<view class="money-black"></view>
			<view class="money-title">订单金额</view>
			<view class="money-value">{{money}}</view>
		</view>

		<view class="cu-bar btn-group" style="margin-top: 30px;">
			<button @click="_submit" class="cu-btn bg-blue shadow-blur round lg">确认支付</button>
		</view>

	</view>
</template>

<script>
	import {
		isNotNull
	} from '../../lib/java110/utils/StringUtil.js';
	import {
		refreshUserOpenId,
		getOpenIdFromAliPay
	} from '../../api/user/userApi.js';
	import {
		isWxOrAli
	} from '../../lib/java110/utils/EnvUtil.js';

	export default {
		data() {
			return {
				communityId: '',
				money: 0.0,
				business: '',
				openId: '',
				data: {}
			}
		},
		mounted() {
			// #ifdef H5
			if (isWxOrAli() == "ALIPAY") {
				const oScript = document.createElement('script');
				oScript.type = 'text/javascript';
				oScript.src = 'https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js';
				document.body.appendChild(oScript);
			}
			// #endif
		},
		onLoad(options) {
			this.openId = options.openId;
			this.communityId = options.communityId;

			if (!isNotNull(this.openId)) {
				//刷新 openId
				// #ifdef H5
				if (isWxOrAli() == 'ALIPAY') {
					this._refreshAliPayOpenId();
					return;
				}
				//todo h5 情况
				this._refreshWechatOpenId();
				return;
				// #endif

				// #ifdef MP-WEIXIN
				this.openId = this._refreshWechatMiniOpenId();
				// #endif
			}

			this.money = options.money;
			this.business = options.business;
			this.data = uni.getStorageSync('doing_cashier');
		},
		methods: {
			_refreshWechatOpenId: function() {
				let _redirectUrl = window.location.href;
				refreshUserOpenId({
					redirectUrl: _redirectUrl,
					communityId: this.communityId,
				}).then(_data => {
					console.log(_data, 123)
					if (_data.code == 0) {
						window.location.href = _data.data.openUrl;
						return;
					}
				});
			},
			_refreshWechatMiniOpenId:function(){
				
			},
			_submit: function() {

			}

		}
	}
</script>

<style lang="scss">
	.money-info {
		height: 400upx;
		margin: 20upx;

		.money-black {
			height: 120upx;
		}

		.money-title {
			font-size: 32upx;
		}

		.money-value {
			color: #e54d42;
			margin-top: 20upx;
			font-size: 64upx;
		}
	}
</style>
