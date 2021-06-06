/**
 * 物业信息处理 api 接口类
 * 
 * add by 吴学文 QQ 928255095
 */


import {
	request
} from '../java110Request.js'
import
url
from '../../constant/url.js'

import
mapping
from '../../constant/MappingConstant.js'

import {
	getCurCommunity
} from '../community/communityApi.js'

/**
 * 查询物业信息
 * @param {Object} _communityInfo 小区信息
 */
function doGetProperty(_communityInfo) {

	return new Promise((resolve, reject) => {
		let _objData = {
			page: 1,
			row: 5,
			communityId: _communityInfo.communityId,
			memberTypeCd: '390001200002'
		};
		request({
			url: url.listStore,
			method: "GET",
			data: _objData,
			//动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					resolve(res.data.stores[0]);
					return;
				}
				reject(res.body);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

/**
 * 查询物业信息
 */
export function getProperty() {
	return new Promise((resolve, reject) => {
		//查询当前小区
		getCurCommunity()
			.then(function(_communityInfo) {
				//查询当前物业
				doGetProperty(_communityInfo)
					.then(function(_propertyInfo) {
						resolve(_propertyInfo);
					})
					.then(function(res) {
						reject(res);
					})
			})
	})
};
