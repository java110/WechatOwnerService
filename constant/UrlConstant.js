/**
 * url 常量类
 * 
 * add by wuxw 2019-12-28
 */



// 服务器域名
const baseUrl = 'https://app.demo.winqi.cn/';
//const baseUrl = 'http://hc.demo.winqi.cn:8012/';

// 登录接口
const loginUrl = baseUrl + 'app/loginWx';
const areaUrl = baseUrl + "app/area.listAreas";
const GetNoticeListUrl = baseUrl + 'app/api.queryNotices';
//报修接口
const saveOwnerRepair = baseUrl + 'app/ownerRepair.saveOwnerRepair';
//查看报修
const listOwnerRepairs = baseUrl + 'app/ownerRepair.listOwnerRepairs';
//家庭成员
const saveOwner = baseUrl + 'app/owner.saveOwner';
//家庭成员列表
const queryOwnerMembers = baseUrl + 'app/owner.queryOwnerMembers';
//投诉建议列表
const listComplaints = baseUrl + 'app/complaint.listComplaints';

//绑定业主
const appUserBindingOwner = baseUrl + 'app/owner.appUserBindingOwner';

//查询绑定业主
const queryAppUserBindingOwner = baseUrl + 'app/owner.listAppUserBindingOwners';



  //解绑业主
  const appUserUnBindingOwner = baseUrl + 'app/owner.deleteAppUserBindingOwner';


module.exports = {
  baseUrl: baseUrl,
  loginUrl: loginUrl,
  areaUrl: areaUrl,
  GetNoticeListUrl: GetNoticeListUrl,
  saveOwnerRepair: saveOwnerRepair,
  listOwnerRepairs: listOwnerRepairs,
  saveOwner: saveOwner,
  appUserBindingOwner: appUserBindingOwner,
  queryAppUserBindingOwner: queryAppUserBindingOwner,
  queryOwnerMembers: queryOwnerMembers,
  listComplaints: listComplaints,
  appUserUnBindingOwner: appUserUnBindingOwner
};