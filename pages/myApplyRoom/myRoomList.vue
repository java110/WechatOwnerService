<template>
	<view class="tab-container bg-white">
		<view class="cu-list menu">
			<view class="cu-item arrow" v-if="rooms.length > 0" v-for="(item, key) in rooms" :key="key" :data-item="item" @click="toApplyDetail(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-homefill text-green margin-right-xs"></text> {{item.floorNum}}号楼{{item.unitNum}}单元{{item.roomNum}}室</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-right margin-right-xs"></text> {{item.roomId}}</view>
				</view>
				<view class="action">
	
				</view>
			</view>
			<view class="cu-item" v-if="rooms.length === 0">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">暂无房屋信息</text>
				</view>
				<view class="action">
	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	
	import {
		getRooms
	} from '../../api/room/roomApi.js'	
	
	export default {
		data() {
			return {
				rooms: [],
				curRoom: {},
				moreRooms: [],
				noData: false
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
			let _that = this;
			this.noData = false;
			getRooms().then(data => {
				let _rooms = data.rooms;
				this.rooms = _rooms;
				let _owner = data.owner;
				_that.moreRooms = [];
				if (_rooms.length == 0) {
					_that.noData = true;
					return;
				}
				_rooms.forEach(function(_room) {
					_room.communityId = _owner.communityId;
					_room.communityName = _owner.communityName;
				});
				_that.curRoom = _rooms[0];
			});
		},
		methods: {
			toApplyDetail: function(_item) {
				this.vc.navigateTo({
					url: '/pages/myApplyRoom/myApplyRoomList?room=' + JSON.stringify(_item)
				});
			},
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
	.border-bottom .icon{
	  font-size: 38rpx;
	  line-height: 38rpx;
	}
</style>
