import {
	requestNoAuth
} from '../java110Request.js';
import url from '../../constant/url.js';


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
}

