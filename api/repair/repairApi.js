import {
	request
} from '../java110Request.js'
import
url
from '../../constant/url.js'

import
mapping
from '../../constant/MappingConstant.js'

/**
 * 报修评价
 * @param {Object} _data 评价内容
 */
export function appraiseRepair(_data) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		request({
			url: url.appraiseRepair,
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
