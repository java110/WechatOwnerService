<template>
	<view>
		<view v-if="num != null && num != ''" class="block__title">{{num}}号车位</view>
		<view v-if="floorNum != null && floorNum != ''" class="block__title">{{floorNum}}栋{{unitNum}}单元{{roomNum}}室</view>
		<view v-if="noData == false">
			<view v-for="(item,index) in feeDetails" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>缴费金额</view>
					<view class="text-gray">{{item.receivedAmount}}元</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">费用名称</view>
					<view class="text-gray">{{feeName}}</view>
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
					<view class="text-gray">缴费时间</view>
					<view class="text-gray">{{item.createTime}}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>

	</view>
</template>

<script>
	const context = require('../../context/Java110Context.js');

	const constant = context.constant;
	import noDataPage from '@/components/no-data-page/no-data-page.vue'


	const util = context.util;
	export default {
		data() {
			return {
				feeDetails: [],
				feeId: '',
				communityId: '',
				feeName: '',
				floorNum: '',
				unitNum: '',
				roomNum: '',
				num: '',
				noData: false
			}
		},
		components: {
			noDataPage
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _fee = JSON.parse(options.fee);
			this.feeId = _fee.feeId;
			this.feeName = _fee.feeName;
			this.floorNum = _fee.floorNum;
			this.unitNum = _fee.unitNum;
			this.roomNum = _fee.roomNum;
			this.communityId = _fee.communityId;
			this.num = _fee.num;

			this._loadFeeDetail();
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2]; //上一个页面
			//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
			prevPage.needFefresh = false;
		},
		methods: {
			_loadFeeDetail: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 30,
					feeId: this.feeId,
					communityId: this.communityId
				}
				context.request({
					url: constant.url.queryFeeDetail,
					header: context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log(res);
						if (res.statusCode == 200) {
							//成功情况下跳转
							let _feeDetails = res.data.feeDetails;
							if (_feeDetails == null || _feeDetails == undefined) {
								_feeDetails = [];
							} else {
								_feeDetails.forEach(function(_feeDetail) {
									let _tmpCreateTime = _feeDetail.createTime.replace(/\-/g, "/")
									let _createTime = new Date(_tmpCreateTime);
									_feeDetail.createTime = util.date.formatDate(_createTime);
								});
							}

							if (_feeDetails.length < 1) {
								_that.noData = true;
							}
							console.log(_feeDetails, _feeDetails.length, _that.noData);
							_that.feeDetails = _feeDetails;
						}
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
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
</style>
