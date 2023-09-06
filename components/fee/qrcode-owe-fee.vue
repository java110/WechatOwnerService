<template>
	<view>
		<scroll-view scroll-y style="padding-bottom: 200rpx;" v-if="customFee == 'ON'">
			<checkbox-group class="block" @change="checkboxChange($event)">
				<view class="cu-list menu" v-for="(item,index) in fees" :key="index" :data-item="item"
					v-if="item.payOnline == 'Y'">
					<view class="cu-item ">
						<view class="content padding-tb-sm flex justify-start">
							<view>
								<checkbox :class="item.selected == '1'?'checked':''"
									:checked="item.selected == '1'?true:false" :value="item.feeId">
								</checkbox>
							</view>
							<view class="margin-left-sm">
								<view class="flex justify-start">
									<view class="text-cut" style="width:150px">{{item.feeName}}({{item.payerObjName}})
									</view>
								</view>
								<view class="text-gray text-sm">
									<text class="margin-right-xs">{{item.endTime}}至{{_getDeadlineTime(item)}}</text>
								</view>
							</view>
						</view>
						<view class="action">
							<text class="text-grey text-sm">应缴:￥{{item.feeTotalPrice}}</text>
						</view>
					</view>
				</view>
			</checkbox-group>
		</scroll-view>
		<scroll-view scroll-y style="padding-bottom: 200rpx;" v-else>

			<view class="cu-list menu" v-for="(item,index) in fees" :key="index" :data-item="item"
				v-if="item.payOnline == 'Y'">
				<view class="cu-item ">
					<view class="content padding-tb-sm ">

						<view class="flex justify-start">
							<view class="text-cut" style="width:150px">{{item.feeName}}({{item.payerObjName}})
							</view>
						</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs">{{item.endTime}}至{{_getDeadlineTime(item)}}</text>
						</view>

					</view>
					<view class="action">
						<text class="text-grey text-sm">应缴:￥{{item.feeTotalPrice}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="fees.length > 0" class="bg-white  border flex justify-end"
			style="position: fixed;width: 100%;bottom: 0;">

			<view class="action text-orange margin-right line-height">
				合计：{{receivableAmount}}元
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="onPayFee()">缴费</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getQrcodeOweFees
	} from '@/api/fee/qrCodePayFee.js';
	import {
		dateSubOneDay
	} from '../../lib/java110/utils/DateUtil.js'
	export default {
		name: "qrcodeOweFee",
		data() {
			return {
				fees: [],
				ownerId: '',
				communityId: '',
				storeId: '',
				receivableAmount: 0,
				customFee: 'OFF',
				feeIds: []
			};
		},
		methods: {
			_loadFees(_param) {
				this.ownerId = _param.ownerId;
				this.communityId = _param.communityId;
				this.customFee = _param.customFee;
				let _that = this;
				_that.feeIds = [];
				getQrcodeOweFees(this, {
					ownerId: this.ownerId,
					communityId: this.communityId
				}).then(_data => {
					_that.fees = _data.data;
					if (_data.data && _data.data.length > 0) {
						_that.storeId = _data.data[0].incomeObjId;
					}
					return _data.data;
				}).then(function(_fees) {
					_fees.forEach(function(_item) {
						if (_item.payOnline == 'Y') {
							_item.selected = "1";
							_that.feeIds.push(_item.feeId);
						}
					})
					_that.computeAmount();
				})

			},
			onPayFee: function() {
				if(!this.feeIds || this.feeIds.length < 1){
					uni.showToast({
						icon:'none',
						title:'未选择费用'
					})
					return;
				}
				let _objData = {
					business: "oweFee",
					communityId: this.communityId,
					ownerId: this.ownerId,
					feeName: '物业费',
					receivedAmount: this.receivableAmount,
					storeId: this.storeId,
					feeIds:this.feeIds
				};
				
				uni.setStorageSync('doing_cashier',_objData);
				uni.navigateTo({
					url:'/pages/fee/cashier?money='+this.receivableAmount+"&business=oweFee&communityId="+this.communityId
				})

			},
			computeAmount:function(){
				let _that =this;
				let _fees = this.fees;
				let _feeIds = this.feeIds;
				let _receivableAmount = 0.0;
				_fees.forEach(_item=>{
					_feeIds.forEach(_feeId =>{
						if(_item.feeId == _feeId){
							_receivableAmount += parseFloat(_item.feeTotalPrice);
						}
					})
				});
				_that.receivableAmount = _receivableAmount.toFixed(2);
			},
			
			checkboxChange: function(e) {
				this.feeIds = e.detail.value;
				this.computeAmount();
			},
			_getDeadlineTime: function(_fee) {
				//todo 处理周期性费用和间接费用的结束时间
				return dateSubOneDay(_fee.startTime, _fee.deadlineTime, _fee.feeFlag);
			}

		}
	}
</script>

<style lang="scss">
	.ppf_item {
		padding: 0rpx 0rpx 0rpx 0rpx;
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

	.fee-last {
		margin-bottom: 200upx;
	}

	.cu-btn.lgplus {
		padding: 0 20px;
		font-size: 18px;
		height: 100upx;

	}

	.cu-btn.sharp {
		border-radius: 0upx;
	}

	.line-height {
		line-height: 100upx;
	}
</style>
