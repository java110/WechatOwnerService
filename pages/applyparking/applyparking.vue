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
			<input v-model="carNum" style="text-align:right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">品牌</view>
			<input v-model="carBrand" style="text-align:right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">颜色</view>
			<input v-model="carColor" style="text-align:right"></input>
		</view>

		<view class="cu-form-group">
			<view class="title">车辆类型</view>
			<picker bindchange="PickerChange" :value="index" :range="carTypes" @change="chooseCarTypes">
				<view class="picker">
					{{carTypeName?carTypeName:'请选择'}}
				</view>
			</picker>
		</view>


		<view class="cu-form-group">
			<view class="title">租用类型</view>
			<picker bindchange="PickerChange" disabled="disabled" :value="index" :range="rentTypes" @change="chooseRentTypes">
				<view class="picker">
					{{rentTypeName?rentTypeName:'请选择'}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group" v-if="rentTypeCode == 'S'">
			<view class="title">起租日期</view>
			<picker mode="date" :value="startDate" @change="startDateChange">
				<view class="picker">
					{{startDate}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group" v-if="rentTypeCode == 'S'">
			<view class="title">结组日期</view>
			<picker mode="date" :value="endDate" @change="endDateChange">
				<view class="picker">
					{{endDate}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group align-start">
			<view class="title">备注信息</view>
			<textarea maxlength="-1" v-model="remark" placeholder="请输入备注信息"></textarea>
		</view>


		<view class="button_up_blank"></view>

		<view class="flex flex-direction">
			<button @click="submitApply()" class="cu-btn bg-green margin-tb-sm lg">提交</button>
		</view>

	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	import {getCurCommunity} from '../../api/community/communityApi.js'
	
	import {getProperty} from '../../api/property/propertyApi.js'


	export default {
		data() {
			return {
				carNum:'',
				carBrand:'',
				carColor:'',
				remark:'',
				psId: '',
				startDate: '2020-01-01',
				endDate: '2020-01-01',
				ownerId:'',
				storeId:'',
				userId:'',
				
				parkingSpaces: [],
				parkingSpaceIds: [],
				parkingSpacesName: '',
				
				//车辆类型
				carTypes: ['家用小汽车', '客车', '货车'],
				carTypeCodes: ['9901', '9902', '9903'],
				carTypeCode: '',
				carTypeName: '',

				rentTypes: ['出售车辆', '月租车'],
				rentTypeCodes: ['H', 'S'],
				rentTypeCode: 'S',
				rentTypeName: '月租车',

				
				page: 1,
				row: 20,
			};
		},
		onLoad: function(options) {
			let _this = this;
			context.getOwner(function(_owner) {
				_this.communityId = _owner.communityId;
				_this.ownerId = _owner.memberId;
				_this.userId = _owner.userId;
				_this.listParkingSpace();
			});
			let param = {
				"communityId":_this.communityId
			}
			getProperty().then(function(res){
				_this.storeId = res.storeId
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
						"state": 'F'
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
			choosePickerSpace: function(e) {
				let checkInIndex = e.target.value;
				this.psId = this.parkingSpaceIds[checkInIndex];
				this.parkingSpacesName = this.parkingSpaces[checkInIndex];
			},
			endDateChange: function(e) {
				this.endate = e.detail.value
			},
			//车辆类型
			chooseCarTypes: function(e) {
				let index = e.target.value;
				this.carTypeCode = this.carTypeCodes[index];
				this.carTypeName = this.carTypes[index];
			},
			chooseRentTypes: function(e) {
				let index = e.target.value;
				this.rentTypeCode = this.rentTypeCodes[index];
				this.rentTypeName = this.rentTypes[index];
			},
			startDateChange: function(e) {
				this.startDate = e.detail.value
			},
			submitApply:function(){
				
				let obj = {
					"psId": this.psId,
					"carNum": this.carNum,
					"carBrand": this.carBrand,
					"carColor": this.carColor,
					"remark": this.remark,
					"startTime": this.startDate,
					"endTime": this.endDate,
					"carType":this.carTypeCode,
					"carNumType":this.rentTypeCode,
					"communityId":this.communityId,
					"ownerId":this.ownerId,
					"storeId":this.storeId,
					"userId":this.userId
					
				};
				
				let msg = "";
				
				if (obj.psId == "") {
					msg = "请选择空闲车位";
				} else if (obj.carNum == "") {
					msg = "请填写车牌号";
				} else if (obj.carBrand == "") {
					msg = "请填写车辆品牌";
				} else if (obj.carColor == "") {
					msg = "请填写车辆颜色";
				}else if(obj.carType == ""){
					msg = "请选择车辆类型";
				}else if(obj.carNumType == ''){
					msg = "请选择租用类型";
				}
				
				if(obj.rentTypeCode == 'S'){
					if(obj.startTime == '2020-01-01'){
						msg = "请选择租用开始日期";
					}
					if(obj.endTime == '2020-01-01'){
						msg = "请选择租用结束日期";
					}
				}
				
				if(obj.rentTypeCode == 'H'){
					obj.startTime = '';
					obj.endTime = '';
				}
				
				
				
				if(msg != ""){
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					return;
				}
				
				
				context.request({
					url: constant.url.saveOwnerCar,
					header: context.getHeaders(),
					method: "POST",
					data: obj,
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							wx.showToast({
								title: "提交成功",
								icon: 'none',
								duration: 2000
							})
							uni.navigateBack({})
							// wx.redirectTo({
							// 	url: '/pages/complaintList/complaintList',
							// });
							return;
						}
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
				
				
				
			
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
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}
</style>
