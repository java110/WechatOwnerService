<template>
	<view>
		<view class="block__title">业主信息</view>
		<view class="cu-form-group">
			<view class="title">名称</view>
			{{userName}}
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			{{userTel}}
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
		<view class="block__title">装修申请信息填写</view>
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
			<view class="title">装修单位</view>
			<input type="text" v-model="renovationCompany" placeholder="请输入装修单位">
		</view>
		<view class="cu-form-group">
			<view class="title">装修负责人</view>
			<input type="text" v-model="personMain" placeholder="请输入装修负责人">
		</view>
		<view class="cu-form-group">
			<view class="title">负责人电话</view>
			<input type="text" v-model="personMainTel" placeholder="请输入负责人电话">
		</view>
		<view class="cu-form-group">
			<view class="title">装修详情</view>
			<input type="text" v-model="remark" placeholder="请输入装修详情">
		</view>
		<view class="btn-box">
			<button type="default" class="btn-sub" @click="subApply()">提交申请</button>
		</view>
	
		<view class="button_up_blank"></view>
	
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	// const constant = context.constant;
	// const factory = context.factory;
	import {compareDate} from '../../lib/java110/utils/DateUtil.js'
	import {checkPhoneNumber} from '../../lib/java110/utils/StringUtil.js'
	import {saveRoomRenovation} from '../../api/roomRenovation/roomRenovationApi.js';
	import {getUserId,getUserName,getUserTel} from '../../api/user/userApi.js';
	import {getCommunityId} from '../../api/community/communityApi.js'
	export default {
		data() {
			return {
				ownerInfo: {},
				ownerFlag: false,
				roomDetail: {},
				startTime: '请选择',
				endTime: '请选择',
				remark: '',
				isPostpone: 'N',
				renovationCompany: '',
				personMain: '',
				personMainTel: '',
				// admin: {},
				property: {},
				userName:'',
				userTel:''
			};
		},


		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			_that.roomDetail = JSON.parse(options.room);
			_that.loadOwenrInfo();
			this.userName = getUserName();
			this.userTel = getUserTel()
		},


		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			loadOwenrInfo: function() {
				let _that = this;
				
				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						_that.ownerFlag = true;
						//_that.ownerInfo = _ownerInfo;
						_that._loadProperty();
					} else {
						_that.ownerFlag = false;
					}
				});
			},
			_loadProperty: function() {
				let _that = this;
				context.getProperty()
					.then(function(_property) {
						_that.property = _property;
					});
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
				let msg = '';
				if(this.startTime == '请选择' || this.endTime == '请选择'){
					msg = '请选择时间范围';
				}else if(!compareDate(this.endTime, this.startTime)){
					msg = '时间范围有误';
				}else if(this.renovationCompany == ''){
					msg = '请填写装修单位';
				}else if(this.personMain == ''){
					msg = '请填写装修负责人';
				}else if(this.personMainTel == '' || !checkPhoneNumber(this.personMainTel)){
					msg = '负责人电话有误';
				}else if(this.remark == ''){
					msg = '请填写装修详情';
				}
				
				if(msg != ''){
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					return;
				}
				
				let params = {
					startTime: this.startTime,
					endTime: this.endTime,
					roomName: this.roomDetail.floorNum + '-' + this.roomDetail.unitNum + '-' + this.roomDetail.roomNum,
					roomId: this.roomDetail.roomId,
					communityId: getCommunityId(),
					personName: this.userName,
					personTel: this.userTel,
					remark: this.remark,
					rId: '',
					userId: '',
					isPostpone: this.isPostpone,
					renovationCompany: this.renovationCompany,
					personMain: this.personMain,
					personMainTel: this.personMainTel,
					storeId: this.property.storeId,
				}
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
