<template>
	<view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">当前小区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{communityName}}</text>
				</view>
			</view>
		</view>
		<view v-if="locations.length > 0">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item, idx) in locations" :key="idx">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> {{item.locationObjName}}</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill margin-right-xs"></text> {{item.machineCode}}</view>
					</view>

				</view>

			</view>
			<view class="akl_wirte_btn">
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-green lg" @click="gotoApplyApplicationKeyPage()">填写资料</button>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	// pages/applicationKeyLocation/applicationKeyLocation.js

	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	import {listOwnerMachines} from '../../api/applicationKey/applicationKeyApi.js'
	import {getCurOwner} from '../../api/owner/ownerApi.js'
	export default {
		data() {
			return {
				locations: [],
				communityName: '',
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
		onLoad: function(options) { //this._loadOwnerLocation();
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
			this.loadOwnerLocationFun();
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			loadOwnerLocationFun: function() {
				let _that = this;

				getCurOwner()
				.then((_owner)=>{
					let _data = {
						memberId: _owner.memberId,
						communityId: _owner.communityId
					};
					_that.communityName = _owner.communityName;
					_that.communityId = _owner.communityId;
					listOwnerMachines(_data)
					.then((_machines)=>{
						_that.locations = _machines;
					})	
				})
				
			},
			gotoApplyApplicationKeyPage: function() {
				// 跳转至 填写信息页面
				console.log('gotoApplyApplicationKeyPage', this.locations);

				if (this.locations.length < 1) {
					wx.showToast({
						icon: 'none',
						title: '没有相应门禁供您申请'
					});
					return;
				}

				wx.navigateTo({
					url: "/pages/applicationKeyUser/applicationKeyUser?locations=" + JSON.stringify(this.locations) +
						"&communityId=" + this.communityId
				});
			}
		}
	};
</script>
<style>
	@import "./applicationKeyLocation.css";
</style>
