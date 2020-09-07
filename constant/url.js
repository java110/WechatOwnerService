
import conf from '../conf/config.js'
const baseUrl = conf.baseUrl; 
export default {
	baseUrl:baseUrl,
	wechatRefrashToken: baseUrl + "app/refreshToken", // 公众号刷新token
	loginOwnerByKey: baseUrl + "app/loginOwnerByKey", // 根据临时秘钥登录
	loginUrl: baseUrl + 'app/loginWx',
	getWxPhoto: baseUrl + 'app/getWxPhoto',
	loginOwnerUrl: baseUrl + 'app/loginOwner',
	areaUrl: baseUrl + "app/area.listAreas",
	GetNoticeListUrl: baseUrl + 'app/notice.listNotices', //公告接口
	saveOwnerRepair: baseUrl + 'app/ownerRepair.saveOwnerRepair', //报修
	listOwnerRepairs: baseUrl + 'app/ownerRepair.listOwnerRepairs', //查询报修
	saveOwner: baseUrl + 'app/owner.saveOwner', //家庭成员列表
	queryOwnerMembers: baseUrl + 'app/owner.queryOwnerMembers', //投诉建议列表
	listComplaints: baseUrl + 'app/complaint.listComplaints', //添加投诉建议
	saveComplaint: baseUrl + 'app/complaint', //查询业主房间
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
	NEED_NOT_LOGIN_PAGE: [
		'/pages/login/login',
		'/pages/register/register',
		'/pages/my/my',
		'/pages/index/index',
		'/pages/market/market',
		'/pages/showlogin/showlogin'
	],
	NEED_NOT_LOGIN_URL: [
		// this.listActivitiess,
		// this.listAdvertPhoto,
		// this.queryAppUserBindingOwner,
		// this.listJunkRequirements
	]
}
