<template>
	<view>
		<view class="real_list">
			<view class="title">物业服务</view>
			<view class="list">
				<view class="item" v-for="(item,index) in real_list" :key="index" @tap="to(item)">
					<image :src="item.src"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		hasOwner
	} from '@/api/owner/ownerApi.js'
	export default {
		name: "serviceProperty",
		data() {
			return {
				real_list: [],
			};
		},
		created() {
			this._loadMenu();
		},
		methods: {
			to: function(v) {
				if (v.name == '商圈') {
					uni.switchTab({
						url: v.href
					})
				} else if (v.href != '') {
					if(v.needLogin == 'N'){
						this.vc.navigateTo({
							url: v.href
						});
						return ;
					}
					hasOwner();
					this.vc.navigateTo({
						url: v.href
					});
					
				} else {
					uni.showToast({
						icon: 'none',
						title: '此功能暂不开放'
					})
				}
			},
			_loadMenu: function() {
				this.real_list = [{
						name: '生活缴费',
						src: this.imgUrl+'/h5/images/serve/1.png',
						href: '/pages/oweFee/oweFee'
					}, {
						name: '房屋费',
						src: this.imgUrl+'/h5/images/serve/5.png',
						href: '/pages/roomFeeListNew/roomFeeListNew'
					}, {
						name: '停车费',
						src: this.imgUrl+'/h5/images/serve/9.png',
						href: '/pages/payParkingFeeList/payParkingFeeList'
					}, {
						name: '合同费',
						src: this.imgUrl+'/h5/images/serve/12.png',
						href: '/pages/contractFeeList/contractFeeList'
					},
					{
						name: '家庭成员',
						src: this.imgUrl+'/h5/images/serve/2.png',
						href: '/pages/familyList/familyList'
					},
					{
						name: '访客通行',
						src: this.imgUrl+'/h5/images/serve/3.png',
						href: '/pages/visit/visitList'
					},
					{
						name: '投诉咨询',
						src: this.imgUrl+'/h5/images/serve/4.png',
						href: '/pages/complaint/complaint'
					},
					{
						name: '报事维修',
						src: this.imgUrl+'/h5/images/serve/6.png',
						href: '/pages/repair/repair'
					},
					{
						name: '社区公告',
						src: this.imgUrl+'/h5/images/serve/7.png',
						href: '/pages/notice/index'
					},
					{
						name: '一键开门',
						src: this.imgUrl+'/h5/images/serve/8.png',
						href: '/pages/openDoor/openDoor'
					},
					{
						name: '装修报备',
						src: this.imgUrl+'/h5/images/serve/10.png',
						href: '/pages/roomRenovation/roomRenovation'
					},
					{
						name: '业主信息',
						src: this.imgUrl+'/h5/images/serve/my1.png',
						href: '/pages/viewBindOwner/viewBindOwner'
					},
					{
						name: "车位申请",
						src: this.imgUrl+"/h5/images/serve/my6.png",
						href: "/pages/applyparking/applyparking"
					},
					{
						name: "投票问卷",
						src: this.imgUrl+"/h5/images/serve/my2.png",
						href: "/pages/questionAnswer/questionAnswer"
					}, {
						name: "返省上报",
						src: this.imgUrl+"/h5/images/serve/my3.png",
						href: "/pages/reportInfoBack/reportInfoBack",
						needLogin: 'N'
					},
					{
						name: '空置房申请',
						src: this.imgUrl+'/h5/images/serve/my9.png',
						href: '/pages/applyRoom/applyRoom'
					}
				];
			}
		}
	}
</script>

<style lang="less">
	.real_list,
	.live_list {
		background: #fff;
		padding: 0 40upx;
		margin-top: 20upx;

		.title {
			line-height: 32upx;
			background: #fff;
			font-size: 30upx;
			font-weight: 600;
			color: #333;
			padding: 40upx 0;
			margin-top: 10px;
		}

		.item {
			width: 25%;
			display: inline-block;
			text-align: center;
			margin-bottom: 40upx;
		}

		image {
			height: 44upx;
			width: 44upx;
			margin-bottom: 10upx;
		}

		.text {
			color: #333;
			font-size: 28upx;
		}
	}
</style>
