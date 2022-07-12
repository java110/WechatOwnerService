<template>
	<view>
		<view class="block__title">业主信息</view>
		<!-- <view class="cu-form-group">
			<view class="title">业主ID</view>
			{{ownerInfo.memberId}}
		</view> -->
		<view class="cu-form-group">
			<view class="title">名称</view>
			{{ownerInfo.appUserName}}
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			{{ownerInfo.idCard}}
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			{{ownerInfo.link}}
		</view>
	
		<view class="block__title">房屋信息</view>
		<!-- <view class="cu-form-group">
			<view class="title">房屋ID</view>
			{{roomDetail.roomId}}
		</view> -->
		<view class="cu-form-group">
			<view class="title">楼栋</view>
			{{roomDetail.floorNum}}号楼
		</view>
		<view class="cu-form-group">
			<view class="title">单元</view>
			{{roomDetail.unitNum}}单元
		</view>
		<view class="cu-form-group">
			<view class="title">房屋编号</view>
			{{roomDetail.roomNum}}室
		</view>
	
		<view class="cu-form-group">
			<view class="title">楼层</view>
			{{roomDetail.layer+'层'}}
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">房间数</view>
			{{roomDetail.section}}个
		</view> -->
		<view class="cu-form-group">
			<view class="title">户型</view>
			{{roomDetail.apartment}}
		</view>
		<view class="cu-form-group">
			<view class="title">建筑面积</view>
			{{roomDetail.builtUpArea+'平方米'}}
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">单价</view>
			{{roomDetail.unitPrice+'元/平方米'}}
		</view> -->
		
		<view class="block__title">空置房申请信息填写</view>
		<view class="cu-form-group arrow">
			<view class="title">优惠类型</view>
			<picker mode="selector" :range="applyTypes" range-key="typeName"  @change="applyTypeChange">
				<view class="picker">
					{{applyTypeShow?applyTypeShow:"请选择"}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">费用项目</view>
			<picker mode="selector" :range="feeTypeCds" range-key="feeName"  @change="feeTypeCdsChange">
				<view class="picker">
					{{feeTypeCd?feeTypeCd:"请选择"}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">开始日期</view>
			<picker mode="date" :value="bindStartDate" start="2020-09-01" end="2050-09-01" @change="dateStartChange">
				<view class="picker">
					{{bindStartDate}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">结束日期</view>
			<picker mode="date" :value="bindEndDate" start="2020-09-01" end="2050-09-01" @change="dateEndChange">
				<view class="picker">
					{{bindEndDate}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">申请说明</view>
			<input type="text" v-model="createRemark">
		</view>
		<view class="block__title">图片材料</view>
		<view class="cu-bar bg-white ">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(img,index) in imgList" :key='index' bindtap="ViewImage" :data-url="imgList[index]">
					<image :src='imgList[index]' mode='aspectFill'></image>
					<view class="cu-tag bg-red" @tap="deleteImage(index)" :data-index="index">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>
		<view class="btn-box">
			<button type="default" class="btn-sub" @click="subApply()">提交申请</button>
		</view>
	
		<view class="button_up_blank"></view>
	
	</view>
</template>

<script>
	// pages/my/myHouseDetail.js
	import * as TanslateImage from '../../lib/java110/utils/translate-image.js';
	import context from '../../lib/java110/Java110Context.js'
	const factory = context.factory;
	import {compareDate,addDay,date2String} from '../../lib/java110/utils/DateUtil.js'
	import {queryApplyRoomDiscountType,saveApplyRoomDiscount,listRoomFee} from '../../api/applyRoom/applyRoomApi.js'
	export default {
		data() {
			return {
				ownerInfo: {},
				// 用户信息
				ownerFlag: false,
				// 是否有业主信息 标记 如果有为 true  没有为false
				roomDetail: {},
				bindStartDate: '请选择',
				bindEndDate: '请选择',
				createRemark: '',
				applyType: '',
				applyTypeShow: '',
				applyTypes: [],
				feeTypeCds: [],
				feeId: '',
				feeTypeCd: '',
				imgList: [],
				photos: [],
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			_that.roomDetail = JSON.parse(options.room);
			_that.loadApplyRoomDiscountType();
			_that.loadOwenrInfo();
			_that.loadRoomFee();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			loadRoomFee: function(){
				let _that = this;
				let params = {
					page: 1,
					row: 50,
					communityId: this.roomDetail.communityId,
					payerObjId: this.roomDetail.roomId,
					state: '2008001'
				};
				listRoomFee(params).then(function(data){
					let fees = data.fees;
					_that.feeTypeCds = fees;
				})
			},
			
			loadApplyRoomDiscountType: function(){
				let _that = this;
				let params = {
					communityId: this.roomDetail.communityId,
					page: 1,
					row: 50
				}
				queryApplyRoomDiscountType(params).then(function(types){
					_that.applyTypes = types;
				})
			},
			
			loadOwenrInfo: function() {
				let _that = this;

				context.getOwner(function(_ownerInfo) {
					console.log(_ownerInfo);

					if (_ownerInfo) {
						_that.ownerFlag = true;
						_that.ownerInfo = _ownerInfo;
					} else {
						_that.ownerFlag = false;
					}
				});
			},
			
			/**
			 * 类型修改
			 * @param {Object} e
			 */
			applyTypeChange: function(e){
				if(this.applyTypes.length > 0){
					this.applyType = this.applyTypes[e.detail.value].applyType;
					this.applyTypeShow = this.applyTypes[e.detail.value].typeName;
				}
			},
			
			/**
			 * @param {Object} e
			 * 费用项改变
			 */
			feeTypeCdsChange: function(e){
				if(this.feeTypeCds.length > 0){
					this.feeId = this.feeTypeCds[e.detail.value].feeId;
					this.feeTypeCd = this.feeTypeCds[e.detail.value].feeName;
				}
			},
			
			/**
			 * 修改开始时间
			 * @param {Object} e
			 */
			dateStartChange: function(e) {
				this.bindStartDate = e.detail.value;
			},
			
			/**
			 * 修改结束时间
			 * @param {Object} e
			 */
			dateEndChange: function(e) {
				this.bindEndDate = e.detail.value;
			},
			
			/**
			 * 删除图片
			 * @param {Object} e
			 */
			deleteImage: function(e) {
				let imageArr = this.$data.imgList;
				imageArr.splice(e, 1);
				this.photos.splice(e, 1);
			},
			/**
			 * 选择图片
			 * @param {Object} e
			 */
			ChooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						that.$data.imgList.push(res.tempFilePaths[0]);
						var tempFilePaths = res.tempFilePaths[0]
			
						//#ifdef H5
						TanslateImage.translate(tempFilePaths, (url) => {
							that.photos.push(url);
						})
						//#endif
			
						//#ifdef MP-WEIXIN
						factory.base64.urlTobase64(tempFilePaths).then(function(_res) {
							that.photos.push(_res);
						});
						//#endif
					}
				});
			},
			
			/**
			 * 提交申请
			 */
			subApply: function(){
				let msg = '';
				if(this.applyType == ''){
					msg = '请选择优惠类型';
				}else if(this.feeId == ''){
					msg = '请选择费用项目';
				}else if(this.bindStartDate == '请选择' || this.bindEndDate == '请选择'){
					msg = '请选择时间范围';
				}else if(!compareDate(this.bindEndDate, this.bindStartDate)){
					msg = '时间范围有误';
				}else if(this.createRemark == ''){
					msg = '请填写申请说明';
				}
				
				if(msg != ''){
					uni.showToast({
						title: msg,
						icon: 'none'
					});
					return;
				}
				
				let params = {
					startTime: this.bindStartDate,
					// endTime: this.bindEndDate + ' 23:59:59',
					// endTime: date2String(addDay(new Date(this.bindEndDate.replace(/-/g, "/")), 1)),
					endTime: this.bindEndDate,
					roomName: this.roomDetail.floorNum + '-' + this.roomDetail.unitNum + '-' + this.roomDetail.roomNum,
					roomId: this.roomDetail.roomId,
					communityId: this.ownerInfo.communityId,
					createUserName: this.ownerInfo.appUserName,
					createUserTel: this.ownerInfo.link,
					createRemark: this.createRemark,
					ardId: '',
					applyType: this.applyType,
					feeId: this.feeId,
					photos: this.photos
				}
				saveApplyRoomDiscount(params).then(function(_res){
					uni.showToast({
						title: '申请成功'
					});
					setTimeout(function(){
						uni.navigateBack({})
					}, 1000);
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
		padding: 40rpx 30rpx 20rpx;
	}
	
	.button_up_blank {
		height: 40rpx;
	}
	
	.block__bottom {
		height: 180rpx;
	}
	
	.btn-box{
		padding: 30rpx 0;
	}
	.btn-sub{
		width: 80%;
		margin: 0 auto;
		background-color: #1F8DEE!important;
		color: #fff!important;
	}
</style>
