import coreUtil from '../utils/CoreUtil.js'

import app from '../constant/AppConstant.js'

import {getDateYYYYMMDDHHMISS} from '../utils/DateUtil.js'

import url from '../constant/url.js'

import mapping from '../constant/MappingConstant.js'

import {checkSession} from '../auth/Java110Auth.js'
import {getWAppId} from './init/initApi.js'


import {
	wechatRefreshToken
} from '../auth/H5Login.js'

import {
	doLogin
} from '../auth/MpWeixinLogin.js'

import {
	doLoginOwnerByKey
}
from '../auth/AppLogin.js'


import {debug,warn,info,error} from '../utils/LogUtil.js'
/**
 * 获取请求头信息
 * add by 吴学文 QQ：928255095
 **/
export function getHeaders() {
	let _wAppId = uni.getStorageSync(mapping.W_APP_ID);
	return {
		"app-id": app.appId,
		"transaction-id": coreUtil.wxuuid(),
		"req-time": getDateYYYYMMDDHHMISS(),
		"sign": '1234567',
		"user-id": '-1',
		"cookie": '_java110_token_=' + wx.getStorageSync('token'),
		"Accept": '*/*',
		"w-app-id": _wAppId
	};
}
/**
 * http 请求 加入是否登录判断
 */
export function request(_reqObj) {
	
	debug('java110Request','request',_reqObj);
	
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


	let _headers = getHeaders();
	if (_reqObj.hasOwnProperty('header')) {
		let _header = _reqObj.header;
		for (let key in _headers) {
			_header.key = _headers[key];
		}
	} else {
		_reqObj.header = _headers;
	}

	//白名单直接跳过检查登录
	if (url.NEED_NOT_LOGIN_URL.includes(_reqObj.url)) {
		_reqObj.communityId = mapping.HC_TEST_COMMUNITY_ID;
		uni.request(_reqObj);
		return;
	}
	//校验是否登录，如果没有登录跳转至温馨提示页面
	checkSession().then(function() {
		//有回话 跳转至相应页面
		//重写token
		_reqObj.header.cookie = '_java110_token_=' + wx.getStorageSync('token');
		uni.request(_reqObj);
	}, function(error) { //回话过期
		// #ifdef H5
		//先微信登录
		wechatRefreshToken();
		// #endif

		//小程序登录
		// #ifdef MP-WEIXIN
		doLogin();
		// #endif

		// #ifdef APP-PLUS
		//查询临时钥匙
		let _key = wx.getStorageSync(mapping.OWNER_KEY);
		if (_key) {
			doLoginOwnerByKey(_key);
		} else {
			uni.navigateTo({
				url: '/pages/showlogin/showlogin?wAppId='+getWAppId()
			});
			return;
		}
		// #endif
	});
}

/**
 * 
 * 不用鉴权的 HTTP 请求
 * @param {Object} _reqObj 请求参数
 */
export function requestNoAuth(_reqObj) {
	debug('java110Request','requestNoAuth',_reqObj);
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
	let _headers = getHeaders();
	if (_reqObj.hasOwnProperty('header')) {
		let _header = _reqObj.header;
		for (let key in _headers) {
			_header.key = _headers[key];
		}
	} else {
		_reqObj.header = _headers;
	}

	_reqObj.header.cookie = '_java110_token_=' + wx.getStorageSync('token');
	uni.request(_reqObj);

}
