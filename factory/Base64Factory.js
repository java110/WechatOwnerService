/**
 * base64 处理 工厂类
 * 
 * add by wuxw 2020-01-01 美丽的夏都西宁
 */

class Base64Factory{
  constructor(){

  }

  static urlTobase64(url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
        success: res => {
          //把arraybuffer转成base64
          let base64 = wx.arrayBufferToBase64(res.data);

          //不加上这串字符，在页面无法显示的哦
          base64 　= 'data:image/jpeg;base64,' + base64

          //打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
          resolve(base64)
        },
        fail:function(e){
          reject(e);
        }
      })
    });
  }
}

module.exports = Base64Factory;