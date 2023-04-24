<template>
	<view>
		<view class="cu-list menu">
			<view class="cu-item arrow" @click="_toPrestoreAccount()">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-rechargefill text-green margin-right-xs"></text> 充电月卡
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-right margin-right-xs"></text> {{ chargeOrders.length}} 张
					</view>
				</view>
				<view class="action">
					去购买
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	import {
		getChargeMonthOrder
	} from '@/api/machine/machineApi.js';
	import {formatDate} from '../../lib/java110/utils/DateUtil.js'
	export default {
		name: "charge",
		data() {
			return {
				chargeOrders:[],
				communityId:''
			};
		},
		created() {
			//this.loadOwnerAccount();
		},
		methods: {
			loadChargeMonthOrder: function(_communityId) {
				this.communityId = _communityId;
				let _that = this;
				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						if(!_that.communityId){
							_that.communityId = _ownerInfo.communityId
						}
						
						getChargeMonthOrder({
							page: 1,
							row: 20,
							personTel: _ownerInfo.link,
							communityId: _communityId,
							queryTime:formatDate(new Date())
						}).then((data) => {
							if (!data) {
								_that.chargeOrders = [];
								return;
							}
							_that.chargeOrders = data;
						})
					}
				});
			},
			_toPrestoreAccount:function(){
				uni.navigateTo({
					url:'/pages/machine/chargeCard?communityId='+this.communityId
				})
			}
		}
	}
</script>

<style>

</style>
