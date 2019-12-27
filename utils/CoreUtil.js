/**
 * 核心工具类
 * 
 * add by wuxw 2019-12-28
 * 
 * 
 */

class CoreUtil{

// 封装 wx.showToast 方法
  static showInfo(info = 'error', icon = 'none') {
      wx.showToast({
        title: info,
        icon: icon,
        duration: 1500,
        mask: true
      });
  }

  
}


module.exports = CoreUtil;