<template>
	<view class="">
		<view class="margin border-radius">
			<view class="cu-list menu">
				<view class="cu-item ">
					<view class="content">
						<text class="text-grey">开始时间</text>
					</view>
					<view class="action">
						{{startTime || 0}}
					</view>
				</view>
				<view class="cu-item ">
					<view class="content">
						<text class="text-grey">充电时间</text>
					</view>
					<view class="action">
						{{chargeHours  || 0}}
					</view>
				</view>
				<view class="cu-item ">
					<view class="content">
						<text class="text-grey">充电插槽</text>
					</view>
					<view class="action">
						{{portName || 0}}
					</view>
				</view>
				<view class="cu-item ">
					<view class="content">
						<text class="text-grey">计费模式</text>
					</view>
					<view class="action">
						{{durationPrice || 0}}元/小时
					</view>
				</view>
				<view class="cu-item ">
					<view class="content">
						<text class="text-grey">状态</text>
					</view>
					<view class="action">
						{{stateName || 0}}
					</view>
				</view>
			</view>
		</view>

		<view class="plat-btn-black"></view>
		<view class="cu-bar btn-group" style="margin-top: 30px;" v-if="state == '1001'">
			<button @click="_stopCharge" class="cu-btn bg-orange shadow-blur round lg">结束充电</button>
		</view>
	</view>
</template>

<script>
	import {
		getChargeMachines,
		stopCharge,
		getChargeMachineOrder
	} from '../../api/machine/machineApi.js';
	import {
		getCommunityId
	} from '../../api/community/communityApi.js'
	export default {
		data() {
			return {
				orderId: '',
				machineId:'',
				portId:'',
				startTime: '',
				chargeHours: '',
				portName: '',
				durationPrice: '',
				state: '',
				stateName: ''
			}
		},
		onLoad(options) {
			this.orderId = options.orderId;
			this._loadChargeMachineOrder();
		},
		methods: {
			_loadChargeMachineOrder:function(){
				let _that = this;
				getChargeMachineOrder({
					communityId:getCommunityId(),
					page:1,
					row:1,
					orderId:this.orderId
				}).then(_data =>{
					_that.machineId = _data[0].machineId;
					_that.portId= _data[0].portId;
					_that.startTime= _data[0].startTime;
					if(parseInt(_data[0].chargeHours) == 999){
						_that.chargeHours = '充满自停';
					}else{
						_that.chargeHours = parseInt(_data[0].chargeHours)+"小时";
					}
					_that.portName= _data[0].portName;
					_that.durationPrice= _data[0].durationPrice;
					_that.state= _data[0].state;
					_that.stateName= _data[0].stateName;
				})
			},
			_stopCharge: function() {
				let _that = this;
				stopCharge({
					orderId: this.orderId,
					machineId:this.machineId,
					portId:this.portId,
					communityId:getCommunityId()
				}).then(_data => {
					if(_data.code != 0){
						uni.showToast({
							icon:'none',
							title:_data.msg
						});
						return ;
					}
					_that._loadChargeMachineOrder();
				})
			}
		}
	}
</script>

<style lang="scss">
	.border-radius{
		border-radius: 20upx;
	}
</style>
