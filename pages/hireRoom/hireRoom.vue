<template>
	<view>
		<view class="block__title">房屋信息</view>
		<view class="cu-form-group">
			<view class="title">出租标题</view>
			<input v-model="rentingName" placeholder="如香格里拉豪华大单间" class="text-right"></input>
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
			<view class="title">租金</view>
			<input v-model="price" class="text-right" placeholder="请输入每月租金"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">付费类型</view>
			<picker id="rentingType" bindchange="PickerChange" :value="rentingTypeIndex" :range-key="'rentingTypeName'" :range="rentingTypes" @change="rentingTypeChange">
				<view class="picker">
					{{rentingTypes[rentingTypeIndex].rentingTypeName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">服务费</view>
			<input v-model="servicePrice" class="text-right" disabled="disabled" ></input>
		</view>
		
		<view class="cu-form-group margin-top">
			<textarea v-model="rentingDesc" placeholder="请输入描述信息"></textarea>
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
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitHireRoom()">提交</button>
		</view>

	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;
	
	import {queryRentingConfig,hireRoom} from '../../api/room/roomApi.js'

	export default {
		data() {
			return {
				rooms:[],
				apartment:'',
				builtUpArea:'',
				layer:'',
				price:'',
				roomCloums: [],
				roomIdArr: [],
				roomName: "",
				roomId: '',
				roomShow: false,
				imgList: [],
				userTel: '',
				userName:'',
				photos: [],
				communityId: "",
				communityName: "",
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
				rentingTypes: [],
				rentingTypeIndex:0,
				rentingType: '',
				rentingTypeName: '',
				rentingConfigId:'',
				servicePrice:'',
				rentingDesc:'',
				rentingName:''
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
				that.userTel = res.data.owner.link;
				that.userName = res.data.owner.appUserName;
				that.communityId = res.data.owner.communityId;
				that.communityName = res.data.owner.communityName;
			});
			
			//加载报修类型
			this._loadRentingTypes();
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			submitHireRoom: function() {
				let obj = {
					"rentingName": this.rentingName,
					"roomId": this.roomId,
					"communityId": this.communityId,
					"price": this.price,
					"paymentType": this.paymentType,
					"rentingConfigId": this.rentingConfigId,
					"photos": [],
					"rentingDesc": this.rentingDesc,
					"ownerTel": this.userTel,
					"ownerName":this.userName,
					"state":"0"
				}
				let _photos = this.photos;
				_photos.forEach(function(_item) {
					obj.photos.push({
						"photo": _item
					});
				});
				
				hireRoom(obj)
				.then((res)=>{
					
					//跳转页面
					
				},(error)=>{
					console.log(error);
					uni.showToast({
						icon:'none',
						title:error
					})
				})
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
			_loadRentingTypes:function(){
				let _that = this;
				queryRentingConfig()
				.then((_rentingTypes)=>{
					_that.rentingTypes = _rentingTypes;
					if(_rentingTypes.length >0){
						let selected = _rentingTypes[0];
						_that.rentingConfigId = selected.rentingConfigId;
						_that.servicePrice = (selected.servicePrice * selected.serviceOwnerRate)+'元';
					}
				});
			},
			rentingTypeChange:function(e){
				this.rentingTypeIndex = e.target.value //取其下标
				let selected = this.rentingTypes[this.rentingTypeIndex] //获取选中的数组
				this.rentingConfigId = selected.rentingConfigId //选中的id
				this.rentingTypeName = selected.rentingTypeName //选中的id
				this.servicePrice = (selected.servicePrice * selected.serviceOwnerRate)+'元';
			},
			
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
