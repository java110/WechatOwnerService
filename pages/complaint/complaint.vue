<template>
	<view>
		<view class="block__title">房屋信息</view>
		<view class="cu-form-group">
			<view class="title">房屋信息</view>
			<picker  :value="index" :range="roomCloums" @change="_changeRoom">
				<view class="picker">
					{{roomName}}
				</view>
			</picker>
		</view>
		<view class="block__title">投诉信息</view>
		<view class="cu-form-group">
			<view class="title">投诉类型</view>
			<picker :value="complaintIndex" :range="columns" @change="_changeComplaint">
				<view class="picker">
					{{typeName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">投诉人</view>
			<input id="complaintName" :value="complaintName" @input="bindInput" placeholder="请输入投诉人"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input id="tel" :value="tel" @input="bindInput" placeholder="请输入手机号"></input>
		</view>
		<view class="cu-form-group margin-top">
			<textarea id="context" :value="context" @input="bindInput" placeholder="请输入投诉内容"></textarea>
		</view>

		<view class="block__title">照片信息</view>
		<uploadImageAsync ref="vcUploadRef" :communityId="communityId" :maxPhotoNum="uploadImage.maxPhotoNum" :canEdit="uploadImage.canEdit" :title="uploadImage.imgTitle" @sendImagesData="sendImagesData"></uploadImageAsync>
		
		<view class="button_up_blank"></view>
		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="bindOwner()">提交</button>
		</view>
	</view>
</template>

<script>
	// pages/enterCommunity/enterCommunity.js
	import * as TanslateImage from '../../lib/java110/utils/translate-image.js';
	
	import {checkPhoneNumber} from '../../lib/java110/utils/StringUtil.js'
	import context from '../../lib/java110/Java110Context.js'
	import uploadImageAsync from "../../components/vc-upload-async/vc-upload-async.vue";
	const constant = context.constant;
	const factory = context.factory;

	export default {
		data() {
			return {
				imgList: [],
				imageIndex: 0,
				index: null,
				complaintIndex: 0,
				roomCloums: [],
				roomIdArr: [],
				roomName: "请选择",
				roomId: '',
				roomShow: false,
				columns: ['投诉', '建议','咨询'],
				typeCds: ['809001', '809002', '809003'],
				typeName: '请选择',
				typeCd: '',
				typeShow: false,
				photoList: [],
				tel: '',
				context: '',
				complaintName: '',
				userId: '',
				storeId: '',
				photos: [],
				communityId: "",
				uploadImage: {
					maxPhotoNum: 4,
					imgTitle: '图片上传',
					canEdit: true
				}
			};
		},
		
		components: {
			uploadImageAsync
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			context.onLoad(options);
			context.getRooms().then(res => {
				let arr = res.data.rooms;
				let roomCloums = [];
				let roomIdArr = [];
				arr.map(item => {
					roomCloums.push(item.floorNum + "号楼" + item.unitNum + "单元" + item.roomNum + "室");
					roomIdArr.push(item.roomId);
				});
				that.roomCloums = roomCloums;
				that.roomIdArr = roomIdArr;
				that.userId = res.data.owner.appUserId;
				that.communityId = res.data.owner.communityId;
				that.complaintName = res.data.owner.appUserName;
				that.tel = res.data.owner.link;
			});
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

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
			sendImagesData: function(e){
				this.photos = [];
				if(e.length > 0){
					e.forEach((img) => {
						this.photos.push(img.fileId);
					})
				}
			},
			_changeComplaint:function(e){
				this.typeName = this.columns[e.detail.value];
				this.typeCd = this.typeCds[e.detail.value];
			},
			_changeRoom: function(e) {
				this.roomName = this.roomCloums[e.detail.value];
				this.roomId = this.roomIdArr[e.detail.value];
			},
			bindInput: function(e) {
				console.log('数据监听', e);
				switch (e.target.id) {
					case "complaintName":
						this.$data.complaintName = e.detail.value;
						break;
					case "tel":
						this.$data.tel = e.detail.value;
						break;
					case "context":
						this.$data.context = e.detail.value;
						break;
				}
				console.log(this);
			},
			bindOwner: function(e) {
			
				let obj = {
					"typeCd": this.typeCd,
					"complaintName": this.complaintName,
					"tel": this.tel,
					"roomId": this.roomId,
					"photos": this.photos,
					"context": this.context,
					"userId": this.userId,
					"communityId": this.communityId
				};
				let msg = "";

				if (obj.typeCd == "") {
					msg = "请选择投诉类型";
				} else if (obj.complaintName == "") {
					msg = "请填写投诉人";
				} else if (obj.tel == "") {
					msg = "请填写手机号";
				} else if (!checkPhoneNumber(obj.tel)) {
					msg = "手机号有误";
				} else if (obj.context == "") {
					msg = "请填写投诉内容";
				}

				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				} else {
					console.log("提交数据", obj);
					context.request({
						url: constant.url.saveComplaint,
						header: context.getHeaders(),
						method: "POST",
						data: obj,
						//动态数据
						success: function(res) {
							let _json = res.data;
							if (_json.code == 0) {
								// wx.redirectTo({
								// 	url: '/pages/complaintList/complaintList',
								// });
								uni.navigateTo({
									url:"/pages/successPage/successPage?msg=提交成功&objType=4004"
								})
								return;
							}
							wx.showToast({
								title: "服务器异常了",
								icon: 'none',
								duration: 2000
							})
						},
						fail: function(e) {
							console.log(e);
							wx.showToast({
								title: "服务器异常了",
								icon: 'none',
								duration: 2000
							});
						}
					});
				}
			},
			onChange: function(e) {
				console.log(e);
			},
			onTypeConfirm: function(e) {
				console.log("onConfirm", e);
				this.typeName = e.detail.value;
				this.typeCd = e.detail.index ? '809001' : '809002';
				this.typeShow = false;
			},
			onTypeCancel: function(e) {
				this.typeShow = false;
			},
			chooseType: function(e) {
				this.typeShow = true;
			},
			onRoomConfirm: function(e) {
				console.log("onConfirm", e);
				this.roomName = e.detail.value;
				this.roomId = this.roomIdArr[e.detail.index];
				this.roomShow = false;
			},
			onRoomCancel: function(e) {
				this.roomShow = false;
			},
			chooseRoom: function(e) {
				this.roomShow = true;
			},
		}
	};
</script>
<style>
	@import "./complaint.css";
</style>
