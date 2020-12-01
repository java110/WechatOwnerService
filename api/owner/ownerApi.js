/**
 * 首页相关 数据封装API
 * add by 吴学文 2020-09-07
 * QQ 92825595
 * 
 */

import {
	request
} from '../java110Request.js'
import 
	url
 from '../../constant/url.js'

import mapping from '../../constant/MappingConstant.js'

/**
 * 查询当前业主信息
 */
export function getCurOwner() {
	return new Promise(
		(resolve, reject) => {
			let _ownerInfo = wx.getStorageSync(mapping.OWNER_INFO);
			if (_ownerInfo) {
				resolve(_ownerInfo);
			} else {
				request({
					url: url.queryAppUserBindingOwner,
					data: {},
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							_ownerInfo = _json.data[0];
							if (_ownerInfo == null || _ownerInfo == undefined) {
								//没有业主信息
								reject();
								return;
							}
							if (_ownerInfo.state == '12000') {
								wx.setStorageSync(mapping.OWNER_INFO, _ownerInfo);
								let _currentCommunityInfo = {
									communityId: _ownerInfo.communityId,
									communityName: _ownerInfo.communityName
								};
								wx.setStorageSync(mapping.CURRENT_COMMUNITY_INFO, _currentCommunityInfo);
							}
							resolve(_json.data[0]);
						}
					},
					fail: function(error) {
						// 查询失败
						reject();
					}
				});
			}
		});
}


export function getUserAddress(_data){
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		request({
			url: url.queryUserAddress,
			method: "GET",
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0) {
					resolve(_data);
					return ;
				}
				reject(_data.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

/**
 * add by wuxw
 * @param {Object} _data 保存 用户地址
 */
export function saveUpdateUserAddress(_data){
	
	return new Promise((resolve, reject) => {
		
		if(_data.userId == ''){
			reject("用户不能为空");
			return ;
		}else if(_data.areaCode == ''){
			reject("地区不能为空");
			return ;
		}else if(_data.tel == ''){
			reject("手机号不能为空");
			return ;
		}else if(_data.address == ''){
			reject("地址不能为空");
			return ;
		}else if(_data.isDefault == ''){
			reject("默认地址不能为空");
			return ;
		}
		let moreRooms = [];
		request({
			url: url.saveUserAddress,
			method: "POST",
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0) {
					resolve(_data);
					return ;
				}
				reject(_data.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

/**
 * add by wuxw
 * @param {Object} _data 保存 用户地址
 */
export function deleteUserAddress(_data){
	
	return new Promise((resolve, reject) => {
		
		if(_data.userId == ''){
			reject("用户不能为空");
			return ;
		}else if(_data.addressId == ''){
			reject("地址不能为空");
			return ;
		}
		request({
			url: url.deleteUserAddress,
			method: "POST",
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0) {
					resolve(_data);
					return ;
				}
				reject(_data.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

/**
 * add by wuxw
 * @param {Object} _data 删除家庭成员
 */
export function deleteOwnerMember(_data){
	
	return new Promise((resolve, reject) => {
		
		if(_data.memberId == ''){
			reject("成员ID不能为空");
			return ;
		}else if(_data.communityId == ''){
			reject("小区不能为空");
			return ;
		}
		request({
			url: url.deleteOwner,
			method: "POST",
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0) {
					resolve(_data);
					return ;
				}
				reject(_data.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}
