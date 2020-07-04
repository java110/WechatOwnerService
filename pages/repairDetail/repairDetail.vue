<template>
	<view>
		<view class="cu-timeline">
			<view class="cu-time">工单</view>
			<view class="cu-item " v-for="(item,index) in staffs">
				<view class="bg-cyan content">
					<text>{{item.startTime}} </text> 到达 {{item.staffName}} 工位
				</view>
				<view class="bg-cyan content" v-if="item.endTime != undefined">
					<text>{{item.endTime}} </text> 处理完成
				</view>
				<view class="bg-cyan content" v-if="item.endTime != undefined">
					<text>处理意见：</text>  {{item.context}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;
	export default {
		data() {
			return {
				staffs:[],
				repairId:'',
				communityId:''
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			context.onLoad(options);
			this.repairId = options.repairId;
			this.communityId = context.getCurrentCommunity().communityId;
			
			//加载报修类型
			this._loadRepairStaffs();
		},
		methods: {
			_loadRepairStaffs:function(){
				let _communityInfo = context.getCurrentCommunity();
				let _that =this;
				let dataObj = {
					page: 1,
					row: 50,
					communityId: _communityInfo.communityId,
					repairId: this.repairId
				};
				uni.request({
					url: constant.url.listRepairStaffs,
					header: context.getHeaders(),
					method: "GET",
					data: dataObj,
					//动态数据
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							_that.staffs = _json.data;
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
