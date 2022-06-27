<template>
	<view>
		<!-- <view class="block__title">
			<text>访客二维码</text>
			<button class="cu-btn bg-blue" @click="_toTempFilePath()">保存</button>
		</view>
		<view class="u-qrcode">
			<uQrcode ref="uQRCode" :text="qrcodeValue" />
		</view> -->
		
		<view class="block__title">
			<text>来访信息</text>
		</view>
		<view class="bg-white margin-bottom padding">
			<view class="flex padding-bottom-xs solid-bottom justify-between">
				<view>预约状态</view>
				<view class="text-gray">{{visitInfo.recordState == 1 ? '已失效' : '已生效'}}</view>
			</view>
			<view class="flex margin-top justify-between">
				<view class="text-gray">创建时间</view>
				<view class="text-gray">{{visitInfo.createTime}}</view>
			</view>
			<view class="flex margin-top justify-between">
				<view class="text-gray">访客姓名</view>
				<view class="text-gray">{{visitInfo.vName}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">访客联系方式</view>
				<view class="text-gray">{{visitInfo.phoneNumber}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">访客性别</view>
				<view class="text-gray">{{visitInfo.visitGender=='0'?'男':'女'}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">事由类型</view>
				<view class="text-gray">{{visitInfo.reasonType == 0 ? '喜事' : (visitInfo.reasonType == 1 ? '白事' : '-')}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray w100">来访事由</view>
				<view class="text-gray">{{visitInfo.visitCase}}</view>
			</view>
			<view class="flex margin-top-xs justify-between" v-if="visitInfo.carNum">
				<view class="text-gray">车牌号</view>
				<view class="text-gray">{{visitInfo.carNum}}</view>
			</view>
			<view class="flex margin-top-xs justify-between" v-if="visitInfo.carNum">
				<view class="text-gray">车辆审核状态</view>
				<view class="text-gray">{{visitInfo.stateName}}</view>
			</view>
			<view class="flex margin-top-xs justify-between" v-if="visitInfo.parkingAreaName">
				<view class="text-gray">停车场</view>
				<view class="text-gray">{{visitInfo.parkingAreaName}}</view>
			</view>
			<view class="flex margin-top-xs justify-between" v-if="visitInfo.parkingSpaceNum">
				<view class="text-gray">停车位</view>
				<view class="text-gray">{{visitInfo.parkingSpaceNum}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">随行人数</view>
				<view class="text-gray">{{visitInfo.entourage}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">预计来访时间</view>
				<view class="text-gray">{{visitInfo.visitTime}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">预计离开时间</view>
				<view class="text-gray">{{visitInfo.departureTime}}</view>
			</view>
			<view class="flex margin-top-xs justify-between" v-show="visitInfo.stateRemark">
				<view class="text-gray w100">备注</view>
				<view class="text-gray">{{visitInfo.stateRemark}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	import {listOwnerVisit}  from '../../api/visit/visit.js'
	import uQrcode from '@/components/uni-qrcode/uqrcode.vue'
	const constant = context.constant;
	const util = context.util;
	export default {
		data() {
			return {
				visitInfo: {},
				ownerInfo: {},
				qrcodeValue: '',
			}
		},
		components: {
			uQrcode
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			let _that = this;
			_that.qrcodeValue = options.vId;
			context.getOwner(function(_owner) {
				_that.ownerInfo = _owner;
				_that._loadVisitInfo(options.vId);
			});
		},
		onReachBottom : function(){},
		methods: {
			_toTempFilePath: function() {
				this.$refs.uQRCode.save({
					success: res => {
						console.log(res)
					}
				})
			},
			
			_loadVisitInfo: function(vId){
				let _that = this;
				let _objData = {
					page: 1,
					row: 1,
					vId: vId,
					ownerId: this.ownerInfo.ownerId,
					userId: this.ownerInfo.userId,
					communityId: this.ownerInfo.communityId
				}
				listOwnerVisit(_objData).then(function(_visits){
					_that.visitInfo = _visits.visits[0];
				})
			}
		}
	}
</script>

<style>
	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.ppf_item {
		padding: 0rpx 0rpx 0rpx 0rpx;
	}

	.block__title {
		display: flex;
		justify-content: space-between;
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}

	.block__bottom {
		height: 180rpx;
	}
	.u-qrcode{
		width: 256px;
		margin: 0 auto;
	}
	.w100{
		width: 500rpx;
	}
</style>
