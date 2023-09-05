import {
	request,
	requestNoAuth
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
} from '../../lib/java110/utils/DateUtil.js';


/**
 * 查询 二维码支付配置
 * @param {Object} _that
 * @param {Object} _data
 */
export function getPayFeeQrcode(_that, _data) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.getQrcodeConfig,
			method: "GET",
			data: _data, //动态数据
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

function timer(_that) {
	let promise = new Promise((resolve, reject) => {
		let setTimer = setInterval(
			() => {
				let second = _that.second - 1;
				_that.second = second;
				_that.btnValue = second + '秒';
				_that.btnDisabled = true;
				if (_that.second <= 0) {
					_that.second = 60;
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
 * @param {Object} _that
 * @param {Object} _data {
	 communityId:'',
	 roomNum:'',
	 link:'',
	 queryWay:''//room phone
 }
 */
export function sendMsgCode(_that, _data) {
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	requestNoAuth({
		url: url.ownerSendSms,
		method: "POST",
		data: _data, //动态数据
		success: function(res) {
			uni.showToast({
				title: res.data.msg,
				icon: 'none',
				duration: 3000
			});
			uni.hideLoading();
			//成功情况下跳转
			if (res.data.code == '0') {
				timer(_that);
				return;
			}
		},
		fail: function(e) {
			uni.hideLoading();
			uni.showToast({
				title: "服务器异常了",
				icon: 'none',
				duration: 2000
			})
		}
	});
}

/**
 * 查询 二维码支付配置
 * @param {Object} _that
 * @param {Object} _data
 */
export function getQrcodeOwner(_that, _data) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.getQrcodeOwner,
			method: "GET",
			data: _data, //动态数据
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
 * 二维码欠费
 * @param {Object} _that
 * @param {Object} _data 欠费数据
 */
export function getQrcodeOweFees(_that, _data) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.getQrcodeOweFees,
			method: "GET",
			data: _data, //动态数据
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