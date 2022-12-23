<template>
	<view>
		<view class="cu-modal" :class="isShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{goods.goodsName}}</view>
					<view class="action" @tap="_cancle()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="flex justify-between">
						<view>预约数量</view>
						<view style="width: 60%;">
							<radio-group class="flex justify-end" @change="_changeReserveQuantity">
								<!-- #ifdef MP-WEIXIN -->
								<view class="margin-right-sm"  v-for="item in goods.hoursMaxQuantity" :key="item">
									<radio class=""  :value="item+1"></radio>
									<view>{{item+1}}个</view>
								</view>
								<!-- #endif -->
								<!-- #ifndef MP-WEIXIN -->
								<view class="margin-right-sm"  v-for="item in goods.hoursMaxQuantity" :key="item">
									<radio class=""  :value="item"></radio>
									<view>{{item}}个</view>
								</view>
								<!-- #endif -->
							</radio-group>
							<!-- <checkbox class='round checked' checked="true" value="B"></checkbox> -->
						</view>
					</view>
					<view class="flex justify-between margin-top">
						<view>预约时间</view>
						<view style="width: 60%;">
							<checkbox-group class="text-right" @change="_changeReserveTime">
								<view class="margin-right-sm" style="display: inline-block;" v-if="item.isOpen == 'Y'"
									v-for="(item,index) in openTimes" :key="index">
									<checkbox class=' ' :value="item.hours"></checkbox>
									<view>{{item.hours}}时</view>
								</view>
							</checkbox-group>
							<!--  -->
						</view>
					</view>
					<view class="flex justify-between margin-top">
						<view>金额</view>
						<view >
							<text class="text-red margin-right">￥{{money}}</text>
							<!--  -->
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancle()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doSummit()">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCatalogs,
		getCatalogGoodss,
		getReserveParams
	} from '@/api/community/reserveApi.js';
	import {
		getCommunityId
	} from '@/api/community/communityApi.js';
	export default {
		name: "reserveGoods",
		data() {
			return {
				isShow: false,
				goods: {
					hours: [],
					quantity: "1"
				},
				openTimes: [],
				money:0,
			};
		},
		methods: {
			reserveGoods: function(_goods) {
				this.isShow = true;
				this.goods = {
					hours: [],
					quantity: "1"
				},
				this.money = 0;
				this.openTimes = [];
				
				this._loadGoods(_goods.goodsId);
			},
			_cancle: function() {
				this.isShow = false;
			},
			_loadGoods: function(_goodsId) {
				let _that = this;
				getCatalogGoodss({
					page: 1,
					row: 1,
					communityId: getCommunityId(),
					goodsId: _goodsId
				}).then(_data => {
					_data[0].hoursMaxQuantity = parseInt(_data[0].hoursMaxQuantity);
					_that.goods = _data[0];
					_that.goods.hours = [];
					_that.goods.quantity = "1"
					
					_that._loadGoodsParams();
				})
			},
			_loadGoodsParams: function() {
				let _that = this;
				getReserveParams({
					page: 1,
					row: 1,
					communityId: getCommunityId(),
					paramsId: this.goods.paramsId
				}).then(_data => {
					_that.openTimes = _data[0].openTimes;
					_that.$forceUpdate();
				})
			},
			_changeReserveTime: function(e) {
				this.goods.hours = e.detail.value;
				this._computeMoney();
			},
			_changeReserveQuantity: function(e, guid, item) {
				this._computeMoney();
				this.goods.quantity = e.detail.value;
			},
			_computeMoney:function(){
				let _quantity = this.goods.hours.length * parseFloat(this.goods.quantity);
				this.money = (_quantity * parseFloat(this.goods.price)).toFixed(2);
				this.goods.money = this.money;
			},
			_doSummit: function() {
				if (!this.goods.quantity) {
					uni.showToast({
						icon: 'none',
						title: '未选择数量'
					});
					return;
				}
				if (!this.goods.hours || this.goods.hours.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '未选择时间'
					});
					return;
				}
				this.isShow = false;
				this.$emit('selectGoods',this.goods);
			}
		}
	}
</script>

<style>

</style>
