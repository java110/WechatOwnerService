var formatDate = function(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1; //获取当前月份的日期 
	var d = date.getDate();

	if (m >= 1 && m <= 9) {
		m = "0" + m;
	}
	if (d >= 0 && d <= 9) {
		d = "0" + d;
	}

	var code = y + '-' + m + '-' + d;
	var year = y + '年';
	var month = m + '月';
	var day = d + '日';
	var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
	return {
		time: year + month + day,
		name: week,
		code: code,
		day: d
	};
};

var surplusWeek = function(dateNow, intervalDays, bolPastTime) {
	let oneDayTime = 1000 * 60 * 60 * 24
	let today = new Date(dateNow)
	let todayDay = today.getDay() || 7
	let startDate = new Date(
		dateNow
	)
	let dateList = []
	for (let i = 0; i < 7; i++) {
		let temp = new Date(startDate.getTime() + i * oneDayTime)
		let year = temp.getFullYear()
		let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1
		let day = temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()
		dateList[i] = formatDate(new Date(`${year}-${month}-${day}`))
	}
	return dateList
}

function getWeekTime(dateNow, intervalDays, bolPastTime) {
	return surplusWeek(dateNow, intervalDays, bolPastTime);
}

module.exports = {
	getWeekTime: getWeekTime
}
