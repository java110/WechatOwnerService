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
