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
		getOpenIdFromAliPay,
		getWechatMiniOpenId,
		getCommunityWechatAppId
	} from '../../api/user/userApi.js';
	import {
		isWxOrAli
	} from '../../lib/java110/utils/EnvUtil.js';
	
	import {
		cashierPayFee
	} from '../../api/fee/feeApi.js';

	export default {
		data() {
			return {
				communityId: '',
				money: 0.0,
				business: '',
				openId: '',
				appId:'',
				data: {},
				appId:'',
				cashierUserId:'',
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
			this.cashierUserId = options.cashierUserId;

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
				this._refreshWechatMiniOpenId();
				// #endif
			}

			this.money = options.money;
			this.business = options.business;
			this.data = uni.getStorageSync('doing_cashier');
			this._loadAppId();
		},
		methods: {
			_loadAppId:function(){
				let _objType = "1100"; // todo public
				// #ifdef MP-WEIXIN
				_objType = "1000";
				// #endif
				
				let _that = this;
				getCommunityWechatAppId({
					communityId:this.communityId,
					objType:_objType
				}).then(_data =>{
					_that.appId = _data.data;
				})
			},
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
				let _that =this;
				wx.login({
					success: function(loginRes) {
						if (!loginRes.code) {
							return;
						}
						let accountInfo = uni.getAccountInfoSync();
						let appId = accountInfo.miniProgram.appId;
							getWechatMiniOpenId({
								code:loginRes.code,
								appId:appId,
							}).then(_data =>{
								if(_data.code != 0){
									uni.showToast({
										icon:'none',
										title:_data.msg
									})
									return;
								}
								_that.openId = _data.data;
							})
						
					},
					fail: function(error) {
						// 调用 wx.login 接口失败
						console.log('调用wx.login获取code失败');
						console.log(error);
					}
				});
			},
			_submit: function() {
				if(!this.appId){
					uni.showToast({
						icon:'none',
						title:'小区未配置支付信息'
					});
					return;
				}
				let _data = this.data;
				_data.business = this.business;
				_data.tradeType = 'JSAPI';
				_data.appId = this.appId;
				_data.cashierUserId = this.cashierUserId;
				_data.openId = this.openId;
				cashierPayFee(this,_data)
			},
			

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
