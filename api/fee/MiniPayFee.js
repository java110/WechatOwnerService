import context from '../../lib/java110/Java110Context.js';

import mapping from '../../constant/MappingConstant.js'
import url from '../../constant/url.js'
export function payOweFee(_that) {
	let _receivedAmount = _that.receivableAmount;
	wx.showLoading({
		title: '支付中'
	});
	let _tradeType = 'JSAPI';
	let accountInfo = uni.getAccountInfoSync();
	let appId = accountInfo.miniProgram.appId;
	let _objData = {
		cycles: _that.feeMonth,
		communityId: _that.communityId,
		ownerId: _that.ownerId,
		feeName: '物业费',
		receivedAmount: _receivedAmount,
		tradeType: _tradeType,
		appId: appId,
		storeId: _that.storeId
	};
	context.request({
		url: url.toOweFeePay,
		header: context.getHeaders(),
		method: "POST",
		data: _objData,
		//动态数据
		success: function(res) {
			if (res.statusCode == 200 && res.data.code == '0') {
				let data = res.data; //成功情况下跳转
				uni.requestPayment({
					'timeStamp': data.timeStamp,
					'nonceStr': data.nonceStr,
					'package': data.package,
					'signType': data.signType,
					'paySign': data.sign,
					'success': function(res) {
						// uni.showToast({
						// 	title: "支付成功",
						// 	duration: 2000
						// });
						// uni.navigateBack({});
						uni.navigateTo({
							url:"/pages/successPage/successPage?msg=支付成功&objType=3003"
						})
					},
					'fail': function(res) {
						console.log('fail:' + JSON.stringify(res));
					}
				});
				wx.hideLoading();
				return;
			}

			wx.hideLoading();
			wx.showToast({
				title: "缴费失败",
				icon: 'none',
				duration: 2000
			});
		},
		fail: function(e) {
			wx.hideLoading();
			wx.showToast({
				title: "服务器异常了",
				icon: 'none',
				duration: 2000
			});
		}
	});
}
