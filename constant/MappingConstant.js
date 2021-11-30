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

/**
 * 一些参数常量
 */
export default {
    // 店铺类型
    SHOP_TYPE: {
        MARKET: "34004",	// 超市
        RESTAURANT: "34005",	// 餐厅
        FOOD_SHOP: "34006",		// 菜铺
        PHARMACY: "34007",  // 药店
        MOM_CHILD: "34008",  // 母婴
        HOMEMAKING: "34009",  // 家政
    },
    // 专区目录类别
    CATEGORY_TYPE: {
		HOMEMAKING: "1", // 家政
        INDEX: "2", //商圈
    },
    // 菜单类型
    MENU_TYPE: {
        HOMEMAKING: "1001", // 家政服务
        SHOP: "2002", // 商城
		SHOP_INDEX: "3003", // 商城
    },
    // 遇到全局数据查询传参shopId，使用该参数
    SHOP_ID_GLOBAL: "9999",
    // 购物车（订单）类型
    CART_TYPE: {
        HOMEMAKING: "3307", // 家政服务
        SHOP: "3306", // 商城
    },
	// 默认头像
	headImg: '/static/images/missing-face.png',
	// 出错填充图片
	errorImage: '/static/images/errorImage.jpg',
}

module.exports = MappingConstant;