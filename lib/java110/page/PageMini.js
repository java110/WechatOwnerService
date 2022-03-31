import {
	saveOwnerStorage,
	saveUserLoginInfo,
	getWAppId,
	saveWAppId,
	getLoginFlag,
	saveOpenId
} from '../utils/StorageUtil.js'

import {
	showInfo
} from '../utils/CoreUtil.js'

import url from '../../../constant/url.js'

import {
	requestNoAuth
} from '../java110Request.js'

export function pageOnLoad(options) {
	getPageWAppId();
	doPageCheckSession('',function(){},'1');
}

/**
 * 获取WAppId
 */
export function getPageWAppId() {
	let wAppId = null;

	let accountInfo = uni.getAccountInfoSync();
	wAppId = accountInfo.miniProgram.appId;

	saveWAppId(wAppId)
	return wAppId;
}

/**
 * 页面 session
 * @param {Object} _call 回调函数
 */
export function doPageCheckSession(_pageUrl,_call,_needLogin) {
	let loginFlag = getLoginFlag();
	let nowDate = new Date();
	if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
		// 检查 session_key 是否过期
		wx.checkSession({
			// session_key 有效(为过期)
			success: function() {
				_call();
			},
			// session_key 过期
			fail: function() {
				// session_key过期
				doLogin(_call,_needLogin);
			}
		});
	} else {
		// 无登录态
		doLogin(_call,_needLogin);
	}
}

/**
 * 页面 session
 * @param {Object} _call 回调函数
 */
export function pageCheckSession(_pageUrl,_call) {
	doPageCheckSession(_pageUrl,_call,'0')
}

/**
 * 登录
 */
export function doLogin(callback = () => {},_needLogin) {

	wx.login({
		success: function(loginRes) {
			if (loginRes.code) {
				// TODO
				//请求服务后端登录
				requsetHcServerToLogin(loginRes, callback,_needLogin);
			} else {
				// 获取 code 失败
				console.log('调用wx.login获取code失败');
			}
		},
		fail: function(error) {
			// 调用 wx.login 接口失败
			console.log('调用wx.login获取code失败');
			console.log(error);
		}
	});
}
/**
 * 尝试服务器登录
 * 如果登录不成功 跳转登录页面
 */
export function requsetHcServerToLogin(loginRes, callback = () => {},_needLogin) {
	let defaultRawData =
		'{"nickName":"","gender":1,"language":"","city":"","province":"","country":"","avatarUrl":""}'; // 请求服务端的登录接口
	console.log('返回信息', loginRes);
	let _appId = '';
	_appId = getWAppId();
	requestNoAuth({
		url: url.loginUrl,
		method: 'post',
		data: {
			code: loginRes.code,
			// 临时登录凭证
			userInfo: JSON.parse(defaultRawData),
			// 用户非敏感信息
			signature: '',
			// 签名
			encryptedData: '',
			// 用户敏感信息
			iv: '', // 解密算法的向量
			appId: _appId

		},
		success: function(res) {
			if (res.statusCode == '401' && _needLogin != '1') {
				let data = res.data;
				saveOpenId(data.openId);
				wx.reLaunch({
					url: '/pages/showlogin/showlogin?wAppId=' + _appId
				});
				return;
			}
			res = res.data;
			if (res.result == 0) {
				saveOwnerStorage(res.userInfo);
				saveUserLoginInfo(res.userInfo.userId, res.token)
				callback();
			} else {
				if( _needLogin != '1'){
					wx.reLaunch({
						url: '/pages/showlogin/showlogin?wAppId=' + _appId
					});
				}
				return;
			}
		},
		fail: function(error) {
			// 调用服务端登录接口失败
			if (error.statusCode == 401) {
				uni.reLaunch({
					url: '/pages/login/login?wAppId=' + _appId
				});
				return;
			}
			console.log(error);
		}
	});
}

/**
 * 查询活动列表
 */
export function pageUserLogin(_obj) {
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.loginOwnerUrl,
				method: "POST",
				data: JSON.stringify(_obj),
				//动态数据
				success: function(res) {
					uni.hideLoading();
					console.log("登录返回信息", res);
					if (res.statusCode != 200) {
						uni.showToast({
							icon: 'none',
							title: res.data
						});
						reject();
						return;
					}
					let _data = res.data;
					let _ownerInfo = _data.owner;
					saveOwnerStorage(_ownerInfo);
					saveUserLoginInfo(_ownerInfo.userId, _data.token, _data.key)
					resolve();
				},
				fail: function(e) {
					uni.hideLoading();
					reject();
				}
			});
		})
}

/**
 * @param {Object} options 页面数据
 */
export function getPageLoginCode(options) {
	return new Promise((resolve, reject) => {
		wx.login({
			success: function(loginRes) {
				if (loginRes.code) {
					resolve(loginRes.code);
				} else {
					// 获取 code 失败
					showInfo('微信登录失败');
				}
			},
			fail: function(error) {
				// 调用 wx.login 接口失败
				showInfo('微信登录失败');
			}
		});

	});
}
