/**
 * url 常量类
 * 
 * add by wuxw 2019-12-28
 */
const constant = require("../constant/index.js");
import conf from '../conf/config.js'
const baseUrl = conf.baseUrl; 

const wechatRefrashToken = baseUrl + "app/refreshToken"; // 公众号刷新token

const loginOwnerByKey = baseUrl + "app/loginOwnerByKey"; // 根据临时秘钥登录

const loginUrl = baseUrl + 'app/loginWx';
const getWxPhoto = baseUrl + 'app/getWxPhoto';
const loginOwnerUrl = baseUrl + 'app/loginOwner';
const areaUrl = baseUrl + "app/area.listAreas";
const GetNoticeListUrl = baseUrl + 'app/notice.listNotices'; //公告接口
const saveOwnerRepair = baseUrl + 'app/ownerRepair.saveOwnerRepair'; //报修

const listOwnerRepairs = baseUrl + 'app/ownerRepair.listOwnerRepairs'; //查询报修

const saveOwner = baseUrl + 'app/owner.saveOwner'; //家庭成员列表

const queryOwnerMembers = baseUrl + 'app/owner.queryOwnerMembers'; //投诉建议列表

const listComplaints = baseUrl + 'app/complaint.listComplaints'; //添加投诉建议

const saveComplaint = baseUrl + 'app/complaint'; //查询业主房间

const queryRoomsByOwner = baseUrl + 'app/room.queryRoomsByOwner'; //绑定业主

const appUserBindingOwner = baseUrl + 'app/owner.appUserBindingOwner'; //查询绑定业主

const ownerRegiter = baseUrl + 'app/owner.ownerRegister'; //业主注册

const ownerRegisterWxPhoto = baseUrl + 'app/owner.ownerRegisterWxPhoto'; //业主注册

const queryAppUserBindingOwner = baseUrl + 'app/owner.listAppUserBindingOwners'; //解绑业主

const appUserUnBindingOwner = baseUrl + 'app/owner.deleteAppUserBindingOwner'; //查询业主门禁

const listOwnerMachines = baseUrl + 'app/owner.listOwnerMachines'; // 申请钥匙

const applyApplicationKey = baseUrl + "app/applicationKey.applyApplicationKey"; //查询钥匙

const listApplicationKeys = baseUrl + "app/applicationKey.listApplicationKeys"; //申请访客钥匙

const applyVisitorApplicationKey = baseUrl + "app/applicationKey.applyVisitorApplicationKey"; //上传业主照片

const uploadOwnerPhoto = baseUrl + "app/owner.uploadOwnerPhoto";
const getOwnerPhotoPath = baseUrl + "callComponent/download/getFile/fileByObjId";
const filePath = baseUrl + "callComponent/download/getFile/file"; //查询业主车位信息

const queryParkingSpacesByOwner = baseUrl + "app/parkingSpace.queryParkingSpacesByOwner"; //查询停车位费用

const queryFeeByParkingSpace = baseUrl + "app/fee.queryFeeByParkingSpace"; //查询物业费用

const queryFeeByOwner = baseUrl + "app/fee.listFee"; //预下单

const preOrder = baseUrl + "app/payment/toPay"; //查询小区

const toOweFeePay = baseUrl + "app/payment/toOweFeePay"; //欠费缴费

//临时车缴费
const preOrderTempCarInout = baseUrl + "/app/payment/toPayTempCarInout";

const listCommunitys = baseUrl + "app/community.listCommunitys"; //查询小区文化

const listActivitiess = baseUrl + "app/activities.listActivitiess"; //查询小区广告

const listAdvertPhoto = baseUrl + "app/advert.listAdvertPhoto";

//查询车辆进场费用
const queryFeeByCarInout = baseUrl + "app/fee.queryFeeByCarInout";

//查询报修单
const listMyRepair = baseUrl + "app/ownerRepair.listOwnerRepairs";

//查询在场车辆
const listCarIn = baseUrl + "app/carInout.listCarInouts";

const queryConfigFee = baseUrl + "app/fee.queryFeeConfig";

//缴费历史查询
const queryFeeDetail = baseUrl + "app/fee.queryFeeDetail";

//发送验证码
const userSendSms = baseUrl + "app/user.userSendSms";

const userLogout = baseUrl + 'app/user.service.logout'; //绑定业主

const listStore = baseUrl + 'app/store.listStoresByCommunity'; // 查询小区商户

//发布需求信息
const saveJunkRequirement = baseUrl + 'app/junkRequirement.saveJunkRequirement';

//查询需求信息
const listJunkRequirements = baseUrl + 'app/junkRequirement.listJunkRequirements';

//删除 需求信息
const deleteJunkRequirement = baseUrl + 'app/junkRequirement.deleteJunkRequirement';

//标记为已完成
const updateJunkRequirement = baseUrl + 'app/junkRequirement.updateJunkRequirement';

//查询楼栋
const queryFloor = baseUrl + 'app/floor.queryFloors';

//查询单元
const queryUnit = baseUrl + 'app/unit.queryUnits';

//查询报修类型
const listRepairSettings = baseUrl + 'app/repair.listRepairSettings';

//待办工单
const listStaffRepairs = baseUrl + "app/ownerRepair.listStaffRepairs";

//已办工单
const listStaffFinishRepairs = baseUrl + "app/ownerRepair.listStaffFinishRepairs";

// 查询报修单处理师傅
const listRepairStaffs = baseUrl + "app/ownerRepair.listRepairStaffs";


// 删除报修单
const deleteOwnerRepair = baseUrl + "app/ownerRepair.deleteOwnerRepair";

// 报修退单
const repairDispatch = baseUrl + 'app/ownerRepair.repairDispatch';

// 报修评价
const appraiseRepair = baseUrl + 'app/repair/appraiseRepair';


// 根据属性查询费用
const listFeeByAttr = baseUrl + "app/feeApi/listFeeByAttr";

// 投诉 处理意见
const listWorkflowAuditInfo = baseUrl + 'app/workflow.listWorkflowAuditInfo';

//查询待审核单
const auditComplaint= baseUrl + 'app/complaint.auditComplaint';

const changeStaffPwd= baseUrl + 'app/user.changeStaffPwd'; //修改密码

const changeOwnerPhone= baseUrl + 'app/ownerApi/changeOwnerPhone'; //修改密码



const queryRentingPool= baseUrl + 'app/renting/queryRentingPool'; //查询房源



const queryParkingSpaces= baseUrl + 'app/parkingSpace.queryParkingSpaces'; //查询空闲车位

const saveOwnerCar= baseUrl + 'app/owner.saveOwnerCar'; //申请车位接口

const queryOwnerCars= baseUrl + 'app/owner.queryOwnerCars'; //查询业主车辆
// 查询申请类型（空置房）
const queryApplyRoomDiscountType = baseUrl + 'app/applyRoomDiscount/queryApplyRoomDiscountType';
// 提交申请
const saveApplyRoomDiscount = baseUrl + 'app/applyRoomDiscount/saveApplyRoomDiscount';
const queryFeeDiscount = baseUrl + 'app/feeDiscount/queryFeeDiscount';
const saveRoomRenovation = baseUrl + 'app/roomRenovation/saveRoomRenovation';



/**
 * 不需要登录页面
 */
const NEED_NOT_LOGIN_PAGE = [
	'/pages/login/login',
	'/pages/register/register',
	'/pages/my/my',
	'/pages/index/index',
	'/pages/market/market',
	'/pages/showlogin/showlogin',
	'/pages/rentHouse/rentHouse'
];

const NEED_NOT_LOGIN_URL = [
	listActivitiess,
	listAdvertPhoto,
	queryAppUserBindingOwner,
	listJunkRequirements,
	queryRentingPool
];

module.exports = {
	baseUrl: baseUrl,
	loginUrl: loginUrl,
	getWxPhoto:getWxPhoto,
	loginOwnerUrl: loginOwnerUrl,
	areaUrl: areaUrl,
	GetNoticeListUrl: GetNoticeListUrl,
	saveOwnerRepair: saveOwnerRepair,
	listOwnerRepairs: listOwnerRepairs,
	saveOwner: saveOwner,
	appUserBindingOwner: appUserBindingOwner,
	queryAppUserBindingOwner: queryAppUserBindingOwner,
	queryOwnerMembers: queryOwnerMembers,
	listComplaints: listComplaints,
	saveComplaint: saveComplaint,
	appUserUnBindingOwner: appUserUnBindingOwner,
	listOwnerMachines: listOwnerMachines,
	applyApplicationKey: applyApplicationKey,
	listApplicationKeys: listApplicationKeys,
	applyVisitorApplicationKey: applyVisitorApplicationKey,
	uploadOwnerPhoto: uploadOwnerPhoto,
	getOwnerPhotoPath: getOwnerPhotoPath,
	queryRoomsByOwner: queryRoomsByOwner,
	queryParkingSpacesByOwner: queryParkingSpacesByOwner,
	queryFeeByParkingSpace: queryFeeByParkingSpace,
	queryFeeByOwner: queryFeeByOwner,
	preOrder: preOrder,
	listCommunitys: listCommunitys,
	listActivitiess: listActivitiess,
	filePath: filePath,
	listAdvertPhoto: listAdvertPhoto,
	listMyRepair: listMyRepair,
	listCarIn: listCarIn,
	queryConfigFee: queryConfigFee,
	queryFeeByCarInout: queryFeeByCarInout,
	preOrderTempCarInout: preOrderTempCarInout,
	queryFeeDetail: queryFeeDetail,
	userSendSms: userSendSms,
	userLogout: userLogout,
	ownerRegiter: ownerRegiter,
	listStore: listStore,
	saveJunkRequirement: saveJunkRequirement,
	listJunkRequirements: listJunkRequirements,
	deleteJunkRequirement: deleteJunkRequirement,
	updateJunkRequirement: updateJunkRequirement,
	wechatRefrashToken: wechatRefrashToken,
	loginOwnerByKey: loginOwnerByKey,
	NEED_NOT_LOGIN_URL: NEED_NOT_LOGIN_URL,
	NEED_NOT_LOGIN_PAGE: NEED_NOT_LOGIN_PAGE,
	queryFloor: queryFloor,
	queryUnit: queryUnit,
	listRepairSettings: listRepairSettings,
	listStaffRepairs: listStaffRepairs,
	listStaffFinishRepairs: listStaffFinishRepairs,
	listRepairStaffs: listRepairStaffs,
	deleteOwnerRepair: deleteOwnerRepair,
	repairDispatch: repairDispatch,
	appraiseRepair:appraiseRepair,
	listFeeByAttr:listFeeByAttr,
	listWorkflowAuditInfo:listWorkflowAuditInfo,
	auditComplaint:auditComplaint,
	ownerRegisterWxPhoto:ownerRegisterWxPhoto,
	changeStaffPwd:changeStaffPwd,
	changeOwnerPhone:changeOwnerPhone,
	queryRentingPool:queryRentingPool,

	toOweFeePay:toOweFeePay,

	queryParkingSpaces:queryParkingSpaces,
	saveOwnerCar:saveOwnerCar,
	queryOwnerCars:queryOwnerCars,
	queryApplyRoomDiscountType: queryApplyRoomDiscountType,
	saveApplyRoomDiscount: saveApplyRoomDiscount,
	queryFeeDiscount: queryFeeDiscount,
	saveRoomRenovation: saveRoomRenovation,
};
