<template>
	<view>
		<view class="myfixed">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input  :adjust-position="false" type="text" placeholder="搜索房屋" confirm-type="search"></input>
				</view>
				<view class="action">
					<button @tap="searchRentRoom" class="cu-btn bg-green shadow-blur round">搜索</button>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in title" :key="item.status"
					 @tap="tabSelect" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="cu-card article no-card">
			<view class="cu-item shadow border-bottom"  v-for="(item,index) in 10">
				<view class="content">
					<image src="/static/images/rentimage.jpg" mode="aspectFill"></image>
					<view class="desc">
						<view class="title-class">xxxx大学城地铁站大单间出租</view>
						<view class="text-content">
							<view class='padding-sm flex flex-wrap'>
								<view class='cu-tag line-green'>整租</view>
								<view class='cu-tag line-orange'>押一付一</view>
								<view class='cu-tag line-olive'>立即入住</view>
							</view>
							
							<view style="margin-left: 5px;">
								<text class="text-red">1000元/月</text>
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
	const constant = context.constant;
	const factory = context.factory;
	export default {
		data() {
			return {
				isCard: false,
				TabCur: 0,
				scrollLeft: 0,
				title: [{
					name: '整租',
					status: '3344'
				}, {
					name: '合租',
					status: '4455'
				}]
			};
		},
		onLoad() {
			this.loadRentHouse();
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			tabSelect(e) {
				console.log(e);
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			loadRentHouse: function() {

				let _paramIn = {
					"communityId": 1111,
					"typeCd": 1,
					"state": '13001',
					"page": 1,
					"row": 15
				};


				context.request({
					url: constant.url.queryRentingPool,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						console.log('res', res);

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
			searchRentRoom:function(){
				console.log("搜索中");
			}
		}
	}
</script>

<style>
	.myfixed {
		position: fixed;
		width: 100%;
		height: 170px;
		z-index: 99;
	}
</style>
