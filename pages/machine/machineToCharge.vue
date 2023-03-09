<template>
	<view class="">

		<view class="flex justify-between mtc-machine">
			<view>{{machineName}}({{machineCode}})</view>
			<view>插槽数:{{portCount}}</view>
		</view>
		<view class="flex justify-start mtc-machine-port">
			<view v-for="(item,index) in  ports" :key="index" class="port-item">
				<view class="item-1" :class="{'item-1-active':curPort.portId == item.portId}" @click="_switchPort(item)">
					<view class="port-name">
						{{item.portName}}
					</view>
					<view class="port-state">({{item.stateName}})</view>
				</view>
			</view>
		</view>
		<view class=" mtc-hours-title">
			<view>充电时长</view>
		</view>
		<view class="flex justify-start mtc-machine-hours">
			<view v-for="(item,index) in  hours" :key="index" class="hours-item">
				<view class="item-1" :class="{'item-1-active':curHours.duration == item.duration}" @click="_switchHours(item)">
					<view class="port-name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="plat-btn-black"></view>
		<view class="cu-bar btn-group" style="margin-top: 30px;">
			<button @click="_toCharge" :disabled="!curHours.duration || !curPort.portId"
				class="cu-btn bg-green shadow-blur round lg">去充电</button>
		</view>

	</view>
</template>

<script>
	import {
		getChargeMachines,
		getChargeMachinePort
	} from '../../api/machine/machineApi.js';
	export default {
		data() {
			return {
				machineId: '',
				communityId: '',
				machineCode: '',
				machineName: '',
				portCount: '',
				durationPrice: '',
				ports: [],
				curPort:{},
				curHours:{},
				hours:[{
					name:'充满自停',
					duration:999,
				},{
					name:'2小时',
					duration:2,
				},{
					name:'4小时',
					duration:4,
				},{
					name:'6小时',
					duration:6,
				},{
					name:'8小时',
					duration:8,
				},{
					name:'10小时',
					duration:10,
				}]
			}
		},
		onLoad(options) {
			this.machineId = options.machineId;
			this.communityId = options.communityId;
			this._loadChargeMachines();
			this._loadChargeMachinePorts();
		},
		methods: {
			_loadChargeMachines: function() {
				let _that = this;
				getChargeMachines({
					page: 1,
					row: 1,
					machineId: this.machineId,
					communityId: this.communityId
				}).then(_data => {
					//_that.machines = _data.data;
					_that.machineCode = _data.data[0].machineCode;
					_that.machineName = _data.data[0].machineName;
					_that.portCount = _data.data[0].portCount;
					_that.durationPrice = _data.data[0].durationPrice;
				})
			},
			_loadChargeMachinePorts: function() {
				let _that = this;
				getChargeMachinePort({
					page: 1,
					row: 100,
					machineId: this.machineId,
					communityId: this.communityId
				}).then(_data => {
					_that.ports = _data.data;
				})
			},
			_toCharge:function(){
				
				uni.navigateTo({
					url:'/pages/machine/chargeSuccess?machineId='+this.machineId+"&communityId="+this.communityId
				})
			},
			
			_switchPort:function(_port){
				if(!_port.state == 'FREE'){
					return;
				}
				this.curPort = _port;
			},
			_switchHours:function(_hours){
				this.curHours = _hours;
			}
		}
	}
</script>

<style lang="scss">
	.mtc-machine{
		background-color: #fff;
		font-size: 28upx;
		color: #000;
		padding-left: 20upx;
		padding-right: 20upx;
		margin:20upx 20upx 0upx 20upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		height: 60upx;
		line-height: 60upx;
		border-bottom: 2upx;
	}
	.mtc-machine-port{
		background-color: #fff;
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 20upx;
		margin:2upx 20upx 0upx 20upx;
		
		flex-wrap: wrap;
		.port-item{
			width: 33.33%;
			text-align: center;
			.item-1{
				background-color: #B1E8DA;
				width: 90%;
				margin:0upx auto;
				margin-top: 20upx;
				border-radius: 10upx;
				color: #fff;
				.port-name{
					font-size: 28upx;
				}
				.port-state{
					font-size: 24upx;
				}
			}
			.item-1-active{
				background-color: #0FBA82;
			}
		}
	}
	
	.mtc-hours-title{
		background-color: #fff;
		font-size: 28upx;
		color: #000;
		padding-left: 20upx;
		padding-right: 20upx;
		margin:20upx 20upx 0upx 20upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		height: 60upx;
		line-height: 60upx;
		border-bottom: 2upx;
	}
	.mtc-machine-hours{
		background-color: #fff;
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 20upx;
		margin:2upx 20upx 0upx 20upx;
		
		flex-wrap: wrap;
		
		.hours-item{
			width: 33.33%;
			text-align: center;
			.item-1{
				border:1px solid #000 ;
				width: 90%;
				margin:0upx auto;
				margin-top: 20upx;
				border-radius: 10upx;
				color: #000;
				.port-name{
					font-size: 28upx;
				}
			}
			.item-1-active{
				border:1px solid #0FBA82 ;
				background-color: #0FBA82;
				color: #fff;
			}
		}
	}
</style>
