<template>
	<view>
		<view class="block__title">基本信息</view>
		<view class="cu-form-group">
			<view class="title">姓名</view>
			<input v-model="name" placeholder="请输入成员名称"></input>
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
			<view class="title">身份证</view>
			<input v-model="idCard" placeholder="请输入身份证"></input>
		</view>
		<view class="block__title">联系信息</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="link" placeholder="请输入手机号"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">验证码</view>
			<input v-model="msgCode" placeholder="请输入短信验证码" name="input"></input>
			<button class='cu-btn bg-green shadow' :disabled="btnDisabled" @click="sendMsgCode()">{{btnValue}}</button>
		</view>
		
		<view class="block__title">相关图片</view>
		
		<view class="cu-bar bg-white ">
			<view class="action">
				图片上传
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
	const context = require("../../context/Java110Context.js");
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
				"ownerTypeCd": "1002",
				"idCard": "",
				"age": "",
				"memberId": "-1",
				"communityId": "",
				"remark": '',
				"second": 60,
				"btnDisabled":false,
				"btnValue": "验证码",
				"msgCode":'',
				imgList: [],
				photos:[]
			};
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			 context.onLoad(options);
			context.getOwner(function(_owner) {
				_that.ownerId = _owner.memberId;
				_that.communityId = _owner.communityId;
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
		methods: {
			submitOwnerMember: function(e) {
				console.log('this',this);
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
					"msgCode":this.msgCode,
				}
				if(this.photos.length> 0){
					obj.ownerPhoto = this.photos[0];
				}
				let msg = "";
				if (obj.ownerId == "") {
					msg = "请填写业主";
				} else if (obj.name == "") {
					msg = "请填写姓名";
				}else if (obj.age == "") {
					msg = "请填写年龄";
				} else if (obj.idCard == "") {
					msg = "请填写身份证";
				}else if (obj.link == "") {
					msg = "请填写手机号";
				}else if (obj.msgCode == "") {
					msg = "请填写验证码";
				}
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
					console.log("提交数据", obj);
					context.request({
						url: constant.url.saveOwner,
						header: context.getHeaders(),
						method: "POST",
						data: obj,
						// data:obj, //动态数据
						success: function(res) {
							console.log(res, 99999);

							if (res.statusCode == 200) {
								uni.hideLoading();
								uni.navigateBack();
								return;
							}

							uni.hideLoading();
							uni.showToast({
								title: res.data,
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
			sexChange: function(e) {
				console.log("onConfirm", e);
				this.sex = e.detail.value;
			},
			sendMsgCode: function() {
				console.log('获取验证码');
				var _that = this;

				let obj = {
					tel: this.link
				};

				if (obj.tel == '') {
					wx.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 2000
					});
					return;
				}

				uni.request({
					url: constant.url.userSendSms,
					header: context.getHeaders(),
					method: "POST",
					data: obj, //动态数据
					success: function(res) {
						console.log(res);
						//成功情况下跳转
						if (res.statusCode == 200) {
							wx.showToast({
								title: '验证码下发成功',
								icon: 'none',
								duration: 2000
							});
							wx.hideLoading();
							_that.timer();
							return;
						}
						wx.hideLoading();
						wx.showToast({
							title: res.data,
							icon: 'none',
							duration: 2000
						});
					},
					fail: function(e) {
						wx.hideLoading();
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});


			},
			timer: function() {
				let promise = new Promise((resolve, reject) => {
					let setTimer = setInterval(
						() => {
							var second = this.second - 1;
							this.second = second;
							this.btnValue = second + '秒';
							this.btnDisabled = true;
							if (this.second <= 0) {
								this.second = 60;
								this.btnValue = '获取验证码';
								this.btnDisabled = false;
								resolve(setTimer)
							}
						}, 1000)
				})
				promise.then((setTimer) => {
					clearInterval(setTimer)
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
					sourceType: ['album','camera'], //从相册选择
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
