<template>
	<view>
		<view class="cu-form-group">
			<view class="title">空闲车位</view>
			<picker bindchange="PickerChange" :value="index" :range="parkingSpaces" @change="choosePickerSpace">
				<view class="picker">
					{{parkingSpacesName?parkingSpacesName:'请选择'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">车牌号</view>
			<input v-model="builtUpArea" style="text-align:right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">品牌</view>
			<input v-model="apartment" style="text-align:right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">颜色</view>
			<input v-model="layer" style="text-align:right"></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">类型</view>
			<picker bindchange="PickerChange" :value="index" :range="parkingSpaces" @change="">
				<view class="picker">
					{{parkingSpacesName?parkingSpacesName:'请选择'}}
				</view>
			</picker>
		</view>
		
		<view class="cu-form-group">
			<view class="title">起租日期</view>
			<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>
		
		<view class="cu-form-group">
			<view class="title">结组日期</view>
			<picker mode="date" :value="endDate"  @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>
		
		<view class="cu-form-group align-start">
			<view class="title">备注信息</view>
			<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="请输入备注信息"></textarea>
		</view>
		



		<view class="button_up_blank"></view>

		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg">提交</button>
		</view>

	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	import {getCurCommunity} from '../../api/community/communityApi.js'


	export default {
		data() {
			return {
				//车位信息
				parkingSpaces: [],
				//车位id
				parkingSpaceIds:[],
				parkingSpacesName:'',
				psId:'',
				carTypes:['月租车','出售车辆'],
				date: '2020-01-01',
				endDate:'2020-01-01',
				page: 1,
				row: 20,
			};
		},
		onLoad: function(options) {
			let _this = this;
			context.getOwner(function(_owner) {
				_this.communityId = _owner.communityId;
				_this.listParkingSpace();
				
			});
			
		},
		methods: {
			listParkingSpace: function() {
				context.request({
					url: constant.url.queryParkingSpaces,
					header: context.getHeaders(),
					method: "GET",
					data: {
						"page": this.page,
						"row": this.row,
						"communityId": this.communityId,
						"state":'F'
					},
					success: (res) => {
						let arr = res.data.parkingSpaces;
						arr.map(item => {
							this.parkingSpaces.push(item.areaNum + "停车场  " + item.num + "车位");
							this.parkingSpaceIds.push(item.psId);
						})
					},
					fail(res) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			choosePickerSpace:function(e){
				let checkInIndex = e.target.value;
				this.psId = this.parkingSpaceIds[checkInIndex];
				this.parkingSpacesName = this.parkingSpaces[checkInIndex];
			},
			DateChange(e) {
				this.date = e.detail.value
			},
		}
	};
</script>
<style>
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}
</style>
