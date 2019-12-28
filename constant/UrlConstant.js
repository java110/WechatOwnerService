/**
 * url 常量类
 * 
 * add by wuxw 2019-12-28
 */



  // 服务器域名
  const baseUrl = 'http://hc.demo.winqi.cn:8012/';

  // 登录接口
  const loginUrl=baseUrl + 'app/loginWx';
  const areaUrl=baseUrl + "app/area.listAreas";
  const GetNoticeListUrl= baseUrl + 'app/api.queryNotices';
    //报修接口
  const saveOwnerRepair= baseUrl + 'app/ownerRepair.saveOwnerRepair';
    //查看报修
  const listOwnerRepairs= baseUrl + 'app/ownerRepair.listOwnerRepairs';
    //家庭成员
  const saveOwner=baseUrl + 'app/owner.saveOwner';



module.exports = {
  baseUrl: baseUrl,
  loginUrl: loginUrl,
  areaUrl: areaUrl,
  GetNoticeListUrl: GetNoticeListUrl,
  saveOwnerRepair: saveOwnerRepair,
  listOwnerRepairs: listOwnerRepairs,
  saveOwner: saveOwner
};