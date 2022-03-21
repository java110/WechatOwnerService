import {
	saveOwnerStorage,
	saveUserLoginInfo,
	getWAppId,
	saveWAppId
} from '../utils/StorageUtil.js'

import url from '../../../constant/url.js'
export function pageOnLoad(options) {

	getPageWAppId()
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

export function pageCheckSession(_pageUrl,_call) {
	let _that = this;
	let loginFlag = wx.getStorageSync(mapping.LOGIN_FLAG);
	let nowDate = new Date();

	if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
		call();
		return;
	}

	//查询临时钥匙
	let _key = wx.getStorageSync(mapping.OWNER_KEY);
	if (_key) {
		doLoginOwnerByKey(_key, _call);
	} else {
		uni.navigateTo({
			url: '/pages/showlogin/showlogin?wAppId=' + getWAppId()
		});
		return;
	}
}

/**
 * app 自登陆处理
 * @param {Object} _key 自登陆key
 * add by  wuxw QQ 928255095
 */
export function doLoginOwnerByKey(_key, callback = () => {}) {
	requestNoAuth({
		url: url.loginOwnerByKey,
		method: 'post',
		data: {
			key: _key // 当前页地址
		},
		success: function(res) {
			let _param = res.data;
			if (_param.code != 0) {
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
