<template>
	<view>
		<view class="active_box">
			<view class="active_title">社区活动</view>
			<view class="active_list">
				<!--:scroll-left="scrollLeft"-->
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation>
					<view class="cu-item" :class="item.typeCd==curTypeCd?'text-green cur':''"
						v-for="(item,index) in activitiTitle" :key="index" @tap="selectActiviti(item)" :data-id="index">
						{{item.typeName}}
					</view>
				</scroll-view>
				<view class="noticesList bg-white margin-top-1" v-if="notices && notices.length > 0">
					<block v-for="(item,index) in notices" :key="index" wx:key="index">
						<view class="noticesList-list" @tap="_toDetail(item)">
							<view class="notices-info">
								<view class="notices-info-name">{{item.title}}</view>

								<view class="notice-bottom">
									<view>
										<text class="lg text-gray cuIcon-time"></text>
										<text class="notice-startTime margin-left-xs">{{item.startTime}}</text>
									</view>
								</view>
							</view>
							<view class="notices-info-image">
								<image :src="item.src" />
							</view>
						</view>
					</block>
				</view>
				<view class="active_empty" v-else>
					<image :src="noImg" />
					<text class="text">暂无活动哦~</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getActivitiTitle,
		getCategoryList,
		loadActivites,
		loadAdverts
	} from '../../api/index/indexApi.js'
	export default {
		name: "indexNotice",
		data() {
			return {
				notices: [],
				activitiTitle: [],
				noImg:this.imgUrl+'/h5/images/serve/empty.png',
				curTypeCd: '',
				page: 1,
				row: 7,
				communityId: '',
			};
		},
		created() {
			this._loadData();
		},
		methods:{
			_loadData:function(){
				let _that = this;
				this.vc.getCurCommunity()
					.then(function(_communityInfo) {
						_that.communityId = _communityInfo.communityId;
						_that._loadActivitiesType();
					})
			},
			_loadActivitiesType: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 10,
					communityId: _that.communityId,
					defaultShow: 'Y'
				};
				//查询 活动标题
				getActivitiTitle(_objData)
					.then((actType) => {
						_that.activitiTitle = actType;
					})
					.then((acts) => {
						if (_that.activitiTitle.length > 0) {
							_that.curTypeCd = _that.activitiTitle[0].typeCd;
						}
						_that._loadActivites();
					})
			},
			_loadActivites: function() {
				let _that = this;
				if (this.curTypeCd == '') {
					return;
				}
				let _objData = {
					page: this.page,
					row: this.row,
					communityId: this.communityId,
					typeCd: this.curTypeCd,
					defaultShow: 'Y',
					clientType: 'H5'
				};
				//加载活动
				loadActivites(_objData)
					.then(function(_acts) {
						_that.notices = _that.notices.concat(_acts);
					});
			},
			_toDetail: function(_item) {
				this.vc.navigateTo({
					url: '/pages/activites/activitesDetail?activitiesId=' + _item.activitiesId +
						'&title=' + _item.title +
						'&communityId=' + _item.communityId
				});
			},
			selectActiviti: function(_item) {
				this.curTypeCd = _item.typeCd;
				this.notices = [];
				this.page = 1;
				this._loadActivites();
			},
		}
	}
</script>

<style lang="less">
	.active_box {
		padding: 0 20upx;
		margin-bottom: 20upx;

		.active_title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20upx 0;
			font-size: 30upx;
			font-weight: 600;

			.more {
				font-size: 24upx;
				font-weight: 400;
				color: #999;
			}
		}

		.active_list {
			border-radius: 5px;
		}

		.active_empty {
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 100rpx 0;
			border-radius: 10px;

			image {
				width: 50%;
				height: 200upx;
			}

			.text {
				font-size: 28rpx;
				color: #333;
				margin-top: 20rpx;
			}
		}

		.active_item {
			display: inline-block;
			padding: 20upx;
			width: 20%;
			text-align: center;
			font-size: 28upx;

			image {
				height: 64upx;
				width: 64upx;
			}

			.text {
				white-space: nowrap;
				font-size: 20upx;
				font-weight: 400;
			}
		}

		.home_item:last-child {
			margin-right: 0;
		}
	}
	
	
	.noticesList-list{
	  font-size: 25rpx;
	  display: flex;
	  width: 100%;
	  padding: 10rpx 0;   
	  border-bottom: 1rpx solid #ECECEC;
	  color: #6D6D6D;
	  justify-content: space-between;
	}
	.notices-info-name{
	  margin-top: 10rpx;
	  color: black;
	  font-size: 30rpx;
	  display: -webkit-box;  /*设置为弹性盒子*/
	  -webkit-line-clamp: 2;  /*最多显示5行*/
	  overflow: hidden;  /*超出隐藏*/
	  text-overflow: ellipsis;  /*超出显示为省略号*/
	  -webkit-box-orient: vertical;
	  word-break: break-all;  /*强制英文单词自动换行*/
	}
	.notices-info-image image{
	  width: 200rpx;
	  height: 150rpx;
	  margin: 10rpx 20rpx 0rpx 20rpx;
	  border-radius: 10rpx;
	}
	.notices-info{
	  margin: 10rpx 0rpx 0rpx 20rpx;
	  height: 150rpx;
	  flex-direction: column;
	  display: flex;
	  justify-content: space-between;
	}
	.notice-bottom{
	  display: flex;
	  text-align: left;
	}
	.notice-bottom view{
	  margin-right: 20rpx;
	}
	
	.notice-bottom icon{
	  color: #8a8a8a;
	  display: inline-block;
	  width: 40rpx;
	  height: 40rpx;
	}
	.notice-bottom view text{
	  font-size: 25rpx;
	  line-height: 40rpx;
	}
</style>
