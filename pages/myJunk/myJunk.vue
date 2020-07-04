<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="_tabSelect(0)">
					我的旧货
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="_tabSelect(1)">
					我的需求
				</view>
			</view>
		</scroll-view>
		<view v-if="active==0">
			<view v-for="(item,index) in junks" :key="index" class="bg-white margin-bottom margin-top padding-top padding-bottom-sm">
				<view class="flex justify-between margin-left margin-right ">
					<view class="">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
						<text class="margin-left-xs text-black">{{item.publishUserName}}</text>
					</view>
					<view class="text-grey align-center">
						<text>{{item.createTime}}</text>
					</view>
				</view>
				<view class="margin-top-sm margin-left margin-right">
					<text class="text-df">{{item.context}}</text>
				</view>
				<view class="margin-top-sm margin-left margin-right grid text-center col-3 grid-square">
					<view class="" v-for="(_item,index) in item.photos" :key="index">
						<image mode="scaleToFill" :src="_item.url" @tap="preview(_item.url)"></image>
					</view>
				</view>
				<view class="solid-top padding-top-sm flex justify-around align-center">
					<view class="">
						<text class="lg text-yellow cuIcon-moneybag"></text>
						<text class="margin-left-xs text-yellow">50.00</text>
					</view>
					<view @tap="deleteJunk(item.junkRequirementId)">
						<text class="lg text-red cuIcon-deletefill"></text>
						<text class="margin-left-xs text-red">删除</text>
					</view>
					<view v-if="item.state == '13001'" @tap="finishJunk(item.junkRequirementId)">
						<text class="lg text-green cuIcon-selection"></text>
						<text class="margin-left-xs text-green">完成</text>
					</view>
					<view v-else>
						<text class="lg text-green cuIcon-selection"></text>
						<text class="margin-left-xs text-green">{{item.stateName}}</text>
					</view>


				</view>
			</view>
		</view>

		<view v-if="active==1">
			<view v-for="(item,index) in requirements" :key="index" class="bg-white margin-bottom margin-top padding-top padding-bottom-sm">
				<view class="flex justify-between margin-left margin-right ">
					<view class="">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
						<text class="margin-left-xs text-black">{{item.publishUserName}}</text>
					</view>
					<view class="text-grey align-center">
						<text>{{item.createTime}}</text>
					</view>
				</view>
				<view class="margin-top-sm margin-left margin-right margin-bottom-sm">
					<text class="text-df">{{item.context}}</text>
				</view>
				<view class="solid-top padding-top-sm flex justify-around align-center">
					<view class="">
						<text class="lg text-yellow cuIcon-moneybag"></text>
						<text class="margin-left-xs text-yellow">50.00</text>
					</view>
					<view @tap="deleteJunk(item.junkRequirementId)">
						<text class="lg text-red cuIcon-deletefill"></text>
						<text class="margin-left-xs text-red">删除</text>
					</view>
					<view v-if="item.state == '13001'" @tap="finishJunk(item.junkRequirementId)">
						<text class="lg text-green cuIcon-selection"></text>
						<text class="margin-left-xs text-green">完成</text>
					</view>
					<view v-else>
						<text class="lg text-green cuIcon-selection"></text>
						<text class="margin-left-xs text-green">{{item.stateName}}</text>
					</view>

				</view>
			</view>
		</view>

		<view class="cu-modal" :class="viewImage?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" :style="'background-image: url('+ viewImageSrc +');height:800rpx;'">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="closeViewImage()">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="deleteJunkModal==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">温馨提示</view>
					<view class="action" @tap="_cancleDeleteJunk()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认删除吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleDeleteJunk()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doDeleteJunk()">确定</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="finishJunkModal==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">温馨提示</view>
					<view class="action" @tap="_cancleFinishJunk()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认标记为已完成吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleFinishJunk()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doFinishJunk()">确定</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;
	export default {
		data() {
			return {
				active: 0,
				viewImage: false,
				deleteJunkModal:false,
				finishJunkModal:false,
				currentJunkRequirementId:'',
				viewImageSrc: '',
				communityId: '',
				userId: '',
				junks: [],
				requirements: [],
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			context.getOwner(res => {
				console.log('_ownerInfo', res);
				_that.communityId = res.communityId;
				_that.userId = res.userId;
				_that._loadMarket(_that.active);
			});
		},
		methods: {
			_tabSelect: function(_active) {
				this.active = _active;
				this._loadMarket(_active);
			},
			_loadMarket: function(_active) {
				let that = this;
				let _typeCd = '';
				if (_active == 0) {
					_typeCd = '222222';
				} else {
					_typeCd = '333333';
				}
				this.loading = true;
				let _paramIn = {
					"communityId": that.communityId,
					"publishUserId": that.userId,
					"typeCd": _typeCd,
					"page": 1,
					"row": 15
				};
				context.request({
					url: constant.url.listJunkRequirements,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						console.log('res', res);
						if (res.statusCode == 200) {
							let _junkRequirements = res.data.junkRequirements;
							_junkRequirements.forEach(function(_jr) {
								let _date = _jr.createTime.replace(" ", ":").replace(/\:/g, "-").split("-");
								let _simDate = "" + _date[1].split("")[1] + "-" + _date[2] + "\t" + _date[3] + ":" + _date[4] + "";
								_jr.createTime = _simDate;
								if (_typeCd == '222222') {
									_jr.photos.forEach(function(_photoTmp) {
										_photoTmp.url = constant.url.baseUrl + _photoTmp.url;
									});
								}

							});
							if (_typeCd == '222222') {
								that.junks = _junkRequirements;

							} else {
								that.requirements = _junkRequirements;
							}
						}
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			preview: function(_src) {
				this.viewImage = true;
				this.viewImageSrc = _src;
			},
			closeViewImage: function() {
				this.viewImage = false;
			},
			_cancleDeleteJunk:function(){
				this.deleteJunkModal = false;
			},
			deleteJunk:function(_id){
				this.currentJunkRequirementId = _id;
				this.deleteJunkModal = true;
			},
			_cancleFinishJunk:function(){
				this.finishJunkModal = false;
			},
			finishJunk:function(_id){
				this.currentJunkRequirementId = _id;
				this.finishJunkModal = true;
			},
			_doFinishJunk: function() {
				let that = this;
				let _paramIn = {
					"communityId": that.communityId,
					"junkRequirementId": this.currentJunkRequirementId,
					"state":'15001'
				};
				context.request({
					url: constant.url.updateJunkRequirement,
					header: context.getHeaders(),
					method: "POST",
					data: _paramIn,
					success: function(res) {
						console.log('res', res);
						if (res.statusCode != 200) {
							uni.showToast({
								title: res.data,
								icon: 'none',
								duration: 2000
							});
							return ;
						}
						that.finishJunkModal = false;
						uni.showToast({
							title: '操作成功',
							icon: 'none',
							duration: 2000
						});
						that._loadMarket(that.active);
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			_doDeleteJunk: function() {
				let that = this;
				let _paramIn = {
					"communityId": that.communityId,
					"junkRequirementId": this.currentJunkRequirementId
				};
				context.request({
					url: constant.url.deleteJunkRequirement,
					header: context.getHeaders(),
					method: "POST",
					data: _paramIn,
					success: function(res) {
						console.log('res', res);
						if (res.statusCode != 200) {
							uni.showToast({
								title: res.data,
								icon: 'none',
								duration: 2000
							});
							return ;
						}
						that.deleteJunkModal = false;
						uni.showToast({
							title: '删除成功',
							icon: 'none',
							duration: 2000
						});
						that._loadMarket(that.active);
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			}
		}
	}
</script>

<style>

</style>
