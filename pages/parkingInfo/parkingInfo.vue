<template>
	<view>
		<view>
			<view class="header_fixed">
				<scroll-view class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="item.code==code?'text-green cur':''" v-for="(item,index) in parkingType"
						 :key="index" @tap="switchParkingSpace(item)" :data-id="index">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-if="noData == false">
				<view v-for="(item,index) in parkings" :key="index" 
				class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding-top padding-left padding-right">
					
					<view class="flex margin-top justify-between">
						<view class="text-gray">车位</view>
						<view class="text-gray">{{item.areaNum}}{{item.num}}</view>
					</view>
					<view class="flex margin-top justify-between">
						<view class="text-gray">状态</view>
						<view class="text-gray">{{item.stateName}}</view>
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
				</view>
			</view>
			<view v-else>
				<no-data-page></no-data-page>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;


	import {
		formatDate
	} from '../../utils/DateUtil.js'
	import noDataPage from '@/components/no-data-page/no-data-page.vue'

	export default {
		data() {
			return {
				parkingType: [{
					"name": '正常',
					"code": 1001
				}, {
					"name": '车位释放欠费',
					"code": 2002
				}, {
					"name": '车位释放',
					"code": 3003
				}, {
					"name": '预约中',
					"code": 4004
				}],
				code: '1001',
				moreParkingSpaces: [],
				needFefresh: true,
				parkings:[],
				communityId:'',
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
				context.request({
					url: constant.url.queryOwnerCars,
					header: context.getHeaders(),
					method: "GET",
					data: {
						"page": this.page,
						"row": this.row,
						"communityId": this.communityId,
						"state": this.code,
						"ownerId":this.ownerId
					},
					success: (res) => {
						let data = res.data.data;
						if(data.length == 0){
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
			}
		}
	};
</script>
<style>
	@import "./parkingInfo.css";

	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.solid-top::after {
		border-top: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.margin-header-top {
		height: 100upx;
	}

	/*  #ifdef  APP-PLUS || MP-WEIXIN  */
	.header_fixed {
		position: fixed;
		top: 0upx;
		left: 0;
		width: 100%;
		z-index: 2;
	}

	/*  #endif  */
	/*  #ifdef  H5  */
	.header_fixed {
		position: fixed;
		top: 80upx;
		left: 0;
		width: 100%;
		z-index: 2;
	}

	/*  #endif  */
</style>
