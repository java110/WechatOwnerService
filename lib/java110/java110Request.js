import coreUtil from './utils/CoreUtil.js'

import app from '../../constant/AppConstant.js'

import {getDateYYYYMMDDHHMISS} from './utils/DateUtil.js'

import url from '../../constant/url.js'

import mapping from '../../constant/MappingConstant.js'

import {checkSession} from './page/Page.js'

import {getToken} from './utils/StorageUtil.js';

import {hasLogin} from '../../api/user/sessionApi.js';


import {debug,warn,info,error} from './utils/LogUtil.js';
import md5 from './utils/md5Util.js'
/**
 * 获取请求头信息
 * add by 吴学文 QQ：928255095
 **/
export function getHeaders() {
	let _wAppId = uni.getStorageSync(mapping.W_APP_ID);
	let _token = getToken();
	if(!_token){
		_token = "no login";
	}
	return {
		"app-id": app.appId,
		"transaction-id": coreUtil.wxuuid(),
		"req-time": getDateYYYYMMDDHHMISS(),
		"sign": '1234567',
		"user-id": '-1',
		//"cookie": '_java110_token_=' + getToken(),
		"Accept": '*/*',
		"w-app-id": _wAppId,
		"Authorization":"Bearer "+_token
	};
}

export function createSign(_reqObj){
	
	let _header = _reqObj.header;
	let _transactionId = _header["transaction-id"];
	let _reqTime = _header["req-time"];
	let _appId = _header["app-id"];
	let reqInfo = _transactionId+_reqTime+_appId;
	
	if(_reqObj.method == 'GET'){
		reqInfo += '?';
		for (let key in _reqObj.data) {
			if(_reqObj.data[key]){
				reqInfo += (key+'='+_reqObj.data[key]+'&');
			}else{
				reqInfo += (key+'='+'&');
			}
			
		}
		if(reqInfo.endsWith('&')){
			reqInfo = reqInfo.substr(0,reqInfo.length-1);
		}
	}else{
		reqInfo += JSON.stringify(_reqObj.data);
	}
	reqInfo += "whoisyoudad!!!"
	let _sign = md5(reqInfo);
	_reqObj.header.sign = _sign;
	
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
		//todo create sign
		createSign(_reqObj);
		uni.request(_reqObj);
		return;
	}
	
	if(!hasLogin()){
		//todo 这里延迟跳转，等待如果界面又自登陆的话 自登陆完成
		setTimeout(function(){
			uni.navigateTo({
				url:'/pages/login/showlogin'
			})
		},1500);
		return;
	}
	createSign(_reqObj);
	
	uni.request(_reqObj);
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
	createSign(_reqObj);
	
	uni.request(_reqObj);
}
