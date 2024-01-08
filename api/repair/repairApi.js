import {
	request
} from '../../lib/java110/java110Request.js'
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
					return;
				}
				reject(_data.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

export function listRepairSettings(_data) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		request({
			url: url.listRepairSettings,
			method: "GET",
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				resolve(_data);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

export function listRepairStaffs(_data) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		request({
			url: url.listRepairStaffs,
			method: "GET",
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				resolve(_data);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}
