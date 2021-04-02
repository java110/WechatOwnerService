<template>
	<view>
		<view class="block__title">业主信息</view>
		<view class="cu-form-group">
			<view class="title">名称</view>
			{{ownerInfo.appUserName}}
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			{{ownerInfo.idCard}}
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			{{ownerInfo.link}}
		</view>
	
		<view class="block__title">房屋信息</view>
		<view class="cu-form-group">
			<view class="title">楼栋</view>
			{{roomDetail.floorNum}}号楼
		</view>
		<view class="cu-form-group">
			<view class="title">单元</view>
			{{roomDetail.unitNum}}单元
		</view>
		<view class="cu-form-group">
			<view class="title">房屋编号</view>
			{{roomDetail.roomNum}}室
		</view>
	
		<view class="cu-form-group">
			<view class="title">楼层</view>
			{{roomDetail.layer+'层'}}
		</view>
		<view class="cu-form-group">
			<view class="title">户型</view>
			{{roomDetail.apartment}}
		</view>
		<view class="cu-form-group">
			<view class="title">建筑面积</view>
			{{roomDetail.builtUpArea+'平方米'}}
		</view>
		<view class="block__title">空置房申请信息填写</view>
		<view class="cu-form-group arrow">
			<view class="title">开始日期</view>
			<picker mode="date" :value="startTime" start="2020-09-01" end="2050-09-01" @change="dateStartChange">
				<view class="picker">
					{{startTime}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">结束日期</view>
			<picker mode="date" :value="endTime" start="2020-09-01" end="2050-09-01" @change="dateEndChange">
				<view class="picker">
					{{endTime}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">备注</view>
			<input type="text" :value="remark" @input="bindRemarkInput" placeholder="请输入备注">
		</view>
		<view class="btn-box">
			<button type="default" class="btn-sub" @click="subApply()">提交申请</button>
		</view>
	
		<view class="button_up_blank"></view>
	
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const factory = context.factory;
	import {compareDate} from '../../utils/DateUtil.js'
	import {saveRoomRenovation} from '../../api/roomRenovation/roomRenovationApi.js'
	export default {
		data() {
			return {
				ownerInfo: {},
				ownerFlag: false,
				roomDetail: {},
				startTime: '请选择',
				endTime: '请选择',
				remark: '',
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			_that.roomDetail = JSON.parse(options.room);
			_that.loadOwenrInfo();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			
			loadOwenrInfo: function() {
				let _that = this;

				context.getOwner(function(_ownerInfo) {
					console.log(_ownerInfo);

					if (_ownerInfo) {
						_that.ownerFlag = true;
						_that.ownerInfo = _ownerInfo;
					} else {
						_that.ownerFlag = false;
					}
				});
			},
			
			// 备注输入
			bindRemarkInput: function(e){
				this.remark = e.detail.value;
			},
			
			// 修改开始时间
			dateStartChange: function(e) {
				this.startTime = e.detail.value;
			},
			
			// 修改结束时间
			dateEndChange: function(e) {
				this.endTime = e.detail.value;
			},
			
			// 提交申请
			subApply: function(){
				if(this.startTime == '请选择' || this.endTime == '请选择'){
					uni.showToast({
						title: '请选择时间范围'
					});
					return;
				}
				if(!compareDate(this.endTime, this.startTime)){
					uni.showToast({
						title: '时间范围有误'
					});
					return;
				}
				
				let params = {
					startTime: this.startTime,
					endTime: this.endTime,
					roomName: this.roomDetail.floorNum + '-' + this.roomDetail.unitNum + '-' + this.roomDetail.roomNum,
					roomId: this.roomDetail.roomId,
					communityId: this.ownerInfo.communityId,
					personName: this.ownerInfo.appUserName,
					personTel: this.ownerInfo.link,
					remark: this.remark,
					rId: '',
					userId: ''
				}
				console.log(params);
				saveRoomRenovation(params).then(function(_res){
					uni.showToast({
						title: '申请成功'
					});
					setTimeout(function(){
						uni.navigateBack({})
					}, 1000);
				})
			}
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
	
	.block__bottom {
		height: 180rpx;
	}
	
	.btn-box{
		padding: 30rpx 0;
	}
	.btn-sub{
		width: 80%;
		margin: 0 auto;
		background-color: #1F8DEE!important;
		color: #fff!important;
	}
</style>
