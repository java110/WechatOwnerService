<template>
	<view>
		<view class="block__title">业主信息</view>
		<!-- <view class="cu-form-group">
			<view class="title">业主ID</view>
			{{ownerInfo.memberId}}
		</view> -->
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
		<!-- <view class="cu-form-group">
			<view class="title">房屋ID</view>
			{{roomDetail.roomId}}
		</view> -->
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
		<!-- <view class="cu-form-group">
			<view class="title">房间数</view>
			{{roomDetail.section}}个
		</view> -->
		<view class="cu-form-group">
			<view class="title">户型</view>
			{{roomDetail.apartment}}
		</view>
		<view class="cu-form-group">
			<view class="title">建筑面积</view>
			{{roomDetail.builtUpArea+'平方米'}}
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">单价</view>
			{{roomDetail.unitPrice+'元/平方米'}}
		</view> -->
		
		<view class="block__title">空置房申请信息填写</view>
		<view class="cu-form-group arrow">
			<view class="title">优惠类型</view>
			<picker mode="selector" :value="applyType" :range="applyTypes" range-key="typeName"  @change="applyTypeChange">
				<view class="picker">
					{{applyTypeShow?applyTypeShow:"请选择"}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">开始日期</view>
			<picker mode="date" :value="bindStartDate" start="2020-09-01" end="2050-09-01" @change="dateStartChange">
				<view class="picker">
					{{bindStartDate}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">结束日期</view>
			<picker mode="date" :value="bindEndDate" start="2020-09-01" end="2050-09-01" @change="dateEndChange">
				<view class="picker">
					{{bindEndDate}}
				</view>
			</picker>
		</view>
		<view class="btn-box">
			<button type="default" class="btn-sub" @click="subApply()">提交申请</button>
		</view>
	
		<view class="button_up_blank"></view>
	
	</view>
</template>

<script>
	// pages/my/myHouseDetail.js
	const context = require("../../context/Java110Context.js");
	const factory = context.factory;
	import {compareDate,addDay,date2String} from '../../utils/DateUtil.js'
	import {queryApplyRoomDiscountType,saveApplyRoomDiscount} from '../../api/applyRoom/applyRoomApi.js'
	export default {
		data() {
			return {
				ownerInfo: {},
				// 用户信息
				ownerFlag: false,
				// 是否有业主信息 标记 如果有为 true  没有为false
				roomDetail: {},
				bindStartDate: '请选择',
				bindEndDate: '请选择',
				createRemark: '空置房申请',
				applyType: '',
				applyTypeShow: '',
				applyTypes: [],
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
			_that.loadApplyRoomDiscountType();
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
			loadApplyRoomDiscountType: function(){
				let _that = this;
				let params = {
					communityId: this.roomDetail.communityId,
					page: 1,
					row: 50
				}
				queryApplyRoomDiscountType(params).then(function(types){
					_that.applyTypes = types;
				})
			},
			
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
			
			/**
			 * 类型修改
			 * @param {Object} e
			 */
			applyTypeChange: function(e){
				this.applyType = this.applyTypes[e.detail.value].applyType;
				this.applyTypeShow = this.applyTypes[e.detail.value].typeName;
			},
			
			/**
			 * 修改开始时间
			 * @param {Object} e
			 */
			dateStartChange: function(e) {
				this.bindStartDate = e.detail.value;
			},
			
			/**
			 * 修改结束时间
			 * @param {Object} e
			 */
			dateEndChange: function(e) {
				this.bindEndDate = e.detail.value;
			},
			
			/**
			 * 提交申请
			 */
			subApply: function(){
				if(this.applyType == ''){
					uni.showToast({
						title: '请选择优惠类型'
					});
					return;
				}
				if(this.bindStartDate == '请选择' || this.bindEndDate == '请选择'){
					uni.showToast({
						title: '请选择时间范围'
					});
					return;
				}
				if(!compareDate(this.bindEndDate, this.bindStartDate)){
					uni.showToast({
						title: '时间范围有误'
					});
					return;
				}
				
				let params = {
					startTime: this.bindStartDate,
					// endTime: this.bindEndDate + ' 23:59:59',
					// endTime: date2String(addDay(new Date(this.bindEndDate.replace(/-/g, "/")), 1)),
					endTime: this.bindEndDate,
					roomName: this.roomDetail.floorNum + '-' + this.roomDetail.unitNum + '-' + this.roomDetail.roomNum,
					roomId: this.roomDetail.roomId,
					communityId: this.ownerInfo.communityId,
					createUserName: this.ownerInfo.appUserName,
					createUserTel: this.ownerInfo.link,
					createRemark: this.createRemark,
					ardId: '',
					applyType: this.applyType
				}
				console.log(params);
				saveApplyRoomDiscount(params).then(function(_res){
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
