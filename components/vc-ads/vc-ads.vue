<template>
	<swiper class="ad-swiper bg-white c-radius margin-top-sm" :style="adHeight" indicator-dots="true"
		indicator-color="rgba(228,228,228,1)" indicator-active-color="#FECA49" autoplay="true" interval="5000"
		duration="1000" circular="true">
		<block v-for="(item, index) in ad" :key="index">
			<swiper-item>
				<image :src="item.url" class="c-radius ad-img" ></image>
			</swiper-item>
		</block>
	</swiper>
</template>

<script>
	import {
		loadAdverts
	} from '../../api/mall/mallApi.js'
	export default {
		// 组件传参
		props: {
			// 广告类型
			locationTypeCd: {
				type: String,
				default: '3000'
			},
			// 高度，单位upx，默认180upx
			height: {
				default: 140
			}
		},
		data() {
			return {
				ad: [],
				adHeight: {
					height: this.height + "upx"
				}
			};
		},
		mounted() {
			this._loadAdvertPhoto();
		},
		methods: {
			_loadAdvertPhoto: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 5,
					locationTypeCd: this.locationTypeCd,
					viewType:'8888'
				};
				//查询 广告
				loadAdverts(_objData)
					.then(function(_aPhotos) {
						_that.ad = _aPhotos;
					});
			}
		}
	};
</script>

<style>
	.ad-img {
		width: 100%;
		height: 100%;
	}
	
	.c-radius{
		border-radius: 15upx;
	}
</style>
