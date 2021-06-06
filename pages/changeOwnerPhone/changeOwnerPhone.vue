<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">手机号</view>
				<input placeholder="请输入手机号" type="number" disabled="disabled" name="input" v-model="phone"></input>
				<button  class="cu-btn bg-green" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">获取手机号</button>
				
			</view>
		</form>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green lg" @tap="_doChangePhoto()">提交</button>
		</view>
		
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;
	export default {
		data() {
			return {
				phone:''
			}
		},
		onLoad() {
			
			let _that = this;
			uni.login({
				success: (res) => {
					console.log("login", res);
					_that.wxLogin(res.code);
				}
			})
		},
		methods: {
			wxLogin: function(_code) {
				let _that = this;
				let _appId = '';
				// #ifdef MP-WEIXIN
				let accountInfo = uni.getAccountInfoSync();
				_appId = accountInfo.miniProgram.appId;
				// #endif
				wx.request({
					url: constant.url.loginUrl,
					method: 'post',
					header: context.getHeaders(),
					data: {
						code: _code,
						// 用户非敏感信息
						signature: '',
						// 签名
						encryptedData: '',
						// 用户敏感信息
						iv: '', // 解密算法的向量
						appId: _appId,
						userInfo:{}
			
					},
					success: function(res) {
						let sessionKey = res.data.sessionKey;
						_that.sessionKey = sessionKey;
						_that.openId = res.data.openId;
					},
					fail: function(error) {
						// 调用服务端登录接口失败
						let sessionKey = res.data.sessionKey;
						_that.sessionKey = sessionKey;
						_that.openId = res.data.openId;
						
					}
				});
			},
			onGetPhoneNumber(e) {
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					wx.showToast({
						title: '手机号码未授权，请授权后再使用',
						icon: "none"
					});
					return;
				}
				let _that = this;
				wx.request({
					url: constant.url.getWxPhoto,
					method: 'post',
					header: context.getHeaders(),
					data: {
						iv: e.detail.iv,
						// 用户非敏感信息
						key: _that.sessionKey,
						// 签名
						decryptData: e.detail.encryptedData,
					},
					success: function(res) {
						let _json = res.data;
						console.log('日志',_json)
						if(_json.code == 0){
							_that.phone = _json.data.phoneNumber;
						}
					},
					fail: function(error) {}
				});
			},
			_doChangePhoto:function(){
				
				if(this.phone == ''){
					uni.showToast({
						icon:'none',
						title:'手机号不能为空'
					});
					return;
				}
				
				const userInfo = uni.getStorageSync(constant.mapping.OWNER_INFO);
				let _userInfo = {
					memberId: userInfo.memberId,
					link: this.phone,
					communityId:userInfo.communityId,
					userId:userInfo.userId
				};
				context.request({
					url: constant.url.changeOwnerPhone,
					header: context.getHeaders(),
					method: "POST",
					data: _userInfo,
					success: function(res) {
						let _json = res.data
						if(_json.code != 0){
							uni.showToast({
								icon:"none",
								title: _json.msg
							});
							return ;
						}	
						uni.navigateBack({
							delta:1
						});
					},
					fail: function(error) {
						// 调用服务端登录接口失败
						uni.showToast({
							title: '调用接口失败'
						});
						console.log(error);
					}
				});	
			}	
		}
	}
</script>

<style>

</style>