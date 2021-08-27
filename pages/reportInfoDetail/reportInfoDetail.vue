<template>
	<view>
		<view style="background-color: white;padding: 40rpx 30rpx 10rpx;text-align: center;
			color: black;font-size: 20px;">{{setting.name}}</view>
		<view class="" v-for="(item,index) in titles" :key="index">
			<view class="block__title">{{index+1}}，{{item.title}}</view>
			<radio-group class="block" @change="radioChange($event,item)" v-if="item.titleType == '1001'">
				<view class="cu-form-group" v-for="(valueItem,valueIndex) in item.reportInfoSettingTitleValueDtos"
					:key="valueIndex">
					<view class="title">{{valueItem.qaValue}}</view>
					<radio :class="item.radio==valueItem.valueId?'checked':''"
						:checked="item.radio==valueItem.valueId?true:false" :value="valueItem.valueId">
					</radio>
				</view>
			</radio-group>
			<checkbox-group class="block" @change="checkboxChange($event,item)" v-else-if="item.titleType == '2002'">
				<view class="cu-form-group " v-for="(valueItem,valueIndex) in item.reportInfoSettingTitleValueDtos">
					<view class="title">{{valueItem.qaValue}}</view>
					<checkbox :class="item.radio[valueIndex].selected == '1'?'checked':''"
						:checked="item.radio[valueIndex].selected == '1'?true:false" :value="valueItem.valueId">
					</checkbox>
				</view>
				<!--:checked="item.radio[valueIndex].checked?true:false"-->
			</checkbox-group>
			<view v-else>
				<view class="cu-form-group ">
					<textarea maxlength="512" v-model="item.radio" placeholder="请回答"></textarea>
				</view>
			</view>
		</view>
		
		<view class="block__title">人员信息</view>
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
			<input :value="tel" @input="bindInput" data-name="tel" required label="手机号" clearable placeholder="请输入手机号" name="tel"></input>
		</view>
		<view class="button_up_blank"></view>
		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitQuestionAnswer()">提交</button>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");

	import {
		saveReportInfoAnswerValue,
		querySettingTitle,
		querySetting
	} from '../../api/reportInfo/reportInfoApi.js'

	export default {
		data() {
			return {
				name: '',
				idCard: '',
				tel: '',
				setting:{},
				titles: [],
				qaId: '',
				objType: ''
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			this.settingId = options.settingId;
			this.communityId = options.communityId;
			querySetting({
					communityId: this.communityId,
					settingId: this.settingId,
					page: 1,
					row: 100
				})
				.then(_data => {
					that.setting = _data.data[0];
				});
			querySettingTitle({
					communityId: this.communityId,
					settingId: this.settingId,
					page: 1,
					row: 100
				})
				.then(_data => {
					_data.data.forEach(item => {
						if (item.titleType == '1001') {
							item.radio = ''
						} else if (item.titleType == '2002') {
							// checked: false
							item.radio = [];
							item.reportInfoSettingTitleValueDtos.forEach(value => {
								item.radio.push({
									checked: false,
									valueId: value.valueId,
									selected: '0'
								})
							})
						} else {
							item.radio = ''
						}
					})
					
					that.titles = _data.data;
				});
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			bindInput: function(e) {
				let _that = this;
				let dataset = e.currentTarget.dataset;
				let value = e.detail.value;
				let name = dataset.name;
				_that[name] = value; //  
			},
			radioChange: function(e, item) {
				item.radio = e.detail.value;
			},
			checkboxChange: function(e, item) {
				item.radio.forEach(value => {
					value.selected = '0';
					value.checked = false;
				})
				item.radio.forEach(value => {
					e.detail.value.forEach(_dValue =>{
						if (value.valueId == _dValue) {
							if (value.selected == '0') {
								value.selected = '1';
								value.checked = true;
							}
						}
					})
				})
			},
			submitQuestionAnswer: function(e) {
				let obj = {
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
				}else if(obj.name == "") {
					msg = "请填写姓名";
				} else if (obj.idCard == "" || obj.idCard.length != 18) {
					msg = "请正确填写身份证号";
				} else if (obj.tel == "" || obj.tel.length != 11) {
					msg = "请正确填写的手机号";
				}
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					return
				}
				let _questionAnswerTitles = [];
				let _titles = this.titles;
				let _valueId = '';
				_titles.forEach(item => {
					if (item.titleType == '2002') {
						let _valueContent = [];
						item.radio.forEach(_radio => {
							if (_radio.selected == '1') {
								_valueContent.push(_radio.valueId)
							}
						})
						_questionAnswerTitles.push({
							communityId: this.communityId,
							valueContent: _valueContent,
							titleId: item.titleId,
							titleType: item.titleType
						})
					} else {
						_valueId = item.radio;
						_questionAnswerTitles.push({
							communityId: this.communityId,
							valueContent: _valueId,
							titleId: item.titleId,
							titleType: item.titleType
						})
					}
				});
				let reflag = false;
				_questionAnswerTitles.forEach(item => {
					if(item.valueContent.toString().length == 0){
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						});
						reflag = true;
						return false;
					}
				});
				if(reflag){
					uni.showToast({
						icon: 'none',
						title: '有未答项，请作答！'
					});
					return false;
				}
				obj = {
					"settingId": this.settingId,
					"communityId":this.communityId,
					"personName": this.name,
					"idCard": this.idCard,
					"tel": this.tel,
					questionAnswerTitles: _questionAnswerTitles,
				}
				saveReportInfoAnswerValue(obj)
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
			}}
	};
</script>
<style>
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.6);
		padding: 40rpx 30rpx 10rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}
</style>
