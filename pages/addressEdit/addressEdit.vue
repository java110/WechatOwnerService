<template>
	<view>
		<view class="content_box">
			<view class="cu-form-group">
				<view class="title">收货人</view>
				<input v-model="username" placeholder="请输入收货人" class="text-right"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input v-model="tel" placeholder="请输入手机号" type="number" class="text-right"></input>
			</view>
			<view class="cu-form-group arrow">
				<view class="title">市/区</view>
				<pickerAddress @change="change" class="text-right" style="width:80%">{{areaName}}</pickerAddress>
				<text class='cuIcon-right'></text>
			</view>
			<view class="cu-form-group margin-top">
				<textarea v-model="address" placeholder="请输入详细地址"></textarea>
			</view>
			<view class="default-box flex justify-between align-center">
				<text class="title">设为默认地址</text>
				<switch class="olive switch" @tap="onSwitch" :class="{ checked: isDefault }" :checked="isDefault"></switch>
			</view>
		</view>
		<view v-if="addressId != 0" class="foot_box x-bc">
			<button class="cu-btn delete-btn" @tap="deleteAddress">删除收货地址</button>
			<button class="cu-btn save-btn" @tap="editAddress">保存收货地址</button>
		</view>
		<view v-else class="foot_box "><button class="cu-btn add-btn" @tap="editAddress">保存收货地址</button></view>
		<shopro-picker ref="shoproCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></shopro-picker>
	</view>
</template>

<script>
	import pickerAddress from '../../components/pickerAddress/pickerAddress.vue';
	
	import {saveUpdateUserAddress} from '../../api/owner/ownerApi.js';
	
	export default {
		components: {pickerAddress},
		data() {
			return {
				addressId: 0,
				userId: '',
				username: '',
				tel: '',
				areaCode: '',
				address: '',
				isDefault: false,
				areaName:'请选择地区'
			};
		},
		computed: {
			
		},
		onLoad() {
			
		},
		methods: {
			onSwitch() {
				this.isDefault = !this.isDefault;
			},
			change: function(data) {
				let _that = this;
				_that.areaName = '';
			
				data.data.forEach(function(_obj) {
					_that.areaName += _obj.name;
				});
				_that.areaCode = data.data[2].code;
			},
			// 编辑添加地址
			editAddress() {
				let that = this;
				let data = {
					addressId:that.addressId == 0 ? '-1':that.addressId,
					userId:that.userId,
					areaCode:that.areaCode,
					tel:that.tel,
					address:that.address,
					isDefault:that.isDefault
				};
				saveUpdateUserAddress(data)
				.then((data) =>{
					
				})
				
			},
			// 地址信息
			getAddressInfo() {
				this.$api('address.info', {
					id: this.addressData.id
				}).then(res => {
					if (res.code === 1) {
						let data = res.data;
						let areaText = `${data.province_name}-${data.city_name}-${data.area_name}`;
						let is_default = data.is_default === '1' ? true : false;
						this.addressData = res.data;
						this.area_text = areaText;
						this.addressData.is_default = is_default;
					}
				});
			},
			onConfirm(e) {
				this.addressData.area_id = e.cityCode;
				this.area_text = e.label;
			},
			onCancel(e) {
				this.addressData.area_id = e.cityCode;
				this.area_text = e.label;
			},
			// 删除收货地址
			deleteAddress() {
				this.$api('address.del', {
					id: this.addressData.id
				}).then(res => {
					if (res.code === 1) {
						uni.showToast({
							title: '删除成功',
							icon: 'none',
							success: () => {
								uni.navigateBack({
									delta: 1
								});
							}
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	// 点击定位

	.location-item {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		background-color: #fff;
		color: rgba(167, 111, 13, 1);

		.address-box {
			border-radius: 6rpx;
			height: 72rpx;
			padding: 0 30rpx;
			width: 340rpx;
		}

		.cuIcon-focus,
		.cuIcon-location {
			font-size: 34rpx;
			margin-right: 10rpx;
		}

		.cuIcon-right {
			font-size: 32rpx;
		}
	}

	.address-item {
		height: 96rpx;
		background: #fff;
		border-bottom: 1rpx solid rgba(#dfdfdf, 0.5);
		padding: 0 25rpx;

		.item-title {
			color: #333;
			font-size: 28rpx;
			white-space: nowrap;
		}

		.inp {
			color: #333;
			font-size: 28rpx;
		}
	}

	.area-box {
		min-height: 120rpx;
		padding-bottom: 60rpx;
		background: #fff;
		padding: 30rpx 25rpx;

		.item-title {
			font-size: 28rpx;
			line-height: 28rpx;
			vertical-align: middle;
			white-space: nowrap;
		}

		.area-inp {
			color: #333;
			font-size: 28rpx;
			vertical-align: middle;
			margin-top: 8rpx;
			width: 550rpx;
		}
	}

	.default-box {
		height: 100rpx;
		padding: 0 25rpx;
		background: #fff;
		margin-top: 20rpx;

		.title {
			font-size: 28rpx;
		}

		.switch {
			transform: scale(0.8);
		}
	}

	.foot_box {
		padding: 20rpx;

		.add-btn {
			width: 710rpx;
			height: 80rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			border: 1rpx solid rgba(238, 238, 238, 1);
			border-radius: 40rpx;
			color: rgba(#fff, 0.9);
		}

		.delete-btn {
			width: 432rpx;
			height: 70rpx;
			background: linear-gradient(93deg, rgba(208, 19, 37, 1), rgba(237, 60, 48, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(#ed3c30, 0.22);
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			border-radius: 35rpx;
			padding: 0;
			margin-right: 20rpx;
		}

		.save-btn {
			width: 432rpx;
			height: 70rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			border: 1rpx solid rgba(238, 238, 238, 1);
			border-radius: 40rpx;
			color: rgba(#fff, 0.9);
		}
	}
</style>
