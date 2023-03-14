import {
	requestNoAuth,request
} from '../../lib/java110/java110Request.js';
import 
	url
 from '../../constant/url.js';


/**
 * 查询业主小区
 * @param {Object} dataObj 对象
 */
export function getExamineStaffs(dataObj) {
	return new Promise(
		(resolve, reject) => {
			request({
				url: url.listExamineStaff,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _data = res.data.data;
						resolve(_data);
					}
				},
				fail: function(e) {
					reject(e);
				}
			});
		})		
}

/**
 * 物业人员考评
 * @param {Object} dataObj 
 */
export function saveExamineStaffValue(dataObj){
	return new Promise((resolve, reject) => {
		request({
			url: url.saveExamineStaffValue,
			method: "POST",
			data: dataObj,
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
