<template>
	<view>
		<swiper class="ad-swiper bg-white" indicator-dots="true" indicator-color="rgba(228,228,228,1)" indicator-active-color="#FECA49"
		 autoplay="true" interval="5000" duration="1000" circular="true">
			<block v-for="(item, index) in rentingPhotos" :key="index">
				<swiper-item>
					<image :src="item"></image>
				</swiper-item>
			</block>
		</swiper>

		<view class="flex justify-between padding  bg-white border-bottom">
			<view class="renting-title">
				<view>
					<text class="text-lx">{{renting.rentingTitle}}</text>
				</view>
				<view>
					<text class="text-xs">{{renting.paymentTypeName}}</text>
				</view>
			</view>
			<view>
				<text class="text-lx text-red">{{renting.price}}元/月</text>
			</view>
		</view>

		<view class="flex justify-between padding-xl bg-white">
			<view class="text-center">
				<view>
					<text>{{renting.apartmentName}}</text>
				</view>
				<view>
					<text class="text-xs">户型</text>
				</view>
			</view>
			<view class="text-center">
				<view>
					<text>{{renting.builtUpArea}}平方米</text>
				</view>
				<view>
					<text class="text-xs">面积</text>
				</view>
			</view>
			<view class="text-center">
				<view>
					<text>1层</text>
				</view>
				<view>
					<text class="text-xs">楼层</text>
				</view>
			</view>
			<view class="text-center">
				<view>
					<text>有</text>
				</view>
				<view>
					<text class="text-xs">电梯</text>
				</view>
			</view>

		</view>
		<view class="flex justify-between margin-top-sm bg-white padding border-bottom">
			<view>
				<text>租房方式：</text>
				<text>{{renting.rentingType == '3344'?'整租':'合租'}}</text>
			</view>
			<view>
				<text>入驻日期：</text>
				<text>{{renting.checkIn == '1001'?'立即入住':'入住预约'}}</text>
			</view>
		</view>
		<view class="flex justify-between bg-white padding">
			<view>
				<text>出租小区：</text>
				<text>{{renting.communityName}}</text>
			</view>
		</view>

		<view class="bg-white padding margin-top">
			<view>
				<text>房源描述</text>
			</view>
			<view>
				<text class="text-xs">
					{{renting.rentingDesc}}
				</text>
			</view>
		</view>
		<view class=" bg-white  border flex justify-end" style="position: fixed;width: 100%;height:100upx;bottom: 0;">

			<view class="action text-orange margin-right flex align-center">
				<text>推荐预约看房</text>
			</view>
			<view class="flex btn-group align-center">
				<button class="cu-btn bg-orange shadow-blur lgplus sharp margin-right" @click="_doCall()">电话咨询</button>
				<button class="cu-btn bg-blue shadow-blur lgplus sharp margin-right" @click="_apppintment()">预约看房</button>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const default_img = '../../static/images/rentimage.jpg';
	import url from '../../constant/url.js';

	import {
		getRentingPool
	} from '../../api/room/roomApi.js'

	import {
		getAdmin
	} from '../../api/admin/adminApi.js'

	export default {
		data() {
			return {
				rentingPhotos: [],
				rentingId: '',
				renting: {},
				adminLink: ''
			};
		},
		onLoad(options) {
			this.rentingId = options.rentingId;
			this._loadRenting();
		},

		methods: {
			_loadRenting: function() {
				let _that = this;
				let _paramIn = {
					"page": 1,
					"row": 1,
					"rentingId": this.rentingId,
					"state": "1,2,3,4,5,7"
				};
				getRentingPool(_paramIn)
					.then((rentingPool) => {
						_that.renting = rentingPool[0];
						let _url = default_img;
						if (_that.renting.hasOwnProperty('photos') && _that.renting.photos.length > 0) {
							//_url = url.baseUrl + _that.renting.photos[0];
							//#ifndef H5
							_url = url.baseUrl + _that.renting.photos[0];
							//#endif
							// #ifdef H5
							_url =  _that.renting.photos[0];
							//#endif
						}
						_that.rentingPhotos.push(_url);
						_that._loadAdmin();
					})
			},
			_loadAdmin: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 1,
					communityId: _that.renting.communityId,
					memberTypeCd: '390001200000'
				};

				getAdmin(_objData)
					.then((_admin) => {
						_that.adminLink = _admin.tel;
					})
			},
			_doCall: function() {
				let _that = this;
				uni.makePhoneCall({
					// 手机号
					phoneNumber: _that.adminLink,
					// 成功回调
					success: (res) => {
						_that.callAdminModal = false;
					},

					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},
			_apppintment: function() {
				let _that = this;
				this.vc.navigateTo({
					url: '/pages/rentingAppointment/rentingAppointment?roomId=' + _that.renting.roomId
				})
			}

		}
	}
</script>

<style>

</style>
