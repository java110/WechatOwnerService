/**
 * 首页相关 数据封装API
 * add by 吴学文 2020-09-07
 * QQ 92825595
 * 
 */

import {
	requestNoAuth
} from '../java110Request.js';
import url from '../../constant/url.js';


import {dateTimeStringToDateString} from '../../utils/DateUtil.js'

/**
 * 查询活动列表
 */
export function getActivitiTitle() {
	return [{
			typeCd: '10003',
			name: '公共安全及消防'
		},
		{
			typeCd: '10004',
			name: '政务及党政'
		},
		{
			typeCd: '10005',
			name: '费用公开'
		},
		{
			typeCd: '10001',
			name: '小区文化'
		},
		{
			typeCd: '10002',
			name: '其他'
		}
	];
}

/**
 * 查询 目录列表
 */
export function getCategoryList() {
	return {
		pageone: [{
			name: "物业费",
			src: "/static/images/index_property.png",
			href: "/pages/roomFeeList/roomFeeList"
		}, {
			name: "停车费",
			src: "/static/images/index_park.png",
			href: "/pages/payParkingFeeList/payParkingFeeList"
		}, {
			name: "投诉建议",
			src: "/static/images/index_complaint.png",
			href: "/pages/complaint/complaint"
		}, {
			name: "家庭成员",
			src: "/static/images/index_member.png",
			href: "/pages/familyList/familyList"
		}, {
			name: "报修",
			src: "/static/images/index_repair.png",
			href: "/pages/repair/repair"
		}, {
			name: "公告",
			src: "/static/images/index_notice.png",
			href: "/pages/notice/index"
		}, {
			name: "联系客服",
			src: "/static/images/index_persion.png",
			href: "callProperty"
		},{
			name: "房屋出租",
			src: "/static/images/index_openDoor.png",
			href: "/pages/hireRoom/hireRoom"
		}],
		pagetwo: [{
			name: "智慧开门",
			src: "/static/images/index_openDoor.png",
			href: "/pages/openDoor/openDoor"
		},
		{
			name: "车位申请",
			src: "/static/images/index_parking.png",
			href: "/pages/applyparking/applyparking"
		}]
	};
}


/**
 * 查询活动
 */
export function loadActivites(dataObj){
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.listActivitiess,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _activites = res.data.activitiess;
						let _acts = [];		
						_activites.forEach(function(_item) {
							_item.src = url.filePath + "?fileId=" + _item.headerImg + "&communityId=" + dataObj.communityId +
								"&time=" + new Date();
							_item.startTime = dateTimeStringToDateString(_item.startTime);
								
							_acts.push(_item);
						});
						resolve(_acts);
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
 * 查询小区广告
 */
export function loadAdverts(dataObj){
	return new Promise(
		(resolve, reject) => {
			requestNoAuth({
				url: url.listAdvertPhoto,
				method: "GET",
				data: dataObj,
				//动态数据
				success: function(res) {
					if (res.statusCode == 200) {
						let _advertPhotos = res.data;
						let _aPhotos = [];
						let _urlPath = '';
						// #ifdef MP-WEIXIN
						_urlPath = url.baseUrl
						// #endif
						_advertPhotos.forEach(function(_item) {
							_item.url = _urlPath + _item.url + "&time=" + new Date();
							_aPhotos.push(_item);
						});
						resolve(_aPhotos);
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