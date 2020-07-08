<template>
	<view>
		<view class="content bg-white margin-top">
			<view class="flex solid-bottom padding justify-start">
				<view class=" padding-sm radius">服务评分</view>
				<view class=" padding-sm  radius">
					<sx-rate :value="4" :fontSize="fontSize" :value.sync="rateSync" @change="onChange" />
				</view>
			</view>
			<view class="cu-form-group padding align-start">
				<view class="title padding-left-sm">服务评价</view>
				<textarea maxlength="200" v-model="context" placeholder="请填写本地服务评价"></textarea>
			</view>
			
			<view class="flex flex-direction margin">
				<button class="cu-btn bg-green margin-tb-sm lg" @click="submitAppraiseRepair()">评价</button>
			</view>

		</view>
	</view>
</template>

<script>
	import SxRate from '@/components/sx-rate'
	export default {
		data() {
			return {
				fontSize:'60upx',
				rateSync: 2,
				animation: true,
				curAppraise: 4,
				context: '',
				repairId:'',
			}
		},
		components: {
			SxRate
		},
		onLoad(options) {
			let _repairId = options.repairId;
			this.repairId = _repairId;
		},
		methods: {
			onChange(e) {
				this.curAppraise = e;
			},
			submitAppraiseRepair:function(){
				if(context == ''){
					uni.showToast({
						title:'请填写评价内容',
						icon:'none'
					});
					return ;
				}
				
				if(this.repairId == ''){
					uni.showToast({
						title:'未包含报修信息',
						icon:'none'
					});
					return ;
				}
				
				
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
	}
</style>
