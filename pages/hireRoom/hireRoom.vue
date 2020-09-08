<template>
	<view>
		<view class="block__title">房屋信息</view>
		<view class="cu-form-group">
			<view class="title">出租标题</view>
			<input v-model="priceScope" placeholder="如香格里拉豪华大单间" style="text-align:right"></input>
		</view>
		<view class="cu-form-group" >
			<view class="title">房屋信息</view>
			<picker bindchange="PickerChange" :value="index" :range="roomCloums" @change="roomChange">
				<view class="picker">
					{{roomName?roomName:'请选择'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group" v-if="builtUpArea !=''">
			<view class="title">房屋面积</view>
			<input v-model="builtUpArea" style="text-align:right" disabled="disabled"></input>
		</view>
		<view class="cu-form-group" v-if="apartment !=''">
			<view class="title">户型</view>
			<input v-model="apartment" style="text-align:right" disabled="disabled"></input>
		</view>
		<view class="cu-form-group" v-if="layer !=''">
			<view class="title">楼层</view>
			<input v-model="layer" style="text-align:right" disabled="disabled"></input>
		</view>

		<view class="block__title">出租信息</view>
		<view class="cu-form-group">
			<view class="title">付费类型</view>
			<picker id="paymentType" bindchange="PickerChange" :value="paymentTypeIndex" :range-key="'paymentTypeName'" :range="paymentTypes" @change="paymentTypeChange">
				<view class="picker">
					{{paymentTypes[paymentTypeIndex].paymentTypeName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="bindTel" placeholder="请输入手机号"></input>
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
				<view class="bg-img" :key="index" v-for="(img,index) in imgList" bindtap="ViewImage" :data-url="imgList[index]">
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
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;

	export default {
		data() {
			return {
				minDate: new Date().getTime(),
				rooms:[],
				apartment:'',
				builtUpArea:'',
				layer:'',
				roomCloums: [],
				roomIdArr: [],
				roomName: "",
				roomId: '',
				roomShow: false,
				typeName: '',
				typeShow: false,
				timeShow: false,
				imgList: [],
				bindTel: '',
				context: '',
				bindRepairName: '',
				userId: '',
				userName:'',
				storeId: '',
				photos: [],
				communityId: "",
				communityName: "",
				complaintIndex: 0,
				index: 0,
				paymentTypes: [{
					id:'1001',
					paymentTypeName:'押一付一'
				},{
					id:'2002',
					paymentTypeName:'押一付三'
				},{
					id:'3003',
					paymentTypeName:'押一付六'
				}],
				paymentTypeIndex:0,
				paymentType: '',
				paymentTypeName: '',
				priceScope:'',
			};
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			this.vc.onLoad(options);
			context.getRooms().then(res => {
				let arr = res.data.rooms;
				that.rooms = arr;
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
		
		},

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
					"userName":this.userName,
					"communityId": this.communityId,
					"bindDate": this.bindDate,
					"bindTime": this.bindTime,
					"repairObjType":this.repairObjType
				}

				if (this.repairObjType == '001') {
					obj.repairObjId = this.communityId;
					obj.repairObjName = this.communityName;
				} else if (this.repairObjType == '002') {
					obj.repairObjId = this.floorId;
					obj.repairObjName = this.floorNum ;
				} else if (this.repairObjType == '003') {
					obj.repairObjId = this.unitId;
					obj.repairObjName = this.floorNum  + this.unitNum ;
				}else{
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
				}else if(obj.repairObjId == ''){
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
			
			deleteImage: function(e) {
				console.log(e);
				let imageArr = this.$data.imgList;
				imageArr.splice(e, 1);
			},
			ChooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						that.$data.imgList.push(res.tempFilePaths[0]);
						let _base64Photo = '';
						factory.base64.urlTobase64(res.tempFilePaths[0]).then(function(_res) {
							_base64Photo = _res;
							console.log('base64', _base64Photo);
							that.photos.push(_base64Photo);
						});
					}
				});
			},
			roomChange: function(e) {
				let _that = this;
				this.roomId = this.roomIdArr[e.detail.value];
				this.roomName = this.roomCloums[e.detail.value];
				
				this.rooms.forEach(function(item){
					if(item.roomId == _that.roomId){
						_that.apartment = item.apartment;
						_that.builtUpArea = item.builtUpArea;
						_that.layer = item.layer;
					}
				})
			},
			paymentTypeChange:function(e){
				this.paymentTypeIndex = e.target.value //取其下标
				let selected = this.paymentTypes[this.paymentTypeIndex] //获取选中的数组
				this.paymentType = selected.id //选中的id
				this.paymentTypeName = selected.paymentTypeName //选中的id
			},
			_loadRepairTypes:function(){
				let _communityInfo = context.getCurrentCommunity();
				let _that =this;
				let dataObj = {
					page: 1,
					row: 50,
					communityId: _communityInfo.communityId,
				};
				uni.request({
					url: constant.url.listRepairSettings,
					header: context.getHeaders(),
					method: "GET",
					data: dataObj,
					//动态数据
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							
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
