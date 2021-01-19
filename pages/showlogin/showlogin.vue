<template>
	<view class="">
		<view class="user-container">
			<view class="userinfo">
				<block>
					<view>
						<image class="cu-avatar xl round" :src="img" mode="widthFix"></image>
					</view>
					<view class="userinfo-nickname text-center margin-top">
						<text>非常抱歉此功能需登录后才能体验</text>
					</view>
				</block>

			</view>

		</view>

		<view class="cu-bar btn-group" style="margin-top: 30px;">
			<button @click="navToLogin" class="cu-btn bg-green shadow-blur round lg">我要登录</button>

		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	export default {
		data() {
			return {
				img: "/static/images/sad1.png",
				code: ''
			}
		},
		onLoad: function(options) {
			// #ifdef H5
			if (options.code) {
				this.code = options.code;
			}
			// #endif
		},
		methods: {
			navigateBack: function() {
				uni.navigateBack()
			},
			navToLogin: function() {
				let _url = '/pages/login/login';
				if (this.code != '' && this.code != undefined) {
					_url += ("?code=" + this.code)
				}
				this.vc.navigateTo({
					url: _url
				});
			}
		}
	}
</script>

<style>
	/**index.wxss**/
	.user-container {
		padding: 50rpx 0;
		padding-top: 30%;
		/*border: 1px solid black;*/
	}

	.userinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.userinfo-avatar {
		display: block;
		overflow: hidden;
		border-radius: 50%;
		width: 200rpx;
		height: 200rpx;
	}

	.userinfo-nickname {
		color: #aaa;
		margin-top: 50px;
	}
</style>
