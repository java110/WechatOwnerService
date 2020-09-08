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

import {
	getCurOwner
} from '../owner/ownerApi.js'

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
								return;
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

/**
 * 查询房屋租聘配置
 */
export function queryRentingConfig() {
	return new Promise((resolve, reject) => {
		request({
			url: url.queryRentingConfig,
			method: "GET",
			data: {
				page: 1,
				row: 10
			},
			success: function(res) {

				let data = res.data;
				if (data.code == 0) {
					resolve(data.data);
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

/**
 * 房屋租赁
 * @param {Object} obj 房屋租赁数据
 */
export function hireRoom(obj) {
	return new Promise((resolve, reject) => {
		let msg = "";
		if (obj.rentingName == "") {
			msg = "请选择报修类型";
		} else if (obj.bindRepairName == "") {
			msg = "请填写报修人";
		} else if (obj.tel == "") {
			msg = "请填写手机号";
		} else if (obj.bindDate == "") {
			msg = "请选择预约日期";
		} else if (obj.bindTime == "") {
			msg = "请选择预约时间";
		} else if (obj.context == "") {
			msg = "请填写投诉内容";
		} else if (obj.repairObjId == '') {
			msg = "请选择报修位置";
		}

		if (msg != "") {
			reject(msg);
		} else {
			request({
				url: url.saveOwnerRepair, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
				method: "POST",
				data: obj, //动态数据
				success: function(res) {
					let _json = res.data;
					if (_json.code == 0) {
						resolve(_json);
						return;
					}
					reject('服务异常');
				},
				fail: function(e) {
					reject('服务异常');
				}
			});
		}
	})
}
