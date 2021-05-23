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
 * 投票问卷
 * @param {Object} _data 评价内容
 */
export function queryQuestionAnswer(_data) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		request({
			url: url.queryQuestionAnswer,
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
 * 投票问卷
 * @param {Object} _data 评价内容
 */
export function queryQuestionAnswerTitle(_data) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		request({
			url: url.queryQuestionAnswerTitle,
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
export function saveUserQuestionAnswerValue(_data){
	
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		request({
			url: url.saveUserQuestionAnswerValue,
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


