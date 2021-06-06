<template>
	<view>

		<view class="cu-form-group margin-top">
			<view class="title">审核</view>
			<picker bindchange="PickerChange" :value="stateIndex" :range="stateCloums" :range-key="'name'" @change="stateChange">
				<view class="picker">
					{{stateCloums[stateIndex].name}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group margin-top">
			<textarea v-model="content" placeholder="请输入处理意见"></textarea>
		</view>

		<view class="flex flex-direction margin-top">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="_dispatchComplaint()">提交</button>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	export default {
		data() {
			return {
				stateCloums: [{
						id: '0',
						name: '请选择'
					},{
						id: '1200',
						name: '结束'
					},
					{
						id: '1100',
						name: '退回'
					}
				],
				state:'',
				content: '',
				complaintId:'',
				stateIndex:0,
				taskId:'',
				storeId:'',
				userId:'',
				userName:'',
				communityId:''

			}
		},
		onLoad(options) {
			let _that = this;
			this.complaintId = options.complaintId;
			this.communityId = options.communityId;
			this.taskId = options.taskId;
			let _userInfo = context.getUserInfo();
			this.userId = _userInfo.userId;
			this.userName = _userInfo.userName;
			context.getProperty()
			.then(function(_store){
				_that.storeId = _store.storeId;
			});
			
		
			
			
		},
		methods: {
			_dispatchComplaint: function() {
				let _data = {
					state:this.state,
					remark:this.content,
					communityId:this.communityId,
					taskId:this.taskId,
					complaintId:this.complaintId,
					storeId:this.storeId,
					userId:this.userId,
					userName:this.userName
				}
				
				context.request({
					url: constant.url.auditComplaint,
					header: context.getHeaders(),
					method: "POST",
					data: _data,
					success: function(res) {
						if (res.statusCode != 200) {
							uni.showToast({
								icon:'none',
								title:res.data
							});
							return;
						}
						uni.navigateBack({
							delta:1
						})
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				})
			

			},
			stateChange:function(e){
				this.stateIndex = e.target.value //取其下标
				if (this.stateIndex == 0) {
					this.state = '' //选中的id
					return;
				}
				let selected = this.stateCloums[this.stateIndex] //获取选中的数组
				
				this.state = selected.id //选中的id
			},
		}
	}
</script>

<style>

</style>
