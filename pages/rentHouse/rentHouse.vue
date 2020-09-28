<template>
	<view>
		<view class="myfixed">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input :adjust-position="false" v-model="communityName" type="text" placeholder="请输入小区名" confirm-type="search"></input>
				</view>
				<view class="action">
					<button @tap="searchRentRoom" class="cu-btn bg-green shadow-blur round">搜索</button>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav margin-top-sm">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.status==TabCur?'text-orange cur':''" v-for="(item,index) in title"
					 :key="item.status" @tap="tabSelect" :data-id="item.status">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="cu-card article no-card">
			<view class="title-class" style="margin-top: 90px;"></view>
			<view class="cu-item shadow border-bottom padding-top-sm" v-for="(item,index) in rents">
				<view class="content" @tap="toDetail(item.rentingId)">
					<image src="../../static/images/rentimage.jpg" mode="aspectFill" />
					<!-- <image :src="item.src" mode="aspectFill"/> -->
					<view class="desc">
						<view style="margin-left: 5px;letter-spacing: 3px;" class="title-class">{{item.rentingTitle}}</view>
						<view class="text-content">
							<div>
								<text>{{item.builtUpArea}}平方米</text>
							</div>
							<view class='padding-sm flex flex-wrap'>
								<view class='cu-tag line-green sm'>{{item.rentingType == 3344 ? '整租' : '合租'}}</view>
								<view class='cu-tag line-orange sm'>{{item.paymentTypeName}}</view>
								<view class='cu-tag line-olive sm'>{{item.rentingDesc}}</view>
							</view>

							<view class="flex justify-between">
								<div>
									<text class="lg text-gray cuIcon-location text-xs"></text>
									<text class="text-xs">{{item.communityName}}</text>
								</div>
								<text class="text-red">{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	import url from '../../constant/url.js';
	const constant = context.constant;
	const factory = context.factory;

	export default {
		data() {
			return {
				isCard: false,
				communityName: '',
				TabCur: 3344,
				scrollLeft: 0,
				page: 1,
				row: 7,
				rents: [],
				title: [{
					name: '整租',
					status: '3344'
				}, {
					name: '合租',
					status: '4455'
				}],
			};
		},
		onLoad() {
			this.loadRentHouse();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {

			if (this.rents.length >= this.page * this.row) {
				this.page = this.page + 1;
				this.loadRentHouse();
			}

			// this.page = this.page + 1;
			// console.log(this.page)
			// console.log(this.row)

		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.searchRentRoom();
			},
			loadRentHouse: function() {
				let _this = this;

				let _paramIn = {
					"page": _this.page,
					"row": _this.row,
					"rentingType": _this.TabCur,
					"communityName": _this.communityName,
					"state": "1,2,3,4,5,7"
				};
				context.request({
					url: constant.url.queryRentingPool,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						let data = res.data.data;

						// for( let i = 0; i < data.length; i++){
						// 	data[i].src = url.filePath + "?fileId=" + data[i].rentingId + "&communityId=" + data[i].communityId +
						// 	"&time=" + new Date();
						// }
						_this.rents = _this.rents.concat(data);
						console.log(data.length)
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
			searchRentRoom: function() {
				this.page = 1;
				this.row = 7;
				this.rents = [];
				this.loadRentHouse();
			},
			toDetail: function(rentingId) {
				console.log(rentingId)
				this.vc.navigateTo({
					url: '/pages/rentHouse/rentDetail?rentingId=' + rentingId
				});
			}
		}
	}
</script>

<style>
	.myfixed {
		position: fixed;
		width: 100%;
		z-index: 99;
	}
</style>
