

import url from '../constant/url.js'
import {requestNoAuth} from '../api/java110Request.js'
import {isNull} from '../utils/StringUtil.js'
import {getWAppId} from '../api/init/initApi.js'


/**
 * 
 * H5 刷新鉴权登录
 * @param {Object} errorUrl 登录失败时的跳转页面
 * @param {Object} _redirectUrl 登录成功时的跳转页面
 * @param {Object} _login  
 * 
 * add by 吴学文 QQ 928255095
 */
export function wechatRefreshToken(errorUrl, _login,_redirectUrl) {
		let _errorUrl = errorUrl;
		if (errorUrl == null || errorUrl == undefined || errorUrl == '') {
			_errorUrl = '/#/pages/showlogin/showlogin?wAppId='+getWAppId();
		}
		
		if(isNull(_redirectUrl)){
			_redirectUrl = window.location.href;
		}
		
		if(isNull(_login)){
			_login = 0; // 不是登录页面鉴权
		}
		requestNoAuth({
			url: url.wechatRefrashToken,
			method: 'get',
			data: {
				redirectUrl: _redirectUrl, // 当前页地址
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