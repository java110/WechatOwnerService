<template>
	<view>
		<view class="cu-form-group" @click="showRecord()">
			<view class="title">跟踪记录</view>
			点击查看>
		</view>
		<view class="block__title">用户信息</view>
		<view class="cu-form-group">
			<view class="title">名称</view>
			{{applyDetail.createUserName}}
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			{{applyDetail.createUserTel}}
		</view>
	
		<view class="block__title">房屋信息</view>
		<view class="cu-form-group">
			<view class="title">房屋号</view>
			{{applyDetail.roomName}}
		</view>
		<view class="cu-form-group">
			<view class="title">开始时间</view>
			{{applyDetail.startTime}}
		</view>
		<view class="cu-form-group">
			<view class="title">结束时间</view>
			{{applyDetail.endTime}}
		</view>
		<view class="cu-form-group">
			<view class="title">当前进度</view>
			{{applyDetail.stateName}}
		</view>
		<uploadImage v-if="applyDetail.urls.length > 0" ref="vcUploadRef" :maxPhotoNum="maxPhotoNum" :sendImgList="sendImgList" :canEdit="canEdit" :title="imgTitle"></uploadImage>
	
		<view class="button_up_blank"></view>
	
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	import {queryApplyRoomDiscount} from '../../api/applyRoom/applyRoomApi.js'	
	import uploadImage from "../../components/vc-upload/vc-upload.vue";	
	const factory = context.factory;
	export default {
		data() {
			return {
				applyDetail: {},
				maxPhotoNum: 4,
				sendImgList: [],
				canEdit: false,
				imgTitle: '图片材料'
			};
		},

		components: {
			uploadImage
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			
			let params = {
				communityId: options.communityId,
				page: 1,
				row: 1,
				ardId: options.ardId
			}
			queryApplyRoomDiscount(params).then(function(_res){
				_that.applyDetail = _res.data[0];
				_that.sendImgList = _res.data[0].urls;
			})
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
			/**
			 * 查看跟踪记录
			 */
			showRecord: function(){
				let apply = {
					communityId: this.applyDetail.communityId,
					roomName: this.applyDetail.roomName,
					roomId: this.applyDetail.roomId,
					ardId: this.applyDetail.ardId,
				}
				uni.navigateTo({
					url: '/pages/myApplyRoom/myApplyRoomRecord?apply=' + JSON.stringify(apply)
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
