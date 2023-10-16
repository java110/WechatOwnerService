import {
	request,
	requestNoAuth
} from '../../lib/java110/java110Request.js';
import
url
from '../../constant/url.js';

/**
 * 查询开票抬头
 * @param {Object} _objData 数据
 */
export function getOwnerInvoice(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.listOwnerInvoice,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				let _json = res.data;
				if (_json.code == 0) {
					resolve(_json.data);
					return;
				}
				reject(_json.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

export function saveOwnerInvoice(_data) {
	return new Promise((resolve, reject) => {
		request({
			url: url.saveOwnerInvoice,
			method: "POST",
			data: _data,
			//动态数据
			success: function(res) {
				resolve(res.data);

			},
			fail: function(e) {
				reject("服务器异常了");
			}
		});
	})
}

export function updateOwnerInvoice(_data) {
	return new Promise((resolve, reject) => {
		request({
			url: url.updateOwnerInvoice,
			method: "POST",
			data: _data,
			//动态数据
			success: function(res) {
				resolve(res.data);
			},
			fail: function(e) {
				reject("服务器异常了");
			}
		});
	})
}


/**
 * 查询开票记录
 * @param {Object} _objData 数据
 */
export function getInvoiceApply(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.listInvoiceApply,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				let _json = res.data;
				if (_json.code == 0) {
					resolve(_json);
					return;
				}
				reject(_json.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

export function deleteInvoiceApply(_data) {
	return new Promise((resolve, reject) => {
		request({
			url: url.deleteInvoiceApply,
			method: "POST",
			data: _data,
			//动态数据
			success: function(res) {
				resolve(res.data);
			},
			fail: function(e) {
				reject("服务器异常了");
			}
		});
	})
}

export function getInvoiceEvent(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.listInvoiceEvent,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				let _json = res.data;
				if (_json.code == 0) {
					resolve(_json);
					return;
				}
				reject(_json.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}
