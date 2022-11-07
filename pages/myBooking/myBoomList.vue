<template>

	<view class="tab-container bg-white">
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-vip text-green"></text>
					<text class="text-grey">{{owner.appUserName}}</text>
				</view>
				<view class="action">
					{{owner.link}}
				</view>
			</view>

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

			<view style="height: 10px;background-color: #f2f2f2;"></view>

			<view v-for="(item,index) in bookingList" :key="index"
				class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs justify-between">
					<view style="font-size: 14px;">单号<span style="margin-left: 10px;"
							class="text-gray">{{item.timeId}}</span></view>
				</view>
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view style="font-size: 14px;">场馆<span style="margin-left: 10px;"
							class="text-gray">{{item.venueName}}</span></view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">场地</view>
					<view class="text-gray">{{item.spaceName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约日期</view>
					<view class="text-gray">{{item.appointmentTime}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约时间</view>
					<view class="text-gray">{{HoursStr(item.hours)}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约人</view>
					<view class="text-gray">{{item.personName }}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约电话</view>
					<view class="text-gray">{{item.personTel }}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">金额</view>
					<view class="text-gray">{{item.total }}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">核销状态</view>
					<view class="text-gray">{{StateStr(item.state)}}</view>
				</view>


				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">核销时间</view>
					<view class="text-gray">{{item.stateTime}}</view>
				</view>

				<view class="solid-top flex justify-end margin-top padding-top-sm ">
					<button v-if="item.state == 'W'" class="cu-btn bg-red margin-left"
						@click="personTimeRefund(item,'T')">申请退款</button>
					<button v-if="item.state == 'T'" class="cu-btn line-grey margin-left"
						@click="personTimeRefund(item,'W')">取消退款</button>
					<button class="cu-btn bg-gradual-blue margin-left" @click="toApplyDetail(item)">详情</button>
				</view>

				<view
					style="margin-bottom:-13px;margin-top: 10px;margin-left: -20px;margin-right: -20px; height: 10px;background-color: #f2f2f2;">
				</view>

			</view>

			<view class="cu-item" v-if="bookingList.length === 0">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">暂无记录</text>
				</view>
				<view class="action">

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	const constant = context.constant;
	import {
		getBooks
	} from '../../api/booking/bookingApi.js'

	export default {
		data() {
			return {
				bookingList: [], // 预约列表
				curBooking: {},
				moreRooms: [],
				noData: false,
				owner: [],
				// W 待核销 C核销完成 T申请退款 Y已退款
				parkingType: [{
					"name": '全部',
					"code": 1000
				}, {
					"name": '待核销',
					"code": 1001
				}, {
					"name": '已核销',
					"code": 2002
				}, {
					"name": '申请退款',
					"code": 3003
				}, {
					"name": '已退款',
					"code": 4004
				}],
				code: '1001',
			};
		},

		components: {
			noDataPage
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.initList();
		},
		methods: {
			switchParkingSpace: function(_parkingSpace) {
				this.code = _parkingSpace.code;
				this.noData = false;
				this.initList();
			},
			initList() {
				// debugger
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let _that = this;
				this.noData = false;
				getBooks(0).then(data => {
					wx.hideLoading();
					let _bookings = data.data;
					_that.owner = data.owner;
					_that.moreRooms = [];

					if (_bookings.length == 0) {
						_that.noData = true;
						return;
					}
					_that.bookingList = [];
					// debugger
					for (var col = 0; col < _bookings.length; col++) {
						let _times = _bookings[col].times;
						for (var cola = 0; cola < _times.length; cola++) {
							// debugger
							let book = {
								appointmentTime: _bookings[col].appointmentTime, // 预约时间
								spaceId: _bookings[col].spaceId, //场地id
								spaceName: _bookings[col].spaceName, // 场地名称
								timeId: _times[cola].timeId, // 场次id
								hours: _times[cola].hours, // 时间
								personName: _bookings[col].personName, //  预约人								
								personTel: _bookings[col].personTel, // 预约电话
								communityId: _bookings[col].communityId, // 物业id
								state: _times[cola].state, // 预约状态 W待核销,C已核销
								venueName: _bookings[col].venueName, // 场馆名称
								venueId: _bookings[col].venueId, // 场馆ID
								stateTime: _times[cola].stateTime, // 核销时间
								total: (_times[cola].total / 100).toFixed(2), // 场次金额
							};
							// debugger
							if (book.state === 'C' && Number(_that.code) === Number('2002')) {
								_that.bookingList.push(book);
							} else if (book.state === 'T' && Number(_that.code) === Number('3003')) {
								_that.bookingList.push(book);
							} else if (book.state === 'W' && Number(_that.code) === Number('1001')) {
								_that.bookingList.push(book);
							} else if (book.state === 'Y' && Number(_that.code) === Number('4004')) {
								_that.bookingList.push(book);
							} else if (Number(_that.code) === Number('1000')) {
								_that.bookingList.push(book);
							}
						}
					}
				});

			},
			StateStr(s) {
				if (s == "W") {
					return "待核销";
				}
				if (s == "C") {
					return "已核销";
				}
				if (s == "Y") {
					return "已退款"
				}
				if (s == "T") {
					return "申请退款"
				}
			},
			// 时间转换
			HoursStr(hours) {
				let hourSlot = hours + ":00-" + (Number(hours) + 1) + ":00";
				return hourSlot;
			},
			toApplyDetail: function(_item) {
				this.vc.navigateTo({
					url: '/pages/myBooking/myBooksRenovationDetail?books=' + JSON.stringify(_item)
				});
			},
			/// 申请退款
			personTimeRefund(item, str) {
				// debugger
				let title_w = "申请退款";
				let content_w = "是否要退" + this.HoursStr(item.hours) + "的场次?";

				if (str == "W") {
					title_w = "取消退款";
					content_w = "是否恢复" + this.HoursStr(item.hours) + "场次的使用?";
				}
				let _that = this;
				let cid = _that.owner.communityId;
				// debugger
				uni.showModal({
					title: title_w,
					content: content_w,
					success: function(res) {
						if (res.confirm) {
							let _objData = {
								"timeId": item.timeId,
								"state": str,
								"communityId": cid,
							};
							// debugger
							context.request({
								url: constant.url.saveCommunitySpacePersonTime,
								header: context.getHeaders(),
								method: "POST",
								data: _objData,
								//动态数据
								success: function(res) {
									// debugger
									if (res.statusCode == 200 && res.data.code == '0') {
										wx.showToast({
											title: "提示:" + res.data.msg,
											icon: 'none',
											duration: 2000
										});
										console.log(_that.parkingType[4],_that.parkingType)
										_that.switchParkingSpace(_that.parkingType[4])
									} else if (res.statusCode == 200 && res.data.code == '404') {
										wx.showToast({
											title: "异常:" + res.data.msg,
											icon: 'none',
											duration: 3000
										});
									}
								},
								fail: function(e) {
									// debugger
									wx.hideLoading();
									wx.showToast({
										title: "服务器异常了",
										icon: 'none',
										duration: 2000
									});
								}
							});
						} else if (res.cancel) {}
					}
				});


			}
		}
	};
</script>

<style>
	.tab-container {
		/*border: 1px solid black;*/

		margin-top: 30rpx;
	}

	.tab-item {
		padding: 20rpx 30rpx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.tab-item-hover {
		background-color: #e6e6e6;
	}

	.tab-icon {
		width: 30rpx;
		height: 30rpx;
	}

	.tab-text {
		display: inline-block;
		margin-left: 10rpx;
		color: #1e1e1e;
	}

	.tab-arrow {
		display: inline-block;
		width: 20rpx;
		height: 20rpx;
		border: 1px solid #cdcdcd;

		border-left: none;
		border-bottom: none;

		transform: rotate(45deg);
	}

	.border-bottom .icon {
		font-size: 38rpx;
		line-height: 38rpx;
	}
</style>
