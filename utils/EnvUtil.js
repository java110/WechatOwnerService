export default function isWxOrAli() {
	var ua = window.navigator.userAgent.toLowerCase();
	//判断是不是微信
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return "Wechat";
	}
	//判断是不是支付宝
	if (ua.match(/AlipayClient/i) == "alipayclient") {
		return "AliPay";
	}
}
