import context from '../../lib/java110/Java110Context.js';

import mapping from '../../constant/MappingConstant.js'
import url from '../../constant/url.js'

import conf from '../../conf/config.js'

export function payOweFee(_that) {
	let _receivedAmount = _that.receivableAmount;
	wx.showLoading({
		title: '支付中'
	});
	let _tradeType = 'APP';
	let _objData = {
		cycles: _that.feeMonth,
		communityId: _that.communityId,
		ownerId: _that.ownerId,
		feeName: '物业费',
		receivedAmount: _receivedAmount,
		tradeType: _tradeType,
		appId: conf.appId,
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
				let obj = {
					appid: data.appId,
					noncestr: data.nonceStr,
					package: 'Sign=WXPay', // 固定值，以微信支付文档为主
					partnerid: data.partnerid,
					prepayid: data.prepayid,
					timestamp: data.timeStamp,
					sign: data.sign // 根据签名算法生成签名
				}
				// 第二种写法，传对象字符串
				let orderInfo = JSON.stringify(obj)
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: orderInfo, //微信、支付宝订单数据
					success: function(res) {
						// uni.showToast({
						// 	title: "支付成功",
						// 	duration: 2000
						// });
						// uni.navigateBack({});
						uni.navigateTo({
							url:"/pages/successPage/successPage?msg=支付成功&objType=3003"
						})
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
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
