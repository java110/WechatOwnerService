/**
	微信支付方法(uni-app h5)适用
	获取微信加签信息
	@param{data}:获取的微信加签
	@param{res}:成功回调
	@param{fail}:失败回调
	
	@warn:因为package为严格模式下的保留字，不能用作变量.
	@use
	
		wPay({
			appId,
			timeStamp,
			nonceStr,
			signature,
			package,
			paySign
		},res=>{
			console.log(‘调用成功!‘);
		},fail=>{
			console.log(‘调用失败!‘);
		})
**/
//const wx = require('jweixin-module');

class AliPayFactory {
	aliPay(data, successCallBack) {
		if (!window.AlipayJSBridge) {
			document.addEventListener('AlipayJSBridgeReady', function(){
				AlipayJSBridge.call("tradePay", {
					tradeNO: data.tradeNO
				}, function(data) {
					log(JSON.stringify(data));
					if ("9000" == data.resultCode) {
						successCallBack();
					}
				});
			}, false);
			return ;
		}

		AlipayJSBridge.call("tradePay", {
			tradeNO: data.tradeNO
		}, function(data) {
			log(JSON.stringify(data));
			if ("9000" == data.resultCode) {
				successCallBack();
			}
		});
	}



};

module.exports = new AliPayFactory();
