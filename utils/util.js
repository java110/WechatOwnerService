//app.js
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

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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

const wxuuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid
}



const getHeaders = function(){
   return {
     app_id: api.appInfo.appId,
     transaction_id: wxuuid(),
     req_time: getDateYYYYMMDDHHMISS(),
     sign:'1234567',
     user_id:'-1',
     cookie: '_java110_token_=' + wx.getStorageSync('token')
   }
}


module.exports = {
  formatTime: formatTime,
  getHeaders: getHeaders
}
