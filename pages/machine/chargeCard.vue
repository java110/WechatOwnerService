<template>
	<view >
		<view class="tab-container bg-white">
			<view class="cu-list menu">
				<view class="cu-item " v-for="(item, key) in chargeOrders" :key="key">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-rechargefill text-green margin-right-xs"></text> {{item.acctTypeName}}
						</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-right margin-right-xs"></text>余额: {{item.amount}}
						</view>
					</view>
					<view class="action">
					</view>
				</view>
			</view>	
		</view>
		<view class="plat-btn-black"></view>
		<view class="cu-bar btn-group" style="margin-top: 30px;" >
			<button @click="_toPrestoreAccount" class="cu-btn bg-orange shadow-blur round lg">购买月卡</button>
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
		data() {
			return {
				chargeOrders: [],
				communityId:'',
				personTel:''
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			this.communityId = options.communityId;
			this.loadChargeMonthOrder();
		},
		methods: {
			coupons: function(_item) {
				this.vc.navigateTo({
					url: '/pages/coupon/myCoupons',
				})
			},
			myAccountDetail: function(_item) {
				this.vc.navigateTo({
					url: '/pages/account/myAccountDetail?acctId=' + _item.acctId
				});
			},
			/**
			 * 加载业主房屋信息
			 */
			loadChargeMonthOrder: function() {
				let _that = this;
				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						_that.personTel = _ownerInfo.link;
						getChargeMonthOrder({
							page: 1,
							row: 20,
							personTel: _ownerInfo.link,
							communityId: _that.communityId,
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
					url:'/pages/machine/prestoreChargeCard?communityId='+ this.communityId+'&personTel='+this.personTel
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

.border-bottom .icon{
  font-size: 38rpx;
  line-height: 38rpx;
}
</style>
