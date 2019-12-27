/**
 * url 常量类
 * 
 * add by wuxw 2019-12-28
 */

class UrlConstant{

  // 服务器域名
  static baseUrl = 'http://hc.demo.winqi.cn:8012/';

  // 登录接口
  static loginUrl=baseUrl + 'app/loginWx';
  static areaUrl=baseUrl + "app/area.listAreas";
  static GetNoticeListUrl= baseUrl + 'app/api.queryNotices';
  //报修接口
  static saveOwnerRepair= baseUrl + 'app/ownerRepair.saveOwnerRepair';
  //查看报修
  static listOwnerRepairs= baseUrl + 'app/ownerRepair.listOwnerRepairs';
  //家庭成员
  static saveOwner=baseUrl + 'app/owner.saveOwner';
}

module.exports = UrlConstant;