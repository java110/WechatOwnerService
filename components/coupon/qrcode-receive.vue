<template>
	<view>
		123123
		<view class="cu-list menu-avatar " v-for="(item,index) in coupons" :key="index" @tap="_toRepairDetail(item)">
			<view class="cu-item arrow">
				<view class="content content-left">
					<view class="text-grey">
						<text class="cuIcon-notification text-cut text-green margin-right-xs"></text>
						<text class="ellip">{{item.repairObjName}}-{{item.stateName}}({{item.repairSettingTypeName}})</text>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							报修人：{{item.repairName}}-{{item.tel}}
						</view>
					</view>
				</view>
				<view  class="rob-order text-df text-white bg-green text-center" @tap.stop="dealRepair(item,'DISPATCH')">
					二维码
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"qrCodeReceive",
		data() {
			return {
				coupons:[]
			};
		},
		created() {
			this._loadShopCoupons();
		},
		methods(){
			_loadShopCoupons:function(){
				console.log(12312)
			}
		}
	}
</script>

<style>

</style>