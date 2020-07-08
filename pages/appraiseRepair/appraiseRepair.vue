<template>
	<view>
		<view class="content bg-white margin-top">
			<view class="flex solid-bottom padding justify-start">
				<view class=" padding-sm radius">服务评分</view>
				<view class=" padding-sm  radius">
					<sx-rate :value="4" :fontSize="fontSize" :value.sync="rateSync" @change="onChange" />
				</view>
			</view>
			<view class="cu-form-group padding align-start">
				<view class="title padding-left-sm">服务评价</view>
				<textarea maxlength="200" v-model="context" placeholder="请填写本地服务评价"></textarea>
			</view>
			
			<view class="flex flex-direction margin">
				<button class="cu-btn bg-green margin-tb-sm lg" @click="submitAppraiseRepair()">评价</button>
			</view>

		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	import SxRate from '@/components/sx-rate'
	export default {
		data() {
			return {
				fontSize:'60upx',
				rateSync: 2,
				animation: true,
				curAppraise: 4,
				context: '',
				repairId:'',
				userId:'',
				userName:''
			}
		},
		components: {
			SxRate
		},
		onLoad(options) {
			let _that = this;
			let _repairId = options.repairId;
			this.repairId = _repairId;
			context.getOwner(function(_owner) {
				_that.userId = _owner.userId;
				_that.userName = _owner.userName;
			});
		},
		methods: {
			onChange(e) {
				this.curAppraise = e;
			},
			submitAppraiseRepair:function(){
				if(context == ''){
					uni.showToast({
						title:'请填写评价内容',
						icon:'none'
					});
					return ;
				}
				if(this.repairId == ''){
					uni.showToast({
						title:'未包含报修信息',
						icon:'none'
					});
					return ;
				}
				
				let _data = {
					"appraiseScore":this.curAppraise,
					"appraiseType":"10001",
					 "context":this.context,
					 "appraiseUserId":this.userId,
					 "appraiseUserName":this.userName,
					 "objType":"10001",
					 "objId":this.repairId
				};
				
				context.request({
					url: constant.url.appraiseRepair,
					header: context.getHeaders(),
					method: "POST",
					data: _data, //动态数据
					success: function(res) {
						let _data = res.data;
						//成功情况下跳转
						if (_data.code == 0) {
							wx.showToast({
								title: '验证码下发成功',
								icon: 'none',
								duration: 2000
							});
							wx.hideLoading();
							//console.log(e);
							uni.navigateBack({
								delta: 1
							});
							return;
						}
						wx.hideLoading();
						wx.showToast({
							title: _data.msg,
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
				
				
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
	}
</style>
