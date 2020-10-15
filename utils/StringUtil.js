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
