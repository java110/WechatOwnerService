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
				</view>
			</view>
			<view class='plate-input-flag' bindtap='changeplate'>
				<text>{{carNumBtn}}</text>
			</view>

			<view class="plat-btn-black"></view>
			<view class="cu-bar btn-group" style="margin-top: 30px;">
				<button @click="_saveCarNum" :disabled="carNum == ''"
					class="cu-btn bg-green shadow-blur round lg">立即入场</button>
			</view>
		</view>
		
		<view class="cu-modal" :class="showToastFlag==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">温馨提示</view>
					<view class="action">
					</view>
				</view>
				<view class="padding-xl">
					车牌号提交成功!
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_closeToastModal()">关闭</view>
				</view>
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
		customCarInOut
	} from '../../api/car/carApi.js'
	import {
		isNotNull
	} from '../../lib/java110/utils/StringUtil.js'
	import {
		refreshUserOpenId
	} from '../../api/user/userApi.js'
	import {
		isWxOrAli
	} from '../../lib/java110/utils/EnvUtil.js'
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
				communityId: '',
				appId: '',
				machineId: '',
				showToastFlag:false,
			}
		},
		components: {
			selectCarNum
		},
		onLoad(options) {
			this.communityId = options.communityId;
			this.machineId = options.machineId;
			this.appId = options.appId;
			// this.openId = options.openId;
			//uni.setStorageSync(mapping.W_APP_ID,this.appId)
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
			_saveCarNum: function() {
				let _that = this;
				customCarInOut({
					communityId: _that.communityId,
					carNum: _that.carNum,
					machineId: _that.machineId,
					type: '1101'
				}).then(_data => {
					if (_data.data.code != 0) {
						uni.showToast({
							icon: 'none',
							title: '车牌号提交失败！'
						})
						return;
					}
					this.showToastFlag = true;
					
					return;
				})
			},
			_closeToastModal:function(){
				window.location.reload();
			}
		}
	}
</script>

<style>
	@import "../tempParkingFee/tempParkingFee.css";
</style>
