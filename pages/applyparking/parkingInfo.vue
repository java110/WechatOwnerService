<template>
	<view>
		<view>
			<view class="header_fixed">
				<scroll-view class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="item.code==code?'text-green cur':''"
							v-for="(item,index) in parkingType" :key="index" @tap="switchParkingSpace(item)"
							:data-id="index">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-if="noData == false" style="margin-top: 110upx;">
				<view v-for="(item,index) in parkings" :key="index"
					class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding padding-bottom-xs">
					<view class="flex solid-bottom justify-between">
						<view>{{item.applyId}}</view>
						<view></view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">车牌号</view>
						<view class="text-gray">{{item.carNum}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">车辆品牌</view>
						<view class="text-gray">{{item.carBrand}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">起租时间</view>
						<view class="text-gray">{{item.createTime}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">结租时间</view>
						<view class="text-gray">{{item.endTime}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">备注</view>
						<view class="text-gray">{{item.remark}}</view>
					</view>
					<view class="solid-top flex justify-end margin-top padding-top-sm padding-bottom-sm"  v-if="item.state == '2002'">
						<button class="cu-btn sm bg-green margin-left" @click="toPayFee(item)">去缴费</button>
					</view>
				</view>
			</view>
			<view v-else>
				<no-data-page></no-data-page>
			</view>
		</view>
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;
	import {
		formatDate
	} from '../../lib/java110/utils/DateUtil.js'
	import noDataPage from '@/components/no-data-page/no-data-page.vue'

	export default {
		data() {
			return {
				parkingType: [{
					"name": '待审核',
					"code": 1001
				}, {
					"name": '待缴费',
					"code": 2002
				}, {
					"name": '完成',
					"code": 3003
				}, {
					"name": '申请失败',
					"code": 4004
				}],
				code: '1001',
				moreParkingSpaces: [],
				needFefresh: true,
				parkings: [],
				communityId: '',
				noData: false,
				page: 1,
				row: 20,
				ownerId: '',
				userId: '',
			};
		},
		components: {
			noDataPage
		},
		onLoad: function(options) {
			context.onLoad(options);
			// #ifdef MP-WEIXIN
			let accountInfo = uni.getAccountInfoSync();
			this.appId = accountInfo.miniProgram.appId;
			// #endif
			// #ifdef H5
			this.appId = uni.getStorageSync(constant.mapping.W_APP_ID)
			// #endif
		},
		onShow: function() {
			let _that = this;
			if (!this.needFefresh) {
				this.needFefresh = true;
				return;
			}
			context.getOwner(function(_owner) {
				_that.communityId = _owner.communityId;
				_that.ownerId = _owner.memberId;
				_that.userId = _owner.userId;
				_that.listParkingSpace();
			});
		},
		methods: {
			listParkingSpace: function() {
				let _that = this;
				this.parkings = [];
				context.request({
					url: constant.url.queryOwnerCars,
					header: context.getHeaders(),
					method: "GET",
					data: {
						"page": this.page,
						"row": this.row,
						"communityId": this.communityId,
						"state": this.code,
						"applyPersonId": this.ownerId
					},
					success: (res) => {
						let data = res.data.data;
						if (data.length == 0) {
							this.noData = true;
						}
						this.parkings = data;
					},
					fail(res) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			switchParkingSpace: function(_parkingSpace) {
				this.code = _parkingSpace.code;
				this.noData = false;
				this.listParkingSpace();
			},
			toPayFee: function() {
				this.vc.navigateTo({
					url: '/pages/fee/payParkingFeeList',
				})
			},
		}
	};
</script>
<style>
	.ppfl_footer{
	  text-align: right;
	}
	.ppfl_footer .ppfl_footer_his{
	  margin-right: 20rpx;
	}
	
	.ppfl_c{
	  padding: 0rpx 20rpx 20rpx 20rpx;
	}
	
	.block__title {
	  margin: 0;
	  font-weight: 400;
	  font-size: 14px;
	  color: rgba(69,90,100,.6);
	  padding: 40rpx 30rpx 20rpx;
	}
	
	.ppfl_context{
	  padding: 20rpx 40rpx 40rpx 40rpx;
	  font-size: 28rpx;
	  color: #8a8a8a;
	}
	
	.ppfl_context .ppfl_context_row{
	  margin-top: 30rpx;
	}
	
	
	.button_up_blank{
	  height: 40rpx;
	}

	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.solid-top::after {
		border-top: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.margin-header-top {
		height: 100upx;
	}

	.header_fixed {
		position: fixed;
		top: 0upx;
		left: 0;
		width: 100%;
		z-index: 2;
	}
</style>
