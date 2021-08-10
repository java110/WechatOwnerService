/**
 * 申请房信息处理 api 接口类
 * 
 * add by 吴学文 QQ 928255095
 */


import {
	request
} from '../java110Request.js'
import
url
from '../../constant/url.js'

/**
 * 查询优惠类型
 */
export function queryApplyRoomDiscountType(_data) {
	return new Promise((resolve, reject) => {
		request({
			url: url.queryApplyRoomDiscountType,
			method: "GET",
			data: _data,
			success: function(res) {

				let data = res.data;
				if (data.code == 0) {
					resolve(data.data);
				} else {
					reject(data.msg);
				}
			},
			fail: function(res) {
				reject(res);
			}
		});
	})
}

/**
 * 提交申请
 * @param {Object} _data 查询 入参
 */
export function saveApplyRoomDiscount(_data) {
	return new Promise((resolve, reject) => {
		request({
			url: url.saveApplyRoomDiscount,
			method: "POST",
			data: _data,
			success: function(res) {
				let data = res.data;
				if (data.code == 0) {
					resolve();
				} else {
					uni.showToast({
						title: data.msg
					})
				}
			},
			fail: function(res) {
				reject(res);
			}
		});
	})
}

/**
 * 查询优惠类型
 */
export function queryApplyRoomDiscount(_data) {
	return new Promise((resolve, reject) => {
		request({
			url: url.queryApplyRoomDiscount,
			method: "GET",
			data: _data,
			success: function(res) {

				let data = res.data;
				if (data.code == 0) {
					resolve(data);
				} else {
					uni.showToast({
						title: data.msg
					})
				}
			},
			fail: function(res) {
				reject(res);
			}
		});
	})
}
