<template>
	<view>
		<view v-if="owners.length>0">
			<view class="block__title">成员信息</view>
			<view v-for="(item,index) in owners" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>{{item.name}}</view>
					<view class="text-gray">{{item.link}}</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">成员编号</view>
					<view class="text-gray">{{item.memberId}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">身份证号</view>
					<view class="text-gray">{{item.idCard}}</view>
				</view>

				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">成员年龄</view>
					<view class="text-gray">{{item.age}}岁</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">成员性别</view>
					<view class="text-gray">{{item.sex == 0? '男': '女'}}</view>
				</view>
				
				<view class="solid-top flex justify-end margin-top padding-top-sm padding-bottom-sm">
					<button  class="cu-btn sm bg-red " @click="_deleteOwnerMember(item)">删除</button>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
		<view class="button_up_blank"></view>

		<view v-if="ownerTypeCd == '1001'" class="bg-white  border flex justify-end" style="position: fixed;width: 100%;bottom: 0;">
			<view class="action text-orange margin-right line-height">

			</view>
			<view class="btn-group">
				<button class="cu-btn bg-green shadow-blur lgplus sharp" @click="goAdd()">添加成员</button>
			</view>
		</view>
		
		<view class="cu-modal" :class="delOwnerMemberFlag==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">温馨提示</view>
					<view class="action" @tap="_cancleCall()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认删除该成员？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleDeleteOwnerMember()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doDeleteOwnerMember()">确认</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	
	import {deleteOwnerMember} from '../../api/owner/ownerApi.js'
	export default {
		data() {
			return {
				owners: [],
				delOwnerMemberFlag:false,
				page: 1,
				totalPage: 0,
				loading: false,
				communityId: '',
				ownerId: '',
				curOwnerMember:{},
				ownerTypeCd: '',
			};
		},
		components: {
			noDataPage
		},
		onLoad: function(options) {
			context.onLoad(options);
		},
		onShow: function() {
			this._initData();
			
		},
		onPullDownRefresh: function() {
			// 上拉刷新
			if (!this.loading) {
				this.getTable(1, true).then(() => {
					// 处理完成后，终止下拉刷新
					wx.stopPullDownRefresh();
				});
			}
		},
		onReachBottom: function() {
			console.log(1, !this.loading, this.page < this.totalPage); // 下拉触底，先判断是否有请求正在进行中
			// 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求

			if (!this.loading && this.page < this.totalPage) {
				this.getTable(this.page + 1);
			}
		},
		methods: {
			_initData:function(){
				let that = this;
				that.owners = [];
				context.getOwner(function(_owner) {
					that.communityId = _owner.communityId;
					that.ownerId = _owner.memberId;
					that.ownerTypeCd = _owner.ownerTypeCd;
					that.getTable(1);
				});
			},
			getTable: function(page, override) {
				let that = this;
				this.loading = true;
				let _paramIn = {
					"communityId": that.communityId,
					"ownerId": that.ownerId
				};
				context.request({
					url: constant.url.queryOwnerMembers,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						if (res.statusCode == 200) {
							let _owners = res.data.owners;
							that.owners = _owners;
							that.loading = false;
						}
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			goAdd: function(e) {
				this.vc.navigateTo({
					url: "/pages/family/family"
				})
			},
			_deleteOwnerMember:function(item){
				this.delOwnerMemberFlag = true;
				this.curOwnerMember = item;
			},
			_cancleDeleteOwnerMember:function(item){
				this.delOwnerMemberFlag = false;
			},
			_doDeleteOwnerMember:function(){
				let that = this;
				this.curOwnerMember.communityId = this.communityId;
				deleteOwnerMember(this.curOwnerMember)
				.then((res)=>{
					uni.showToast({
						icon:'none',
						title:'删除成功'
					});
					that._cancleDeleteOwnerMember();
					that._initData();
				},(err)=>{
					uni.showToast({
						icon:'none',
						title:err
					});
					that._cancleDeleteOwnerMember();
				})
			}
		}
	};
</script>
<style>
	.ppf_item {
		padding: 0rpx 0rpx 0rpx 0rpx;
	}

	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 100rpx;
	}

	.cu-btn.lgplus {
		padding: 0 20px;
		font-size: 18px;
		height: 100upx;

	}

	.cu-btn.sharp {
		border-radius: 0upx;
	}

	.line-height {
		line-height: 100upx;
	}
</style>
