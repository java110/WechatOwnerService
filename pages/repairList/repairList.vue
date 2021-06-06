<template>
	<view class="user-container">
		<view v-for="(item, idx) in tableData" :key="idx" class="notice" :data-item="item" @tap="gotoDetail">
			<view class="title">
				<view>{{item.repairName}}</view>
				<view>{{item.tel}}</view>
			</view>
			<view class="main">
				<view>
					<view class="text">报修类型: {{item.repairTypeName}}</view>
					<view class="text">状<text decode="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>态: {{item.stateName}}</view>
					<view class="text">预约时间: {{item.appointmentTime}}</view>
				</view>
				<view>
					<button class="button" size="mini" type="default" @tap.native.stop="gotoDetail" :data-item="item">查看</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/** index.js **/
	const context = require("../../context/Java110Context.js");
	const constant = context.constant; //获取app实例
	//获取app实例
	const app = getApp().globalData;

	export default {
		data() {
			return {
				tableData: [],
				page: 1,
				totalPage: 0,
				loading: false
			};
		},

		components: {},
		props: {},
		onLoad: function() {
			context.onLoad(options);
			this.getTable(1);
		},
		onShow: function() {
			let that = this;
		},
		onPullDownRefresh: function() {
			// 上拉刷新
			if (!this.loading) {
				this.getTable(1, true).then(() => {
					// 处理完成后，终止下拉刷新
					wx.stopPullDownRefresh();
				});
			}
		},
		onReachBottom: function() {
			// 下拉触底，先判断是否有请求正在进行中
			// 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
			if (!this.loading && this.page < this.totalPage) {
				this.getTable(this.page + 1);
			}
		},
		methods: {
			getTable: function(page, override) {
				let that = this;
				this.loading = true;
				return this.request({
					"roomId": "752019100758260005",
					"communityId": "7020181217000001",
					"page": page,
					"row": 10
				}).then(res => {
					that.tableData = override ? res.data.ownerRepairs : this.tableData.concat(res.data.ownerRepairs);
					that.totalPage = res.data.records;
					that.page = page;
					that.loading = false;
				});
			},
			gotoDetail: function(e) {
				wx.navigateTo({
					url: "/pages/repairList/detail/detail?item=" + JSON.stringify(e.currentTarget.dataset.item)
				});
			},
			//封装请求
			request: function(data) {
				return new Promise((resolve, reject) => {
					wx.request({
						url: constant.url.listOwnerRepairs,
						header: context.getHeaders(),
						method: "GET",
						data: data,
						success: function(res) {
							if (res.statusCode == 200) {
								resolve(res);
							}
						}
					});
				});
			}
		}
	};
</script>
<style>
	@import "./repairList.css";
</style>
