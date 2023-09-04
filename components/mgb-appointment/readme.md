## 素材
ColorUI 
[语雀-ColorUI群资源](https://www.yuque.com/colorui)
 
## 开始使用
 ```
	<template>
		<view>
			<appointment :contentList="contentList" @onPulling="onPulling" @SelectHeader="SelectHeader" @Appointment="Appointment"></appointment>
		</view>
	</template>
	  
	<script>
	import appointment from '@/components/appointment/appointment.vue';
	export default {
		components:{
			appointment
		},
		data() {
			return {
				selectHeader: 0,
				WeekList: [],
				day:1,
			  contentList:[{
					time: '07:00-09:00',
					name: '系统感知课',
					teacher: 'user',
					count: 10
				}]
			};
		},
		methods: {
			 // 选择头部日期
			SelectHeader(item) {
				console.log(item);
			},
		 // 下拉刷新 
			onPulling(){
				console.log('onPulling');
			},
			// 预约
			Appointment(){
				uni.showModal({
				    title: '预约',
				    content: '系统感知课:12:20-13:45',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	};
	</script>
	
	<style>
	</style>
	
 ```
 | 参数       | 作用   |类型    |  默认值 | 可取值|
 | --------   | -----:  |-----:  | :----:  |
 | TimeType    | 头部日期 |String  |   '本周剩余日期和下周日期'    |'本周日期''下周日期''上周日期''本周剩余日期和下周日期''本周剩余日期'|
 | contentList | 内容 | Array |    ||
 ------