<template>
	<view>
		<view class="margin-top">
			<view class="cu-list menu" v-if="applicationKeys.length > 0" v-for="(item, idx) in applicationKeys" :key="idx"
			 :data-item="item" @click="gotoDetail(item)">
				<view class="cu-item arrow">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-order text-cut text-green margin-right-xs"></text>
							<view class="text-cut" style="width:85%;">{{item.locationObjName}}</view>
						</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs">审核进度：</text> {{item.stateName}}</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu" v-if="applicationKeys.length === 0">
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-notification text-grey"></text>
						<text class="text-grey">暂无审核信息</text>
					</view>
					<view class="action">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue';

	import {
		getCurOwner
	} from '../../api/owner/ownerApi.js'

	import {
		listApplicationKeys
	} from '../../api/applicationKey/applicationKeyApi.js'
	
	export default {
		data() {
			return {
				applicationKeys: [],
				idCard: '',
				communityId: ''
			};
		},

		components: {
			noDataPage
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.vc.onLoad(options);
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let _that = this;

			getCurOwner()
				.then((_ownerInfo) => {
					let _idCard = _ownerInfo.idCard;
					let _communityId = _ownerInfo.communityId;
					_that.idCard = _idCard;
					_that.communityId = _communityId;
					_that.loadApplicationKey();
				})
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			loadApplicationKey: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 10,
					idCard: this.idCard,
					communityId: this.communityId,
					typeFlag: '1100102'
				};
				//查询钥匙信息
				listApplicationKeys(_objData)
					.then((_applicationKeys) => {
						_that.applicationKeys = _applicationKeys;
					})
			},
			gotoDetail: function(_item) {
				let _applicationKey = _item;
				wx.navigateTo({
					url: '/pages/viewApplicationKeyUser/viewApplicationKeyUser?applicationKeyId=' + _applicationKey.applicationKeyId +
						"&communityId=" + this.communityId
				});
			}
		}
	};
</script>
<style>
	.cu-list+.cu-list {
		margin-top: 10px;
	}
</style>
