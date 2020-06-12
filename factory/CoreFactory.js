/**
 * 核心工厂类，写一些 核心业务处理 如果 权限验证
 * add by wuxw 2019-12-28
 * 
 * 
 */
class CoreFactory {
  constructor() {} // 检查用户信息授权设置


  checkUserInfoPermission(callback = () => {}) {
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.openSetting({
            success: function (authSetting) {
              console.log(authSetting);
            }
          });
        }
      },
      fail: function (error) {
        console.log(error);
      }
    });
  }

}

module.exports = new CoreFactory();