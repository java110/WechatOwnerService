<template>
	<view>
		<view class="block__title">基础信息</view>
		<view class="cu-form-group">
			<view class="title">放行类型</view>
			<picker id="complaintType" bindchange="PickerChange" :value="typeId" :range-key="'typeName'"
				:range="itemReleaseTypes" v-if="itemReleaseTypes.length>0" @change="repairTypeChange">
				<view class="picker">
					{{itemReleaseTypes.length==0 ? "请选择" : itemReleaseTypes[typeId].typeName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">申请单位</view>
			<input v-model="applyCompany" placeholder="请输入申请单位" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">申请人</view>
			<input v-model="applyPerson" placeholder="请输入申请人" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="applyTel" placeholder="请输入手机号" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			<input v-model="idCard" placeholder="请输入身份证" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">车牌号</view>
			<input v-model="carNum" placeholder="请输入车牌号" class="text-right"></input>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">通行日期</view>
			<picker mode="date" :value="bindDate" :start="todayDate" end="2050-09-01" @change="dateChange">
				<view class="picker">
					{{bindDate}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">通行时间</view>
			<picker mode="time" :value="bindTime" :start="todayDateTime" end="22:00" @change="timeChange">
				<view class="picker">
					{{bindTime}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top arrow" @tap="_addRes">
			<view class="title">放行物品</view>
			<view class=" arrow">请添加</view>
		</view>
		<view class="cu-form-group margin-top">
			<textarea v-model="remark" placeholder="选填,请填写备注"></textarea>
		</view>
		<view class="button_up_blank"></view>

		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitRepair()">提交</button>
		</view>

	</view>
</template>

<script>
	// pages/enterCommunity/enterCommunity.js
	import {
		checkPhoneNumber,
		checkStrLength
	} from '../../lib/java110/utils/StringUtil.js';
	
	import {getItemReleaseType} from '../../api/itemRelease/itemReleaseApi.js';
	import {getCurOwner} from '../../api/owner/ownerApi.js';
	import context from '../../lib/java110/Java110Context.js'
	const constant = context.constant;
	const factory = context.factory;
	import {
		formatDate,
		formatHourAndMin
	} from '@/lib/java110/utils/DateUtil.js'

	export default {
		data() {
			return {
				bindDate: '请选择',
				bindTime: '请选择',
				typeId: '',
				applyCompany: '',
				applyPerson: '',
				idCard: '',
				applyTel: '',
				passTime: '',
				resNames: [],
				state: '',
				carNum: '',
				remark: '',
				itemReleaseTypes: [],
				typeIndex:0,
				communityId:'',
				todayDate:'',
				todayDateTime:'',
				audit: {
					assignee: '',
					staffId: '',
					staffName: '',
					taskId: ''
				},
			};
		},
		components: {

		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			context.onLoad(options);
			getCurOwner().then(_data=>{
				that.userId = _data.userId;
				that.applyCompany = _data.appUserName;
				that.applyPerson = _data.appUserName;
				that.applyTel = _data.link;
				that.communityId = _data.communityId;
			}).then(()=>{
				//加载报修类型
				that._loadTypes();
			});

			
			this.todayDate = formatDate(new Date());
			this.todayDateTime = formatHourAndMin(new Date())
		},

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
					"repairType": this.repairType,
					"appointmentTime": this.bindDate + " " + this.bindTime + ":00",
					"tel": this.bindTel,
					"roomId": this.roomId,
					"photos": this.photos,
					"context": this.context,
					"userId": this.userId,
					"userName": this.userName,
					"communityId": this.communityId,
					"bindDate": this.bindDate,
					"bindTime": this.bindTime,
					"repairObjType": this.repairObjType,
					"repairChannel": 'Z'
				}

				if (this.repairObjType == '001') {
					obj.repairObjId = this.communityId;
					obj.repairObjName = this.communityName;
				} else if (this.repairObjType == '002') {
					obj.repairObjId = this.floorId;
					obj.repairObjName = this.floorNum;
				} else if (this.repairObjType == '003') {
					obj.repairObjId = this.unitId;
					obj.repairObjName = this.floorNum + this.unitNum;
				} else {
					obj.repairObjId = this.roomId;
					obj.repairObjName = this.roomName;
				}
				// 预约时间校验
				let oppoTime = Date.parse(new Date(obj.appointmentTime.replace(/-/g, '/'))),
					now = Date.parse(new Date());
				let msg = "";
				if (obj.repairType == "") {
					msg = "请选择报修类型";
				} else if (obj.repairName == "") {
					msg = "请填写报修人";
				} else if (checkStrLength(obj.repairName) > 10) {
					msg = "报修人长度不能超过5位";
				} else if (obj.tel == "") {
					msg = "请填写手机号";
				} else if (!checkPhoneNumber(obj.tel)) {
					msg = "手机号有误";
				} else if (obj.bindDate == "请选择") {
					msg = "请选择预约日期";
				} else if (obj.bindTime == "请选择") {
					msg = "请选择预约时间";
				} else if (now - oppoTime > 1800 * 1000) {
					msg = "预约时间有误";
				} else if (obj.context == "") {
					msg = "请填写报修内容";
				} else if (obj.repairObjId == '') {
					msg = "请选择报修位置";
				}
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				} else {
					context.request({
						url: constant.url
						.saveOwnerRepair, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
						header: context.getHeaders(),
						method: "POST",
						data: obj, //动态数据
						success: function(res) {
							let _json = res.data;
							if (_json.code == 0) {
								// wx.redirectTo({
								// 	url: '/pages/repair/myRepair',
								// });
								uni.navigateTo({
									url: "/pages/successPage/successPage?msg=提交成功&objType=4004"
								})
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
			repairChange: function(e) {
				this.typeName = this.columns[e.detail.value];
				this.typeId = this.repairIdAttr[e.detail.value];
			},
			repairTypeChange: function(e) {
				this.typeIndex = e.target.value //取其下标
				let selected = this.itemReleaseTypes[this.typeIndex] //获取选中的数组
				if (selected == undefined) {
					return;
				}
				this.typeId = selected.typeId //选中的id

			},
			dateChange: function(e) {
				this.bindDate = e.detail.value;
				if (this.bindDate == formatDate(new Date()).replaceAll('/', '-')) {
					this.todayDateTime = formatHourAndMin(new Date());
				} else {
					this.todayDateTime = '8:30';
				}
			},
			timeChange: function(e) {
				this.bindTime = e.detail.value;
			},
			_loadTypes: function() {
				let _that = this;
				getItemReleaseType({
					page:1,
					row:100,
					communityId:this.communityId
				}).then(_data=>{
					_that.itemReleaseTypes = _data;
				})
			},
			_addRes:function(){
				uni.navigateTo({
					url:'/pages/itemRelease/addItemReleaseResource'
				});
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
