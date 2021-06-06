<template>
	<view>
		<view class="cu-timeline">
			<view class="cu-time">工单</view>
			<view class="cu-item " v-for="(item,index) in staffs" :key="key">
				<view class="bg-cyan content">
					<text>{{item.startTime}} </text> 到达 {{item.staffName}} 工位
				</view>
				<view class="bg-cyan content" v-if="item.endTime != undefined">
					<text>{{item.endTime}} </text> 处理完成
				</view>
				<view class="bg-cyan content" v-if="item.endTime != undefined">
					<text>处理意见：</text>  {{item.context}}
				</view>
				<view class="bg-cyan content" v-if="item.photoVos.length > 0 && item.state==10005">
					<view class="repair-img-item" v-for="(pic, index2) in item.photoVos" :key="key2">
						<image :src="imgUrlPre + pic.url" :data-url="imgUrlPre + pic.url" @tap="preview" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<viewImage ref="viewImageRef"></viewImage>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;
	import conf from '../../conf/config.js'
	import viewImage from '@/components/view-image/view-image.vue'
	export default {
		data() {
			return {
				viewImage: false,
				viewImageSrc: '',
				staffs:[],
				repairId:'',
				communityId:'',
				imgUrlPre: '',
			}
		},
		components: {
			viewImage
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			context.onLoad(options);
			this.repairId = options.repairId;
			this.communityId = context.getCurrentCommunity().communityId;
			this.imgUrlPre = conf.commonBaseUrl;
			
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
			},
			preview: function(e) {
				let _url = e.target.dataset.url;
				this.$refs.viewImageRef.showThis(_url);
			}
		}
	}
</script>
<style>
	.repair-img-item{
		display: inline-block;
		margin: 0 20upx;
	}
	.repair-img-item image{
		width: 200upx;
		border-radius: 15upx;
	}
</style>

