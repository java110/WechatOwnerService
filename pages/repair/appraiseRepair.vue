<template>
	<view>
		<view class="content bg-white margin-top">
			<view class="flex solid-bottom justify-start">
				<view class="item-title padding-sm radius">综合评分</view>
				<view class="item-star padding-sm  radius">
					<sx-rate :value="4" :fontSize="fontSize" :value.sync="rateSync1" @change="appraiseScoreChange" />
				</view>
			</view>
			<view class="flex solid-bottom justify-start">
				<view class="item-title padding-sm radius">维修速度</view>
				<view class="item-star padding-sm  radius">
					<sx-rate :value="4" :fontSize="fontSize" :value.sync="rateSync2" @change="doorSpeedScoreChange" />
				</view>
			</view>
			<view class="flex solid-bottom justify-start">
				<view class="item-title padding-sm radius">维修员服务</view>
				<view class="item-star padding-sm  radius">
					<sx-rate :value="4" :fontSize="fontSize" :value.sync="rateSync3" @change="repairmanServiceScoreChange" />
				</view>
			</view>
			<view class="cu-form-group padding align-start">
				<view class="title padding-left-sm">服务评价</view>
				<textarea maxlength="200" v-model="context" placeholder="请您填写本次服务感受和评价，以便给大家提供更好的服务品质哦！"></textarea>
			</view>
			
			<view class="flex flex-direction margin">
				<button class="cu-btn bg-green margin-tb-sm lg" @click="submitAppraiseRepair()">评价</button>
			</view>

		</view>
	</view>
</template>

<script>

	import SxRate from '@/components/sx-rate'
	
	import {appraiseRepair} from '../../api/repair/repairApi.js'
	import {getCurOwner} from '../../api/owner/ownerApi.js'
	export default {
		data() {
			return {
				fontSize:'60upx',
				rateSync1: 2,
				rateSync2: 2,
				rateSync3: 2,
				animation: true,
				curAppraise: 2,
				curDoorSpeed: 2,
				curRepairmanService: 2,
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
			getCurOwner()
			.then(function(_owner) {
				_that.userId = _owner.userId;
				_that.userName = _owner.userName;
			});
		},
		methods: {
			appraiseScoreChange(e) {
				this.curAppraise = e;
			},
			doorSpeedScoreChange(e) {
				this.curDoorSpeed = e;
			},
			repairmanServiceScoreChange(e) {
				this.curRepairmanService = e;
			},
			submitAppraiseRepair:function(){
				if(this.context == ''){
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
					"doorSpeedScore":this.curDoorSpeed,
					"repairmanServiceScore":this.curRepairmanService,
					"appraiseType":"10001",
					 "context":this.context,
					 "appraiseUserId":this.userId,
					 "appraiseUserName":this.userName,
					 "objType":"10001",
					 "objId":this.repairId
				};
				
				appraiseRepair(_data)
				.then((_data)=>{
					wx.showToast({
						title: '成功',
						icon: 'none',
						duration: 2000
					});
					wx.hideLoading();
					uni.navigateBack({
						delta: 1
					});
				})
				.then((error)=>{
					wx.showToast({
						title: error,
						icon: 'none',
						duration: 2000
					});
				});
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
	}
	.item-title{
		width: 200rpx;
	}
	.item-star, .item-title{
		vertical-align: middle;
		line-height: 100rpx;
	}
</style>
