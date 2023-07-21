<template>
	<view class="user-container">
		<view class="cu-list menu" v-if="questions.length > 0" v-for="(question, idx) in questions" :key="idx" :data-item="question"
		 @click="gotoDetail(question)">
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<view>
						<text class="text-green margin-right-xs">{{question.qaType == '3003'?'投票':'问卷'}}</text>
						<view class="text-cut" style="width:220px">{{question.qaName}}</view>
					</view>
					<view class="text-gray text-sm">
						<text class="margin-right-xs">结束时间：</text> {{question.endTime}}</view>
				</view>
				<view class="action" v-if="question.state == '0'">已结束</view>
				<view class="action" v-else-if="question.state == '2'">已投票</view>
			</view>
		</view>
		<view class="cu-list menu" v-if="questions.length === 0">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-notification text-grey"></text>
					<text class="text-grey">暂无投票问卷信息</text>
				</view>
				<view class="action">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/** index.js **/
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant; //获取app实例
	//获取app实例
	const app = getApp().globalData;
	import {getProperty}  from '../../api/property/propertyApi.js'
	import {queryQuestionAnswer} from '../../api/question/questionApi.js'

	export default {
		data() {
			return {
				communityId: "",
				questions: [],
				currPageIndex: 0,
				pageSize: 10,
				userId:'',
				storeId: '',
			};
		},
		onLoad: function(options) {
			context.onLoad(options);
		},
		onShow: function() {
			let that = this;
			that.communityId = context.getCurrentCommunity().communityId;
			that.userId = context.getUserInfo().userId;
			this._queryQuestionAnswer();
		},
		methods: {
			_queryQuestionAnswer: function(){
				let that = this;
				//qaType:'3003',
				queryQuestionAnswer({
					page:1,
					row:50,
					state:'1201',
					communityId: that.communityId,
				})
				.then(_data=>{
					_data.data.forEach(function(item, index) {
						item.endTime = item.endTime.replaceAll("-","/");
						let _endTime = new Date(item.endTime);
						let _startTime = new Date(item.startTime.replaceAll("-","/"));
						if(_startTime.getTime() > new Date().getTime()){
							item.state = '-1';
						} else if(_endTime.getTime() > new Date().getTime()){
							item.state = '1';
						}else{
							item.state = '0';
						}
						if(item.userId == that.userId){
							item.state = '2';
						}
						item.startTime = item.startTime.replace(/:\d{1,2}$/, ' ');
						item.endTime = item.endTime.replace(/:\d{1,2}$/, ' ');
					});
					that.questions = _data.data;
				})
			},
			gotoDetail: function(_question) {
				let _msg = "问卷";
				if(_question.qaType == '3003'){
					_msg = "投票";
				}
				if(_question.state == '-1'){
					uni.showToast({
						icon:'none',
						title:_msg+'尚未开始'
					})
					return ;
				}
				if(_question.state == '0'){
					uni.showToast({
						icon:'none',
						title:_msg+'已结束'
					})
					return ;
				}
				if(_question.state == '2'){
					uni.showToast({
						icon:'none',
						title:_msg+'已投票'
					})
					return ;
				}
				let that = this;
				if(_question.qaType == '3003'){
					this.vc.navigateTo({
						url: "/pages/questionAnswer/ownerVote?qaId=" + _question.qaId+"&objType="+_question.objType
					});
				}else{
					this.vc.navigateTo({
						url: "/pages/questionAnswer/questionAnswerDetail?qaId=" + _question.qaId+"&objType="+_question.objType
					});
				}
			},
		}
	};
</script>
<style>
	.cu-list+.cu-list {
	    margin-top: 10px;
	}
</style>
