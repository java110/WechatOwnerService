<template>
	<view>
		<view class="block__title">房屋信息</view>
		<view class="cu-form-group">
			<view class="title">房屋信息</view>
			<picker bindchange="PickerChange" :value="index" :range="roomCloums" @change="roomChange">
				<view class="picker">
					{{roomName?roomName:'请选择'}}
				</view>
			</picker>
		</view>

		<view class="block__title">报修信息</view>
		<view class="cu-form-group">
			<view class="title">报修类型</view>
			<picker id="complaintType" bindchange="PickerChange" :value="complaintIndex" :range="columns" @change="repairChange">
				<view class="picker">
					{{typeName?typeName:'请选择'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">报修人</view>
			<input v-model="bindRepairName" placeholder="请输入报修人"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="bindTel" placeholder="请输入手机号"></input>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">预约日期</view>
			<picker mode="date" :value="bindDate" start="2015-09-01" end="2020-09-01" @change="dateChange">
				<view class="picker">
					{{bindDate}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">预约时间</view>
			<picker mode="time" :value="bindTime" start="09:01" end="21:01" @change="timeChange">
				<view class="picker">
					{{bindTime}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<textarea v-model="context" placeholder="请输入报修内容"></textarea>
		</view>
		<view class="block__title">相关图片</view>

		<view class="cu-bar bg-white ">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{photoList.length}}/4
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(img,index) in photoList" bindtap="ViewImage" :data-url="photoList[index]">
					<image :src='photoList[index]' mode='aspectFill'></image>
					<view class="cu-tag bg-red" @tap="removePhoto(index)" :data-index="index">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="photoList.length<4">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>

		<view class="button_up_blank"></view>

		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitRepair()">提交</button>
		</view>

	</view>
</template>

<script>
	// pages/enterCommunity/enterCommunity.js
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;

	export default {
		data() {
			return {
				minDate: new Date().getTime(),
				bindDate: '请选择',
				bindTime: '请选择',
				roomCloums: [],
				roomIdArr: [],
				roomName: "",
				roomId: '',
				roomShow: false,
				columns: ['卧室报修', '管道报修', '客厅报修'],
				repairIdAttr:['10001','10002','10003'],
				typeName: '',
				typeId: '',
				typeShow: false,
				timeShow: false,
				photoList: [],
				bindTel: '',
				context: '',
				bindRepairName: '',
				userId: '',
				storeId: '',
				photos: [],
				communityId: "",
				complaintIndex:0,
				index:0

			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			context.getRooms().then(res => {
				let arr = res.data.rooms;
				let roomCloums = [];
				let roomIdArr = [];
				arr.map(item => {
					roomCloums.push(item.floorNum + "号楼" + item.unitNum + "单元" + item.roomNum + "室");
					roomIdArr.push(item.roomId);
				})
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
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				} else if (type === 'month') {
					return `${value}月`;
				} else if (type === 'day') {
					return `${value}日`;
				}
				return value;
			},


			submitRepair: function(e) {


				let obj = {
					"repairName": this.bindRepairName,
					"repairType": this.typeId,
					"appointmentTime": this.bindDate + " " + this.bindTime + ":00",
					"tel": this.bindTel,
					"roomId": this.roomId,
					"photos": [],
					"context": this.context,
					"userId": this.userId,
					"communityId": this.communityId,
					"bindDate": this.bindDate,
					"bindTime": this.bindTime
				}

				let _photos = this.photos;
				_photos.forEach(function(_item) {
					obj.photos.push({
						"photo": _item
					});
				});

				let msg = "";
				if (obj.roomId == "") {
					msg = "请选择房屋";
				} else if (obj.repairType == "") {
					msg = "请选择报修类型";
				} else if (obj.bindRepairName == "") {
					msg = "请填写报修人";
				} else if (obj.tel == "") {
					msg = "请填写手机号";
				} else if (obj.bindDate == "") {
					msg = "请选择预约日期";
				} else if (obj.bindTime == "") {
					msg = "请选择预约时间";
				} else if (obj.context == "") {
					msg = "请填写投诉内容";
				}
				console.log(obj.roomId);

				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				} else {
					context.request({
						url: constant.url.saveOwnerRepair, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
						header: context.getHeaders(),
						method: "POST",
						data: obj, //动态数据
						success: function(res) {
							if (res.statusCode == 200) {
								wx.redirectTo({
									url: '/pages/myRepair/myRepair',
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
							wx.showToast({
								title: "服务器异常了",
								icon: 'none',
								duration: 2000
							})
						}
					});

				}
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
				this.photoList = photoList;

				factory.base64.urlTobase64(file.path).then(function(_baseInfo) {
					_that.photos.push(_baseInfo);
				});
				console.log("data信息：", this);
			},
			ChooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						if (that.$data.photoList.length) {
							that.$data.photoList.push(res.tempFilePaths[0]);
						} else {
							that.$data.photoList = res.tempFilePaths;
						}
					}
				});
			},
			removePhoto: function(e) {
				console.log(e);
				let imageArr = this.$data.photoList;
				imageArr.splice(e, 1);
			},
			roomChange: function(e) {
				this.roomId = this.roomIdArr[e.detail.value];
				this.roomName = this.roomCloums[e.detail.value];
			},
			repairChange: function(e) {
				this.typeName = this.columns[e.detail.value];
				this.typeId = this.repairIdAttr[e.detail.value];
			},
			dateChange:function(e){
				this.bindDate = e.detail.value;
			},
			timeChange:function(e){
				this.bindTime = e.detail.value;
			}
		}
	};
</script>
<style>
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}
</style>
