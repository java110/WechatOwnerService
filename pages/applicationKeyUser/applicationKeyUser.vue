<template>
	<view>

		<view class="block__title">业主信息</view>

		<view class="cu-form-group">
			<view class="title">姓名</view>
			<input  v-model="name" required label="姓名" clearable placeholder="请输入名称" name="name"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">年龄</view>
			<input  v-model="age" type="number" label="年龄" placeholder="请输入年龄" required clearable name="age"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">性别</view>
			<picker @change="PickerChange" :value="sex" :range="sexList">
				<view class="picker">
					{{index>-1?sexList[index]:'请选择性别'}}
				</view>
			</picker>
		</view>

		<view class="block__title">身份信息</view>
		<view class="cu-form-group">
			<view class="title">身份</view>
			<picker :value="typeCdName" @change="PickerIdentChange" :range="typeCdList">
				<view class="picker" @change="onChange" @cancel="onCancel" @confirm="onConfirm">
					{{indexIdent>-1?typeCdList[indexIdent]:'请选择身份'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			<input v-model="idCard" required label="身份证" clearable placeholder="请输入身份证"
			 name="idCard"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">有效期</view>
			<picker :value="expiry" @change="PickerExpiryChange" :range="expiryList">
				<view class="picker">
					{{indexExpiry>-1?expiryList[indexExpiry]:'请选择有效期'}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="tel" type="number" required label="手机号" clearable placeholder="请输入手机号" name="tel"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">验证码</view>
			<input v-model="msgCode" placeholder="请输入短信验证码" name="input"></input>
			<button class='cu-btn bg-green shadow' type="number" :disabled="btnDisabled" @click="sendMsgCode()">{{btnValue}}</button>
		</view>

		<view class="block__title">证件照片</view>
		<view class="cu-bar bg-white ">
			<view class="action">
				请上传身份证正反面
			</view>
			<view class="action">
				{{imgList.length}}/2
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-2 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap="removePhoto(index)" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage()" v-if="imgList.length<2">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<view class="button_up_blank"></view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green lg" @click="saveApplicationKey()">提交申请</button>
		</view>
		<view class="button_up_blank"></view>
	</view>
</template>

<script>
	
	import {
		getCurOwner
	} from '../../api/owner/ownerApi.js'
	
	import {getProperty}  from '../../api/property/propertyApi.js'
	
	import {formatTime,addMonth,addYear} from '../../utils/DateUtil.js'
	
	import {sendMessageCode} from '../../api/common/commonApi.js'
	
	import {applyApplicationKey} from '../../api/applicationKey/applicationKeyApi.js'
	
	import base64 from '../../factory/Base64Factory.js'
	

	export default {
		data() {
			return {
				index: -1,
				indexIdent: -1,
				indexExpiry: -1,
				locations: [],
				communityId: '',
				showTypeCd: false,
				typeCdList: ['业主', '家庭成员', '租客'],
				typeCdName: '业主',
				sexList: ['男', '女'],
				showSex: false,
				showExpiry: false,
				expiryList: ['一个月', '半年', '一年'],
				photoList: [],
				name: '',
				age: null,
				sex: '男',
				typeCd: "10004",
				idCard: '',
				startTime: null,
				endTime: null,
				tel: '',
				photos: [],
				msgCode: '',
				imgList: [],
				expiry: "",
				second: 60,
				btnValue: '验证码',
				btnDisabled: false,
				propertyId: ''
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			this.vc.onLoad(options);
			getCurOwner()
			.then((_owner) =>{
				_that.name = _owner.appUserName;
				_that.idCard = _owner.idCard;
				_that.tel = _owner.link;
			});
			this.locations = JSON.parse(options.locations);
			this.communityId = options.communityId;

			getProperty()
			.then(function(_property) {
				_that.propertyId = _property.storeId;
			})
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let _startTime = formatTime(new Date());
			this.startTime = _startTime;
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
				console.log('选择性别', e);
				this.showSex = false;
				this.sex = e.detail.value;
			},
			PickerIdentChange(e) {
				this.indexIdent = e.detail.value
			},
			PickerExpiryChange(e) {
				this.indexExpiry = e.detail.value
				let _endTime = null;
				if (e.detail.value == '一个月') {
					_endTime = formatTime(addMonth(new Date(), 1));
				} else if (e.detail.value == '半年') {
					_endTime = formatTime(addMonth(new Date(), 6));
				} else {
					_endTime = formatTime(addYear(new Date(), 1));
				}

				this.showExpiry = false;
				this.expiry = e.detail.value;
				this.endTime = _endTime;
			},

			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			removePhoto: function(_index) {
				let _imgList = [];
				this.imgList.forEach(function(item, index) {
					if (index != _index) {
						_imgList.push(item);
					}
				});
				let _photos = [];
				this.photos.forEach(function(item, index) {
					if (index != _index) {
						_photos.push(item);
					}
				});
				this.photos = _photos;
				this.imgList = _imgList;
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
						base64.urlTobase64(res.tempFilePaths[0]).then(function(_res) {
							_base64Photo = _res;
							console.log('base64', _base64Photo);
							that.photos.push(_base64Photo);
						});
					}
				});
			},
			sendMsgCode: function() {
				var _that = this;

				let obj = {
					tel: this.tel
				};
				if (obj.tel == '') {
					wx.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				sendMessageCode(obj,_that);
			},
			

			/**
			 * 选择身份
			 */
			chooseTypeCd: function() {
				this.showTypeCd = true;
			},
			onConfirm: function(e) {
				console.log("onConfirm", e);
				let _typeCd = "";

				if (e.detail.index == 0) {
					_typeCd = "10004";
				} else if (e.detail.index == 1) {
					_typeCd = "10005";
				} else {
					_typeCd = "10006";
				}

				this.showTypeCd = false;
				this.typeCd = _typeCd;
				this.typeCdName = e.detail.value;
			},
			onChange: function(e) {
				console.log(e);
			},
			onCancel: function(e) {
				this.showTypeCd = false;
			},
			chooseSex: function() {
				this.showSex = true;
			},
			onSexConfirm: function(e) {
				console.log("onConfirm", e);
				this.showSex = false;
				this.sex = e.detail.value;
			},
			onSexChange: function(e) {
				console.log(e);
			},
			onSexCancel: function(e) {
				this.showSex = false;
			},
			chooseExpiry: function() {
				this.showExpiry = true;
			},
			onExpiryConfirm: function(e) {
				console.log("onConfirm", e);
				let _endTime = null;

				if (e.detail.value == '一个月') {
					_endTime = formatTime(addMonth(new Date(), 1));
				} else if (e.detail.value == '半年') {
					_endTime = formatTime(addMonth(new Date(), 6));
				} else {
					_endTime = formatTime(addYear(new Date(), 1));
				}

				this.showExpiry = false;
				this.expiry = e.detail.value;
				this.endTime = _endTime;
			},
			onExpiryChange: function(e) {
				console.log(e);
			},
			onExpiryCancel: function(e) {
				this.showExpiry = false;
			},


			saveApplicationKey: function() {
				//保存钥匙信息
				let _objData = {
					name: this.name,
					age: this.age,
					sex: this.sex,
					typeCd: this.typeCd,
					idCard: this.idCard,
					startTime: this.startTime,
					endTime: this.endTime,
					tel: this.tel,
					photos: [],
					msgCode: this.msgCode,
					communityId: this.communityId,
					machineIds: [],
					typeFlag: '1100102',
					storeId: this.propertyId
				};
				let _photos = this.photos;
				_photos.forEach(function(_item) {
					_objData.photos.push({
						"photo": _item
					});
				});

				let msg = '';

				if (_objData.name == '') {
					msg = '请填写名称';
				}

				if (_objData.age == null) {
					msg = "请填写年龄";
				}

				if (_objData.sex != 0 && _objData.sex != 1) {
					msg = "请选择性别";
				}

				if (_objData.typeCd == '') {
					msg = "请选择身份";
				}

				if (_objData.idCard == '') {
					msg = "请填写身份证";
				}

				if (_objData.startTime == null) {
					msg = "请选择有效期";
				}

				if (_objData.endTime == null) {
					msg = "请选择有效期";
				}

				if (_objData.tel == '') {
					msg = "请选择填写手机号";
				}

				if (_objData.photos == null || _objData.photos.length < 2) {
					msg = "请选择证件照片";
				}

				if (_objData.msgCode == '') {
					msg = "请填写验证码";
				}

				if (this.locations == null || this.locations.length < 1) {
					msg = "没有设备可申请钥匙";
				}

				if (msg != '') {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					return;
				}

				this.locations.forEach(function(_item) {
					_objData.machineIds.push({
						"machineId": _item.machineId
					});
				});
				applyApplicationKey(_objData)
				.then((res)=>{
					wx.redirectTo({
						url: "/pages/applicationKeyProgress/applicationKeyProgress"
					});
					return;
				})
				.then((res)=>{
					uni.showToast({
						icon:'none',
						title:res
					});
				})
			}
		}
	};
</script>
<style>
	@import "./applicationKeyUser.css";
</style>
