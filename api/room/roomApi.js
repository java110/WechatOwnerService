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
						ownerId: _owner.ownerId
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
 * "rentingName": this.rentingName,
	"roomId": this.roomId,
	"communityId": this.communityId,
	"price": this.price,
	"paymentType": this.paymentType,
	"rentingConfigId": this.rentingConfigId,
	"photos": [],
	"rentingDesc": this.rentingDesc,
	"ownerTel": this.userTel,
	"ownerName":this.userName,
	"state":"0"
 */
export function hireRoom(obj) {
	return new Promise((resolve, reject) => {
		let msg = "";
		if (obj.rentingName == "") {
			msg = "出租标题不能为空";
		} else if (obj.roomId == "") {
			msg = "请选择房屋";
		} else if (obj.communityId == "") {
			msg = "未找到小区信息";
		} else if (obj.price == "") {
			msg = "请填写租金(元)";
		} else if (obj.paymentType == "") {
			msg = "请选择付费类型";
		} else if (obj.rentingConfigId == "") {
			msg = "请选择出租方式";
		} else if (obj.rentingDesc == '') {
			msg = "请填写出租说明";
		} else if (obj.photos.length < 1) {
			msg = "请选择图片";
		} else if (obj.checkIn == '') {
			msg = "请选择入住日期";
		}

		if (msg != "") {
			reject(msg);
		} else {
			request({
				url: url.saveRentingPool,
				method: "POST",
				data: obj, //动态数据
				success: function(res) {
					let _json = res.data;
					if (_json.code == 0) {
						resolve(_json);
						return;
					}
					reject(_json.msg);
				},
				fail: function(e) {
					reject('服务异常');
				}
			});
		}
	})
}

/**
 * 查询房源信息
 * @param {Object} _data 查询 入参
 */
export function getRentingPool(_data) {
	return new Promise((resolve, reject) => {
		request({
			url: url.queryRentingPool,
			method: "GET",
			data: _data,
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
 * 租房预约
 * @param {Object} obj 租房预约数据
 * {"appointmentId":"","tenantName":"张默默","tenantSex":"0","tenantTel":"18909711234",
 * "appointmentTime":"2020-09-30 01:05:00","appointmentRoomId":"752020080500600202","remark":""}
 */
export function appointmentRoom(obj) {
	return new Promise((resolve, reject) => {
		let msg = "";
		if (obj.tenantName == "") {
			msg = "名称不能为空";
		} else if (obj.tenantSex == "") {
			msg = "性别不能空";
		} else if (obj.tenantTel == "") {
			msg = "手机号不能为空";
		} else if (obj.appointmentTime == "") {
			msg = "请填写预约时间";
		} else if (obj.appointmentRoomId == "") {
			msg = "预约房屋为空";
		}

		if (msg != "") {
			reject(msg);
		} else {
			request({
				url: url.saveRentingAppointment,
				method: "POST",
				data: obj, //动态数据
				success: function(res) {
					let _json = res.data;
					if (_json.code == 0) {
						resolve(_json);
						return;
					}
					reject(_json.msg);
				},
				fail: function(e) {
					reject('服务异常');
				}
			});
		}
	})
}
