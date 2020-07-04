<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="tabSelect(0)">
					待处理
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="tabSelect(1)">
					处理中
				</view>
				<view class="cu-item flex-sub" :class="active==2?'text-green cur':''" @tap="tabSelect(2)">
					完成
				</view>
			</view>
		</scroll-view>
		<!---->
		<view v-if="active == 0" class="ppfl_c">
			<view v-if="noData == false">
				<view v-for="(item,index) in waitRepair" :key="index" class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
					<view class="flex padding-bottom-xs solid-bottom justify-between">
						<view>{{item.repairId}}</view>
						<view class="text-gray">{{item.tel}}</view>
					</view>
					<view class="flex margin-top justify-between">
						<view class="text-gray">报修类型</view>
						<view class="text-gray">{{item.repairTypeName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">报修人</view>
						<view class="text-gray">{{item.repairName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">位置</view>
						<view class="text-gray">{{item.repairObjName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">预约时间</view>
						<view class="text-gray">{{item.appointmentTime }}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">状态</view>
						<view class="text-gray">{{item.stateName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">报修内容</view>
						<view class="text-gray">{{item.context}}</view>
					</view>
					<view class="solid-top flex justify-end margin-top padding-top-sm ">
						<button class="cu-btn sm line-gray" @click="repairDetail(item)">详情</button>
						<button class="cu-btn sm bg-red margin-left" @click="deleteRepair(item)">删除</button>
					</view>
				</view>
			</view>
			<view v-else>
				<no-data-page></no-data-page>
			</view>
		</view>

		<view v-if="active == 1" class="ppfl_c">
			<view v-if="noData == false">
				<view v-for="(item,index) in doingRepair" :key="index" class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
					<view class="flex padding-bottom-xs solid-bottom justify-between">
						<view>{{item.repairId}}</view>
						<view class="text-gray">{{item.tel}}</view>
					</view>
					<view class="flex margin-top justify-between">
						<view class="text-gray">报修类型</view>
						<view class="text-gray">{{item.repairTypeName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">报修人</view>
						<view class="text-gray">{{item.repairName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">位置</view>
						<view class="text-gray">{{item.repairObjName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">预约时间</view>
						<view class="text-gray">{{item.appointmentTime }}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">状态</view>
						<view class="text-gray">{{item.stateName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">报修内容</view>
						<view class="text-gray">{{item.context}}</view>
					</view>
					<view class="solid-top flex justify-end margin-top padding-top-sm ">
						<button class="cu-btn sm line-gray" @click="repairDetail(item)">详情</button>
						<button class="cu-btn sm bg-green margin-left" @click="payFee(item)">缴费</button>
					</view>
				</view>
			</view>
			<view v-else>
				<no-data-page></no-data-page>
			</view>
		</view>

		<view v-if="active == 2" class="ppfl_c">
			<view v-if="noData == false">
				<view v-for="(item,index) in repaired" :key="index" class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
					<view class="flex padding-bottom-xs solid-bottom justify-between">
						<view>{{item.repairId}}</view>
						<view class="text-gray">{{item.tel}}</view>
					</view>
					<view class="flex margin-top justify-between">
						<view class="text-gray">报修类型</view>
						<view class="text-gray">{{item.repairTypeName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">报修人</view>
						<view class="text-gray">{{item.repairName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">位置</view>
						<view class="text-gray">{{item.repairObjName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">预约时间</view>
						<view class="text-gray">{{item.appointmentTime }}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">状态</view>
						<view class="text-gray">{{item.stateName}}</view>
					</view>

					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">报修内容</view>
						<view class="text-gray">{{item.context}}</view>
					</view>
				</view>
			</view>
			<view v-else>
				<no-data-page></no-data-page>
			</view>
		</view>

		<view class="cu-modal" :class="deleteRepairModal==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">温馨提示</view>
					<view class="action" @tap="_cancleDeleteRepair()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认删除当前订单
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleDeleteRepair()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doDeleteRepair()">删除</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	const context = require('../../context/Java110Context.js');
	const factory = context.factory;;
	const constant = context.constant;
	export default {
		data() {
			return {
				active: 0,
				ownerId: '',
				roomId: '',
				communityId: '',
				waitRepair: [],
				doingRepair: [],
				repaired: [],
				deleteRepairModal: false,
				curRepair: {},
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
			let that = this;
			context.onLoad(options);
			context.getOwner(res => {
				console.log('_ownerInfo', res);
				that.ownerId = res.userId;
				that.communityId = res.communityId;
				that._loadRepair(that.active);
			});



		},
		methods: {
			/**
			 * 加载我的报修
			 */
			_loadRepair: function(_active) {
				let that = this;

				let _url = '';
				let _states = '';
				_url = constant.url.listStaffFinishRepairs;
				if (_active == 0) {
					_states = '1000';
				} else if (_active == 1) {
					_url = constant.url.listStaffFinishRepairs;
					_states = '1100,1200,1300';
				} else {
					_url = constant.url.listStaffFinishRepairs;
					_states = '1400,1500,1700,1800,1900,2000'
				}

				let _paramIn = {
					"communityId": that.communityId,
					"page": 1,
					"row": 10,
					"userId": that.ownerId,
					"repairStates": _states
				};
				context.request({
					url: _url,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							let _ownerRepairs = _json.data;
							console.log('_ownerRepairs', _ownerRepairs);
							if (_ownerRepairs.length < 1) {
								that.noData = true;
							} else {
								that.noData = false;
							}
							if (_active == 0) {
								that.waitRepair = _ownerRepairs;
							} else if (_active == 1) {
								that.doingRepair = _ownerRepairs;
							} else {
								that.repaired = _ownerRepairs;
							}
							return;
						}

						wx.showToast({
							title: "查询报修单失败",
							icon: 'none',
							duration: 2000
						});
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			onChange: function(e) {
				console.log(e);

				this._loadRepair(e.detail.index);
			},
			tabSelect: function(_active) {
				this.active = _active;
				this._loadRepair(_active);
			},
			repairDetail: function(_repair) {
				context.navigateTo({
					url: '/pages/repairDetail/repairDetail?repairId=' + _repair.repairId
				});
			},
			deleteRepair: function(_repair) {
				this.curRepair = _repair;
				this.deleteRepairModal = true;
			},
			_cancleDeleteRepair: function() {
				this.deleteRepairModal = false;
			},
			_doDeleteRepair: function() {
				let that = this;
				context.request({
					url: constant.url.deleteOwnerRepair,
					header: context.getHeaders(),
					method: "POST",
					data: this.curRepair,
					//动态数据
					success: function(res) {
						console.log(res); //成功情况下跳转
						if (res.data.code != 0) {
							uni.showToast({
								icon: 'none',
								title: res.data.msg,
								duration: 2000
							});
							return;
						}
						uni.showToast({
							icon: 'none',
							title: '处理成功',
							duration: 2000
						});
						that._cancleDeleteRepair();
						that._loadRepair(0);
					},
					fail: function(e) {
						console.log(e);
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
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
</style>
