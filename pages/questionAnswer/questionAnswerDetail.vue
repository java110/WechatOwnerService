<template>
	<view>
		<view class="qa-title text-center text-bold text-lg margin-top-lg">
			{{qaInfo.qaName}}
		</view>
		<view class="flex justify-between padding-lr-sm margin-top-xs">
			<view>问卷人姓名（业主）</view>
			<view>{{qaInfo.ownerName}}</view>
		</view>
		<view class="flex justify-between padding-lr-sm margin-top-xs">
			<view>联系电话</view>
			<view>{{qaInfo.link}}</view>
		</view>
		<view class="flex justify-between padding-lr-sm margin-top-xs">
			<view>房产</view>
			<view>{{qaInfo.roomName}}</view>
		</view>
		<view class="qa-remark margin">
			<view v-html="qaInfo.content"></view>
		</view>
		<view class="" v-for="(item,index) in titles" :key="index">
			<view class="block__title">{{item.qaTitle}}</view>
			<radio-group class="block" @change="radioChange($event,item)" v-if="item.titleType == '1001'">
				<view class="cu-form-group" v-for="(valueItem,valueIndex) in item.titleValues"
					:key="valueIndex">
					<view class="title">{{valueItem.qaValue}}</view>
					<radio :class="item.radio==valueItem.valueId?'checked':''"
						:checked="item.radio==valueItem.valueId?true:false" :value="valueItem.valueId">
					</radio>
				</view>
			</radio-group>
			<checkbox-group class="block" @change="checkboxChange($event,item)" v-else-if="item.titleType == '2002'">
				<view class="cu-form-group " v-for="(valueItem,valueIndex) in item.titleValues">
					<view class="title">{{valueIndex + 1}}{{valueItem.qaValue}}</view>
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
		<view class="button_up_blank"></view>
		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitQuestionAnswer()">提交</button>
		</view>
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;
	const factory = context.factory;

	import {
		queryQuestionAnswer,
		queryQuestionAnswerTitle,
		saveUserQuestionAnswerValue
	} from '../../api/question/questionApi.js'

	export default {
		data() {
			return {
				qaInfo: {
					qaName:'',
					ownerName:'',
					link:'',
					roomName:'',
					userQaId:''
				},
				titles: [],
				qaId: '',
				communityId: '',
				userQaId:''
			};
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			context.onLoad(options);
			this.communityId = context.getCurrentCommunity().communityId;
			this.qaId = options.qaId;
			this.userQaId = options.userQaId;
			
			this._queryQuestionAnswer();

			queryQuestionAnswerTitle({
					qaId: this.qaId,
					page: 1,
					row: 100,
					communityId: this.communityId
				})
				.then(_data => {
					_data.data.forEach(item => {
						if (item.titleType == '1001') {
							item.radio = ''
						} else if (item.titleType == '2002') {
							// checked: false
							item.radio = [];
							item.titleValues.forEach(value => {
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
				})
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			_queryQuestionAnswer: function() {
				let that = this;
				queryQuestionAnswer({
						page: 1,
						row: 1,
						qaId:this.qaId,
						userQaId:this.userQaId,
						communityId: that.communityId,
					})
					.then(_data => {
						that.qaInfo = _data.data[0];
					})
			},
			radioChange: function(e, item) {
				console.log(e, item)
				item.radio = e.detail.value;
			},
			checkboxChange: function(e, item) {
				item.radio.forEach(value => {
					value.selected = '0';
					value.checked = false;
				})

				item.radio.forEach(value => {
					e.detail.value.forEach(_dValue => {
						if (value.valueId == _dValue) {
							if (value.selected == '0') {
								value.selected = '1';
								value.checked = true;
							}
						}
					})
				})

				console.log('item.radio', item.radio, e)
			},
			submitQuestionAnswer: function(e) {

				console.log(this.titles);

				let _questionAnswerTitles = [];
				let _titles = this.titles;
				let _valueId = '';
				_titles.forEach(item => {
					if (item.titleType == '2002') {
						item.radio.forEach(_radio => {
							if (_radio.selected == '1') {
								_questionAnswerTitles.push({
									valueContent: _radio.valueId,
									titleId: item.titleId,
									titleType: item.titleType
								})
							}
						})
					} else {
						_valueId = item.radio;
						_questionAnswerTitles.push({
							valueContent: _valueId,
							titleId: item.titleId,
							titleType: item.titleType
						})
					}
				})

				let obj = {
					"qaId": this.qaId,
					"communityId": this.communityId,
					"answerType": '1002',
					"userQaId":this.qaInfo.userQaId,
					questionAnswerTitles: _questionAnswerTitles
				}

				saveUserQuestionAnswerValue(obj)
					.then(_data => {
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						uni.navigateBack({
							delta: 1
						})
					}, err => {
						uni.showToast({
							icon: 'none',
							title: err
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
		padding: 10rpx 20rpx 15upx;
	}

	.button_up_blank {
		height: 40rpx;
	}

	.img-bg {}

	.qa-img {
		width: 100%;
	}
</style>
