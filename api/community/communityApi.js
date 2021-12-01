import {
	requestNoAuth,request
} from '../java110Request.js'
import 
	url
 from '../../constant/url.js'


import {
	hasLogin
} from '../../auth/Java110Auth.js'

import mapping from '../../constant/MappingConstant.js'

import {getCurOwner} from '../owner/ownerApi.js'

import conf from '../../conf/config.js'


/**
 * @param {Object} dataObj
 * 				page: 1,
				row: 15,
				cityCode: this.areaCode,
				state: '1100',
				name: this.searchValue
 */
export function getCommunitys(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.listCommunitys,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _communtiys = res.data.communitys;

						_that.communitys = _communtiys;
					}
				},
				fail: function(e) {
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					});
				}
			});
		})
}


export function getMallCommunityId(){
	let _currentCommunity = uni.getStorageSync(mapping.CURRENT_MALL_COMMUNITY_INFO)
	if(_currentCommunity){
		return _currentCommunity.communityId;
	}
	return  getCommunityId();
}

export function getMallCommunityName(){
	let _currentCommunity = uni.getStorageSync(mapping.CURRENT_MALL_COMMUNITY_INFO)
	if(_currentCommunity){
		return _currentCommunity.name;
	}
	return getCommunityName();
}

export function getCommunityId(){

	let _currentCommunity = uni.getStorageSync("currentCommunityInfo")
	if(_currentCommunity){
		return _currentCommunity.communityId;
	}
	
	return conf.DEFAULT_COMMUNITY_ID;
	
}




export function getCommunityName(){
	let _currentCommunity = uni.getStorageSync("currentCommunityInfo")
	if(_currentCommunity){
		return _currentCommunity.communityName;
	}
	return conf.DEFAULT_COMMUNITY_NAME;
}

/**
 * 查询当前小区
 * 
 * 当还没有小区时返回 演示小区
 */
export function getCurCommunity() {
	return new Promise((resolve, reject) => {
		if (hasLogin()) { // 判断是否已经登录
			//已经登录 去后台查询
			getCurOwner()
				.then(function(_ownerInfo) {
					let _currentCommunityInfo = {
						communityId: _ownerInfo.communityId,
						communityName: _ownerInfo.communityName
					};
					resolve(_currentCommunityInfo);
				}).then(function() {
					let _currentCommunityInfo = {
						communityId: mapping.HC_TEST_COMMUNITY_ID,
						communityName: mapping.HC_TEST_COMMUNITY_NAME
					};
					resolve(_currentCommunityInfo);
				})
		} else {
			//没有登录直接写演示小区信息
			let _currentCommunityInfo = {
				communityId: mapping.HC_TEST_COMMUNITY_ID,
				communityName: mapping.HC_TEST_COMMUNITY_NAME
			};
			resolve(_currentCommunityInfo);
		}
	})
}

/**
 * 将小区信息 刷入 _obj对象
 * @param {Object} _obj 刷入 小区信息对象
 */
export function recoveryCommunityInfo(_obj){
	
	return new Promise((resolve,reject) => {
		getCurCommunity()
		.then((_communityInfo)=>{
			if(_obj.hasOwnProperty("communityId")){
				_obj.communityId = _communityInfo.communityId;
			}
			
			if(_obj.hasOwnProperty("communityName")){
				_obj.communityName = _communityInfo.communityName;
			}
			resolve(_communityInfo);
		})
	})
	
}

/**
 * 查询业主小区
 * @param {Object} dataObj 对象
 */
export function getOwnerCommunitys(dataObj) {
	return new Promise(
		(resolve, reject) => {
			request({
				url: url.ownerCommunity,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _communitys = res.data.data;
						resolve(_communitys);
					}
				},
				fail: function(e) {
					reject(e);
				}
			});
		})
		
}