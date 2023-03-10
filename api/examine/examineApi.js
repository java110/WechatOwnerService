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
