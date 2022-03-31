import {
	requestNoAuth
} from '../java110Request.js'
import {
	saveOwnerStorage,
	saveUserLoginInfo,
	getWAppId,
	saveWAppId,
	getLoginFlag
} from '../utils/StorageUtil.js'
import {
	isNotNull,
	isNull
} from '../utils/StringUtil.js'

import url from '../../../constant/url.js'

import {addMinutes} from "../utils/DateUtil.js"

export function pageOnLoad(options) {
	let _key = options.key;
	if (isNotNull(_key)) {
		//根据key 去做登录
		doLoginOwnerByKey(_key, function(){
			// 可能存在 页面初始化等一些问题 这里删除连接中的key 然后刷新页面
			window.location.href = window.location.href.replace('key=','_keySuccess=')
		});
	}

	getPageWAppId(options);
	
	if (isNull(_key)) {
		onLoadHasAuth();
	}
		
}

export function onLoadHasAuth(){
	 let _url = window.location.href;
	// if(_url.indexOf('hasLoaded')>-1){
	// 	return;
	// }
	
	// _url = _url.indexOf("?")> -1 ?(_url+"&hasLoaded=ON"):(_url+"?hasLoaded=ON")
	
	let _hasLoadedObj = uni.getStorageSync("_hasLoadedObj");
	
	let nowDate = new Date();
	if (_hasLoadedObj && _hasLoadedObj.expireTime > nowDate.getTime()) {
		return ;
	}
	uni.setStorageSync("_hasLoadedObj",{
		expireTime:addMinutes(new Date(),15).getTime()
	});
	doPageCheckSession(_url,_url,function(){});
}

/**
 * H5 自登陆处理
 * @param {Object} _key 自登陆key
 * add by  wuxw QQ 928255095
 */
export function doLoginOwnerByKey(_key, callback = () => {}) {
	requestNoAuth({
		url: url.loginOwnerByKey,
		method: 'post',
		data: {
			key: _key // 当前页地址
		},
		success: function(res) {
			let _param = res.data;
			if (_param.code != 0) {
				uni.navigateTo({
					url: '/pages/showlogin/showlogin?wAppId=' + getWAppId()
				});
				return;
			}
			let _ownerInfo = _param.owner;
			saveOwnerStorage(_ownerInfo);
			saveUserLoginInfo(_ownerInfo.userId, _param.token, _param.key)
			callback();
		},
		fail: function(error) {
			// 调用服务端登录接口失败
			uni.navigateTo({
				url: '/pages/showlogin/showlogin?wAppId=' + getWAppId()
			});
		}
	});
}

export function getPageWAppId(options) {
	let wAppId = options.wAppId;
	if (!isNull(wAppId)) {
		saveWAppId(wAppId)
		return wAppId;
	}
	 wAppId = getWAppId();
	if (isNull(wAppId)) {
		uni.showToast({
			icon: 'none',
			title: 'url中未包含wAppId参数'
		});
		return ''
	}
	saveWAppId(wAppId)
	return wAppId;
}

/**
 * 页面 session
 * @param {Object} _call 回调函数
 */
export function doPageCheckSession(errorUrl,_pageUrl,_call) {
	let loginFlag = getLoginFlag();
	let nowDate = new Date();
	if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
		_call();
		return;
	}
	if(_pageUrl){
		wechatRefreshToken(errorUrl, 0, location.origin+'/#'+_pageUrl);
	}else{
		wechatRefreshToken(errorUrl, 0, '');
	}
}
/**
 * 页面 session
 * @param {Object} _call 回调函数
 */
export function pageCheckSession(_pageUrl,_call) {
	doPageCheckSession('',_pageUrl,_call)
}

export function wechatRefreshToken(errorUrl, _login, _redirectUrl) {
	let _errorUrl = errorUrl;
	if (errorUrl == null || errorUrl == undefined || errorUrl == '') {
		_errorUrl = '/#/pages/showlogin/showlogin?wAppId=' + getWAppId();
	}

	if (isNull(_redirectUrl)) {
		_redirectUrl = window.location.href;
	}

	if (isNull(_login)) {
		_login = 0; // 不是登录页面鉴权
	}
	requestNoAuth({
		url: url.wechatRefrashToken,
		method: 'get',
		data: {
			redirectUrl: _redirectUrl, // 当前页地址
			errorUrl: _errorUrl,
			loginFlag: _login
		},
		success: function(res) {
			let _param = res.data;
			if (_param.code == 0) {
				window.location.href = _param.data.openUrl;
				return;
			}
		},
		fail: function(error) {
			// 调用服务端登录接口失败
			if (error.statusCode == 401) {
				return;
			}
		}
	});
}

/**
 * 查询活动列表
 */
export function pageUserLogin(_obj) {
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.loginOwnerUrl,
				method: "POST",
				data: JSON.stringify(_obj),
				//动态数据
				success: function(res) {
					uni.hideLoading();
					console.log("登录返回信息", res);
					if (res.statusCode != 200) {
						uni.showToast({
							icon: 'none',
							title: res.data
						});
						reject();
						return;
					}
					let _data = res.data;
					let _ownerInfo = _data.owner;
					saveOwnerStorage(_ownerInfo);
					saveUserLoginInfo(_ownerInfo.userId, _data.token, _data.key)
					resolve();
				},
				fail: function(e) {
					uni.hideLoading();
					reject();
				}
			});
		})
}

/**
 * @param {Object} options 页面数据
 */
export function getPageLoginCode(options) {
	return new Promise((resolve, reject) => {
		let code = options.code;
		if (code == '' || code == undefined) {
			//跳转鉴权 //1标识登录页面 请下发code 不要下发key
			wechatRefreshToken(window.location.href, 1, window.location.href);
		}
		resolve(code);
	});
}


