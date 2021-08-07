<template>
	<!--pages/activites/activites.wxml-->
	<view class="act">
		<block v-for="(item, index) in activities" :key="index">
			<navigator :url="'/pages/activitesDetail/activitesDetail?activitiesId=' + item.activitiesId + '&title=' + item.title + '&communityId=' + item.communityId+'&wAppId='+wAppId">
				<view class="act_item">
					<view class="act_img">
						<image class="headImg" :src="item.src"></image>
					</view>
					<view class="act_title">
						<view class="cu-item">
							<view class="content padding-tb-sm">
								<view>
									<text class="text-gray margin-right-xs"></text>
									{{item.title}}
								</view>
								<view class="text-gray text-sm padding-left">
									<text>{{item.userName}}</text>
									<text class="iconfont iconyuedu padding-left"></text> {{item.readCount}}
									<text class="iconfont icongood-fill padding-left"></text> {{item.likeCount}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</navigator>
		</block>

	</view>
</template>

<script>
	import {
		loadActivites
	} from '../../api/index/indexApi.js'

	export default {
		data() {
			return {
				activities: [],
				communityId: "",
				wAppId:this.vc.getWAppId()
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			this.vc.onLoad(options);
			this.vc.recoveryCommunityInfo(_that)
				.then((_communityInfo) => {
					_that.loadActivitesFun();
				})
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			/**
			 * 加载活动
			 * 第一次加载是可能没有小区 则直接下载固定小区
			 * 
			 */
			loadActivitesFun: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 15,
					communityId: this.communityId,
					defaultShow: 'Y',
					clientType: 'H5'
				};
				loadActivites(_objData)
					.then((_acts) => {
						_that.activities = _acts;
					});
			}
		}
	};
</script>
<style>
	@import "./activites.css";
</style>
