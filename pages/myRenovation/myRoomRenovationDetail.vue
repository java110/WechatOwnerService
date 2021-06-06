<template>
	<view>
		<view class="cu-form-group" @click="showRenovationRecord()">
			<view class="title">装修跟踪记录</view>
			点击查看>
		</view>
		<view class="block__title">用户信息</view>
		<view class="cu-form-group">
			<view class="title">名称</view>
			{{renovationDetail.personName}}
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			{{renovationDetail.personTel}}
		</view>
	
		<view class="block__title">房屋信息</view>
		<view class="cu-form-group">
			<view class="title">房屋号</view>
			{{renovationDetail.roomName}}
		</view>
		<view class="cu-form-group">
			<view class="title">开始时间</view>
			{{renovationDetail.startTime}}
		</view>
		<view class="cu-form-group">
			<view class="title">结束时间</view>
			{{renovationDetail.endTime}}
		</view>
		<view class="cu-form-group">
			<view class="title">当前进度</view>
			{{renovationDetail.stateName}}
		</view>
		<view class="btn-box" v-if="renovationDetail.state == 3000">
			<button type="default" class="btn-sub" @click="renovationComplete()">装修完成</button>
		</view>
	
		<view class="button_up_blank"></view>
	
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const factory = context.factory;
	import {compareDate} from '../../utils/DateUtil.js'
	import {updateRoomRenovationState} from '../../api/roomRenovation/roomRenovationApi.js'
	export default {
		data() {
			return {
				renovationDetail: {},
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
			_that.renovationDetail = JSON.parse(options.room);
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
			
			// 装修完成
			renovationComplete: function(){
				let _that = this;
				uni.showModal({
				    title: '提示',
				    content: '确定完成房屋装修',
				    success: function (res) {
				        if (res.confirm) {
							let params = _that.renovationDetail;
							updateRoomRenovationState(params).then(function(_res){
								uni.showToast({
									title: '操作成功'
								});
								setTimeout(function(){
									uni.navigateBack({})
								}, 1000);
							})
				        } else if (res.cancel) {
				            // do nothing
				        }
				    }
				});
			},
			
			/**
			 * 查看跟踪记录
			 */
			showRenovationRecord: function(){
				uni.navigateTo({
					url: '/pages/myRoomRenovationRecord/myRoomRenovationRecord?apply=' + JSON.stringify(this.renovationDetail)
				});
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
