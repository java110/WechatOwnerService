<template>
	<view>
		<!--index.wxml-->
		<my-person ref="myPersonRef"></my-person>

		<my-menu ></my-menu>

		<my-system ref="mySystem"></my-system>
	</view>
</template>

<script>
	/** index.js **/
	import context from '../../lib/java110/Java110Context.js';
	const factory = context.factory; //获取app实例
	const constant = context.constant;
	//获取app实例
	const app = getApp().globalData;
	import conf from '../../conf/config.js';
	import {
		getHcCode
	} from '../../api/webView/webViewApi.js'
	import {
		encodeUrl
	} from '../../lib/java110/utils/UrlUtil.js'
	import {
		getCurCommunity
	} from '../../api/community/communityApi.js'
	import {
		setStorageSync
	} from '../../lib/java110/utils/StorageUtil.js'
	import mapping from '../../constant/MappingConstant.js'

	import {
		hasLogin
	} from '../../lib/java110/page/Page.js'
	import {
		hasOwner
	} from '../../api/owner/ownerApi.js'
	import {
		queryOwnerAccount
	} from '../../api/user/userApi.js'

	import myPerson from '@/components/my/my-person.vue'
	import myMenu from '@/components/my/my-menu.vue'
	import mySystem from '@/components/my/my-system.vue'
	export default {
		data() {
			return {	
				property: {},
				// 用户信息
				
			};
		},
		components: {
			myPerson,
			myMenu,
			mySystem
		},
		props: {},
		onLoad: function(options) {
			this.vc.onLoad(options, () => {
				this.loadOwnerAccount();
			});
		},
		onShow: function() {
			let _that = this; //查询用户信息
			this.$refs.myPersonRef.refreshPageLoginInfo();
			this.$refs.mySystem._judgeHasLogin();
		},
		methods: {
			// 原onShow方法
			// 自动登录后 刷新页面登录信息
			onGotUserInfo: function(e) {
				console.log("nickname=" + JSON.stringify(e.detail.userInfo));
			},
			// 我的服务跳转
			to_serve(v) {
				this.vc.navigateTo({
					url: v.href,
				})
			},
		}
	};
</script>
<style lang="less">
	@import "./my.css";
</style>
