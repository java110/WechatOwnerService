<template>
	<view>
		<view class="block__title">运维团队</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-home text-green"></text>
					<text class="text-grey">小区名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{communityName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-service text-green"></text>
					<text class="text-grey">运维名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{admin.storeName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-info text-green"></text>
					<text class="text-grey">运维编号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{admin.storeId}}</text>
				</view>
				
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-location text-green"></text>
					<text class="text-grey">公司地址</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{admin.address}}</text>
				</view>
				
			</view>
			<view class="cu-item arrow" @click="_callPhone()">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">联系电话</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{admin.tel}}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="callAdminModal==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">拨打电话</view>
					<view class="action" @tap="_cancleCall()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认拨打{{admin.name}}-{{admin.tel}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleCall()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doCall()">拨号</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	export default {
		data() {
			return {
				admin:{},
				communityId:'',
				communityName:'',
				callAdminModal:false
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			context.getOwner(function (_ownerInfo) {
			  if (_ownerInfo) {
			    let _active = _ownerInfo.state == '10000' ? 1 : 2;
		
			      _that.communityId= _ownerInfo.communityId;
			      _that.communityName= _ownerInfo.communityName;
				  _that._loadAdmin();
			  }
			});
			
		},
		methods: {
			_loadAdmin:function(){
				let _that = this;
				let _objData = {
					page: 1,
					row: 1,
					communityId: this.communityId,
					memberTypeCd: '390001200000'
				};
				context.request({
					url: constant.url.listStore,
					header: context.getHeaders(),
					method: "GET",
					data: _objData,
					//动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
				
						if (res.statusCode == 200) {
							_that.admin = res.data.stores[0];
							return;
						}
						uni.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			_callPhone:function(){
				this.callAdminModal = true;
			},
			_doCall: function() {
				let _that = this;
				uni.makePhoneCall({
					// 手机号
					phoneNumber: _that.admin.tel,
			
					// 成功回调
					success: (res) => {
						_that.callAdminModal = false;
					},
			
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
			
				});
			},
			_cancleCall: function() {
				this.callAdminModal = false;
			}
		}
	}
</script>

<style>
	
	
	.block__title {
	  margin: 0;
	  font-weight: 400;
	  font-size: 14px;
	  color: rgba(69,90,100,.6);
	  padding: 60rpx 30rpx 20rpx;
	}
	
	
	.button_up_blank{
	  height: 40rpx;
	}

</style>