/**
 * 字符串工具类
 * 
 * add by 吴学文 2020-09-25
 */

/**
 * 判断是否为空
 * @param {Object} _value 字符串
 */
export function isEmpty(_value){
	if(_value == undefined || _value == null || _value.trim() == ''){
		return true;
	}
	
	return false;
}
