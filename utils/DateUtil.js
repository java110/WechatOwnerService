/**
 * 
 * 规范编程
 * 
 * add by wuxw 2019-12-27
 */

/**
 * 
 * 将时间转换为 字符串
 * @desc: 格式化时间
 * @return: eg: '2018/04/09 21:31:00'
 * @param {Date对象} date 
 */
export function formatTimeNow() {
	let date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

/**
 * 
 * 将时间转换为 字符串
 * @desc: 格式化时间
 * @return: eg: '2018/04/09 21:31:00'
 * @param {Date对象} date 
 */
export function formatTime(date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
/**
 * 将日期转换为 字符串
 * @desc: 格式化日期
 * @return: eg: '2018/04/09 21:31:00'
 * @param {Date对象} date 
 */
export function formatDate(date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return [year, month, day].map(formatNumber).join('/');
}; //字符串转日期格式，strDate要转为日期格式的字符串 


export function getDate(strDate) {
	var st = strDate;
	var a = st.split(" "); //这个根据你的字符串决定，如果中间为T则改T
	var b = a[0].split("-");
	var c = a[1].split(":");
	var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
	return date;
};

/**
 * @description 将时间字符串 转为日期字符串 
 * @param {String} _dateTimeString 时间字符串 YYYY-MM-DD hh:mi:ss
 * @return {String} _value 日期字符串 YYYY/MM/DD
 */
export function dateTimeStringToDateString(_dateTimeString){
	let _value = _dateTimeString.replace(/\-/g, "/");
	let _tmpValue = new Date(_value);
	return formatDate(_tmpValue);
}

/**
 * @desc: 格式化数字
 * @return: n > 10 [eg: 12] => 12 | n < 10 [eg: 3] => '03'
 * @param {*} n 
 */
export function formatNumber(n){
	n = n.toString();
	return n[1] ? n : '0' + n;
};

/**
 * @description  查询当前时间YYYYMMDDHHMISS字符串
 * @return {YYYYMMDDHHMISS} 返回当前时间YYYYMMDDHHMISS字符串
 * @param {}   
 */
export function getDateYYYYMMDDHHMISS() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}
	if (hour < 10) {
		hour = '0' + hour;
	}
	if (minute < 10) {
		minute = '0' + minute;
	}
	if (second < 10) {
		second = '0' + second;
	}
	return year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
};

/**
 * @description 当前时间加 指定年
 * @param {Object} _date 指定时间
 * @param {Object} _year 指定年
 * @return {Date} 返回新的日期
 */
export function addYear(_date, _year) {
	let year = _date.getFullYear() + _year; //获取当前年份
	let mon = _date.getMonth(); //获取当前月份
	let da = _date.getDate(); //获取当前日
	let h = _date.getHours(); //获取小时
	let m = _date.getMinutes(); //获取分钟
	let s = _date.getSeconds(); //获取秒
	let newDate = new Date(year, mon, da, h, m, s);
	return newDate;
};

/**
 * @description 当前时间加指定月
 * @param {Object} _date 指定日期
 * @param {Object} _month 指定月
 * @return {Date} 返回新的日期
 */
export function addMonth(_date, _month) {
	let year = _date.getFullYear(); //获取当前年份
	let mon = _date.getMonth() + _month; //获取当前月份
	let da = _date.getDate(); //获取当前日
	let h = _date.getHours(); //获取小时
	let m = _date.getMinutes(); //获取分钟
	let s = _date.getSeconds(); //获取秒
	let newDate = new Date(year, mon, da, h, m, s);
	return newDate;
};
/**
 * @description 指定时间加入指定日
 * @param {Object} _date 指定时间
 * @param {Object} _day 指定日
 * @return {Date} 返回新的日期
 */
export function addDay(_date, _day) {
	let year = _date.getFullYear(); //获取当前年份
	let mon = _date.getMonth(); //获取当前月份
	let da = _date.getDate() + _day; //获取当前日
	let h = _date.getHours(); //获取小时
	let m = _date.getMinutes(); //获取分钟
	let s = _date.getSeconds(); //获取秒
	let newDate = new Date(year, mon, da, h, m, s);
	return newDate;
};

/**
 * @description 指定时间上加上指定小时
 * @param {Object} _date 指定日期
 * @param {Object} _hour 指定小时
 * @return {Date} 返回新的日期
 */
export function addHour(_date, _hour) {
	let year = _date.getFullYear(); //获取当前年份
	let mon = _date.getMonth(); //获取当前月份
	let da = _date.getDate(); //获取当前日
	let h = _date.getHours() + _hour; //获取小时
	let m = _date.getMinutes(); //获取分钟
	let s = _date.getSeconds(); //获取秒
	let newDate = new Date(year, mon, da, h, m, s);
	return newDate;
};
/**
 * @description 指定时间上加上指定分钟
 * @param {Object} _date 指定日期
 * @param {Object} _minute 指定分钟
 * @return {Date} 返回新的日期
 */
export function addMinutes(_date, _minute) {
	let year = _date.getFullYear(); //获取当前年份
	let mon = _date.getMonth(); //获取当前月份
	let da = _date.getDate(); //获取当前日
	let h = _date.getHours(); //获取小时
	let m = _date.getMinutes() + _minute; //获取分钟
	let s = _date.getSeconds(); //获取秒
	let newDate = new Date(year, mon, da, h, m, s);
	return newDate;
};
/**
 * @description 指定时间上加上指定秒
 * @param {Object} _date 指定日期
 * @param {Object} _second 指定秒
 * @return {Date} 返回新的日期
 */
export function addSeconds(_date, _second) {
	let year = _date.getFullYear(); //获取当前年份
	let mon = _date.getMonth(); //获取当前月份
	let da = _date.getDate(); //获取当前日
	let h = _date.getHours(); //获取小时
	let m = _date.getMinutes(); //获取分钟
	let s = _date.getSeconds() + _second; //获取秒
	let newDate = new Date(year, mon, da, h, m, s);
	return newDate;
}