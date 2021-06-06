/**
 * 车辆信息处理 api 接口类
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

/**
 * 查询业主车辆
 */
export function getCars(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.queryOwnerCars,
			method: "GET",
			data:_objData,
			success: function(res) {
				if (res.statusCode == 200) {
					//将业主信息和房屋信息一起返回
					let _parkingSpaces = res.data.data;
					if (_parkingSpaces.length == 0) {
						reject("业主没有房屋信息");
						return;
					}
					resolve(_parkingSpaces);
				} else {
					reject("查询车辆失败");
				}
			},
			fail: function(res) {
				reject(res);
			}
		});
	});
};


