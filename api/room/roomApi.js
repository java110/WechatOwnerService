/**
 * 房屋信息处理 api 接口类
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

import {getCurOwner} from '../owner/ownerApi.js'

/**
 * 查询业主房屋
 */
export function getRooms() {
	return new Promise((resolve, reject) => {
		getCurOwner()
		.then(function(_owner) {
			request({
				url: url.queryRoomsByOwner,
				method: "GET",
				data: {
					communityId: _owner.communityId,
					ownerId: _owner.memberId
				},
				success: function(res) {
					if (res.statusCode == 200) {
						//将业主信息和房屋信息一起返回
						res.data['owner'] = _owner;
						if (res.data.rooms.length == 0) {
							reject("业主没有房屋信息");
							return ;
						}
						resolve(res.data);
					} else {
						reject("查询房屋失败");
					}
				},
				fail: function(res) {
					reject(res);
				}
			});
		});
	});
};