import {
	request,
	requestNoAuth
} from '../../lib/java110/java110Request.js'
import
url
from '../../constant/url.js'
import {
	formatDate
} from '@/lib/java110/utils/DateUtil.js'
/**
 * 查询开票抬头
 * @param {Object} _objData 数据
 */
export function getFeeDetail(_objData) {
	return new Promise((resolve, reject) => {
		request({
			url: url.queryFeeDetail,
			method: "GET",
			data: _objData, //动态数据
			success: function(res) {
				let _json = res.data;
				
				let _feeDetails = _json.feeDetails;
				if (!_feeDetails) {
					_feeDetails = [];
					resolve(_feeDetails);
					return;
				}
				_feeDetails.forEach(function(_feeDetail) {
					let _tmpCreateTime = _feeDetail.createTime.replace(/\-/g, "/")
					let _createTime = new Date(_tmpCreateTime);
					_feeDetail.createTime = formatDate(_createTime);
					if (_feeDetail.hasOwnProperty("startTime")) {
						let _tmpStartTime = _feeDetail.startTime.replace(/\-/g, "/")
						let _startTime = new Date(_tmpStartTime);
						_feeDetail.startTime = formatDate(_startTime);
					}

					if (_feeDetail.hasOwnProperty("endTime")) {
						let _tmpEndTime = _feeDetail.endTime.replace(/\-/g, "/")
						let _endTime = new Date(_tmpEndTime);
						_feeDetail.endTime = formatDate(_endTime);
					}

				});
				resolve(_feeDetails);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}