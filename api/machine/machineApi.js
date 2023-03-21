/**
 * 车辆信息处理 api 接口类
 * 
 * add by 吴学文 QQ 928255095
 */


import {
	request,
	requestNoAuth
} from '../../lib/java110/java110Request.js'
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
			data: _objData,
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

export function getMachines(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.listEquipmentAccount,
			method: "GET",
			data: _objData,
			success: function(res) {
				let _data = res.data;
				resolve(_data);
			},
			fail: function(res) {
				reject(res);
			}
		});
	});
};

/**
 *  查询设备保养记录
 * @param {} _objData 
 */
export function getMachineMaintainances(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.listMaintainanceTaskDetail,
			method: "GET",
			data: _objData,
			success: function(res) {
				let _data = res.data;
				resolve(_data);
			},
			fail: function(res) {
				reject(res);
			}
		});
	});
};

/**
 *  查询设备保养记录
 * @param {} _objData 
 */
export function getMachineInspections(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.listInspectionTaskDetails,
			method: "GET",
			data: _objData,
			success: function(res) {
				let _data = res.data;
				resolve(_data);
			},
			fail: function(res) {
				reject(res);
			}
		});
	});
};

export function getChargeMachines(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.listChargeMachine,
			method: "GET",
			data: _objData,
			success: function(res) {
				let _data = res.data;
				resolve(_data);
			},
			fail: function(res) {
				reject(res);
			}
		});
	});
};
export function getChargeMachinePort(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.listChargeMachinePort,
			method: "GET",
			data: _objData,
			success: function(res) {
				let _data = res.data;
				resolve(_data);
			},
			fail: function(res) {
				reject(res);
			}
		});
	});
};

export function startCharge(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.startCharge,
			method: "POST",
			data: JSON.stringify(_objData), //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					resolve(res.data);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}

export function stopCharge(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.stopCharge,
			method: "POST",
			data: JSON.stringify(_objData), //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					resolve(res.data);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}


/**
 * 查询充电订单
 */
export function getChargeMachineOrder(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.listChargeMachineOrder,
			method: "GET",
			data: _objData,
			success: function(res) {
				if (res.data.code != 0) {
					reject(res.data.msg);
					return;
				}
				resolve(res.data.data);
			},
			fail: function(res) {
				reject(res);
			}
		});
	});
};

/**
 * 查询充电订单
 */
export function getMeterMachine(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.listMeterMachine,
			method: "GET",
			data: _objData,
			success: function(res) {
				if (res.data.code != 0) {
					reject(res.data.msg);
					return;
				}
				resolve(res.data.data);
			},
			fail: function(res) {
				reject(res);
			}
		});
	});
};

