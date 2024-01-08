<template>
	<view>
		<view class="block__title">基本信息</view>
		<view class="cu-form-group">
			<view class="title">姓名</view>
			<input v-model="name" placeholder="请输入成员名称"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			<input v-model="idCard" placeholder="请输入身份证" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">性别</view>
			<picker bindchange="PickerChange" :value="index" :range="sexArr" @change="sexChange">
				<view class="picker">
					{{sex == '0'? '男':'女'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">年龄</view>
			<input type="number" v-model="age" placeholder="请输入年龄"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">人员类型</view>
			<picker :value="typeCdIndex" :range="typeCds" range-key="name" @change="_changeTypeCd">
				<view class="picker">
					{{typeCds[typeCdIndex].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">家庭住址</view>
			<input type="text" v-model="address" placeholder="选填,请输入家庭住址"></input>
		</view>
		
		<view class="block__title">联系信息</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="link" placeholder="请输入手机号(没有手机号随便写一个)"></input>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">验证码</view>
			<input v-model="msgCode" placeholder="请输入短信验证码" name="input"></input>
			<button class='cu-btn bg-green shadow' :disabled="btnDisabled" @click="_sendMsgCode()">{{btnValue}}</button>
		</view> -->
		
		<view class="block__title">相关图片</view>
		<uploadImageAsync ref="vcUploadRef" :communityId="communityId" :maxPhotoNum="uploadImage.maxPhotoNum" :canEdit="uploadImage.canEdit" :title="uploadImage.imgTitle" @sendImagesData="sendImagesData"></uploadImageAsync>
			
		
		<view class="cu-form-group margin-top">
			<textarea v-model="remark" placeholder="请输入备注"></textarea>
		</view>

		<view class="flex flex-direction margin-top margin-bottom">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitOwnerMember()">提交</button>
		</view>
	</view>
</template>

<script>
	// pages/enterCommunity/enterCommunity.js
	import context from '../../lib/java110/Java110Context.js';
	import {isIDCard,checkPhoneNumber,idCardInfoExt} from '../../lib/java110/utils/StringUtil.js';
	import uploadImageAsync from "../../components/vc-upload-async/vc-upload-async.vue";
	import {sendMsgCode} from '../../api/user/userApi.js';
	const constant = context.constant;
	const factory = context.factory;

	export default {
		data() {
			return {
				"sexArr": ["男", "女"],
				"sexShow": false,
				"sex": "0",
				"name": "",
				"link": "",
				"remark": "",
				"ownerId": "",
				"userId": "",
				"typeCds": [
					{
						value: '1002',
						name: '家庭成员'
					},
					{
						value: '1003',
						name: '租客'
					},
					{
						value: '1005',
						name: '其他'
					}
				],
				"typeCdIndex": 0,
				"ownerTypeCd": "1002",
				"idCard": "",
				"age": "",
				"memberId": "-1",
				"communityId": "",
				"second": 60,
				"btnDisabled":false,
				"btnValue": "验证码",
				"msgCode":'',
				"address": "",
				photos:[],
				uploadImage: {
					maxPhotoNum: 1,
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
			let _that = this;
			 context.onLoad(options);
			context.getOwner(function(_owner) {
				_that.ownerId = _owner.ownerId;
				_that.communityId = _owner.communityId;
			});
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		methods: {
			sendImagesData: function(e){
				this.photos = e[0].fileId
			},
			submitOwnerMember: function(e) {
				let obj = {
					"sex": this.sex,
					"name": this.name,
					"link": this.link,
					"remark": this.remark,
					"ownerId": this.ownerId,
					"userId": this.userId,
					"ownerTypeCd": this.ownerTypeCd,
					"age": this.age,
					"memberId": this.memberId,
					"communityId": this.communityId,
					"idCard": this.idCard,
					//"msgCode":this.msgCode,
					"address": this.address,
					"ownerPhoto": this.photos
				}
				
				let msg = "";
				if (obj.ownerId == "") {
					msg = "请填写业主";
				} else if (obj.name == "") {
					msg = "请填写姓名";
				}else if (obj.age == "") {
					msg = "请填写年龄";
				} else if (obj.link == "") {
					msg = "请填写手机号";
				} else if (!checkPhoneNumber(obj.link)){
				 	msg = "手机号有误";
				 }
				 // todo 这里手机号关闭 因为 小朋友没有手机号
				 //else if (obj.msgCode == "") {
				// 	msg = "请填写验证码";
				// }
				if (msg != "") {
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				} else {
					uni.showLoading({
						title: '提交中',
					});
					context.request({
						url: constant.url.saveOwner,
						header: context.getHeaders(),
						method: "POST",
						data: obj,
						success: function(res) {
							if (res.statusCode == 200 && res.data.code == 0) {
								uni.hideLoading();
								uni.navigateBack();
								return;
							}

							uni.hideLoading();
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							});
						},
						fail: function(e) {
							uni.hideLoading();
							uni.showToast({
								title: "服务器异常了",
								icon: 'none',
								duration: 2000
							})
						}
					});
				}
			},
			_changeTypeCd: function(e){
				this.typeCdIndex = e.detail.value;
				this.ownerTypeCd = this.typeCds[this.typeCdIndex].value;
			},
			idCardChange: function(){
				let idCard = this.idCard;
				if(!isIDCard(idCard)){
					uni.showToast({
						title: '身份证号有误',
						icon: 'none',
					});
					return;
				}
				this.sex = idCardInfoExt(idCard, 2);
				this.age = idCardInfoExt(idCard, 3);
			},
			sexChange: function(e) {
				this.sex = e.detail.value;
			},
			_sendMsgCode: function() {
				sendMsgCode(this.link,this);
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
