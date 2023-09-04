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
		BOOKING: "3308" // 预约
    },
	// 默认头像
	headImg: '/static/images/missing-face.png',
	// 出错填充图片
	errorImage: '/static/images/errorImage.jpg',
}
