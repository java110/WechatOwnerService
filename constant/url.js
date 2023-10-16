import conf from '../conf/config.js'
const baseUrl = conf.baseUrl;
export default {
	baseUrl: baseUrl,
	wechatRefrashToken: baseUrl + "app/refreshToken", // 公众号刷新token
	refreshOpenId: baseUrl + "app/refreshOpenId", // 公众号刷新token
	loginOwnerByKey: baseUrl + "app/loginOwnerByKey", // 根据临时秘钥登录
	loginUrl: baseUrl + 'app/loginWx',
	getWxPhoto: baseUrl + 'app/getWxPhoto',
	loginOwnerUrl: baseUrl + 'app/loginOwner',
	areaUrl: baseUrl + "app/area.listAreas",
	GetNoticeListUrl: baseUrl + 'app/notice.listNotices', //公告接口
	saveOwnerRepair: baseUrl + 'app/ownerRepair.saveOwnerRepair', //报修
	listOwnerRepairs: baseUrl + 'app/ownerRepair.listOwnerRepairs', //查询报修
	saveOwner: baseUrl + 'app/owner.saveOwnerMember', //家庭成员列表
	queryOwnerMembers: baseUrl + 'app/owner.queryOwnerMembers', //投诉建议列表
	listComplaints: baseUrl + 'app/complaint.listComplaints', //添加投诉建议
	saveComplaint: baseUrl + 'app/complaint.saveComplaint', //查询业主房间
	queryRoomsByOwner: baseUrl + 'app/room.queryRoomsByOwner', //绑定业主
	appUserBindingOwner: baseUrl + 'app/owner.appUserBindingOwner', //查询绑定业主
	ownerRegiter: baseUrl + 'app/owner.ownerRegister', //业主注册
	ownerRegisterWxPhoto: baseUrl + 'app/owner.ownerRegisterWxPhoto', //业主注册
	queryAppUserBindingOwner: baseUrl + 'app/owner.listAppUserBindingOwners', //解绑业主
	appUserUnBindingOwner: baseUrl + 'app/owner.deleteAppUserBindingOwner', //查询业主门禁
	listOwnerMachines: baseUrl + 'app/owner.listOwnerMachines', // 申请钥匙
	applyApplicationKey: baseUrl + "app/applicationKey.applyApplicationKey", //查询钥匙
	listApplicationKeys: baseUrl + "app/applicationKey.listApplicationKeys", //申请访客钥匙
	applyVisitorApplicationKey: baseUrl + "app/applicationKey.applyVisitorApplicationKey", //上传业主照片
	uploadOwnerPhoto: baseUrl + "app/owner.uploadOwnerPhoto",
	getOwnerPhotoPath: baseUrl + "callComponent/download/getFile/fileByObjId",
	filePath: baseUrl + "callComponent/download/getFile/file", //查询业主车位信息
	queryParkingSpacesByOwner: baseUrl + "app/parkingSpace.queryParkingSpacesByOwner", //查询停车位费用
	queryFeeByParkingSpace: baseUrl + "app/fee.queryFeeByParkingSpace", //查询物业费用
	queryFeeByOwner: baseUrl + "app/fee.listFee", //预下单
	queryCouponUser: baseUrl + "app/couponProperty.listCouponPropertyUser", //查询用户优惠卷
	preOrder: baseUrl + "app/payment/toPay", //查询小区
	//临时车缴费
	preOrderTempCarInout: baseUrl + "/app/payment/toPayTempCarInout",
	listCommunitys: baseUrl + "app/community.listCommunitys", //查询小区文化
	listActivitiess: baseUrl + "app/activities.listActivitiess", //查询小区广告
	listAdvertPhoto: baseUrl + "app/advert.listAdvertPhoto",
	//查询车辆进场费用
	queryFeeByCarInout: baseUrl + "app/fee.queryFeeByCarInout",
	//查询报修单
	listMyRepair: baseUrl + "app/ownerRepair.listOwnerRepairs",
	//查询在场车辆
	listCarIn: baseUrl + "app/carInout.listCarInouts",
	queryConfigFee: baseUrl + "app/fee.queryFeeConfig",
	//缴费历史查询
	queryFeeDetail: baseUrl + "app/fee.queryFeeDetail",
	//发送验证码
	userSendSms: baseUrl + "app/user.userSendSms",
	ownerSendSms: baseUrl + "app/user.ownerSendSms",
	userLogout: baseUrl + 'app/user.service.logout', //绑定业主
	listStore: baseUrl + 'app/store.listStoresByCommunity', // 查询小区商户
	//发布需求信息
	saveJunkRequirement: baseUrl + 'app/junkRequirement.saveJunkRequirement',
	//查询需求信息
	listJunkRequirements: baseUrl + 'app/junkRequirement.listJunkRequirements',
	//删除 需求信息
	deleteJunkRequirement: baseUrl + 'app/junkRequirement.deleteJunkRequirement',
	//标记为已完成
	updateJunkRequirement: baseUrl + 'app/junkRequirement.updateJunkRequirement',
	//查询楼栋
	queryFloor: baseUrl + 'app/floor.queryFloors',
	//查询单元
	queryUnit: baseUrl + 'app/unit.queryUnits',
	//查询报修类型
	listRepairSettings: baseUrl + 'app/repair.listRepairSettings',
	//待办工单
	listStaffRepairs: baseUrl + "app/ownerRepair.listStaffRepairs",
	//已办工单
	listStaffFinishRepairs: baseUrl + "app/ownerRepair.listStaffFinishRepairs",
	// 查询报修单处理师傅
	listRepairStaffs: baseUrl + "app/ownerRepair.listRepairStaffs",
	// 删除报修单
	deleteOwnerRepair: baseUrl + "app/ownerRepair.deleteOwnerRepair",
	// 报修退单
	repairDispatch: baseUrl + 'app/ownerRepair.repairDispatch',
	// 报修评价
	appraiseRepair: baseUrl + 'app/repair/appraiseRepair',
	// 根据属性查询费用
	listFeeByAttr: baseUrl + "app/feeApi/listFeeByAttr",
	// 投诉 处理意见
	listWorkflowAuditInfo: baseUrl + 'app/workflow.listWorkflowAuditInfo',
	//查询待审核单
	auditComplaint: baseUrl + 'app/complaint.auditComplaint',
	changeStaffPwd: baseUrl + 'app/user.changeStaffPwd', //修改密码
	changeOwnerPhone: baseUrl + 'app/ownerApi/changeOwnerPhone', //修改密码
	queryRentingConfig: baseUrl + 'app/renting/queryRentingConfig', // 房屋出租配置查询
	saveRentingPool: baseUrl + 'app/renting/saveRentingPool', //出租提交
	listOweFees: baseUrl + 'app/feeApi/listOweFees', //查询房屋欠费
	toOweFeePay: baseUrl + "app/payment/toOweFeePay", //欠费缴费
	toPayTempCarFee: baseUrl + "app/payment/toPayTempCarFee", //欠费缴费
	queryRentingPool: baseUrl + 'app/renting/queryRentingPool',
	saveRentingAppointment: baseUrl + 'app/rentingAppointment/saveRentingAppointment', //房屋预约
	queryActivitiesType: baseUrl + 'app/activitiesType/queryActivitiesType',
	queryProductLabel: baseUrl + 'app/product/queryProductLabel',
	queryGroupBuyProduct: baseUrl + 'app/groupBuy/queryGroupBuyProduct',
	queryProduct: baseUrl + 'app/product/queryProduct',
	saveStoreCart: baseUrl + 'app/storeOrder/saveStoreCart',
	queryStoreCart: baseUrl + 'app/storeOrder/queryStoreCart',
	queryUserAddress: baseUrl + 'app/userAddress/queryUserAddress',
	saveUserAddress: baseUrl + 'app/userAddress/saveUserAddress',
	deleteUserAddress: baseUrl + 'app/userAddress/deleteUserAddress',
	goodsUnifieldOrder: baseUrl + 'goods/unifieldOrder',
	deleteOwner: baseUrl + "app/owner.deleteOwner",
	computeFeeDiscount: baseUrl + "app/feeDiscount/computeFeeDiscount",
	queryFeeDiscount: baseUrl + "app/feeDiscount/queryFeeDiscount",
	// 查询申请类型（空置房）
	queryApplyRoomDiscountType: baseUrl + "app/applyRoomDiscount/queryApplyRoomDiscountType",
	saveApplyRoomDiscount: baseUrl + "app/applyRoomDiscount/saveApplyRoomDiscount",
	openDoor: baseUrl + "app/machine/openDoor",
	getQrCode: baseUrl + "app/machine/getQRcode",
	queryOwnerCars: baseUrl + "app/parkingSpaceApply.listParkingSpaceApply",
	customCarInOut: baseUrl + "app/machine.customCarInOutCmd", //手工保存车牌号
	saveRoomRenovation: baseUrl + "app/roomRenovation/saveRoomRenovation",
	queryRoomRenovation: baseUrl + "app/roomRenovation/queryRoomRenovation",
	updateRoomRenovationState: baseUrl + "app/roomRenovation/updateRoomRenovationState",
	queryRoomRenovationRecord: baseUrl + "app/roomRenovation/queryRoomRenovationRecord",
	queryRoomRenovationRecordDetail: baseUrl + "app/roomRenovation/queryRoomRenovationRecordDetail",
	queryContract: baseUrl + "app/contract/queryContract",
	queryQuestionAnswer: baseUrl + "app/question.queryOwnerQuestionAnswer",
	queryQuestionAnswerTitle: baseUrl + "app/question.listQuestionTitle",
	saveUserQuestionAnswerValue: baseUrl + "app/question.saveOwnerQuestionAnswer",
	listMachineTranslates: baseUrl + "app/machineTranslate.listMachineTranslates",
	generatorHcCode: baseUrl + "app/userLogin/generatorHcCode",
	queryApplyRoomDiscount: baseUrl + "app/applyRoomDiscount/queryApplyRoomDiscount",
	querySetting: baseUrl + "app/reportInfoSetting/queryReportInfoSetting",
	saveReportInfoBackCity: baseUrl + "app/reportInfoBackCity/saveReportInfoBackCity",
	querySettingTitle: baseUrl + "app/reportInfoSettingTitle/querySettingTitle",
	saveReportInfoAnswerValue: baseUrl + "app/reportInfoAnswerValue/saveReportInfoAnswerValue",
	getTempCarFeeOrder: baseUrl + "app/tempCarFee.getTempCarFeeOrder",
	// 空置房跟踪记录列表
	listApplyRoomDiscountRecord: baseUrl + "app/applyRoomDiscountRecord/queryApplyRoomDiscountRecord",
	// 空置房跟踪记录详情
	listApplyRoomDiscountRecordDetail: baseUrl + "app/applyRoomDiscountRecord/queryApplyRoomDiscountRecordDetail",
	// 查询房屋费用项
	listRoomFee: baseUrl + "app/fee.listFee",
	queryOwnerAccount: baseUrl + "app/account/queryOwnerAccount",
	queryOwnerAccountDetail: baseUrl + "app/account/queryOwnerAccountDetail",
	ownerCommunity: baseUrl + "app/owner.ownerCommunity",
	queryShopType: baseUrl + 'app/shopType/queryShopType', //查询店铺类型
	// 家政服务类型（菜单）
	queryHousekeepingType: baseUrl + 'app/housekeepingType/queryHousekeepingType',
	queryMainCategoryAllGoods: baseUrl + "app/productCategory/queryMainCategoryAllGoods",
	queryPhoneMainCategoryProduct: baseUrl + "app/product.queryPhoneMainCategoryProduct",

	queryMainCategory: baseUrl + "app/productCategory/queryMainCategory",

	queryShopCommunity: baseUrl + "app/shop/queryShopCommunity",
	saveAddVisit: baseUrl + "app/visit.saveVisit",
	queryReportInfoAnswerByOpenId: baseUrl + "app/reportInfoAnswer/queryReportInfoAnswerByOpenId",
	listOwnerVisit: baseUrl + "app/visit.listVisits",
	listSystemInfo: baseUrl + "app/system.listSystemInfo",
	queryWaitPayFeeTempCar: baseUrl + "app/car.queryWaitPayFeeTempCar",
	getOpenIdFromAliPay: baseUrl + "app/alipay.getOpenIdFromAliPay",
	uploadImageFormData: baseUrl + "callComponent/upload/uploadFile/uploadImage",
	uploadImage: baseUrl + "callComponent/uploadFile/uploadPhotoImage",
	saveParkingCouponCar: baseUrl + "app/parkingCoupon.saveParkingCouponCar",
	listParkingCouponCar: baseUrl + "app/parkingCoupon.listParkingCouponCar",
	listMarketPicByCommunity: baseUrl + "app/marketPic.listCommunityMarketPic",
	listCommunityMarketGoods: baseUrl + "app/marketGoods.listCommunityMarketGoods",
	// 查询场地API app/communitySpace.listCommunitySpace?spaceId=&name=&state=&venueId=102022100702940003&communityId=2022091498680001&page=1&row=10
	queryChangDi: baseUrl + "app/communitySpace.listCommunitySpace",
	// 查询场馆 app/communityVenue.listCommunityVenue?page=1&row=100&communityId=2022091498680001
	queryChangGuan: baseUrl + "app/communityVenue.listCommunityVenue",
	// 查询已订场地信息
	querySpacePerson: baseUrl + "app/communitySpace.listCommunitySpacePerson",
	unifiedPayment: baseUrl + "app/payment.unifiedPayment",

	// 修改预约订单
	saveCommunitySpacePersonTime: baseUrl + "app/communitySpace.saveCommunitySpacePersonTime",
	listEquipmentAccount: baseUrl + "app/equipmentAccount.listEquipmentAccount",
	listMaintainanceTaskDetail: baseUrl + "app/maintainanceTask.listMaintainanceTaskDetail",
	listInspectionTaskDetails: baseUrl + "app/inspectionTaskDetail.listInspectionTaskDetails",
	// 优惠券核销二维码生成
	generatorCouponQrcode: baseUrl + "app/couponProperty.generatorCouponQrcode",
	computePayFeeCoupon: baseUrl + "app/coupon.computePayFeeCoupon",
	//查询停车场
	listParkingAreas: baseUrl + "app/parkingArea.listParkingAreas",
	couponPropertyUserGiftCar: baseUrl + "app/couponProperty.couponPropertyUserGiftCar",
	listReserveCatalog: baseUrl + "app/reserve.listReserveCatalog", // 查询预约目录
	listReserveGoods: baseUrl + "app/reserve.listReserveGoods", // 查询预约商品
	listReserveParams: baseUrl + "app/reserve.listReserveParams", // 查询预约商品
	listReserveGoodsOrderTime: baseUrl + "app/reserveOrder.listMyReserveGoodsOrderTime", // 查询预约订单
	deleteReserveGoodsPerson: baseUrl + "app/reserveOrder.deleteReserveGoodsPerson", // 查询预约订单
	listProductSeckill: baseUrl + "app/productSeckill.listProductSeckill",
	listProductGroup: baseUrl + "app/productGroup.listProductGroup",
	listRegisterProtocol: baseUrl + "app/system.listRegisterProtocol",
	queryCurrentOwner: baseUrl + "app/owner.queryCurrentOwner",
	listItemReleaseType: baseUrl + "app/itemRelease.listItemReleaseType",
	queryFirstAuditStaff: baseUrl + "app/oaWorkflow.queryFirstAuditStaff",
	saveItemRelease: baseUrl + "app/itemRelease.saveItemRelease",
	listMyItemRelease: baseUrl + "app/itemRelease.listMyItemRelease",
	listItemReleaseRes: baseUrl + "app/itemRelease.listItemReleaseRes",
	queryOaWorkflowUser: baseUrl + "app/oaWorkflow/queryOaWorkflowUser",
	listChargeMachine: baseUrl + "app/chargeMachine.listChargeMachine",
	listChargeMachinePort: baseUrl + "app/chargeMachine.listChargeMachinePort",
	listExamineStaff: baseUrl + "app/examine.listExamineStaff", // 查询打分员工
	startCharge: baseUrl + "app/chargeMachine.startCharge", // 开始充电
	stopCharge: baseUrl + "app/chargeMachine.stopCharge", // 结束充电
	listChargeMachineOrder: baseUrl + "app/chargeMachine.listChargeMachineOrder", // 查询充电订单
	saveExamineStaffValue: baseUrl + "app/examine.saveExamineStaffValue", // 查询充电订单
	listExamineStaffValue: baseUrl + "app/examine.listExamineStaffValue", // 查询充电订单
	listMeterMachine: baseUrl + "app/meterMachine.listMeterMachine",
	queryDict: baseUrl + "callComponent/core/list",
	listCommunityPublicity: baseUrl + "app/publicity.listCommunityPublicity",
	listChargeMonthOrder: baseUrl + "app/chargeCard.listChargeMonthOrder",
	listChargeMonthCard: baseUrl + "app/chargeCard.listChargeMonthCard",
	generatorUserQrCode: baseUrl + "app/user.generatorUserQrCode",
	computeObjFee: baseUrl + "app/feeApi/listFeeObj",
	getQrcodeConfig: baseUrl + "app/payFeeQrcode.getQrcodeConfig",
	getQrcodeOwner: baseUrl + "app/owner.getQrcodeOwner",
	getQrcodeOweFees: baseUrl + "app/payFeeQrcode.getQrcodeOweFees",
	getOpenIdByCode: baseUrl + "app/wechat.getOpenIdByCode",
	getWechatMiniOpenId: baseUrl + "app/wechat.getWechatMiniOpenId",
	getCommunityWechatAppId: baseUrl + "app/wechat.getCommunityWechatAppId",
	cashier: baseUrl + "app/payment.cashier",
	ownerUserLogin: baseUrl+"app/user.ownerUserLogin",
	refreshAppUserBindingOwnerOpenId: baseUrl+"app/owner.refreshAppUserBindingOwnerOpenId",
	ownerUserLoginByOpenId: baseUrl+"app/user.ownerUserLoginByOpenId",
	
	listOwnerInvoice: baseUrl+"app/invoice.listOwnerInvoice",
	saveOwnerInvoice: baseUrl+"app/invoice.saveOwnerInvoice",
	updateOwnerInvoice: baseUrl+"app/invoice.updateOwnerInvoice",
	listInvoiceApply: baseUrl+"app/invoice.listInvoiceApply",
	deleteInvoiceApply: baseUrl+"app/invoice.deleteInvoiceApply",
	listInvoiceEvent: baseUrl+"app/invoice.listInvoiceEvent",
	
	
	

	NEED_NOT_LOGIN_PAGE: [
		'pages/login/login',
		'pages/login/register',
		'pages/my/my',
		'pages/index/index',
		'pages/market/market',
		'pages/login/showlogin',
		'pages/homemaking/homemaking',
		'pages/mall/mall',
		'pages/appointment/appointment',
		'pages/appointment/appointmentPay',
	],
	NEED_NOT_LOGIN_URL: [
		baseUrl + "app/payment/toPayTempCarFee"
		// this.listAdvertPhoto,
		// this.queryAppUserBindingOwner,
		// this.listJunkRequirements
	]
}
