<template>
	<view>
		<view class="flex justify-start ess-1">
			<view>
				<image :src="staff.headerImg"></image>
			</view>
			<view class="ess-1-s">
				<view class="">
					<text class="ess-1-s-a">姓名:</text>
					<text class="ess-1-s-b">{{staff.staffName}}</text>
				</view>
				<view class="margin-top-sm">
					<text class="ess-1-s-a">岗位:</text>
					<text class="ess-1-s-b">{{staff.post}}</text>
				</view>
				<view class="margin-top-sm">
					<text class="ess-1-s-a">工号:</text>
					<text class="ess-1-s-b">{{_showStaffId(staff.staffId)}}</text>
				</view>
			</view>
		</view>
		<view class="bg-white ess-2">
			<view class="flex justify-start" v-for="(item,index) in staff.projects" :key="index">
				<view class="ess-p-n">{{item.projectName}}</view>
				<view class="ess-p-s">
					<u-slider v-model="item.value" min="0" max="100" height="28" activeColor="#167BE3" :use-slot="true"
						></u-slider>
				</view>
				<view class="ess-p-sc">{{item.value}}分</view>
			</view>
			<view class="ess-2-btn">
				<button class="cu-btn round bg-blue" @click="_submitScore()">确定评分</button>
			</view>
		</view>
		<view class="margin-top ess-3-introduction">简介</view>
		<view class=" bg-white ess-3">

			<view v-html="staff.introduction"></view>
		</view>
	</view>
</template>

<script>
	import uSlider from '@/components/u-slider/u-slider.vue';
	import {getExamineStaffs,saveExamineStaffValue} from '../../api/examine/examineApi.js';
	import {getCommunityId} from '../../api/community/communityApi.js';
	export default {
		data() {
			return {
				esId:'',
				staff:{}
			}
		},
		components: {
			uSlider
		},
		onLoad(options) {
			this.esId = options.esId;
			this._loadStaffs();
		},
		methods: {
			endSlider(e) {
				console.log('滑动进度条数据', e)
			},
			_loadStaffs:function(){
				this.staff = {};
				let _that = this;
				getExamineStaffs({
					page:1,
					row:1,
					esId:this.esId,
					communityId:getCommunityId()
				}).then(_data=>{
					_that.staff = _data[0];
				})
			},
			_showStaffId:function(_staffId){
				if(!_staffId || _staffId.length < 6){
					return _staffId;
				}
				
				return _staffId.substring(_staffId.length - 6);
			},
			_submitScore:function(){
				saveExamineStaffValue({
					esId:this.esId,
					staffId:this.staff.staffId,
					projects:this.staff.projects
				}).then(_data=>{
					uni.navigateBack();
				})
			}
		}
	}
</script>

<style lang="scss">
	.ess-1 {
		background-color: #FFF;
		padding: 40upx;

		image {
			height: 160upx;
			width: 160upx;
			border-radius: 20upx;
		}

		.ess-1-s {
			margin-left: 20upx;

			.ess-1-s-b {
				margin-left: 10upx;
				color: #777;
			}
		}
	}

	.ess-2 {
		.ess-p-n {
			width: 25%;
			text-align: right;
			line-height: 30upx;
		}

		.ess-p-s {
			margin-left: 10upx;
			width: 60%;
		}
		.ess-p-sc{
			margin-left: 10upx;
			line-height: 30upx;
		}

		.ess-2-btn {
			margin-top: 40upx;
			height: 120upx;

			text-align: center;
		}
	}
	.ess-3-introduction {
			background-color: #FFF;
			padding:20upx;
		}
	.ess-3 {
		margin-top:1upx;
		padding: 20upx;
		min-height: 600upx;
	}

	
</style>
