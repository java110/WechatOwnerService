<template>
	<view>
		<view class="cu-modal" :class="viewImage?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" :style="'background-image: url('+ viewImageSrc +');height:800rpx;background-size: 100% 100%;'">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="closeViewImage()">
							<text class="btn-close">X</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"view-image",
		data() {
			return {
				viewImage: false,
				viewImageSrc: '',
			};
		},
		methods:{
			
			showThis: function(_url){
				this.viewImageSrc = _url;
				this.viewImage = true;
			},
			
			closeViewImage: function() {
				this.viewImage = false;
			},
		}
	}
</script>

<style>
	.btn-close{
		background-color: #000;
		border-radius: 50%;
		width: 25px;
		height: 25px;
		text-align: center;
		line-height: 25px;
	}
</style>
