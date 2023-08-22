/**
 * 路由处理文件
 * 
 * add by 吴学文 QQ 928255095
 */

import url from '../constant/url.js'

import {
	debug
} from '../lib/java110/utils/LogUtil.js'

import {
	hasLogin,
	checkSession
} from '../lib/java110/page/Page.js'


import mapping from '../constant/MappingConstant.js'

import {
	getStorageSync,
	getWAppId
} from '../lib/java110/utils/StorageUtil.js';


import {
	getHcCode
} from '../api/webView/webViewApi.js';

import conf from '../conf/config.js';

import {
	getMallCommunityId
} from '@/api/community/communityApi.js';



export function navigateH5(_url) {
	
	if (_url.indexOf("http") < 0 && _url.indexOf("https") < 0) {
		_url = conf.mallUrl + '#' + _url;
	}
	if (_url.indexOf("?") > 0) {
		_url = _url + "&hcCommunityId=" + getMallCommunityId();
	} else {
		_url = _url + "?hcCommunityId=" + getMallCommunityId();
	}
	_url = _url + "&mallFrom=HC_H5";
	window.location.href = _url;
};
export function navigateMP(_url) {
	if (_url.indexOf("?") > 0) {
		_url = _url + "&hcCommunityId=" + getMallCommunityId();
	} else {
		_url = _url + "?hcCommunityId=" + getMallCommunityId();
	}
	_url = _url + "&mallFrom=HC_MINI"
	let params = _url.split("?")[1].split("&")
	let obj = {};
	params.map(v => obj[v.split("=")[0]] = v.split("=")[1])
	
	uni.navigateToMiniProgram({
		appId: conf.mallMinAppId,
		path: _url, // 不填默认首页
		extraData: obj,
		success(res) {
			// 打开成功
		}
	})
};

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

	if (_tempUrl.startsWith("/")) {
		_tempUrl = _tempUrl.substring(1)
	}

	if (_url.indexOf('wAppId') < 0) {
		_param.url = _newUrl;
	}

	//是否需要登录
	let noLoginFlag = false;
	url.NEED_NOT_LOGIN_PAGE.forEach(item => {
		if (item == _tempUrl) {
			console.log('item=>', item, _tempUrl)
			uni.navigateTo(_param);
			noLoginFlag = true;
		}
	});
	if (noLoginFlag) {
		return;
	}
	debug('vcRoute', 'navigateTo', _param);
	//校验是否登录，如果没有登录跳转至温馨提示页面
	checkSession(_param.url, function() {
		//有回话 跳转至相应页面
		uni.navigateTo(_param);
	})
};

/*
 * 跳转功能封装
 * @param {Object} _param 跳转入参
 */
export function navigateToMall(_param) {
	//参数中刷入wAppId 

	let _url = _param.url;
	uni.setStorageSync(mapping.HC_MALL_CUR_URL, _url);

	//判断有没有登录
	if (!hasLogin()) { //没有登录直接跳转
		// #ifdef H5
		navigateH5(_url)
		// #endif

		// #ifdef MP-WEIXIN
		navigateMP(_url)
		// #endif
		// #ifdef APP-PLUS
		uni.navigateTo({
			url: '/pages/hcWebView/hcWebView?wAppId=' + getWAppId()
		});
		// #endif
		return;
	}

	getHcCode().then(_data => {
		if (_url.indexOf("?") > 0) {
			_url = _url + "&hcCode=" + _data.hcCode;
		} else {
			_url = _url + "?hcCode=" + _data.hcCode;
		}
		uni.setStorageSync(mapping.HC_MALL_CUR_URL, _url);
		// #ifdef H5
		navigateH5(_url)
		// #endif
		
		// #ifdef MP-WEIXIN
		navigateMP(_url)
		// #endif
		// #ifdef APP-PLUS
		uni.navigateTo({
			url: '/pages/hcWebView/hcWebView?wAppId=' + getWAppId()
		});
		// #endif
	})

};



/**
 * 返回上层页面
 */
export function navigateBack() {
	uni.navigateBack({
		delta: 1
	});
}
