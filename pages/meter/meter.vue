<template>
	<view>
		<view class="header_fixed">
			<scroll-view v-if="rooms.length <5 && rooms.length >1" class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.roomId==curRoom.roomId?'text-green cur':''" v-for="(item,index) in rooms"
					 :key="index" @tap="switchRoom(item)" :data-id="index">
						{{item.floorNum}}栋{{item.roomNum}}室
					</view>
				</view>
			</scroll-view>
			<scroll-view v-if="rooms.length >4" scroll-x class="bg-white nav" scroll-with-animation scroll-left="true">
				<view class="cu-item flex-sub" :class="item.roomId==curRoom.roomId?'text-green cur':''" v-for="(item,index) in rooms"
				 :key="index" @tap="switchRoom(item)" :data-id="index">
					{{item.floorNum}}栋{{item.roomNum}}室
				</view>
			</scroll-view>
		</view>
		<view v-if="rooms.length == 1" class="block__title">{{rooms[0].floorNum}}栋{{rooms[0].roomNum}}室</view>
		<view v-if="rooms.length > 1" class="margin-header-top"></view>
		
		<view v-if="noData == false" style="padding-bottom: 200rpx;">
			<view class="cu-list menu" v-if="machines.length > 0" v-for="(machine, idx) in machines" :key="idx" :data-item="machine"
			 @click="_preStoreWeterFee(machine)">
				<view class="cu-item arrow">
					<view class="content padding-tb-sm">
							<view class="text-cut" style="width:220px">{{machine.machineName}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	
	import {
		getRooms
	} from '../../api/room/roomApi.js';
	
	import {getCommunityId} from '../../api/community/communityApi.js'
	
	import {getMeterMachine} from '../../api/machine/machineApi.js';
	
	export default {
		data() {
			return {
				rooms: [],
				curRoom:{},
				machines:[],
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
			context.onLoad(options);
			this._loadRooms();
		},
		methods: {
			_loadRooms:function(){
				let _that = this;
				_that.noData = false;
				getRooms().then(data => {
					let _rooms = data.rooms;
					this.rooms = _rooms;
					if (_rooms.length == 0) {
						_that.noData = true;
						return;
					}
					_that.curRoom = _rooms[0];
					_that._loadMeterMachines();
				});
			},
			_loadMeterMachines:function(){
				let _that = this;
				getMeterMachine({
					page:1,
					row:10,
					communityId:getCommunityId(),
					roomId:this.curRoom.roomId,
					machineModel:'1001'
				}).then(_data=>{
					_that.machines = _data;
				})
			},
			switchRoom: function(_room) {
				this.curRoom = _room;
				this.noData = false;
				this._loadMeterMachines();
			},
			_preStoreWeterFee:function(machine){
				uni.navigateTo({
					url:'/pages/meter/preStoreMeter?machineId='+machine.machineId+"&roomId="+machine.roomId
				})
			}
		}
	}
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
	/** //top: 80upx; **/
	.header_fixed {
		position: fixed;
		top: 0upx;
		left: 0;
		width: 100%;
		z-index: 2;
	}

	/*  #endif  */
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
</style>
