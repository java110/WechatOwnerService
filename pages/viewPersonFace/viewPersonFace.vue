<template>
	<view class="vpf_context">
		<view class="vpf_row">
			<view class="vpf_row_black">
			</view>
			<view class="vpf_row_title">
				<text>人脸信息</text>
			</view>
			<view class="vpf_row_black_01"></view>
			<view class="vpf_image">
				<view class="padding">
					<image :src="face" class="round cu-avatar" mode="scaleToFill" style="width: 480upx;height: 480upx;background-color: #eeeeee;"></image>
				</view>
			</view>
			<view class="vpf_row_black_03"></view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green lg" @click="collectFace()">{{btnValue}}</button>
			</view>
			<view class="vpf_row_black_04"></view>
		</view>
	</view>
</template>

<script>
	// pages/viewPersonFace/viewPersonFace.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;

	export default {
		data() {
			return {
				face: null,
				btnValue: "采集人脸"
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			this.face = '';
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.loadOwnerFace();
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
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			collectFace: function() {
				let _that = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success: function (res) {
						let _photosPromise = factory.base64.urlTobase64(res.tempFilePaths[0]);
						_photosPromise.then((photo) => {
							_that.uploadOwnerPhoto(photo);
						}, (e) => {
							console.log(e);
						})
				    }
				});
			},
			uploadOwnerPhoto: function(_photos) {
				let _that = this;
			
				context.getOwner(function(_owner) {
					let _memberId = _owner.memberId;
					let _communityId = _owner.communityId;
					let obj = {
						memberId: _memberId,
						communityId: _communityId,
						photo: _photos
					};
					context.request({
						url: constant.url.uploadOwnerPhoto,
						header: context.getHeaders(),
						method: "POST",
						data: obj,
						//动态数据
						success: function(res) {
							console.log(res);
							if (res.statusCode != 200) {
								wx.showToast({
									title: '人脸上传失败',
									icon: 'none',
									duration: 2000
								});
								return;
							} //成功情况下跳转
							_that.loadOwnerFace();
						},
						fail: function(e) {
							wx.showToast({
								title: "服务器异常了",
								icon: 'none',
								duration: 2000
							});
			
							_that.uploadFlag = false;
						}
					});
				});
			},

			/**
			 * 查询业主人脸
			 */
			loadOwnerFace: function() {
				let _that = this;

				context.getOwner(function(_owner) {
					let _face = constant.url.getOwnerPhotoPath + "?objId=" + _owner.memberId + "&communityId=" + _owner.communityId +
						"&fileTypeCd=10000&time=" + new Date();

					_that.face = _face;
				});
			}
		}
	};
</script>
<style>
	@import "./viewPersonFace.css";
</style>
