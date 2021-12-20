<template>
	<view class="mp-search-box ">
		<view style="width: 90%; height: 75%; position: relative">
			<input class="wyginput" type="text" :placeholder="placeholder" placeholder-class="cl" @tap="toSearch()" disabled="true"/>
			
			<view style="position: absolute;top:0;right: 2.4%;height: 100%; display: flex; align-items: center;" >
			        <!-- <image src="../../static/img/common/search.png" style="width: 0.8rem;height: 0.8rem;"></image> -->
			</view>
		</view>
		
		
		
	</view>
</template>

<script> 

 
	export default { 
        props:{  
			placeholder:{
				type: String,
				default: '输入关键字搜索8888',
			},
		},
		data() {
			return {

			};
		},
		
		onLoad() {

		},
		methods: {
			toSearch(){
				this.$emit('search', {});
			}

		}
	}
</script>

<style lang="scss" scoped>
	.mp-search-box {
		position: fixed;
		left: 0;
		top: 2.4rem;
		/* #ifdef H5 */
		top: 0;
		
		/* #endif */
		
		/* #ifndef H5 */
		top: 2.4rem;
		
		/* #endif */
		
		
		z-index: 9999;
		height: 2.4rem;
		background-color: #ffffff;
		
		display: flex;
		justify-content: center;
		align-items: center;
		
		width: 100%;
	
	}
	

	.cl{
		color: #888888;
		font-size: 0.8rem;
		line-height: 1rem;
		margin-left: 1rem;
	}
	
	.wyginput{
		flex:1;
		width: 100%;
		height: 100%;		
		line-height: 100%;
		text-align: center;
		padding-left: 0;
		font-size: 0.8rem;
		color:#333333;
		border-radius: 1rem;
		background-color: #eeeeee;
	}

</style>
