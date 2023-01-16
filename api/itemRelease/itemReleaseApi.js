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