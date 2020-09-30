/**
 * 页面初始化数据封装
 * add by 吴学文 2020-09-07
 * QQ 92825595
 * 
 */
import mapping from '../../constant/MappingConstant.js';

import app from '../../constant/AppConstant.js'

import {_doLoginOwnerByKey} from '../../auth/AppLogin.js'

/**
 * 页面加载方法
 * @param {Object} _option 页面参数对象
 */
export function onLoad(_option){
	// #ifdef H5
	let _key = _option.key;
	if (_key != null && _key != undefined && _key != '') {
		//根据key 去做登录
		_doLoginOwnerByKey(_key);
	}
	let wAppId = _option.wAppId;
	if (wAppId != null && wAppId != undefined && wAppId != '') {
		uni.setStorageSync(mapping.W_APP_ID, _option.wAppId);
	}else{
		wAppId = uni.getStorageInfoSync(mapping.W_APP_ID)
		if(wAppId != null && wAppId != undefined && wAppId != ''){
			uni.setStorageSync(mapping.W_APP_ID, app.wAppId);
		}
	}
	// #endif
	
}
