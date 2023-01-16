<template>
	<view class="">
		<view class="cu-list menu">
			<view class="header_fixed">
				<scroll-view class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="item.state==curStata?'text-green cur':''"
							v-for="(item,index) in parkingType" :key="index" @tap="_changeState(item)"
							:data-id="index">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-for="(item,index) in orders"  :key="index"
				class="bg-white margin-top margin-right-xs radius margin-left-xs ">
				<view class="flex padding solid-bottom justify-between">
					<view style="font-size: 14px;">单号<span style="margin-left: 10px;"
							class="text-gray">{{item.irId}}</span></view>
				</view>
				<view class="flex padding-left padding-right margin-top padding-bottom-sm justify-between">
					<view class="text-gray">放行类型</view>
					<view class="text-gray">{{item.typeName}}</view>
				</view>
				<view class="flex padding-left padding-right padding-bottom-sm justify-between">
					<view class="text-gray">申请单位</view>
					<view class="text-gray">{{item.applyCompany}}</view>
				</view>
				<view class="flex padding-left padding-right padding-bottom-sm justify-between">
					<view class="text-gray">申请人</view>
					<view class="text-gray">{{item.applyPerson}}({{item.applyTel}})</view>
				</view>
				<view class="flex padding-left padding-right padding-bottom-sm justify-between">
					<view class="text-gray">通行时间</view>
					<view class="text-gray">{{item.passTime}}</view>
				</view>
				<view class="flex padding-left padding-right padding-bottom-sm justify-between">
					<view class="text-gray">物品数量</view>
					<view class="text-gray">{{item.amount }}</view>
				</view>
				<view class="flex padding-left padding-right padding-bottom-sm justify-between">
					<view class="text-gray">状态</view>
					<view class="text-gray">{{item.stateName}}</view>
				</view>

				<view class="solid-top flex justify-end margin-top padding-top-sm ">
					<button class="cu-btn bg-gradual-blue margin-left" @click="_toDetail(item)">详情</button>
				</view>
				<view
					style="margin-bottom:-13px;margin-top: 10px;margin-left: -20px;margin-right: -20px; height: 10px;background-color: #f2f2f2;">
				</view>
			</view>

			<view class="cu-item margin-top" v-if="orders.length === 0">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">暂无记录</text>
				</view>
				<view class="action">

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;
	import {
		getMyItemRelease
	} from '../../api/itemRelease/itemReleaseApi.js';
	
	import {getCommunityId} from '@/api/community/communityApi.js';
	import url from '@/constant/url.js';

	export default {
		data() {
			return {
				orders: [], // 预约列表
				moreRooms: [],
				noData: false,
				owner: [],
				// W待审核 D 审核中 C 审核完成 D 审核失败
				parkingType: [{
					"name": '全部',
					"state": ''
				}, {
					"name": '待审核',
					"state": 'W'
				},{
					"name": '审核中',
					"state": 'D'
				}, {
					"name": '审核完成',
					"state": 'C'
				}, {
					"name": '审核失败',
					"state": 'F'
				}],
				curStata: '',
			};
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			this._loadReserveOrder();
		},
		methods: {
			_changeState: function(_order) {
				console.log('_changeState',_order);
				this.curStata = _order.state;
				this._loadReserveOrder();
			},
			_loadReserveOrder:function(){
				let _that = this;
				getMyItemRelease({
					page:1,
					row:100,
					state:this.curStata,
					communityId:getCommunityId()
				}).then(_data=>{
					_that.orders = _data;
				})
			},
			_toDetail:function(_order){
				uni.navigateTo({
					url:'/pages/itemRelease/myItemReleaseDetail?irId='+_order.irId
				})
			}
		}
	};
</script>

<style>
	.tab-container {
		/*border: 1px solid black;*/

		margin-top: 30rpx;
	}

	.tab-item {
		padding: 20rpx 30rpx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.tab-item-hover {
		background-color: #e6e6e6;
	}

	.tab-icon {
		width: 30rpx;
		height: 30rpx;
	}

	.tab-text {
		display: inline-block;
		margin-left: 10rpx;
		color: #1e1e1e;
	}

	.tab-arrow {
		display: inline-block;
		width: 20rpx;
		height: 20rpx;
		border: 1px solid #cdcdcd;

		border-left: none;
		border-bottom: none;

		transform: rotate(45deg);
	}

	.border-bottom .icon {
		font-size: 38rpx;
		line-height: 38rpx;
	}
</style>
