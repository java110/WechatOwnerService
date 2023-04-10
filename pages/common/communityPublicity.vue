<template>
	<view>
		<view>
			<image :src="topImg" class="heard-location-icon"></image>
		</view>
		<view class="cu-list grid" :class="'col-2'">
			<view class="cu-item" @click="toList(item);"
			v-for="(item,index) in pubTypes" :key="index">
				<view :class="['cuIcon-info','text-red']"></view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {queryDict} from '../../api/user/userApi.js'
	export default {
		data() {
			return {
				topImg:this.imgUrl+'/h5/images/communityPublicity.jpg',
				pubTypes:[]
			}
		},
		onLoad() {
			this._loadPubTypes();
		},
		methods: {
			_loadPubTypes:function(){
				let _that = this;
				queryDict({
					name:'community_publicity',
					type:'pub_type'
				}).then(_data=>{
					_that.pubTypes = _data;
				})
			},
			toList:function(_item){
				uni.navigateTo({
					url:'/pages/common/communityPublicityList?pubType='+_item.statusCd
				})
			}
		}
	}
</script>

<style lang="scss">
	.heard-location-icon{
	  width: 100%;
	  height: 300rpx;
	}
	text {
		text-align: center;
	}
</style>
