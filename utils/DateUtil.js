/**
 * 时间工具类，访问通过Java110Context 去访问，请不要直接引入该文件
 * 规范编程
 * 
 * add by wuxw 2019-12-27
 */

/**
 * @desc: 格式化时间
 * @return: eg: '2018/04/09 21:31:00'
 * @param {Date对象} date 
 */
const formatTime = date => {

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * @desc: 格式化日期
 * @return: eg: '2018/04/09 21:31:00'
 * @param {Date对象} date 
 */
const formatDate = date => {

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

//字符串转日期格式，strDate要转为日期格式的字符串 
const getDate = function getDate(strDate) {
  var st = strDate;
  var a = st.split(" "); //这个根据你的字符串决定，如果中间为T则改T
  var b = a[0].split("-");
  var c = a[1].split(":");
  var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
  return date;
} 


/**
 * @desc: 格式化数字
 * @return: n > 10 [eg: 12] => 12 | n < 10 [eg: 3] => '03'
 * @param {*} n 
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getDateYYYYMMDDHHMISS = function () {
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
  if (hour < 10){
    hour = '0'+hour;
  }
  if (minute < 10){
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  return year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
}

const addYear = function(_date,_year){

  let year = _date.getFullYear() + _year; //获取当前年份
  let mon = _date.getMonth(); //获取当前月份
  let da = _date.getDate(); //获取当前日
  let h = _date.getHours(); //获取小时
  let m = _date.getMinutes(); //获取分钟
  let s = _date.getSeconds(); //获取秒
  let newDate = new Date(year, mon, da, h, m, s); 
  return newDate;
}

const addMonth = function (_date, _month) {

  let year = _date.getFullYear(); //获取当前年份
  let mon = _date.getMonth() + _month; //获取当前月份
  let da = _date.getDate(); //获取当前日
  let h = _date.getHours(); //获取小时
  let m = _date.getMinutes(); //获取分钟
  let s = _date.getSeconds(); //获取秒
  let newDate = new Date(year, mon, da, h, m, s);
  return newDate;
}

const addDay = function (_date, _day) {

  let year = _date.getFullYear(); //获取当前年份
  let mon = _date.getMonth(); //获取当前月份
  let da = _date.getDate() + _day; //获取当前日
  let h = _date.getHours(); //获取小时
  let m = _date.getMinutes(); //获取分钟
  let s = _date.getSeconds(); //获取秒
  let newDate = new Date(year, mon, da, h, m, s);
  return newDate;
}

const addHour = function (_date, _hour) {

  let year = _date.getFullYear(); //获取当前年份
  let mon = _date.getMonth(); //获取当前月份
  let da = _date.getDate(); //获取当前日
  let h = _date.getHours() + _hour; //获取小时
  let m = _date.getMinutes(); //获取分钟
  let s = _date.getSeconds(); //获取秒
  let newDate = new Date(year, mon, da, h, m, s);
  return newDate;
}


const addMinutes = function (_date, _minute) {

  let year = _date.getFullYear(); //获取当前年份
  let mon = _date.getMonth(); //获取当前月份
  let da = _date.getDate(); //获取当前日
  let h = _date.getHours(); //获取小时
  let m = _date.getMinutes() + _minute; //获取分钟
  let s = _date.getSeconds(); //获取秒
  let newDate = new Date(year, mon, da, h, m, s);
  return newDate;
}

const addSeconds = function (_date, _second) {

  let year = _date.getFullYear(); //获取当前年份
  let mon = _date.getMonth(); //获取当前月份
  let da = _date.getDate(); //获取当前日
  let h = _date.getHours(); //获取小时
  let m = _date.getMinutes(); //获取分钟
  let s = _date.getSeconds() + _second; //获取秒
  let newDate = new Date(year, mon, da, h, m, s);
  return newDate;
}


module.exports = {
  formatTime: formatTime,
  getDateYYYYMMDDHHMISS: getDateYYYYMMDDHHMISS,
  addYear: addYear,
  addMonth: addMonth,
  addDay: addDay,
  addHour: addHour,
  addMinutes: addMinutes,
  addSeconds: addSeconds,
  getDate: getDate,
  formatDate: formatDate
}