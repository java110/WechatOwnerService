<template>
	<view class="bg-white">
		
		<view class="e-1">
			<text>2022年度业主打分情况</text>
		</view>
		
		<view class="flex justify-start e-2">
			<view v-for="(item,index) in staffs" class="e-2-item" :key="index">
				<view>
					<image :src="item.url"></image>
				</view>
				<view>
					<text class="e-2-st">{{item.staffName}}</text>
					<text class="e-2-sc"> {{item.score || 0}} </text>
					<text class="e-2-f">分</text>
				</view>
				<view>
					<text class="e-2-post">{{item.post}}</text>
				</view>
				<view>
					<text class="e-2-sid">工号:{{_showStaffId(item.staffId)}}</text>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import {getExamineStaffs} from '../../api/examine/examineApi.js';
	import {getCommunityId} from '../../api/community/communityApi.js';
	export default {
		data() {
			return {
				staffs:[]
			}
		},
		onLoad(options) {
			// let _staff = {
			// 	url:'../../static/logo.png',
			// 	name:'张三',
			// 	score:100,
			// 	post:'管理人员',
			// 	staffId:'001'
			// };
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			// this.staffs.push(_staff);
			this._loadStaffs();
		},
		methods: {
			_loadStaffs:function(){
				this.staffs = [];
				let _that = this;
				getExamineStaffs({
					page:1,
					row:100,
					communityId:getCommunityId()
				}).then(_data=>{
					_that.staffs = _data;
				})
			},
			_showStaffId:function(_staffId){
				if(_staffId.length < 6){
					return _staffId;
				}
				
				return _staffId.substring(_staffId.length - 6);
			}
			
			
		}
	}
</script>

<style lang="scss">
	.e-1{
		background-color: #D2E4F8;
		height: 80upx;
		line-height: 80upx;
		margin:20upx;
		border-radius: 10upx;
		text{
			font-size: 30upx;
			margin-left:20upx;
		}
	}
	.e-2{
		flex-wrap: wrap;
		margin-top:40upx;
		.e-2-item{
			margin-bottom:50upx;
			width: 33.33%;
			text-align: center;
			image{
				width: 70%;
				height: 180upx;
				border-radius: 10upx;
				border:1px solid #167BE3;
			}
			
			.e-2-st{
				font-size: 32upx;
				color: #000;
				font-weight: bold;
			}
			.e-2-sc{
				font-size: 28upx;
				color: #9E2929;
				font-weight: bold;
				margin-left: 5upx;
			}
			.e-2-f{
				font-size: 32upx;
				margin-left: 5upx;
			}
			
			.e-2-post{
				font-size: 26upx;
			}
			.e-2-sid{
				font-size: 24upx;
			}
		}
		
	}
</style>
