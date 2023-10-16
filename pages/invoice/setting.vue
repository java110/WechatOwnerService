<template>
	<view>
		<view class="block__title">发票设置</view>
		<view class="cu-form-group">
			<view class="title">发票类型</view>
			<picker bindchange="PickerChange" :value="invoiceTypeIndex" :range="invoiceTypes" :range-key="'name'"
				@change="invoiceTypeChange">
				<view class="picker">
					{{invoiceTypeIndex == -1?'请选择':invoiceTypes[invoiceTypeIndex].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">发票名头</view>
			<input v-model="invoiceName" placeholder="请输入发票名头" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">纳税人识别号</view>
			<input v-model="invoiceNum" placeholder="请输入纳税人识别号" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">地址、电话</view>
			<input v-model="invoiceAddress" placeholder="请输入地址、电话" class="text-right"></input>
		</view>

		<view class="flex flex-direction padding">
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="_updateOwnerInvoice()" v-if="oiId">提交</button>
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="_saveOwnerInvoice()" v-else>提交</button>
		</view>
	</view>
</template>

<script>
	import {
		getOwnerId
	} from '@/api/owner/ownerApi.js';
	import {
		getOwnerInvoice,
		saveOwnerInvoice,
		updateOwnerInvoice
	} from '@/api/invoice/invoiceApi.js';
	import {
		getCommunityId
	} from '@/api/community/communityApi.js'
	export default {
		data() {
			return {
				invoiceTypeIndex: -1,
				invoiceTypes: [{
					name: '个人',
					value: '1001'
				}, {
					name: '企业',
					value: '2002'
				}],
				invoiceType: '',
				invoiceName: '',
				invoiceNum: '',
				invoiceAddress: '',
				ownerId: '',
				oiId:''

			}
		},
		onLoad(options) {

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

		},
		methods: {
			invoiceTypeChange: function(e) {
				this.invoiceTypeIndex = e.target.value //取其下标
				let selected = this.invoiceTypes[this.invoiceTypeIndex] //获取选中的数组
				this.invoiceType = selected.value; //选中的id
			},
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
					if(_that.invoiceType == '1001'){
						_that.invoiceTypeIndex = 0;
					}else{
						_that.invoiceTypeIndex = 1;
					}
				})
			},
			_saveOwnerInvoice: function() {
				saveOwnerInvoice({
					invoiceType:this.invoiceType,
					invoiceName:this.invoiceName,
					invoiceNum:this.invoiceNum,
					invoiceAddress:this.invoiceAddress,
					ownerId:this.ownerId,
					communityId: getCommunityId(),
				}).then(_data =>{
					uni.showToast({
						icon:'none',
						title:_data.msg
					});
					if(_data.code == 0){
						uni.navigateBack();
					}
				})
			},
			_updateOwnerInvoice: function() {
				updateOwnerInvoice({
					invoiceType:this.invoiceType,
					invoiceName:this.invoiceName,
					invoiceNum:this.invoiceNum,
					invoiceAddress:this.invoiceAddress,
					ownerId:this.ownerId,
					oiId:this.oiId,
					communityId: getCommunityId(),
				}).then(_data =>{
					uni.showToast({
						icon:'none',
						title:_data.msg
					});
					if(_data.code == 0){
						uni.navigateBack();
					}
				})
			}
		}
	}
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