/**
 * 申请房信息处理 api 接口类
 * 
 * add by 吴学文 QQ 928255095
 */


import {
	request
} from '../../lib/java110/java110Request.js'
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
/**
 * 查询优惠申请房屋跟踪记录
 * @param {Object} _data 请求报文
 */
export function listApplyRoomDiscountRecord(_data){
	return new Promise((resolve, reject) => {
		request({
			url: url.listApplyRoomDiscountRecord,
			method: "GET",
			data: _data,
			success: function(res) {
				if(res.data.code == 0){
					resolve(res.data);
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
			},
			fail: function(res) {
				wx.showToast({
					title: "服务器异常了",
					icon: 'none',
					duration: 2000
				})
			}
		});
	})
}

/**
 * 查询优惠申请房屋跟踪记录详情
 * @param {Object} _data 请求报文
 */
export function listApplyRoomDiscountRecordDetail(_data){
	return new Promise((resolve, reject) => {
		request({
			url: url.listApplyRoomDiscountRecordDetail,
			method: "GET",
			data: _data,
			success: function(res) {
				if(res.data.code == 0){
					resolve(res.data.data);
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
			},
			fail: function(res) {
				wx.showToast({
					title: "服务器异常了",
					icon: 'none',
					duration: 2000
				})
			}
		});
	})
}

export function listRoomFee(_data) {
	return new Promise((resolve, reject) => {
		request({
			url: url.queryFeeByOwner,
			method: "GET",
			data: _data,
			success: function(res) {
				resolve(res.data);
			},
			fail: function(res) {
				reject(res);
			}
		});
	})
}
