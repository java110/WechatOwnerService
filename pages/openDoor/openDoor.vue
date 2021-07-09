<template>
	<view>
		<view>
			<image src="/static/images/openDoorTop.png" class="heard-location-icon"></image>
		</view>
		<view class="cu-list grid" :class="'col-2'">
			<view class="cu-item" @click="showOpenDoor(item);"
			v-for="(item,index) in machines" :key="index">
				<view :class="['cuIcon-command','text-red']"></view>
				<text>{{item.machineName}}</text>
			</view>
		</view>
		
		<view class="cu-modal" :class="openDoorFlag==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">温馨提示</view>
					<view class="action" @tap="_cancleCall()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认{{curMachine.machineName}}开门? 开门次数有限,请勿频繁操作！
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleOpenDoor()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doOpenDoor()">确认开门</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	import {listOwnerMachines,openDoor} from '../../api/applicationKey/applicationKeyApi.js'
	import {getCurOwner} from '../../api/owner/ownerApi.js'
	export default {
		data() {
			return {
				machines: [],
				communityName: '',
				communityId: '',
				openDoorFlag:false,
				curMachine:{},
				memberId:''
			};
		},
		components: {
			noDataPage
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.vc.onLoad(options);
			this.loadOwnerMachines();
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			loadOwnerMachines: function() {
				let _that = this;
			
				getCurOwner()
				.then((_owner)=>{
					let _data = {
						memberId: _owner.memberId,
						communityId: _owner.communityId
					};
					_that.communityName = _owner.communityName;
					_that.communityId = _owner.communityId;
					_that.memberId = _owner.memberId;
					listOwnerMachines(_data)
					.then((_machines)=>{
						_that.machines = _machines;
					})	
				})
			},
			showOpenDoor:function(_machine){
				this.openDoorFlag = true;
				this.curMachine = _machine;
			},
			_cancleOpenDoor:function(){
				this.openDoorFlag = false;
				this.curMachine = {};
			},
			_doOpenDoor:function(){
				let _that = this;
				wx.showLoading({
					title: '请求中'
				});
				openDoor({
					communityId:this.communityId,
					userRole:'owner',
					machineCode:_that.curMachine.machineCode,
					userId:this.memberId
				}).then((res)=>{
					wx.hideLoading();
					let data = res.data;
					let msg = '';
					if(data.code == 0){
						msg = '请求发送至门禁'
					}else{
						msg = data.msg;
					}
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					_that._cancleOpenDoor();
				},(err)=>{
					wx.hideLoading();
					wx.showToast({
						title: '开门失败',
						icon: 'none',
						duration: 2000
					});
					_that._cancleOpenDoor();
				})
			}
		}
	};
</script>
<style>
	@import "./openDoor.css";
	text {
		text-align: center;
	}
</style>
