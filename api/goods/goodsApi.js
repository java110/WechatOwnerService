import {
	requestNoAuth,
	request
} from '../java110Request.js';
import url from '../../constant/url.js';


// #ifdef APP-PLUS
import {
	getPayInfo
} from '../../factory/WexinAppPayFactory.js'
// #endif

// #ifdef H5
	
	const WexinPayFactory = require('../../factory/WexinPayFactory.js');
	
// #endif

/**
 * 查询活动列表
 */
export function getRecommendProduct(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.queryProductLabel,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _products = res.data.data;
						resolve(_products);
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
 * 查询拼团产品
 */
export function getGroupBuyProduct(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.queryGroupBuyProduct,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _products = res.data.data;
						resolve(_products);
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
 * 查询产品
 */
export function getProduct(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.queryProduct,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _products = res.data.data;
						resolve(_products);
						return;
					}
					reject();
				},
				fail: function(e) {
					reject();
				}
			});
		})
};

/**
 *  下单
 */
export function saveStoreCart(dataObj) {
	return new Promise(
		(resolve, reject) => {
			request({
				url: url.saveStoreCart,
				method: "POST",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {

						resolve(res.data);
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
 *  下单
 */
export function getStoreCart(dataObj) {
	return new Promise(
		(resolve, reject) => {
			request({
				url: url.queryStoreCart,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {

						resolve(res.data);
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
 * 商品统一下单 
 * @param {Object} dataObj 下单报文
 */
export function goodsUnifieldOrder(dataObj) {
	
	return new Promise(
		(resolve, reject) => {
			request({
				url: url.goodsUnifieldOrder,
				method: "POST",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						resolve(res.data);
						return;
					}
					reject(res);
				},
				fail: function(e) {
					reject();
				}
			});
		})
}

/**
 * 发起微信支付
 * add by 吴学文 2020-11-12
 * @param {Object} data 微信支付参数
 */
export function toPay(data) {
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
				resolve(res);
			},
			'fail': function(err) {
				reject(err)
			}
		});
		// #endif
		// #ifdef H5
			WexinPayFactory.wexinPay(data,function(){
				uni.showToast({
					title: "支付成功",
					duration: 2000
				});
				resolve(res);
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
				console.log("购买",res)
				resolve(res);
			},
			fail: function(err) {
				console.log("购买失败",err)
				reject(err);
			}
		});
		// #endif
	})
}
