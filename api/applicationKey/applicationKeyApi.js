/**
 * 钥匙申请接口类
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
 * 查询钥匙
 * @param {Object} _objData 对象
 */
export function listApplicationKeys(_objData){
	
	return new Promise((resolve, reject) => {
		request({
			url: url.listApplicationKeys,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					let _applicationKeys = res.data.applicationKeys;
					
					_that.applicationKeys = _applicationKeys;
					resolve(_applicationKeys);
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
 * 申请钥匙
 * @param {Object} _obj 申请钥匙对象内容
 */
export function applyApplicationKey(_obj){
	return new Promise((resolve, reject) => {
		request({
			url: url.applyApplicationKey,
			method: "POST",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					resolve(res);
					return;
				}
				reject(res);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}


export function listOwnerMachines(_objData){
	return new Promise((resolve, reject) => {
		request({
			url: url.listOwnerMachines,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					let _machines = res.data.machines;
					resolve(_machines);
					return;
				}
				reject(res);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}


/**
 * 远程开门
 * @param {Object} _obj 申请钥匙对象内容
 */
export function openDoor(_obj){
	return new Promise((resolve, reject) => {
		request({
			url: url.openDoor,
			method: "POST",
			data: _obj, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					resolve(res);
					return;
				}
				reject(res);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

/**
 * 远程开门
 * @param {Object} _obj 申请钥匙对象内容
 */
export function getQrCode(_obj){
	return new Promise((resolve, reject) => {
		request({
			url: url.getQrCode,
			method: "POST",
			data: _obj, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					resolve(res);
					return;
				}
				reject(res);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}
