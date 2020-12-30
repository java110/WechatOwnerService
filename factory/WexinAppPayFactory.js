
import conf from '../conf/config.js'

import md5 from '../utils/md5Util.js'
/*
* 生成订单信息
* @params orderInfo: any 后端返回的数据，格式和上面一样
*/
export function getPayInfo (orderInfo) {
		let time = new Date();
		let timestamp = time.getTime().toString().substr(0, 10); // 时间戳
		let noncestr = randomSrt(true, 10, 20); // 随机数
		let key = conf.appPayKey; // 加密Key，微信支付填写的key
		payInfo = {
			appid: orderInfo.appid,
			noncestr,
			package: 'Sign=WXPay',
			partnerid: orderInfo.partnerid,
			prepayid: orderInfo.prepayid,
			timestamp: Number(timestamp)
	}
	// 键值对按照ASCII码从小到大排序生成类似：appid=xxx&body=xx&device_info=1000
	let keyValueStr = mapObjToKeyValue(payInfo, true);
	// 插入加密Key到最后
	let strSignTemp = `${keyValueStr}&key=${key}`;
	// 真正的二次加密
	let sign = md5(strSignTemp).toUpperCase().substr(0, 30);
	console.log(sign) // 可以去微信支付文档做校验
	payInfo.sign = sign;
	// 返回字符串给uniapp调起支付用
	return payInfo;
}
/*
 * 生成指定的随机字符串
 * @params isRandomLength: boolean 是否在min ~ max生成随机长度
 * @params min: number 最小长度
 * @params max: number 最大长度
 */
export function randomSrt(isRandomLength, min, max) {
	let str = "",
		range = min;
	const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
			'l',
			'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
			'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];

	// 随机产生
	if (isRandomLength) {
		range = Math.round(Math.random() * (max - min)) + min;
	}
	for (var i = 0; i < range; i++) {
		let pos = Math.round(Math.random() * (arr.length - 1));
		str += arr[pos];
	}
	return str;
}

/*
 * 根据object生成key value字符串
 * @params obj: any 要map的对象
 * @params isSort: boolean 是否根据ASCII字典排序
 */
export function mapObjToKeyValue(obj, isSort = false) {
	let keys = Object.keys(obj);
	let str = "";
	
	if (isSort) keys.sort();
	keys.forEach(key => {
		if (obj.hasOwnProperty(key)) {
			str += `${key}=${obj[key]}&`;
		}
	});
	return str.replace(/&$/, "");
}