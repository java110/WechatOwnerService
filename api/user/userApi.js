/**
 * 首页相关 数据封装API
 * add by 吴学文 2020-09-07
 * QQ 92825595
 * 
 */

import {
	request
} from '../../lib/java110/java110Request.js'
import {
	requestNoAuth
} from '../../lib/java110/java110Request.js';
import url from '../../constant/url.js';

import context from '../../lib/java110/Java110Context.js'
const constant = context.constant;


import {
	dateTimeStringToDateString
} from '../../lib/java110/utils/DateUtil.js'


export function timer(_that) {
	let second = 60;
	let promise = new Promise((resolve, reject) => {
		let setTimer = setInterval(
			() => {
				second = second - 1;
				_that.btnValue = second + '秒';
				_that.btnDisabled = true;
				if (second <= 0) {
					second = 60;
					_that.btnValue = '获取验证码';
					_that.btnDisabled = false;
					resolve(setTimer)
				}
			}, 1000)
	})
	promise.then((setTimer) => {
		clearInterval(setTimer)
	})
}
/**
 * 查询活动列表
 */
export function sendSmsCode(_link, _that) {
	let obj = {
		tel: _link
	};
	if (obj.tel == '') {
		wx.showToast({
			title: '请输入手机号',
			icon: 'none',
			duration: 2000
		});
		return;
	}
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.userSendSms,
				method: "POST",
				data: obj,
				//动态数据
				success: function(res) {
					uni.hideLoading();
					if (res.statusCode == 200) {
						wx.showToast({
							title: '验证码下发成功',
							icon: 'none',
							duration: 2000
						});
						wx.hideLoading();
						timer(_that);
						resolve();
						return;
					}
					wx.showToast({
						title: res.data,
						icon: 'none',
						duration: 2000
					});
					reject();
				},
				fail: function(e) {
					uni.hideLoading();
					reject();
				}
			});
		})
}

/**
 * 查询用户账户信息
 * @param {Object} _objData
 */
export function queryOwnerAccount(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.queryOwnerAccount,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					let _feeDiscounts = res.data.data;
					resolve(_feeDiscounts);
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
 * 查询用户账户信息明细
 * @param {Object} _objData
 */
export function queryOwnerAccountDetail(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.queryOwnerAccountDetail,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					resolve(res);
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
 * 刷新用户
 * @param {Object} _objData
 */
export function refreshUserOpenId(_objData){
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.refreshOpenId,
			method: "GET",
			data: _objData, //动态数据
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
