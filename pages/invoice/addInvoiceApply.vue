<template>
	<view>
		<view v-if="oiId">
			<view class="block__title">发票抬头</view>
			<view class="cu-form-group">
				<view class="title">发票类型</view>
				<view><text>{{invoiceType=='1001'?'个人':'公司'}}</text></view>
			</view>
			<view class="cu-form-group">
				<view class="title">发票名头</view>
				<view><text>{{invoiceName}}</text></view>
			</view>
			<view class="cu-form-group">
				<view class="title">纳税人识别号</view>
				<view><text>{{invoiceNum}}</text></view>
			</view>
			<view class="cu-form-group">
				<view class="title">地址、电话</view>
				<view><text>{{invoiceAddress}}</text></view>
			</view>

			<view class="margin-top">
				<checkbox-group class="block" @change="checkboxChange($event)">
					<view class="cu-list menu" v-for="(item,index) in feeDetails" :key="index" :data-item="item">
						<view class="cu-item">
							<view class="content padding-tb-sm flex justify-start">
								<view>
									<checkbox :class="item.selected == '1'?'checked':''"
										:checked="item.selected == '1'?true:false" :value="item.detailId">
									</checkbox>
								</view>
								<view class="margin-left-sm">
									<view>
										<view class="text-cut" style="width:220px">{{item.feeName || '-'}}</view>
									</view>
									<view class="text-gray text-sm">
										<text class="margin-right-xs">{{item.startTime}}至{{item.endTime}}</text>
									</view>
								</view>
							</view>
							<view class="action">
								<text class="text-grey text-sm">金额:￥{{item.receivedAmount}}</text>
							</view>
						</view>
					</view>
				</checkbox-group>
			</view>

			<view style="height: 200upx;"></view>

			<view v-if="feeDetails.length > 0" class="bg-white  border flex justify-end"
				style="position: fixed;width: 100%;bottom: 0;">

				<view class="action text-orange margin-right line-height">

				</view>
				<view class="btn-group">
					<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="_submitInvoice()">提交订单</button>
				</view>
			</view>
		</view>
		<view v-else class="flex flex-direction padding">
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="_toSettings()">设置发票抬头</button>
		</view>
	</view>
</template>

<script>
	import {
		getOwnerId,
		getOwnerName
	} from '@/api/owner/ownerApi.js';
	import {
		getOwnerInvoice,
		saveInvoiceApply
	} from '@/api/invoice/invoiceApi.js';
	import {
		getCommunityId
	} from '@/api/community/communityApi.js';
	import {
		getFeeDetail
	} from '@/api/fee/feeDetailApi.js'
	export default {
		data() {
			return {
				detailId: '',
				invoiceType: '',
				invoiceName: '',
				invoiceNum: '',
				invoiceAddress: '',
				ownerId: '',
				oiId: '',
				detailIds: [],
				feeDetails: [],
			}
		},
		onLoad(options) {
			this.detailId = options.detailId;
			let _ownerId = getOwnerId();
			if (!_ownerId) {
				uni.showToast({
					icon: 'none',
					title: '业主不存在',
				})
				return;
			}
			this.ownerId = _ownerId;
			//todo 查询发票抬头
			this._getOwnerInvoice();
			this._loadFeeDetail();
		},
		methods: {
			_getOwnerInvoice: function() {
				let _that = this;
				getOwnerInvoice({
					page: 1,
					row: 1,
					communityId: getCommunityId(),
					ownerId: this.ownerId,
				}).then(_data => {
					if (!_data || _data.length < 1) {
						return;
					}
					_that.invoiceType = _data[0].invoiceType;
					_that.invoiceName = _data[0].invoiceName;
					_that.invoiceNum = _data[0].invoiceNum;
					_that.invoiceAddress = _data[0].invoiceAddress;
					_that.oiId = _data[0].oiId;

				})
			},
			_loadFeeDetail: function() {
				let _that = this;
				getFeeDetail({
					page: 1,
					row: 15,
					communityId: getCommunityId(),
					ownerId: this.ownerId,
					state: '1400',
					openInvoice:'D', 
				}).then(_details => {
					_details.forEach(function(_item) {
						_item.selected = "1";
						_that.detailIds.push(_item.detailId);
					})
					_that.feeDetails = _details;
				})
			},
			checkboxChange: function(e) {
				let _that = this;
				this.detailIds = e.detail.value;
				_that.feeDetails.forEach(function(_item) {
					_item.selected = "0";
					_that.detailIds.forEach(_detailId => {
						if (_item.detailId == _detailId) {
							_item.selected = "1";
						}
					});
				})
			},
			_submitInvoice: function() {
				let _that = this;
				if (!_that.detailIds || _that.detailIds.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '未选择缴费记录'
					});
					return;
				}
				saveInvoiceApply({
					invoiceAddress: _that.invoiceAddress,
					invoiceFlag: _that.invoiceFlag,
					invoiceName: _that.invoiceName,
					invoiceNum: _that.invoiceNum,
					invoiceType: _that.invoiceType,
					ownerId: _that.ownerId,
					ownerName: getOwnerName(),
					oiId: _that.oiId,
					detailIds: _that.detailIds,
					communityId: getCommunityId(),
				}).then(_data => {
					uni.showToast({
						icon: 'none',
						title: _data.msg
					})
					if (_data.code == 0) {
						uni.navigateTo({
							url: '/pages/invoice/invoiceApply'
						})
					}
				})
			},
			_toSettings:function(){
				uni.navigateTo({
					url:'/pages/invoice/invoice'
				})
			}
		}
	}
</script>

<style lang="scss">
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

	.cu-btn.lgplus {
		padding: 0 20px;
		font-size: 18px;
		height: 100upx;

	}

	.cu-btn.sharp {
		border-radius: 0upx;
	}
</style>