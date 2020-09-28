import {
	requsetHcServerToLogin
} from './LoginHcServer.js'


export function doLogin(callback = () => {}) {
	let that = this;
	wx.login({
		success: function(loginRes) {
			if (loginRes.code) {
				// TODO
				//请求服务后端登录
				requsetHcServerToLogin(loginRes, callback);
			} else {
				// 获取 code 失败
				//that.coreUtil.showInfo('登录失败');
				console.log('调用wx.login获取code失败');
			}
		},
		fail: function(error) {
			// 调用 wx.login 接口失败
			//that.coreUtil.showInfo('接口调用失败' + error);
			console.log(error);
		}
	});
}
