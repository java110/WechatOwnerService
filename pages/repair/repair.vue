<template>
	<view>
		<view class="block__title">房屋信息</view>
		<view class="cu-form-group">
			<view class="title">位置</view>
			<picker bindchange="PickerChange" :value="repairScopeIndex" :range="repairScopes" :range-key="'name'" @change="repairScopeChange">
				<view class="picker">
					{{repairScopes[repairScopeIndex].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow" v-if="repairObjType == '002' || repairObjType =='003'" @tap="chooseFloor">
			<view class="title">楼栋</view>
			<input required readonly label="楼栋" v-model="floorNum" class="text-right" placeholder="请选择楼栋" name="floorNum" icon="arrow"></input>
			<text class='cuIcon-right'></text>
		</view>
		<view class="cu-form-group arrow" v-if="repairObjType =='003'" @tap="chooseUnit">
			<view class="title">单元</view>
			<input v-model="unitNum" placeholder="请选择单元" class="text-right"></input>
			<text class='cuIcon-right'></text>
		</view>
		<view class="cu-form-group" v-if="repairObjType == '004'">
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
			<picker id="complaintType" bindchange="PickerChange" 
			:value="repairTypeIndex" 
			:range-key="'repairTypeName'" 
			:range="repairTypes" 
			v-if = "repairTypes.length>0"
			 @change="repairTypeChange">
				<view class="picker">
					{{repairTypes.length==0 ? "请选择" : repairTypes[repairTypeIndex].repairTypeName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group" v-if="priceScope !=''">
			<view class="title">收费标准</view>
			<input disabled="disable" v-model="priceScope" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">报修人</view>
			<input v-model="bindRepairName" placeholder="请输入报修人" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="bindTel" placeholder="请输入手机号" class="text-right"></input>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">预约日期</view>
			<picker mode="date" :value="bindDate" start="2020-09-01" end="2050-09-01" @change="dateChange">
				<view class="picker">
					{{bindDate}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">预约时间</view>
			<picker mode="time" :value="bindTime" start="08:30" end="22:00" @change="timeChange">
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
				{{imgList.length}}/4
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
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
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
	import * as TanslateImage from '../../utils/translate-image.js';
	import {checkPhoneNumber,checkStrLength} from '../../utils/StringUtil.js'
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
				typeName: '',
				repairType: '',
				typeShow: false,
				timeShow: false,
				imgList: [],
				bindTel: '',
				context: '',
				bindRepairName: '',
				userId: '',
				userName: '',
				storeId: '',
				photos: [],
				communityId: "",
				communityName: "",
				complaintIndex: 0,
				index: 0,
				repairScopes: [{
						id: '001',
						name: '小区'
					},
					{
						id: '002',
						name: '楼栋'
					},
					{
						id: '003',
						name: '单元'
					},
					{
						id: '004',
						name: '房屋'
					}
				],
				repairTypes: [],
				repairTypeIndex: 0,
				repairScopeIndex: 3,
				repairObjType: '004',
				repairObjId: '',
				repairObjName: '',
				floorNum: '',
				floorId: '',
				unitNum: '',
				unitId: '',
				priceScope: '',
			};
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
				})
				that.roomCloums = roomCloums;
				that.roomIdArr = roomIdArr;
				that.userId = res.data.owner.userId;
				that.userName = res.data.owner.appUserName;
				that.communityId = res.data.owner.communityId;
				that.communityName = res.data.owner.communityName;
			});

			//加载报修类型
			this._loadRepairTypes();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let _floor = uni.getStorageSync("_selectFloor");

			if (_floor != null && _floor != undefined && _floor != '') {
				this.floorNum = _floor.floorNum + "栋";
				this.floorId = _floor.floorId;
			}

			let _unit = uni.getStorageSync("_selectUnit");
			if (_unit != null && _unit != undefined && _unit != '') {
				this.unitNum = _unit.unitNum + "单元";
				this.unitId = _unit.unitId;
			}
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {
			//清理楼栋和单元
			uni.removeStorageSync('_selectFloor');
			uni.removeStorageSync('_unitFloor');

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
					"photos": [],
					"context": this.context,
					"userId": this.userId,
					"userName": this.userName,
					"communityId": this.communityId,
					"bindDate": this.bindDate,
					"bindTime": this.bindTime,
					"repairObjType": this.repairObjType,
					"repairChannel": 'Z'
				}
				console.log(obj);

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

				let _photos = this.photos;
				_photos.forEach(function(_item) {
					obj.photos.push({
						"photo": _item
					});
				});

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
						url: constant.url.saveOwnerRepair, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
						header: context.getHeaders(),
						method: "POST",
						data: obj, //动态数据
						success: function(res) {
							let _json = res.data;
							if (_json.code == 0) {
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
			deleteImage: function(e) {
				console.log(e);
				let imageArr = this.$data.imgList;
				imageArr.splice(e, 1);
				this.photos.splice(e, 1);
			},
			ChooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						that.$data.imgList.push(res.tempFilePaths[0]);
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
			roomChange: function(e) {
				this.roomId = this.roomIdArr[e.detail.value];
				this.roomName = this.roomCloums[e.detail.value];
			},
			repairScopeChange: function(e) {
				console.log('改变费用完成')
				this.repairScopeIndex = e.target.value //取其下标
				let selected = this.repairScopes[this.repairScopeIndex] //获取选中的数组
				this.repairObjType = selected.id //选中的id
				this._loadRepairTypes();
			},
			repairChange: function(e) {
				this.typeName = this.columns[e.detail.value];
				this.typeId = this.repairIdAttr[e.detail.value];
			},
			repairTypeChange: function(e) {
				this.repairTypeIndex = e.target.value //取其下标
				let selected = this.repairTypes[this.repairTypeIndex] //获取选中的数组
				if(selected == undefined){
					return;
				}
				console.log('selected',selected);
				this.repairType = selected.repairType //选中的id
				let _payFeeFlag = selected.payFeeFlag;

				if (_payFeeFlag == 'T') {
					this.priceScope = selected.priceScope;
				} else {
					this.priceScope = '';
				}

			},
			dateChange: function(e) {
				this.bindDate = e.detail.value;
			},
			timeChange: function(e) {
				this.bindTime = e.detail.value;
			},
			chooseFloor: function(e) {
				console.log('点击调用了', e);
				context.navigateTo({
					url: '/pages/selectFloor/selectFloor'
				});
			},
			chooseUnit: function(e) {
				if (this.floorId == null || this.floorId == '') {
					uni.showToast({
						title: "请先选择楼栋"
					});
					return;
				}
				context.navigateTo({
					url: '/pages/selectUnit/selectUnit?floorId=' + this.floorId
				});
			},
			_loadRepairTypes: function() {
				let _communityInfo = context.getCurrentCommunity();
				let _that = this;
				// 公共区域标识
				let publicArea = _that.repairObjType == '004' ? 'F' : 'T';
				// 默认选择第一个
				_that.repairTypeIndex = 0;
				let dataObj = {
					page: 1,
					row: 50,
					communityId: _communityInfo.communityId,
					publicArea: publicArea
				};
				uni.request({
					url: constant.url.listRepairSettings,
					header: context.getHeaders(),
					method: "GET",
					data: dataObj,
					//动态数据
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0 && _json.data.length > 0) {
							_that.repairTypes = _json.data;

							let selected = _that.repairTypes[_that.repairTypeIndex] //获取选中的数组
							_that.repairType = selected.repairType //选中的id
							let _payFeeFlag = selected.payFeeFlag;

							if (_payFeeFlag == 'T') {
								_that.priceScope = selected.priceScope;
							}else{
								_that.priceScope = '';
							}
						}else{
							uni.showToast({
								icon:"none",
								title:"未配置报修设置"
							})
						}
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
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
