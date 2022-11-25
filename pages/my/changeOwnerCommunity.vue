<template>
	<view>

		<view>
			<view class="padding">小区信息</view>
			<view class="cu-list menu " v-if="communitys.length>0">
				<view class="cu-item" v-for="(item,sub) in communitys" :key="sub" @tap="_doChangeCommunity(item)">
					<view class="content padding-tb-sm">
						<view>
							<text class="lg  cuIcon-homefill text-blue margin-right-xs"></text> {{item.communityName}}
						</view>
						<view class="text-gray text-sm">
							<text class="lg text-gray cuIcon-location margin-right-xs"></text> {{item.name}}
						</view>
					</view>
				</view>
			</view>
			<block v-else>
				<view class="cu-list menu">
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-notification text-grey"></text>
							<text class="text-grey">暂无小区信息</text>
						</view>
						<view class="action">
						</view>
					</view>
				</view>
			</block>
		</view>

	</view>
</template>

<script>

	import {getOwnerCommunitys} from '../../api/community/communityApi.js'
	import {getCurOwner} from '../../api/owner/ownerApi.js'
	import mapping from '../../constant/MappingConstant.js'

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
				let _ownerInfo = wx.getStorageSync(mapping.OWNER_INFO);
				getOwnerCommunitys({
					link:_ownerInfo.link
				})
					.then(_communitys => {
						_that.communitys = _communitys;
					});
			},
			_doChangeCommunity: function(_community) {
				uni.setStorageSync(mapping.CURRENT_COMMUNITY_INFO, _community);
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
