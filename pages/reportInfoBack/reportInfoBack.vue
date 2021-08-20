<template>
	<view>
		<!-- <view class="block__title">小区信息</view>
		<view class="cu-form-group">
			<view class="title">小区名称</view>
			<input :value="communityName" @input="bindInput" data-name="communityName" required readonly label="小区名称"
			 ></input>
		</view> -->
		<view class="block__title">返省人员信息上报</view>
		<view class="cu-form-group">
			<view class="title">姓名</view>
			<input :value="name" @input="bindInput" data-name="name" required label="姓名" clearable placeholder="请输入名称"
			 name="name"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			<input :value="idCard" @input="bindInput" data-name="idCard" required label="身份证" clearable placeholder="请输入身份证"
			 name="idCard"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<view>
			<input :value="tel" @input="bindInput" data-name="tel" required label="手机号" clearable placeholder="请输入手机号" name="tel"></input>
		</view>
		</view>
		<view class="cu-form-group">
			<view class="title">来源地</view>
			<picker @change="bindSourceChange" :value="indexSource" :range="arraySourceType" range-key="name">
			        <view >{{arraySourceType[indexSource].name}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">城市名称</view>
			<input :value="sourceCityName" @input="bindInput" data-name="sourceCityName" required label="城市名称" clearable placeholder="请输入城市名称" name="sourceCityName"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">返回日期</view>
			<picker mode="date" :value="bindDate" start="2020-00-01" end="2030-09-01" @change="dateChange">
				<view class="picker">
					{{bindDate}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">返回时间</view>
			<picker mode="time" :value="bindTime" start="00:00" end="23:59" @change="timeChange">
				<view class="picker">
					{{bindTime}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">备注</view>
			<textarea v-model="remark" placeholder="请输入备注"></textarea>
		</view>
		<view class="button_up_blank">
			<button class="cu-btn bg-green lg margin-top" @tap="reportBack">上报数据</button>
		</view>
	</view>
</template>

<script>
	// pages/enterCommunity/enterCommunity.js
	import {
		saveReportInfoBackCity,
		querySettingTitle
	} from '../../api/reportInfo/reportInfoApi.js'
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;

	export default {
		data() {
		 const currentDate = this.getDate({
					format: true
				})
			return {
				areaCode: '',
				communityName: '',
				communityId: '',
				name: '',
				idCard: '',
				tel: '',
				backTime:"",
				bindDate: currentDate,
				bindTime: '12:01',
				areaShow: false,
				arraySourceType: [{'code':"1001",'name':'国内'},{'code':"2002",'name':'国外'}],
				indexSource: 0,
				sourceCityName:"",
				remark:"",
				source:"",
				areaName:null
			};
		},
		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			 if(!options.communityId){
			 	wx.showToast({
			 		title: "小区信息错误，请从新扫码！",
			 		icon: 'none',
			 		duration: 2000
			 	});
				return
			 }
			 this.communityId = options.communityId;
			_that.source = _that.arraySourceType[_that.indexSource].code;
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
			bindSourceChange: function(e) {
				this.indexSource = e.target.value;
				this.source = this.arraySourceType[this.indexSource].code;
			},
			bindInput: function(e) {
				let _that = this;
				let dataset = e.currentTarget.dataset;
				let value = e.detail.value;
				let name = dataset.name;
				_that[name] = value; //  
			},
			reportBack: function(e) {
				let obj = {
					"areaCode": this.areaCode,
					"communityId": this.communityId,
					"communityName": this.communityName,
					"name": this.name,
					"idCard": this.idCard,
					"tel": this.tel,
					"sourceCityName": this.sourceCityName,
					"sourceCity": "-1",
					"source": this.source,
					"bindDate": this.bindDate,
					"bindTime": this.bindTime,
					"remark":this.remark,
					"backTime":this.bindDate + " " + this.bindTime + ":00",
				};
				let msg = "";
				if(obj.communityId == "") {
					msg = "请从新扫码";
				} else if(obj.name == "") {
					msg = "请填写姓名";
				} else if (obj.idCard == "" || obj.idCard.length != 18) {
					msg = "请正确填写身份证号";
				} else if (obj.tel == "" || obj.tel.length != 11) {
					msg = "请正确填写的手机号";
				}else if (obj.sourceCityName == "") {
					msg = "请填写城市名称";
				}else if (obj.bindDate == "请选择") {
					msg = "请选择返回日期";
				} else if (obj.bindTime == "请选择") {
					msg = "请选择返回时间";
				}
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				} else {
					wx.showLoading({
						title: '提交中'
					});
					saveReportInfoBackCity(obj)
						.then(_data => {
							uni.showToast({
								icon: 'none',
								title: '保存成功'
							});
							this.communityId = "";
						}, err => {
							uni.showToast({
								icon: 'none',
								title: err
							})
						})
				}
			},
			onChange: function(e) {
				console.log(e);
			},
			onCancel: function(e) {
				this.areaShow = false;
				// this.setData({
				//   areaShow = false
				// });
			},
			dateChange: function(e) {
				this.bindDate = e.detail.value;
			},
			timeChange: function(e) {
				this.bindTime = e.detail.value;
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	};
</script>
<style>
	@import "./reportInfoBack.css";
</style>
