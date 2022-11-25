<template>
	<view>
		<view class="cu-list menu  margin-top">
			<block v-if="pageSign == 'myAssets'">
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
				<view class="cu-item arrow" @click="myProperty()">
					<view class="content">
						<text class="cuIcon-service text-red"></text>
						<text class="text-grey">我的物业</text>
					</view>
				</view>
			</block>
			<block v-if="pageSign == 'myServices'">
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
						<text class="text-grey">车位申请进度</text>
					</view>
				</view>
			</block>

		</view>
	</view>
</template>

<script>
	/** index.js **/
	import context from '../../lib/java110/Java110Context.js';
	import {getCurCommunity} from '../../api/community/communityApi.js'
	import {setStorageSync} from '../../lib/java110/utils/StorageUtil.js'
	import mapping from '../../constant/MappingConstant.js'
	export default {
		data() {
			return {
				pageSign: '',
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			this.pageSign = options.pageSign;
			console.log(options,"123")
		},
		onShow: function() {
		},
		methods: {
			viewOwner: function() {
				this.vc.navigateTo({
					url: '../viewBindOwner/viewBindOwner'
				});
			},
			myProperty: function() {
				this.vc.navigateTo({
					url: '../my/myProperty'
				});
			},

			myComplaint: function() {
				this.vc.navigateTo({
					url: '/pages/complaint/complaintList'
				});
			},
			myRenovation: function() {
				this.vc.navigateTo({
					url: '../myRenovation/myRoomList'
				});
			},
			myHouse: function() {
				this.vc.navigateTo({
					url: '../my/myHouse'
				});
			},
			myRepair: function() {
				this.vc.navigateTo({
					url: '/pages/repair/myRepair',
				});
			},
			feeDetail: function() {
				this.vc.navigateTo({
					url: '/pages/fee/payFeeDetail',
				});
			},
			applyRoomDetail: function(){
				this.vc.navigateTo({
					url: '/pages/myApplyRoom/myRoomList',
				});
			},
			myParking: function() {
				this.vc.navigateTo({
					url: '/pages/parkingInfo/parkingInfo',
				});
			},
			_machineTranslate: function() {
				this.vc.navigateTo({
					url: '/pages/machine/machineTranslateLog',
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
