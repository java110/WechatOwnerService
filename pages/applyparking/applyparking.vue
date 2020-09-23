<template>
	<view>
		<view class="block__title">车位申请</view>
		<view class="cu-form-group">
			<view class="title">空闲车位</view>
			<picker bindchange="PickerChange" :value="index" :range="roomCloums" @change="roomChange">
				<view class="picker">
					{{roomName?roomName:'请选择'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">车牌号</view>
			<input v-model="builtUpArea" style="text-align:right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">品牌</view>
			<input v-model="apartment" style="text-align:right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">颜色</view>
			<input v-model="layer" style="text-align:right"></input>
		</view>



		<view class="button_up_blank"></view>

		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg">提交</button>
		</view>

	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;


	export default {
		data() {
			return {
				rooms: [],
				apartment: '',
				builtUpArea: '',
				layer: '',
				price: '',
				roomCloums: [],
				roomIdArr: [],
				roomName: "",
				roomId: '',
				roomShow: false,
				imgList: [],
				userTel: '',
				page: 1,
				row: 7,
				userName: '',
				photos: [],
				communityId: "",
				communityName: "",
				paymentTypes: [{
					id: '1001',
					paymentTypeName: '押一付一'
				}, {
					id: '2002',
					paymentTypeName: '押一付三'
				}, {
					id: '3003',
					paymentTypeName: '押一付六'
				}],
				paymentTypeIndex: 0,
				paymentType: '1001',
				paymentTypeName: '',
				checkIns: [{
					id: '1001',
					checkInName: '立即入住'
				}, {
					id: '2002',
					checkInName: '预约'
				}],
				checkInIndex: 0,
				checkIn: '1001',
				checkInName: '',
				rentingTypes: [],
				rentingTypeIndex: 0,
				rentingType: '',
				rentingTypeName: '',
				rentingConfigId: '',
				servicePrice: '',
				rentingDesc: '',
				rentingTitle: ''
			};
		},
		onLoad: function(options) {
			let that = this;
			this.listParkingSpace();
		},

		onShareAppMessage: function() {},
		methods: {
			submitHireRoom: function() {
				let _that = this;
				let obj = {
					"rentingTitle": this.rentingTitle,
					"roomId": this.roomId,
					"communityId": this.communityId,
					"price": this.price,
					"paymentType": this.paymentType,
					"rentingConfigId": this.rentingConfigId,
					"photos": [],
					"rentingDesc": this.rentingDesc,
					"ownerTel": this.userTel,
					"ownerName": this.userName,
					"state": "0",
					"checkIn": this.checkIn
				}
				let _photos = this.photos;
				_photos.forEach(function(_item) {
					obj.photos.push({
						"photo": _item
					});
				});

				hireRoom(obj)
					.then((res) => {
						//跳转页面
						_that.vc.navigateBack();

					}, (error) => {
						console.log(error);
						uni.showToast({
							icon: 'none',
							title: error
						})
					})
			},
			listParkingSpace: function() {
				let _this = this;
				let _paramIn = {
					"page": _this.page,
					"row": _this.row
				};
				context.request({
					url: constant.url.searchParkingSpace,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: (res) => {
						console.log(res)
					},
					fail(res) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
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
</style>
