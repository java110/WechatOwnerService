export function isWxOrAli() {
	let _env = "WECHAT"
	if (/MicroMessenger/.test(window.navigator.userAgent)) {
		_env = "WECHAT"
	} else if (/AlipayClient/.test(window.navigator.userAgent)) {
		_env = "ALIPAY"
	} else {
		_env = "OTHER"
	}
	return _env;
}
