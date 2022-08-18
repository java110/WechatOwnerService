<script>
	//app.js
	import context from './lib/java110/Java110Context.js'
	const loginFactory = context.factory.login;
	const userFactory = context.factory.user;
	
	import {reciveMessage} from './api/webView/webViewApi.js';
	
	import {requestNoAuth} from './lib/java110/java110Request.js';
	
	
	import url from './constant/url.js'

	export default {
		// 小程序启动生命周期
		onLaunch: function() {
			let that = this; // 检查登录状态

			//loginFactory.checkLoginStatus(); // 获取用户地理位置
			userFactory.getUserLocation();
			
			 // #ifdef H5
			 window.addEventListener("message", reciveMessage);
			 // #endif
			 
			 uni.onTabBarMidButtonTap(()=>{
			     uni.navigateTo({
			      url:"/pages/openDoorByQrCode/openDoorByQrCode",
			      animationType:'slide-in-bottom'
			     })
			    })   
				
				requestNoAuth({
					url: url.listSystemInfo,
					method: "GET",
					data: {
						page:1,
						row:1
					},
					success: function(res) {
						console.log(res.data);
						if(res.data.data && res.data.data.length >0){
							uni.setStorageSync('java110SystemConfig',res.data.data[0])
						}
						//reslove(res);
					},
					fail: function(e) {}
				
				});
		},
		// app全局数据
		globalData: {
			userInfo: null
		},
		methods: {}
	};
</script>
<style>
	@import "./app.css";

	/* #ifdef H5 */
	uni-page-head {
		display: none;
	}

	/* #endif */
</style>
