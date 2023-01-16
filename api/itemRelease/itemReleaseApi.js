import {
	requestNoAuth,request
} from '../../lib/java110/java110Request.js';
import 
	url
 from '../../constant/url.js';
 
 
 export function getItemReleaseType(dataObj) {
 	return new Promise(
 		(resolve, reject) => {
 			request({
 				url: url.listItemReleaseType,
 				method: "GET",
 				data: dataObj,
 				//动态数据
 				success: function(res) {
 					if (res.data.code == 0) {
 						let _data = res.data.data;
 						resolve(_data);
 						return ;
 					}
 					reject('未包含数据');
 				},
 				fail: function(e) {
 					reject(e);
 				}
 			});
 		})
 }
 
 export function getFirstAuditStaff(dataObj) {
 	return new Promise(
 		(resolve, reject) => {
 			request({
 				url: url.queryFirstAuditStaff,
 				method: "GET",
 				data: dataObj,
 				//动态数据
 				success: function(res) {
 					if (res.data.code == 0) {
 						let _data = res.data.data;
 						resolve(_data);
 						return ;
 					}
 					reject('未包含数据');
 				},
 				fail: function(e) {
 					reject(e);
 				}
 			});
 		})
 }
 
export function saveItemRelease(_data) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		request({
			url: url.saveItemRelease,
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


 export function getMyItemRelease(dataObj) {
 	return new Promise(
 		(resolve, reject) => {
 			request({
 				url: url.listMyItemRelease,
 				method: "GET",
 				data: dataObj,
 				//动态数据
 				success: function(res) {
 					if (res.data.code == 0) {
 						let _data = res.data.data;
 						resolve(_data);
 						return ;
 					}
 					reject('未包含数据');
 				},
 				fail: function(e) {
 					reject(e);
 				}
 			});
 		})
 }
 
 export function getItemReleaseRes(dataObj) {
 	return new Promise(
 		(resolve, reject) => {
 			request({
 				url: url.listItemReleaseRes,
 				method: "GET",
 				data: dataObj,
 				//动态数据
 				success: function(res) {
 					if (res.data.code == 0) {
 						let _data = res.data.data;
 						resolve(_data);
 						return ;
 					}
 					reject('未包含数据');
 				},
 				fail: function(e) {
 					reject(e);
 				}
 			});
 		})
 }
 
 export function queryOaWorkflowUser(dataObj) {
 	return new Promise(
 		(resolve, reject) => {
 			request({
 				url: url.queryOaWorkflowUser,
 				method: "GET",
 				data: dataObj,
 				//动态数据
 				success: function(res) {
 					if (res.data.code == 0) {
 						let _data = res.data.data;
 						resolve(_data);
 						return ;
 					}
 					reject('未包含数据');
 				},
 				fail: function(e) {
 					reject(e);
 				}
 			});
 		})
 }
 
 
 
 
 
 