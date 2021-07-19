/**
 * 编码映射常量类
 * 
 * add by wuxw 2019-12-28
 */
import conf from '../conf/config.js'
class MappingConstant {
  static LOGIN_FLAG = 'loginFlag'; //登录标识

  static TOKEN = "token"; // token 标识
  
  static OWNER_KEY = "owner_key"; // 业主临时key

  static USER_INFO = "userInfo"; // 用户信息

  static AREA_INFO = "areaInfo"; // 地区信息

  static CURRENT_COMMUNITY_INFO = "currentCommunityInfo"; // 小区信息

  static OWNER_INFO = "ownerInfo"; // 当前业主信息

  static CURRENT_COMMUNITY_INFO = "currentCommunityInfo"; //业主当前小区信息
  
  static CURRENT_OPEN_ID = "openId";
  
  static HC_TEST_COMMUNITY_ID = conf.DEFAULT_COMMUNITY_ID;//HC测试小区id  用于没有登录时展示相关信息
  static HC_TEST_COMMUNITY_NAME = conf.DEFAULT_COMMUNITY_NAME;
  
  static W_APP_ID = "wAppId";//微信公众号ID
  
  static HC_MALL_CUR_URL = "HC_MALL_CUR_URL";
 

}

module.exports = MappingConstant;