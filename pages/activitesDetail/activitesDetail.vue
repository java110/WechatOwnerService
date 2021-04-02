<template>
	<!--pages/detail/detail.wxml -->
	<view class="detailContainer">
		<image class="headImg" v-if="showHeadImg" :src="src" @error="hideHeadImg()"></image>
		<view class="ad_titile">
			<text class="company">{{title}}</text>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' + headerImg + ')' }"></view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">{{userName}}</view>
						<view class="cu-tag round bg-orange sm">管理员</view>
					</view>
					<view class="text-gray text-sm ">
						<view class="text-cut">
							<text class="margin-right-xs"></text>
							{{startTime}}
							<text class="iconfont iconyuedu padding-left"></text> {{readCount}}
							<text class="iconfont icongood-fill padding-left"></text> {{likeCount}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ad_context">
			<!-- <rich-text :nodes="context"></rich-text> -->
			<jyf-parser :html="context" ref="article"></jyf-parser>
		</view>
	</view>
</template>

<script>
	import {
		recoveryCommunityInfo
	} from '../../api/community/communityApi.js'

	import {
		getCurOwner
	} from '../../api/owner/ownerApi.js'

	import url from '../../constant/url.js'

	import {
		loadActivites
	} from '../../api/index/indexApi.js'
	
	import conf from '../../conf/config.js'
	
	import {replaceImgSrc} from  '../../utils/ImageUtil.js';
	
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		data() {
			return {
				showHeadImg: true,
				activitiesId: '',
				title: '',
				readCount: '',
				likeCount: '',
				communityId: '',
				src: '',
				userName: '',
				startTime: '',
				headerImg: '',
				context: ''
			};
		},

		components: {jyfParser},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.vc.onLoad(options);
			this.activitiesId = options.activitiesId;
			this.title = options.title;
			this.readCount = options.readCount;
			this.likeCount = options.likeCount;
			this.communityId = options.communityId;
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let _that = this;

			recoveryCommunityInfo(this)
				.then((_communityInfo) => {
					_that.loadActiviteFun();
				})
			this.loadOwnerHeaderImg();

		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			loadOwnerHeaderImg: function() {
				let _that = this;
				getCurOwner().then((_owner) => {
					let _headerImg = url.getOwnerPhotoPath + "?objId=" + _owner.memberId + "&communityId=" + _owner.communityId +
						"&fileTypeCd=10000&time=" + new Date();
					_that.headerImg = _headerImg;
					_that.userName = _owner.appUserName;
				});
			},
			loadActiviteFun: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 1,
					communityId: this.communityId,
					activitiesId: this.activitiesId
				};
				let _urlPath = '';
				// #ifdef MP-WEIXIN
				_urlPath = conf.baseUrl
				// #endif
				loadActivites(_objData)
					.then((_acts) => {
						let _activites = _acts[0];
						_that.src = _activites.src;
						_that.userName = _activites.userName;
						_that.startTime = _activites.startTime;
						_that.context = replaceImgSrc(_activites.context,conf.commonBaseUrl);
						_that.readCount = _activites.readCount;
						_that.likeCount = _activites.likeCount;
						wx.setNavigationBarTitle({
						  title: _activites.title
						})
					});
			},
			hideHeadImg: function() {
				this.showHeadImg = false;
			}
		}
	};
</script>
<style>
	@import "./activitesDetail.css";
</style>
