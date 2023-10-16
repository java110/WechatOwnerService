<template>
	<view>
		<view class="block__title">发票详情</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">编号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">发票类型</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{invoiceType == '1001'?'个人':'企业'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">业主名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{ownerName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">申请人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{createUserName}}({{applyTel}})</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">发票名头</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{invoiceName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">纳税人识别号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{invoiceNum}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">地址、电话</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{invoiceAddress}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">申请金额</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{invoiceAmount}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">审核状态</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{stateName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">申请时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{createTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">发票编号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{invoiceCode || '未上传'}}</text>
				</view>
			</view>
		</view>

		<view class="cu-timeline margin-top" v-if="events && events.length >0">
			<view class="cu-time">审核记录</view>
			<view class="cu-item " v-for="(item,index) in events" :key="index">
				<view class="bg-cyan content">
					<text>{{item.createUserName}} </text> {{item.createTime}} {{item.eventTypeName}}
				</view>
				<view class="bg-cyan content">
					<text>处理意见：</text> {{item.remark}}
				</view>
			</view>
		</view>
		<view v-if="urls && urls.length >0">
			<view class="block__title">发票图片</view>
			<view v-for="(item,index) in urls" :key="index">
				<image :src="item" class="padding-lr" style="width: 100%;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getInvoiceApply,
		getInvoiceEvent
	} from '@/api/invoice/invoiceApi.js';
	import {
		getCommunityId
	} from '@/api/community/communityApi.js';
	export default {
		data() {
			return {
				applyId: '',
				invoiceType: '',
				ownerName: '',
				createUserName: '',
				invoiceName: '',
				invoiceNum: '',
				invoiceAddress: '',
				invoiceAmount: '',
				stateName: '',
				createTime: '',
				invoiceCode: '',
				applyTel: '',
				urls: [],
				events: [],
			}
		},
		onLoad(options) {
			this.applyId = options.applyId;
			this._loadInvoiceData();
			this._loadInvoiceEventData();
		},
		methods: {
			_loadInvoiceData: function() {
				let _that = this;
				getInvoiceApply({
					page: 1,
					row: 1,
					communityId: getCommunityId(),
					applyId: this.applyId,
				}).then(_data => {
					_that.invoiceType = _data.data[0].invoiceType;
					_that.ownerName = _data.data[0].ownerName;
					_that.createUserName = _data.data[0].createUserName;
					_that.applyTel = _data.data[0].applyTel;
					_that.invoiceName = _data.data[0].invoiceName;
					_that.invoiceNum = _data.data[0].invoiceNum;
					_that.invoiceAddress = _data.data[0].invoiceAddress;
					_that.invoiceAmount = _data.data[0].invoiceAmount;
					_that.stateName = _data.data[0].stateName;
					_that.createTime = _data.data[0].createTime;
					_that.invoiceCode = _data.data[0].invoiceCode;
					_that.urls = _data.data[0].urls;
				})
			},
			_loadInvoiceEventData: function() {
				let _that = this;
				getInvoiceEvent({
					page: 1,
					row: 50,
					communityId: getCommunityId(),
					applyId: this.applyId,
				}).then(_data => {
					_that.events = _data.data;
				})
			},

		}
	}
</script>

<style lang="scss">
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 60rpx 30rpx 20rpx;
	}


	.button_up_blank {
		height: 40rpx;
	}
</style>