import {
	request,
	requestNoAuth
} from '../../lib/java110/java110Request.js';
import url from '../../constant/url.js';

/**
 * 查询拼团产品
 */
export function loadAdverts(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.listAdvertPhoto,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _products = res.data;
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
 * 查询社区商家
 */
export function loadCommunityShops(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.queryShopCommunity,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _shops = res.data.data;
						resolve(_shops);
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
 * 查询社区商家
 */
export function getShops(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.queryShop,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _shops = res.data.data;
						resolve(_shops);
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
 * 查询便民菜单
 */
export function getConMenus(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.queryConMenus,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _shops = res.data.data;
						resolve(_shops);
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
 * 查询商家信息
 */
export function getStoreInfo(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.queryStoreInfo,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _shops = res.data.data;
						resolve(_shops);
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
 * 查询商家信息
 */
export function getStoreBySeq(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.queryStoreBySeq,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _shops = res.data.data;
						resolve(_shops);
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
 * 查询商铺ID
 */
export function getShopId(){
	let shopId = uni.getStorageSync(mapping.MALL_SHOP_ID);
	return shopId;
}


export function queryShopType(_dataObj) {
	return new Promise(
	    (resolve, reject) => {
	        requestNoAuth({
	            url: url.queryShopType,
	            method: "GET",
	            data: _dataObj,
	            //动态数据
	            success: function (res) {
	                if (res.statusCode == 200) {
	                    let _data = res.data
	                    resolve(_data)
	                    return
	                }
	                reject()
	            },
	            fail: function (e) {
	                reject()
	            }
	        })
	    })
}

export function getMallIndexCategoryList(_dataObj) {
	return new Promise(
	    (resolve, reject) => {
	        requestNoAuth({
	            url: url.queryHousekeepingType,
	            method: "GET",
	            data: _dataObj,
	            //动态数据
	            success: function (res) {
	                if (res.statusCode == 200) {
	                    let _data = res.data
	                    resolve(_data)
	                    return
	                }
	                reject()
	            },
	            fail: function (e) {
	                reject()
	            }
	        })
	    })
}
