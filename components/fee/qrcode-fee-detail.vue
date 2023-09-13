<template>
	<view>
		<view v-for="(item,index) in feeDetails" :key="index"
			class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding">
			<view class="flex padding-bottom-xs solid-bottom justify-between">
				<view>缴费金额</view>
				<view class="text-gray">{{item.receivedAmount}}元</view>
			</view>
			<view class="flex margin-top justify-between">
				<view class="text-gray">费用名称</view>
				<view class="text-gray">{{item.feeName}}</view>
			</view>
			<view class="flex margin-top justify-between">
				<view class="text-gray">收费对象</view>
				<view class="text-gray">{{item.objName}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">缴费编码</view>
				<view class="text-gray">{{item.detailId}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">缴费周期</view>
				<view class="text-gray">{{item.cycles}}个月</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">起始时间</view>
				<view class="text-gray">{{item.startTime}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">结束时间</view>
				<view class="text-gray">{{item.endTime}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">缴费时间</view>
				<view class="text-gray">{{item.createTime}}</view>
			</view>
			<view class="flex margin-top-xs justify-between" v-if="item.preDegrees">
				<view class="text-gray">上期度数</view>
				<view class="text-gray">{{item.preDegrees}}</view>
			</view>
			<view class="flex margin-top-xs justify-between" v-if="item.curDegrees">
				<view class="text-gray">本期度数</view>
				<view class="text-gray">{{item.curDegrees}}</view>
			</view>
			<view class="flex margin-top-xs justify-between" v-if="item.preDegrees">
				<view class="text-gray">使用量</view>
				<view class="text-gray">{{item.curDegrees-item.preDegrees}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">备注</view>
				<view class="text-gray">{{item.remark}}</view>
			</view>
		</view>
		<view v-if="!feeDetails || feeDetails.length < 1">
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import {
		getPayFeeDetailQrcode
	} from '@/api/fee/qrCodePayFee.js';
	import {
		dateSubOneDay
	} from '../../lib/java110/utils/DateUtil.js';
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	export default {
		name: "qrCodeFeeDetail",
		data() {
			return {
				feeDetails: [],
				ownerId: '',
				roomId: '',
				communityId: '',
				storeId: '',
				receivableAmount: 0,
				customFee: 'OFF',
				createStaffId: '',
				feeType: 'OWNER',
				feeIds: []
			};
		},
		methods: {
			_loadFeeDetails(_param) {
				this.ownerId = _param.ownerId;
				this.communityId = _param.communityId;
				this.customFee = _param.customFee;
				this.createStaffId = _param.createStaffId;
				this.roomId = _param.roomId;
				this.feeType = _param.feeType;
				let _that = this;
				getPayFeeDetailQrcode(this, {
					ownerId: this.ownerId,
					communityId: this.communityId,
					page:1,
					row:50
				}).then(_data => {
					
					_that.feeDetails = _data;
					
				});
			},
			

		}
	}
</script>

<style lang="scss">
	.ppf_item {
		padding: 0rpx 0rpx 0rpx 0rpx;
	}

	.block__title {
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

	.fee-last {
		margin-bottom: 200upx;
	}

	.cu-btn.lgplus {
		padding: 0 20px;
		font-size: 18px;
		height: 100upx;

	}

	.cu-btn.sharp {
		border-radius: 0upx;
	}

	.line-height {
		line-height: 100upx;
	}

	.uni-checkbox-input {}
</style>

