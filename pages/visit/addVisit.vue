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
			<view class="title">访客车牌号</view>
			<input v-model="carNum" placeholder="请输入访客车牌号" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">随行人数</view>
			<input v-model="entourage" placeholder="请输入随行人数" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">开始时间</view>
			<uni-datetime-picker v-model="visitTime" :disabled="true"></uni-datetime-picker>
		</view>
		<view class="cu-form-group">
			<view class="title">结束时间</view>
			<uni-datetime-picker v-model="departureTime"></uni-datetime-picker>
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
		<view class="cu-bar bg-white ">
			<view class="action">
				照片上传
			</view>
			<view class="action">
				{{imgList.length}}/1
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(img,index) in imgList" :key='index' bindtap="ViewImage" :data-url="imgList[index]">
					<image :src='imgList[index]' mode='aspectFill'></image>
					<view class="cu-tag bg-red" @tap="deleteImage(index)" :data-index="index">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>

		<view class="button_up_blank"></view>

		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitVisit()">提交</button>
		</view>
	</view>
</template>

<script>
	// pages/visit/addVisit.js
	import context from '../../lib/java110/Java110Context.js';
	const factory = context.factory;
	const constant = context.constant;
	import uniDatetimePicker from '../../components/uni-datetime-picker/uni-datetime-picker.vue'
	import {formatTimeNow} from '../../lib/java110/utils/DateUtil.js'
	import {checkPhoneNumber,checkStrLength} from '../../lib/java110/utils/StringUtil.js'
	import * as TanslateImage from '../../lib/java110/utils/translate-image.js';

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
				entourage: '',
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
				communityId: '',
				roomId: '',
				roomName: '',
				imgList: [],
				photos: [],
			};
		},

		components: {
			uniDatetimePicker
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
				that.communityId = res.data.owner.communityId;
			});
		},
		
		methods: {
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
			// 上传图片
			deleteImage: function(e) {
				this.imgList.splice(e, 1);
				this.photos.splice(e, 1);
			},
			ChooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						that.imgList.push(res.tempFilePaths[0]);
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
					photo: '',
					videoPlaying: false,
					ownerId: this.ownerId,
					communityId: this.communityId
				};
				if(this.photos.length > 0){
					obj.photo = this.photos[0];
				}
				console.log(obj);
				
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
				} else if (obj.entourage == "") {
					msg = "请填写随行人数";
				} else if (!/^\d+$/.test(obj.entourage) && obj.entourage != 0){
					msg = "随行人数有误";
				} else if (obj.departureTime == "") {
					msg = "请选择结束时间";
				} else if (obj.visitCase == "") {
					msg = "请填写拜访事由";
				}else{
					let start = Date.parse(new Date(obj.visitTime.replace(/-/g, '/')))
					let end = Date.parse(new Date(obj.departureTime.replace(/-/g, '/')))
					if (end == 0 || start - end >= 0) {
						msg = "结束时间有误";
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
				
				context.request({
					url: constant.url.saveAddVisit,
					header: context.getHeaders(),
					method: "POST",
					data: obj, //动态数据
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							wx.redirectTo({
								url: '/pages/visit/addVisitSuccess',
							});
							return;
						}
						wx.showToast({
							title: _json.msg,
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
