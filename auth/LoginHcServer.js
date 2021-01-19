import {
	requestNoAuth
} from '../api/java110Request.js'
import url from '../constant/url.js'
import mapping from '../constant/MappingConstant.js'
import {getWAppId} from '../api/init/initApi.js'
/**
 * 请求 HC服务 登录
 */
export function requsetHcServerToLogin(loginRes, callback = () => {}) {
	let defaultRawData = '{"nickName":"","gender":1,"language":"","city":"","province":"","country":"","avatarUrl":""}'; // 请求服务端的登录接口
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
			if (res.statusCode == '401') {
				let data = res.data;
				uni.setStorageSync(mapping.CURRENT_OPEN_ID, data.openId);
				wx.reLaunch({
					url: '/pages/showlogin/showlogin?wAppId=' + _appId
				});
				return;
			}

			res = res.data;

			if (res.result == 0) {
				//that.globalData.userInfo = res.userInfo;
				console.log(res.userInfo);
				wx.setStorageSync(mapping.USER_INFO, JSON.stringify(res.userInfo));
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
				wx.setStorageSync(mapping.LOGIN_FLAG, {
					sessionKey: res.sessionKey,
					expireTime: afterOneHourDate.getTime()
				});
				wx.setStorageSync(mapping.TOKEN, res.token);
				callback();
			} else {

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
} // 获取用户登录标示 供全局调用
