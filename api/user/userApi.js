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



export function getWechatMiniOpenId(_objData){
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.getWechatMiniOpenId,
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
/**
 * 刷新用户
 * @param {Object} _objData
 */
export function getOpenIdFromAliPay(_objData){
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.getOpenIdFromAliPay,
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
/**
 * 刷新用户
 * @param {Object} _objData
 */
export function queryDict(_objData){
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.queryDict,
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

/**
 * 查询活动列表
 */
export function generatorUserQrCode( _that) {
	let obj = {
		tel: '123'
	};
	return new Promise(
		(resolve, reject) => {
			request({
				url: url.generatorUserQrCode,
				method: "POST",
				data: obj,
				//动态数据
				success: function(res) {
					uni.hideLoading();
					resolve(res.data);
				},
				fail: function(e) {
					uni.hideLoading();
					reject();
				}
			});
		})
}

export function getCommunityWechatAppId(_objData){
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.getCommunityWechatAppId,
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

export function ownerLogin(_that, _data) {
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.ownerUserLogin,
				method: "POST",
				data: _data,
				//动态数据
				success: function(res) {
					uni.hideLoading();
					let _json = res.data;
					if (_json.code != 0) {
						reject(_json.msg);
						return;
					}
					//todo 保存业主信息
					uni.setStorageSync("userInfo",_json.data);
					uni.setStorageSync("currentCommunityInfo",{
						communityId:_json.data.communityId,
						communityName:_json.data.communityName,
					});
					uni.setStorageSync("ownerInfo",{
						memberId:_json.data.memberId,
						ownerName:_json.data.ownerName,
						ownerId:_json.data.ownerId,
						ownerTel:_json.data.ownerTel,
						communityId:_json.data.communityId,
						link:_json.data.ownerTel,
						ownerTypeCd:_json.data.ownerTypeCd
					})
					resolve(_json.data);
				},
				fail: function(e) {
					uni.hideLoading();
					reject(e);
				}
			});
		})
}

export function refreshAppUserBindingOwnerOpenId(_that, _data) {
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.refreshAppUserBindingOwnerOpenId,
				method: "POST",
				data: _data,
				//动态数据
				success: function(res) {
					uni.hideLoading();
					let _json = res.data;
					if (_json.code != 0) {
						reject(_json.msg);
						return;
					}
					resolve(_json);
				},
				fail: function(e) {
					uni.hideLoading();
					reject(e);
				}
			});
		})
}

export function getUserId(){
	let _userInfo = uni.getStorageSync("userInfo");
	if(!_userInfo){
		return null;
	}
	
	return _userInfo.userId;
}

export function getUserName(){
	let _userInfo = uni.getStorageSync("userInfo");
	if(!_userInfo){
		return null;
	}
	
	return _userInfo.userName;
}

export function getUserTel(){
	let _userInfo = uni.getStorageSync("userInfo");
	if(!_userInfo){
		return null;
	}
	
	return _userInfo.ownerTel;
}


