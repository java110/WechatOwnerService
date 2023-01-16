<template>
	<view>
		<view class="flex justify-between">
			<view class="page-title">
				申请放行物品
			</view>
			<view>
				<button class="cu-btn bg-red margin-tb-sm margin-right-sm" @click="_addRes">添加</button>
			</view>
		</view>

		<view class="cu-form-group" v-for="(item,index) in res" @click="_editResource(item)">
			<view class="title">{{item.resName}}</view>
			<view>{{item.amount}}</view>
		</view>
		
		<view class="flex flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="_doFinishRes()">确定</button>
		</view>

		<view class="cu-modal" :class="isShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加物品</view>
					<view class="action" @tap="_cancle()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="">
					<view class="cu-form-group">
						<view class="title">物品名称</view>
						<input v-model="curRes.resName" placeholder="请输入物品名称" class="text-right"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">数量</view>
						<input v-model="curRes.amount" type="number" placeholder="请输入数量" class="text-right"></input>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancle()" v-if="!curRes.in">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="_delete()" v-else>删除</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doSummit()">确定</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				res: [],
				curRes: {
					resName: '',
					amount: ''
				},
				isShow: false,
			}
		},
		onLoad() {
			let _res = uni.getStorageSync("_tempItemReleaseResource");
			if (_res) {
				this.res = _res;
			}
		},
		methods: {
			_addRes: function() {
				this.isShow = true;
			},
			_editResource: function(item) {
				this.curRes = item;
				this.isShow = true;
			},
			_cancle: function() {
				this.isShow = false;
			},
			_delete: function() {
				let _tmpRes = [];
				this.res.forEach(item => {
					if (item.resName != this.curRes.resName) {
						_tmpRes.push(item)
					}
				});
				this.curRes = {
					resName: '',
					amount: ''
				};
				this.isShow = false;
				this.res = _tmpRes ;
			},
			_doSummit: function() {
				if (!this.curRes.resName || !this.curRes.amount) {
					uni.showToast({
						icon: 'none',
						title: '请填写物品信息'
					})
					return;
				}
				this.curRes.in = true;
				this.res.push(this.curRes);
				this.curRes = {
					resName: '',
					amount: ''
				};
				
				this.isShow = false;
			},
			_doFinishRes:function(){
				uni.setStorageSync("_tempItemReleaseResource", this.res);
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	.page-title {
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 30rpx 30rpx 20rpx;
	}
</style>
