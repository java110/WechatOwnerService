/**
 * 路由处理文件
 * 
 * add by 吴学文 QQ 928255095
 */

import url from '../constant/url.js'

import {
	debug
} from '../utils/LogUtil.js'

import {
	hasLogin,
	checkSession
} from '../auth/Java110Auth.js'

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

import {
	getStorageSync
} from '../utils/StorageUtil.js';

// 页面初始化相关
import {
	getWAppId
} from '../api/init/initApi.js'

/*
 * 跳转功能封装
 * @param {Object} _param 跳转入参
 */
export function navigateTo(_param, callback = () => {}) {

	//参数中刷入wAppId 
	let _url = _param.url;
	let _tempUrl = '';
	let _newUrl = '';
	//url 中强制写入wAppId 每个页面必须带入
	if (_url.indexOf('?') > 0) {
		_newUrl = _url + ('&wAppId=' + getWAppId());
		_tempUrl = _url.substring(0, _url.indexOf('?'))
	} else {
		_newUrl = _url + ('?wAppId=' + getWAppId());
		_tempUrl = _url;
	}

	if (_url.indexOf('wAppId') < 0) {
		_param.url = _newUrl;
	}

	//是否需要登录
	let noLoginFlag = false;
	url.NEED_NOT_LOGIN_PAGE.forEach(item => {
		if (item == _tempUrl) {
			console.log('item=>',item,_tempUrl)
			uni.navigateTo(_param);
			noLoginFlag = true;
		}
	});
	if(noLoginFlag){
		return ;
	}
	debug('vcRoute', 'navigateTo', _param);
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
		doLogin(callback);
		// #endif

		// #ifdef APP-PLUS
		//查询临时钥匙
		let _key = getStorageSync(mapping.OWNER_KEY);
		if (_key) {
			doLoginOwnerByKey(_key);
		} else {
			uni.navigateTo({
				url: '/pages/showlogin/showlogin?wAppId=' + getWAppId()
			});
			return;
		}
		// #endif
	});
};

/**
 * 返回上层页面
 */
export function navigateBack() {
	uni.navigateBack({
		delta: 1
	});
}
