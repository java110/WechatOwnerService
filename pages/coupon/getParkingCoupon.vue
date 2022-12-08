<template>
	<view>
		<view class="plate-context">
			<view class="ak_row_black">
			</view>
			<view class="ak_row_title">
				<text>领取停车劵</text>
			</view>

			<view class="tips_block">
			</view>

			<view class='tips'>
				<text>点击方框输入车牌号</text>
			</view>
			<view class="plate-input-body">
				<view class="plate-input-content" @click="showCarNumberKeyboard">
					<view bindtap="showCarNumberKeyboard" data-id="0"
						:class="inputOnFocusIndex=='0'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index0}}</text>
					</view>
					<view bindtap="inputClick" data-id="1"
						:class="inputOnFocusIndex=='1'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index1}}</text>
					</view>
					<view bindtap="inputClick" data-id="2"
						:class="inputOnFocusIndex=='2'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index2}}</text>
					</view>
					<view bindtap="inputClick" data-id="3"
						:class="inputOnFocusIndex=='3'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index3}}</text>
					</view>
					<view bindtap="inputClick" data-id="4"
						:class="inputOnFocusIndex=='4'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index4}}</text>
					</view>
					<view bindtap="inputClick" data-id="5"
						:class="inputOnFocusIndex=='5'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index5}}</text>
					</view>
					<view bindtap="inputClick" data-id="6"
						:class="inputOnFocusIndex=='6'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index6}}</text>
					</view>
					<view bindtap="inputClick" data-id="7" class="green-border"
						:class="inputOnFocusIndex=='7'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index7}}</text>
					</view>
				</view>
			</view>

			<view class="plat-btn-black"></view>
			<view class="cu-bar btn-group" style="margin-top: 30px;">
				<button @click="_receiveParkingCoupon" :disabled="carNum.length< 7 || getSuccess"
					class="cu-btn bg-green shadow-blur round lg">立即领取</button>
			</view>

			<view class="temp-remark">
				<view>停车劵说明</view>
				<view>1、领取的停车劵请在24小时内使用：</view>
				<view>2、领取停车劵请在扫码缴费时使用：</view>
				<view>3、若长时间无法加载页面，请检查网络是否畅通或扫码重试。</view>
			</view>
		</view>

		<select-car-num ref="popupCarNumber" type="bottom" @confirm="confirmGuaCarNumber" @getCarNum="getCarNum"
			:gua="false"></select-car-num>

	</view>
</template>

<script>
	import selectCarNum from '../../components/select-carnum/select-carnum.vue';
	import mapping from '../../constant/MappingConstant.js'
	import {
		receiveParkingCoupon
	} from '../../api/fee/feeApi.js'
	import {
		isNotNull
	} from '../../lib/java110/utils/StringUtil.js'
	
	export default {
		data() {
			return {
				flag: true,
				inputPlates: {
					index0: "",
					index1: "",
					index2: "",
					index3: "",
					index4: "",
					index5: "",
					index6: "",
					index7: ""
				},
				carNum: '',
				code: '',
				couponShopId: '',
				shopId:'',
				getSuccess:false
			}
		},
		components: {
			selectCarNum
		},
		onLoad(options) {
			this.code = options.code;
			//this.carNum = options.carNum;
			this.couponShopId = options.couponShopId;
			this.shopId = options.shopId;
		},
		methods: {
			showCarNumberKeyboard() {
				this.$refs.popupCarNumber.open()
			},
			// 车牌号选择键盘
			confirmCarNumber(value) {
				this.car_number = value
				this.$refs.popupCarNumber.close()
			},
			getCarNum: function(_list) {
				this.inputPlates.index0 = _list[0].title;
				this.inputPlates.index1 = _list[1].title;
				let _title = _list[2].title;
				if (_title.length > 0) {
					this.inputPlates.index2 = _title[0];
				} else {
					this.inputPlates.index2 = '';
				}
				if (_title.length > 1) {
					this.inputPlates.index3 = _title[1];
				} else {
					this.inputPlates.index3 = '';
				}
				if (_title.length > 2) {
					this.inputPlates.index4 = _title[2];
				} else {
					this.inputPlates.index4 = '';
				}
				if (_title.length > 3) {
					this.inputPlates.index5 = _title[3];
				} else {
					this.inputPlates.index5 = '';
				}
				if (_title.length > 4) {
					this.inputPlates.index6 = _title[4];
				} else {
					this.inputPlates.index6 = '';
				}
				if (_title.length > 5) {
					this.inputPlates.index7 = _title[5];
				} else {
					this.inputPlates.index7 = '';
				}
				this.carNum = this.inputPlates.index0 + this.inputPlates.index1 + this.inputPlates.index2 + this
					.inputPlates.index3;
				this.carNum += (this.inputPlates.index4 + this.inputPlates.index5 + this.inputPlates.index6 + this
					.inputPlates.index7);
			},
			confirmGuaCarNumber: function() {

			},
			_receiveParkingCoupon: function() {
				let _that = this;
				if(!this.carNum){
					uni.showToast({
						icon:'none',
						title:'未填写车牌号'
					});
					return ;
				}
				receiveParkingCoupon({
					code: this.code,
					carNum: this.carNum,
					couponShopId: this.couponShopId,
					shopId:this.shopId,
					giveWay:'1001'
				}).then(_data => {
					if (_data.code != 0) {
						uni.showToast({
							icon: 'none',
							title: _data.msg
						})
						return;
					}
					uni.showToast({
						icon:'none',
						title:'停车劵领取成功，请关闭页面',
						duration:10000
					})
					_that.getSuccess = true;
				})
			},
		}
	}
</script>

<style>
	@import "./getParkingCoupon.css";
</style>
