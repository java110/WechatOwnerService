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

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(img,index) in imgList" :key="index" bindtap="ViewImage" :data-url="imgList[imageIndex]">
					<image :src='imgList[index]' mode='aspectFill'></image>
					<view class="cu-tag bg-red" @tap="deleteImage(index)" :data-index="imageIndex">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>
		<view class="button_up_blank"></view>
		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="bindOwner()">提交</button>
		</view>
	</view>
</template>

<script>
	// pages/enterCommunity/enterCommunity.js
	import * as TanslateImage from '../../utils/translate-image.js';
	import {checkPhoneNumber} from '../../utils/StringUtil.js'
	const context = require("../../context/Java110Context.js");
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
				communityId: ""
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			context.onLoad(options);
			context.getRooms().then(res => {
				console.log(res);
				let arr = res.data.rooms;
				let roomCloums = [];
				let roomIdArr = [];
				arr.map(item => {
					roomCloums.push(item.floorNum + "号楼" + item.unitNum + "单元" + item.roomNum + "室");
					roomIdArr.push(item.roomId);
				});
				console.log(that);
				that.roomCloums = roomCloums;
				that.roomIdArr = roomIdArr;
				that.userId = res.data.owner.appUserId;
				that.communityId = res.data.owner.communityId;
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
			ChooseImage: function(e) {
				let that = this;
				wx.chooseImage({
						count: 4, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: (res) => {
							console.log(res);
							that.$data.imgList.push(res.tempFilePaths[0]);
							// let _base64Photo = '';
							// factory.base64.urlTobase64(res.tempFilePaths[0]).then(function(_res) {
							// 	_base64Photo = _res;
							// 	console.log('base64', _base64Photo);
							// 	that.photos.push(_base64Photo);
							// });
							var tempFilePaths = res.tempFilePaths[0]
							
							//#ifdef H5
							TanslateImage.translate(tempFilePaths, (url) => {
								that.photos.push(url);
							})
							//#endif
							
							//#ifdef MP-WEIXIN
							factory.base64.urlTobase64(tempFilePaths).then(function(_res) {
								that.photos.push(_res);
							});
							//#endif
						}
				});
			},
			deleteImage: function(e) {
				let imageArr = this.$data.imgList;
				let photoArr = this.$data.photos;
				imageArr.splice(e, 1);
				photoArr.splice(e, 1);
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
					"photos": [],
					"context": this.context,
					"userId": this.userId,
					"communityId": this.communityId
				};
				let _photos = this.photos;

				_photos.forEach(function(_item) {
					obj.photos.push({
						"photo": _item
					});
				});
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
								wx.redirectTo({
									url: '/pages/complaintList/complaintList',
								});
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
			afterRead: function(event) {
				const {
					file
				} = event.detail;

				let _that = this;

				const {
					photoList = []
				} = this;
				photoList.push(file);
				this.photoList = photoList; // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式

				factory.base64.urlTobase64(file.path).then(function(_baseInfo) {
					_that.photos.push(_baseInfo);
				});
				console.log("data信息：", this);
			},
			removePhoto: function(e) {
				console.log(e.detail.index);
				let _photoList = [];
				this.photoList.forEach(function(item, index) {
					if (index != e.detail.index) {
						_photoList.push(item);
					}
				});
				let _photos = [];
				this.photos.forEach(function(item, index) {
					if (index != e.detail.index) {
						_photos.push(item);
					}
				});
				this.photos = _photos;
				this.photoList = _photoList;
			}
		}
	};
</script>
<style>
	@import "./complaint.css";
</style>
