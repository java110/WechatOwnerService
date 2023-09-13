<template>
	<view>
		<view class="plate-context">
			<view class="tips_block">
			</view>
			<view class="ak_row_title">
				<text>{{config.qrcodeName}}</text>
			</view>
			<view class="tips_block">
			</view>
			<view class="cu-bar btn-group margin-left margin-right" style="margin-top: 30px;">
				<button @click="_changeFlag('room')" style="margin-left: 0px;" v-if="config.queryWay == '2002' || config.queryWay == '3003'" class="cu-btn shadow-blur  lg"
					:class="{'bg-blue':queryWay == 'room','line-blue':queryWay != 'room'}">房屋</button>
				<button @click="_changeFlag('phone')" style="margin-right: 0px;" v-if="config.queryWay == '1001' || config.queryWay == '3003'" class="cu-btn  shadow-blur lg"
					:class="{'bg-blue':queryWay == 'phone','line-blue':queryWay != 'phone'}">手机号</button>
			</view>
			<view>
				<view class='tips'>
					<text v-if="queryWay == 'room'">请输入房号</text>
					<text v-else>请输入手机号</text>
				</view>
				<view class="plate-input-body">
					<view class="plate-input-content" v-if="queryWay == 'room'">
						<input type="text" class="input-ui" v-model="roomNum" placeholder="请输入房号 楼栋-单元-房屋 如:1-1-1001" />
					</view>
					<view class="plate-input-content" v-else>
						<input type="number" maxlength="11" class="input-ui" v-model="link" placeholder="请输入业主手机号" />
					</view>
					<view class="flex justify-between margin-top msg-code" v-if="config.smsValidate == 'ON'">
						<input v-model="msgCode" placeholder="请输入短信验证码" name="input" style="width: 70%;"
							class="input-ui"></input>
						<button class='cu-btn bg-green shadow msg-code' :disabled="btnDisabled"
							@click="_sendSms()">{{btnValue}}</button>
					</view>
				</view>
			</view>

			<view class="plat-btn-black"></view>
			<view class="cu-bar btn-group" style="margin-top: 30px;">
				<button @click="_queryOwnerInfo" class="cu-btn bg-green shadow-blur round lg">立即查询</button>
			</view>

			<view class="temp-remark">
				<view>支付说明</view>
				<view>{{config.content}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		isNotNull
	} from '../../lib/java110/utils/StringUtil.js';
	import {
		sendMsgCode,
		getPayFeeQrcode,
		getQrcodeOwner
	} from '@/api/fee/qrCodePayFee.js';

	export default {
		data() {
			return {
				flag: true,
				roomNum: '',
				link: '',
				communityId: '',
				msgCode:'',
				queryWay: 'room',
				pfqId:'',
				second:60,
				btnValue: '验证码',
				btnDisabled: false,
				config:{
					content: "",
					createStaffId: "",
					createStaffName: "",
					customFee: "",
					preFee: "",
					qrcodeName: "支付二维码",
					queryWay: "1001",
					smsValidate: "ON",
					state:''
				}
			}
		},
		onLoad(options) {
			this.appId = options.appId;
			this.pfqId = options.pfqId;
			this.communityId = options.communityId;
			this._loadConfig();
		},
		methods: {
			_changeFlag: function(_flag) {
				this.queryWay = _flag;
			},
			_queryOwnerInfo:function(){
				if(this.config.state != 'ON'){
					uni.showToast({
						icon:'none',
						title:'二维码已停用'
					});
					return;
				}
				let _that = this;
				getQrcodeOwner(this,{
					pfqId:this.pfqId,
					communityId:this.communityId,
					queryWay:this.queryWay,
					roomNum: this.roomNum,
					link: this.link,
					msgCode:this.msgCode
				}).then(_data=>{
					if(_data.code != '0'){
						uni.showToast({
							icon:'none',
							title:_data.msg
						});
						return;
					}
					
					uni.navigateTo({
						url:'/pages/fee/payQrCodeFee?communityId='+_that.communityId+"&ownerId="+_data.data.ownerId+"&roomId="+_data.data.roomId+"&pfqId="+_that.pfqId
					})
				})
			},
			_sendSms:function(){
				if(this.btnDisabled){
					return;
				}
				sendMsgCode(this,{
					pfqId:this.pfqId,
					communityId:this.communityId,
					queryWay:this.queryWay,
					roomNum: this.roomNum,
					link: this.link,
				})
			},
			_loadConfig:function(){
				let _that = this;
				getPayFeeQrcode(this,{
					communityId:this.communityId,
					pfqId:this.pfqId
				}).then((_data)=>{
					_that.config = _data;
					uni.setNavigationBarTitle({    
						title: _data.qrcodeName
					});
					if(_data.queryWay == '1001'){
						_that._changeFlag('phone');
					}
				})
			}


		}
	}
</script>

<style>
	
	.ak_row_title {
		padding-left: 20rpx;
		font-size: 48rpx;
		font-weight: 700;
		text-align: center;
		margin-top: 30upx;
	}
	.tips_block {
		height: 60rpx;
	}

	.tips {
		text-align: center;
		margin: 40rpx 0;
		font-size: 12pt;
		margin-bottom: 20upx;
		color: #888888;
	}

	.plate-input-flag {
		margin: 30rpx 10rpx 30rpx 0;
		color: #00AA00;
		float: right;
	}

	.plate-input-body {
		/*border: 1px solid red;*/

		margin: 0 20rpx;
	}

	.plate-input-content {
		display: flex;
		flex-direction: row;
		height: 100rpx;
	}

	.input-ui {
		border: 1px solid #ccc;
		padding: 12upx 18upx;
		border-radius: 8upx;
		color: rgb(48, 49, 51);
		width: 100%;
		height: 100%;
	}

	.msg-code {
		height: 100upx;
	}
	.temp-remark{
		margin-top: 150upx;
		padding:10upx;
		color: #888888;
	}
</style>
