<template>
	<view>
		<view>
			<image :src="topImg" class="heard-location-icon"></image>
		</view>
		<view class="VerticalBox">
			<!--:scroll-top="verticalNavTop"-->
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation  >
				<view class="cu-item" :class="item.catalogId==curCatalog.catalogId?'text-green cur':''" v-for="(item,index) in catalogs" :key="index" @tap="TabSelect(item)"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class=" padding-lr-sm" >
					<view class="cu-bar solid-bottom">
						<view class="action">
							{{curCatalog.name}}
						</view>
					</view>
					<view class="cu-list menu-avatar" >
						<view class="cu-item vc-cu-item margin-bottom-xs" v-for="(item,index) in goods" :key="index" :id="'main-'+index">
							<view class=" vc-lg c-radius" :style="'background-image:url('+item.imgUrl+');'"></view>
							<view class="content">
								<view class="text-black">{{item.goodsName}}</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										{{item.goodsDesc}}
									</text>
								</view>
								<view class="text-red text-sm">￥{{item.price}}</view>
							</view>
							<view class="action">
								<view class="text-red text-sm">x 5</view>
								<view>
									<button class="cu-btn round line-red sm" @click="_reserveDining(item)">预约</button>
								</view>
								
							</view>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
		<view class=" bg-white  border flex justify-between" style="position: fixed;width: 100%;bottom: 0;">
			<view class="action text-red  line-height margin-left">
				{{selectGoods.length}} 件商品
			</view>
			<view class="flex justify-end">
				<view class="action text-orange margin-right line-height">
					合计：{{receivableAmount}}元
				</view>
				<view class="btn-group">
					<button class="cu-btn bg-red shadow-blur lgplus sharp" :disabled="receivableAmount == 0" @click="onPayFee()">支付</button>
				</view>
			</view>
		</view>
		<reserve-goods ref="reserveGoodsRef"></reserve-goods>
	</view>
</template>

<script>
	import {getCatalogs,getCatalogGoodss} from '@/api/community/reserveApi.js';
	import {getCommunityId} from '@/api/community/communityApi.js';
	import reserveGoods from '@/components/reserve/reserve-goods.vue'
	export default {
		data() {
			return {
				catalogs: [{
					catalogId:-1,
					name:'未设置'
				}],
				goods:[],
				selectGoods:[],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				topImg:this.imgUrl+'/h5/images/dining.png',
				curCatalog:{
					catalogId:-1,
					name:'未设置',
					},
				receivableAmount:0,
			};
		},
		components:{
			reserveGoods,
		},
		onLoad() {
			this.loadCatalog();
		},
		methods: {
			loadCatalog:function(){
				let _that = this;
					getCatalogs({
						page:1,
						row:100,
						type:'1001',
						communityId:getCommunityId()
					}).then(_data=>{
						if(_data && _data.length >0){
							_that.catalogs = _data;
							_that.TabSelect(_data[0]);
						}
					});
			},
			loadCatalogGoods:function(){
				let _that = this;
				getCatalogGoodss({
					page:1,
					row:100,
					type:'1001',
					communityId:getCommunityId(),
					catalogId:this.curCatalog.catalogId
				}).then(_data=>{
					_that.goods = _data;
				})
			},
			TabSelect(_catalog) {
				this.curCatalog = _catalog;
				this.loadCatalogGoods();
			},
			_reserveDining:function(_dining){
				console.log(this.$refs.reserveGoodsRef)
				this.$refs.reserveGoodsRef.reserveGoods(_dining);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.heard-location-icon{
	  width: 100%;
	  height: 300rpx;
	}
	.cu-list .vc-cu-item{
		height: 180upx;
	}
	 .vc-lg{
		     position: absolute;
		left: 10upx;
		    width: 160upx;
		    height: 160upx;
			    font-variant: small-caps;
			    margin: 0;
			    padding: 0;
			    display: inline-flex;
			    text-align: center;
			    justify-content: center;
			    align-items: center;
			    background-color: #ccc;
			    color: #ffffff;
			    white-space: nowrap;
			    background-size: cover;
			    background-position: center;
			    vertical-align: middle;
			    font-size: 1.5em;
				
	}
	.cu-list.menu-avatar>.cu-item .content{
		left: 180upx;
	}
.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		// height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
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
