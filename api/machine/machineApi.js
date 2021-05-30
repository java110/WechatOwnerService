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
export function getMachineTranslates(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.listMachineTranslates,
			method: "GET",
			data:_objData,
			success: function(res) {
				if (res.statusCode == 200) {
					//将业主信息和房屋信息一起返回
					let _machineTranslates = res.data.machineTranslates;
					if (_machineTranslates.length == 0) {
						reject("没有记录");
						return;
					}
					resolve(_machineTranslates);
				} else {
					reject("查询失败");
				}
			},
			fail: function(res) {
				reject(res);
			}
		});
	});
};


