import {
	request
} from '../java110Request.js'
import
url
from '../../constant/url.js'

import
mapping
from '../../constant/MappingConstant.js'

import {
	formatDate,
	dateTimeStringToDateString
} from '../../utils/DateUtil.js'


const ACTION_NAVIGATE_TO = "navigateTo"; // 跳转
const ACTION_REFRESH_TOKEN = "refreshToken";

/**
 * 检查回话
 */
export function checkSession(that,url){
	checkSession().then(function() {
		//申请会话
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
				url: '/pages/showlogin/showlogin?wAppId=' + getWAppId()
			});
			return;
		}
		// #endif
	});
}

/**
 * @param {Object} event事件
 */
export function reciveMessage(event,that) {
	console.log('商城回传的参数', event);

	let _data = event.data;
	console.log('_data', _data)
	if (_data.action == ACTION_NAVIGATE_TO) {
		uni.navigateTo({
			url: '/pages/hcWebView/hcWebView?url=' + _data.url
		});
		return;
	} else if (_data.action == ACTION_REFRESH_TOKEN) {
		//校验是否登录，如果没有登录跳转至温馨提示页面
		checkSession(that,_data.url);
	}

}
