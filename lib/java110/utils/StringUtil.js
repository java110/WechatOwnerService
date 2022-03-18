/**
 * 字符串工具类
 * 
 * add by 吴学文 2020-09-25
 */

/**
 * 判断是否为空
 * @param {Object} _value 字符串
 */
export function isEmpty(_value) {
	let type = typeof _value;

	switch (type) {
		case 'number':
			if (isFinite(_value)) {
				if (_value == 0) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		case 'object':
			for (let i in _value) {
				return false;
			}
			return true;
		case 'string':
			if (_value.length == 0) {
				return true;
			} else {
				return false
			}
		default:
			return true
	}
}

export function isNull(_value) {
	if (typeof _value == "undefined" || _value == null || _value == "") {
		return true;
	} else {
		return false;
	}
}

export function isNotNull(_value) {
	return !isNull(_value);
}

export function checkPhoneNumber(_value){
	let grep = /^(1(([35789][0-9])|(47)))\d{8}$/;
	if(grep.test(_value)){
		return true;
	}	
	return false;
}

export function checkStrLength(strTemp) { 
	var i,sum;
	sum=0;
	var length = strTemp.length ;
	for(i=0;i<length;i++){
		if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255)) {
			sum=sum+1;
		}else {
			sum=sum+2;
		}
	}
	return sum; 
}

export function isIDCard(num) {
	if (num == null || num == undefined) {
		return true;
	}
	num = num.toUpperCase();
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
		return false;
	}
	//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	//下面分别分析出生日期和校验位
	let len, re;
	len = num.length;
	if (len == 15) {
		re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		let arrSplit = num.match(re);

		//检查生日日期是否正确
		let dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
		let bGoodDay;
		bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			return false;
		}
		else {
			//将15位身份证转成18位
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			let nTemp = 0, i;
			num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			num += arrCh[nTemp % 11];
			return true;
		}
	}
	if (len == 18) {
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		let arrSplit = num.match(re);

		//检查生日日期是否正确
		let dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		let bGoodDay;
		bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			// alert(dtmBirth.getYear());
			//  alert(arrSplit[2]);
			return false;
		}
		else {
			//检验18位身份证的校验码是否正确。
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			let valnum;
			let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			let nTemp = 0, i;
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != num.substr(17, 1)) {
				return false;
			}
			return true;
		}
	}
	return false;
}