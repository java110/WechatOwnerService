const getHeaders = function() {
	return {
		"app-id": constant.app.appId,
		"transaction-id": util.core.wxuuid(),
		"req-time": util.date.getDateYYYYMMDDHHMISS(),
		"sign": '1234567',
		"user-id": '-1',
		"cookie": '_java110_token_=' + wx.getStorageSync('token'),
		"Accept": '*/*'
	};
};

/**
 * @param {Object} _params 
 *  请求参数
 * {
	 url:'',
	 header:{},
	 method:'',
	 param:''
 }
 */
export function request(_params) {
	
	let header = getHeaders();
	
	if(_params.hasOwnProperty("header")){
		
	}
	return new Promise(
		(resolve, reject) => {
			uni.request({
				url: _params.url,
				header: context.getHeaders(),
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
