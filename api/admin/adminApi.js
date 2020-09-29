/**
 * 运营团队信息查询
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

/**
 * 查询 运营团队
 */
export function getAdmin(_objData){
	return new Promise((resolve, reject) => {
		request({
			url: url.listStore,
			method: "GET",
			data: _objData,
			success: function(res) {
				let data = res.data;
				if (data.total > 0) {
					resolve(data.stores[0]);
				} else {
					reject(data.msg);
				}
			},
			fail: function(res) {
				reject(res);
			}
		});
	})
	
}