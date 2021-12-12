<template>
	<view>
		<!--index.wxml-->
		<view class="user-container bg-white ">
			<view class="userinfo">
				<block>
					<view v-if="login">
						<view class="cu-avatar header-img round " :style="{backgroundImage: 'url(' + headerImg + ')' }">
						</view>
						<view class="userinfo-nickname text-center margin-top">
							<text>{{userName}}</text>
						</view>
					</view>
					<view v-else @tap="showLongModel">
						<view class="userinfo-avatar">
							<open-data type="userAvatarUrl" lang="zh_CN" />
						</view>
						<view class="userinfo-nickname text-center margin-top">
							<text>请登录</text>
						</view>
					</view>
				</block>
			</view>
		</view>

		<view class="cu-list menu  margin-top">
			<view class="cu-item arrow" @tap="_changeCommunity()">
				<view class="content">
					<text class="cuIcon-circlefill text-yellow"></text>
					<text class="text-grey">切换小区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{communityName}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="myAssets()">
				<view class="content">
					<text class="cuIcon-profile text-pink"></text>
					<text class="text-grey">我的资产</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="myAccount()">
				<view class="content">
					<text class="cuIcon-recharge text-yellow"></text>
					<text class="text-grey">我的钱包</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="myServices()">
				<view class="content">
					<text class="cuIcon-profile text-pink"></text>
					<text class="text-grey">生活服务</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="toMallOrders()">
				<view class="content">
					<text class="cuIcon-goodsfavor text-pink"></text>
					<text class="text-grey">商城订单</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="mySettings()">
				<view class="content">
					<text class="cuIcon-settings text-gray"></text>
					<text class="text-grey">设置</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/** index.js **/
	const context = require("../../context/Java110Context.js");
	const factory = context.factory; //获取app实例
	const constant = context.constant;
	//获取app实例
	const app = getApp().globalData;
	import conf from '../../conf/config.js';
	import {
		getHcCode
	} from '../../api/webView/webViewApi.js'

	import {
		encodeUrl
	} from '../../utils/UrlUtil.js'

	import {
		getCurCommunity
	} from '../../api/community/communityApi.js'

	import {
		setStorageSync
	} from '../../utils/StorageUtil.js'

	import mapping from '../../constant/MappingConstant.js'
	import {hasOwner} from '../../api/owner/ownerApi.js'
	export default {
		data() {
			return {
				userInfo: {},
				headerImg: '',
				userName: '',
				communityName:'',
				// 用户信息
				ownerFlag: false, // 是否有业主信息 标记 如果有为 true  没有为false
				login: true

			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			context.onLoad(options, () => {
				this.refreshPageLoginInfo();
			});
			let _that = this;
			let login = context.checkLoginStatus();
			if (login) {
				factory.login.checkLoginStatus(function() {
					_that.userInfo = context.getUserInfo();
					_that.loadOwenrInfo();
				});
			}
		},
		onShow: function() {
			this.refreshPageLoginInfo();
		},
		methods: {
			// 原onShow方法
			// 自动登录后 刷新页面登录信息
			refreshPageLoginInfo: function() {
				let _that = this; //查询用户信息
				if (!_that.ckeckUserInfo()) {
					_that.login = false;
					return;
				}
				_that.login = true;
				_that.loadOwenrInfo();
				_that.userInfo = context.getUserInfo();
				console.log('用户信息',_that.userInfo)
				this.loadOwnerHeaderImg();
			},
			bindingOwner: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '../bindOwner/bindOwner'
				});
			},
			/**
			 * 查询业主头像
			 */
			loadOwnerHeaderImg: function() {
				let _that = this;
				context.getOwner(function(_owner) {
			
					let _headerImg = constant.url.getOwnerPhotoPath + "?objId=" + _owner.memberId +
						"&communityId=" + _owner.communityId +
						"&fileTypeCd=10000";
					_that.headerImg = _headerImg;
					_that.userName = _owner.appUserName;
					_that.communityName = _owner.communityName;
				});
			},
			showLongModel: function() {
				this.vc.navigateTo({
					url: '../login/login'
				}, () => {
					this.refreshPageLoginInfo();
				});
			},
			ckeckUserInfo: function() {
				return context.checkLoginStatus();
			},
			loadOwenrInfo: function() {
				let _that = this;
				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						_that.ownerFlag = true;
					} else {
						_that.ownerFlag = false;
					}
				});
			},
			toMallOrders() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateToMall({
					url: '/pages/myOrder/myOrderAll'
				})
			},
			onGotUserInfo: function(e) {
				console.log("nickname=" + JSON.stringify(e.detail.userInfo));
			},
			// 我的资产
			myAssets: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				hasOwner();
				this.vc.navigateTo({
					url: '/pages/my/myMenu?pageSign=myAssets'
				});
			},
			// 生活服务
			myServices: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				hasOwner();
				this.vc.navigateTo({
					url: '/pages/my/myMenu?pageSign=myServices'
				});
			},
			// 设置
			mySettings: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '/pages/settings/settings',
				});
			},
			// 我的钱包
			myAccount: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '/pages/myAccount/myAccount',
				});
			},
			//切换小区
			_changeCommunity:function(){
				uni.navigateTo({
					url:"/pages/changeOwnerCommunity/changeOwnerCommunity"
				});
			},
		}
	};
</script>
<style>
	@import "./my.css";

	.header-img {
		width: 200upx;
		height: 200upx;
	}
</style>
