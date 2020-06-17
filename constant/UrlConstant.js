/**
 * url 常量类
 * 
 * add by wuxw 2019-12-28
 */

const constant = require("../constant/index.js");

// 服务器域名
//const baseUrl = '/'; //const baseUrl = 'http://hc.demo.winqi.cn:8012/';
const baseUrl = '/';
//const hcBaseUrl = 'https://app.demo.winqi.cn/'; // 登录接口
const hcBaseUrl = 'https://app.demo.winqi.cn/';

const wechatRefrashToken = baseUrl + "app/refreshToken"; // 公众号刷新token

const loginOwnerByKey = baseUrl + "app/loginOwnerByKey"; // 根据临时秘钥登录

const loginUrl = baseUrl + 'app/loginWx';
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

const queryAppUserBindingOwner = baseUrl + 'app/owner.listAppUserBindingOwners'; //解绑业主

const appUserUnBindingOwner = baseUrl + 'app/owner.deleteAppUserBindingOwner'; //查询业主门禁

const listOwnerMachines = baseUrl + 'app/owner.listOwnerMachines'; // 申请钥匙

const applyApplicationKey = baseUrl + "app/applicationKey.applyApplicationKey"; //查询钥匙

const listApplicationKeys = baseUrl + "app/applicationKey.listApplicationKeys"; //申请访客钥匙

const applyVisitorApplicationKey = baseUrl + "app/applicationKey.applyVisitorApplicationKey"; //上传业主照片

const uploadOwnerPhoto = baseUrl + "app/owner.uploadOwnerPhoto";
const getOwnerPhotoPath = hcBaseUrl + "callComponent/download/getFile/fileByObjId";
const filePath = hcBaseUrl + "callComponent/download/getFile/file"; //查询业主车位信息

const queryParkingSpacesByOwner = baseUrl + "app/parkingSpace.queryParkingSpacesByOwner"; //查询停车位费用

const queryFeeByParkingSpace = baseUrl + "app/fee.queryFeeByParkingSpace"; //查询物业费用

const queryFeeByOwner = baseUrl + "app/fee.listFee"; //预下单

const preOrder = baseUrl + "app/payment/toPay"; //查询小区

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

/**
 * 不需要登录页面
 */
const NEED_NOT_LOGIN_PAGE = [
	'/pages/login/login',
	'/pages/register/register',
	'/pages/my/my',
	'/pages/index/index',
	'/pages/market/market',
	'/pages/showlogin/showlogin'
];

const NEED_NOT_LOGIN_URL = [
	listActivitiess,
	listAdvertPhoto,
	queryAppUserBindingOwner,
	listJunkRequirements
];

module.exports = {
	baseUrl: baseUrl,
	hcBaseUrl: hcBaseUrl,
	loginUrl: loginUrl,
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
	NEED_NOT_LOGIN_URL:NEED_NOT_LOGIN_URL,
	NEED_NOT_LOGIN_PAGE:NEED_NOT_LOGIN_PAGE
};
