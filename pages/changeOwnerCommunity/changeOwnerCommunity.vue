<template>
	<view>

		<view>
			<view class="padding">小区信息</view>
			<view class="cu-list menu ">
				<view class="cu-item" v-for="(item,sub) in communitys" :key="sub" @tap="_doChangeCommunity(item)">
					<view class="content padding-tb-sm">
						<view>
							<text class="lg  cuIcon-homefill text-blue margin-right-xs"></text> {{item.name}}
						</view>
						<view class="text-gray text-sm">
							<text class="lg text-gray cuIcon-location margin-right-xs"></text> {{item.address}}
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>

	import {getOwnerCommunitys} from '../../api/community/communityApi.js'

	export default {
		data() {
			return {
				communityName: '',
				communitys: []
			}
		},
		onLoad() {
			this._loadCommunitys();
		},
		methods: {
			_loadCommunitys: function() {
				let _that = this;
				let _condition = {
					name: this.communityName
				}
				getOwnerCommunitys()
					.then(_communitys => {
						_that.communitys = _communitys;
					});
			},
			_doChangeCommunity: function(_community) {
				uni.setStorageSync(mapping.CURRENT_COMMUNITY_INFO, JSON.stringify(_community));
				wx.setStorageSync(mapping.OWNER_INFO, _community);
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>

</style>
