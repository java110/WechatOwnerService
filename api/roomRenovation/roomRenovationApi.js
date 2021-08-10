/**
 * 申请装修信息处理 api 接口类
 * 
 * add by 吴学文 QQ 928255095
 */


import {
	request
} from '../java110Request.js'
import
url
from '../../constant/url.js'

/**
 * 提交装修申请
 * @param {Object} _data 查询 入参
 */
export function saveRoomRenovation(_data) {
	return new Promise((resolve, reject) => {
		request({
			url: url.saveRoomRenovation,
			method: "POST",
			data: _data,
			success: function(res) {
				let data = res.data;
				if (data.code == 0) {
					resolve();
				} else {
					uni.showToast({
						title: data.msg
					})
				}
			},
			fail: function(res) {
				reject(res);
			}
		});
	})
}

/**
 * 获取房屋装修记录
 * @param {Object} _data
 */
export function queryRoomRenovation(_data){
	return new Promise((resolve, reject) => {
		request({
			url: url.queryRoomRenovation,
			method: "GET",
			data: _data,
			success: function(res) {
				let data = res.data;
				if (data.code == 0) {
					resolve(data);
				} else {
					uni.showToast({
						title: data.msg
					})
				}
			},
			fail: function(res) {
				reject(res);
			}
		});
	})
}

/**
 * 装修完成
 * @param {Object} _data
 */
export function updateRoomRenovationState(_data){
	return new Promise((resolve, reject) => {
		request({
			url: url.updateRoomRenovationState,
			method: "POST",
			data: _data,
			success: function(res) {
				let data = res.data;
				if (data.code == 0) {
					resolve();
				} else {
					uni.showToast({
						title: data.msg
					})
				}
			},
			fail: function(res) {
				reject(res);
			}
		});
	})
}

/**
 * 查询装修房屋跟踪记录
 * @param {Object} _data 请求报文
 */
export function queryRoomRenovationRecord(_data){
	return new Promise((resolve, reject) => {
		request({
			url: url.queryRoomRenovationRecord,
			method: "GET",
			data: _data,
			success: function(res) {
				if(res.data.code == 0){
					resolve(res.data);
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
			},
			fail: function(res) {
				wx.showToast({
					title: "服务器异常了",
					icon: 'none',
					duration: 2000
				})
			}
		});
	})
}

/**
 * 查询装修房屋跟踪记录详情
 * @param {Object} _data 请求报文
 */
export function queryRoomRenovationRecordDetail(_data){
	return new Promise((resolve, reject) => {
		request({
			url: url.queryRoomRenovationRecordDetail,
			method: "GET",
			data: _data,
			success: function(res) {
				if(res.data.code == 0){
					resolve(res.data.data);
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
			},
			fail: function(res) {
				wx.showToast({
					title: "服务器异常了",
					icon: 'none',
					duration: 2000
				})
			}
		});
	})
}