// 服务器域名
const baseUrl 			= 'http://127.0.0.1:[your port]/';
// 获取书籍信息接口地址(可选择全部或单个书籍)
const getBooksUrl 		= baseUrl + 'api/book/getBooks';
// 写评论接口
const commentUrl 		= baseUrl + 'api/comment/write';
// 查询当前用户是否已经购买该书籍并返回评论列表接口
const queryBookUrl 		= baseUrl + 'api/book/queryBook';
// 登录接口
const loginUrl 			= baseUrl + 'login';
// 获取当前用户已购书籍接口
const getBoughtBooksUrl = baseUrl + 'api/user/getBoughtBooks';
// 兑换书籍接口
const buyBookUrl = baseUrl + 'api/order/buy';
const appInfo = {
  baseUrl: "https://api.demo.winqi.cn",
  appId: "992019111758490006",
  appSecurity: "",
};


module.exports = {
	getBooksUrl: 		getBooksUrl,
	commentUrl: 		commentUrl,
	queryBookUrl: 		queryBookUrl,
	loginUrl: 			loginUrl,
	getBoughtBooksUrl: 	getBoughtBooksUrl,
	buyBookUrl: 		buyBookUrl,
  appInfo:appInfo
};
