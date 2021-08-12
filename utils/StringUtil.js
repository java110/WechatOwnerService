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