<template>
	<view class="user-container">
		<view class="notice">
			<view>
				<view class="text">姓<text decode="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>名: {{obj.repairName}}</view>
				<view class="text">联系方式: {{obj.tel}}</view>
				<view class="text">报修类型: {{obj.repairTypeName}}</view>
				<view class="text">状<text decode="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>态: {{obj.stateName}}</view>
				<!-- <view class="text"> 报修时间: 2019-10-20 21:59:39</view> -->
				<view class="text">预约时间: {{obj.appointmentTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../../context/Java110Context.js"); //获取app实例
	//获取app实例
	const app = getApp().globalData;

	export default {
		data() {
			return {
				obj: {}
			};
		},

		components: {},
		props: {},
		onLoad: function(e) {
			let that = this;
			context.onLoad(e);
			this.setData({
				obj: JSON.parse(e.item)
			});
		},
		onShow: function() {
			let that = this;
		},
		methods: {
			setData: function(obj, callback) {
				let that = this;
				let keys = [];
				let val, data;
				let reg = /[d+]/;
				Object.keys(obj).forEach(function(key) {
					keys = key.split('.');
					val = obj[key];
					data = that.$data;
					keys.forEach(function(key2, index) {
						if (index + 1 == keys.length) {
							if (reg.test(key2)) {
								let re = /(.*?)[(d+)]/.exec(key2);
								let name = re[1];
								let kk = re[2];
								data = data[name];
								data[kk] && that.$set(data, kk, val);
							} else {
								data[key2] && that.$set(data, key2, val);
							}
						} else {
							if (reg.test(key2)) {
								let re = /(.*?)[(d+)]/.exec(key2);
								let name = re[1];
								let kk = re[2];
								data = data[name][kk];
							} else if (data[key2]) {
								that.$set(data, key2, {});
								data = data[key2];
							}
						}
					});
				});
				callback && callback();
			}
		}
	};
</script>
<style>
	@import "./detail.css";
</style>
