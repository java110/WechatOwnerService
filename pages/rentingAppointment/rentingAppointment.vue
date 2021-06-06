<template>
	<view>
		<view class="block__title">预约信息</view>
		<view class="cu-form-group">
			<view class="title">名称</view>
			<input v-model="userName" placeholder="必填,请填写名称" class="text-right"></input>
		</view>
		<view class="cu-form-group" >
			<view class="title">性别</view>
			<picker bindchange="PickerChange" :value="index" :range="sexCloums" @change="sexChange">
				<view class="picker">
					{{sexName?sexName:'请选择'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group" >
			<view class="title">电话</view>
			<input v-model="tel" style="text-align:right" placeholder="必填,请填写手机号"></input>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">预约日期</view>
			<picker mode="date" :value="bindDate" start="2020-09-01" end="2050-09-01" @change="dateChange">
				<view class="picker">
					{{bindDate}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">预约时间</view>
			<picker mode="time" :value="bindTime" start="08:30" end="22:00" @change="timeChange">
				<view class="picker">
					{{bindTime}}
				</view>
			</picker>
		</view>
	
		<view class="button_up_blank"></view>

		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitAppointment()">提交</button>
		</view>

	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");

	import {appointmentRoom} from '../../api/room/roomApi.js'
	

	export default {
		data() {
			return {
				roomId:'',
				userName:'',
				sexCloums: ['男','女'],
				sexIds:['0','1'],
				sex:'',
				tel:'',
				sexName:'请选择',
				bindDate: '请选择',
				bindTime: '请选择',
			};
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			this.vc.onLoad(options);
			this.roomId = options.roomId;
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			submitAppointment: function() {
				let _that = this;
				//{"appointmentId":"","tenantName":"张默默","tenantSex":"0","tenantTel":"18909711234",
				//"appointmentTime":"2020-09-30 01:05:00","appointmentRoomId":"752020080500600202","remark":""}
				let obj = {
					"appointmentId": "",
					"appointmentRoomId": this.roomId,
					"tenantName": this.userName,
					"tenantSex": this.sex,
					"tenantTel": this.tel,
					"appointmentTime": this.bindDate+" " + this.bindTime + ":00"
				}
				
				appointmentRoom(obj)
				.then((res)=>{
					uni.showToast({
						icon:'none',
						title:'预约成功'
					})
					//跳转页面
					_that.vc.navigateBack();
					
				},(error)=>{
					uni.showToast({
						icon:'none',
						title:error
					})
				})
			},
			sexChange: function(e) {
				let _that = this;
				this.sex = this.sexIds[e.detail.value];
				this.sexName = this.sexCloums[e.detail.value];
			},
			dateChange: function(e) {
				this.bindDate = e.detail.value;
			},
			timeChange: function(e) {
				this.bindTime = e.detail.value;
			},
			
		}
	};
</script>
<style>
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}
</style>
