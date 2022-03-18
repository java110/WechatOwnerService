import {
	request
} from '../../lib/java110/java110Request.js'
import
url
from '../../constant/url.js'

import
mapping
from '../../constant/MappingConstant.js'

import {
	formatDate,
	dateTimeStringToDateString
} from '../../lib/java110/utils/DateUtil.js'
// #ifdef H5
import WexinPayFactory from '../../factory/WexinPayFactory.js'
import {
	wechatRefreshToken
} from '../../auth/H5Login.js'
// #endif

import {
	checkSession
} from '../../lib/java110/page/Page.js'

import conf from '../../conf/config.js'

import {isNull} from '../../lib/java110/utils/StringUtil.js'

import {
	encodeUrl
} from '../../lib/java110/utils/UrlUtil.js';

import {getStorageSync,setStorageSync} from '../../lib/java110/utils/StorageUtil.js'

import {uuid} from '../../lib/java110/utils/SeqUtil.js'

import {getWAppId} from '../../lib/java110/utils/StorageUtil.js'

const ACTION_NAVIGATE_TO = "navigateTo"; // 跳转
const ACTION_REFRESH_TOKEN = "refreshToken";
const ACTION_NAVIGATE_TO_PAGE = "navigateToPage";
const ACTION_PAY_ORDER = "payOrder";
const ACTION_SET_TITLE = "setTitle";
const ACTION_SET_COMMUNITY = "setCommunity";
const ACTION_NAVIGATE_HOME = "navigateHome";
const ACTION_NAVIGATE_BACK = "navigateBack";






/**
 * 申请HCCode
 * @param {Object} _objData
 * @param {Object} _tmpRoom
 */
export function getHcCode(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.generatorHcCode,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					let _hcCodeInfo = res.data.data;
					resolve(_hcCodeInfo);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}

export function getCurrentPage() {
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let curRoute = routes[routes.length - 1].route //获取当前页面路由
	return '/' + curRoute;
}

export function toPay(data, _url) {
	return new Promise((resolve, reject) => {
		let obj = {};
		let orderInfo = {};
		// #ifdef MP-WEIXIN
		uni.requestPayment({
			'timeStamp': data.timeStamp,
			'nonceStr': data.nonceStr,
			'package': data.package,
			'signType': data.signType,
			'paySign': data.sign,
			'success': function(res) {
				uni.showToast({
					title: "支付成功",
					duration: 2000
				});
				uni.redirectTo({
					url: getCurrentPage() + '?url=' + _url
				});
			},
			'fail': function(err) {
				uni.showToast({
					icon: 'none',
					title: err
				})
			}
		});
		// #endif
		// #ifdef H5
		WexinPayFactory.wexinPay(data, function() {
			uni.showToast({
				title: "支付成功",
				duration: 2000
			});
			uni.redirectTo({
				url: getCurrentPage() + '?url=' + _url
			});
		});
		// #endif
		// #ifdef APP-PLUS
		obj = getPayInfo(data);
		// 第二种写法，传对象字符串
		orderInfo = JSON.stringify(obj)
		uni.requestPayment({
			provider: 'wxpay',
			orderInfo: orderInfo, //微信、支付宝订单数据
			success: function(res) {
				console.log("购买", res)
				uni.showToast({
					title: "支付成功",
					duration: 2000
				});
				uni.redirectTo({
					url: getCurrentPage() + '?url=' + _url
				});
			},
			fail: function(err) {
				console.log("购买失败", err)
				uni.showToast({
					icon: 'none',
					title: err
				})
			}
		});
		// #endif
	})
}

export function switchPage(_url){
	
	if(_url == 'mall'){
		uni.switchTab({
			url:'/pages/mall/mall'
		})
	}else if(_url == 'homemaking'){
		uni.switchTab({
			url:'/pages/homemaking/homemaking'
		})
	}else{
		uni.switchTab({
			url:_url
		})
	}
	
}

/**
 * @param {Object} event事件
 */
export function reciveMessage(event, that) {
	console.log('商城回传的参数', event);
	let _data = event.data;
	if (_data.action == ACTION_NAVIGATE_HOME) {
		switchPage(_data.url);
		return ;
	}
	if(_data.hasOwnProperty("url") && !isNull(_data.url)){
		setStorageSync(mapping.HC_MALL_CUR_URL,_data.url);
	}
	console.log('_data', _data);
	if (_data.action == ACTION_NAVIGATE_TO) {
		uni.navigateTo({
			url: '/pages/hcWebView/hcWebView?java110Id='+uuid()
		});
		return;
	} else if (_data.action == ACTION_REFRESH_TOKEN) {
		//跳转登录
		uni.navigateTo({
			url:'/pages/showlogin/showlogin?wAppId='+getWAppId()
		})
	} else if (_data.action == ACTION_NAVIGATE_TO_PAGE) {
		//_data.url = encodeUrl(_data.url);
		window.location.href = _data.url;
	} else if (_data.action == ACTION_PAY_ORDER) {
		//_data.url = encodeUrl(_data.url);
		toPay(_data.data, _data.url);
	}else if (_data.action == ACTION_SET_TITLE) {
		//_data.url = encodeUrl(_data.url);
		uni.setNavigationBarTitle({
		　　title:_data.title
		})
	}
	else if (_data.action == ACTION_NAVIGATE_BACK) {
		//_data.url = encodeUrl(_data.url);
		setStorageSync('_go_back_refresh',1);
		uni.navigateBack({
			delta:1
		})
	}else if(_data.action == ACTION_SET_COMMUNITY){
		setStorageSync(mapping.CURRENT_MALL_COMMUNITY_INFO,_data.data);
	}
	
	
}
