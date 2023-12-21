<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			
			<!-- 审核状态 W待审核 U 待上传 F 审核失败 G 带领用 C 已领用-->
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="tabSelect(0)">
					全部
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="tabSelect(1)">
					待审核
				</view>
				<view class="cu-item flex-sub" :class="active==2?'text-green cur':''" @tap="tabSelect(2)">
					待领用
				</view>
			</view>
		</scroll-view>
		<view>
			<view v-if="invoiceApplys && invoiceApplys.length>0">
				<view v-for="(item,index) in invoiceApplys" :key="index" class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
					<view class="flex padding-bottom-xs solid-bottom justify-between">
						<view>{{item.applyId}}</view>
						<view class="text-gray">{{item.stateName}}</view>
					</view>
					<view class="flex margin-top justify-between">
						<view class="text-gray">发票类型</view>
						<view class="text-gray">{{item.invoiceType == '1001'?'个人':'企业'}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">申请时间</view>
						<view class="text-gray">{{item.createTime}}</view>
					</view>
					<view class="flex margin-top-xs justify-between">
						<view class="text-gray">申请金额</view>
						<view class="text-gray">{{item.invoiceAmount}}</view>
					</view>
					<view class="solid-top flex justify-end margin-top padding-top-sm ">
						<button class="cu-btn sm line-gray" @click="invoiceDetail(item)">详情</button>
						<button class="cu-btn sm bg-red margin-left" v-if="item.state == 'W'" @click="deleteInvoice(item)">删除</button>
					</view>
				</view>
			</view>
			<view v-else>
				<no-data-page></no-data-page>
			</view>
		</view>
		
		<view class="cu-modal" :class="deleteInvoiceModal==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">温馨提示</view>
					<view class="action" @tap="_cancleDeleteInvoice()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认删除当前订单
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleDeleteInvoice()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doDeleteInvoice()">删除</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getInvoiceApply,deleteInvoiceApply} from '@/api/invoice/invoiceApi.js';
	import {
		getOwnerTel,
		getOwnerId
	} from '@/api/owner/ownerApi.js';
	import {
		getCommunityId
	} from '@/api/community/communityApi.js';

	export default {
		data() {
			return {
				invoiceApplys:[],
				active:0,
				ownerTel:'',
				ownerId:'',
				state:'',
				deleteInvoiceModal:false,
			}
		},
		onLoad(options) {
			this.ownerId = getOwnerId();
			this.ownerTel = getOwnerTel();
			this._loadInvoiceData();
		},
		methods: {
			_loadInvoiceData:function(){
				let _that = this;
				_that.invoiceApplys = [];
				getInvoiceApply({
					page: 1,
					row: 30,
					communityId: getCommunityId(),
					ownerTel: this.ownerTel,
					state:this.state
				}).then(_data =>{
					_that.invoiceApplys = _data.data;
				})
			},
			tabSelect:function(_tab){
				this.active = _tab;
				if(_tab == 0){
					this.state = ''
				}else if(_tab == 1){
					this.state = 'W'
				}else{
					this.state = 'G';
				}
				this._loadInvoiceData();
			},
			deleteInvoice: function(_invoice) {
				this.curInvoice = _invoice;
				this.deleteInvoiceModal = true;
			},
			_cancleDeleteInvoice:function(){
				this.deleteInvoiceModal = false;
			},
			_doDeleteInvoice:function(){
				let _that =this;
				deleteInvoiceApply(this.curInvoice)
				.then(_data=>{
					uni.showToast({
						icon:'none',
						title:_data.msg
					})
					if(_data.code == 0){
						_that._cancleDeleteInvoice();
						_that._loadInvoiceData();
					}
				})
			},
			invoiceDetail:function(_detail){
				uni.navigateTo({
					url:'/pages/invoice/invoiceDetail?applyId='+_detail.applyId
				})
			}
			
		}
	}
</script>

<style>

</style>
