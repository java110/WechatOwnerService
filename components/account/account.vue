<template>
	<view>
		<view class="cu-list menu">
			<view class="cu-item arrow" @click="_toPrestoreAccount()">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-rechargefill text-green margin-right-xs"></text> {{account.acctTypeName}}
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-right margin-right-xs"></text>余额: {{account.amount}}
					</view>
				</view>
				<view class="action">
					去充值
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/account/myAccount.js
	import context from '../../lib/java110/Java110Context.js';
	import {
		queryOwnerAccount
	} from '../../api/user/userApi.js'
	export default {
		name: "account",
		data() {
			return {
				account:{},
				communityId:''
			};
		},
		created() {
			//this.loadOwnerAccount();
		},
		methods: {
			loadOwnerAccount: function(_communityId) {
				this.communityId = _communityId;
				let _that = this;
				context.getOwner(function(_ownerInfo) {
					if (_ownerInfo) {
						if(!_that.communityId){
							_that.communityId = _ownerInfo.communityId
						}
						queryOwnerAccount({
							page: 1,
							row: 20,
							idCard: _ownerInfo.idCard,
							link: _ownerInfo.link,
							communityId: _communityId,
							acctType:'2003'
						}).then((data) => {
							if (!data) {
								_that.account = {};
								return;
							}
							_that.account = data[0];
						})
					}
				});
			},
			_toPrestoreAccount:function(){
				uni.navigateTo({
					url:'/pages/account/preStoreAccount?communityId='+this.communityId
				})
			}
		}
	}
</script>

<style>

</style>
