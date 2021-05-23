<template>
	<view>
		<view class="" v-for="(item,index) in titles" :key="index">
			<view class="block__title">{{item.qaTitle}}</view>
			<radio-group class="block" @change="radioChange($event,item)" v-if="item.titleType == '1001'">
				<view class="cu-form-group" v-for="(valueItem,valueIndex) in item.questionAnswerTitleValues"
					:key="valueIndex">
					<view class="title">{{valueItem.qaValue}}</view>
					<radio :class="item.radio==valueItem.valueId?'checked':''"
						:checked="item.radio==valueItem.valueId?true:false" :value="valueItem.valueId">
					</radio>
				</view>
			</radio-group>
			<checkbox-group class="block" @change="checkboxChange($event,item)" v-else-if="item.titleType == '2002'">
				<view class="cu-form-group " v-for="(valueItem,valueIndex) in item.questionAnswerTitleValues">
					<view class="title">{{valueItem.qaValue}}</view>
					<checkbox :class="item.radio[valueIndex].checked?'checked':''"
						:checked="item.radio[valueIndex].checked?true:false" :value="valueItem.valueId"></checkbox>
				</view>
			</checkbox-group>
		</view>


		<view class="button_up_blank"></view>

		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitQuestionAnswer()">提交</button>
		</view>

	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;

	import {
		queryQuestionAnswerTitle,saveUserQuestionAnswerValue
	} from '../../api/question/questionApi.js'

	export default {
		data() {
			return {
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
			context.onLoad(options);
			this.qaId = options.qaId;
			this.objType = options.objType

			queryQuestionAnswerTitle({
					objType: this.objType,
					qaId: this.qaId,
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
							item.questionAnswerTitleValues.forEach(value => {
								item.radio.push({
									checked: false,
									valueId: value.valueId,
									selected:'0'
								})
							})
						} else {
							item.radio = ''
						}
					})
					that.titles = _data.data;
				})
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			radioChange: function(e, item) {
				console.log(e, item)
				item.radio = e.detail.value;
			},
			checkboxChange: function(e, item) {
				item.radio.forEach(value => {
					if (value.valueId == e.detail.value) {
						if(value.selected == '0'){
							value.selected = '1';
						}else{
							value.selected = '0';
						}
					}
				})
			},
			submitQuestionAnswer: function(e) {

				console.log(this.titles);
				
				let _questionAnswerTitles = [];
				let _titles = this.titles;
				let _valueId = '';
				_titles.forEach(item => {
					
					if (item.titleType == '2002') {
						item.radio.forEach(_radio=>{
							_questionAnswerTitles.push({
								valueContent:_radio.valueId,
								titleId:item.titleId,
								titleType:item.titleType
							})
						})
					} else {
						_valueId = item.radio;
						_questionAnswerTitles.push({
							valueContent:_valueId,
							titleId:item.titleId,
							titleType:item.titleType
						})
					}
				})

				let obj = {
					"qaId": this.qaId,
					"objType": this.objType,
					"objId": context.getUserInfo().communityId,
					"answerType": '1002',
					questionAnswerTitles:_questionAnswerTitles
				}
				
				saveUserQuestionAnswerValue(obj)
				.then(_data=>{
					uni.showToast({
						icon:'none',
						title:'投票成功'
					});
					uni.navigateBack({
						delta:1
					})
				},err=>{
					uni.showToast({
						icon:'none',
						title:err
					})
				})



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
		padding: 40rpx 30rpx 0rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}
</style>
