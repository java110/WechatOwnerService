/**
 * 路由处理文件
 * 
 * add by 吴学文 QQ 928255095
 */

import url from '../constant/url.js'

import {debug} from '../utils/LogUtil.js'

import {hasLogin,checkSession} from '../auth/Java110Auth.js'

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

import mapping from '../constant/MappingConstant.js'

import {getStorageSync} from '../utils/StorageUtil.js'

/*
* 跳转功能封装
 * @param {Object} _param 跳转入参
 */
export function navigateTo(_param) {
	let _url = _param.url;
	let _tempUrl = _url.indexOf('?') > 0 ? _url.substring(0, _url.indexOf('?')) : _url;
	//是否需要登录
	url.NEED_NOT_LOGIN_PAGE.forEach(item => {
		if (item == _tempUrl) {
			uni.navigateTo(_param);
			return;
		}
	});
	debug('vcRoute','navigateTo',_param);
	//校验是否登录，如果没有登录跳转至温馨提示页面
	checkSession().then(function() {
		//有回话 跳转至相应页面
		uni.navigateTo(_param);
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
		let _key = getStorageSync(mapping.OWNER_KEY);
		if (_key) {
			doLoginOwnerByKey(_key);
		} else {
			uni.navigateTo({
				url: '/pages/showlogin/showlogin'
			});
			return;
		}
		// #endif
	});
};