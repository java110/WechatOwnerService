/**
 * 发送验证码
 */


import {
	request,
	requestNoAuth
} from '../java110Request.js'
import
url
from '../../constant/url.js'

import
mapping
from '../../constant/MappingConstant.js'

function timer(_that) {
	let promise = new Promise((resolve, reject) => {
		let setTimer = setInterval(
			() => {
				let second = this.second - 1;
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

export function sendMessageCode(_objData,_that) {

	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.userSendSms,
			method: "POST",
			data: _objData, //动态数据
			success: function(res) {
				//成功情况下跳转
				if (res.statusCode == 200) {
					uni.showToast({
						title: '验证码下发成功',
						icon: 'none',
						duration: 2000
					});
					timer(_that);
					resolve();
					return;
				}
				uni.hideLoading();
				uni.showToast({
					title: res.data,
					icon: 'none',
					duration: 2000
				});
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
	})

}
