<template>
	<view class="bg-white group-view margin-top">
		<view class="flex justify-between group-view-top">
			<view>
				<text class="view-title">超值拼团</text>
				<text class="view-sub-title">拼着买更便宜</text>
			</view>
			<view>
				<text @tap="_toGroupGoodsList" class="view-title-more">更多 ></text>
			</view>
		</view>
		<view class="bg-white flex justify-between group-goods">
			<view v-for="(item,index) in goods" :key="index" class="group-item" @click="_toGroupGoods(item)">
				<view>
					<image :src="item.coverPhoto"></image>
				</view>
				<view>
					<text class="group-price">￥{{item.groupPrice}}</text>
				</view>
				<view>
					<text class="normal-price">￥{{item.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {queryGroupGoods} from '../../api/goods/goodsApi.js';
	export default {
		name:"groupView",
		data() {
			return {
				goods:[],
				shopId:''
			};
		},
		created() {
			let _goods = {
				coverPhoto:this.imgUrl + '/h5/images/noPic.png',
				groupPrice:'1.50',
				price:'2.50'
			}
			this.goods.push(_goods);
			this.goods.push(_goods);
			this.goods.push(_goods);
			this.goods.push(_goods);
			this._loadGoods();
		},
		methods:{
			_toGroupGoodsList:function(){
				this.vc.navigateToMall({
					url:'/pages/goods/groupGoodsList'
				},true)
			},
			_loadGoods:function(){
				let _that = this;
				queryGroupGoods({
					page:1,
					row:4,
					shopId:this.shopId
				}).then(_data=>{
					_that.goods = _data
				})
			},
			_toGroupGoods:function(_product){
				this.vc.navigateToMall({
					url:'/pages/goods/groupGoods?productId='+_product.productId+"&groupId="+_product.groupId+"&shopId="+_product.shopId
				},true)
			}
		}
	}
</script>

<style lang="scss">
	.group-view{
		border-radius: 10upx;
		padding:20upx;
		.view-title{
			font-size: 36upx;
			color: #444;
		}
		.view-sub-title{
			font-size: 18upx;
			margin-left:20upx;
			color:#FA2E1B;
		}
		.view-title-more{
			font-size: 24upx;
			color: #777;
			line-height: 48upx;
		}
		.group-goods{
			margin-top:20upx;
			.group-item{
				width: 25%;
				text-align: center;
				image{
					width: 90%;
					height: 180upx;
					border-radius: 15upx;
				}
			}
			.group-price{
				font-size: 32upx;
				color: #FA2E1B;
			}
			.normal-price{
				font-size: 24upx;
				color: #777;
				text-decoration:line-through;
			}
		}
		
	}
</style>