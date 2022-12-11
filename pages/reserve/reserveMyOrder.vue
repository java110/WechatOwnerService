<template>

	<view class="">
		<view class="cu-list menu">
			<view class="header_fixed">
				<scroll-view class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="item.state==curStata?'text-green cur':''"
							v-for="(item,index) in parkingType" :key="index" @tap="_changeState(item)"
							:data-id="index">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-for="(item,index) in orders"  :key="index"
				class="bg-white margin-top margin-right-xs radius margin-left-xs ">
				<view class="flex padding solid-bottom justify-between">
					<view style="font-size: 14px;">单号<span style="margin-left: 10px;"
							class="text-gray">{{item.timeId}}</span></view>
				</view>
				<view class="flex padding-left padding-right margin-top padding-bottom-sm justify-between">
					<view class="text-gray">商品/服务</view>
					<view class="text-gray">{{item.goodsName}}</view>
				</view>
				<view class="flex padding-left padding-right padding-bottom-sm justify-between">
					<view class="text-gray">预约日期</view>
					<view class="text-gray">{{item.appointmentTime}}</view>
				</view>
				<view class="flex padding-left padding-right padding-bottom-sm justify-between">
					<view class="text-gray">预约时间</view>
					<view class="text-gray">{{item.hours}}:00:00</view>
				</view>
				<view class="flex padding-left padding-right padding-bottom-sm justify-between">
					<view class="text-gray">金额</view>
					<view class="text-gray">{{item.receivedAmount }}</view>
				</view>
				<view class="flex padding-left padding-right padding-bottom-sm justify-between">
					<view class="text-gray">核销状态</view>
					<view class="text-gray">{{item.stateName}}</view>
				</view>

				<view class="solid-top flex justify-end margin-top padding-top-sm " v-if="item.state == 'W'">
					<button  class="cu-btn bg-red margin-left"
						@click="personTimeRefund(item,'T')">取消</button>
					<button class="cu-btn bg-gradual-blue margin-left" @click="_toQrCodePage(item)">核销</button>
				</view>
				<view
					style="margin-bottom:-13px;margin-top: 10px;margin-left: -20px;margin-right: -20px; height: 10px;background-color: #f2f2f2;">
				</view>
			</view>

			<view class="cu-item margin-top" v-if="orders.length === 0">
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
	const constant = context.constant;
	import {
		getReserveGoodsOrderTime
	} from '@/api/community/reserveApi.js';
	
	import {getCommunityId} from '@/api/community/communityApi.js';
	import url from '@/constant/url.js';

	export default {
		data() {
			return {
				orders: [], // 预约列表
				moreRooms: [],
				noData: false,
				owner: [],
				// W 待核销 C核销完成 T申请退款 Y已退款
				parkingType: [{
					"name": '全部',
					"state": ''
				}, {
					"name": '待核销',
					"state": 'W'
				}, {
					"name": '已核销',
					"state": 'C'
				}, {
					"name": '已取消',
					"state": 'CL'
				}],
				curStata: '',
			};
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			this._loadReserveOrder();
		},
		methods: {
			_changeState: function(_order) {
				console.log('_changeState',_order);
				this.curStata = _order.state;
				this._loadReserveOrder();
			},
			_loadReserveOrder:function(){
				let _that = this;
				getReserveGoodsOrderTime({
					page:1,
					row:100,
					state:this.curStata,
				}).then(_data=>{
					_that.orders = _data;
				})
			},
			_toQrCodePage:function(item){
				this.vc.navigateTo({
					url: '/pages/reserve/reserveQrCode?timeId=' +item.timeId
				});
			},
			/// 申请退款
			personTimeRefund(item, str) {
				// debugger
				let title_w = "申请取消";
				let content_w = "是否要退" + item.goodsName + "的预约";

				let _that = this;
				let cid = getCommunityId();
				// debugger
				uni.showModal({
					title: title_w,
					content: content_w,
					success: function(res) {
						if (res.confirm) {
							let _objData = {
								"timeId": item.timeId,
								"communityId": cid,
							};
							// debugger
							context.request({
								url: url.deleteReserveGoodsPerson,
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
