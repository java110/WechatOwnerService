import {
	requestNoAuth,
	request
} from '../java110Request.js'
import
url
from '../../constant/url.js'

import
mapping
from '../../constant/MappingConstant.js'

/**
 * 疫情问卷
 * @param {Object} _data 
 */
export function querySetting(_data){
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		requestNoAuth({
			url: url.querySetting,
			method: "GET",
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
/**
 * 疫情问卷详情
 * @param {Object} _data 评价内容
 */
export function querySettingTitle(_data) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.querySettingTitle,
			method: "GET",
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
/**
 * add by wuxw
 * @param {Object} _data 保存 用户地址
 */
export function saveReportInfoAnswerValue(_data){
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.saveReportInfoAnswerValue,
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

/**
 * add by wuxw
 * @param {Object} _data 保存 用户地址
 */
export function saveReportInfoBackCity(_data){
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.saveReportInfoBackCity,
			method: "POST",
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0){
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
