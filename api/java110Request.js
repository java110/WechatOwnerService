
import coreUtil from '../utils/CoreUtil.js'

import app from '../constant/AppConstant.js'

import dataUtil from '../utils/DateUtil.js'

import url from '../constant/url.js'

import mapping from '../constant/MappingConstant.js'

/**
 * 获取请求头信息
 * add by 吴学文 QQ：928255095
 **/
export function getHeaders() {
	let _wAppId = uni.getStorageSync(constant.mapping.W_APP_ID);
	return {
		"app-id": app.appId,
		"transaction-id": coreUtil.wxuuid(),
		"req-time": dataUtil.getDateYYYYMMDDHHMISS(),
		"sign": '1234567',
		"user-id": '-1',
		"cookie": '_java110_token_=' + wx.getStorageSync('token'),
		"Accept": '*/*',
		"w-app-id":_wAppId
	};
}


/**
 * http 请求 加入是否登录判断
 */
export function request(_reqObj) {
	//这里判断只有在 post 方式时 放加载框
	if (_reqObj.hasOwnProperty("method") && "POST" == _reqObj.method) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		_reqObj.complete = function() {
			uni.hideLoading();
		}
	}

	//白名单直接跳过检查登录
	if (url.NEED_NOT_LOGIN_URL.includes(_reqObj.url)) {
		_reqObj.communityId = mapping.HC_TEST_COMMUNITY_ID;
		uni.request(_reqObj);
		return;
	}
	//校验是否登录，如果没有登录跳转至温馨提示页面
	factory.login.checkSession().then(function() {
		//有回话 跳转至相应页面
		//重写token
		_reqObj.header.cookie = '_java110_token_=' + wx.getStorageSync('token');
		uni.request(_reqObj);
	}, function(error) { //回话过期
		// #ifdef H5
		//先微信登录
		factory.login.wechatRefreshToken();
		// #endif

		//小程序登录
		// #ifdef MP-WEIXIN
		factory.login.doLogin();
		// #endif

		// #ifdef APP-PLUS
		//查询临时钥匙
		let _key = wx.getStorageSync(constant.mapping.OWNER_KEY);
		if (_key) {
			factory.login._doLoginOwnerByKey(_key);
		} else {
			uni.navigateTo({
				url: '/pages/showlogin/showlogin'
			});
			return;
		}
		// #endif
	});
}