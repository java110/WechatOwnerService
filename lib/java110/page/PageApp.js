import {
	requestNoAuth
} from '../java110Request.js'
import {
	saveOwnerStorage,
	saveUserLoginInfo,
	getWAppId,
	saveWAppId,
	getLoginFlag,
	getOwnerKey
} from '../utils/StorageUtil.js'

import conf from '../../../config.js'

import url from '../../../constant/url.js'
export function pageOnLoad(options) {
	getPageWAppId()
	doPageCheckSession('',function(){},'1');
}

/**
 * 获取WAppId
 */
export function getPageWAppId() {
	let wAppId = conf.wAppId;
	//5.0 存储至磁盘中
	saveWAppId(wAppId)
	return wAppId;
}

export function doPageCheckSession(_pageUrl,_call,_needLogin){
	let _that = this;
	let loginFlag = getLoginFlag();
	let nowDate = new Date();
	if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
		_call();
		return;
	}
	//查询临时钥匙
	let _key = getOwnerKey();;
	if (_key) {
		doLoginOwnerByKey(_key, _call,_needLogin);
	} else {
		return;
	}
}

export function pageCheckSession(_pageUrl,_call) {
	doPageCheckSession(_pageUrl,_call,'0')
}

/**
 * app 自登陆处理
 * @param {Object} _key 自登陆key
 * add by  wuxw QQ 928255095
 */
export function doLoginOwnerByKey(_key, callback = () => {},_needLogin) {
	requestNoAuth({
		url: url.loginOwnerByKey,
		method: 'post',
		data: {
			key: _key // 当前页地址
		},
		success: function(res) {
			let _param = res.data;
			if (_param.code != 0 && _needLogin != '1') {
				uni.navigateTo({
					url: '/pages/showlogin/showlogin?wAppId=' + getPageWAppId()
				});
				return;
			}
			let _ownerInfo = _param.owner;
			saveOwnerStorage(_ownerInfo);
			saveUserLoginInfo(_ownerInfo.userId, _param.token, _param, key)
			callback();
		},
		fail: function(error) {
			// 调用服务端登录接口失败
			uni.navigateTo({
				url: '/pages/showlogin/showlogin?wAppId=' + getPageWAppId()
			});
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
		resolve('');
	});
}
