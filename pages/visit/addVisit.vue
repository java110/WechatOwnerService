<template>
	<view>
		<view class="block__title">房屋信息</view>
		<view class="cu-form-group">
			<view class="title">房屋信息</view>
			<picker :range="roomCloums" @change="roomChange">
				<view class="picker">
					{{roomName?roomName:'请选择'}}
				</view>
			</picker>
		</view>
		<view class="block__title">访客信息</view>
		<view class="cu-form-group">
			<view class="title">访客姓名</view>
			<input v-model="vName" placeholder="请输入访客姓名" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">访客性别</view>
			<picker :value="visitGenderIndex" :range="visitGenderScopes" :range-key="'name'" @change="visitGenderChange">
				<view class="picker">
					{{visitGenderScopes[visitGenderIndex].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">访客联系方式</view>
			<input v-model="phoneNumber" placeholder="请输入访客联系方式" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">车牌号</view>
			<car-number v-model="carNum" style="width: 70%;"></car-number>
			<!-- <input v-model="carNum" placeholder="请输入访客车牌号" class="text-right"></input> -->
		</view>
		<view class="cu-form-group">
			<view class="title">随行人数</view>
			<input v-model="entourage" placeholder="请输入随行人数" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">来访时间</view>
			<uni-datetime-picker v-model="visitTime" style="width: 70%;"></uni-datetime-picker>
		</view>
		<view class="cu-form-group">
			<view class="title">离开时间</view>
			<uni-datetime-picker v-model="departureTime" style="width: 70%;"></uni-datetime-picker>
		</view>
		<view class="block__title">拜访事由</view>
		<view class="cu-form-group">
			<view class="title">事由类型</view>
			<picker :value="reasonTypeIndex" :range="reasonTypeScopes" :range-key="'name'" @change="reasonTypeChange">
				<view class="picker">
					{{reasonTypeScopes[reasonTypeIndex].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">拜访事由</view>
			<input v-model="visitCase" placeholder="请输入拜访事由" class="text-right"></input>
		</view>
		
		<view class="block__title">照片信息</view>
		<uploadImageAsync ref="vcUploadRef" :communityId="communityId" :maxPhotoNum="uploadImage.maxPhotoNum" :canEdit="uploadImage.canEdit" :title="uploadImage.imgTitle" @sendImagesData="sendImagesData"></uploadImageAsync>
		

		<view class="button_up_blank"></view>
		<view class="noti">
			<view class="text-red text-sm margin-left-sm">*预计来访时和预计离开时间间隔不能超过24小时</view>
			<view class="text-red text-sm margin-left-sm">*预约车辆自开始时间起计算，免费停放{{freeInfo.freeTime}}分钟  </view>
			<view class="text-red text-sm margin-left-sm" v-show="freeInfo.freeTimes > 0">*预约车辆每天限制{{freeInfo.freeTimes}}次登记，超过次数系统不会审核</view>
		</view>

		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitVisit()">提交</button>
		</view>
	</view>
</template>

<script>
	// pages/visit/addVisit.js
	import context from '../../lib/java110/Java110Context.js';
	const factory = context.factory;
	import {listOwnerVisit, saveAddVisit}  from '../../api/visit/visit.js'
	import uniDatetimePicker from '../../components/uni-datetime-picker/uni-datetime-picker.vue'
	import CarNumber from '../../components/codecook-carnumber/components/codecook-carnumber/codecook-carnumber.vue'
	import {formatTimeNow} from '../../lib/java110/utils/DateUtil.js'
	import {checkPhoneNumber,checkStrLength} from '../../lib/java110/utils/StringUtil.js'
	import * as TanslateImage from '../../lib/java110/utils/translate-image.js';
	import uploadImageAsync from "../../components/vc-upload-async/vc-upload-async.vue";

	export default {
		data() {
			return {
				vName: '',
				phoneNumber: '',
				visitGender: 0,
				visitGenderIndex: 0,
				visitGenderScopes: [{
						value: '0',
						name: '男'
					},
					{
						value: '1',
						name: '女'
					}
				],
				carNum: '',
				entourage: 0,
				visitTime: '',
				departureTime: '',
				visitCase: '',
				reasonType: 0,
				reasonTypeIndex: 0,
				reasonTypeScopes: [{
						value: '0',
						name: '喜事'
					},
					{
						value: '1',
						name: '白事'
					}
				],
				roomCloums: [],
				roomIdArr: [],
				ownerId: '',
				userId: '',
				communityId: '',
				roomId: '',
				roomName: '',
				photos: [],
				freeInfo: {},
				uploadImage: {
					maxPhotoNum: 1,
					imgTitle: '图片上传',
					canEdit: true
				}
			};
		},

		components: {
			uniDatetimePicker,
			CarNumber,
			uploadImageAsync
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			context.onLoad(options);
			this.visitTime = formatTimeNow();
			// 房屋信息
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
				that.ownerId = res.data.owner.ownerId;
				that.userId = res.data.owner.userId;
				that.communityId = res.data.owner.communityId;
				// 只有一个房屋时，默认选中
				if(roomCloums.length == 1){
					that.roomId = roomIdArr[0];
					that.roomName = roomCloums[0];
				}
				// 查询免费时长、次数信息
				that._queryFreeInfo();
			});
		},
		
		methods: {
			sendImagesData: function(e){
				this.photos = e[0].fileId;
			},
			_queryFreeInfo: function(){
				let _that = this;
				let _objData = {
					page: 1,
					row: 1,
					communityId: _that.communityId,
					addVisitType: 'initAddVisitParameter',
				}
				listOwnerVisit(_objData).then(function(info){
					_that.freeInfo = info;
				})
			},
			// 选择性别
			visitGenderChange: function(e){
				this.visitGenderIndex = e.target.value
				this.visitGender = this.visitGenderScopes[this.visitGenderIndex].value;
			},
			reasonTypeChange: function(e){
				this.reasonTypeIndex = e.target.value
				this.reasonType = this.reasonTypeScopes[this.reasonTypeIndex].value;
			},
			roomChange: function(e) {
				this.roomId = this.roomIdArr[e.detail.value];
				this.roomName = this.roomCloums[e.detail.value];
			},
			// 提交
			submitVisit: function(){
				let obj = {
					roomId: this.roomId,
					roomName: this.roomName,
					vName: this.vName,
					visitGender: this.visitGender,
					phoneNumber: this.phoneNumber,
					carNum: this.carNum,
					entourage: this.entourage,
					visitTime: this.visitTime.replace(/\//g, '-'),
					departureTime: this.departureTime,
					reasonType: this.reasonType,
					visitCase: this.visitCase,
					photo: this.photos,
					videoPlaying: false,
					ownerId: this.ownerId,
					userId: this.userId,
					communityId: this.communityId
				};
				
				let msg = "";
				if (obj.roomId == "") {
					msg = "请选择房屋";
				} else if (obj.vName == "") {
					msg = "请填写访客姓名";
				} else if (checkStrLength(obj.vName) > 10) {
					msg = "访客姓名过长";
				} else if (obj.phoneNumber == "") {
					msg = "请填写手机号";
				} else if (!checkPhoneNumber(obj.phoneNumber)) {
					msg = "手机号有误";
				} else if (obj.entourage === "") {
					msg = "请填写随行人数";
				} else if (!/^\d+$/.test(obj.entourage) && obj.entourage != 0){
					msg = "随行人数有误";
				} else if (obj.departureTime == "") {
					msg = "请选择结束时间";
				} else if (obj.visitCase == "") {
					msg = "请填写拜访事由";
				}else{
					let start = Date.parse(new Date(obj.visitTime.replace(/-/g, '/'))),
					end = Date.parse(new Date(obj.departureTime.replace(/-/g, '/'))),
					now = Date.parse(new Date());
					if(now - start > 1800 * 1000){
						msg = "开始时间有误";
					}else if (end == 0 || start - end >= 0) {
						msg = "结束时间有误";
					}else if(end - start > 86400 * 1000){
						msg = "时间间隔不能超过24小时";
					}
				}
				
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					return;
				}
				let _that = this;
				saveAddVisit(obj).then(function(data){
					if (data.code == 0) {
						// wx.redirectTo({
						// 	url: '/pages/visit/addVisitSuccess?msg=' + data.msg,
						// });
						// 成功跳转详情页
						let _objData = {
							page: 1,
							row: 1,
							ownerId: _that.ownerId,
							userId: _that.userId,
							communityId: _that.communityId
						}
						listOwnerVisit(_objData).then(function(list){
							let info = list.visits[0];
							uni.navigateTo({
								url: '/pages/visit/visitDetail?vId=' + info.vId
							})
						})
						return;
					}
					wx.showToast({
						title: data.msg,
						icon: 'none',
						duration: 2000
					})
				})
			}
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
		onShareAppMessage: function() {}
	};
</script>
<style>
	@import "./addVisit.css";
</style>
