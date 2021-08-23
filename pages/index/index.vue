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
						<image :src="item.url" @click="_advertJump(item)"></image>
					</swiper-item>
				</block>
			</swiper>

			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="item.typeCd==curTypeCd?'text-green cur':''" v-for="(item,index) in activitiTitle"
				 :key="index" @tap="selectActiviti(item)" :data-id="index">
					{{item.typeName}}
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
					您确认拨打,{{property.communityName}}物业客服电话<br />{{property.sCommunityTel}}
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
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import {getActivitiTitle,getCategoryList,loadActivites,loadAdverts} from '../../api/index/indexApi.js'
	import {getProperty} from '../../api/property/propertyApi.js'

	import {getCurOwner} from '../../api/owner/ownerApi.js'

	import {hasLogin} from '../../auth/Java110Auth.js'
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
				activitiTitle: [],
				curTypeCd: '',
				categoryList: {},
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
			this.vc.onLoad(options);		
			//查询目录
			this.categoryList = getCategoryList();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		onShareAppMessage:function() {
			return {
				title: '首页',
				path: '/pages/index/index?wAppId='+this.vc.getWAppId(),
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
			let _that = this;
			_that.location = this.vc.getStorageSync('location');
			if (hasLogin()) {
				_that.judgeBindOwnerFun();
			}
			_that.notices = [];
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
				.then(function(_communityInfo){
					_that.communityId = _communityInfo.communityId;
					//查询小区活动信息
					_that._loadAdvertPhoto();
				})
				.then(function(){
					_that._loadActivitiesType();
				})
			},
			_loadActivitiesType:function(){
				let _that = this;
				let _objData = {
					page: 1,
					row: 10,
					communityId: _that.communityId,
					defaultShow:'Y' 
				};
				//查询 活动标题
				getActivitiTitle(_objData)
				.then((actType)=>{
					_that.activitiTitle = actType;

				})
				.then((acts)=>{
					if(_that.activitiTitle.length > 0){
						_that.curTypeCd = _that.activitiTitle[0].typeCd;
					}
					_that._loadActivites();
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
			_loadActivites: function() {
				let _that = this;
				if(this.curTypeCd == ''){
					return ;
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
				.then(function(_acts){
					_that.notices = _that.notices.concat(_acts);
				});
			},
			_loadAdvertPhoto: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 5,
					locationTypeCd:'2000',
					viewType:'8888',
					clientType: 'H5'
				};
				//查询 广告
				loadAdverts(_objData)
				.then(function(_aPhotos){
					_that.ad = _aPhotos;
				});
			},
			moreActivitiesFun: function() {
				this.vc.navigateTo({
					url: '/pages/activites/activites'
				});
			},
			showModal: function(e) {
				this.vc.navigateTo({
					url: '../bindOwner/bindOwner'
				});
			},
			callPropertyTel: function() { //拨打电话
				let _that = this;
				if (!hasLogin()) {
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					});
					return;
				}
				uni.getStorage({
					key: 'ownerInfo',
					success: function (res) {
						console.log(res.data);
						_that.property = res.data;
						_that.callPropertyModal = true;
					}
				});
			},
			_doCall: function() {
				let _that = this;
				uni.makePhoneCall({
					// 手机号
					phoneNumber: _that.property.sCommunityTel,
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
				this.vc.navigateTo({
					url: '/pages/activitesDetail/activitesDetail?activitiesId=' + _item.activitiesId + '&title=' + _item.title +
						'&communityId=' + _item.communityId
				});
			},
			_cancleCall: function() {
				this.callPropertyModal = false;
			},
			selectActiviti: function(_item) {
				this.curTypeCd = _item.typeCd;
				this.notices = [];
				this.page = 1;
				this._loadActivites();
			},
			toPage: function(pageUrl) {
				this.vc.navigateTo({
					url: pageUrl
				});
			},
			_advertJump: function(ad){
				console.log(ad);
				if(ad.advertType == 3 || !ad.pageUrl){
					return;
				}
				if(ad.advertType == 2){
					// 站外
					let url = encodeURIComponent(ad.pageUrl)
					uni.navigateTo({
						url:'/pages/hcWebView/hcWebView?url='+url
					})
					return;
				}
				if(ad.advertType == 1){
					// 站内
					uni.navigateTo({
						url: ad.pageUrl
					})
					return;
				}
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

	.margin-top-1 {
		margin-top: 2upx;
	}

	.tec-height {
		height: 120upx;
	}
</style>
