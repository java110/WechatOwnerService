<template>
	<view>
		<appointment @onPulling="onPulling"
			@SelectHeader="SelectHeader" @Appointment="Appointment"></appointment>
	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js';
	const constant = context.constant;
	import appointment from '@/components/mgb-appointment/mgb-appointment.vue';
	import {getCurOwner} from '../../api/owner/ownerApi.js';
	
	export default {
		components: {
			appointment
		},
		data() {
			return {
				selectHeader: 0,
				WeekList: [],
				day: 1
			}
		},
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			getCurOwner().then(function(_owner){
				// _that.communityId = _owner.communityId;
				// _that.communityName = _owner.communityName;
				// _that.ownerId = _owner.ownerId;
				// _that._loadOweFee();
			})
		},
		methods: {
			// 选择头部日期
			SelectHeader(item) {
				console.log(item);
			},
			// 下拉刷新 
			onPulling() {
				console.log('onPulling');
			},
			// 提交订单
			confCd(list) {				
			}
		}
	};
</script>

<style>
</style>
