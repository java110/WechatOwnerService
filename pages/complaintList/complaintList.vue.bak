<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="tabSelect(0)">
					正在处理
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="tabSelect(1)">
					处理完成
				</view>
			</view>
		</scroll-view>

		<view v-if="active == 0" class="ppfl_c">
			<view v-if="noData==false">
				<view v-for="(item,index) in waitComplaint" :key="index" class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
					<view class="flex padding-bottom-xs solid-bottom justify-between">
						<view>{{item.complaintId}}</view>
						<view class="text-gray">{{item.tel}}</view>
					</view>
					<view class="flex margin-top justify-between">
						<view class="text-gray">投诉类型</view>
						<view class="text-gray">{{item.typeCdName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">投诉人</view>
						<view class="text-gray">{{item.complaintName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">所属房间</view>
						<view class="text-gray">{{item.floorNum}}号楼{{item.unitNum}}单元{{item.roomNum}}室</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">投诉时间</view>
						<view class="text-gray">{{item.createTime }}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">处理人</view>
						<view class="text-gray">{{item.currentUserName }}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">处理电话</view>
						<view class="text-gray">{{item.currentUserTel }}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">报修内容</view>
						<view class="text-gray">{{item.context}}</view>
					</view>
					<view v-if="item.currentUserId == item.startUserId" class="solid-top flex justify-end margin-top padding-top-sm padding-bottom-sm">
						<button  class="cu-btn sm bg-green " @click="_dealComplaint(item)">办理</button>
						<button class="cu-btn sm line-gray margin-left" @click="_toComplaintDetail(item)">详情</button>
					</view>
					<view v-else class="solid-top flex justify-end margin-top padding-top-sm padding-bottom-sm">
						<button class="cu-btn sm line-gray" @click="_toComplaintDetail(item)">详情</button>
					</view>
				</view>
			</view>
			<view v-else>
				<no-data-page></no-data-page>
			</view>
		</view>


		<view v-if="active == 1" class="ppfl_c">
			<view v-if="noData==false">

				<view v-for="(item,index) in complaintd" :key="index" class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
					<view class="flex padding-bottom-xs solid-bottom justify-between">
						<view>{{item.complaintId}}</view>
						<view class="text-gray">{{item.tel}}</view>
					</view>
					<view class="flex margin-top justify-between">
						<view class="text-gray">投诉类型</view>
						<view class="text-gray">{{item.typeCdName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">投诉人</view>
						<view class="text-gray">{{item.complaintName}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">所属房间</view>
						<view class="text-gray">{{item.floorNum}}号楼{{item.unitNum}}单元{{item.roomNum}}室</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">投诉时间</view>
						<view class="text-gray">{{item.createTime }}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">投诉内容</view>
						<view class="text-gray">{{item.context}}</view>
					</view>
					<view class="solid-top flex justify-end margin-top padding-top-sm padding-bottom-sm">
						<button class="cu-btn sm line-gray" @click="_toComplaintDetail(item)">详情</button>
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
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				waitComplaint: [],
				complaintd: [],
				active: 0,
				ownerId: '',
				roomId: '',
				communityId: '',
				page: 1,
				totalPage: 0,
				loading: false,
				noData:false,
				userId:''
			};
		},
		components: {
			noDataPage
		},
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
				that.userId = _owner.userId;
				that.roomId = _roomId;
				that._loadCompaint(that.active);
			});
		},
		onShow: function() {
			let that = this;
			that._loadCompaint(that.active);
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this._loadCompaint(this.active);
			uni.stopPullDownRefresh();
		},

		methods: {
			/**
			 * 加载我的报修
			 */
			_loadCompaint: function(_active) {
				let that = this;
				
				if(!that.communityId || !that.roomId){
					return;
				}
				
				let _state = '';
				if (_active == 0) {
					_state = '10001';
				} else {
					_state = '10002';
				}

				let _paramIn = {
					state: _state,
					roomIds: that.roomId,
					page: 1,
					row: 10,
					communityId: that.communityId
				};
				context.request({
					url: constant.url.listComplaints,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						if (res.statusCode == 200) {
							let _ownerComplaints = res.data.complaints;
							if(_ownerComplaints.length < 1){
								that.noData = true;
							}
							console.log('_ownerComplaints', _ownerComplaints);
							if (_active == 0) {
								that.waitComplaint = _ownerComplaints;
							} else {
								that.complaintd = _ownerComplaints;
							}
							return;
						}

						wx.showToast({
							title: res.data,
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

				this._loadCompaint(e.detail.index);
			},
			tabSelect: function(_active) {
				this.active = _active;
				this._loadCompaint(_active);
				this.noData = false;
			},
			_toComplaintDetail:function(_item){
				context.navigateTo({
					url:'/pages/complaintDetail/complaintDetail?complaintId='
					+_item.complaintId
					+"&communityId="+_item.communityId
				})
			},
			_dealComplaint:function(_item){
				context.navigateTo({
					url:'/pages/complaintHandle/complaintHandle?complaintId='
					+_item.complaintId
					+"&communityId="+_item.communityId
					+"&taskId="+_item.taskId
				})
			}
		}
	};
</script>
<style>
	@import "./complaintList.css";
</style>
