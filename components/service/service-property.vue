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
					if (v.needLogin == 'N') {
						this.vc.navigateTo({
							url: v.href
						});
						return;
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
						src: this.imgUrl + '/h5/images/serve/1.png',
						href: '/pages/fee/oweFee'
					},
					// {
					// 	name: '临时车费',
					// 	src: this.imgUrl+'/h5/images/serve/1.png',
					// 	href: '/pages/fee/tempParkingFee?paId=102022101773780027&communityId=2022081539020475&appId=123&aliAppId=12345'
					// },
					{
						name: '房屋费',
						src: this.imgUrl + '/h5/images/serve/5.png',
						href: '/pages/fee/roomFeeListNew'
					}, {
						name: '停车费',
						src: this.imgUrl + '/h5/images/serve/9.png',
						href: '/pages/fee/payParkingFeeList'
					}, {
						name: '合同费',
						src: this.imgUrl + '/h5/images/serve/12.png',
						href: '/pages/fee/contractFeeList'
					},
					{
						name: '水电充值',
						src: this.imgUrl + '/h5/images/serve/5.png',
						href: '/pages/meter/meter'
					},
					{
						name: '家庭成员',
						src: this.imgUrl + '/h5/images/serve/2.png',
						href: '/pages/family/familyList'
					},
					{
						name: '访客通行',
						src: this.imgUrl + '/h5/images/serve/3.png',
						href: '/pages/visit/visitList'
					},
					{
						name: '投诉咨询',
						src: this.imgUrl + '/h5/images/serve/4.png',
						href: '/pages/complaint/complaint'
					},
					{
						name: '报事维修',
						src: this.imgUrl + '/h5/images/serve/6.png',
						href: '/pages/repair/repair'
					},
					{
						name: '社区公告',
						src: this.imgUrl + '/h5/images/serve/7.png',
						href: '/pages/notice/index'
					},
					{
						name: '一键开门',
						src: this.imgUrl + '/h5/images/serve/8.png',
						href: '/pages/machine/openDoor'
					},
					{
						name: '装修报备',
						src: this.imgUrl + '/h5/images/serve/10.png',
						href: '/pages/renovation/roomRenovation'
					},
					{
						name: '业主信息',
						src: this.imgUrl + '/h5/images/serve/my1.png',
						href: '/pages/viewBindOwner/viewBindOwner'
					},
					{
						name: "车位申请",
						src: this.imgUrl + "/h5/images/serve/my6.png",
						href: "/pages/applyparking/applyparking"
					},
					{
						name: "投票问卷",
						src: this.imgUrl + "/h5/images/serve/my2.png",
						href: "/pages/questionAnswer/questionAnswer"
					}, 
					{
						name: '空置房申请',
						src: this.imgUrl + '/h5/images/serve/my9.png',
						href: '/pages/applyRoom/applyRoom'
					},
					{
						name: '球场预约',
						src: this.imgUrl + '/h5/images/serve/order4.png',
						href: '/pages/appointment/appointment'
					},
					{
						name: '就餐',
						src: this.imgUrl + '/h5/images/serve/order4.png',
						href: '/pages/reserve/reserveDining'
					},
					{
						name: '预约服务',
						src: this.imgUrl + '/h5/images/serve/order4.png',
						href: '/pages/reserve/reserveService'
					},
					{
						name: '物品放行',
						src: this.imgUrl + '/h5/images/serve/order4.png',
						href: '/pages/itemRelease/itemRelease'
					},
					{
						name: '智能充电',
						src: this.imgUrl + '/h5/images/serve/my3.png',
						href: '/pages/machine/chargeMachines',
						needLogin: 'N'
					},
					{
						name: '物业打分',
						src: this.imgUrl + '/h5/images/serve/my9.png',
						href: '/pages/complaint/examineStaff'
					},
					{
						name: '小区公示',
						src: this.imgUrl + '/h5/images/serve/my1.png',
						href: '/pages/common/communityPublicity'
					},
					// {
					// 	name: "返省上报",
					// 	src: this.imgUrl + "/h5/images/serve/my3.png",
					// 	href: "/pages/reportInfoBack/reportInfoBack",
					// 	needLogin: 'N'
					// },
					
					// {
					// 	name: '设备',
					// 	src: this.imgUrl + '/h5/images/serve/order4.png',
					// 	href: '/pages/machine/machine?machineId=102022110791780032&communityId=2022110264250009'
					// },
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
