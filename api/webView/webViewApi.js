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

import WexinPayFactory from '../../factory/WexinPayFactory.js'


const ACTION_NAVIGATE_TO = "navigateTo"; // 跳转
const ACTION_REFRESH_TOKEN = "refreshToken";
const ACTION_NAVIGATE_TO_PAGE = "navigateToPage";
const ACTION_PAY_ORDER = "payOrder";



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
/**
 * 检查回话
 */
export function checkSession(that, url) {
	checkSession().then(function() {
		let _url = conf.mallUrl + url;
		if (_url.indexOf("?") > -1) {
			_url += "&"
		} else {
			_url += "?"
		}
		//申请会话
		getHcCode().then(_data => {
			_url += ("hcCode=" + _data.hcCode);
			uni.navigateTo({
				url: '/pages/hcWebViewRefresh/hcWebViewRefresh?url=' + _url
			});
		}, err => {

		});
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

export function getCurrentPage(){
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let curRoute = routes[routes.length - 1].route //获取当前页面路由
	return '/'+curRoute;
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
					url:getCurrentPage()+'?url='+_url
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
				url:getCurrentPage()+'?url='+_url
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
					url:getCurrentPage()+'?url='+_url
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

/**
 * @param {Object} event事件
 */
export function reciveMessage(event, that) {
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
		checkSession(that, _data.url);
	} else if (_data.action == ACTION_NAVIGATE_TO_PAGE) {
		window.location.href = _data.url;
	} else if (_data.action == ACTION_PAY_ORDER) {
		toPay(_data.data, _data.url);
	}

}
