// #ifdef H5
import {
	pageOnLoad,
	pageCheckSession,
	pageUserLogin,
	getPageLoginCode
} from './PageH5.js'
// #endif

// #ifdef APP-PLUS
import {
	pageOnLoad,
	pageCheckSession,
	pageUserLogin,
	getPageLoginCode
} from './PageApp.js'
// #endif

// #ifdef MP-WEIXIN
import {
	pageOnLoad,
	pageCheckSession,
	pageUserLogin,
	getPageLoginCode
} from './PageMini.js'
// #endif

import {
	getLoginFlag
} from '../utils/StorageUtil.js'

import url from '../../../constant/url.js'

/**
 * 页面属性
 * @param {Object} options 页面参数
 */
export function onLoad(options) {
	pageOnLoad(options);
	let pages = getCurrentPages() // 获取栈实例
	let currentRoute = pages[pages.length - 1].route;
	//白名单直接跳过检查登录
	if (!url.NEED_NOT_LOGIN_PAGE.includes(currentRoute)) {
		console.log('NEED_NOT_LOGIN_PAGE')
		checkSession(null,function() {
		})
	}
}

/**
 * 检查会话是否 存在
 * add by 吴学文 QQ:928255095
 */
export function checkSession(_pageUrl,_call) {
	pageCheckSession(_pageUrl,_call)
}
/**
 * 是否登录 不跳转 只是判断是否登录
 * 
 * add by 吴学文 QQ:928255095
 */
export function hasLogin() {
	//判断当前登录状态，不调跳转登录界面
	let loginFlag = getLoginFlag();
	let nowDate = new Date();
	if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
		return true;
	}
	return false;
}

/**
 * 查询活动列表
 */
export function userLogin(_obj) {
	return pageUserLogin(_obj);
}

/**
 * 登录页面 查询code 
 * @param {Object} options 页面数据
 */
export function getLoginCode(options){
	return getPageLoginCode(options)
}
