import {
	request
} from '../java110Request.js'
import
url
from '../../constant/url.js'

import
mapping
from '../../constant/MappingConstant.js'

import {formatDate,dateTimeStringToDateString} from '../../utils/DateUtil.js'



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
export function getRoomFees(_objData,_tmpRoom) {
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
					 	
						_roomFee.deadlineTime = dateTimeStringToDateString(_roomFee.deadlineTime);
					
					
					
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