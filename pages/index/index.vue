<template>
	<view>
		<view class="home_wrap">
			<!--首页广告-->
			<index-ads></index-ads>
			<index-menu></index-menu>
		</view>

		<index-notice></index-notice>
		
		
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import indexAds from '@/components/index/index-ads.vue'
	import indexMenu from '@/components/index/index-menu.vue'
	import indexNotice from '@/components/index/index-notice.vue'
	import {
		getActivitiTitle,
		getCategoryList,
		loadActivites,
		loadAdverts
	} from '../../api/index/indexApi.js'
	import {
		getCommunityId,
		getMallCommunityId,
		getMallCommunityName
	} from '../../api/community/communityApi.js';

	import {
		getCurOwner
	} from '../../api/owner/ownerApi.js'

	import {
		hasLogin
	} from '../../lib/java110/page/Page.js'

	import {
		hasOwner
	} from '../../api/owner/ownerApi.js'
	export default {
		data() {
			return {
				selectCommunityName: "",
				communityId: '',
				ad: [],
				
				categoryList: [],
				selected: 0,
				mask1Hidden: true,
				mask2Hidden: true,
				animationData: "",
				location: "",
				characteristicSelected: [false, false, false, false, false, false, false],
				discountSelected: null,
				selectedNumb: 0,
				sortSelected: "综合排序",
				
			};
		},
		components: {
			uniNoticeBar,
			indexAds,
			indexMenu,
			indexNotice
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			this.vc.onLoad(options);
			//查询目录
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		onShareAppMessage: function() {
			return {
				title: '首页',
				path: '/pages/index/index?wAppId=' + this.vc.getWAppId(),
				success: function(res) {
					// 转发成功
				},
				fail: function(res) {
					// 转发失败
				}
			}
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.selectCommunityName = getMallCommunityName();
			let _that = this;
			_that.location = this.vc.getStorageSync('location');
			if (hasLogin()) {
				_that.judgeBindOwnerFun();
			}

			_that.ad = [];
			this._initIndexData();
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if (this.notices.length >= this.page * this.row) {
				this.page = this.page + 1;
				this._loadActivites();
			}
		},
		methods: {
			_initIndexData: function() {
				let _that = this;
				//查询当前小区信息
				this.vc.getCurCommunity()
					.then(function(_communityInfo) {
						_that.communityId = _communityInfo.communityId;
						//查询小区活动信息
						_that._loadAdvertPhoto();
					})
			},
			
			judgeBindOwnerFun: function() {
				//查询业主
				getCurOwner();
			},
			/**
			 * 加载活动
			 * 第一次加载是可能没有小区 则直接下载固定小区
			 *
			 */
			
			
			showModal: function(e) {
				this.vc.navigateTo({
					url: '../bindOwner/bindOwner'
				});
			},
			toPage: function(pageUrl) {
				hasOwner();
				this.vc.navigateTo({
					url: pageUrl
				});
			},
			
			//切换小区
			toSelectArea(e) {
				this.vc.navigateToMall({
					url: `/pages/selectcommunity/selectcommunity`
				}, true)
			},
		}
	};
</script>
<style lang="less">
	@import "./index.css";

	.bock-icon {
		height: 34upx;
		width: 14upx;
		line-height: 100upx;
		background-color: #00AA00;
	}

	.margin-top-1 {
		margin-top: 2upx;
	}

	.tec-height {
		height: 120upx;
	}

	.home_hd {
		position: relative;
		height: 30upx;
		margin-bottom: 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.home_wrap {
		padding: 20upx 20upx 0;
	}

	.home_swiper {
		margin-bottom: 20upx;
	}

	

	.new_box {
		background: #fff;
		padding: 20upx;
		margin-bottom: 20upx;

		.new_wrap {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.new_item {
			position: relative;
			display: inline-block;
			padding: 20upx;
			margin-right: 20upx;
			width: calc((100% - 40upx) / 2);
			background: #f5f5f5;
			border-radius: 5upx;

			.new_font {
				z-index: 2;
			}

			.name {
				font-size: 28upx;
				font-weight: 600;
				color: #333;
				text-align: left;
			}

			.text {
				font-size: 24upx;
				font-weight: 400;
				color: #999;
			}

			image {
				width: 160upx;
				height: 120upx;
			}
		}

		.new_item:last-child {
			margin-right: 0;
		}
	}

	
</style>
