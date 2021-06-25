<template>
	<view>
		<view class="header_fixed">
			<scroll-view v-if="contracts.length <5 && contracts.length >1" class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.contractId==curContract.contractId?'text-green cur':''" v-for="(item,index) in contracts"
					 :key="index" @tap="switchContract(item)" :data-id="index">
						{{item.contractCode}}
					</view>
				</view>
			</scroll-view>
			<scroll-view v-if="contracts.length >4" scroll-x class="bg-white nav" scroll-with-animation scroll-left="true">
				<view class="cu-item flex-sub" :class="item.contractId==curContract.contractId?'text-green cur':''" v-for="(item,index) in contracts"
				 :key="index" @tap="switchContract(item)" :data-id="index">
					{{item.contractCode}}
				</view>
			</scroll-view>
		</view>
		<view v-if="contracts.length == 1" class="block__title">{{contracts[0].contractCode}}</view>
		<view v-if="contracts.length > 1" class="margin-header-top"></view>
		<view v-if="noData == false">
			<view class="cu-list menu" v-if="moreContracts.length > 0" v-for="(fee, idx) in moreContracts" :key="idx" :data-item="fee"
			 @click="payFee(fee)">
				<view class="cu-item arrow">
					<view class="content padding-tb-sm">
						<view>
							<view class="text-cut" style="width:220px">{{fee.feeName}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
		<view class=" bg-white  border flex justify-end" style="position: fixed;width: 100%; bottom: 0;">
			<view class="btn-group line-height">
				<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="toContractOweFee()">欠费缴费</button>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/payParkingFeeList/payParkingFeeList.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	import noDataPage from '@/components/no-data-page/no-data-page.vue'

	import {
		getContracts
	} from '../../api/contract/contractApi.js'

	import {
		getRoomFees
	} from '../../api/fee/feeApi.js'
	

	export default {
		data() {
			return {
				contracts: [],
				curContract: {},
				moreContracts: [],
				needFefresh: true,
				noData: false
			};
		},

		components: {
			noDataPage
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let _that = this;
			if (!this.needFefresh) {
				this.needFefresh = true;
				return;
			}
			this.noData = false;
			getContracts().then(data => {
				let _contracts = data.data;
				this.contracts = _contracts;
				let _owner = data.owner;
				_that.moreContracts = [];
				if (_contracts.length == 0) {
					_that.noData = true;
					return;
				}
				_contracts.forEach(function(_contract) {
					_contract.communityId = _owner.communityId;
					_contract.communityName = _owner.communityName;
				});
				_that.curContract = _contracts[0];
				_that._loadContractFee();
			});
		},
		methods: {
			payFee: function(_item) {
				wx.navigateTo({
					url: '/pages/contractFee/contractFee?fee=' + JSON.stringify(_item),
				})
			},
			_loadContractFee: function() {
				let _that = this;
				let _contract = this.curContract;
				let _objData = {
					page: 1,
					row: 30,
					payerObjId: _contract.contractId,
					communityId: _contract.communityId,
					state: '2008001'
				}
				_that.moreContracts = [];
				getRoomFees(_objData, _contract)
					.then((moreContracts) => {
						_that.moreContracts = moreContracts;
						_that.noData = false;
					}, () => {
						_that.noData = true;
					})

			},
			switchContract: function(_contract) {
				this.curContract = _contract;
				this.noData = false;
				this._loadContractFee();
			},
			toContractOweFee:function(){
				if(this.vc.isEmpty(this.curContract.contractId)){
					uni.showToast({
						icon:'none',
						title:'没有房屋'
					});
					return;
				}
				this.vc.navigateTo({
					url:'/pages/contractOweFee/contractOweFee?contractId='+this.curContract.contractId
				});
			}
		}
	};
</script>
<style>
	.ppfl_footer{
	  text-align: right;
	}
	.ppfl_footer .ppfl_footer_his{
	  margin-right: 20rpx;
	}
	
	.ppfl_c{
	  padding: 0rpx 20rpx 20rpx 20rpx;
	}
	
	.block__title {
	  margin: 0;
	  font-weight: 400;
	  font-size: 14px;
	  color: rgba(69,90,100,.6);
	  padding: 40rpx 30rpx 20rpx;
	}
	
	.ppfl_context{
	  padding: 20rpx 40rpx 40rpx 40rpx;
	  font-size: 28rpx;
	  color: #8a8a8a;
	}
	
	.ppfl_context .ppfl_context_row{
	  margin-top: 30rpx;
	}
	
	
	.button_up_blank{
	  height: 40rpx;
	}

	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.solid-top::after {
		border-top: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.margin-header-top {
		height: 100upx;
	}

	/*  #ifdef  APP-PLUS || MP-WEIXIN  */
	.header_fixed {
		position: fixed;
		top: 0upx;
		left: 0;
		width: 100%;
		z-index: 2;
	}

	/*  #endif  */
	/*  #ifdef  H5  */
	.header_fixed {
		position: fixed;
		top: 0upx;
		left: 0;
		width: 100%;
		z-index: 2;
	}

	/*  #endif  */
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
