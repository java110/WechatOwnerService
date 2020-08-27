import {
	requestNoAuth
} from 'java110Request.js'
import {
	url
} from '../constant/url.js'
/**
 * @param {Object} dataObj
 * 				page: 1,
				row: 15,
				cityCode: this.areaCode,
				state: '1100',
				name: this.searchValue
 */
export function getCommunitys(dataObj) {
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.listCommunitys,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _communtiys = res.data.communitys;

						_that.communitys = _communtiys;
					}
				},
				fail: function(e) {
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					});
				}
			});
		})
}
