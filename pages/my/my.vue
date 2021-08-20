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

			<view class="cu-item arrow" @click="viewOwner()">
				<view class="content">
					<text class="cuIcon-profile text-pink"></text>
					<text class="text-grey">业主信息</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="myHouse()">
				<view class="content">
					<text class="cuIcon-home text-blue"></text>
					<text class="text-grey">我的房屋</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" @click="mallOrder()">
				<view class="content">
					<text class="cuIcon-shopfill text-orange"></text>
					<text class="text-grey">商城订单</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="housekeepingOrder()">
				<view class="content">
					<text class="cuIcon-homefill text-orange"></text>
					<text class="text-grey">家政订单</text>
				</view>
			</view> -->
			<view class="cu-item arrow" @click="feeDetail()">
				<view class="content">
					<text class="cuIcon-card text-pink"></text>
					<text class="text-grey">缴费历史</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="applyRoomDetail()">
				<view class="content">
					<text class="cuIcon-square text-pink"></text>
					<text class="text-grey">空置房申请历史</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="myComplaint()">
				<view class="content">
					<text class="cuIcon-form text-green"></text>
					<text class="text-grey">我的投诉单</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="myRepair()">
				<view class="content">
					<text class="cuIcon-repairfill text-orange"></text>
					<text class="text-grey">我的报修单</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="_machineTranslate()">
				<view class="content">
					<text class="cuIcon-formfill text-orange"></text>
					<text class="text-grey">门禁同步日志</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="myRenovation()">
				<view class="content">
					<text class="cuIcon-paintfill text-green"></text>
					<text class="text-grey">房屋装修</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="myParking()">
				<view class="content">
					<text class="cuIcon-taxi text-orange"></text>
					<text class="text-grey">车位信息</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="myProperty()">
				<view class="content">
					<text class="cuIcon-service text-red"></text>
					<text class="text-grey">我的物业</text>
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
	import {getHcCode} from '../../api/webView/webViewApi.js'
	
	import {encodeUrl} from '../../utils/UrlUtil.js'
	
	import {getCurCommunity} from '../../api/community/communityApi.js'
	
	import {setStorageSync} from '../../utils/StorageUtil.js'
	
	import mapping from '../../constant/MappingConstant.js'
	export default {
		data() {
			return {
				userInfo: {},
				headerImg: '',
				userName: '',
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
			viewOwner: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '../viewBindOwner/viewBindOwner'
				});
			},
			loadOwenrInfo: function() {
				let _that = this;

				context.getOwner(function(_ownerInfo) {
					console.log(_ownerInfo);

					if (_ownerInfo) {
						_that.ownerFlag = true;
					} else {
						_that.ownerFlag = false;
					}
				});
			},
			myProperty: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '../myProperty/myProperty'
				});
			},

			myComplaint: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '../complaintList/complaintList'
				});
			},
			onGotUserInfo: function(e) {
				console.log("nickname=" + JSON.stringify(e.detail.userInfo));
			},
			myRenovation: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '../myRenovation/myRoomList'
				});
			},
			myHouse: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '../my/myHouse'
				});
			},
			myRepair: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '/pages/myRepair/myRepair',
				});
			},
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
			feeDetail: function() {
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '/pages/payFeeDetail/payFeeDetail',
				});
			},
			applyRoomDetail: function(){
				if (!this.ckeckUserInfo()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					}, () => {
						this.refreshPageLoginInfo();
					});
					return;
				}
				this.vc.navigateTo({
					url: '/pages/myApplyRoom/myRoomList',
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
				});
			},
			showLongModel: function() {
				this.vc.navigateTo({
					url: '../login/login'
				});
			},
			ckeckUserInfo: function() {
				return context.checkLoginStatus();
			},
			myParking: function() {
				this.vc.navigateTo({
					url: '/pages/parkingInfo/parkingInfo',
				});
			},
			_machineTranslate: function() {
				this.vc.navigateTo({
					url: '/pages/machineTranslateLog/machineTranslateLog',
				});
			},
			mallOrder:function(){
				let that = this;
				let _communityId = '';
				getCurCommunity()
				.then(res=>{
					_communityId = res.communityId;
					let _url = "/pages/myOrder/myOrder?hcCommunityId="+_communityId+"&mallFrom=HC";
					setStorageSync(mapping.HC_MALL_CUR_URL,_url);
					uni.navigateTo({
						url: '/pages/hcWebView/hcWebView'
					});
				});
			},
			housekeepingOrder:function(){
				let that = this;
				let _communityId = '';
				getCurCommunity()
				.then(res=>{
					_communityId = res.communityId;
					let _url = "/pages/homemaking/order?hcCommunityId="+_communityId+"&mallFrom=HC";
					setStorageSync(mapping.HC_MALL_CUR_URL,_url);
					uni.navigateTo({
						url: '/pages/hcWebView/hcWebView'
					});
				});
			}

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
