<template>
	<view>
		<view class="block__title">用户信息</view>
		<view class="cu-form-group">
			<view class="title">名称</view>
			{{renovationDetail.personName}}
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			{{renovationDetail.personTel}}
		</view>

		<view class="block__title">场地信息</view>
		<view class="cu-form-group">
			<view class="title">场馆</view>
			{{renovationDetail.venueName}}
		</view>
		<view class="cu-form-group">
			<view class="title">场地</view>
			{{renovationDetail.spaceName}}
		</view>
		<view class="cu-form-group">
			<view class="title">时间</view>
			{{ this.HoursStr(renovationDetail.hours) }}
		</view>
		<view class="cu-form-group">
			<view class="title">核销状态</view>
			{{StateStr(renovationDetail.state)}}
		</view>
		<view class="cu-form-group">
			<view class="title">预约日期</view>
			{{renovationDetail.appointmentTime}}
		</view>
		<view v-if="renovationDetail.state == 'W'">
			<view class="qrcode">
				<image :src="qrcode" style="width: 300rpx;height: 300rpx;"></image>
			</view>
			<view id="canvas">
				<canvas canvas-id="qrcode" style="width: 300rpx;margin: 0 auto;"/>
			</view>
			<view class="text-center">
				<view>出示二维码核销</view>
				<view>{{renovationDetail.timeId}}</view>
			</view>
			<!-- <text >{{renovationDetail}}</text> -->

		</view>
		<view class="button_up_blank"></view>

	</view>
</template>

<script>
	import uQRCode from '@/lib/uqrcide.js' //引入uqrcode.js

	import context from '../../lib/java110/Java110Context.js';
	const factory = context.factory;
	import {
		compareDate
	} from '../../lib/java110/utils/DateUtil.js'
	import {
		updateRoomRenovationState
	} from '../../api/roomRenovation/roomRenovationApi.js'
	export default {
		data() {
			return {
				renovationDetail: {},
				text: '',
				qrcode: '',
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
			// debugger
			_that.renovationDetail = JSON.parse(options.books);
			_that.text = _that.renovationDetail.timeId;
			_that.uQRCodes()
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
			StateStr(s) {
				if (s == "W") {
					return "待核销";
				}
				if (s == "C") {
					return "已核销";
				}
				if (s == "Y") {
					return "已退款"
				}
				if (s == "T") {
					return "申请退款"
				}
			},
			// 时间转换
			HoursStr(hours) {
				let hourSlot = hours + ":00-" + (Number(hours) + 1) + ":00";
				return hourSlot;
			},
			uQRCodes() {
				let  _that = this
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: _that.renovationDetail.timeId,
					size: 150,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						console.log(res)
						_that.qrcode = res
					}
				})
			}

		}
	};
</script>

<style>
	#canvas{
	  position: fixed;
	  top: -9999999999999rpx;
	}
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

	.btn-box {
		padding: 30rpx 0;
	}

	.btn-sub {
		width: 80%;
		margin: 0 auto;
		background-color: #1F8DEE !important;
		color: #fff !important;
	}

	.qrcode {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		background-color: #fff;
		margin-left: calc(50vw - 150rpx - 10px);
		width: 360rpx;
		padding: 30rpx;
		border-radius: 20rpx;
	}
</style>
