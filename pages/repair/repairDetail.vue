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
					<block v-if="item.state == '12000' && item.payTypeName != undefined">
						({{item.payTypeName}})
					</block>
				</view>
				<!-- 待支付状态 - 详情描述 -->
				<view class="bg-cyan content" v-if="item.state == '10009'">
					<text>处理意见：</text> {{item.context}}
					<block v-if="item.payTypeName != undefined">({{item.payTypeName}})</block>
				</view>
				<view class="bg-cyan content" v-if="item.photoVos.length > 0 && item.state==10005">
					<view class="repair-img-item" v-for="(pic, index2) in item.photoVos" :key="key2">
						<image :src="pic.url" @tap="preview(index, index2)" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<viewImage ref="viewImageRef"></viewImage>
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;
	const factory = context.factory;
	import conf from '../../conf/config.js'
	export default {
		data() {
			return {
				viewImage: false,
				viewImageSrc: '',
				staffs:[],
				repairId:'',
				communityId:'',
				imgUrlPre: '',
				photoUrl: conf.commonBaseUrl + '/callComponent/download/getFile/file',
			}
		},
		components: {
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
					success: (res) => {
						let _json = res.data;
						if (_json.code == 0) {
							_that.staffs = _json.data;
							_that.staffs.forEach((item) => {
								if(item.photoVos.length > 0 && item.state==10005){
									item.photoVos.forEach((img) => {
										img.url = this.photoUrl + "?fileId=" + img.url + "&communityId=-1&time=" + new Date();
									})
								}
							})
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
			preview: function(recordIndex, imgIndex) {
				let urls = [];
				this.staffs[recordIndex].photoVos.forEach((item) => {
					urls.push(item.url);
				})
				uni.previewImage({
					current: imgIndex,
					urls: urls
				})
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

