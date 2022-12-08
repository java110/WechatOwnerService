<template>
	<view>
		<view class="user-container bg-white my_user">
			<view class="userinfo" :style="{background: 'url('+topImg+') no-repeat center center'}" >
				<view class="wait" v-if="login">
					<view class="cu-avatar header-img round " :style="{ backgroundImage: 'url(' + headerImg + ')' }">
					</view>
					<view class="userinfo-nickname margin-top">
						<text class="username">{{ userName }}</text>
						<text class="userphone">{{ userPhone }}</text>
						<text class="userarea" @tap="_changeCommunity()">{{ communityName }} <text class="cuIcon-settings text-white margin-left-sm"></text></text>
						
					</view>
				</view>
				<view class="wait" v-else @tap="showLongModel">
					<!-- #ifdef MP-WEIXIN -->
					<view class="userinfo-avatar">
						<open-data type="userAvatarUrl" lang="zh_CN" />
					</view>
					<!-- #endif -->
					<!-- #ifdef H5 || APP-PLUS -->
					<view class="cu-avatar header-img round " :style="{ backgroundImage: 'url(' + headerImg + ')' }">
					</view>
					<!-- #endif -->
					<view class="userinfo-nickname margin-top">
						<text>请登录</text>
					</view>
				</view>
			</view>
			<view class="money_box">
				<view class="money_item" @click="myAccount()">
					<view class="num">￥{{blance}}</view>
					<view class="name">余额</view>
				</view>
				<view class="line"></view>
				<view class="money_item">
					<view class="num">{{inter}}</view>
					<view class="name">积分</view>
				</view>
				<view class="line"></view>
				<view class="money_item" @click="coupons()">
					<view class="num">{{ka}}</view>
					<view class="name">卡劵</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import context from '@/lib/java110/Java110Context.js';
	const factory = context.factory; //获取app实例
	const constant = context.constant;
	import conf from '@/conf/config.js';
	import {queryOwnerAccount} from '@/api/user/userApi.js';
	import {
		getCouponUsers
	} from '../../api/fee/feeApi.js';
	export default {
		name: "my-person",
		data() {
			return {
				userInfo: {},
				headerImg: conf.imgUrl+'/h5/images/serve/head.png',
				topImg: conf.imgUrl+'/h5/images/serve/bg.png',
				userName: '',
				userPhone: '',
				communityName: '',
				blance: '0.00',
				inter: '0.00',
				ka: '0',
				ownerFlag: false, // 是否有业主信息 标记 如果有为 true  没有为false
				login: true,
			};
		},
		created() {
			this.refreshPageLoginInfo();
		},
		methods: {
			//切换小区
			_changeCommunity: function() {
				uni.navigateTo({
					url: "/pages/my/changeOwnerCommunity"
				});
			},
			refreshPageLoginInfo: function() {
				let _that = this; //查询用户信息
				if (!_that.ckeckUserInfo()) {
					_that.login = false;
					return;
				}
				_that.login = true;
				_that.loadOwenrInfo();
				_that.userInfo = context.getUserInfo();
				this.loadOwnerHeaderImg();
				this.loadOwnerAccount();
				this.loadOwnerCoupon();
			},
			ckeckUserInfo: function() {
				return context.checkLoginStatus();
			},
			loadOwenrInfo: function() {
				let _that = this;
				context.getOwner(function(_ownerInfo) {
					console.log('_ownerInfo', _ownerInfo);
					if (_ownerInfo) {
						_that.ownerFlag = true;
					} else {
						_that.ownerFlag = false;
					}
				});
			},
			/**
			 * 查询业主头像
			 */
			loadOwnerHeaderImg: function() {
				let _that = this;
				context.getOwner(function(_owner) {
					if(_owner.headImgUrl){
						_that.headerImg = _owner.headImgUrl;
					}else{
						_that.headerImg =conf.imgUrl+'/h5/images/serve/head.png';
					}
					_that.userName = _owner.appUserName;
					_that.userPhone = _owner.link;
					_that.communityName = _owner.communityName;

				});
			},
			// 余额
			loadOwnerAccount: function() {
				let _that = this;
				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						queryOwnerAccount({
							page: 1,
							row: 20,
							idCard: _ownerInfo.idCard,
							link: _ownerInfo.link,
							communityId: _ownerInfo.communityId
						}).then((data) => {
							if (!data) {
								_that.accounts = [];
								_that.blance = 0
								return;
							}
							_that.accounts = data;
							let blanceSum = 0;
							let interSum = 0;
							//let kaSum = 0;
							_that.accounts.forEach((v, k) => {
								// if(v.acctType == '2005'){
								// 	kaSum += parseFloat(v.amount);
								// }
								if(v.acctType == '2004'){
									interSum += parseFloat(v.amount);
								}
								if(v.acctType == '2003'){
									blanceSum += parseFloat(v.amount);
								}
							})
							_that.blance = blanceSum.toFixed(2);
							_that.inter = interSum.toFixed(2);
							//_that.ka = kaSum.toFixed(2);
							
						})
					}
				});
			},
			loadOwnerCoupon: function() {
				let _that = this;
				let _count = 0;
				_that.ka = 0;
				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						getCouponUsers({
							page: 1,
							row: 100,
							tel: _ownerInfo.link,
							communityId: _ownerInfo.communityId,
							state: '1001'
						}, null)
							.then((_couponList) => {
								_couponList.data.forEach(items => {
									if (items.isExpire == 'Y') {
										_count += parseInt(items.stock)
									}
								})
								_that.ka = _count;
							})
					}
				});
			},
			showLongModel: function() {
				this.vc.navigateTo({
					url: '/pages/login/login'
				}, () => {
					this.refreshPageLoginInfo();
				});
			},
			// 我的钱包
			myAccount: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../login/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '/pages/account/myAccount',
				});
			},
			//优惠券
			coupons: function(_item) {
				this.vc.navigateTo({
					url: '/pages/coupon/myCoupons',
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.my_user {
		padding: 0;
	}

	.header-img,
	.userinfo-avatar {
		width: 140upx;
		height: 140upx;
		margin-right: 20upx;
		background-color: #fff;
	}

	.userinfo {
		height: 280upx;
		//background: url('/static/images/serve/bg.png') no-repeat center center;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}


	.already,
	.wait {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		padding: 0 20%;
	}

	.userinfo-nickname {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
		color: #fff;
		margin: 0 !important;
		height: 280upx;
	}

	.money_box {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20upx 50upx;
		border-radius: 20upx;

		.money_item {
			text-align: center;
			color: #333;
			font-size: 28upx;
			padding: 10upx 0
		}

		.line {
			height: 20upx;
			width: 2upx;
			background: #eee;
		}
	}
</style>
