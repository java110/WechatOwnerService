import {
	request,
	requestNoAuth
} from '../../lib/java110/java110Request.js'
import
url
from '../../constant/url.js'

import
mapping
from '../../constant/MappingConstant.js'

import {
	formatDate,
	dateTimeStringToDateString
} from '../../lib/java110/utils/DateUtil.js';

// #ifdef H5

const WexinPayFactory = require('../../factory/WexinPayFactory.js');

// #endif

// #ifdef APP-PLUS
import {
	getPayInfo
} from '../../factory/WexinAppPayFactory.js'
// #endif



/**
 * @param {Object} _objData {
	 page: 1,
	 row: 30,
	 payerObjId: _room.roomId,
	 feeTypeCd: '888800010001',
	 communityId: _room.communityId,
	 state:'2008001'
 }
 */
export function getRoomFees(_objData, _tmpRoom) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		request({
			url: url.queryFeeByOwner,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					let _roomFees = res.data.fees;
					if (_roomFees.length < 1) {
						//_that.noData = true;
						reject();
					}
					_roomFees.forEach(function(_roomFee) {
						_tmpRoom = JSON.parse(JSON.stringify(_tmpRoom));
						_tmpRoom.endTime = dateTimeStringToDateString(_roomFee.endTime);
						let _now = new Date();
						if (_roomFee.endTime > _now) {
							_tmpRoom.feeStateName = '正常'
						} else {
							_tmpRoom.feeStateName = '欠费'
						}
						_tmpRoom.additionalAmount = _roomFee.additionalAmount;
						_tmpRoom.squarePrice = _roomFee.squarePrice;
						_tmpRoom.amount = _roomFee.feePrice;
						_tmpRoom.feeId = _roomFee.feeId;
						_tmpRoom.feeName = _roomFee.feeName;
						_tmpRoom.feeFlag = _roomFee.feeFlag;
						_tmpRoom.paymentCycle = _roomFee.paymentCycle;
						_tmpRoom.preDegrees = _roomFee.preDegrees;
						_tmpRoom.curDegrees = _roomFee.curDegrees;
						_tmpRoom.preReadingTime = _roomFee.preReadingTime;
						_tmpRoom.curReadingTime = _roomFee.curReadingTime;
						_tmpRoom.feeState = _roomFee.state;
						_tmpRoom.deadlineTime = _roomFee.deadlineTime;
						_tmpRoom.amountOwed = _roomFee.amountOwed;
						_tmpRoom.startTime = _roomFee.startTime;
						_tmpRoom.payOnline = _roomFee.payOnline;
						moreRooms.push(_tmpRoom);
					});
					resolve(moreRooms);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}
//查询用户优惠卷
export function getCouponUsers(_objData, _couponUsers) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.queryCouponUser,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					_couponUsers = res.data;
					if (_couponUsers.length < 1) {
						//_that.noData = true;
						reject();
					}
					resolve(_couponUsers);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}

// 查询停车劵
export function getParkingCarCoupon(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.listParkingCouponCar,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				let _json = res.data;
				if (_json.code == 0) {
					//成功情况下跳转
					resolve(_json.data);
					return;
				}
				reject(_json.msg);
			},
			fail: function(e) {
				reject();
			}
		});
	})
}

/**
 * 查询欠费信息
 * @param {Object} _objData 欠费对象
 */
export function getRoomOweFees(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.listOweFees,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					let _roomFees = res.data.data;
					if (_roomFees.length < 1) {
						//_that.noData = true;
						reject();
					}
					_roomFees.forEach(function(_roomFee) {
						_roomFee.endTime = dateTimeStringToDateString(_roomFee.endTime);
						_roomFee.deadlineTime = dateTimeStringToDateString(_roomFee
							.deadlineTime);
					});
					resolve(_roomFees);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}

/**
 * 查询优惠信息
 * @param {Object} _objData 费用
 */
export function getFeeDiscounts(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.computeFeeDiscount,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					let _feeDiscounts = res.data.data;
					resolve(_feeDiscounts);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}

/**
 * 查询停车费
 * @param {Object} _objData 费用
 */
export function getTempCarFeeOrder(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.getTempCarFeeOrder,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					resolve(res.data);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}

export function toPayTempCarFee(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.toPayTempCarFee,
			method: "POST",
			data: JSON.stringify(_objData), //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					resolve(res.data);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}


export function generatorCouponQrcode(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.generatorCouponQrcode,
			method: "POST",
			data: JSON.stringify(_objData), //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					resolve(res.data);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}

export function computePayFeeCoupon(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.computePayFeeCoupon,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					resolve(res.data);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}



export function receiveParkingCoupon(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.saveParkingCouponCar,
			method: "POST",
			data: JSON.stringify(_objData), //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					resolve(res.data);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}


export function couponPropertyUserGiftCar(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.couponPropertyUserGiftCar,
			method: "POST",
			data: JSON.stringify(_objData), //动态数据
			success: function(res) {
				if (res.data.code == 0) {
					//成功情况下跳转
					resolve(res.data);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}

export function toAliPayTempCarFee(_objData) {
	return new Promise((resolve, reject) => {
		requestNoAuth({
			url: url.alipayPayTempCarFee,
			method: "POST",
			data: JSON.stringify(_objData), //动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					//成功情况下跳转
					resolve(res.data);
					return;
				}
				reject();
			},
			fail: function(e) {
				reject();
			}
		});
	})
}

/**
 * app 支付
 * @param {*} _that 
 * @param {*} _data 
 */
export function payFeeApp(_that, _data) {
	wx.showLoading({
		title: '支付中'
	});
	request({
		url: url.preOrder,
		method: "POST",
		data: _data,
		//动态数据
		success: function(res) {
			wx.hideLoading();
			if (res.data.code == '0') {
				let data = res.data; //成功情况下跳转
				let obj = {};
				let orderInfo = {};
				// #ifdef MP-WEIXIN
				obj = {
					appid: data.appId,
					noncestr: data.nonceStr,
					package: 'Sign=WXPay', // 固定值，以微信支付文档为主
					partnerid: data.partnerid,
					prepayid: data.prepayid,
					timestamp: data.timeStamp,
					sign: data.sign // 根据签名算法生成签名
				}
				// #endif
				// #ifdef APP-PLUS
				obj = getPayInfo(data);
				// #endif
				// 第二种写法，传对象字符串
				orderInfo = JSON.stringify(obj)
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: orderInfo, //微信、支付宝订单数据
					success: function(res) {
						uni.navigateTo({
							url: "/pages/successPage/successPage?msg=支付成功&objType=3003"
						})
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
				return;
			}
			if (res.data.code == '100') {
				let data = res.data; //成功情况下跳转
				uni.showToast({
					title: "支付成功",
					duration: 2000
				});
				uni.navigateTo({
					url: "/pages/successPage/successPage?msg=支付成功&objType=3003"
				})
				return;
			}

			wx.showToast({
				title: data.msg,
				icon: 'none',
				duration: 2000
			});
		},
		fail: function(e) {
			wx.hideLoading();
			wx.showToast({
				title: "服务器异常了",
				icon: 'none',
				duration: 2000
			});
		}
	});
}

/**
 * 微信 支付
 * @param {*} _that 
 * @param {*} _data 
 */
export function payFeeWechat(_that, _data,_successUrl) {
	if(!_successUrl ){
		_successUrl = "/pages/successPage/successPage?msg=支付成功&objType=3003";
	}
	wx.showLoading({
		title: '支付中'
	});
	request({
		url: url.unifiedPayment,
		method: "POST",
		data: _data,
		//动态数据
		success: function(res) {
			wx.hideLoading();
			if (res.data.code == '0') {
				let data = res.data; //成功情况下跳转
				// #ifdef MP-WEIXIN
				uni.requestPayment({
					'timeStamp': data.timeStamp,
					'nonceStr': data.nonceStr,
					'package': data.package,
					'signType': data.signType,
					'paySign': data.sign,
					'success': function(res) {
						uni.navigateTo({
							url: _successUrl
						})
					},
					'fail': function(res) {
						console.log('fail:' + JSON.stringify(res));
					}
				});
				// #endif
				// #ifdef H5
				WexinPayFactory.wexinPay(data, function() {
					uni.navigateTo({
						url: _successUrl
					})
				});
				// #endif

				return;
			}
			if (res.statusCode == 200 && res.data.code == '100') {
				let data = res.data; //成功情况下跳转
				uni.showToast({
					title: "支付成功",
					duration: 2000
				});
				setTimeout(function() {
					uni.navigateBack({});
				}, 2000)

				return;
			}
			wx.showToast({
				title: "缴费失败",
				icon: 'none',
				duration: 2000
			});
		},
		fail: function(e) {
			wx.hideLoading();
			wx.showToast({
				title: "服务器异常了",
				icon: 'none',
				duration: 2000
			});
		}
	});
}
