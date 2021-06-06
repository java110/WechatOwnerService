/**
 * 页面初始化数据封装
 * add by 吴学文 2020-09-07
 * QQ 92825595
 * 
 */
import mapping from '../../constant/MappingConstant.js';

import app from '../../constant/AppConstant.js'

import {doLoginOwnerByKey} from '../../auth/AppLogin.js';

import {isNull,isNotNull} from '../../utils/StringUtil.js';

import conf from '../../conf/config.js'

/**
 * 获取WAppId
 */
export function getWAppId(){
	let wAppId = null;
	// #ifdef H5
		//1.0 获取当前页面
		let routes = getCurrentPages();
		//在微信小程序或是app中，通过curPage.options；如果是H5，则需要curPage.$route.query（H5中的curPage.options为undefined，所以刚好就不需要条件编译了）
		let curParam = routes[routes.length - 1].options;
		//2.0 从当前页面参数中获取
		wAppId = curParam.wAppId;
	 // #endif
	
	//3.0 微信小程序直接调用小程序获取
	// #ifdef MP-WEIXIN
		let accountInfo = uni.getAccountInfoSync();
		wAppId = accountInfo.miniProgram.appId;
	// #endif
	
	//4.0 如果app 则取默认值
	// #ifdef APP-PLUS
		wAppId = conf.wAppId;
	// #endif
	
	//4.0 判断磁盘是否存在
	if(isNull(wAppId)){
		wAppId = uni.getStorageSync(mapping.W_APP_ID)
	}
	if(isNull(wAppId)){
		uni.showToast({
			icon:'none',
			title:'未获取到微信信息，请从微信中重新打开'
		});
		return ''
	}
	//5.0 存储至磁盘中
	uni.setStorageSync(mapping.W_APP_ID,wAppId)
	return wAppId;
}

/**
 * 页面加载方法
 * @param {Object} _option 页面参数对象
 */
export function onLoad(_option, callback = () => {}){
	// #ifdef H5
	let _key = _option.key;
	if (isNotNull(_key)) {
		//根据key 去做登录
		doLoginOwnerByKey(_key, callback);
	}
	// #endif
	//初始化wAppId
	getWAppId();
}
