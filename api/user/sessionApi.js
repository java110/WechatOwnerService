/**
 * 自登陆处理js
 * 
 */
import {
	request
} from '../../lib/java110/java110Request.js'
import {
	requestNoAuth
} from '../../lib/java110/java110Request.js';
import url from '../../constant/url.js';
import {
	refreshUserOpenId,
	getWechatMiniOpenId,
	getCommunityWechatAppId,
} from '../../api/user/userApi.js';

import {
	getCommunityId
} from '../../api/community/communityApi.js';

import {
		saveOwnerStorage,
		saveUserLoginInfo,
		removeUserLoginInfo,
		getWAppId,
		saveWAppId,
		getLoginFlag
	} from '@/lib/java110/utils/StorageUtil.js';

import {
		isWxOrAli
	} from '../../lib/java110/utils/EnvUtil.js';

const LOGIN_FLAG = 'loginFlag'; //登录标识

/**
 * 是否 登录
 */
export function hasLogin() {
	let loginFlag = wx.getStorageSync(LOGIN_FLAG);
	let nowDate = new Date();
	if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
		return true;
	} else {
		return false;
	}
};


/**
 * 自登陆
 * @param {Object} _objData
 */
export function autoLogin(options) {
	//todo 检查登录信息是否过期
	if (hasLogin()) {
		return;
	}
	//todo 如果是 h5 或者 微信小程序 ，检查是否做了配置，如果没有做配置不做自登陆
	// #ifdef H5 || MP-MP-WEIXIN
	autoLoginWechat(options);
	// #endif

}

/**
 * 主要完成 appId 查询
 * @param {Object} options
 */
export function autoLoginWechat(options) {
	let _openId = options.openId;
	if(_openId){ //h5 自登陆的情况
		loginByOpenId(_openId);
		return;
	}
	
	//todo 如果参数中带了wAppId
	let _wAppId = options.wAppId;
	
	if(_wAppId){
		_generatorOpenId(options, _wAppId);
		return;
	}
	
	let _objType = "1100"; // todo public
	// #ifdef MP-WEIXIN
	_objType = "1000";
	// #endif
	getCommunityWechatAppId({
		communityId: getCommunityId(),
		objType: _objType
	}).then(_data => {
		if (!_data.data || _data.data.indexOf('wx') < 0) {
			return;
		}
		_generatorOpenId(options, _data.data);
	})
}

export function _generatorOpenId(options, appId) {
	// #ifdef H5
	//todo h5 情况
	_refreshWechatOpenId(options, appId);
	return;
	// #endif

	// #ifdef MP-WEIXIN
	_refreshWechatMiniOpenId(options, appId);
	// #endif
}

export function _refreshWechatOpenId(options, appId) {
	//todo 不是微信环境 直接进入
	if (isWxOrAli() != 'WECHAT') {
		return;
	}
	let _redirectUrl = window.location.href;
	refreshUserOpenId({
		redirectUrl: _redirectUrl,
		wAppId: appId,
	}).then(_data => {
		if (_data.code == 0) {
			window.location.href = _data.data.openUrl;
			return;
		}
	});
}
export function _refreshWechatMiniOpenId() {
	let _that = this;
	wx.login({
		success: function(loginRes) {
			if (!loginRes.code) {
				return;
			}
			let accountInfo = uni.getAccountInfoSync();
			let appId = accountInfo.miniProgram.appId;
			getWechatMiniOpenId({
				code: loginRes.code,
				appId: appId,
			}).then(_data => {
				if (_data.code != 0) {
					uni.showToast({
						icon: 'none',
						title: _data.msg
					})
					return;
				}
				let openId = _data.data;
				loginByOpenId(openId);
			})
		},
		fail: function(error) {
			// 调用 wx.login 接口失败
			console.log('调用wx.login获取code失败');
			console.log(error);
		}
	});
}

export function loginByOpenId(openId){
	requestNoAuth({
		url: url.ownerUserLoginByOpenId,
		method: "POST",
		data: {
			openId:openId
		},
		//动态数据
		success: function(res) {
			let _json = res.data;
			if (_json.code != 0) {
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
				link:_json.data.ownerTel
			});
			saveUserLoginInfo(_json.data.userId, _json.data.token, _json.data.key);
		},
		fail: function(e) {
			uni.hideLoading();
			reject(e);
		}
	});
	
}
