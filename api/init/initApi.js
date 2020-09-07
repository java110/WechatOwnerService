/**
 * 页面初始化数据封装
 * add by 吴学文 2020-09-07
 * QQ 92825595
 * 
 */

/**
 * 页面加载方法
 * @param {Object} _option 页面参数对象
 */
export function onLoad(_option){
	// #ifdef H5
	let _key = _option.key;
	if (_key != null && _key != undefined && _key != '') {
		//根据key 去做登录
		factory.login._doLoginOwnerByKey(_key);
	}
	let wAppId = _option.wAppId;
	if (wAppId != null && wAppId != undefined && wAppId != '') {
		uni.setStorageSync(constant.mapping.W_APP_ID, _option.wAppId);
	}else{
		wAppId = uni.getStorageInfoSync(constant.mapping.W_APP_ID)
		if(wAppId != null && wAppId != undefined && wAppId != ''){
			uni.setStorageSync(constant.mapping.W_APP_ID, constant.app.wAppId);
		}
	}
	// #endif
	
}
