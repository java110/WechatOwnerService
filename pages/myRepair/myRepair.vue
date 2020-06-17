<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="tabSelect(0)">
					待处理
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="tabSelect(1)">
					接单中
				</view>
				<view class="cu-item flex-sub" :class="active==2?'text-green cur':''" @tap="tabSelect(2)">
					完成
				</view>
			</view>
		</scroll-view>
		<!---->
		<view v-if="active == 0" class="ppfl_c" >
			<view v-for="(item,index) in waitRepair" :key="index"
			 class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
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
					<view class="text-gray">报修房间</view>
					<view class="text-gray">{{item.roomId}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约时间</view>
					<view class="text-gray">{{item.appointmentTime }}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">报修内容</view>
					<view class="text-gray">{{item.context}}</view>
				</view>
			</view>
		</view>

		<view v-if="active == 1" class="ppfl_c" >
			<view v-for="(item,index) in doingRepair" :key="index"
			 class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
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
					<view class="text-gray">报修房间</view>
					<view class="text-gray">{{item.roomId}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约时间</view>
					<view class="text-gray">{{item.appointmentTime }}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">报修内容</view>
					<view class="text-gray">{{item.context}}</view>
				</view>
			</view>
		</view>

		<view v-if="active == 2" class="ppfl_c" >
			<view v-for="(item,index) in repaired" :key="index"
			 class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
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
					<view class="text-gray">报修房间</view>
					<view class="text-gray">{{item.roomId}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约时间</view>
					<view class="text-gray">{{item.appointmentTime }}</view>
				</view>
				
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">报修内容</view>
					<view class="text-gray">{{item.context}}</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
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
				repaired: []
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			context.onLoad(options);
			context.getRooms().then(function(res) {
				let _owner = res.data.owner;

				let _rooms = res.data.rooms;
				if (_rooms == null || _rooms == undefined || _rooms.length == 0) {
					return;
				}

				let _roomId = '';

				_rooms.forEach(function(_item) {
					_roomId += (_item.roomId + ',');
				});

				if (_roomId != '') {
					_roomId = _roomId.substring(0, _roomId.length - 1);
				}

				that.communityId = _owner.communityId;
				that.ownerId = _owner.memberId;
				that.roomId = _roomId;
				that._loadRepair(that.active);
			});


		},
		methods: {
			/**
			 * 加载我的报修
			 */
			_loadRepair: function(_active) {
				let that = this;

				let _state = '';
				if (_active == 0) {
					_state = '1000';
				} else if (_active == 1) {
					_state = '1100';
				} else {
					_state = '1200';
				}

				let _paramIn = {
					"communityId": that.communityId,
					"ownerId": that.ownerId,
					"roomId": that.roomId,
					"state": _state,
					"page": 1,
					"row": 10
				};
				context.request({
					url: constant.url.listMyRepair,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						if (res.statusCode == 200) {
							let _ownerRepairs = res.data.ownerRepairs;
							console.log('_ownerRepairs',_ownerRepairs);
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
			}
		}
	}
</script>

<style>
	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}

</style>
