<template>
	<view>
		<view class="margin-bottom-xs">
			<uni-notice-bar showIcon="true" scrollable="true" single="true" speed="30" text="欢迎访问HC智慧家园"></uni-notice-bar>
		</view>

		<scroll-view @scrolltolower="lower" class="scroll-restaurants-list" scroll-y="true" style="height:100%">
			<swiper class="categoryList padding-top-xs bg-white" indicator-dots="true" indicator-color="rgba(228,228,228,1)"
			 indicator-active-color="#FECA49">
				<block v-for="(item, index) in categoryList" :key="index">
					<swiper-item>
						<block v-for="(item, index2) in item" :key="index2">
							<view class="category-info" v-if="item.href != 'callProperty'">
								<navigator @tap="toPage(item.href)">
									<image :src="item.src" class="category-image"></image>
									<view class="category-text">{{item.name}}</view>
								</navigator>
							</view>
							<view class="category-info" v-if="item.href == 'callProperty'">
								<view @tap="callPropertyTel()">
									<image :src="item.src" class="category-image"></image>
									<view class="category-text">{{item.name}}</view>
								</view>
							</view>
						</block>
					</swiper-item>
				</block>
			</swiper>


			<swiper class="ad-swiper bg-white" indicator-dots="true" indicator-color="rgba(228,228,228,1)"
			 indicator-active-color="#FECA49" autoplay="true" interval="5000" duration="1000" circular="true">
				<block v-for="(item, index) in ad" :key="index">
					<swiper-item>
						<image :src="item.url"></image>
					</swiper-item>
				</block>
			</swiper>

			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="item.typeCd==curTypeCd?'text-green cur':''" v-for="(item,index) in activitiTitle"
				 :key="index" @tap="selectActiviti(item)" :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<view class="noticesList bg-white margin-top-1">
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

		</scroll-view>
		<view class="cu-modal" :class="callPropertyModal==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">拨打电话</view>
					<view class="action" @tap="_cancleCall()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认拨打{{property.name}}-{{property.tel}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleCall()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doCall()">拨号</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/index/index.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	// import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		data() {
			return {
				communityId: '',
				property: {},
				callPropertyModal: false,
				ad: [],
				notices: [],
				page: 1,
				row: 7,
				activitiTitle: [{
						typeCd: '10003',
						name: '公共安全及消防'
					},
					{
						typeCd: '10004',
						name: '政务及党政'
					},
					{
						typeCd: '10005',
						name: '费用公开'
					},
					{
						typeCd: '10001',
						name: '小区文化'
					},
					{
						typeCd: '10002',
						name: '其他'
					}
				],
				curTypeCd: '10003',
				categoryList: {
					pageone: [{
						name: "物业费",
						src: "/static/images/index_property.png",
						href: "/pages/roomFeeList/roomFeeList"
					}, {
						name: "停车费",
						src: "/static/images/index_park.png",
						href: "/pages/payParkingFeeList/payParkingFeeList"
					}, {
						name: "投诉建议",
						src: "/static/images/index_complaint.png",
						href: "/pages/complaint/complaint"
					}, {
						name: "家庭成员",
						src: "/static/images/index_member.png",
						href: "/pages/familyList/familyList"
					}, {
						name: "报修",
						src: "/static/images/index_repair.png",
						href: "/pages/repair/repair"
					}, {
						name: "智慧开门",
						src: "/static/images/index_openDoor.png",
						href: "/pages/openDoor/openDoor"
					}, {
						name: "公告",
						src: "/static/images/index_notice.png",
						href: "/pages/notice/index"
					}, {
						name: "联系客服",
						src: "/static/images/index_persion.png",
						href: "callProperty"
					}]
				},
				selected: 0,
				mask1Hidden: true,
				mask2Hidden: true,
				animationData: "",
				location: "",
				characteristicSelected: [false, false, false, false, false, false, false],
				discountSelected: null,
				selectedNumb: 0,
				sortSelected: "综合排序"
			};
		},

		components: {
			uniNoticeBar
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			let loginStatus = context.checkLoginStatus();
			if(!loginStatus){
				//HC测试小区id
				_that.communityId = constant.mapping.HC_TEST_COMMUNITY_ID;
			}else{
				context.getOwner(function(_owner) {
					let _communityId = '';
					if (_owner == null) {
						_communityId = constant.mapping.HC_TEST_COMMUNITY_ID;
					} else {
						_communityId = _owner.communityId;
					}
					_that.communityId = _communityId;
				});
			}
			_that.loadActivitesFun(); //查询小区广告
			_that.loadCommunityAdvertPhotoFun();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var _that = this;
			_that.location = wx.getStorageSync('location');
			if(context.checkLoginStatus()){
				_that.judgeBindOwnerFun();
			}	
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if(this.notices.length >= this.page * this.row){
				this.page = this.page +1;
				this.loadActivitesFun();
			}
			
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			judgeBindOwnerFun: function() {
				context.getOwner(function(_owner) {
					
				});
			},
			/**
			 * 加载活动
			 * 第一次加载是可能没有小区 则直接下载固定小区
			 * 
			 */
			loadActivitesFun: function() {
				let _that = this;
				let _objData = {
					page: this.page,
					row: this.row,
					communityId: this.communityId,
					typeCd: this.curTypeCd
				};
				context.request({
					url: constant.url.listActivitiess,
					header: context.getHeaders(),
					method: "GET",
					data: _objData,
					//动态数据
					success: function(res) {
						if (res.statusCode == 200) {
							let _activites = res.data.activitiess;
							let _acts = [];

							_activites.forEach(function(_item) {
								_item.src = constant.url.filePath + "?fileId=" + _item.headerImg + "&communityId=" + _that.communityId +
									"&time=" + new Date();

								_acts.push(_item);
							});
							_that.notices = _that.notices.concat(_acts);
							return;
						}

						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
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
			loadCommunityAdvertPhotoFun: function() {
				let _that = this;

				let _objData = {
					page: 1,
					row: 5,
					communityId: this.communityId
				};
				context.request({
					url: constant.url.listAdvertPhoto,
					header: context.getHeaders(),
					method: "GET",
					data: _objData,
					//动态数据
					success: function(res) {
						console.log("请求返回信息：", res);

						if (res.statusCode == 200) {
							let _advertPhotos = res.data;
							let _aPhotos = [];

							_advertPhotos.forEach(function(_item) {
								_item.url = constant.url.hcBaseUrl + _item.url + "&time=" + new Date();

								_aPhotos.push(_item);
							});
							_that.ad = _aPhotos;
							return;
						}

						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
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
			moreActivitiesFun: function() {
				context.navigateTo({
					url: '/pages/activites/activites'
				});
			},
			showModal: function(e) {
				context.navigateTo({
					url: '../bindOwner/bindOwner'
				});
			},
			callPropertyTel: function() { //拨打电话
				let _that = this;
				let loginStatus = context.checkLoginStatus();
				if(!loginStatus){
					uni.navigateTo({
						url: '../showlogin/showlogin'
					});
					return;
				}
				let _objData = {
					page: 1,
					row: 5,
					communityId: this.communityId,
					memberTypeCd: '390001200002'
				};
				context.request({
					url: constant.url.listStore,
					header: context.getHeaders(),
					method: "GET",
					data: _objData,
					//动态数据
					success: function(res) {
						if (res.statusCode == 200) {
							_that.property = res.data.stores[0];
							_that.callPropertyModal = true;
							return;
						}
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
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
			_doCall: function() {
				let _that = this;
				uni.makePhoneCall({
					// 手机号
					phoneNumber: _that.property.tel,

					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},

					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}

				});
			},
			_toDetail: function(_item) {
				uni.navigateTo({
					url: '/pages/activitesDetail/activitesDetail?activitiesId=' + _item.activitiesId + '&title=' + _item.title +
						'&communityId=' + _item.communityId
				});
			},
			_cancleCall: function() {
				this.callPropertyModal = false;
			},
			selectActiviti:function(_item){
				this.curTypeCd = _item.typeCd;
				this.notices = [];
				this.page = 1;
				this.loadActivitesFun();
			},
			toPage:function(pageUrl){
				context.navigateTo({
					url: pageUrl
				});
			}, 
		}
	};
</script>
<style>
	@import "./index.css";

	.bock-icon {
		height: 34upx;
		width: 14upx;
		line-height: 100upx;
		background-color: #00AA00;
	}
	
	.margin-top-1{
		margin-top: 2upx;
	}

	.tec-height {
		height: 120upx;
	}
</style>
