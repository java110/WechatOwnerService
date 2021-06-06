<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchValue" data-name="searchValue" name="searchValue" @focus="onChange" @blur="onSearch"
				 :adjust-position="false" placeholder="请输入单元编号" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="onSearch">搜索</button>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="(unit, idx) in units" :key="idx" :label="unit.unitId">
				<view class="content padding-tb-sm" is-link @click="chooseUnit(unit)">
					<view>
						<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> {{unit.unitNum}}单元</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{unit.unitId}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	export default {
		data() {
			return {
				appUserName: '',
				areaCode: '',
				searchValue: '',
				unitName: "",
				units: [],
				floorId:''
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			let _floorId = options.floorId;
			this.floorId = _floorId;
			this.loadUnit();
		},
		methods: {
			onSearch() {
				this.loadUnit();
			},
			
			onClick() {
				this.loadUnit();
			},
			
			chooseUnit: function(_unit) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				uni.setStorageSync("_selectUnit", _unit);
				prevPage.unitName = _unit.name;
				//console.log(e);
				wx.navigateBack({
					delta: 1
				});
			},
			loadUnit: function() {
				let _that = this;
				let _communityInfo = context.getCurrentCommunity();
				let dataObj = {
					page: 1,
					row: 15,
					communityId: _communityInfo.communityId,
					name: this.searchValue,
					floorId: this.floorId
				};
				uni.request({
					url: constant.url.queryUnit,
					header: context.getHeaders(),
					method: "GET",
					data: dataObj,
					//动态数据
					success: function(res) {
						console.log(res); //成功情况下跳转
			
						if (res.statusCode == 200) {
							let _units = res.data;
			
							_that.units = _units;
						}
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>
