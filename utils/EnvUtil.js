export default function isWxOrAli() {
	var ua = window.navigator.userAgent.toLowerCase();
	console.log(ua.match(/MicroMessenger/i));
	//判断是不是微信
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return "Wechat";
	}
	console.log(ua.match(/AlipayClient/i));
	//判断是不是支付宝
	if (ua.match(/AlipayClient/i) == "alipayclient") {
		return "AliPay";
	}
}
