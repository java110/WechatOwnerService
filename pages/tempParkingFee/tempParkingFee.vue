<template>
	<view>
		<view class="plate-context">
			<view class="ak_row_black">
			</view>
			<view class="ak_row_title">
				<text>{{communityName}}</text>
			</view>

			<view class="tips_block">
			</view>
			<view class="cu-bar btn-group " style="margin-top: 30px;">
				<button @click="_changeFlag('car')" style="margin-left: 0px;" class="cu-btn shadow-blur  lg"
					:class="{'bg-blue':showFlag == 'car','line-blue':showFlag != 'car'}">车牌号</button>
				<button @click="_changeFlag('phone')" style="margin-right: 0px;" class="cu-btn  shadow-blur lg"
					:class="{'bg-blue':showFlag == 'phone','line-blue':showFlag != 'phone'}">手机号</button>
				
			</view>
			<view v-if="showFlag == 'phone'">
				<view class='tips'>
					<text>请输入手机号</text>
				</view>
				<view class="plate-input-body">
					<view class="plate-input-content">
						<input type="number" maxlength="11" class="input-ui" v-model="carNum"
							placeholder="以手机号入场无牌车，请填手机号出场" />
					</view>
				</view>
			</view>
			<view v-if="showFlag == 'car'">
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

				<view class=" temp-history">
					<view class="padding"><text>往期记录</text></view>
					<view class="flex justify-start">
						<view class="padding-left" v-for="(item,index) in carNums" :key="index"
							@tap="_loadTempFee(item.carNum)">{{item.carNum}}
						</view>
					</view>
				</view>
				<view class='plate-input-flag' bindtap='changeplate'>
					<text>{{carNumBtn}}</text>
				</view>
			</view>

			<view class="plat-btn-black"></view>
			<view class="cu-bar btn-group" style="margin-top: 30px;">
				<button @click="_queryCarNum" :disabled="carNum.length< 7"
					class="cu-btn bg-green shadow-blur round lg">立即查询</button>
			</view>

			<view class="temp-remark">
				<view>临停支付说明</view>
				<view>1、若因特殊原因无法查询车辆信息，请联系停车场人工处理：</view>
				<view>2、查询缴费前请仔细核对停车场及车牌号：</view>
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
		getTempCarFeeOrder
	} from '../../api/fee/feeApi.js'
	import {
		isNotNull
	} from '../../lib/java110/utils/StringUtil.js'
	import {
		refreshUserOpenId,
		getOpenIdFromAliPay
	} from '../../api/user/userApi.js'
	import {
		isWxOrAli
	} from '../../lib/java110/utils/EnvUtil.js';

	import {
		queryWaitPayFeeTempCar
	} from '@/api/car/carApi.js';
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
				paId: '',
				appId: '',
				aliAppId: '',
				openId: '',
				machineId: '',
				communityId: '',
				carNums: [],
				showFlag: 'car',
			}
		},
		components: {
			selectCarNum
		},
		mounted() {
			// #ifdef H5
			if (isWxOrAli() == "ALIPAY") {
				const oScript = document.createElement('script');
				oScript.type = 'text/javascript';
				oScript.src = 'https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js';
				document.body.appendChild(oScript);
			}
			// #endif
		},
		onLoad(options) {
			this.paId = options.paId;
			this.appId = options.appId;
			this.openId = options.openId;
			this.machineId = options.machineId;
			this.communityId = options.communityId;
			uni.setStorageSync(mapping.W_APP_ID, this.appId)
			if (!isNotNull(this.openId)) {
				//刷新 openId
				if (isWxOrAli() == 'ALIPAY') {
					this._refreshAliPayOpenId();
				} else {
					this._refreshWechatOpenId();
				}
				return;
			}
			this._loadExistsCarNum();
		},
		methods: {
			showCarNumberKeyboard() {
				this.$refs.popupCarNumber.open()
			},
			_changeFlag:function(_flag){
					this.showFlag = _flag;
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
			_queryCarNum: function() {
				let _that = this;
				getTempCarFeeOrder({
					paId: this.paId,
					carNum: this.carNum,
					couponIds: ''
				}).then(_data => {
					if (_data.code != 0) {
						uni.showToast({
							icon: 'none',
							title: '未查到停车费'
						})
						return;
					}
					uni.navigateTo({
						url: '/pages/tempCarFee/tempCarFee?paId=' + _that.paId + '&carNum=' + _that
							.carNum + "&appId=" + _that.appId + "&openId=" + _that.openId +
							"&machineId=" + this.machineId
					})
				})
			},
			_refreshAliPayOpenId: function() {
				// console.log("判断微信还是支付宝");
				// console.log(isWxOrAli());
				let _that = this;
				ap.getAuthCode({
					appId: this.aliAppId,
					scopes: ['auth_base'],
				}, function(res) {
					uni.showToast({
						title: JSON.stringify(res),
						icon: 'none'
					})
					ap.alert(JSON.stringify(res));
					getOpenIdFromAliPay({
						authCode: res.authCode,
						communityId: _that.communityId
					}).then(_data => {
						_that.openId = _data.data;
						_that._loadExistsCarNum();
					})
				});

			},
			_refreshWechatOpenId: function() {
				// console.log("判断微信还是支付宝");
				// console.log(isWxOrAli());
				let _redirectUrl = window.location.href;
				refreshUserOpenId({
					redirectUrl: _redirectUrl,
					wAppId: this.appId,
				}).then(_data => {
					console.log(_data, 123)
					if (_data.code == 0) {
						window.location.href = _data.data.openUrl;
						return;
					}
				});
			},
			_loadExistsCarNum: function() {
				let _that = this;
				let _openType = "WECHAT";
				if (isWxOrAli == 'ALIPAY') {
					_openType = 'ALIPAY'
				}
				queryWaitPayFeeTempCar({
					openId: this.openId,
					machineId: this.machineId,
					openType: _openType
				}).then(_json => {
					_that.carNums = _json.data;
					if (_json.data && _json.data.length == 1) {
						_that.carNum = _json.data[0].carNum;
						_that._queryCarNum();
					}
				})
			},
			_loadTempFee: function(_carNum) {
				this.carNum = _carNum;
				if (_carNum.length > 0) {
					this.inputPlates.index0 = _carNum[0];
				}
				if (_carNum.length > 1) {
					this.inputPlates.index1 = _carNum[1];
				}
				if (_carNum.length > 2) {
					this.inputPlates.index2 = _carNum[2];
				}
				if (_carNum.length > 3) {
					this.inputPlates.index3 = _carNum[3];
				}
				if (_carNum.length > 4) {
					this.inputPlates.index4 = _carNum[4];
				}
				if (_carNum.length > 5) {
					this.inputPlates.index5 = _carNum[5];
				}
				if (_carNum.length > 6) {
					this.inputPlates.index6 = _carNum[6];
				}
				if (_carNum.length > 7) {
					this.inputPlates.index7 = _carNum[7];
				}
				//查询
				this._queryCarNum();
			}
		}
	}
</script>

<style>
	@import "./tempParkingFee.css";
	.input-ui{
				border: 1px solid #ccc;
				padding: 12upx 18upx;
				border-radius: 8upx;
				color: rgb(48, 49, 51);
				width: 100%;
				height: 100%;
			}
</style>
