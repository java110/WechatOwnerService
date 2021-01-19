/**
 * 登录相关 代码封装
 * 
 * add by wuxw 2019-12-28
 * 
 */

/**
 * 登录工厂类
 */

import {uuid} from '../utils/SeqUtil.js'
import {getDateYYYYMMDDHHMISS} from '../utils/DateUtil.js'

const constant = require("../constant/index.js");

const context = require("../context/Java110Context.js");

import {getWAppId} from '../api/init/initApi.js'

class LoginFactory {
	constructor() {

	} // 检查本地 storage 中是否有登录态标识

	getHeaders() {
		let _wAppId = getWAppId();
		
		return {
			"app-id": constant.app.appId,
			"transaction-id": uuid(),
			"req-time": getDateYYYYMMDDHHMISS(),
			"sign": '1234567',
			"user-id": '-1',
			"cookie": '_java110_token_=' + wx.getStorageSync('token'),
			"Accept": '*/*',
			"w-app-id":_wAppId
		};
	};

	//检查当前是否有回话
	checkSession() {
		return new Promise((resolve, reject) => {
			let _that = this;
			let loginFlag = wx.getStorageSync(constant.mapping.LOGIN_FLAG);
			let nowDate = new Date();
			//判断如果是APP
			// #ifdef APP-PLUS
			if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
				resolve();
			} else {
				// 无登录态
				reject();
				return;
			}
			// #endif
			//判断如果是H5
			// #ifdef H5
			if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
				resolve();
			} else {
				reject();
				return;
			}

			// #endif

			// #ifdef MP-WEIXIN
			if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
				// 检查 session_key 是否过期
				wx.checkSession({
					// session_key 有效(为过期)
					success: function() {
						
						resolve();
					},
					// session_key 过期
					fail: function() {
						// session_key过期
						reject();
					}
				});
			} else {
				// 无登录态
				reject();
			}
			// #endif
		});
	}

	checkLoginStatus(callback = () => {}) {
		let _that = this;

		let loginFlag = wx.getStorageSync(constant.mapping.LOGIN_FLAG);

		let nowDate = new Date();

		// #ifdef APP-PLUS
		//判断如果是APP
		if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {

			callback();
		} else {
			// 无登录态
			uni.reLaunch({
				url: '/pages/login/login?wAppId='+getWAppId()
			});
			return;
		}

		// #endif

		// #ifdef H5
		//判断如果是APP
		if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {

			callback();
		} else {
			_that.wechatRefreshToken();
			return;
		}

		// #endif

		// #ifdef MP-WEIXIN
		if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
			// 检查 session_key 是否过期
			wx.checkSession({
				// session_key 有效(为过期)
				success: function() {
					console.log('判断用户是否登录');
					callback();
				},
				// session_key 过期
				fail: function() {
					// session_key过期
					_that.doLogin();
				}
			});
		} else {
			// 无登录态
			_that.doLogin(callback);
		}
		// #endif
	} // 登录动作


	doLogin(callback = () => {}) {
		let that = this;
		wx.login({
			success: function(loginRes) {
				if (loginRes.code) {
					// TODO
					//请求服务后端登录
					that.requsetHcServerToLogin(loginRes, callback);
				} else {
					// 获取 code 失败
					console.log('调用wx.login获取code失败');
				}
			},
			fail: function(error) {
				// 调用 wx.login 接口失败

				console.log(error);
			}
		});
	}
	/**
	 * h5刷新 token
	 */
	wechatRefreshToken(errorUrl, _login) {
		let _errorUrl = errorUrl;
		if (errorUrl == null || errorUrl == undefined || errorUrl == '') {
			_errorUrl = '/#/pages/showlogin/showlogin';
		}
		
		if(_login == null || _login == undefined || _login == ''){
			_login = 0; // 不是登录页面鉴权
		}
		uni.request({
			url: constant.url.wechatRefrashToken,
			method: 'get',
			header: this.getHeaders(),
			data: {
				redirectUrl: window.location.href, // 当前页地址
				errorUrl: _errorUrl,
				loginFlag: _login
			},
			success: function(res) {
				let _param = res.data;
				if (_param.code == 0) {
					window.location.href = _param.data.openUrl;
					return;
				}
			},
			fail: function(error) {
				// 调用服务端登录接口失败
				if (error.statusCode == 401) {
					return;
				}
			}
		});
	}

	/**
	 * 请求 HC服务 登录
	 */
	requsetHcServerToLogin(loginRes, callback = () => {}) {
		let defaultRawData = '{"nickName":"","gender":1,"language":"","city":"","province":"","country":"","avatarUrl":""}'; // 请求服务端的登录接口
		console.log('返回信息', loginRes);
		let _appId = '';
		// #ifdef MP-WEIXIN
		let accountInfo = uni.getAccountInfoSync();
			_appId = accountInfo.miniProgram.appId;
		// #endif
		
		// #ifdef H5
			_appId = uni.getStorageSync(constant.mapping.W_APP_ID)
		// #endif
		wx.request({
			url: constant.url.loginUrl,
			method: 'post',
			header: this.getHeaders(),
			data: {
				code: loginRes.code,
				// 临时登录凭证
				userInfo: JSON.parse(defaultRawData),
				// 用户非敏感信息
				signature: '',
				// 签名
				encryptedData: '',
				// 用户敏感信息
				iv: '' ,// 解密算法的向量
				appId:_appId
	
			},
			success: function(res) {
	
				if (res.statusCode == '401') {
					let data = res.data;
					uni.setStorageSync(constant.mapping.CURRENT_OPEN_ID, data.openId);
					wx.reLaunch({
						url: '/pages/showlogin/showlogin'
					});
					return;
				}
	
				res = res.data;
	
				if (res.result == 0) {
					//that.globalData.userInfo = res.userInfo;
					console.log(res.userInfo);
					wx.setStorageSync(constant.mapping.USER_INFO, JSON.stringify(res.userInfo));
					let date = new Date();
					let year = date.getFullYear(); //获取当前年份
	
					let mon = date.getMonth(); //获取当前月份
	
					let da = date.getDate(); //获取当前日
	
					let h = date.getHours() + 1; //获取小时
	
					let m = date.getMinutes(); //获取分钟
	
					let s = date.getSeconds(); //获取秒
	
					console.log("获取过去时间", year, mon, da, h, m, s); //将时间格式转化为时间戳
	
					let afterOneHourDate = new Date(year, mon, da, h, m, s); //30s之后的时间
	
					console.log("afterOneHourDate", afterOneHourDate);
					wx.setStorageSync(constant.mapping.LOGIN_FLAG, {
						sessionKey: res.sessionKey,
						expireTime: afterOneHourDate.getTime()
					});
					wx.setStorageSync(constant.mapping.TOKEN, res.token);
					callback();
				} else {
				}
			},
			fail: function(error) {
				// 调用服务端登录接口失败
				if (error.statusCode == 401) {
					uni.reLaunch({
						url: '/pages/login/login'
					});
					return;
				}
	
				console.log(error);
			}
		});
	} // 获取用户登录标示 供全局调用


	getLoginFlag() {
		return wx.getStorageSync(constant.mapping.LOGIN_FLAG);
	}

	_doLoginOwnerByKey(_key) {
		uni.request({
			url: constant.url.loginOwnerByKey,
			method: 'post',
			header: this.getHeaders(),
			data: {
				key: _key // 当前页地址
			},
			success: function(res) {
				let _param = res.data;
				if (_param.code != 0) {
					uni.navigateTo({
						url: '/pages/showlogin/showlogin?wAppId='+getWAppId()
					});
					return;
				}

				let _ownerInfo = _param.owner;
				wx.setStorageSync(constant.mapping.OWNER_INFO, _ownerInfo);
				wx.setStorageSync(constant.mapping.USER_INFO, JSON.stringify(_ownerInfo));
				let _currentCommunityInfo = {
					communityId: _ownerInfo.communityId,
					communityName: _ownerInfo.communityName
				};
				wx.setStorageSync(constant.mapping.CURRENT_COMMUNITY_INFO, _currentCommunityInfo);

				let date = new Date();
				let year = date.getFullYear(); //获取当前年份
				let mon = date.getMonth(); //获取当前月份
				let da = date.getDate(); //获取当前日
				let h = date.getHours() + 1; //获取小时
				let m = date.getMinutes(); //获取分钟
				let s = date.getSeconds(); //获取秒
				let afterOneHourDate = new Date(year, mon, da, h, m, s); //30s之后的时间
				wx.setStorageSync(constant.mapping.LOGIN_FLAG, {
					sessionKey: _ownerInfo.userId,
					expireTime: afterOneHourDate.getTime()
				});
				wx.setStorageSync(constant.mapping.TOKEN, _param.token);
				//保存临时 钥匙
				wx.setStorageSync(constant.mapping.OWNER_KEY, _param.key);
			},
			fail: function(error) {
				// 调用服务端登录接口失败
				uni.navigateTo({
					url: '/pages/showlogin/showlogin?wAppId='+getWAppId()
				});
			}
		});
	}
}

;
module.exports = new LoginFactory();
